# Skeptic's review of rung E (climb batch 21b): the api aligned with its component, and the export check brought to its rule

Verdict: **approved**, with one fix of the change (settled) and corrections of the report and record. Judged head: `18179f051` (the worker's last commit). Head after this review: the commit of this file.

## 1. What I checked, and what it rests on

**The worker's report and record** were missing from the branch (the harness had refused the worker's write). I wrote both from the run's journal with `journal-text.py`, byte for byte, as `9c37973f6`. That commit's footer carries a tier name where `committing.md` gives `Co-Authored-By: Claude`; it is pushed, so it stays.

**The tables against the worker's files** (a read of its `tmp/` logs). The count table of `18179f051` equals the base's and the landed `climb-batch-21/gate/checker-count.txt` ('#total 3', '#locations 3', '#crash none'). Its two `run.txt` files, with the tree paths masked, are equal (38 lines each). The distance table reads '#total 5', '#kind export 1', '#crash none'. `compare-sites.py` against `explorations/compile-ladder/gate/distance-sites.tsv` reads 'landed 5 now 5' and 'landed 43 entries, now 15'. I read the new entries' api and component lines, and each is a real difference, not an artifact of the name comparison:

- `TotalComparison`'s `=(self, other:Comparison)` (fsi:125) beside the component's `=` at `TotalComparison` and `Unordered` (fss:165-166);
- `RR64`'s `^(self, b:RR64)` (fsi:366) beside the component's `^(self, b:Number)` (fss:485);
- `Condition`'s `indices(): CompactFullRange[\ZZ32\]` (fsi:940) beside the component's `Generator[\ZZ32\]` (fss:1526);
- `ActualReduction`'s `leftDistribute(r: Reduction[\R\])` (fsi:1905) beside the component's generic `leftDistribute[\K\](r: ActualReduction[\R,K\])` (fss:3251).

**The count stage myself** (`compiler.md`, "The checker's time", for a reviewer), on an idle machine with nothing beside it: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. The command was `time explorations/coordinator/tools/checker-count/run.sh $W/count/$N.txt $W/count/$N`, run from the base build for `base` and from the rung's tree, built at `18179f051`, for `change`. That commit is both the worker's step-1 commit and its head, since the worker made no pass edit.

