# Skeptic: climb batch 13, rung W (`rung-walk-override`)

Judged: `wip/rung-walk-override` at 6bfd27720, the worker's head. An earlier attempt of this skeptic wrote the worker's `REPORT.md` and `record.md` from the run's journal (5568364cc, 20:29:43Z) and stopped at 20:45Z. This attempt checked that commit again: `journal-text.py` writes both texts anew and `cmp` finds them equal to the committed files. Every check below was done again in this attempt. The earlier attempt's probe programs were re-run before they were used.

Verdict: **contested**. The rung does what its section asks. But its generic override check had two defects that my programs measured, and I fixed both. Fix 1 (7b625cdf9) is outside the section's files and changes which declaration walk runs. Fix 2 (e8d377669, with 02f94f4a5) gives up a refusal that the worker's D5 kept. A judge rules on each.

Commands in section 2 run from `tmp/rung-walk-override/skeptic/`, after the setup lines of `build-and-caches.md`. `old` is `/home/user/fortress-base13/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 /home/user/fortress-walkoverride/tmp/old-caches`, the base's code. `new` is `/home/user/fortress-walkoverride/bin/fortress` with this tree's build: the worker's code up to 21:26Z, and my fixes from the build that ended at 21:27Z. Direct runs are at `FORTRESS_THREADS=1`. The harness and `ant testSystem` run at 4 threads.

## 1. What I checked

