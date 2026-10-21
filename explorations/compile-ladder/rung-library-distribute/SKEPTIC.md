# Climb batch 17, rung L: the skeptic's verdict

Head judged: `a95aabd2c`, the worker's last commit on `wip/rung-library-distribute`. My commits after it: `e70aad5a6` (the worker's report and record, from the run's journal), `dbf98fb90`, `4ff9a9a62` and `adb99ed92` (corrections of the report and the record), and this file. None changes code, so no build and no suite ran for them.

Verdict: **approved**. The change does what the section asks, as the probes built it, and its test-first order holds. My findings are corrections of the record and one new row (row 750); none is a defect of the code that a fix here owes, and none is contested.

## 1. What I checked

1. The count stage, run myself on the base build and on the worker's head (section 2); the distance table and its per-site list, read from the worker's files.
2. Test first, in the worker's transcript (section 4).
3. The diff, line by line, against the section, P-151, P-148, F-242, F-248, rows 433 and 677, and the probes' sections the slice printed (section 5).
4. The precedent and the library's way (section 5).
5. The tests: each exercises its defect, carries one comment line, cites no line, and is named by its topic.
6. My own programs, old code against new, under walk and on the compiled path (section 3).
7. The three homes of every defect the report names and every one my programs measured (section 6).
8. The ledger (`ledger.py find`, `facts-extract.sh 'ledger-find:...'` with "where constraint", "where bound", "where method", "embiggen", "distribute", "additiveIdentity", "Symbolic type", "trait where clause") and the sibling sites (section 6).
9. The report's provenance lines, each opened with `sed -n`; the sentences made false; the suites; the points to report; record.md (sections 7 and 8).
10. Competing declarations of `constraintBounds`, `WhereBoundMethodChecker`, `XXXWhereBoundFunctionCall` and `XXXWhereVariableBoundCall` in `ProjectFortress/src/com/sun/fortress/`, the test folders and `test_library`: each is declared once (`grep -rn constraintBounds ProjectFortress/src/com/sun/fortress/` prints `KindEnv.scala:49`, `:58` and `:113` only). Rung A's edits of `KindEnv.scala` are in `EmptyKindEnv` and after `extractNodeBindings` (`git -C /home/user/fortress-anylist diff 3aea3da53 -- .../KindEnv.scala`), no declaration in common.
11. The failure-mode question (section 9).

## 2. The count stage and the distance

The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`; load at start 0.17 for the base run and 0.89 for the head run, one run after the other, with rung C's skeptic beside them.

    (in /home/user/fortress-base17)  time explorations/coordinator/tools/checker-count/run.sh $S/base.txt $S/base
    real	1m16.906s
    (in /home/user/fortress-libdistribute, at a95aabd2c)  time explorations/coordinator/tools/checker-count/run.sh $S/head.txt $S/head
    real	1m18.152s

The worker's were 70.9 s, 82.3 s and 79.7 s: the same order of size, no slowdown of several times.

My two tables differ from each other only in the total, and equal the worker's:

    $ diff base.txt head.txt
    < #total	39
    < #locations	38
    > #total	32
    > #locations	31
    $ diff head.txt <worker's change.txt> && echo TABLE-SAME-CHANGE ; diff head.txt <worker's pass table> && echo TABLE-SAME-PASS ; diff base.txt <worker's base.txt> && echo BASE-TABLE-SAME
    TABLE-SAME-CHANGE
    TABLE-SAME-PASS
    BASE-TABLE-SAME

My `run.txt` files, each tree's path replaced by `TREE`, equal the worker's base, change and pass `run.txt` (`diff` prints nothing for each pair). Against the base, the head's output loses exactly seven errors, `FortressLibrary.fss:3367`, `:3384`, `:3421` to `:3424` and `:3715`, and moves the later positions by the edit's three removed lines; `:130` (row 737) is in both. The pass made no edit, so the head is the commit of step 1 and of step 4 alike.

The distance: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-16/gate/distance.txt <worker's distance-postedit.txt>` prints `DISTANCE DOWN   49 -> 40 (-9)`. Read site by site against `explorations/compile-ladder/gate/distance-sites.tsv`, with the edit's three lines mapped back and positions masked, 9 sites are gone, those at its lines 5, 6, 10, 40, 41 and 47 to 50, and none is new. The report's tables are those of the worker's head.

