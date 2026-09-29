# Rung M: each integer type's own `MIN`, `MAX` and `MINMAX` (`rung-integer-minmax`)

- problem: under `walk`, `b MAX 1` for a `ZZ64` `b` stops the run, "Ambiguous coercion" (row 484), `explorations/reviews/before-n-questions/walk-max/summary.txt:1`; on this rung's base, `explorations/compile-ladder/rung-integer-minmax/probes/newtest-preedit.txt:8`
- spec: `Specification/basic/conversions-coercions.tex:533-553` (the most specific coercion, which is unique), with the relation of `:486-500`; the Meet Rule, `Specification/advanced/overloading.tex:224-235`; the integer chapter's `ZZ` declares its own `MAX` and `MIN`, `Specification/basic-lib/basic-integers.tex:263-264`, and they return the larger and the smaller argument, `:642-645`
- precedent: the team's `StandardTotalOrder` bodies, `Library/FortressLibrary.fss:285-288`, taken at the type's own type, as `QQ` declares its own three, `:582-587`, and as the compiler library declares them on every integer type, in its api form, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:198-200`; `TotalComparison`'s own three are the revival's restatement of the same device (climb batch 7 rung H, `952892a00`), `Library/FortressLibrary.fss:172-175`
- deviation: the bodies use `StandardTotalOrder`'s one `<`, where the compiler library's use `<=` and `>=` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:649-651`); `MINMAX` is declared on `ZZ` too, where the specification's `ZZ` lists `MAX`, `MIN`, `MAXNUM` and `MINNUM` and no `MINMAX` (`Specification/basic-lib/basic-integers.tex:263-266`); the api's `ZZ`, which lists no comparison, carries the three after its coercions (`Library/FortressLibrary.fsi:615-617`)
- historical: `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`

## 1. What changed

Fifteen declarations, 35 lines, in the api and the component: three on each of `ZZ32`, `ZZ64`, `NN64` and `ZZ` (`Library/FortressLibrary.fsi` and `.fss`) and three on `NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`). For `ZZ64`:

```
    opr MIN(self, other:ZZ64): ZZ64 = if other < self then other else self end
    opr MAX(self, other:ZZ64): ZZ64 = if other < self then self else other end
    opr MINMAX(self, other:ZZ64): (ZZ64, ZZ64) =
        if other < self then (other, self) else (self, other) end
```

The other four types take the same three at their own type, and the api carries the three signatures. Component: `Library/FortressLibrary.fss:707-710` (`ZZ32`), `:795-798` (`ZZ64`), `:867-870` (`NN64`), `:948-951` (`ZZ`), `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:403-406` (`NN32`). Api: `Library/FortressLibrary.fsi:483-485` (`NN64`), `:526-528` (`ZZ32`), `:577-579` (`ZZ64`), `:615-617` (`ZZ`), `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:86-88` (`NN32`). The whole diff is `git diff bce66f1fa 4eeb9603a -- Library ProjectFortress/LibraryBuiltin`, also in `explorations/compile-ladder/rung-integer-minmax/probes/for-pavol.txt`.

Under `walk`, every call of the family over the integer types now answers at answer 8's type (POSITIONS 2026-09-26, answer 8). A call over one type answers at that type; a call over two different integer types answers at the narrowest type both coerce into, with a numeral read as `walk`'s `ZZ32`. The 54 one-call programs in `explorations/compile-ladder/rung-integer-minmax/probes/matrix/` show this call by call (section 5). Of the 54 answers, 41 changed from a refusal (16) or a `QQ` (25) to answer 8's type, and the other 13 were at that type before and after. No call is refused. Over the 429 interpreter tests no other `walk` output changed (section 6). Both microGPT checks pass 40 of 40 with identical printed values (section 7). The checker count is the landed table line for line, 75. The distance stage reads 627 against 626: once the edit's line shift is undone, the one error left is the BR family's known variation (section 8).

The compiled path does not read the one library before the switch-over, so it is unchanged. Measuring it beside `walk` (section 9) found one divergence, and the specification settles it against the compiled side. The compiler prelude's `ZZ64` declares no conversion from `NN32`, so compiled `MAX` over an `NN32` and a `ZZ32` or `ZZ64` answers `ZZ`, where answer 8 gives `ZZ64`. This is a face of row 442. It is gated as an expected failure, `ProjectFortress/compiler_tests/XXXMaxNN32IntoZZ64RungM.fss`, with a link companion.

What I inherited: nothing. The branch held no commit beyond `bce66f1fa`, and the worktree and `tmp/` were empty.

## 2. Where the fix belongs

