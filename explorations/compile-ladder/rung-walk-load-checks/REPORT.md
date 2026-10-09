# Climb batch 12, rung W: walk's load checks of abstract methods, `override` and generic providers, and a top-level object expression

- problem: rows 647, 648 and 649, measured through the harness by batch 11 rung W's skeptic (`explorations/compile-ladder/rung-walk-open-param/SKEPTIC.md:46-50`, `:63-66`), and row 653, measured by batch 11 rung C's skeptic (`explorations/compile-ladder/rung-checker-overloading/SKEPTIC.md:58-62`); the rows: `explorations/fortress-gap-ledger.md:309` (647), `:242` (648), `:243` (649), `:363` (653)
- spec: "any object inheriting an abstract method must define a body expression for the method" and "It is a static error if a declaration with the modifier override does not override any inherited declaration" (`Specification/basic/traits.tex:571`, `:594-595`); the Meet Rule for Functional Methods over "declarations occurring in trait or object declarations or object expressions" (`Specification/advanced/overloading.tex:471`); "Object expressions denote object values" (`Specification/basic/expressions/object.tex:31`)
- precedent: the team's `Constructor.checkForDef` and its refusal "Object ... does not define an abstract method declared in type ..." (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:409` at 7fa767d48)
- deviation: an inherited abstract method counts as defined by a declaration with a body at or below its parameter types, where the chapter's inheritance leaves the object inheriting the abstract declaration (`Specification/basic/traits.tex:521`)
- deviation: an `override` overrides an inherited declaration whose parameter types equal its own, where the chapter says "a strict subtype" (`Specification/basic/traits.tex:589`)
- deviation: the abstract-method and `override` checks skip instances of generic objects (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:261`), and so object expressions in generic functions, and the `override` check skips a generic trait that no object without static parameters extends (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:874`)
- deviation: the generic Meet Rule check reads no pair whose parameter types mention a static parameter (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1105`, `:1170`), and skips a declaration with an `opr` parameter (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1038-1040`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java`, `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:163`, and, with the skeptic's fix `c17cff594`, `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java`

## 1. What changed and why

Four repairs of walk, under `interpreter/evaluator/` and `interpreter/env/`, in commit 8803d2f45, after the tests in 4c2ee7772. No line of the library, the checker, the harness or the specification changes.

**An inherited abstract method left without a body (row 649).** Walk builds an object's methods in `Constructor.finishInitializing`, as a map from each signature to the type that gives it: the object's own declarations first, then its traits' declarations by specificity. The team's `checkForDef` refused a declaration that was neither a function declaration nor a native. But it returned for every `FnDecl`, a bodiless one included (`Constructor.java:414` at 7fa767d48). So `object O extends S end` loaded, where `S` declares `tag(self, x: ZZ32): ZZ32` with no body, and `tag(O, 3)` stopped with "MethodClosure tag(...) has neither body nor def instanceof Method".

Now `checkForDef` returns only for a declaration with a body (`Constructor.java:428-429`), so the team's own refusal fires on an abstract one: "Object O does not define an abstract method declared in type S". This covers:
- object expressions, which walk lifts to objects and finishes at load (`ComponentWrapper.registerObjectExprs`);
- the case that row 614 reached anew: an object below a trait whose abstract `override` overrides a concrete declaration inherits only the abstract one.

The check accepts an abstract declaration when the object also provides a declaration with a body of the same name and self position whose parameter types are each a subtype of the abstract one's (`definedBelow`, `Constructor.java:466-484`). The library needs this. `NewlineReduction` declares `simpleJoin(a: String, b: String)` under `AssociativeReduction`'s abstract `simpleJoin(a: Any, b: Any)` (`Library/FortressLibrary.fss:3496-3499`, `:3116`). Without the allowance, walk refused the library at load, and so every program (section 4). Decision 2 lists the ways weighed; row 666 gates the residue.

**An `override` that overrides nothing (row 653, walk's half).** `Constructor.checkOverrides` (`Constructor.java:555-576`) refuses an `override` declaration when, among the declarations the type's immediate supertraits provide, it overrides none of those with its name and its self position. "Overrides" is judged by `overriddenBy`, row 614's reading. The check runs:
- for an object's own declarations (`:267`);
- for each trait above an object, as `providedByTrait` computes what that trait provides (`:527`);
- for a trait without static parameters that declares an `override`, when pass 3 meets it (`BuildEnvironments.forTraitDecl3`, `BuildEnvironments.java:874`), so such a trait that no object extends is checked too. A generic trait's is checked only where an object without static parameters extends one of its instances.

A generic declaration is not refused, and neither is one beside an inherited declaration of the same name that is generic or that walk cannot read. The message is "Invalid override of f in B: f(x:FortressLibrary.String):FortressLibrary.String... has the modifier override and does not override any inherited declaration". The checker's half waits on row 650.

**The Meet Rule for a generic provider (row 647).** Batch 10's check ran over the traits and objects without static parameters, and batch 11's over the object expressions without them (`BuildEnvironments.java:1217`, `:993` at 7fa767d48). Now:
- `checkFunctionalMethodMeets` also checks each trait or object with static parameters (`BuildEnvironments.java:1278-1280`);
- `registerObjectExprs` checks each object expression with static parameters (`ComponentWrapper.java:186`), which is how walk lifts an object expression inside a generic function.

Each is checked through a stand-in for all its instances (`symbolicInstance`, `BuildEnvironments.java:1032-1055`). The stand-in is a trait or object with the declaration's members. Its static parameters are symbolic types, made the way walk makes a generic method's (`SingleFcn.createSymbolicInstantiation`, now public, `SingleFcn.java:163`), and its extends clause is read in that environment. It is bound nowhere and adds its functional methods to no overloading. `FunctionalMethodMeets` reads it as it reads a declared type. It does not read a pair whose parameter types mention a static parameter, or a pair that a symbolic supertype provides (`OverloadedFunction.java:1076-1110`, `:1170`). So a pair is refused only where it is refused for every instance. Decision 1 says why the check reads the declaration and not the instance.

**A top-level variable holding an object expression (row 648).** `CUWrapper.initVars` first visited the component's declarations, which initializes its top-level variables, and only then bound the object expressions' constructors (`registerObjectExprs`). So `zz = object extends A end` stopped with "Missing value: *objectexpr_ObjectExpr". It now binds the constructors first (`CUWrapper.java:284-286`).

## 2. The tests: failing, then passing

The tests are in `ProjectFortress/tests/`. They were committed first (4c2ee7772) and run through the harness on the base's code before the edit was built.

Promoted:
- `AbstractMethodUndefinedWalk` (row 649); its key now names the refusal: `load_exception_contains=does not define an abstract method declared in type S`.
- `FunctionalMethodMeetGenericProviderWalk` (row 647).
- `ObjectExpressionTopLevelVariableWalk` (row 648).

Written first as the owed expected failure, then promoted: `XXXOverrideNothingWalk`, now `OverrideNothingWalk` (row 653), keyed `load_exception_contains=does not override any inherited declaration`.

Added beside them:
- `AbstractMethodUndefinedObjectExpressionWalk`: row 649 on an object expression.
- `AbstractOverrideUndefinedWalk`: row 649 through a trait's abstract `override`.
- `OverrideNothingInTraitWalk`: row 653 on a trait.
- `FunctionalMethodMeetGenericObjectExpressionWalk`: row 647 on an object expression in a generic function, alone. It is needed because the provider test's first refusal, at its generic object, masks the refusal at its object expression.
- `FunctionalMethodMeetGenericTraitWalk`: row 647 on a generic trait.

Gated residues (section 12): `XXXAbstractMethodUndefinedGenericWalk`, `XXXOverrideNothingGenericWalk`, `XXXAbstractMethodPartlyDefinedWalk`.

The failing run on the base's code (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/h-base ...`, the nine files and their keys, 10:14:31Z, tree 7fa767d48):

    . interpret .../FunctionalMethodMeetGenericTraitWalk
    loaded
     Missing expected refusal at load
    Missing value: *objectexpr_ObjectExpr at .../ObjectExpressionTopLevelVariableWalk.fss:10.6 in environment:
    ** bug! MethodClosure tag(self:S,x:FortressLibrary.ZZ32):FortressLibrary.ZZ32.../AbstractMethodUndefinedObjectExpressionWalk.fss:7:3-8:1 has neither body nor def instanceof Method
    Tests run: 9,  Failures: 8,  Errors: 0