## 3. My programs, old against new

Each ran on the old code, `/home/user/fortress-base17/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 /home/user/fortress-libdistribute/tmp/old-caches [typecheck|compile] P.fss`, and on the new, `FORTRESS_HOME=/home/user/fortress-libdistribute FORTRESS_CACHES=<a private copy of its caches> bin/fortress [typecheck|compile] P.fss`, from a scratch folder, at `FORTRESS_THREADS=1`. The diff shows no mutable variable, field, atomic block or write into a library's state, so no four-thread run. The library part reaches only walk: the compiled path links the compiler's prelude, so its compiled differential is the count and the distance.

**Walk, the library.**

| Program | Old | New |
|---|---|---|
| empty `SUM` and `PROD` at each of the eight number types, filtered, untyped, declared; and nonempty | `zz32 sum 0 prod 1` ... `rr32 sum 0.0 prod 1.0`, `untyped float sum 0`, `declared filtered float sum 0.0`, `nonempty 10 24 0.75` | the same, byte for byte |
| `SUM[\M5\][i <- 1#4] M5(i)`, then `SUM[\M5\][i <- 1#4, i > 2] M5(i)`, over a user `AdditiveGroup` | `nonempty M5(0)`, then 'Unification error: Closure/Constructor for join param 1 (a:M5) got arg 0: ZZ32 of type Int' | `nonempty M5(0)`, then `CastError` at `FortressLibrary.fss:36:13-27` through `:3377` |
| `PROD[\R3\][i <- 0#0] R3(i)` over a user ring | 'Unification error: ... unlift param 1 (r:R3) got arg 1: ZZ32' | `CastError` |
| `Map`'s `BIG UNION` and `BIG UPLUS` as comprehensions, empty, declared, filtered, nested, and `BIG UNION[\String,ZZ32\](l)` over a list | `{0\|->0, 1\|->10, 2\|->20}`, `{}`, `{} size 0`, `{0\|->v0, ...}`, `{0\|->0, 2\|->2, 4\|->4}`, `{a\|->1, b\|->2, c\|->4}` | the same |
| `IntMap`'s `BIG UNION` and `BIG UPLUS` comprehensions | `{ 0 \|-> 0, 1 \|-> 1, 2 \|-> 2, 3 \|-> 3 }`, `true`, `{ 0 \|-> 0, 1 \|-> 2, 2 \|-> 4 }` | the same |
| `Pairs`' `BIG UNIONPLUS`, `BIG UNIONCAT`, `runRanges` | `{x\|->1, y\|->5}`, `{}`, `{k\|-><\|0, 1, 2\|>}`, `<\|[1,2,3,4]\|>` | the same |
| `BIG UNION[\String,ZZ32\]().reduction.asString` | `MIMapReduceReduction from embiggen` | `mapReduceReduction` |
| `__bigOperatorSugar[\Map[\String,ZZ32\],Map[\String,ZZ32\],Any,Any\](BIG UNION[\String,ZZ32\](), g)` | `old sugar {b\|->3, c\|->4, d\|->5}` | 'Unification error: Closure/Constructor for __bigOperatorSugar param 1 (o:BigOperator[\Map[\String,ZZ32\],Map[\String,ZZ32\],Any,Any\]) got arg BigReduction[\Map[\String,ZZ32\],Map[\String,ZZ32\]\]' |
| the same with `[\X,X,X,X\]` | 'Unification error: ... got arg Comprehension[\Map[\String,ZZ32\],Map[\String,ZZ32\],Any,Any\]' | `sugar {b\|->3, c\|->4, d\|->5}` |
| `SumReduction[\ZZ32\].distribute(MaxReduction[\ZZ32\])`, `SumReduction[\RR64\].distribute(MinReduction[\RR64\])`, `ProdReduction[\ZZ64\].distribute(SumReduction[\ZZ64\])` | `pair MaxReduction`, `pair MinReduction`, `pair SumReduction` | the same |
| `MaxReduction[\ZZ32\].distribute(SumReduction[\ZZ32\])`, the lone inherited generic | `max/sum none` | 'Unification error: Closure/Constructor for distribute param 1 (r:ActualReduction[\ZZ32,K@...FortressLibrary.fss:3453:1-3456:2\]) got arg SumReduction[\ZZ32\]' |
| `SumReduction[\ZZ32\].distribute(SumReduction[\ZZ32\])` | `sum/sum none` | 'Failed to find any matching overload, args = (SumReduction[\ZZ32\])' |
| `SumReduction[\ZZ32\].leftDistribute(MaxReduction[\ZZ32\])` | 'Unification error: ... leftDistribute param 1 (r:Reduction[\ZZ32\]) got arg MaxReduction[\ZZ32\]' | 'Unification error: ... (r:ActualReduction[\ZZ32,K...\]) got arg MaxReduction[\ZZ32\]' |