`MIN`, `MAX` and `MINMAX` are library operators. On the integer types they come from the generic order traits `StandardMax`, `StandardMinMax` and `StandardTotalOrder` (`Library/FortressLibrary.fss:253`, `:266-267`, `:285-288`), through `Integral` (`:650`). A functional method's `self` is typed as the trait that declares it (`Specification/basic/overloading.tex:156-162`), so the `MAX` a `ZZ64` inherits has the domain `(StandardTotalOrder[\ZZ64\], ZZ64)`, and a trait converts into nothing. `QQ`'s own `MAX` has the domain `(QQ, QQ)`. For `b MAX 1`, no declaration applies without a conversion and both apply with one. By the specification's relation (`Specification/basic/conversions-coercions.tex:486-500`) neither is more specific, so walk's coercion pass (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:821-853`, with the relation at `Coercions.java:163-190`) reports the tie as "Ambiguous coercion" (`OverloadedFunction.java:847`). `ZZ64` declares its own `+` and `<=` (`Library/FortressLibrary.fss:804`, `:790`), whose domain `(ZZ64, ZZ64)` is more specific than every other candidate; that is why `b + 1` answers.

Four ways are on record (`explorations/reviews/before-n-questions.md:35-62`):
1. Each integer type declares its own three: a library edit.
2. Walk reads an inherited method's `self` as the receiver's type: this touches walk, the checker's lifting and the specification's sentence on `self`, and still leaves the tie with `QQ`'s `MAX`.
3. The numeral takes the other operand's type: a rule beyond answer 8, which does not cover two variables.
4. Leave it.

Pavol decided (1) (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 2; `explorations/reviews/conversion-overloading-judgement.md:155-157`). So the fix belongs in the one library, `FortressLibrary` and `FortressBuiltin`, which is also the library the checker will read at the switch-over (POSITIONS 2026-09-21, the library route). `explorations/coordinator/map/README.md:122` lists what else a change there reaches: walk, the checker count, the specification's Part IV (generated from the `.fsi` files), and `SpecData` and the demos outside the gate. The rung touched no Java or Scala and ran no `ant compileAll`.

## 3. Precedent search

The one library already solves this problem the same way five times, never on an integer type:

- `TotalComparison` declares its own `MIN`, `MAX` and `MINMAX`, with exactly `StandardTotalOrder`'s bodies at its own type (`Library/FortressLibrary.fss:172-175`, api `.fsi:129-131`), under the team's comment "Avoid ambiguity between the default definitions of CMP and >=" (`:161-163`). The three are the revival's, added by climb batch 7 rung H; the comment is the team's (provenance below).
- `RR64` (`.fss:427-429`, api `.fsi:326-328`) and `QQ` (`.fss:582-591`, api `.fsi:412-414`) declare all three at their own type, beside the ones they inherit from `StandardMinMax`.
- `Float` and `RR32` in `FortressBuiltin` declare them in the component only, on natives (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:93-99`, `:261-268`).
- Other operators of the same family use the same device. `ZZ64` declares `>`, `>=`, `<=` and `CMP` itself (`Library/FortressLibrary.fss:788-794`) under the team's comment "Argh! Due to method ambiguities with ZZ, these definitions must be given explicitly here." (`:786-787`). `ZZ` declares `<`, `<=`, `>`, `>=` and `CMP` (`:943-947`).