1. **The count and the distance.** `git diff --name-only a1a75716a...HEAD` lists one path outside the paths that no stage reads: `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java`. So both stages had to run, and the worker ran them on 7ea90f57d.
   - `diff explorations/compile-ladder/climb-batch-12/gate/checker-count.txt tmp/rung-walk-override/checker-count-postedit.txt` prints nothing. The table ends `#total 1`, `#crash none`.
   - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-walk-override/distance-postedit.txt` prints `DISTANCE SAME   153`.
   - The sorted site lists are equal, 154 lines each.
   - The report's tables are those of the worker's head. My fixes edit only `interpreter/evaluator/` and `ProjectFortress/tests/`, which no stage reads (FACTS, "The checker-count and distance stages read only the compiler's phases, ..."). So no stage ran after them.
2. **Test first**, read in the worker's transcript (`agent-a199860a98b3c5301.jsonl`):
   - The tests were written at 19:16:55 (calls `Rx7WhA`, and `DFY63P` for the two `git mv`).
   - The harness ran on the seeded base build at 19:17:10-19:17:30 (`sWcp4r`): "tree a1a75716a", four tests "Missing expected refusal at load", "Tests run: 7,  Failures: 4,  Errors: 0".
   - The tests were committed at 19:17:42 (4e0833a4f). The first edit of code was at 19:19:17 (`VHHrAQ`), and the first build started at 19:20:10 (`nrHCry`).
   - A counter probe was built at 19:22:13 (`ACZk6w`) and removed at 19:23:50 (`8dbWdC`). The final build ended at 19:24:35 (`okE5Lw`, "BUILD SUCCESSFUL", "Total time: 44 seconds").
   - The last harness run, 19:24:58-19:25:23 (`4RHKnD`), printed "OK (22 tests)". 7ea90f57d committed that code at 19:25:32.
   - `ant testSystem` (`k4ZTD3`, 19:25:38-19:31:18) printed "Caches ... kept", 139/138/139/143 with no failure, and "BUILD SUCCESSFUL".
   - The recorded failure and pass are as the worker states them.
3. **The diff against the section, the chapter and Q2's review** (`walk-load-readings-check.md`, section 3).
   - The strict relation is in `checkOverrides` alone. `overriddenBy`, `providedByTrait` and `FunctionalMethodMeets.inherited` are unchanged, as `:98` prescribes.
   - `sameParameterTypes` reads equality as mutual subtyping, as `OverloadedFunction.java:1217-1224` does.
   - The generic check runs once, at the declaration, through `symbolicInstance`.
   - Each test exercises its shape. My programs agree in every case the worker named (section 2, table).
   - Two gaps: the stand-in does not read every bound of a static parameter (findings 1 and 2).
4. **The precedent.** The worker followed batch 12's `checkGenericFunctionalMethodMeets` and `FunctionalMethodMeets.inherited`, the right precedents. But `symbolicInstance`'s stand-ins are also where finding 1 enters. The Meet Rule check runs them in `checkComprisesClauses` (`interpreter/Driver.java:227`), before pass 3 (`initFuncs`, `:232`). It is immune only because it skips symbolic parameter types (`OverloadedFunction.java:1105`).
5. **The tests.**
   - Each test has one comment line and is named by its topic.
   - Each cites the specification by file and section.
   - The sections say what the messages say.
   - `PairsRunRangesWalk` asserts the library's own merge rule (`Library/Pairs.fss:92`, `right + other.left >= 2`).
6. **My own programs**, under walk on the old code, the worker's code and my fix, and on the compiled path (section 2).
7. **The three homes.** Section 3.
8. **The ledger and the sibling sites.**
   - `ledger.py find override --open --all` gives rows 665, 615, 653 and 650, and `find "object expression" --open` gives nothing new on overrides.
   - `ledger.py find --cites .../types/SymbolicType.java` gives row 407, whose `SymbolicType.java:74` (`excludesOtherInner`) is `:80` after 7b625cdf9. That is left for the gather.
   - No row holds the sharing of `FTypeTop`'s list: `grep -n "SingleT\|addExtends\|FTypeTop" explorations/coordinator/FACTS.md explorations/fortress-gap-ledger.md` finds nothing on it.
9. **The report.**
   - I opened each provenance line and the lines it cites, and each says what it claims: `walk-load-readings-check.md:68-104`, `:98`, `:100`, `:108-109`; ledger `:245` and `:370`; `traits.tex:521-527` and `:585-595`; `BuildEnvironments.java:1034-1037` and `:1048`; `OverloadedFunction.java:1211-1233`; `Constructor.java:269`, `:468`, `:519`, `:588`, `:595` and `:666` at 6bfd27720; `ComponentWrapper.java:186`; `map/spec-to-implementation.md:221-223`; `FileTests.java:480-512`; `rung-walk-load-checks/REPORT.md:147`; `changes.tex:1017-1032`; FACTS `:150-151`.
   - "Sentences of the specification made false: none" holds. `grep -n -i override Specification/appendices/changes.tex` finds only `:2239` and `:2301`, about the checker's generic method overrides, and `:2619`, the rung's own Rationale.
   - The box's correction matches the code: `TypeAnalyzer.scala:154-158` and `AbstractMethodChecker.scala:81-122`, and 59fdeff62 is Guy Steele's of 2012-06-06. It is in the entry's Change, Rationale and Original text, as the S1 form (POSITIONS, "The S1 form") asks of a revision of the revival's own box.
   - The whole-suite run is the worker's, on 7ea90f57d's code.
   - `record.md`'s FACTS lines, row notes and revival-change text are true of the worker's head. My additions are in its section "The skeptic's additions".
10. **Competing declarations.** `git grep -lw` over `ProjectFortress/` and `Library/` finds each new name of the rung only in its own files: the seven test components, `AnyJoin`, `checkGenericOverrides`, `checkTypeOverrides` and `sameParameterTypes`. My names (`OverrideObjectExpressionWhereBoundWalk`, `OverrideConditionalExtensionWalk`, `OverrideAfterWhereBoundWalk`, `WhereBoundOverloadWalk`, `XXXOverrideObjectExpressionOverParamWalk`, `boundsUnread`, `symbolicDomain`) are new as well. No other rung's branch adds a file of these names: `git diff --name-only a1a75716a origin/wip/rung-... -- ProjectFortress/tests` finds only rung G's `IndexValuePairsDefault.fss` among names holding "override", "Pairs", "Reduction" or "Where".
11. **The failure mode.**
    - The rung turns no loud failure into a quiet value. It turns quiet acceptance into a refusal at load.
    - Fix 2 turns a refusal back into acceptance, the base's behaviour, for one residue (row 693). For that residue's program, the run fails as on the base: `SkObjExprGenBad`, `old`, "Unification error: Closure/Constructor for f param 1 (x:String) got arg 3: ZZ32 of type Int", and the same on the fix.

## 2. Findings, with the programs they rest on

Each program is a few lines, written out here because the files are scratch.

| program (shape) | `old` walk | worker's code | my fix | compiled path (`old compile`, `typecheck`) |
|---|---|---|---|---|
| `SkTraitEq`: `trait C extends A`, `override f(x: ZZ32)` over `A`'s `f(x: ZZ32)` | `C` | refused | refused | "Don't know how to compile this kind of FnDecl" (row 650) |
| `SkFnMethodEq`: functional `override g(self, x: ZZ32)` over the same | `B` | refused | refused | the same wall |
| `SkGetterOverride`: `override getter g()` over `getter g()` | `B` | refused | refused | — |
| `SkSubOfInstanceEq`: `object O extends A[\ZZ32\]`, `override f(x: ZZ32)` over `f(x: T)` | `O` | refused | refused | — |
| `SkObjExprEq`, `SkObjExprGenEq`: equal types in an object expression, plain and in `mk[\T\]` | `E` | refused | refused | — |
| `SkObjExprInGenMethod`, `...InGenObj`, `...InGenTraitMethod`: `override f(x: String)` over `f(x: ZZ32)` in an object expression in a generic method, object or trait | `E` | refused | refused | — |
| `SkGenObjAtParamEq`, `SkGenTraitEq`: `override f(x: T)` over `A[\T\]`'s `f(x: T)`; generic trait at equal plain types | `G` | refused | refused | the same wall |
| `SkTwoParamsOneStrict`: `override f(x: Number, y: ZZ32)` over `f(x: ZZ32, y: ZZ32)` | `B` | `B` | `B` | `typecheck`: "Ambiguous coercion in method invocation B.f" (finding 4) |
| `SkGenObjWiden`, `SkObjExprGenWiden`, `SkGenFBound`, `SkGenBoundedWiden`, `SkGenBoundedAtBound`, `SkGenHeaderWhereAtBound`, `SkGenObjHeaderWhereWiden`, `SkGenWhereAny`, `SkGenWhereNonGenSuper`: overrides that widen, also at a bound in the parameter list or the header's `where` clause | `PASS` | `PASS` | `PASS` | — |
| `SkGenFBoundBad`, `SkGenBoundedBad`: `override f(x: String)` over `f(x: ZZ32)` or `f(x: T extends ZZ32)` | refused | refused | refused | — |
| `SkObjExprWhere`: `mk[\T\](y: T): A[\T\] where { T extends ZZ32 } = object extends A[\T\] override f(x: ZZ32) ... end` | `PASS` | refused | `PASS` | "Don't know how to compile this kind of FnDecl. node = mk[\T extends Object\](y:T):A[\T\]" |
| `SkObjExprBound`: the same with `mk[\T extends ZZ32\]` | `PASS` | `PASS` | `PASS` | — |
| `SkGenWhereAtBound`, `SkGenTraitWhereWiden`, `SkGenWhereWiden`: `trait`/`object G[\T\] extends A[\T\] where { T extends ZZ32 }` (no braces: the `where` is the extends clause's), `override f(x: ZZ32)` or `f(x: Number)` | `PASS` | refused | `PASS` | — |
| `SkObjExprGenBad`: `mk[\T\]`, unbounded, `override f(x: String)` over `f(x: T)` | loads; run fails (above) | not run | the same as `old` | — |
| `SkPolluteAlone`: `trait G2[\U\] extends A2[\U\]`, `override g(x: ZZ32)` over `g(x: U)` | `G2` | refused | refused | — |
| `SkPolluteAfter`: `SkPolluteAlone` after `trait G1[\T\] extends { A1[\T\] } where { T extends ZZ32 }` with an `override` | `G2` | `G2` | refused | — |
| `SkPolluteNoOverrideFirst`: the same, `G1` declaring no `override` | `G2` | `G2` | refused | — |
| `SkPolluteBoundedFirst`: the same, `G1[\T extends Number\]` | `G2` | refused | — | — |
| `SkPolluteOverload`: `G1` as above, `p[\U\](x: U): String = "U"`, `p(x: ZZ32): String = "Z"`, `println(p(3)); println(p("s"))` | `U`, `U` | `U`, `U` | `Z`, `U` | `G1` is refused, "Invalid overloading of f in trait G1"; a trait with a `where` clause is a code-generator wall, "Can't compile TraitDecl W" |
| `SkPolluteOverloadAlone`: without `G1` | `Z`, `U` | `Z`, `U` | — | — |

**Finding 1, a defect of the change. A `where` bound on one unbounded static parameter bounds every unbounded static parameter of the load, so the generic override check accepts what it refuses alone.**
- `new SkPolluteAlone.fss` on the worker's code: "Invalid override of g in G2: g(x:FortressLibrary.ZZ32):FortressLibrary.String ... has the modifier override and does not override any inherited declaration", rc=1.
- `new SkPolluteAfter.fss` and `new SkPolluteNoOverrideFirst.fss`: rc=0, `G2`.
- The mechanism:
  - `FTraitOrObject.setExtendsAndExcludes` gives a type with an empty extends list `FTypeTop`'s one list (`types/FTraitOrObject.java:76-80`; `types/FTypeTop.java:26`, `:44-46`).
  - `SymbolicType.addExtends` then appended a `where` bound to that list in place (`types/SymbolicType.java:54-57` at a1a75716a), so every unbounded symbolic type of the load took the bound.
  - The Meet Rule check's stand-ins make it happen before pass 3, even where `G1` declares no `override`.
  - `SkPolluteBoundedFirst`, whose parameter has a bound of its own and so a list of its own, does not pollute: refused on the worker's code.
- The defect is older than the rung, and on the base it changes which overload runs: `old SkPolluteOverload.fss` prints `U` for `p(3)`, and `old SkPolluteOverloadAlone.fss` prints `Z`.
- Its home: home 1, fixed by 7b625cdf9, with row 692 in `record.md` for the gather to add and close.

**Finding 2, a defect of the change. The stand-in drops two `where` bounds, so the check refuses overrides that the base loads and that the rung's own reading accepts.**
- Under D5 (REPORT.md:268), a static parameter is read below its bounds. `SkObjExprBound` (the bound in the parameter list) and `SkGenHeaderWhereAtBound` (the bound in the header's `where` clause) load. The same bound written as the generic function's `where` clause around an object expression, or as an extends clause's `where` clause, does not reach the stand-in, and the check refuses.
  - `ExprFactory.make_RewriteObjectExpr` makes an object expression's header with no `where` clause (`nodes_util/ExprFactory.java:1127`).
  - `symbolicInstance` reads the extends clause with `NodeUtil.getTypes`, which drops a `TraitTypeWhere`'s clause (`BuildEnvironments.java:1060`). The parse shows `_whereClause=(Some ... WhereExtends ... T ... ZZ32)` inside the `TraitTypeWhere` of `SkGenWhereAtBound`, in its `interpreter_cache` entry.
- `new SkObjExprWhere.fss` on the worker's code: "Invalid override of f in *objectexpr_ObjectExpr at .../SkObjExprWhere.fss:6.50: f(x:FortressLibrary.ZZ32):FortressLibrary.String ...", rc=1. `old`: `PASS`.
- The specification makes a `where` clause a constraint on the static parameter (`trait-parameters.tex`, section "Where Clauses": "Static parameters may have constraints placed on them in a where clause"). It says nothing of what an extends clause's `where` clause means: `traits.tex` gives only its grammar (`:76-83`).
- Its home: home 1, by e8d377669. The fix's residue is home 2 (02f94f4a5, `XXXOverrideObjectExpressionOverParamWalk`) with row 693.

**Finding 3, not a defect: the conditional extends clause and QW-b.** Walk reads `extends A[\T\] where {...}` as unconditional everywhere, not only in the stand-in. Under that reading, the refusal of finding 2's trait shapes is QW-b's shape. Under the language's conditional reading, it is not a static error. Fix 2 takes these shapes off the check, and the question goes to the curator (QW-c below).

**Finding 4: the compiled checker keeps an overridden declaration for a numeral call.**
- `old typecheck SkTwoParamsOneStrict.fss`: "Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (IntLiteral, IntLiteral) only by coercion, none is more specific than every other: (ZZ32, ZZ32)->String; (Number, ZZ32)->String.", rc=255. It is the same message as `SkTwoParamsNoOverride`, the program without `override`.
- With `ZZ32` arguments the checker drops the overridden declaration. `SkOverrideReturnNarrow` (`A`'s `f(x: ZZ32, y: ZZ32): Any`, `B`'s `override f(x: Number, y: ZZ32): String`, `s: String = B.f(z, z)`) checks, rc=0. Without `override` it is refused, "Invalid overloading of f in trait B".
- Walk prints `B`. The chapter makes `A`'s `f` overridden, so only `B`'s applies.
- Its home: home 3, row only (row 694). The rung's paths do not reach `compiler_tests/`, and row 650 stops any compiled test of an `override`. The compiled path is otherwise walled for every construct here: `override` (row 650), a `where` clause, an object expression (row 375).

## 3. My fixes

**Fix 1: 7b625cdf9, "Skeptic's fix: a where clause's bound stays its own static parameter's, under walk".**
- The change: `SymbolicType.addExtend` and `addExtends` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java:46-63`) copy the list before adding the bound.
- The ways considered:
  - (a) copy in the two mutators. Taken: local, and the only writers of a shared list.
  - (b) give every type with an empty extends clause its own list in `FTraitOrObject.setExtendsAndExcludes`: a list for every such type of the library.
  - (c) make `FTypeTop`'s list unmodifiable: it turns the pollution into an `UnsupportedOperationException` at load.
