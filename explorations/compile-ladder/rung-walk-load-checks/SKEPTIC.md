<!-- Climb batch 12, rung W (rung-walk-load-checks): the skeptic's check of the worker's head 8803d2f45 on wip/rung-walk-load-checks, its corrections (ffd2792be, a5f72a93a, a9b7323ef), its one fix (c17cff594, contested) and its verdict. The placeholders NEW-W-1 to NEW-W-6 are rows 665 to 670, numbered by `ledger.py add` at the gather and put in here and in REPORT.md. -->

# The skeptic's verdict on rung W of climb batch 12

Verdict: **contested**. The change does what the section asks, and its Java is right where it reads what it says it reads. Walk refuses at load an object or object expression without static parameters that leaves an inherited abstract method without a body (row 649), an `override` that overrides nothing (row 653's walk half), and a generic trait, object or object expression that breaks the Meet Rule for Functional Methods (row 647). It binds a component's object expressions before that component's top-level variables (row 648).

Row 648's repair stopped at the component boundary. A top-level variable that reads an imported component's object expression still stopped at load with "Missing value: *objectexpr_ObjectExpr". Fixing it needs `Driver.java`, which the section does not give the rung, so the fix c17cff594 is contested. The other findings are corrections:
- a test of a shape the rung repairs but did not gate;
- three expected failures for shapes the record did not name;
- the report's provenance lines;
- the record's entries.

- Head judged: `8803d2f4571d3868f5d1f17c6d650a859bfacabf`.
- The count and distance tables are those of the worker's head. No stage was run here after the fix, as the brief says. The gate's tables on the merged tree are the record.

## 1. What was checked

1. **The tables.** The diff reaches `interpreter/env/`, outside the paths that move neither stage, so the worker ran both. The worker's own outputs agree with REPORT.md section 7:
   - `diff explorations/compile-ladder/climb-batch-11/gate/checker-count.txt tmp/rung-walk-load-checks/checker-count-postedit.txt` prints nothing; the table ends "#crash	none".
   - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-walk-load-checks/distance-postedit.txt` prints "DISTANCE SAME   207", with the class lines the report quotes.
2. **Test first**, read in the worker's transcript (`agent-a9b3016e41ef1fc6c.jsonl`), by time (UTC) and call id:
   - `ukgzge`, 10:14:31 to 10:14:51: `harness-one.sh .../h-base` on the nine tests, header "tree 7fa767d48". This is before the first edit of code, `DCPcwv` at 10:17:50, and before any build. Its lines include " Missing expected refusal at load", "Missing value: *objectexpr_ObjectExpr at .../ObjectExpressionTopLevelVariableWalk.fss:10.6", "** bug! MethodClosure tag(self:S,x:FortressLibrary.ZZ32)... has neither body nor def instanceof Method" and "Tests run: 9,  Failures: 8,  Errors: 0". The ninth, `XXXOverrideNothingWalk`: " Saw expected failure: loaded and ran, not refused at load".
   - The probe builds (10:22 to 10:36) were reverted from saved copies at 10:36:51 (`HecR2q`). The last edit of code was at 10:43:16 (`DsYGVH`, `SingleFcn.java`'s indentation), and the last build at 10:43:22 (`8sTXH4`, "BUILD SUCCESSFUL").
   - `ant testSystem` (`WPsakE`, 10:44:26) and the last harness run (`yyQbAD`, 10:47:41, "OK (21 tests)") ran after that build.
   - The order of `tests-writing.md` holds for every test of the rung.
3. **The diff**, line by line, against the section, traits.tex "Method Declarations" and overloading.tex "Meet Rule". Each check reads what the report says it reads, with two exceptions.
   - The trait `override` check runs in pass 3 only for a trait without static parameters (`BuildEnvironments.java:874`, `ft instanceof FTypeTrait`). REPORT.md said "so a trait that no object extends is checked too" (corrected).
   - The abstract-method check reads walk's method map, which keeps one declaration per signature (section 3, finding 3).
   - The stand-in of `symbolicInstance` is bound nowhere. Its errors are caught (`BuildEnvironments.java:1051`). It gives its functional methods to no overloading: `FunctionalMethodMeets.check` never calls `initializeFunctionalMethods`.
4. **The precedent.** The team's `checkForDef` and its message are reused. Walk's own symbolic instantiation of a generic method's static parameters (`SingleFcn.createSymbolicInstantiation`) makes the stand-in. No device of the library's is replaced.
5. **The tests.** Each is named by its topic and has one comment line. Each cited section exists: traits.tex:361 "Method Declarations", overloading.tex:259 "Meet Rule", object.tex:12 "Object Expressions", variables.tex:18 "Top-Level Variable Declarations".
6. **The differential**: section 2.
7. **The homes**: section 3.
8. **The ledger and the sibling sites.**
   - `facts-extract.sh 'ledger-find:dotted Meet walk'`, `'ledger-find:dotted methods walk'` and `'ledger-find:object expression'` find rows 444, 572, 127, 375, 597 and 648. Rows 444 and 572 bear on the diamond (section 3, finding 3).
   - The sibling of row 648's repair across components is finding 1. Its sibling in a singleton object's field is finding 2.
   - On the other path, the compiled checker refuses both diamonds and cannot compile an object expression (row 375).
9. **The report.** Each provenance line was opened with `sed -n`. Three cited the wrong lines (corrected in a9b7323ef):
   - `rung-walk-open-param/SKEPTIC.md:60` names row 647 only;
   - `rung-checker-overloading/SKEPTIC.md:61` is a sub-line of row 653's finding at `:58-62`;
   - `BuildEnvironments.java:1037` is the `else return null` before the `opr` skip at `:1038-1040`, and the symbolic skip is at `OverloadedFunction.java:1105`, `:1170`.

   The other citations of sections 1, 4 and 6 hold: `Constructor.java:261`, `:267`, `:428-429`, `:466`, `:527`, `:555`, `:615`; `BuildEnvironments.java:874`, `:1032`, `:1278-1280`; `FortressLibrary.fss:3116`, `:3496`, `:379`; `QuickCheck.fss:82`, `:119`; `Random.fss:88`, `:99`, `:126`, `:171`, `:341`; `IntMap.fss:112`, `:125`, `:142`, `:259`, `:406`; the demos' and the team tests' lines.

   The specification has no sentence that the change makes false. The whole-suite run is section 5's.
10. **Competing declarations.**
    - `grep -rnw` over `ProjectFortress/src/com/sun/fortress/` finds the added Java names only at their declarations and uses: `checkGenericFunctionalMethodMeets`, `symbolicInstance`, `declaresOverride`, `checkTraitOverrides`, `checkOverrides`, `unreadable`, `hasBody`, `definedBelow`, `declaredIn` and the skeptic's `initObjectExprs`. The one exception is a local `hasBody` in `parser_util/SyntaxChecker.java:247`, unrelated.
    - Each new test's name occurs once in the test corpora. So do the skeptic's: `ObjectExpressionSingletonFieldWalk`, `ObjectExpressionImportedVariableWalk`, `ObjectExpressionVariableLib`, `Chooser`, `libChooser`, `mkChooser`.
11. **The failure-mode question**: section 4.

## 2. The differential

The probes were run from `tmp/rung-walk-load-checks/skeptic/p/`:
- new: `FORTRESS_HOME=/home/user/fortress-walkloads FORTRESS_THREADS=1 /home/user/fortress-walkloads/bin/fortress P.fss`;
- old: `/home/user/fortress-base12/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 /home/user/fortress-walkloads/tmp/old-caches P.fss`;
- compiled: `old-fortress.sh ... compile P.fss` then `... run P`. The rung changes no compiled code, so the old build's compiled answer is the new one's.

"New" is the worker's head's build, except where the row says it is the fix's.

| Program | old (walk) | new (walk) | compiled |
|---|---|---|---|
| `DottedDiamondAbsFirst`: `trait T1 g(): ZZ32 end`, `trait T2 g(): ZZ32 = 3 end`, `object O extends { T1, T2 } end`, `O.g()` | "** bug! MethodClosure g():FortressLibrary.ZZ32... has neither body nor def instanceof Method" | "Object O does not define an abstract method declared in type T1:" | "Invalid overloading of g in trait O:", "File DottedDiamondAbsFirst.fss has 1 error." |
| `DottedDiamondConcFirst`: the same with `extends { T2, T1 }` | "g=3" | "g=3" | "Invalid overloading of g in trait O:" |
| `DiamondAbsFirst`, `DiamondConcFirst`: the functional twins, `f(self)` | "Invalid overloading of f in O: ..." | the same | not run |
| `ChainBoth`: `T2 extends T1` defines both, `object O extends { T1, T2 }` | "f=2", "g=3" | the same | not run |
| `GetterByField`: abstract getters `g`, `h`; `object O(g: ZZ32) extends T` with field `h: ZZ32 = 5` | "g=3 h=5" | the same, also at `FORTRESS_THREADS=4` | "g= 3  h= 5" |
| `OverrideAsString`: `override getter asString()` in an object with no extends clause and in one extending `Object` | "this is O", "this is P" | the same | "Don't know how to compile this kind of FnDecl" |
| `GenericMethodAbs`: abstract `h[\U\](x: U): U` defined in the object | "h=3" | the same | not run |
| `GenericBodyForAbs`: abstract `f(x: ZZ32)`, object's `f[\U\](x: U)` | "with generic type, at least one pair of parameters must have excluding types" (load) | "Object O does not define an abstract method declared in type T:" | not run |
| `OverrideGenericInstance`: `object O extends G[\ZZ32\]` with `override f(x: Number)` over `G`'s `f(x: T)` | "f=O" | the same | not run |
| `GenTraitOverrideAlone`: `trait G[\T\] extends A` with `override f(x: String)`, no object | "loaded" | "loaded" | not run |
| `GenTraitOverrideObj`: the same and `object O extends G[\ZZ32\]` | "f=G" | "Invalid override of f in G: ... has the modifier override and does not override any inherited declaration" | not run |
| `AbsObjExprGenericFn`: `mk[\T\](x: T): S = object extends S end`, `S` abstract `tag` | "made", then "has neither body nor def" | the same | not run |
| `AbsInGenericMethodObjExpr`: the object expression in a method of a singleton | "made", then "has neither body nor def" | "Object *objectexpr_ObjectExpr at ... does not define an abstract method declared in type S:" | not run |
| `SingletonFieldObjExpr`: `object H v: A = object extends A end end`, `pick(H.v)` | "Missing value: *objectexpr_ObjectExpr at .../SingletonFieldObjExpr.fss:7.10", also at 4 threads | "pick=A", also at 4 threads | "Can't compile ObjectExpr" (row 375) |
| `CrossCompVar`: imports `LibOE`, whose `mk(): A = object extends A end` and `lv: A = object extends A end`; `v = mk()` | "Missing value: *objectexpr_ObjectExpr at .../LibOE.fss:6.11" | the same on the worker's head; on the fix's build, "pick v=A", "pick lv=A" | not run (row 375) |
| `CrossCompLv`: imports `LibOE`; `w = lv` | "Missing value: *objectexpr_ObjectExpr at .../LibOE.fss:7.9" | the same on the worker's head; on the fix's build, "pick w=A" | not run (row 375) |
| `GenProv`: `FunctionalMethodMeetGenericProviderWalk` renamed, at `FORTRESS_THREADS=4` | "A", "A" | "Invalid overloading of pick in G: ..." | not run |

The diff writes no Fortress state and no `atomic` block. The stand-in instantiates generic supertypes into walk's memo at load, so three probes ran at 4 threads too, with the answers above.

## 3. Findings and what was done

1. **Row 648's repair stops at the component boundary: a defect of the change, fixed in c17cff594 (contested).**
   - `CUWrapper.initVars` binds a component's object expressions before its own variables (`CUWrapper.java:284` at 8803d2f45). But `Driver.evalComponent` initializes the components' variables one component after another (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:243-245`).
   - So an importing component's top-level variable that reads an imported component's object expression still stops at load. This holds both for the imported component's own top-level variable (`CrossCompLv`) and for a function that evaluates one (`CrossCompVar`).
   - Row 648's claim, "a top-level variable initialized with an object expression stops the program at load", holds for the imported component's `lv`.
   - The fix: `CUWrapper.initObjectExprs` binds a component's constructors once (`CUWrapper.java:272-284`), and `Driver.evalComponent` calls it for every component before the loop of `initVars` (`Driver.java:243-245`). `initVars` still calls it, a no-op once done, for a component the driver did not reach. Pass 4 only binds variables and forces singletons (`BuildEnvironments.java:310`, `:448`, `:657`, `:819`), so no binding needs another component's pass 4.
   - The ways weighed:
     - (a) this one;
     - (b) binding a component's constructors on demand at the first lookup of `*objectexpr_...`, a change to name lookup;
     - (c) binding them in pass 3, before the other components' functional methods are finished (`Driver.java:235-237`).
   - Test: `ProjectFortress/tests/ObjectExpressionImportedVariableWalk.fss`, with `ProjectFortress/test_library/ObjectExpressionVariableLib.fsi` and `.fss`.
   - Red on the worker's head's build (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/skeptic/h-xc ProjectFortress/tests/ObjectExpressionImportedVariableWalk.fss`, 12:47:07Z, Java unchanged since 8803d2f45):

         Missing value: *objectexpr_ObjectExpr at ProjectFortress/test_library/ObjectExpressionVariableLib.fss:8.23 in environment:
         FAILURES!!!
         Tests run: 1,  Failures: 1,  Errors: 0

   - Green after the fix's build (`ant compileAll`, "BUILD SUCCESSFUL", 12:48). The same harness, on the 26 files of the rung, the skeptic and the kept tests (12:48:48Z): "PASS", " OK (time = 232ms)", "OK (26 tests)".
2. **A singleton object's field initialized with an object expression is repaired by the rung, untested: a correction, a5f72a93a.**
   - `ProjectFortress/tests/ObjectExpressionSingletonFieldWalk.fss`.
   - On the base's code (`FORTRESS_HOME=/home/user/fortress-base12 /home/user/fortress-base12/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/skeptic/old-harness ...`, 12:45:28Z): " UNEXPECTED exception", "Missing value: *objectexpr_ObjectExpr at .../ObjectExpressionSingletonFieldWalk.fss:11.10 in environment:", "Tests run: 4,  Failures: 1,  Errors: 0".
   - On the head (12:45:55Z): "PASS", " OK (time = 239ms)", "OK (4 tests)".
3. **The abstract-method check depends on the order of the extends clause: no fix; row 444's class, gated, a5f72a93a.**
   - `checkForDef` reads the abstract declaration in walk's method map. The map keeps the one declaration of a signature met first (`Constructor.java:182-183`, `SingleFcn.signatureEquivalence`; `putIfAbsent` at `:669`, `:677`, `:682`). `definedBelow` sees only that map's keys.
   - So `DottedDiamondAbsFirst` is refused at load and `DottedDiamondConcFirst` runs `T2`'s `g`.
   - Decision 2 states the rule "any declaration with a body, of its name and self position, whose parameter types are each at or below the abstract one's". By that rule, `T2`'s `g()` defines `T1`'s, and both orders would pass the check. The chapter read literally refuses both.
   - Both programs break the Meet Rule for Dotted Methods. Neither `(T1, ())` nor `(T2, ())` is below the other, and `O` provides no `g` on their meet. The compiled checker refuses both, and row 572 reads the functional twin as a static error.
   - So the refusal of the first order is right by the specification, though the message is another rule's. Accepting the second is row 444's gap (walk does not check the Meet Rule for dotted methods), not the rung's.
   - Making both orders pass the check would leave the first to run `T1`'s abstract `g` and stop at the call. Making the map prefer a body would change which declaration walk runs. Neither is taken.
   - Home 2: `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.fss` (the second order), keyed "Invalid overloading of g". Green on the base (12:45:28Z) and on the head (12:45:55Z): "3", " Saw expected failure: loaded and ran, not refused at load".
   - The record's FACTS entry now states the map's order, and row 444 gets a note (a9b7323ef).
4. **665's residue is wider than its row: corrections, a5f72a93a and a9b7323ef.**
   - A generic trait's `override` that overrides nothing loads when no object without static parameters extends one of its instances (`GenTraitOverrideAlone`). Where one does, the object is refused (`GenTraitOverrideObj`).
   - An object expression in a generic function that leaves an abstract method undefined loads, and the call stops as before (`AbsObjExprGenericFn`).
   - Home 2: `XXXOverrideNothingGenericTraitWalk` and `XXXAbstractMethodUndefinedGenericObjectExpressionWalk`. Green on the base and the head (" Saw expected failure: loaded and ran, not refused at load").
   - Each expected failure was shown red once on the head with its defect removed, from scratch copies (12:46:27Z). The trait was made plain, the function made plain, and the dotted methods made functional: " Refused at load as its keys name" three times, "Tests run: 3,  Failures: 3,  Errors: 0".
   - 665's claim and notes now name the three shapes (row checked with `ledger.py check --rows`). REPORT.md's deviation line and section 1's trait sentence were corrected.
5. **The report's provenance lines**: section 1, item 9, corrected in a9b7323ef.
6. **The worker's report and record** were written from the run's journal (`journal-text.py`, both exit 0) and committed alone, ffd2792be.

The worker's homes for 667 to 669 (rows only, decision 8) follow `tests-writing.md`, home 3: no gated test can pass while walk crashes on the call. They stand.

## 4. The failure-mode question

The rung turns no loud failure into a quiet value outside the specification.
- Rows 649 and 653 and the generic Meet Rule turn a crash at the call ("has neither body nor def"), or a run of one provider's declaration ("A"), into a refusal at load.
- Row 648 and the skeptic's fix turn "Missing value" at load into the object, the value "Object Expressions" gives.
- Where walk cannot read a parameter type, the new checks accept quietly: `definedBelow` and `unreadable` catch `FortressException` (`Constructor.java:480-482`, `:579-587`). Such a program behaves as on the base.
- Decision 2's allowance (666) accepts a program the chapter refuses. Its call outside the narrower types stops as on the base.

## 5. The suite after the fix

`ant testSystem` on c17cff594, the only code state after the worker's (`tmp/rung-walk-load-checks/skeptic/testSystem.txt`, started 12:50:04Z):

    BUILD SUCCESSFUL
    Total time: 2 minutes 29 seconds

The shards ran 131, 137, 138 and 134 tests, 540 in all, with no failure. That is the worker's 535 and the skeptic's five new files. `ant testSpecData` is the gate's.

## 6. Points to report that the rung reaches

The worker's five stand as listed, all reversible:
- the demos `BirdCount1z`, `BirdCount2a`, `GenomeUtil1z`, `GenomeUtil2a` and `npbft`;
- the team's `XXXUnimplementedMethod`;
- the respelled `XXXComprisesLibraryTraitUnlistedExtender`;
- the 146 symbolic stand-ins per load.

The skeptic's fix reaches none: no demo has an object expression (`grep -rln 'object extends\|= object\b' ProjectFortress/demos/*.fss` prints nothing), and the suite's verdicts are unchanged.

## 7. Where the skeptic differs from the worker

- Decision 6 declined the cross-component binding as outside the section's files and unmeasured. It is measured (section 2) and fixed in c17cff594, contested. If the judge reverts c17cff594, the commit's test goes with it, and the residue needs a gated expected failure and a row, as section 3, finding 1, describes.
- Decision 5 reads "A trait's `override` is checked where pass 3 meets a trait that declares one". Pass 3 checks only a trait without static parameters (finding 4).
- Decision 2's rule, as stated, would count an equal-typed body from an unrelated trait. The code counts it only when that trait comes first in the object's transitive extends (finding 3).

## 8. Verdict

**Contested.** The rung is right with the skeptic's corrections and its fix. One fix, c17cff594, touches `Driver.java`, a path the section does not give the rung, and so goes to the judge.