Outside the one library, the same device appears three more times:
- The compiler library declares all three on every integer type and on `IntLiteral` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:137-139`, `:198-200`, `:261-263`, `:318-320`, `:378-380`, `:425-427`; bodies at `CompilerBuiltin.fss:552-554`, `:649-651`, `:738-740`, `:803-805`, `:869-871`). It does so on `ZZ32` although `ZZ32` also extends `StandardTotalOrder[\ZZ32\]` (`CompilerBuiltin.fsi:210`).
- The team's unfinished draft declares `MAX` and `MIN` on `ZZ` and `QQ`, and `MAXNUM` and `MINNUM` beside them on `ZZ` (`Library/incomplete/basic/Fortress.Number.fsi:144-147`, `:43-44`).
- The specification's `ZZ` declares `MAX`, `MIN`, `MAXNUM` and `MINNUM`, and no `MINMAX` (`Specification/basic-lib/basic-integers.tex:263-266`).

Provenance, by `git blame` at the base (`bce66f1fa`):
- The team's, present at the history's earliest reachable commit (`5a68404fd`, 2012-07-19): `StandardTotalOrder`'s bodies (`Library/FortressLibrary.fss:285-288`), `QQ`'s own three (`:582-587`), the comment over `TotalComparison` (`:161-163`), the compiler library's declarations and bodies, the draft's and the specification's.
- The team's device, retyped by the revival: `RR64`'s (`Library/FortressLibrary.fss:427-429`), `Float`'s and `RR32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:95-99`, `:263-268`) are declared at `Number` in `5a68404fd` and were retyped to `RR64` by climb batch 6 rung F in `d846e3644` (2026-09-27).
- The revival's: `TotalComparison`'s three (`Library/FortressLibrary.fss:172-175`, api `.fsi:129-131`), added by climb batch 7 rung H in `952892a00` (2026-09-28).

So the precedent followed is the team's: `StandardTotalOrder`'s bodies (`:285-288`) at the type's own type, as `QQ` declares its own three (`:582-587`) and as the compiler library declares all three on every integer type. `TotalComparison`'s three are the revival's restatement of the same device.

Sites that need the same repair: in the one library, the types that inherit the family from a generic order trait and meet `QQ`'s or `RR64`'s declaration through a conversion are exactly the five integer types. `TotalComparison`, `QQ`, `RR64`, `Float` and `RR32` already declare theirs, so the fifteen declarations cover every such site of `MIN`, `MAX` and `MINMAX`.

One sibling is left. `Integral`'s `MINNUM` and `MAXNUM` (`Library/FortressLibrary.fss:661-662`, api `Library/FortressLibrary.fsi:470-471`), defined as `self MIN other` and `self MAX other`, are inherited by the five types and tie with `QQ`'s (`Library/FortressLibrary.fss:628-631`) for row 484's reason. Five calls refuse with "Ambiguous coercion" on the base and on the edit alike: `b MAXNUM 1` and `b MINNUM 1` for a `ZZ64`, `b MAXNUM 1` for a `ZZ`, `w MAXNUM z` for a `ZZ64` and a `ZZ32`, and `v MAXNUM u` for an `NN64` and an `NN32` (`explorations/compile-ladder/rung-integer-minmax/probes/skeptic/differential.txt`, rows `Maxnum*` and `MinnumNumZZ64`). Their home is the expected failure `ProjectFortress/tests/XXXIntegerMaxNumRungM.fss`, placed at the gather, and they are ledger row 517 (section 10). Decision 2 names `MIN`, `MAX` and `MINMAX`, so the ten declarations that would close them are Pavol's to add.

## 4. What the specification settles

- **Which declaration a converted call takes.** It takes the most specific of the declarations applicable with coercion, and the overloading rules guarantee that one exists and is unique (`Specification/basic/conversions-coercions.tex:533-553`). A type is no less specific than another if it is a subtype of it, or if it excludes it, coerces to it and rejects it (`:486-500`). With `ZZ64`'s own `MAX`, the domain `(ZZ64, ZZ64)` is no less specific than each other candidate:
  - than `(QQ, QQ)`: `ZZ64` excludes `QQ` and coerces into it, and each type that coerces into `ZZ64` (`ZZ32` and `NN32`) excludes `QQ`;
  - than `(ZZ, ZZ)`: by the same argument with `ZZ`;
  - than the inherited `(StandardTotalOrder[\ZZ64\], ZZ64)`: by subtyping.

  So it is the unique most specific, as `walk` measures.
- **That the library owes such a declaration.** The inherited `MAX` and `QQ`'s `MAX` both take a `ZZ64` with a converted numeral. So they fail the Incompatibility Rule (`Specification/advanced/overloading.tex:212-215`), and the Meet Rule asks for a more specific declaration applicable wherever both are (`:224-235`). A type's own `MAX` is that declaration.
- **The values.** `MAX` and `MIN` return the larger and the smaller argument, and for equal arguments that same value (`Specification/basic-lib/basic-integers.tex:642-645`). The chapter declares `MAX` and `MIN` on `ZZ` itself (`:263-264`) and presents only `ZZ`'s methods (`:74`). In the library the fixed-width types follow the same shape, as their `+` and `<` do.
- **The answer's type at mixed widths.** It is the narrowest type both coerce into (answer 8; `Specification/basic-lib/basic-integers.tex:90-93`, the callout rung T revises in this batch), computed from the coercions the chapter lists (`:23-31`).

The specification is not silent on anything this rung does, so no silent case is decided here.

## 5. The test, the recorded failure and the recorded pass

`ProjectFortress/tests/IntegerMinMaxRungM.fss` is in the form of `ProjectFortress/tests/roundBug.fss`. Each answer is shown with its run-time type by a helper in the form of `IntSemanticsRungI.fss`'s `zz32Shown`, extended to the seven number leaves. Each assertion's message cites row 484 and its source. The test asserts:
- `ZZ32`'s and `RR64`'s three with a numeral, unchanged on the base: `3 : ZZ32`, `1 : ZZ32`, `(1 : ZZ32, 3 : ZZ32)`; `3.5 : RR64`, `1.0 : RR64`, `(1.0 : RR64, 3.5 : RR64)`.
- `b MAX 1`, `b MIN 1` and `b MINMAX 1` for a `ZZ64` and for a `ZZ` `b`, at the receiver's type.
- `1 MAX b` for a `ZZ64` `b` (`ZZ64`), and a negative `ZZ64` against a numeral both ways (`2`, `-7`).
- `w MAX z`, `z MAX w` and `w MIN z` for a `ZZ64` `w` and a `ZZ32` `z` (`ZZ64`).
- `u MAX z` for an `NN32` `u` (`ZZ64`), `v MAX z` for an `NN64` `v` (`ZZ`), `v MAX u` (`NN64`), `w MAX v` (`ZZ`), `g MAX w` for a `ZZ` `g` (`ZZ`), `u MINMAX z` (`ZZ64`) and `v MINMAX u` (`NN64`).

The `NN32` and `NN64` calls with a numeral are left to rung Q's test, as the record says, since the numeral's type decides them.

**The recorded failure**, on the base, before any library edit (`explorations/compile-ladder/rung-integer-minmax/probes/newtest-preedit.txt`, machine line included). The three `unchangedOnTheBase` groups pass, and the run stops at line 35, `b MAX 1`:

```
com.sun.fortress.exceptions.ProgramError: .../ProjectFortress/tests/IntegerMinMaxRungM.fss:35:18:
Ambiguous coercion, args = (3: ZZ64,1: ZZ32), applicable with coercion = {coerced MAX(self:(FortressLibrary.QQ & {Ratio}),other:FortressLibrary.QQ):FortressLibrary.QQ ... (Library/FortressLibrary.fss:584:5-585:102), coerced MAX(self:StandardTotalOrder[\T\],other:T):T ... (StandardTotalOrder[\ZZ64\],ZZ64)->ZZ64 (Library/FortressLibrary.fss:286:5-71), ... (:267), ... (:253)}
rc=1
```

**The recorded pass**, after the edit (`probes/newtest-postedit.txt`): `PASS`, rc 0. Run through the `testSystem` harness over the file alone (`probes/newtest-harness-postedit.txt`, with rung I's `harness-one.sh` copied beside the rung's scripts), it reads "OK (1 test)".

**The matrix** is in `probes/matrix/`: `make-programs.py`, the 54 programs, `summary-base.txt`, `summary-edit.txt`, `compare.txt`, and the machine in `machine.txt`. It holds the 23 programs of the question's appendix B.1, taken over by name; `MAX` over all 25 ordered pairs of the five integer types as variables; and `MIN` and `MINMAX` over three mixed pairs. Each program makes one call under `walk`, run before and after the edit.

Before the edit:
- 16 refusals ("Ambiguous coercion"): `ZZ64` and `ZZ` with a numeral, three operators each; `ZZ64` with `ZZ32` (in two programs) and with `NN32`; `NN64` with `NN32`, three operators; `ZZ` with each of the other four integer types.
- 25 answers at `QQ`.
- 13 answers at the expected type: the same-type calls, `ZZ32` and `RR64` with a numeral, and the two `+` controls.

After the edit, every call answers at answer 8's type:
- `ZZ64` for `ZZ32` or `NN32` with `ZZ64`, and for `ZZ32` with `NN32`;
- `NN64` for `NN32` with `NN64`;
- `ZZ` for `ZZ` with any integer type, and for `NN64` with `ZZ32` or `ZZ64`;
- the receiver's type for same-type calls;
- `ZZ64` and `ZZ` for `NN32` and `NN64` with a numeral, since the numeral is a `ZZ32`.

That makes 41 changed and 13 the same. Every value is unchanged (`MAX` the larger, `MIN` the smaller). Each changed call is answered by the own declaration of the type it answers at, which the result's run-time type shows.

Home 1, repaired and gated: row 484 (every refusal and every `QQ` answer above), by `IntegerMinMaxRungM.fss`, whose assertions are in place and pass.

## 6. The comparison over `ProjectFortress/tests/`

The comparison ran over every file of the directory except the new test, 429 files (`explorations/compile-ladder/rung-integer-minmax/count-list.txt`). It used one JVM per test with private caches, four at a time, with rung F's runner (`count-run.sh`, pinned to one processor per JVM) and comparison (`compare-normalised.py`, which masks Java line numbers in stack frames and identity hashes, and maps positions in the edited library files back to the base). It ran two passes, as the record asks: the base (`bce66f1fa`, 01:36:33 to 01:55:32 UTC) and the edit (`4eeb9603a`, 01:57:59 to 02:11:07 UTC; `probes/passes/run-times.txt`, `machine-base.txt`, `machine-edit.txt`). `df` was read before each pass (`probes/passes/df-before-base.txt`, `df-before-edit.txt`: 16 GB free), and each pass's caches (183 MB) were deleted once its logs were captured.

**Result** (`probes/passes/compare-normalised.txt`): 400 the same, 10 the same once normalised, 19 different, 0 missing. With two passes the script is given the base pass as both A and B, so no file reads UNSTABLE and every difference is listed. Exit codes are 343 rc 0, 79 rc 1 and 7 rc 255 in both passes, and no file's exit code changed (`probes/passes/rc-distribution.txt`).

- **The 10 normalised.** Eight are expected failures whose messages print positions in `FortressLibrary.fss` or `FortressBuiltin.fss` below an inserted line: `XXXArrayLiteralArgRungC` (whose overload list names `-` on each integer type), `XXXEmptyGroupSumRungF`, `XXXFnRenderRungS`, `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO`, `XXXRangeWideRungJ`, `XXXTupleSevenRungS` and `XXXUnwrittenSumRungF`. The other two are `taskTrace2` and `taskTrace3`, whose differences are identity hashes.
- **17 of the 19 are the files rung F found unstable between two base runs**, the same 17 that rung B's three passes listed: `ArrayListQuick`, `CovCollTest`, `HeapTest`, `PureListQuick`, `QuickCheckTest`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4` and `quicksortTest`. Each is rc 0 in both passes, and every difference is a timing, a random sample or a thread interleaving (`probes/passes/unstable-kinds.txt`): 13 are equal with digits masked, `TreapTest` holds the same 32 shapes, and the other four were read by hand (`CovCollTest`'s timing units, `QuickCheckTest`'s random samples, `SkipListTest`'s random levels, `abortBlock`'s interleavings). None of their differing lines is a call of `MIN`, `MAX` or `MINMAX`.
- **The other 2 are row 430's mechanism.** `XXXInheritedOverload`, which the record lists as unstable, and `XXXCoercionTupleOverloadRungC` are expected failures with rc 1 in both passes, whose ambiguity messages name their two declarations in the other order. The untouched tree names them in either order from run to run with the JVM's default flags, which `bin/fortress` and `testSystem` use (`probes/order/`, 8 runs of each file; for the base runs the four library files were checked out at the base in the worktree and restored after):

  | file | base | edit |
  |---|---|---|
  | `XXXCoercionTupleOverloadRungC` | `param_pair` first 6, `pair()` first 2 | 6, 2 |
  | `XXXInheritedOverload` | each order 4 | `Sub1` first 8, `Base` first 0 |

  Batch 7's rung H measured the first file the same way (`explorations/compile-ladder/rung-exclusion-remainder/REPORT.md:123`). By POSITIONS 2026-09-26, rung D's stop, these differences belong to row 430 and are not a stop; row 430 gets a note (record.md).