- Tests:
  - `OverrideAfterWhereBoundWalk.fss` with its `.test`, keyed `load_exception_contains=does not override any inherited declaration`: `trait W[\T\] where { T extends ZZ32 }`, then `SkPolluteAlone`'s shape.
  - `WhereBoundOverloadWalk.fss`: `W`, `p[\U\]` and `p(x: ZZ32)`; it asserts `p(3) = "ZZ32"` and `p("s") = "U"`.
- Failing on the worker's head, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-override/skeptic/h-head [the four new tests]` (21:25:18Z, "tree 5568364cc", the worker's build):

      . interpret tmp/rung-walk-override/skeptic/h-head/tests/OverrideAfterWhereBoundWalk
      G
       Missing expected refusal at load
      FAIL: J1/0:U =/= J4/0:ZZ32; p over ZZ32 is more specific than p over an unbounded U, ...
      Tests run: 4,  Failures: 4,  Errors: 0

- Passing: `harness-one.sh $PWD/tmp/rung-walk-override/skeptic/h-fix [30 tests]` (21:27:37Z, on the build of both fixes):
  - "OK (30 tests)";
  - `OverrideAfterWhereBoundWalk` "OK Saw expected refusal at load";
  - `WhereBoundOverloadWalk` "OK".
- Contested, beyond the rung:
  - It edits a file that the section does not give the rung.
  - It reaches a point to report: it changes which declaration walk runs for a set it loads today. `SkPolluteOverload`'s `p(3)` runs `p(x: ZZ32)`, not `p[\U\]`.
  - The worker's report argues nothing on this behaviour. Its D5 (REPORT.md:268) says that the check reads each static parameter below its bounds, which the shared list made false for every unbounded parameter of a load that holds one `where` bound.
  - My argument: the defect is the rung's check giving a load-order-dependent verdict, and the root fix is four lines. The only settled answer for the dispatch is the overloading chapter's: `p(x: ZZ32)` is more specific than `p[\U\](x: U)` (`overloading.tex`, section "Declarations with Static Parameters"), and a trait declared elsewhere does not change that.
  - If the judge reverts it, the two tests go with it, and row 692 stays open with an expected failure to write.