So no team program's value moved, and the walk changes are four: the generic stops every dotted `distribute` with no written static argument on this branch alone, the lone inherited generic's included (rung W's part A covers it, walk-generic-static REPORT section 8, "The lone inherited generic passes"); a program that writes the nullary operators' old static arguments stops, as the api's retyping implies; the identities' `CastError` reaches a filtered sum over a user group; and the nullary reduction's name. No program in the tree writes the old static arguments (`grep -rn 'Any,Any\\\]' Library ProjectFortress/tests ProjectFortress/test_library ProjectFortress/*_tests` prints nothing). `leftDistribute` and `rightDistribute` have no caller in the library or the tests, and fail on the old code too.

**The compiled checker** (`bin/fortress typecheck`, unless named; each program declares `trait Shows show(): String end`, `object S extends Shows`, traits `A` and `B`, `object Both extends {A, B}`, `object JustA extends A`, `trait Holds[\X\] get(): X end` and `object HoldsStr extends Holds[\String\]`):

| Program | Old | New | Walk |
|---|---|---|---|
| `g[\U\](u: U): String where { U extends A, U extends B } = u.a() u.b()`, `g(Both)` | 'No such method U.a.', 'No such method U.b.' | exit 0 | `ab` |
| the same, `g(JustA)` | the same two | '[\U extends Object A B\]U->String is not applicable to an argument of type OnlyA' | |
| `g[\U extends A\](u: U): String where { U extends B }`, `g(Both)` | 'No such method U.b.' | exit 0 | |
| `h[\U, V\](u: U, v: V): V where { U extends Holds[\V\] } = u.get()`, `h(HoldsStr, "x")`; then `h(HoldsStr, 3)` | 'No such method U.get.' each | exit 0; then '[\U extends Object Holds[\V\], V extends Object\](U, V)->V is not applicable to an argument of type (HoldsStr, IntLiteral)' | |
| `object O m[\U\](u: U): String where { U extends Shows } = u.show() end`, `O.m(S)`; then `O.m("s")` | 'No such method U.show.' each | exit 0; then 'Could not check method invocation O.m - [\U extends Object Shows\]U->String is not applicable to an argument of type String' | `O.m("s")`: '** bug! Symbolic type U... is being matched to value "s"' (row 21) |
| `object Holder[\T\](x: T) describe(self): String where { T extends Shows } = x.show() end`, `describe(Holder[\S\](S))`; then `describe(Holder[\String\]("s"))` | 'No such method T.show.' each | exit 0; then 'Could not check call to function describe - [\T extends Object Shows\]Holder[\T\]->String is not applicable to an argument of type Holder[\String\]' | 'Cannot find definition for method show given receiver "s"' |
| a local `g[\U\](u: U): String where { U extends Shows }`, `g(S)` | 'No such method U.show.' | exit 0 | |
| `k[\U\](u: U): String where { U extends A } = "k"`, `k(S)` | exit 0 | '[\U extends Object A\]U->String is not applicable to an argument of type S' | |
| `g[\U\](u: U): String where { U extends Shows } = "g"`, `g[\String\]("s")` | exit 0 | exit 0 (row 470) | |
| `g[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}} = "g"`, `g(O)`, `O` an `X[\1\]` | exit 0; the compile stops, 'Don't know how to compile this kind of FnDecl' | '[\U extends Object X[\n\]\]U->String is not applicable to an argument of type O' (row 749) | `g` |
| `object Wrap[\T\](x: T) where { T extends Shows } twice(): String = x.show() x.show() end`, `Wrap[\S\](S).twice()`; then `Wrap[\String\]("s").twice()` | 'No such method T.show.' twice, each | exit 0, each; the compile of the second stops, 'Can't compile ObjectDecl Wrap' | the second: 'String must subtype Shows' |
| that `Wrap`, with `useIt(w: Wrap[\String\]): String = "u"` | 'No such method T.show.' twice | exit 0 (row 750) | 'String must subtype Shows' |
| `trait Tr[\T\] where { T extends Shows } showOf(x: T): String = x.show() end`, `object Ob extends Tr[\String\] end`, `Ob.showOf("s")` | 'No such method T.show.' | exit 0 (row 750) | 'String must subtype Shows' |
| `f[\U\](u: U): String where { U extends A } = "a"` beside the same over `B`, `f(JustA)` | 'There are multiple declarations of f with the same parameter type: U' | the same | |
| `h[\U\](u: U): String where [\W\] { U extends Holds[\W\] } = "ok"`, `h(HoldsStr)` | 'W is undefined.' | the same (rung A's opening) | |

(The second row's message names `OnlyA`, the object's name when it ran.)

## 4. Test first

From the worker's transcript (`agent-a2421fa9aae8c9bc5.jsonl`), by time and call id:

- 13:35:39 to 13:36:11, `1NhNGE` to `H9FBsc`: the three tests written and rekeyed.
- 13:36:19, `fVGSbi`: the failing run, on the base's code, before any code edit:

      $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests WhereBoundMethodChecker.test XXXWhereBoundFunctionCall.test XXXWhereBoundChecker.test
          No such method T.show.
       Saw failure, but did not satisfy compile_err_contains; expected
       Saw failure, but did not satisfy compile_exception_contains; expected
      Tests run: 3,  Failures: 3,  Errors: 0

- 13:37:32, `yKN84K`: the first code edit (`KindEnv.scala`); 13:42:53, `ybm1sF`: the first build.
- 13:44:38, `mZNf27`: the red demonstration of `XXXWhereBoundFunctionCall` on `g(S)`, 'Did not satisfy compile_err_contains', then the file restored.
- 14:13:13, `1KRBRr`: the last run, after the last code change, on `cdd25b95d` with `a95aabd2c`'s test: `OK (4 tests)`.

The compiled tests read the compiler's prelude, which the rung does not edit, so the library edits at 13:38 do not bear on the failing run. The library part's test is the distance stage, before and after (section 2).

## 5. The diff, the precedent and the library's way

The diff is the section's, file by file: L4 in `ActualReduction` (`Library/FortressLibrary.fss:3224-3234`), the hack's comment kept at `:3232`; the two `where` conditions (`:3418`, `:3420`); the cast at the identities (`:3377`, `:3394`); `embiggen` typed (`:3711-3712`, `.fsi:2152`) and its callers; B.2 in `KindEnv.scala:44-59`, `:108-128` and `STypesUtil.scala:189-204`, the probe's code. The api's `ActualReduction` and the end of `object KindEnv` are untouched. P-151's rule, "a method's `where` condition bounds its static parameters", is built neither narrower nor broader inside a declaration; at calls the fold covers a function's and a method's own parameters, and a functional method's trait parameter through its lifted arrow (`getStaticParameters`, `STypesUtil.scala:123-127`), not a dotted method's (row 748). The fold also reaches the overloading checker's lifted arrows, which now see `SumReduction`'s overloads as applying where `T extends StandardMax[\T\]`; the count shows no change from it beyond the seven errors.

`embiggen`'s way. The brief asked for a weighing, and I take the worker's: `BigReduction[\T,T\](MapReduceReduction[\T\](j,z))` is the library's own typed shape (`BIG MINNUM`, `Library/FortressLibrary.fss:3476-3478`), which the coordinator's call names (`explorations/reviews/open-asks-2026-10-16.md` section 4, "the library's own typed shape, `MapReduceReduction[\R\](j, z: R)`"), and it leaves the team test alone. Two pieces of evidence the worker's search did not cite:

- The team's demos declare `BigReduction` for every typed `embiggen` result: twelve files, `grep -B2 embiggen` finding `BigReduction` before each, as `ProjectFortress/demos/wordcount.fss:72-81` and `ProjectFortress/demos/BirdCount1m.fss:126-127, 299-306, 417-418`. They support the worker's way.
- `ProjectFortress/BirdyLib/Util.fss:29`, `:35-36` (Tristan King, 2012-05) writes the row's form: `MIMapReduceReduction[\R extends Any\](j:(R,R)->R, z:R) extends MonoidReduction[\R\]` and `embiggen[\T\](j:(T,T)->T, z:T) : Comprehension[\T,T,T,T\]`, with its own callers declared `Comprehension[\X,X,X,X\]` (`ProjectFortress/BirdyLib/Map.fss:181`, `:184`; at `ProjectFortress/BirdyLib/Pairs.fss:95` a `BigReduction` line is commented out for it), though the same file keeps the old `[\X,X,Any,Any\]` forms beside them (`:241`). No running program reaches `BirdyLib` (`grep -rln BirdyLib bin/ default_repository/configuration build.xml` prints nothing), so it is evidence, not the library's way.

## 6. Defects and their homes

- **Row 433, row 677, row 631**: home 1, as the report says. The closes fit the template (`ledger.py close` on a copy of the ledger, with the record's texts: 'row 677: FIXED by cdd25b95d', 'row 631: FIXED by cdd25b95d', 'row 433: FIXED by cdd25b95d').
- **row 748**: home 3, as the brief says. Its notes now say that a functional method's condition is checked at its call (section 3's `describe` rows).
- **row 749**: home 2, `XXXWhereVariableBoundCall`. Its notes now say that the base's checker accepted `g(O)` when the body needs no bound, so the change turns a checker acceptance into a refusal, though both stop before a run on the compiled path; and that the team's test `GenericFnWithExcludes` calls `g(O,P)`, which no `n` meets, and expects it to run (`ProjectFortress/tests/GenericFnWithExcludes.fss:44-45`).
- **row 750** (mine): a trait's or object's own `where` constraint is not checked where its type is used; the checker now accepts `Wrap[\String\]` and `Ob extends Tr[\String\]`, which it refused on the base only for their bodies, and walk refuses at load. A refusal not made: home 3, the row only, reproducer none, in record.md. Not repaired here: no check of a type's use reads a `where` constraint, and building one is a new checker path the section does not give the rung.
- **Row 470**: a static argument written at a top-level call is not checked against a folded bound (`g[\String\]("s")` accepted). The row holds the defect; it has no room for a note, so the FACTS entry carries it.
- **Row 21**: the lone inherited generic and the overloaded set alike stop on this branch alone, and walk's `** bug! Symbolic type U ... is being matched to value "s"` for a generic dotted method called with a value that breaks its condition is the row's 'Symbolic type T ... matched to value 3: ZZ32' face. Rung W's.
- **Row 436**: the cast clears the sites, not the defect; the filtered sum over a user group reaches it too (section 3). The row has no room; the FACTS entry carries it.

## 7. The report and the record

Corrected, in `dbf98fb90`, `4ff9a9a62` and `adb99ed92`:

- The report's problem line cited `distance-sites.tsv:2`, the export site; the cleared rows are `:5-6`, `:10`, `:40-41` and `:47-50`. The other provenance lines say what their lines hold (`sed -n` of each: `trait-parameters.tex:333`, `:350`; `FortressLibrary.fss:3235` at 3aea3da53, `:3367`, `:3476-3478`; `Generator2.fss:172`; the three `.fsi` lines; `XXXWhereBoundChecker.test:3` at 3aea3da53).
- Section 5's "The one change of walk behaviour is the nested reduction" was false; it now lists the four of section 3.
- Section 11's team lines held four of the revival's: `FortressLibrary.fss:3380` and `:3397` (`git blame -L 3380,3380 3aea3da53` gives `d846e3644c (Claude 2026-09-27)`), the identities the revival wrote, and `:3421`, `:3423` (`aadd02f236 (Claude 2026-10-09)`), `SumReduction`'s overloads, which the revival made generic; the team's `SumReduction` was over `Number` (`Library/FortressLibrary.fss:3021-3039` at a874948ac). record.md's Revival change said "The team's library" of both; it now says whose they are.
- Five of the worker's ledger notes did not fit their rows: `ledger.py note` on a copy refused 436 ('row-length: 1520 characters; at most 1200'), 701 (1397), 737 (1352), 21 (1452) and 101 ('notes-length: 850 characters; at most 700'), and 744 overran by 4. 701, 744 and 101 now carry texts that fit ('row 701: note added (1199 characters)', 'row 744: note added (1127 characters)', 'row 101: note added (1033 characters)'); the others say there is no room and where the fact is kept. With row 748 to row 750 added on the same copy, `ledger.py check --summary` reports the same 10 failing rows as the ledger has today.
- The FACTS entry named two holes; it names the four, and walk's stop of every dotted `distribute` that writes no static argument, and the `CastError`.
- The entries made false lacked F-85 ("three sites of the distance are left there": the identities' fallback and `embiggen`, two of the three, are gone).

The suites: `ant testQuick` (1226, 263 and 86, `BUILD SUCCESSFUL`), `ant testSystem` (630, the one failure `LibraryOverloadFamilies.fss:37:12-62`, 'Failed to find any matching overload, args = (ProdReduction[\ZZ32\])', the only red line of the four shards' results) and `ant testSpecData` (130, `BUILD SUCCESSFUL`) ran on `cdd25b95d`, the head's code, as the worker's logs and `ProjectFortress/TEST-RESULTS/system-3/` show.

## 8. Sentences made false

In `Specification/`: none. The Appendix I entry on `where`-clause variables (`Specification/appendices/changes.tex:1465-1484`) says what the checker does with a size variable and that it does not open a type variable; it says nothing of trait constraints. `Specification/basic/functions.tex:15-19` stays true. In the record: F-242, F-243, F-244, F-248, F-53, as the worker lists, and F-85.

## 9. The failure-mode question

- The checker now accepts programs it refused on the base, for a wrong reason, and that the specification refuses: row 748's dotted call, row 750's uses of a constrained trait or object, and row 470's written static argument. The accepted value is a well-typed verdict where the code generator or walk then stops (row 701's wall; walk's 'String must subtype Shows' or 'Cannot find definition for method show').
- It refuses one it accepted, row 749's.
- Under walk the identities' fallback stays loud: `CastError` for a 'Unification error'.
- No loud failure became a quiet value.

## 10. Questions for the curator

- row 749's fold, as the worker asks, with two more facts: the base's checker accepted a call whose body needs no bound (`g(O)` above), and the team's test `GenericFnWithExcludes` expects the call that no `n` meets to run (`ProjectFortress/tests/GenericFnWithExcludes.fss:44-45`), so the team's test and the text, as the worker and I read it, disagree on it.
- `MIMapReduceReduction`, as the worker asks; `ProjectFortress/BirdyLib/Util.fss:29` is the team's typed form of it, `MonoidReduction[\R\]` over `(R,R)->R`.