So no output changed except outputs the untouched tree varies on its own, and no call of the family in the corpus changed its printed answer. The tests the record names as must-stay-green print the same in both passes: `FlatTowerRungF`, `IntSemanticsRungI`, `FixedWidthOverflowRungB`, `WrapOperatorsRungD`, rung C's `Coercion*` and `XXXCoercion*` files, `ResultBoundsRungB`, and `ArrayOperatorsBesideLibrary` and `ArrayScalarExtension`, which add their own `MIN`, `MAX` and `MINMAX` overloads beside the library's. The library loads under `walk` in all 429 runs, and no overload set it loaded before is refused after.

## 7. The microGPT checks

Both checks ran from an empty private cache at `FORTRESS_THREADS=1`, with rung B's `mg-run.sh` (copied, its machine path changed): once on the base before the edit and once on the edit (`probes/mg/mg-base-*.txt` and `mg-edit-*.txt`, each headed by its machine line; `df` before each in `probes/mg/df-before-mg-*.txt`). `MicroGptFlatCheck` and `MicroGptAplCheck` print `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS` in both runs. With the machine lines and timings removed, their printed values are identical (`probes/mg/mg-compare.txt`: both diffs empty). Wall times, for the record only: 969 s and 958 s on the base (run at the same time as the base comparison pass), 789 s and 771 s on the edit. No line of `explorations/run-c4/src/` or `explorations/apl/mg/` was touched.