**Fix 2: e8d377669, "Skeptic's fix: walk does not refuse an override over a static parameter whose bounds it does not read", with 02f94f4a5.**
- The change: `Constructor.checkOverrides` (`Constructor.java:600`) counts an inheritable declaration as possibly overridden when two things hold:
  - the owner is an object expression, or extends a type under a `where` clause (`boundsUnread`, `:634-649`);
  - the declaration's parameter types mention a static parameter and are not equal to the override's (`symbolicDomain`, `:651-666`).

  This is the same lenience the method already gives a declaration whose parameter types it cannot read (`unreadable`, `:598`), and the Meet Rule check's skip of symbolic parameter types (`OverloadedFunction.java:1105`).
- The ways considered:
  - (a) carry the enclosing `where` clauses into the object expression's header in walk's rewrite (`DesugarerVisitor.forObjectExpr`, `ExprFactory.make_RewriteObjectExpr`). This changes the run-time instantiation of every generic object expression, and edits a node factory that both paths share. It is beyond a repair, and it does nothing for the conditional extends clause, whose meaning walk does not model.
  - (b) skip object expressions in generic functions. This drops row 665's third shape, which the section asks for.
  - (c) the lenience. Taken: it keeps every refusal the rung's tests pin, and it still refuses equal types (`SkObjExprGenEq`, refused on the fix).