| Run | Load at start | `real` | Worker's |
|---|---|---|---|
| `base` (`/home/user/fortress-base21b`, the base's code) | 0.28 | 76.5 s (1m16.523s) | 111.8 s |
| `change` (`18179f051`) | 0.85 | 76.6 s (1m16.566s) | 95.6 s |

My two tables are equal to each other and to the worker's `change` table (`diff` prints nothing). My two `run.txt` files, masked, are equal to each other and to the worker's (38 lines). The times are in the worker's order of size; the worker's were taken under load. The run's output holds no export message ('not matched', 'does not define all', 'exports API': 0 lines in each). This bears out the worker's finding 5: the stage stops at 'File FortressLibrary.fss has 3 errors.' and never reaches the check.

**Test first, in the worker's transcript** (`agent-a5a24580157ebae73.jsonl`; UTC; call ids):

- 20:12:15 `g6n2EV`: the five tests written.
- 20:13:20 to 20:13:27 `79UkLR`: `junit.sh base` on the base's code, 'Saw failure, but did not satisfy compile_err_contains; expected different method f', and so on, then 'Tests run: 6,  Failures: 6,  Errors: 0'.
- 20:14:40 `sHdkZQ`: the first edit of `ExportChecker.scala`. 20:15:28 `dNXVbS`: the first build.
- 20:19:30 `dR7RRf`: the last code edit (`CompilerBuiltin.fss:1170`).
- 20:23:48 `ZRPRAQ`: the respelling of `ExportComprisesEllipsisAbstract`. 20:23:59 `7KXukS`: the respelled test seen failing on the old code through `old-fortress.sh junit`, '... is not declared in the API'.
- 20:37:45 `Bv8JSM`: `ant testQuick` on the final code, compiler track 'Tests run: 1301, Failures: 0, Errors: 0', then 'BUILD SUCCESSFUL'.

So each test was seen failing on the base's code before the edit was first built, and passing after the last change of code.

**The diff, line by line.**

- `run2-api.patch` was taken unchanged: the `+` and `-` lines of `git diff aa5c67d48 18179f051 -- Library/FortressLibrary.fsi` equal the patch's (`diff` prints nothing).
- The api diff has 60 `+ abstract` lines: 57 lines written `abstract` and the 3 that join. It has 27 other `+` lines: the 6 changed, the 19 follow-on lines and Array2's 2 subscripts. It removes 64 lines. I spot-checked 37 line citations in REPORT.md section 6 with `sed -n` against the head's `FortressLibrary.fsi`, and each holds.
- `ExportChecker.scala`:
  - row 800: `equalNames` through `equalIdOrOps` (`:597-604`, `:612`);
  - row 802: the swapped `equalMember(r,d)` (`:761`);
  - 4i: `isAbstractMember` and the count rule (`:775-779`, `:791`, `:796`);
  - the field's message (`:799-803`);
  - row 801: the joined expression (`:841-845` at `18179f051`).

  Each does what the section names.
- The ways note proposed the team's unused `ignoreAbstract` argument of `equalFnHeaders` for 4i's first rule (`explorations/reviews/array-sites-ways.md:458-463`). The worker's skip of an api member written `abstract` gives that rule's result in the api-to-component direction, so the argument stays unused, as at the base. This is not a finding.
- The prelude line (`CompilerBuiltin.fss:1170`) writes `consume` as its api does (`CompilerBuiltin.fsi:600`) and as its siblings do (`:1168-1169`).

**Precedent and siblings.**

- Within the file: `equalParams` binds the parameter names and does not compare them (`ExportChecker.scala:658-670`). The text compares parameter types only ("the union of whose parameter types", `source-code.tex:355-360`), so this is no sibling of row 800.
- Rung C's branch reads every symbolic operator through a new `isCheckedName` and leaves `isDeclaredName`, which the export check uses (`ExportChecker.scala:274-275`), alone (`git diff aa5c67d48 origin/wip/rung-symbolic-check -- .../OverloadingChecker.scala`). So row 782 stays latent after the merge, and it needs no note.

**Competing names.** None of the eight new test names, nor `equalNames` and `isAbstractMember`, is declared anywhere else in `ProjectFortress/` or `Library/` (grep).

**The specification.** No sentence of `Specification/` is made false. Appendix I has no entry on the export check: its two `export` lines, `changes.tex:1698` and `:3232`, speak of `comprises` clauses. The components chapter's `\note` boxes (`apis.tex:15`, `:235`; `basic.tex:148`) say nothing of what the check does.

## 2. Differential: my own programs

The programs are under `tmp/rung-export-align/skeptic/prog/`. The new code ran with a private copy of the tree's caches. The old code ran with `/home/user/fortress-base21b/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21b /home/user/fortress-exportalign/tmp/old-caches`. The export check runs only compiled. Walk runs no export check, so the walk runs show the api's effect on the interpreter's library.

| Program (api / component) | new compile | old compile |
|---|---|---|
| `SkOprName`: api `opr +(self, o: T): T`, component `opr -(self, o: T): T = self` | refused, 'different method +' | rc 0 |
| `SkGetterName`: api `getter size()`, component `getter length()` | refused, 'different method size' | rc 0 |
| `SkFnMethodName`: api `f(self): ZZ32`, component `g(self): ZZ32 = 1` | refused, 'different method f' | rc 0 |
| `SkOverloadName`: api `f(x: ZZ32)` and `f(x: String)`, component `f(x: ZZ32)` and `g(x: String)` | refused, 'different method f' (the `String` one) | rc 0 |
| `SkMatchKinds`: a getter, `opr [i: ZZ32]`, `opr IN(n: ZZ32, self)`, `num(self)`, prefix and infix `-`, `opr \|self\|`, matched on both sides | rc 0; run '3', '7', 'true', '5', '9', 'DONE' | the same |
| `SkTopLevel`: top-level `f`, infix and prefix `opr` over an object | rc 0 | rc 0 |
| `SkAbstractBoth`: `abstract f()` and `abstract h(self)` on both sides, defined by an object | rc 0 | rc 0 |
| `SkFieldType`: api `x: ZZ32`, component `x: String = "a"` | refused, 'different field x @' | refused, 'different field @' |
| `SkFieldVar`: api `x: ZZ32`, component `var x: ZZ32 := 1` | **refused, 'different field x'** (at `18179f051`) | rc 0 |
| `SkFieldColonEq`: api `x: ZZ32`, component `x: ZZ32 := 1` | rc 0 | (not run) |
| `SkAbstractOtherHeader`: api `abstract f(): ZZ32`, component `f(): String = "s"` | rc 0 | refused, 'different method f' |
| `SkLibAbs` with client `SkClientAbs`: api `trait T abstract f(): ZZ32 end` and `mk(): T`; component `trait T end`, `object O extends T end`, `mk(): T = O`; client `println(mk().f())` | lib rc 0, client rc 0, run 'REACHED', then **'java.lang.NoSuchMethodError'**, rc 1 | lib refused ('missing members of the trait/object in the component') |
| `SkLibAbs2` with client `SkClientAbs2`: the same with `f(): String = "a string"` in the component's `T` | lib rc 0, client rc 0, run 'REACHED', then **'java.lang.NoSuchMethodError'** | lib refused ('different method f') |
| `SkConsume`, compiled: `makeJavaBufferedReader`, `readLine`, `consume`, `close` inside `try` | rc 0; run 'component SkConsume', 'DONE' | the same |

Walk, new against old: the output is the same (`cmp`) for each program below.

- `SkWalkZZ`: `ZZ`'s `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`, `zero` and `one`; `^` with a `ZZ64` exponent on `ZZ`, `ZZ32` and `ZZ64` bases; `EqualTo < GreaterThan`, `EqualTo < LessThan`, `LessThan < EqualTo`; `EqualTo.asString`. It prints '3', '2', '2', '1', '85', '6188', ..., '4913', '8', '27', '0', '1', 'true', 'false', 'true', 'EqualTo', 'DONE'.
- `SkWalkArr`: `Array2`'s `m[:, 1]` and `m[2, :]` sums, `"hello".bounds`, `Just(4).bounds`, `(3:)` and `(:)` `shiftLeft` and `shiftRight`, `check` and `every`. It prints '33', '63', '[0,1,2,3,4]', '[0]', ..., 'DONE'. It ran at `FORTRESS_THREADS=1` and at `=4`, with the same output, because it writes the array's elements.
- `SkClientAbs` under walk: 'Cannot find definition for method f given receiver O', on both codes.
- `SkMatchKinds` under walk: as compiled, on both codes.

The compiled path does not link `FortressLibrary` before the switch-over: `SkWalkZZ` compiled is refused ('Variable big is not defined.') on both codes. The rung's diff has no mutable state, field write or `atomic` block of Fortress code. The checker's `var cause` is a local of the Scala, so no other program needed a four-thread run.

## 3. Findings

1. **A `var` field no longer satisfied the api's field: a defect of the change, fixed (settled).**
   - With row 801's comparison of modifiers joined in, the check refused `var x: ZZ32 := 1` for an api's `x: ZZ32` ('different field x'), and the base accepts it.
   - It still accepted `x: ZZ32 := 1`, the same mutable field without the keyword. The parser puts `var` into the modifiers (`NoNewlineHeader.rats:264`) but `:=` only into the `mutable` flag (`Variable.rats:92`).
   - The text: "the \KWD{var} modifier without \KWD{settable} only affects implementations" (`Specification/basic/traits.tex:759-761`). An api field takes no `var` (`ApiFldMod`, `traits.tex:717`). A field is satisfied by its (possibly implicit) getter (`source-code.tex:393-396`).
   - The ways I listed:
     - (a) leave `Var` out of both sides' modifiers, the file's own way (`equalFnHeaders`'s `modsL.remove(Modifiers.Abstract)`, `ExportChecker.scala:614-615`);
     - (b) drop the modifier comparison, against the section's "names and modifiers";
     - (c) build the getter-and-setter rule of `source-code.tex`, the curator's question below;
     - (d) record it and leave it.

     I took (a).
   - Test `ExportVarFieldMatchesField`:
     - Failing on the worker's head (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests ExportVarFieldMatchesField.test`, 21:54:38Z):

           due to different field x @ ProjectFortress/compiler_tests/ExportVarFieldMatchesField.fsi:5:5-6:2)
           Tests run: 1,  Failures: 1,  Errors: 0

     - Passing on the old code (`old-fortress.sh ... junit .../ExportVarFieldMatchesField.test`): 'OK (1 test)'.
     - After the fix, built with `ant compileAll` ('Caches ... started again, empty') and then the library order (five rc 0, five jars), I ran `junit.sh skfix` with the rung's eight cases, 21:57:56Z: '. compile ProjectFortress/compiler_tests/ExportVarFieldMatchesField  OK', `XXXExportFieldName` 'Saw expected failure', 'OK (9 tests)'.
     - The fix, as its own code state: `ant testQuick` gave 'Tests run: 86, Failures: 0' (library), 'Tests run: 263, Failures: 0' (other-compiler) and 'Tests run: 1302, Failures: 0, Errors: 0' (compiler: the worker's 1,301 and this test), 'BUILD SUCCESSFUL', 'Total time: 5 minutes 32 seconds'. The code was committed after the run as `13cf0b5ec`, with no change of code between.
   - The count and distance stages were not run again (the brief). Their results cannot move: the count stage never reaches the export check (above), and none of the 15 entries of the distance stage's export error at `18179f051` names a field, while the fix only accepts more.
   - P-148: the fix adds two `remove` calls per field comparison, and the count stage does not reach the check, so no timing was taken.
2. **An api member written `abstract` and left out by its component compiles, and a client's call of it dies at run time** (`SkLibAbs`, `SkLibAbs2` above). This is the failure-mode answer.
   - The rung turns the base's loud refusal ('missing members', 'different method f') into acceptance.
   - The value a client then meets is `java.lang.NoSuchMethodError` at the call; walk gives 'Cannot find definition for method f given receiver O'.
   - Fork 20's default, the brief's (the rung's section; `CLIMB-BATCH-21.md:167`), asks for exactly this acceptance, so it is not fixed here.
   - Home 3: the conflict is between `apis.tex:252-255`, read as the fork reads it, and `source-code.tex:383-384` ("a satisfying trait declaration is allowed to provide a concrete declaration", which reads as still declaring it). Its records: row NEW-E-2 in `record.md` (CONTESTED, checked against a copy of the ledger with `ledger.py add`: it passes the template), and `ExportAbstractMemberAbsent`, which asserts today's acceptance. A question for the curator below.
3. **Report and record corrections**, `616956284`:
   - REPORT.md cited `ExportChecker.scala:623` for `equalStaticParams`' `equalIdOrOps`; that is the base's line, and the head's is `:632`.
   - Row 801's citation is now given at `18179f051` and after the fix.
   - `record.md`'s finding 1, its FACTS entry and its Revival change read "modifiers other than `var`" and name `ExportVarFieldMatchesField`; findings 7 and 8 and row NEW-E-2 were added.

   The worker's account of its own decisions is unchanged. Where I differ: the worker's decision on the field ("A field needs no definition only if every name it declares is abstract") stands; I differ only on which modifiers the field comparison reads.
4. **NEW-E-1** (the worker's) stands as filed: my run `junit.sh skfix` shows the pair green, '. run ... XXXFunctionalMethodComprisedObject (340ms) REACHED', 'Saw expected failure (Exit code != 0)'. No ledger row holds it (`ledger.py find NoSuchMethodError --open`: rows 366, 390, 594, 643 and 773, none of this shape).

## 4. The points to report, as the rung now stands

- run2-api.patch was taken as it is (88 lines, `+` and `-` equal to the planner's). The check's four edits are as named, with the field's message naming the field. The skeptic's fix leaves `var` out of the field's modifiers (`ExportChecker.scala:846`).
- The export error goes from 43 entries to 15, entry by entry in REPORT.md section 5, and no site comes in any component. These are the tables of the worker's head `18179f051`; the fix cannot move them (finding 1).
- The count stage: the worker's 111.8 s and 95.6 s; mine 76.5 s and 76.6 s; no pass edit. The tables are equal, and so are the masked outputs.
- The declarations that join or change in the api, and so Part IV: REPORT.md section 6.
- Compiled tests whose verdict changes: none of the existing ones. Nine new cases: the worker's eight and `ExportVarFieldMatchesField`.
- Sentences made false: none in `Specification/`. In the record: rows 800 to 802's claims and the export probe's present-tense counts (REPORT.md section 9).
- A file edited beyond those named: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1170`, the compiler's prelude, a throws clause and no declaration. The component's bodies are not edited.

## 5. For the curator

- **4i and the run-time call** (NEW-E-2). With fork 20's reading, a component may leave out, or redeclare at another header, a member its api writes `abstract`, and a client's call of that member dies with `NoSuchMethodError` (finding 2). The other reading takes only 4i's first rule: a component member of the same header, `abstract` or concrete, through the team's `ignoreAbstract` (`ExportChecker.scala:614-615`). It keeps the guarantee, but it keeps in the export error those of the probe's 8 whose component member is absent or of another header (`perf-probes/export-check-full/REPORT.md`, section 3.2). Default if unanswered: fork 20's reading stays, and NEW-E-2 records it.
- **The worker's question on fields and method sets stands, narrowed.** `var` is settled by the fix. A `settable` or `hidden` difference, and a getter satisfying an api field (`source-code.tex:393-396`), are still compared as the team wrote them. So is a set of methods satisfying an api method (`:398-403`).