In the same run, `XXXOverrideNothingWalk`: " Saw expected failure: loaded and ran, not refused at load".

The promoted `OverrideNothingWalk` on the old code (`FORTRESS_HOME=/home/user/fortress-base12 /home/user/fortress-base12/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/old-harness ...`, 10:40:27Z):

    OverrideNothingWalk
     Missing expected refusal at load
    Tests run: 5,  Failures: 1,  Errors: 0

The first expected failure added, `XXXOverrideNothingWalk`, ran red on the fix, through the harness on the new code before its promotion (10:38:53Z): " Refused at load as its keys name".

The passing run, after the last change of code (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-checks/h-final ...`, 10:47:42Z, tree 8803d2f45), covered the rung's 14 tests and the 7 whose verdicts the section keeps (`ObjectExpressionTopLevelVariableWalk`, `OverrideInTraitWalk`, `disp0`, `disp1`, `FunctionalMethodMeetProvided`, `FileConversion`, `XXXUnimplementedMethod`): "OK (21 tests)". `FunctionalMethodMeetObjectExpressionWalk` and `FunctionalMethodOverrideOtherPathWalk` (row 615's pin) are among the 14, each " OK Saw expected refusal at load". The four refusals and row 648's test ran again on the filled cache (10:48:11Z, "cache filled"): "OK (5 tests)". The expected failures of rows 591, 592, 612 and 616 stayed green (10:38:53Z run, each " OK Saw expected exception").

The interpreter suite ran once, on 8803d2f45 (`ant testSystem`, 10:44:26Z): "BUILD SUCCESSFUL", "Total time: 2 minutes 50 seconds". Shards 132, 135, 134 and 134: 535 tests, no failure. Batch 11's gate ran 526 (`explorations/compile-ladder/climb-batch-11/gate/summary.txt`); the nine new files make up the difference. `ant testSpecData` is the gate's.

## 3. Where the fix belongs, and the precedents

The checks are walk's load checks (`.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks"). Each sits beside the code that builds what it reads:
- an object's methods, in `Constructor.finishInitializing`;
- what a trait provides, in batch 11's `providedByTrait`;
- the Meet Rule check, in `BuildEnvironments.checkFunctionalMethodMeets` and in `registerObjectExprs`, where walk makes each type.

All of it is in the section's files. `SingleFcn.java`, beside `Constructor.java` in `values/`, changes one word, `private` to `public`.

Each precedent's other sites:
- `checkForDef` has one caller (`Constructor.java:286` at 7fa767d48).
- The Meet Rule check skipped static parameters at two sites (`BuildEnvironments.java:1217`, `:993` at 7fa767d48). Both are now covered. The second is covered where a generic object expression's type is made (`ComponentWrapper.java:186`), since `finishObjectTrait` sees that type only at instantiation.
- `registerObjectExprs` has one caller (`CUWrapper.java:282` at 7fa767d48).

The ways weighed for each choice are in section 9.

## 4. What the library, the team's tests and the demos meet

A build that logged each refusal of the three checks instead of raising it (scratch, not committed) ran the interpreter suite once. At that stage, `checkForDef` refused every inherited bodiless declaration, on objects and generic instances alike. Besides the rung's own tests, its log named:
- in the library, at load: `NewlineReduction` (`Library/FortressLibrary.fss:3496`) under `AssociativeReduction.simpleJoin(Any,Any)` (`:3116`), and so every program;
- in the library, at instances:
  - `MinMaxReduction`, the same;
  - the QuickCheck generators under `AnyGen.perturb(Any, AnySeededRandomGen)` (`Library/QuickCheck.fss:82`);
  - `MersenneTwisterInit` under `SeededRandomGen.perturbed(Generator[\ZZ32\])` (`Library/Random.fss:126`);
  - `SeededRandomGenWithDistribution` under `seedSize` and `reseed` (`:88`, `:99`);
  - `EmptyIM`, `SingletonIM` and `NodeIM` under `IntMap.genComb` (`Library/IntMap.fss:125`);
- the team's tests: `FileConversion.fss`'s `dnaSequence` under `dna`'s `OPLUS(self, other: dna)` (`ProjectFortress/tests/FileConversion.fss:67`), and `XXXUnimplementedMethod.fss`'s `O` under `T`'s `a(Sub2, Sub1)`;
- the revival's `XXXComprisesLibraryTraitUnlistedExtender.fss`, whose `Value` extends `Number` with no `asFloat`.

The library and every test now load as before, because of two choices (decisions 2 and 3):
- A body at or below the abstract parameter types defines the method. This admits `NewlineReduction`, the QuickCheck generators, `MersenneTwisterInit` and `dnaSequence`.
- Generic objects are not checked. This leaves out `IntMap`'s and `Random`'s generic objects.

The Meet Rule check of generic declarations refused none of the library's 146: the logging build logged "PROBE647made" 146 times per load of a one-file program, all made. The `override` check refused only the rung's tests.

The library defects found this way are rows 667 (`IntMap.genComb`), 668 (`SeededRandomGen`'s `seedSize`, `reseed` and `perturbed`) and 669 (`AnyGen.perturb`), each measured on the old code (section 6). `simpleJoin` is row 628's, which rung G of this batch types at `R`.

The demos (section 6): five now meet the rung's refusals: `BirdCount1z`, `BirdCount2a`, `GenomeUtil1z`, `GenomeUtil2a` and `npbft` (row 670).

## 5. What the specification settles

- The traits chapter makes rows 649 and 653 static errors (`traits.tex:570-572`, `:594-595`).
- The Meet Rule names object expressions and generic declarations alike (`overloading.tex:470-471`).
- Row 648 is a defect against `object.tex:31`.
- The chapter's inheritance (`traits.tex:521-529`) also refuses an abstract method defined only at narrower types (row 666). Read literally, it also refuses one that narrower bodies cover through a `comprises` clause (Q1).
- The chapter defines "overrides" by a strict subtype (`:589`), where both paths use a plain subtype (Q2).
- `grep -rn 'row~64[6-9]\|row~653' Specification/` finds nothing.

## 6. Old against new

Each program was run on the old code with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 $PWD/tmp/rung-walk-load-checks/old-caches P.fss` and on the new code with `bin/fortress P.fss` on 8803d2f45.

- `ProjectFortress/tests/XXXUnimplementedMethod.fss` (the team's):
  - old: "Cannot find definition for method b given receiver O" at `:37:20-23`, at run time;
  - new: "Object O does not define an abstract method declared in type T: ... a(Sub2,Sub1):ZZ32", at load;
  - its verdict stays green.
- `XXXComprisesLibraryTraitUnlistedExtender.fss`:
  - as committed before the rung, on the new code through the harness (10:40:55Z): red, with " Refused at load, but did not satisfy load_exception_contains; expected" and "Object Value does not define an abstract method declared in type Number:";
  - respelled with `asFloat(self): RR64 = 0.0` in `Value`: green on the old code (10:40:27Z) and the new (10:47:42Z).
- Probes in `tmp/` (scratch), run on the old code only, since the rung does not check generic objects:
  - `m.combine[\ZZ32,ZZ32\](...)` on a one-entry `IntMap` stops with "** bug! MethodClosure genComb[\That,Result\](...) ... has neither body nor def";
  - `MersenneTwisterInit(1).distributed[\ZZ32\](UniformDistribution[\ZZ32\](2:9)).seedSize` stops with "MethodClosure seedSize():FortressLibrary.ZZ32.../Library/Random.fss:88:5-98:30 has neither body nor def instanceof Method";
  - `g: AnyGen = genZZ32; g.perturb("not a ZZ32", MersenneTwisterInit(1))` stops with "MethodClosure perturb(obj:Any,g:Random.AnySeededRandomGen)...QuickCheck.fss:82:5-83:1 has neither body nor def";
  - `MersenneTwisterInit(1).perturbed` of a mapped range prints `3219647264`.
- The compiled checker on two probes (`old-fortress.sh ... typecheck P.fss`):
  - `CoverAbstractProbe` (`dna`'s shape: `trait D comprises { P, Q }` with abstract `f(self, other: D)`, and `P` declaring `f` over `P` and over `Q`) exits 0, and walk prints `2`;
  - `PartAbstractProbe` (`XXXAbstractMethodPartlyDefinedWalk`'s program) exits 255 with "Domain Number is not a subtype of ZZ32".
- The 62 demos, each for at most 60 s from `ProjectFortress/demos` (a scratch loop over `../../bin/fortress $f`; output in `tmp/`):
  - Five meet the rung's refusals (row 670):
    - `BirdCount1z` and `BirdCount2a`: new "Object FileBasedReadList does not define an abstract method declared in type ReadList: .../GenomeUtil1z.fss:68:3-17: nextRange():()" (and `GenomeUtil2a.fss:74`); old, they print their events and exit 0.
    - `GenomeUtil1z` and `GenomeUtil2a`: the same refusal; old "Missing value: run".
    - `npbft`: new "Object Complex does not define an abstract method declared in type Number: ... asFloat():RR64"; old "Failed to find any matching overload" at `npbft.fss:31:5-7`, at run time.
  - The 30 other demos that do not exit 0 were run on the old code too. Each fails alike, with three exceptions:
    - `BiCGSTAB2` and `Generator2Demo` hit the 60 s limit on the old code. They print the same opening lines, and `Generator2Demo`'s values come from `random` (`Generator2Demo.fss:62-64`).
    - `tictactoe` and `newtictactoe` could not open `/dev/stdin` in the detached loop. Run again, old and new, with `< /dev/null`, `tictactoe` prints the same board and exits 0 on both.

## 7. The checker count, the distance and the ladder subset

`ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java` and `ComponentWrapper.java` are outside the paths that can move neither stage. So both stages ran once on 8803d2f45, after its build.

The count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-walk-load-checks/checker-count-postedit.txt tmp/rung-walk-load-checks/cc-post`, 10:48:33Z): `diff explorations/compile-ladder/climb-batch-11/gate/checker-count.txt tmp/rung-walk-load-checks/checker-count-postedit.txt` prints nothing; the table ends "#total	1", "#crash	none".

The distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-walk-load-checks/distance-postedit.txt tmp/rung-walk-load-checks/dist-post`, detached at 10:51:37Z, "EXIT=0", "#seconds	1235"). `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-walk-load-checks/distance-postedit.txt` prints:

    DISTANCE SAME   207
        class I1                      1 -> 0      (-1)
        class S1                     28 -> 29     (+1)
        class V1                     27 -> 44     (+17)
        class OT                     67 -> 33     (-34)
        class G1                      0 -> 18     (+18)

with R4 2 -> 1 too. No site moved, read by row (row 577): `diff <(sort explorations/compile-ladder/gate/distance-sites.tsv) <(sort tmp/rung-walk-load-checks/dist-post/errors.tsv)` prints nothing. The per-site list is newer than batch 11's tables (f9d3ec826), and the classes moved with classify.py's change after it (9d24290fb, "Distance classes: classify.py finds its library places by declaration (row 577)"), not with this rung. The stage's own list holds the compiled checker's eight refusals of `simpleJoin`'s partial definitions ("The inherited abstract method simpleJoin(a:Any,b:Any):Any from the trait AssociativeReduction[\T\] has no concrete implementation in the object MinReduction"), the compiled side of 666's library instances.

The ladder subset is empty, so nothing ran. No file of the baseline's `raw/` names a class the rung edits or one of its messages (`grep -rlE 'interpreter\.(env|evaluator)|BuildEnvironments|CUWrapper|ComponentWrapper|SingleFcn|values\.Constructor|does not define an abstract method|registerObjectExprs' explorations/compile-ladder/baseline-2026-09-19/raw | wc -l` prints 0), and no code outside `interpreter/` uses those classes.

## 8. Sentences made false

None in the specification. Its sentences on the interpreter (`grep -rn -i interpreter` over `Specification/basic/traits.tex`, `Specification/advanced/overloading.tex`, `Specification/basic/expressions/object.tex` and `Specification/appendices/changes.tex`) concern other checks (`overloading.tex:617`, `changes.tex:105`, `:1367-1374`).

In the record and the skill, for the gather:
- `explorations/coordinator/FACTS.md:146`: "`BuildEnvironments.checkComprisesClauses` runs `OverloadedFunction.FunctionalMethodMeets` over every trait and object without static parameters, and `BuildEnvironments.finishObjectTrait` runs it over every object expression without static parameters", and "the residues are rows 611, 612, 616 and 647".
- `explorations/coordinator/FACTS.md:147`: "one in a generic function takes the function's static parameters and is not checked, as a generic object is not (row 647)"; "`XXXFunctionalMethodMeetGenericProviderWalk.fss`" among the residues; and "an object below a trait whose abstract `override` declaration overrides a concrete one inherits only the abstract one, which walk does not refuse at load (row 649)".
- `.claude/skills/fortress-repo/references/revival-changes.md:60`: "unless the object has static parameters: walk checks no generic object (ledger row 647)".
- `.claude/skills/fortress-repo/references/interpreter.md:36-41`, "What walk checks": its list of refusals lacks the two new ones.

record.md gives the replacements.

## 9. Decisions

1. **Row 647 is checked on the declaration, at load, through a symbolic stand-in** (`BuildEnvironments.java:1032-1055`). The rule's condition is a type that provides both declarations. A pair whose parameter types do not mention the static parameters is provided alike by every instance, so the declaration answers for all of them. It answers at load, where the section's test keys the refusal (`load_exception_contains=`). Not taken:
   - The check at each instantiation walk makes (`FTypeGeneric.make`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeGeneric.java:199-290`). It refuses at run time, when an instance is first made, which the harness reports as "Failed after load" (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:509`). It never checks a generic type that no run instantiates, and it runs at every instantiation.
   - A symbolic instance made through `FTypeGeneric.make` itself. It would enter the generic's memo. And an object instance with symbolic arguments is not marked symbolic (`types/FTypeObjectInstance.java:26-37`), so it would add its functional methods to the top-level overloads (`types/FTraitOrObjectOrGeneric.java:123-124`).
   - Reading the declaration's syntax without a type: `FunctionalMethodMeets` needs a type below its supertypes as the self parameter's type (`OverloadedFunction.java:1086-1098`).
2. **An abstract method is defined by a body at or below its parameter types** (`definedBelow`). Not taken:
   - The chapter read literally (`traits.tex:521-529`, `:571-572`). It refuses `NewlineReduction` at load, and so every program, and the team's `FileConversion.fss` (section 4).
   - The compiled checker's coverage (`AbstractMethodChecker.scala:94-118`). It refuses `NewlineReduction` too, since `(String, String)` does not cover `(Any, Any)`.

   Either reading becomes possible once the library's partial definitions are repaired (rows 628, 668, 669). Row 666 gates the residue, and Q1 asks which reading should then hold.
3. **Generic objects are not checked for rows 649 and 653** (`Constructor.java:261`). Not taken:
   - Checking each instance as its constructor is made, at run time. That refuses, at their first instance, `IntMap`'s three objects and `SeededRandomGenWithDistribution` (rows 667, 668), and their tests then stop.
   - Checking a symbolic stand-in through `Constructor`. That builds closures and overloads over symbolic types, and would refuse the same library objects at load.

   Row 665 gates the residue.
4. **"Overrides" means a subtype, equal types included**, for row 653's check. This is the reading of `overriddenBy` (`Constructor.java:615-634`), of row 614's decision 3 (`explorations/compile-ladder/rung-walk-open-param/REPORT.md:193`) and of the checker's `providedAndOverridden` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1663`). Not taken: the chapter's "strict subtype" (`traits.tex:589`), which refuses an `override` that repeats an inherited declaration's parameter types (Q2).
5. **A trait's `override` is checked where pass 3 meets a trait that declares one, and where an object's constructor reads the traits above it.** Not taken:
   - Every trait at load: that builds the members of every trait no object extends (`types/FTypeTrait.java:107-116` builds them lazily).
   - Objects only: that misses a trait no object extends.