- Tests:
  - `OverrideObjectExpressionWhereBoundWalk.fss` (`SkObjExprWhere`'s shape, asserting `"E"`);
  - `OverrideConditionalExtensionWalk.fss` (`SkGenWhereAtBound`'s shape, asserting `"G"`).
- Failing on the worker's head, in the same run as above:

      Invalid override of f in *objectexpr_ObjectExpr at tmp/rung-walk-override/skeptic/h-head/tests/OverrideObjectExpressionWhereBoundWalk.fss:10.50: ...
      Invalid override of f in G: f(x:FortressLibrary.ZZ32):FortressLibrary.String... OverrideConditionalExtensionWalk.fss:10:3-35 ...

- Passing: in the 30-test run above, each prints "OK (time = ...)".
- The residue: `XXXOverrideObjectExpressionOverParamWalk` with its `.test` (02f94f4a5) gates the refusal that the lenience gives up, `override f(x: String)` over `A[\T\]`'s `f(x: T)` in an object expression. Through the harness:
  - as it is (21:31:45Z): "Saw expected failure: loaded and ran, not refused at load", "OK (1 test)";
  - with `A`'s `f` over `ZZ32` for one run: "Refused at load as its keys name, in an XXX test", "Tests run: 1,  Failures: 1". Then the file was restored (`cmp` equal).
- Contested, worker-argued: D5 (REPORT.md:268) refuses to skip declarations whose parameter types mention a static parameter, since that "would leave an `override` at `T` over an unrelated type unchecked".
- My argument:
  - Where walk cannot see a parameter's `where` bounds, the strict check refuses programs that the rung's own reading accepts: `SkObjExprWhere`, a regression from the base.
  - Lenience is the method's existing answer to what it cannot read.
  - The lenience is confined to the two places where bounds are lost, so the plain and header-bounded generic declarations keep D5's check in full.
  - If the judge reverts it, 02f94f4a5 goes with it, since the XXX test turns red. Findings 2 and 3 then need expected failures (my two tests renamed `XXX`) and a row.

**Corrections.**
- 7737ff90d: `record.md`'s FACTS bullet and entry, rows 692 and 693, 665's note, the handover, and the revival-change sentence for the two fixes. Each is tied to its commit.
- ecda9d812: row 694. Each row was checked with `ledger.py add` on a copy of the ledger in `tmp/`; they took 671, 672 and 673 there.

**The suite my fixes need.** `ant testSystem` once, on e8d377669's code (the build of 21:27Z, "Caches ... kept"), 21:30:18Z:

    [junit] Tests run: 144, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 158.949 sec
    [junit] Tests run: 137, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 173.234 sec
    [junit] Tests run: 143, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 173.724 sec
    [junit] Tests run: 139, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 175.791 sec
    BUILD SUCCESSFUL

- That is 563 tests: the worker's 559 and my four.
- `XXXOverrideObjectExpressionOverParamWalk` was written after the suite listed its files. It is a test file with no code change, and the harness ran it twice (above).

## 4. Where I differ from the worker's account

- D5 is right for the declarations whose bounds walk reads. My fix 2 narrows it where walk drops them (above).
- REPORT section 10, "No declaration that walk runs changed": true of the worker's head. Fix 1 changes one (section 5).
- REPORT section 4's cost stands for the worker's head: 146 declarations read for the modifier, no stand-in built. Fix 2 adds, for each call of `checkOverrides`, a scan of the owner's extends clause for a `where` clause (`boundsUnread`). `symbolicDomain` runs only for a declaration with the modifier, which the one library never has.

## 5. Points to report, questions

**Points to report:**
- At the declaration or at each instance: at the declaration, once, through the stand-in. The cost is 146 declarations read for the modifier and no stand-in per load of the one library. (Worker's point, `BuildEnvironments.java:886-899`.)
- An edit beyond the section's files:
  - the worker's: `BuildEnvironments.java:592` and `ComponentWrapper.java:186`;
  - mine: `types/SymbolicType.java:46-63` (7b625cdf9).
- A change to which declaration walk runs for a set it loads today (7b625cdf9). With a `where` bound on an unbounded parameter in the load, `p(3)` runs `p(x: ZZ32)`, not `p[\U\](x: U)` (`WhereBoundOverloadWalk`; `SkPolluteOverload`: `old` `U`, fix `Z`).
- Not reached:
  - No interpreter test changed its verdict but the rung's four and my new ones.
  - No library type, team test or demo is refused: `git grep` finds `override` in no `.fss` or `.fsi` outside the two test folders, except a comment at `Library/FortressLibrary.fss:4164`, and in no example of `SpecData/`.
  - No normative text changed.

**Questions for the curator:** QW-a and QW-b stand as the worker put them (REPORT section 12), and I add QW-c.

- **QW-c.** Is an `override` in a generic declaration that extends a type under a `where` clause checked with that clause's bounds?
  - Example: `trait G[\T\] extends A[\T\] where { T extends ZZ32 }` with `override f(x: ZZ32)` over `A[\T\]`'s `f(x: T)`.
  - The specification gives the clause's grammar only (`traits.tex:76-83`). Walk reads the extension as unconditional.
  - Way (a): yes, the inherited declarations are read under the clause, and the override overrides. Built, as a lenience: e8d377669; `OverrideConditionalExtensionWalk`.
  - Way (b): no, the declaration is read unconditionally, and the override at the clause's bound overrides nothing (QW-b's way (a)). This is the worker's head.

**Left for the gather:**
- Row 407 cites `SymbolicType.java:74`, which is `:80` after 7b625cdf9.
- The skill's `interpreter.md` and `revival-changes.md` texts, as `record.md` gives them, with the skeptic's sentence if e8d377669 lands.