## 8. The checker count and the distance stage

**The before.** The before is the last landed gate's tables: `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`, `distance.txt` and `distance-sites.tsv` (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken). They were landed by `d9c62446e`, and `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing, so the base has not changed under them and the stages were not run on the base. The after was captured on the rung's tree through `run_bg`.

**The checker count** (`probes/checker-count-postedit.txt`, machine in `checker-count-postedit.machine.txt`) is identical to the landed table line for line (`diff` empty): `FortressLibrary 132`, `RangeInternals 18`, every other api 0, `#total 75`, `#locations 62`, `#crash none`, the memo off, the shadow matching. No error of the run is reported at any of the inserted lines (`probes/new-lines-check.txt`, by `new-lines.sh`, which builds the positions from `git diff -U0 bce66f1fa`). The `FortressLibrary` api's overloading check runs: its `MIN` and `MAX` errors are the array-scalar ones already present before (`Library/FortressLibrary.fsi:2608-2611` against the generic traits). So the fifteen declarations are checked and accepted as valid overloads beside `QQ`'s, `RR64`'s, `TotalComparison`'s and the inherited ones. The manifest's values for M alone: `expectedCheckerCount: 75`, no crash line.

**The distance stage** (`probes/distance-postedit.txt`, with its `#machine` and `#seconds` rows; `compare.sh` against the landed table in `probes/distance-compare.txt`) reads `DISTANCE UP 626 -> 627 (+1)`:
- kind `typecheck` 389 → 390;
- class I1 5 → 6, G1 10 → 8, BR 11 → 12, OT 144 → 145;
- unit `component FortressLibrary` 361 → 362;
- the crash rows are the same six crashes, at lines moved by the insertion (`FortressLibrary.fss` +16, `FortressBuiltin.fss` +4).