6. **The constructors of the object expressions are bound before the top-level variables**, in `CUWrapper.initVars` (`CUWrapper.java:284-286`), as the section says. Not taken: binding every component's constructors before any component's variables, in `Driver.evalComponent` (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:243-245`), which is outside the section's files. A variable of one component that evaluates another component's object expression is not measured. Superseded on the branch: the skeptic's fix `c17cff594`, which the judge upheld (`JUDGE.md`), binds every component's constructors before any component's variables in `Driver.evalComponent`, the way not taken here, and gates that variable (`ProjectFortress/tests/ObjectExpressionImportedVariableWalk.fss`).
7. **`XXXComprisesLibraryTraitUnlistedExtender.fss` is respelled** with `asFloat(self): RR64 = 0.0` in `Value`, so that it still measures row 22 (the library's `comprises` clause, unchecked) and not the new refusal. Not taken: leaving it red; rekeying it, which would change what it measures.
8. **The library's slips get rows with `none` as reproducer** (667, 668, 669). While the library is ill-formed, a gated test can pass only by calling the undefined method, and the specification gives no result for these components. Each row's notes hold the command and its output. The demos' slip (670) takes the demo as reproducer, as row 449 does.

No decision of the curator covers decisions 2, 3, 4, 7 and 8. Each acts on the reading given above, and each can be undone.

## 10. Points to report

- A demo that walk now refuses at load:
  - `BirdCount1z.fss` and `BirdCount2a.fss`, which used to run and exit 0, and `GenomeUtil1z.fss` and `GenomeUtil2a.fss`, which they import. `FileBasedReadList` (`ProjectFortress/demos/GenomeUtil1z.fss:72-111`, `GenomeUtil2a.fss:78-117`) does not define `ReadList`'s `nextRange()` (`:68`, `:74`). Refused by `checkForDef` (`Constructor.java:429`).
  - `npbft.fss`'s `Complex` (`ProjectFortress/demos/npbft.fss:36-52`), which has no `asFloat`. It used to stop at run time.
- A team test that walk now refuses at load: `XXXUnimplementedMethod.fss`'s `object O` (`ProjectFortress/tests/XXXUnimplementedMethod.fss:31-33`), by `checkForDef` (`Constructor.java:429`, `:433`). Its verdict stays green: it is an expected failure, and before it failed at run time.
- No library type is refused: the suite passes (section 2).
- An interpreter test whose verdict changes other than by the rung's intent: `XXXComprisesLibraryTraitUnlistedExtender.fss` turns red under the new check (section 6). Respelled, it stays green. The line before: `object Value extends Number end`. After: `object Value extends Number` / `  asFloat(self): RR64 = 0.0` / `end` (`ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss:6-8`). It is the revival's test (7ed2a8387), not the team's.
- A load check that instantiates a generic type to read it: the Meet Rule's stand-in for each generic trait, object and object expression (`BuildEnvironments.java:1032-1055`). Its cost on the one library's load is 146 stand-ins per load of a program that imports nothing else. Each reads its declaration's extends clause once, which instantiates each generic supertype it names at symbolic arguments, and reads its own functional methods' parameter types once. No timing of walk is taken (`.claude/skills/fortress-repo/references/interpreter.md`, "Running a program"). The abstract-method and `override` checks do not run at instantiation (`Constructor.java:261`).
- Every point is reversible, and none holds the push.

## 11. Questions for the curator

- **Q1.** Does an object define an inherited abstract declaration when its narrower declarations with bodies together cover it, through a `comprises` clause? The team's `FileConversion.fss` declares such an object (`ProjectFortress/tests/FileConversion.fss:65-82`).
  - Sources: the chapter, February 2011 (`traits.tex:521-529`, `:571-572`), under which the object inherits the abstract declaration and must define it; the compiled checker, 2012 (`AbstractMethodChecker.scala:94-118`), which accepts the coverage (`CoverAbstractProbe`, typecheck exit 0).
  - Ways: (a) coverage defines it, the checker's reading; (b) only a declaration with the abstract one's parameter types defines it, the chapter's reading.
  - Walk today accepts it, and any narrower body too (666). Way (a) keeps `FileConversion.fss` loading once 666 is repaired.
- **Q2.** Does an `override` whose parameter types equal an inherited declaration's override it?
  - Sources: the chapter says "a strict subtype" (`traits.tex:589`), so such an `override` overrides nothing, a static error (`:594-595`); both paths read it as overriding (`Constructor.java:615`, `STypesUtil.scala:1663`).
  - Ways: (a) equal types override, both paths' reading, which is kept; (b) the strict reading, which refuses such a declaration.
  - No `override` in `Library/` or `ProjectFortress/tests/` repeats an inherited declaration's parameter types.

## 12. Defects and their homes

- Row 649: repaired, home 1: `AbstractMethodUndefinedWalk`, `AbstractMethodUndefinedObjectExpressionWalk`, `AbstractOverrideUndefinedWalk`.
- Row 653, walk's half: repaired, home 1: `OverrideNothingWalk`, `OverrideNothingInTraitWalk`. The checker's half stays with row 650.
- Row 647: repaired, home 1: `FunctionalMethodMeetGenericProviderWalk`, `FunctionalMethodMeetGenericObjectExpressionWalk`, `FunctionalMethodMeetGenericTraitWalk`.
- Row 648: repaired, home 1: `ObjectExpressionTopLevelVariableWalk`.
- Row 665, walk checks no generic object for rows 649 and 653: home 2, `XXXAbstractMethodUndefinedGenericWalk` and `XXXOverrideNothingGenericWalk`, green on the old code (10:40:27Z) and the new (10:47:42Z).
- Row 666, walk accepts an abstract method defined only at narrower types: home 2, `XXXAbstractMethodPartlyDefinedWalk`, green on both. The checker refuses its program.
- Rows 667, 668 and 669, the library's objects that leave inherited abstract methods undefined: home 3, rows only (decision 8).
- Row 670, the demos that leave inherited abstract methods undefined: home 3, a row whose reproducer is the demo.
- Row 570 (the checker's half of rows 618 and 647): after the rung, walk refuses at load a generic provider and an object expression in a generic function that the compiled checker accepts. This is a note, not a repair. The row's notes are nearly full (658 of 700 characters), so the record gives it no note.

## 13. Commands worked out

- A logging build to list everything a check would refuse across the suite. Each refusal branch wrote one line to the file named by an environment variable instead of raising, and `W_PROBE=<file> ant testSystem` ran once. The build was then restored from saved copies and rebuilt, and none of it was committed.
- The demo sweep: a loop over `ProjectFortress/demos/*.fss` running `timeout -k 5 60 ../../bin/fortress $f` with a private `FORTRESS_CACHES`, grepping each output for the rung's three messages. The same loop over `old-fortress.sh` ran the demos that failed.
- The distance read by row: `diff <(sort explorations/compile-ladder/gate/distance-sites.tsv) <(sort tmp/rung-walk-load-checks/dist-post/errors.tsv)`.