Site by site: `probes/distance-sites-postedit.tsv` is the after's per-site list, and `probes/distance-sites-compare.txt`, by `sites-compare.py`, compares whole rows with the landed list after mapping every position in the four edited files back to the base. The comparison finds:
- **619 rows** identical to the landed list.
- **4 rows**: the same errors at the same sites, with longer messages. These are the array-scalar block's `e MIN y`, `y MIN e`, `e MAX y` and `y MAX e` over `T extends Number` (`Library/FortressLibrary.fss:4617-4620` on the base, `:4633-4636` on the tree), refused before and after. Their lists of inapplicable candidates now also name the five new declarations of each operator.
- **2 rows**: the same errors, whose messages list the same members in another order. One is the export check at `FortressLibrary.fss:12`, whose unmatched `ImmutableArray1` is named at another place in the list; the other is `^` at `FortressBuiltin.fss:327`, whose `AND` type lists the same 12 arms in another order.
- **BR, one gone and two new**: `BIG MAXNUM`'s body at `FortressLibrary.fss:3249` is gone, and `BIG //`'s at `:3444` and `BIG SQCAP`'s at `:1535` are new (base lines). The rung touched none of the three declarations, and each message is already in distance tables on file before this rung: `explorations/reviews/numerics-plan-coordinator/probes-D/dist/full-any-stock.tsv` has `BIG MAXNUM`'s and `BIG SQCAP`'s, and `explorations/reviews/row-488-probe/sites.txt` has `BIG //`'s. FACTS records this family as moving between setups and under edits that touch none of its declarations (rung B's entry, "The written bound `Object` on the three result-only parameters ..."). It accounts for the whole +1.

The class moves I1 +1, G1 −2 and OT +1 are not errors that moved. The stage's `classify.py` names three classes by hard-coded line ranges of `FortressLibrary.fss` (`explorations/coordinator/tools/distance/classify.py:25`, `:32`), and the 16 inserted lines above those ranges move three sites across their bounds:
- two tuple `CMP` sites at base line 4416 leave `TUPLECMP_FL = (4320, 4425)` and read as OT instead of G1;
- a range helper's return at base line 3882 enters `ANYINTEGRAL_FL = (3886, 3966)` and reads as I1 instead of OT.

Recomputed from the per-site lists with the stage's own `classify.py`, the after list with its positions mapped to the base differs from the landed list only by BR +1 (`probes/distance-classes.txt`, by `sites-classes.py`). No error of the stage is reported at an inserted line (`probes/new-lines-check.txt`), so the checker accepts the fifteen bodies.

## 9. The compiled path, and the one divergence

The compiled path checks and links against the compiler library, which the rung does not edit, so its answers are unchanged; the record's skeptic check compares the test's values with them. `explorations/reviews/before-n-questions/max-compiled/` has `b MAX 1` and `w MAX z` answering `ZZ64`, as `walk` now does. To cover the rest, `probes/compiled/` compiles and runs the matrix's 25 pairs and the five types' `b MAX 1`, respelled with variables bound from numerals as `max-compiled/` does (`make-programs.py`, `run.sh`, and 31 captures under `captures/`, each with its machine line). The bytecode cache was first rebuilt in library order: AnyType 31 s, CompilerBuiltin 81 s, CompilerLibrary 34 s, CompilerAlgebra 3 s, CompilerSystem 3 s, under load 10. All 31 programs compile and run. Against `walk` after the edit:
- **21 of the 25 pairs agree.**
- **4 differ.** `NN32` with `ZZ32` and `NN32` with `ZZ64`, in both orders, answer `ZZ` compiled and `ZZ64` under `walk`. The specification lists `ZZ64` as coercing from `ZZ32` and `NN32` (`Specification/basic-lib/basic-integers.tex:25`), so the narrowest type both coerce into is `ZZ64`, which is what `walk` answers. The compiler prelude's `ZZ64` declares conversions from `IntLiteral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-149`), so the compiled checker's only candidate is `ZZ`'s `MAX`. This is row 442's face "`NN32` into `ZZ64`", closed by the switch-over, which had no gated test until now.
- **The numeral calls.** `NN32` and `NN64` with `1` answer `NN32` and `NN64` compiled, where the prelude's `IntLiteral` converts into each type, and `ZZ64` and `ZZ` under `walk`, where the numeral is a `ZZ32`. The record assigns this to rung Q (the receiver's type after the switch), so it is not measured further here.

Home 2 for the four is `ProjectFortress/compiler_tests/XXXMaxNN32IntoZZ64RungM.fss`, which asserts `ZZ64` for `u MAX z`, `z MAX u`, `u MAX w` and `w MAX u`. It is gated by two `.test` files: a plain-named link companion, `MaxNN32IntoZZ64RungMLink.test`, and the `XXX` file's `run` test with `run_out_contains=REACHED`. This is the shape of `DispatchMethodArmRungGLink.test` and `XXXDispatchMethodArmRungG.test` (FACTS, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files").

The demonstration is in `probes/xxx-compiled.txt`, made by `xxx-compiled.sh` in the shape of the judge's repair of batch 6.5:
- the compiled run prints `REACHED` and fails at the first assertion ("ZZ =/= ZZ64");
- the link test passes;
- the `XXX` test reads "Saw expected failure (Exit code != 0)";
- a control copy whose four expected types are the prelude's `ZZ` compiles and prints `PASS`, and the same `.test` file over it goes red: "Did not see expected failure";
- under `walk` on this tree, the unmodified file prints `PASS`.

When the switch-over gives the compiled path the one library, the file starts passing and the gate says so. It is the rung's first `XXX` file, and the control shows it going red without any edit to the compiler library.

## 10. The three homes

| defect | home | where |
|---|---|---|
| Row 484: under `walk`, `MIN`, `MAX` and `MINMAX` stop with "Ambiguous coercion" or answer a `QQ`, over a `ZZ64` or `ZZ` receiver with a numeral, or over two integer types either of which is `ZZ64`, `NN64` or `ZZ` together with a narrower one | 1, repaired | `ProjectFortress/tests/IntegerMinMaxRungM.fss:33-67` |
| Row 517: under `walk`, `MAXNUM` and `MINNUM` over the integer types stop with "Ambiguous coercion" once a conversion is needed; `Integral`'s two (`Library/FortressLibrary.fss:661-662`) tie with `QQ`'s (`:628-631`) | 2, expected failure (placed at the gather) | `ProjectFortress/tests/XXXIntegerMaxNumRungM.fss`, shown failing and red on a sandbox fix (`explorations/compile-ladder/climb-batch-N/merged-tests/walk-M-maxnum.txt`, `walk-M-maxnum-direct.txt`, `maxnum-fix-diff.txt`) |
| Row 442's face: on the compiled path, `MAX` over an `NN32` and a `ZZ32` or `ZZ64` answers `ZZ`, where the specification's coercions give `ZZ64` (the prelude's `ZZ64` has no conversion from `NN32`) | 2, expected failure | `ProjectFortress/compiler_tests/XXXMaxNN32IntoZZ64RungM.fss:20-23`, with `MaxNN32IntoZZ64RungMLink.test` |
| Row 430's mechanism: two expected failures name their two declarations in another order | already a row (row 430); not a defect of the language, and the specification is silent on the text of the message | `probes/order/` |

The distance classifier's line ranges are a property of a report-only gate tool, not of the language, so they get no ledger row; the record carries the point for the gather (record.md, "For the gather").

## 11. Decisions taken in the rung

- **The bodies: `StandardTotalOrder`'s one `<`.** Three forms were considered:
  - the compiler library's `<=`/`>=` bodies (`CompilerBuiltin.fss:649-651`);
  - native primitives, as `Float`'s and `RR32`'s are (`FortressBuiltin.fss:93-99`), which do not exist for the integer types and would need Java;
  - `StandardTotalOrder`'s bodies (`Library/FortressLibrary.fss:285-288`), which `TotalComparison` already copies at its own type.

  I took the last. It is the one library's own form for exactly this device, and it calls each type's own `<` (a native on four types, `cmp` on `ZZ`). For equal arguments it returns the same argument the inherited body returned (`MIN` `self`, `MAX` `other`), so no answer an inherited declaration gave changes. For integers, equal arguments are the same value, so the compiler library's form would give the same answers.
- **The placement and order.** The three go in the order `MIN`, `MAX`, `MINMAX`, which `StandardTotalOrder`, `TotalComparison`, `QQ`, `RR64` and the compiler library all use. Each group sits right after the type's own comparison operators: after `CMP` on `ZZ64` (below the team's "Argh!" comment) and on `ZZ`; after `<` on `ZZ32`, `NN64` and `NN32`. The api and the component are alike, except that the api's `ZZ` lists no comparison, so there the three follow its four coercions.
- **The spelling.** The compiler library's api form, `opr MIN(self, other:ZZ64): ZZ64`, as the record asks. The neighbouring members in these files spell themselves in several ways (`b:ZZ64):ZZ64`, `other:QQ):QQ`, `other:TotalComparison): TotalComparison`).
- **The test's name and scope.** `IntegerMinMaxRungM.fss`, named beside `IntSemanticsRungI.fss` and `FlatTowerRungF.fss`. Beyond the calls the record lists, it asserts five more mixed-variable calls (`w MIN z`, `v MAX u`, `w MAX v`, `g MAX w`, `v MINMAX u`), so that the `NN64` and `ZZ` declarations each answer a converted call in the gated test, and a negative value both ways.
- **The home-2 test in `compiler_tests/`**, outside the record's list of M's files. Measuring the compiled path is the record's own skeptic check; it found a defect the specification settles, and the three homes owe such a defect a gated expected failure in the batch that measures it. Two alternatives were considered:
  - leaving it to row 442's existing text, which closes it at the switch-over but gates nothing for this face;
  - a `compile` test with `compile_err_contains` on a typed binding, which would turn red on any change to the checker's message, as rung I's changes may make.

  I took the `run` shape with a link companion. It adds two `.test` files to the compiler track.
- **Two comparison passes, not three**, as the record asks for M. Instability is judged against the 17 files on record and by repeating the two order-dependent files on the base and on the edit.

## 12. Stops

None of the stops the record reserves for M was met:
- no `walk` output changed beyond outputs the untouched tree varies on its own (section 6; rung D's stop);
- no overload set of the library is refused after;
- no microGPT value changed, and no line of `explorations/run-c4/src/` or `explorations/apl/mg/` was touched;
- no declaration other than the fifteen was edited, and nothing in the compiler library, `walk`, the checker or the specification.

The two files added to `ProjectFortress/compiler_tests/` are new names that no other rung edits.

## 13. The files and the tracked-path check

New tests: `ProjectFortress/tests/IntegerMinMaxRungM.fss`; `ProjectFortress/compiler_tests/XXXMaxNN32IntoZZ64RungM.fss`, `XXXMaxNN32IntoZZ64RungM.test` and `MaxNN32IntoZZ64RungMLink.test`. Edited: the four library files (section 1). Everything else is under `explorations/compile-ladder/rung-integer-minmax/`:
- scripts copied from rung B: `count-run.sh`, `compare-normalised.py`, `mg-run.sh`, `machine.sh`, `walk-one.sh`, `harness-one.sh`;
- new scripts: `order-repeat.sh`, `new-lines.sh`, `sites-compare.py`, `sites-classes.py`, `xxx-compiled.sh`;
- `count-list.txt` and `probes/`.

Every capture is named `.txt` or `.tsv`. The harness refused this rung's write of REPORT.md and record.md, so the gather writes them from the structured result; the list for Pavol is also committed as `probes/for-pavol.txt`. Every path cited here and in record.md was checked with `git ls-files`, and all are tracked.

## 14. Machine

Every capture carries its machine line: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1`, with the load at each start recorded in the capture. The load was 0.04 at the first matrix run, and 2.9 to 10 during the passes, the distance run and the compiled matrix, while the other rungs of the batch were running.