# Cold read of `record-landing/clean.txt`

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of the skill's `references/` for terms: `compiler.md` (whole), `records.md` (whole), `gate.md` (lines 1-66), `interpreter.md` ("What walk checks"), `tests-writing.md` (its `XXX` lines). Nothing else was read.

All 28 entries are facts. Terms that come up in several entries and are not defined in that context:

- "rung", "rung runs", "climb batch" (with suffixes such as 15b, 21b, 22c): record terms. `gate.md` implies that a climb batch is a folder that holds a landed gate. A rung looks like one unit of work, but I cannot tell whether "the rung's choice" has a different standing from "a worker chose".
- "the coordinator": the skill names the curator and workers. `CLAUDE.md` names a "coordinating session". I cannot tell whether a coordinator's default binds a worker as a curator's decision does.
- P-numbers: I could not read POSITIONS, so I cannot say what any "builds P-N" or "states P-N" adds.
- "the distance": the skill defines the distance stage. I read "the distance" as that stage's error table.

Throughout, "row N" is a gap-ledger row (`records.md`), and "fixed" means the row is closed `FIXED`.

## F-75

- **Established:** The compiled checker enforces two overloading rules.
  - The Return Type Rule: the return type of the more specific declaration must be a subtype of the other's, checked over the instances of a generic declaration.
  - A positional rule, for two generic declarations where one is more specific and both have the same number of static parameters of their own. Their static parameters must have the same kinds, position by position. The more specific return type must be a subtype of the other's once the other's i-th parameter is renamed to the more specific one's i-th.
- **Conditions:**
  - The checker skips instances of the less specific declaration whose domain cannot meet the other's in only one shape. In that shape, the less specific declaration has a bare type parameter as a whole parameter type (`x: T`), and the more specific one has an object type at that position.
  - In every other shape, such as a tuple of object types, the checker still compares instances that cannot meet. So it wrongly refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048, open).
  - The 2011 paper skips every instance whose domain is `Bottom`, so the checker's skip is narrower than the paper's.
  - A worker chose the width of the skip. The rung chose the equal-count scope and the comparison of kinds. The curator has decided none of these.
- **Consequence:**
  - A generic beside a plain overload at an object type, such as `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, checks and runs (row 542, fixed; F-376).
  - The same pair at a tuple of object types is refused.
  - The interpreter's library breaks neither rule.
  - By reading the code, merging the number types with their objects (P-178) brings no new refusal from these rules.
  - A worker must not treat the width of the skip as decided.
- **Evidence:**
  - Tests that accept: `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced`, `OverloadReturnObjectDomain`.
  - Tests that pin refusals, row 1048's among them: `XXXOverloadReturn*`, `XXXOverloadGenericObjectDomainByPosition`, `XXXOverloadPermutedStaticParams`.
  - The distance stage shows no return-type or overloading error (F-53).
  - The P-178 claim is by reading only.
  - The decision record (sections 1 and 2) and the rung report, as named.
- **Could not resolve:**
  - The title says that the rule checks "over every instance whose domain can meet". That reads as "it skips every instance that cannot meet", but the body says it skips them in one shape only. The title overstates the scope. (unclear wording)
  - "the rung's choices": see the header. (missing term)
  - "it brings no refusal to such pairs": I read "such pairs" as a generic beside a plain declaration at an object type, but the wording does not say so. (unclear wording)
  - "pin the two rules' refusals and row 1048's": the entry does not say which `XXX` tests pin correct refusals and which pins the defect. (unclear wording)
  - P-45 and P-178: their content is not given. (missing context)

## F-225

- **Established:** A self-typed trait is `C[\X\]` with `X extends C[\X\]`. Where such a trait has no `comprises` clause, or one that lists only `...`:
  - The compiled checker types `self` inside method bodies as the intersection `C[\X\] & X`. It takes `X` from the F-bound.
  - Method signatures keep `self` at the plain `C[\X\]`, except in the overloading check's exclusion test (F-277).
  - The checker refuses an extender at another type: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`.
  - Where the `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads the signatures plain.
- **Conditions:**
  - This is the compiled checker only. Walk has no such rule and loads what the checker refuses.
  - By a default of the coordinator's, the checker also "takes" a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins do.
  - The library passes, except `Integral`'s `numerator`. Each integer type declares `numerator` itself instead (P-146).
  - Limits at run time:
    - A compiled default body that returns `self` at the self-type parameter runs, also at an object type (row 695, fixed).
    - A conditional that returns `self` in one arm fails verification (row 1051). This is the shape of `StandardTotalOrder`'s `MIN` and `MAX`.
    - A default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError`, where the object lists the trait first in its `extends` clause (row 1052).
- **Consequence:**
  - A worker must make each extender of `C[\X\]` pass itself as `X`, as `trips.fss`'s `generator` now extends `StandardTotalOrder[\generator\]` (row 710).
  - The refusal of `PureList`'s `List` is correct (row 355).
  - A worker who writes a compiled default body avoids the two failing shapes, or does not list the trait first.
  - The prelude writes the self type as `comprises T` on `StandardTotalOrder` and `Equality`. The one library need not copy that spelling.
- **Evidence:**
  - Tests: `compiler_tests/SelfType*` and `XXXSelfType*`.
  - The prelude: `Library/CompilerAlgebra.fsi:16`, `:24`, and commits `655e65d53` and `59fdeff62`.
  - Naden's text: `Papers/Types/journal/justificationOfRTR.tex:626-630`.
  - The demo: `ProjectFortress/demos/trips.fss:96`.
  - Rows 355, 695, 710, 1051 and 1052. F-377 gives the cast.
- **Could not resolve:**
  - "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter": I cannot tell what "takes" means. It could mean that the checker accepts such a parameter, or that it reads it as a self-type parameter, so that `self` gets the intersection. I also cannot tell which trait "the trait" is. (unclear wording)
  - "`Containment` mixins": their shape is not in my context. (missing context)
  - "a default of the coordinator's": I cannot tell whether it binds as a curator's decision does. (missing term)
  - "a `comprises` clause ... that lists only `...`": a `comprises` clause with an ellipsis is not covered by the skill. (language concept I lack)
  - "save in the overloading check's exclusion test (F-277)": what `self` is in that test is left to F-277. (missing)
  - "that spelling does not bind the one library": I read "bind" as "oblige". The second reason given, Steele's message that the self type is the trait met with the `comprises` clause, seems to support the prelude's spelling rather than argue against it. I read it as "the same meaning, with `X` taken from another place". (unclear reasoning)

## F-240

- **Established:**
  - At climb batch 31's gate, called the last landed one, the count stage took about 75 s. The distance stage took 143 s, of which `FortressLibrary` took 86 s.
  - At batch 15b's gate the two stages took 325 s and 1,075 s. The solver's memos (F-235), not load, account for most of the difference.
  - A stage, which I take to be the count stage, rose from about 90 s at batch 21b. The cause is that `FortressLibrary`'s check now runs past its cleared type errors into the export check. Rung runs took 91 s and 99 s when they stopped at those errors, and 149 s and 151 s when they ran past them.
  - Checking every symbolic operator (F-281) costs the count stage 15 to 25 %.
  - From batch 22's gate to batch 26's, the stage stayed between about 150 s and 180 s.
  - Both stages about halved at batch 27's gate, for a reason that no run measured.
  - Load can more than double a stage's time: batch 16's code took 217 s for the distance stage at a load of 3.3, and 574 s at 4.6 to 5.3.
- **Conditions:**
  - Each gate ran each stage once.
  - The 75 s comes from the file times of the gate's log, not from a timer.
  - The 143 s started at a load of 0.08, then ran beside the first minutes of `testFast`.
  - A time compares only with one taken under a like load.
- **Consequence:**
  - These are smoke figures. A worker must not read a change from them without a like load.
  - The batch-27 halving is not shown to come from the emptied `Number` (F-324) or from the distance check's stop at `Char` (F-54).
  - A count stage run of 80 to 180 s is normal (`compiler.md`).
- **Evidence:** The file times of the gate's log, `compile-ladder/climb-batch-31/gate/distance.txt`, and the review sections listed.
- **Could not resolve:**
  - Batch 31's gate is called "the last landed gate", yet the entry compares it with "climb batch 32's gate": "no fall since climb batch 32's gate is shown", and "165 s (102 s) at 0.31 at climb batch 32's". If the batches are numbered in time order, 32 comes after 31. I cannot tell whether batch 32's gate ran earlier, ran without landing, or is a typo. (unclear wording, possibly an error)
  - "Its rise from about 90 s": the sentence before speaks of both stages. From the figures I infer the count stage, but I am not sure. (unclear referent)
  - "which do not span what rung runs of that night timed as the whole stage": I cannot parse this. My best reading is that the log's file times cover less than the whole stage, so the 75 s understates it. The entry does not say whether 75 s is then a lower bound or a true time. (unclear wording)
  - "the solver's memos": which solver is not said. The checker's, I assume. (missing term)
  - "climb batch", "rung runs": see the header. (missing terms)

## F-372

- **Established:**
  - When the code generator builds the class of a trait or an object, it writes each inherited method once. Among declarations at the same parameter types, `self` apart, it keeps the one of the lowest type. It drops any declaration that a type strictly below it declares again.
  - The choice is a relation between two declarations, not the order of the gathered methods.
  - A method that an imported api's trait declares without `abstract` counts as a body in that trait's class. So an object forwards to it even when the trait is not first in the `extends` clause. This holds for plain, generic and functional methods.
- **Conditions:**
  - A worker chose both readings, and the curator has not decided them.
  - By the traits chapter's text, an object that reaches one method by two paths, one through a trait that declares it again, inherits both declarations. The checker refuses that form where the traits are self-typed and generic (row 1037).
  - An open defect: an object's dispatch method for a functional method whose `self` is not first tests the receiver in place of the argument. So a call can choose the wrong declaration with no error. With an own `mark(x: K, self)` beside an inherited `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573).
- **Consequence:**
  - The library's `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below them no longer stops a class at load (row 990, fixed).
  - Bodies in an api's trait are reached (row 732, fixed).
  - A worker must not rely on compiled dispatch between an object's own functional method and an inherited one, where `self` is not first.
  - Where the lowest-declaration reading differs from the specification's "inherits both", a worker must treat it as undecided.
- **Evidence:** Tests `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled` and `FunctionalMethodMeetNarrowedSelfNotFirst`. Rows 990, 732, 571, 1037, 1038 and 573. The report section named.
- **Could not resolve:**
  - "the library's shape of P-47": P-47 is unknown to me. (missing context)
  - "a type strictly below its own": "its own" could be the class's type or the declaration's type. I read it as "below the type that holds the declaration". (unclear wording)
  - "A functional method with self not first is not written beside its dispatch method (row 571, fixed)": this may mean that the method was written twice before, once beside its dispatch method, and is now written once. I cannot tell. (unclear wording)
  - Row 1037: the entry does not say whether the checker's refusal is a defect, a correct consequence, or a conflict with the code generator's reading. (unclear)

## F-373

- **Established:**
  - The compiled path runs `label` and `exit`.
  - `CodeGen.forLabel` makes a new target for each evaluation of a label block, and its handler takes only the exits that name that target. `CodeGen.forExit` throws `LabelExit.of(value, target)`.
  - A function expression or a task captures the target as it captures an immutable variable. So an exit can leave from a loop body or from another task.
  - When an exit passes a group of forked arms, the group first joins every arm that it forked:
    - At four threads, every forked iteration of a parallel `for` runs to its end or to its own exit. The label's value is the exit of the first arm in the arms' order.
    - At one thread, the iterations after the exit do not run.
  - No `catch` clause takes an exit.
  - The one library's `Indexed.indexOf` compiles in its own form (row 81, fixed).
- **Conditions:**
  - Three compiled answers were chosen as the path was built. The curator has not decided them, and walk answers each differently:
    - which evaluation an exit leaves when the block is evaluated again inside itself (row 1042);
    - whether a `catch` of `Exception` takes an exit (row 1040). The compiled path says no.
    - what an exit does after its label block has completed (row 1041).
  - Four limits stand:
    - An exit out of an `atomic` block loses the block's writes (row 1039).
    - A `finally` clause on the exit's way does not run (row 890).
    - A label block as a call's later argument fails verification (row 322).
    - A label block whose value joins a numeral with a number stops the code generator (row 340).
- **Consequence:**
  - A worker can use `label` and `exit` in compiled code, also from parallel loops.
  - A worker must not rely on parallel iterations stopping at an exit, on `finally` running on the way out, on an `atomic` block's writes surviving an exit, or on a label block as a later argument.
  - By P-50 the numeral takes the label's expected type, so a program binds "such a number" to a typed variable first.
- **Evidence:** `CodeGen.forLabel`, `CodeGen.forExit` and `runtimeSystem/LabelExit.java`. The test `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without "the two members". Rows 81, 1039 to 1042, 890, 322 and 340. The report sections named.
- **Could not resolve:**
  - "without the two members": I assume `forLabel` and `forExit`, but the entry does not say. (unclear wording)
  - "the first arm in the arms' order": this could be the iteration order of the range or the order in which the arms were forked. (unclear)
  - Rows 1042 and 1041: the compiled answers are not stated. Row 1040's is ("no"). For 1042, "names one evaluation" suggests the evaluation that made the captured target. (missing)
  - "binds such a number to a typed variable first": the value to bind could be the number joined with the numeral, the numeral, or the label block's value. I also read "joins" in the type sense, the least common supertype of two exits' values, but I am not sure. (unclear wording)

## F-374

- **Established:**
  - On the compiled path, an object's `var` value parameter or `var` field is a `MutableFValue` cell in a `public final` JVM field, made by the constructor.
  - Each read and write asks `BaseTask.inATransaction()` and goes through the transaction or the cell, as for a top-level `var`.
  - A loop body or a function expression in the object's methods captures the cell.
  - So an `atomic` block tracks `var` fields (row 319, fixed). Every access pays the transaction check, also outside `atomic` (row 641).
  - A field without `var` holds its value plainly and has no check.
  - `atomic e` is compiled by `CodeGen.forAtomicBlock` as an atomic block whose body is `e` (row 875, fixed).
- **Conditions:**
  - A worker chose the cell, and the curator has not decided it.
  - `atomic e` has the atomic block's limits: as a later argument of a call, it fails verification (row 322).
  - A numeral as the value of `atomic e`, at a place of declared type, "waits for the checker" (row 1043).
  - The specification forbids a `value` object with a `var` field, but nothing refuses one (row 112). For such an object, `V(1) === V(1)` is `false`, because `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`).
- **Consequence:**
  - A change to the transaction's code for variables reaches fields with no second edit.
  - A worker who adds a new kind of nested context must make it capture a `var` field's cell, as it does a top-level `var`'s.
  - Do not expect `===` between equal `Lazy` values on the compiled path.
- **Evidence:** Tests `compiler_tests/AtomicFieldCompiled`, `VarFieldCapturedCompiled` and `AtomicExprCompiled`. Rows 319, 641, 875, 322, 1043 and 112. The report sections named.
- **Could not resolve:**
  - "a numeral as its value at a place of declared type waits for the checker (row 1043)": I cannot tell whether this fails today, and if so how (a refusal or a crash), or what the checker must do first. (unclear wording)

## F-375

- **Established:**
  - Walk's load check now reads a pair on its declared domains where a plain declaration's domain lies inside an own generic's, even where the two parameter lists differ only at object types. Before, the parameter-by-parameter check took such pairs as excluding.
  - The pair loads where the plain declaration's result lies below the generic's "by one of three readings that the report gives".
  - It is refused in the Return Type Rule's name where a reading shows a breach (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed).
  - Separately, `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type. It passes the symbolic type of a type parameter (row 997, fixed).
- **Conditions:**
  - A declaration that writes no return type is not judged (row 1044).
  - No `comprises` clause is read (row 550). The coordinator chose this.
  - Two plain declarations keep "the team's shortcut" (row 697).
  - A worker chose the rest. The curator has decided none of it.
  - Where the new reading and the old shortcut differ, the change goes both ways: some pairs are now refused, and others now load.
- **Consequence:** After the number types are merged with their objects (P-178), every generic-beside-plain pair over the five number types goes through this reading. No run has measured that: F-361's probe ran without the reading. A worker who does the merge must test those pairs under walk.
- **Evidence:** Tests `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss` and `NonValueBelowValueTypeWalk.fss`. The report sections named.
- **Could not resolve:**
  - "by one of three readings that the report gives": the readings are not named, so I cannot predict from the entry whether a pair loads. The entry also does not say what happens when no reading shows either "below" or a breach. (missing content)
  - "the team's shortcut": not defined. It may be `interpreter.md`'s "team's check". (missing term)
  - "the merge ... meets neither defect": I read it as "the merge is no longer hit by either defect, since both are fixed". (unclear wording)
  - "own generic": F-252 defines it, a declaration with static parameters of its own, but this entry is read before F-252. (minor)
  - "the five number types": only F-361 names them. (minor)

## F-376

- **Established:**
  - Where an overload set's principal declaration returns one of its static parameters, the dispatch method that `OverloadSet` writes (`generateCall`, `generateLeafCall`) casts each arm's result to that parameter, where the arm declares another return type. The class loader fills in the parameter when it instantiates the class.
  - For an arm instantiated at run time, this cast replaces the cast to the arm's declared return type.
  - So a generic declaration beside a declaration on an object type verifies at every instance. Without the cast, the generic's instance at another object type fails with 'VerifyError: Bad return type'.
- **Conditions:**
  - A dispatcher whose range is not a static parameter gets no such cast (row 699).
  - The test's call at `Box[\Square\]` fits two declarations. Whether its verdict can change with the checker's order among tied generic candidates (row 499) is not established.
- **Consequence:** The pair of F-75, `ident[\T\]` beside `ident(x: Circle)`, runs compiled. A dispatcher whose range is not a static parameter falls under row 699.
- **Evidence:** The `run` step of `compiler_tests/OverloadReturnObjectDomain`. Rows 699 and 499. The report section named.
- **Could not resolve:**
  - "principal declaration": not defined. It could be the most general declaration, or the one whose signature the dispatcher takes. (compiler term I lack)
  - "an arm instantiated at run time": the entry does not say how it differs from another arm. (concept I lack)
  - Row 699: the entry does not say whether it is a defect (a missing cast that fails) or only a note. (unclear)
  - "tied generic candidates": tied in what, presumably specificity, is not said. (unclear)
  - "its own range" in the title: I read it as the dispatcher's range. (minor)

## F-377

- **Established:**
  - `CodeGen.castToTypeBelow` casts a value that has self's type to a declared trait type, or a type variable, strictly below its trait. Self's type here is the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter.
  - The cast is made at these places:
    - "a single argument" of a function, a method or a constructor (`evalArg`);
    - a typed binding and an assignment (`forExprsSerial`);
    - a method's returned value (`generateActualMethodCode`);
    - also a `typecase` whose arms each have self's type.
  - So these verify and run, as the library's `QQ comprises { Ratio }` needs (rows 991 and 695, fixed):
    - `den(self)` for `den(r: R)` in `trait Q comprises { R }`;
    - `twin(self): S = self` in a self-typed trait.
- **Conditions:**
  - Only `self` gets this reading. The checker refuses a variable declared at the trait where a listed type is expected.
  - These get no cast:
    - a closure's returned value (row 1050);
    - a conditional's arms (row 1051);
    - a trait that lists a type at a `where`-clause variable (row 307);
    - a value whose type is a subtype of the declared type by `extends`.
  - A cast is added at a declared trait type strictly below self's trait, although the verifier, which checks no interface type, needs none. A worker chose this, and the curator has not decided it.
  - A separate defect: an assignment from outside an object to its `var` field fails at run time with `NoSuchMethodError`. This includes `c.r := self` at a listed type (row 1053).
- **Consequence:** A worker can pass, bind and return `self` where a listed type or the self-type parameter is expected. A worker must not return it from a closure or from one arm of a conditional, and must not assign to another object's `var` field from outside it.
- **Evidence:** Tests `compiler_tests/ComprisesValueAtListedTypeCompiled`, `SelfTypeReturnSelfRun` and `SelfTypeReturnSelfAtTraitRun`. The report section named.
- **Could not resolve:**
  - "at a single argument of a function, a method or a constructor": this could mean a call with exactly one argument, so that a call with several arguments gets no cast. Or it could mean each argument, taken alone. (unclear wording, two readings)
  - "a type variable strictly below its trait": I read it as the self-type parameter `X`, bounded below the trait. (minor)

## F-34

- **Established:**
  - On the code of `832f7d0d91`, with a patch, the code generator over the fourteen components that the distance stage checks refuses 24 declarations and emits 745. No component fails. Every refused declaration passes the checker.
  - Without the patch, it stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole, at the wrappers of their helper classes (row 874). The other eleven components give 11 refused declarations of 6 kinds.
  - The patch is applied in a scratch worktree. It adds:
    - naming tables and converters for the one library's built-in types;
    - the trait table's search over its two prelude apis (row 942);
    - `NN32`'s two getters at `NN32` (row 993).
  - The refusals, by row:

    | Kind | Count | Row |
    |---|---|---|
    | varargs, one of them a trait's | 8 | 624 |
    | `label` | 4 | 81, fixed since |
    | a type variable missing from the kind environment | 4 | 822 and 812 |
    | the range operators over pairs and triples | 4 | 819 |
    | a closure class written twice | 2 | 315 |
    | an intersection as a receiver | 1 | 540 |
    | `atomic` as an expression | 1 | 875, fixed since |
- **Conditions:**
  - The setting is the distance stage's (F-53): the checker's failures are caught per declaration, with "the bound `Any`".
  - A declaration counts at its first wall only. Behind `SubString`'s `label` stands the partial type assumption (row 818).
  - The measure skips dispatch methods.
  - It does not see classes that are emitted and then fail at load: row 992, and rows 990, 991 and 732, fixed since.
  - No emitted class is run, and no test holds the count. The gate's distance stage runs no code generation.
  - It was measured twice with one result. It was not taken again after rows 81 and 875 were fixed.
- **Consequence:** After the switch-over, the code generator still stands between the library and bytecode. To measure again, use the command below on a scratch worktree.
- **Evidence:** The command `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. `plan-31/PROBES.md` section 3, and `switch-rehearsal.md` section 3.
- **Could not resolve:**
  - "in 8 kinds": the list by row gives seven groups. It makes eight only if rows 822 and 812 are two kinds, but they share one count of 4. I cannot reconcile the title's number with the list. (unclear, possibly an error)
  - "the bound `Any`": I cannot tell what is bounded, for example type parameters written without a bound, or something that the measure supplies. (unclear wording)
  - "naming tables and converters", "the trait table's search over its two prelude apis": these are compiler internals that I lack. They are not needed to act on the entry. (minor)

## F-352

- **Established:**
  - On `main`, the compile command uses the compiler's prelude only. A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks, on `832f7d0d91`'s code.
  - In that tree, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library. A one-line program then passes the checker and the code generator.
  - Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s.
  - Three programs ran and printed walk's output:
    - one that prints a line;
    - one that builds and reads an `Array1`;
    - a dot product in the program's own loop over two `Array1`s.
  - Not run:
    - arrays of rank 2 or 3 (row 992);
    - the library's `DOT` and `SUM` (row 732, fixed since);
    - microGPT, which the checker stops (F-58).
- **Conditions:**
  - The runs met sixteen walls of two kinds.
  - The first kind, which a test against the prelude can show: varargs (624), `label` (81), a closure class written twice (315), a method written twice (990), a missing cast at a `comprises` type (991), and rows 992 and 732. Of these, 81, 990, 991 and 732 are fixed, and 624, 315 and 992 stand.
  - The second kind shows only in a tree switched onto the one library:
    - which run-time class carries each built-in type, a choice that reaches the code generator's naming (874, 995, 866);
    - the trait table's search by the prelude's api names (942);
    - the dispatch method's package (994);
    - `NN32`'s two getters (993).
  - Every run had the JVM's verifier off, so the number of methods that the verifier would refuse is unknown.
  - A program's check takes about a second under either library on warm caches, and 17 s against the one library on cold caches, one run each.
  - It was measured once. Nothing landed, and no test holds it.
- **Consequence:** A worker cannot compile against the one library on `main`. The switch-over must clear the second kind of wall, and a run with the verifier on is still needed.
- **Evidence:** `switch-rehearsal.md` sections 2, 4 and 6, and `model-closure-check.md` section 4.
- **Could not resolve:**
  - "sixteen walls": the entry lists seven rows of the first kind and six of the second, thirteen in all. I cannot tell where the other three walls are; some rows may hold more than one wall. (unclear count)
  - "twelve marked hacks": only the two lines are described. The entry does not say whether they match F-34's patch. (missing)
  - "compiled by name": I read it as "each component compiled by naming it". (minor)

## F-354

- **Established:**
  - The code generator orders a class's methods, and a dispatch method's tests, by the JVM's identity hashes (row 996).
  - Two cold compiles of the prelude by one build gave equal classes, 590 of 590, because the default identity hash gives the same sequence in each run.
  - Under another hash mode, 18 of `CompilerBuiltin`'s 312 classes differed: the same methods in another order.
- **Conditions:** It was measured once, on `832f7d0d91`'s code. The case of different builds is inferred from the run under another hash mode, not measured by comparing two builds.
- **Consequence:** A worker must not compare jars or bytes to show that a change of the compiler left the compiled code as it was. Use the tests. A result that depends on this order can come and go between builds.
- **Evidence:** `probe-y.md` section 6, and row 996.
- **Could not resolve:**
  - The title says "different builds of the compiler", but the measure changed the hash mode, not the build. The entry does not say why a different build would change the hash sequence; perhaps a different history of allocations. (inference, not stated)
  - "a dispatch method's tests in an order": `SKILL.md` says that a dispatch method tests from the most specific declaration to the least. I read the hash order as applying only among tests that specificity does not order, but the entry does not say. This matters for whether a dispatch result can change between builds. (unclear)

## F-361

- **Established:**
  - In a scratch tree on `832f7d0d91`, the five number traits were merged with their objects, making `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` value objects (F-360).
  - The merge took 12 files: the library's text and 78 lines of walk's Java. It changed no checker or code-generator file and no model line.
  - The checker count and the distance stayed 0, and microGPT's quick checks passed.
  - Of the 830 tests of `ant testSystem`, 829 passed. `XXXGenericBesidePlainReturnParam` (row 550) passed where a failure is expected, for a wrong reason: walk's load check lost a refusal of a generic beside a plain declaration at an object type (row 998).
  - The merge widened two more gaps to the five types:
    - a type parameter bounded by a value type through a trait's generic method (row 997). One line of walk passed it in the scratch tree.
    - the checker's refusal of a valid generic-beside-plain pair over an object domain (row 542). This one is by reading.
  - A `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959).
- **Conditions:** On `main` the traits are not merged, and rows 998, 997 and 542 are fixed. It was measured once. Nothing landed, and no test holds it. The compiled tests and `ant testFast` were not run.
- **Consequence:** The merge (P-178) holds on the checker's side. A worker who makes it must run the compiled tests and `testFast`, test the generic-beside-plain pairs again (F-375), and look for `typecase` arms that name removed objects.
- **Evidence:** `number-object-merge.md`, "Measurements" and "Obstacles, in the order met".
- **Could not resolve:**
  - "829 pass, and `XXX...` passes where a failure is expected": I read that the `XXX` test is the 830th, counted as a failure ('Missing expected failure'). The wording does not say so. (unclear wording)
  - Row 959: the title counts three gaps, and the last sentence names 998, 997 and 542 as fixed. I cannot tell whether row 959 is a fourth gap that the merge opens, or whether it is fixed on `main`. (unclear)
  - "five number traits": `SKILL.md` lists eight number types. The entry does not say why only five are merged, or what the "removed object" `Int` was. (missing context, F-360)

## F-174

- **Established:**
  - The specification states the type group's 2011 overloading model. Declarations of one name may differ in their static parameters. A generic declaration is read as one declaration over all its instances within its bounds.
  - Its section "Declarations with Static Parameters" states three rules: No Duplicates, Return Type and Meet.
  - It gives one more restriction as the compiled path's, not the language's. Take two generic declarations, one more specific than the other, with the same number of static parameters:
    - their static parameters must have the same kinds, position by position;
    - the more specific return type must be a subtype of the other's when the parameters are matched by position.
    So the checker refuses "an override" whose return type reorders its static parameters (row 398, fixed).
  - Its section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with `extends Any` written. A type parameter with no `extends` clause is exempt. Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix.
- **Conditions:** Neither path runs every set that the rules allow. Appendix I's entry "Overloading with static parameters" names the sets that each fails:
  - the checker: a generic beside a plain declaration over a tuple of object types (row 1048);
  - the code generator: two generic declarations whose bounds differ (row 537);
  - walk:
    - it refuses the 2019 paper's valid set over an array list and a list (row 539);
    - it fails on two generic functional methods, one of whose declared domains lies inside the other's (rows 779 and 780).
- **Consequence:**
  - A worker treats the positional restriction as a limit of the compiled path, not a rule of the language.
  - Such an overload writes `T`, not `T extends Any`.
  - The listed sets are expected to fail.
- **Evidence:** `Specification/advanced/overloading.tex:134-150` and `:531-674`, and the decision record's sections 3 and 4.
- **Could not resolve:**
  - "the checker refuses an override whose return type reorders its static parameters": the passage is about overloads. "Override" may mean the more specific overload, or a method override. (unclear wording)
  - P-42's content. (missing context)
  - "the 2019 paper": not named in my context. It is not needed to act on the entry. (minor)

## F-87

- **Established:** Besides the contexts that it already had, such as a typed declaration's right-hand side, the compiled checker gives a call its expected type in these places:
  - a clause of an `if` without `else`, at the type `()`;
  - a block's last expression after local declarations;
  - a `typecase` clause;
  - a juxtaposition;
  - an operator repeated between three or more operands;
  - a `label` body, and each value that an `exit` gives the `label`;
  - another call's argument. Here the checker retries the enclosing call against each declaration's parameter type (P-51, F-221).

  In a juxtaposition or a repeated operator, the expression's own expected type goes to the application that it makes.
- **Conditions:** This is the compiled checker only. The inference chapter lists every context. The `label` contexts build P-50. F-226 and F-70 cover two related cases.
- **Consequence:** A worker can rely on result-only inference in these places on the compiled path.
- **Evidence:** Tests `compiler_tests/InferResultOnly*`, among them `InferResultOnlyLabelBody`, a test that only type-checks, and `Infer*Context`. `Specification/basic/inference.tex`. The report's section 1.
- **Could not resolve:**
  - "an operator repeated between three or more operands": I read it as one operator written twice or more, as in `a + b + c`. Whether chained comparisons count is not said. (minor)

## F-252

- **Established:**
  - A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none.
  - Under walk, the load check reads a pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules, where the parameter-by-parameter check refuses it and the pair is one of these:
    - two such declarations;
    - one such declaration beside a generic trait's functional method that declares none of its own.

    It loads the pair if it meets all three rules.
  - The parameter check reads two generic functions of one name and "one list of static parameters" at one shared symbolic instantiation. It reads two instances of one generic object as two object types that cannot be extended, so they exclude.
  - That can exclude falsely. `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `P excludes Q`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both.
  - Walk then reads such an exclusion again over each declaration's instances, and withdraws it unless the instances exclude:
    - Instances of one generic type exclude only where their static arguments cannot be equal.
    - Any other exclusion stands where it still holds with the static parameters renamed apart.
    - At the shared instantiation, an exclusion stands where every generic type that both extend forces their static arguments to be equal. So `Array` and `ImmutableArray` exclude through `ReadableArray`.
  - A pair whose exclusion is withdrawn is read as a refused pair is.
  - An own generic beside such a functional method is read as two own generics (F-318).
  - A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274).
- **Conditions:**
  - Two plain declarations at `Tg[\3\]` and `Tg[\4\]` are refused (row 416). Two own generics so typed load where the reading of the whole type finds them apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` does (F-155, F-258).
  - The Meet search looks for a third declaration that covers the overlap only where, at each position, one of these holds (row 539):
    - the two types are equal;
    - one of them is a static parameter;
    - both are instances of one generic type whose arguments match in the same way.
  - A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (row 787).
  - A pair with a varargs parameter is not read again (F-257).
  - Walk compares functional methods of a generic trait at each call, on the instance that the call makes. F-253 gives the dotted case.
- **Consequence:** A worker can rely on walk to load valid generic pairs of these kinds. Expect refusals for rows 416 and 539, and for varargs pairs.
- **Evidence:**
  - Load and dispatch: `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk`, and the expected failure `XXXOverloadExistentialMeetWalk` (row 539).
  - Refusals of the withdrawal: `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`, `GenericOverloadInstancesApartWalk`.
  - Programs that load: `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest`, `GenericPairExcludesTogetherWalk`.
  - The reports named.
- **Could not resolve:**
  - The title covers pairs that the parameter check refuses. The body also covers pairs that it finds excluding (the withdrawal). The title is narrower than the entry. (wording)
  - "two generic functions of one name and one list of static parameters": this could mean identical static parameter lists, or one list that both share. (unclear wording)
  - "where every generic type that both extend forces their static arguments to be equal": "every" or "some"? With "every", one common generic supertype that does not force equality would undo the exclusion. (unclear wording, two readings)
  - "F-275 holds the Return Type Rule": "holds" may mean "describes how walk checks it". (unclear wording)
  - "This search reads a bound that names its own parameter from the declarations, so two such bounds meet": I cannot parse "reads ... from the declarations". (unclear wording)

## F-257

- **Established:**
  - When walk's load check reads a pair on its declared domains and refuses it, the message names the rule that the pair breaks:
    - "fails the Return Type Rule:";
    - "fails the Meet Rule:";
    - "fails because their parameter lists have the same types" for the No Duplicates Rule.
  - The pairs read so are those that F-252, F-27, F-318 and F-375 give. A pair that the parameter check orders is read only for the No Duplicates Rule (F-274).
  - The first two messages contain the words "not found", because walk's reading is narrower than the rules: rows 539, 550 and 779 hold valid pairs that walk refuses.
- **Conditions:**
  - A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such pairs:
    - a pair with a varargs parameter;
    - parameter lists of different lengths;
    - a pair that raises an error while its instances are read;
    - a pair of none of the kinds above, such as two functional methods of generic traits;
    - the instances that an explicit instantiation `f[\A, B\]` makes (`XXXGenericOverload2`).
  - The message does not decide which pairs load.
- **Consequence:** A worker who writes a refusal-at-load test can match these message prefixes.
- **Evidence:**
  - Return Type: `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk`, `GenericBesidePlainReturnRuleWalk`.
  - Meet: `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk`, `GenericBesidePlainNoMeetWalk`.
  - No Duplicates: `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`.
  - The report's sections 1 and 3.
- **Could not resolve:**
  - "contain the words 'not found'": the phrase is not quoted in context, so I could not write a `load_exception_contains` on it from the entry. (missing)
  - F-27's content. (missing context)

## F-302

- **Established:**
  - In "those loops", HotSpot's C2 inlines down to depth 12 from the loop. By default it stops at 16: at JDK 25's `MaxInlineLevel=15`, a frame at depth d inlines when d is at most 16.
  - The prelude's `+` reaches `Object.<init>`, under its result's box, at depth 12. A top-level binding reaches it at 10.
  - A temporary box whose constructor chain passes the limit is no longer removed. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration.
  - So an operator called from more than 4 further inlined frames keeps its temporary boxes.
  - By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's:
    - the one library: `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any`;
    - the prelude: `ZZ32`, `Number`, `Object`, `Any`.

    This is because a springboard extends the springboard of its trait's first `extends` entry.
  - If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames.
- **Conditions:** JDK 25 defaults. It was observed once (F-301). The margin under the one library is by reading, not measured.
- **Consequence:** A worker who tunes compiled hot loops should keep the depth of helper calls small, and should expect the switch-over to cut the margin. The chain of first `extends` entries of the one library's number traits matters here.
- **Evidence:** `Library/FortressLibrary.fss:776`, `:672`, `:381`, `:357`. `LibraryBuiltin/CompilerBuiltin.fsi:210`. `compiler/codegen/CodeGen.java:5728-5735`. `perf-probes/helper-calls/REPORT.md` sections 3 and 4.
- **Could not resolve:**
  - "In those loops": the entry has no antecedent. I guess F-301's loops. (unclear wording; the entry should name them)
  - "C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default": this can be read as C2 being limited to 12 in these loops, or as the chain reaching depth 12 with 4 frames to spare. The body supports the second. (unclear title, two readings)
  - "a top-level binding at 10": the entry does not say what reaches depth 10. Perhaps `+` called from a top-level binding's initializer. (unclear)
  - "springboard": not defined in my context. From the text, it is a generated class per trait whose superclass chain follows the first `extends` entries, and each class in the chain adds one constructor frame. (compiler concept I lack)

## F-351

- **Established:**
  - A compiled `atomic` block's transaction records:
    - no read of its own write;
    - a read of an ancestor's write, with that write;
    - a read of the committed value, with that value;
    - a read of an empty array element, with a mark.
  - Validation covers the transaction and every ancestor. It runs at a read once the global lock has moved, and at a commit that did not get the lock at its snapshot.
  - An abort names the transaction whose read failed. `abort()` names none.
  - The block's handler (`BaseTask.leaveTransaction`) takes every exception and ends the block's transaction. Then:
    - It starts the block again for an abort that names that transaction or names none, and for any abort at the outermost block.
    - It throws everything else on, after a nested transaction has handed its reads to its parent.
  - A nested commit hands its parent its reads and writes, also where it wrote nothing.
  - The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first.
- **Conditions:** Open: "a nested block sees a plain write by another thread that runs its outer block" (row 984).
- **Consequence:** A worker can rely on a conflict restarting the block whose transaction it names. When changing how blocks or `try` are compiled, a worker must keep the order of the handlers, and must test with the listed tests and the gate's atomic runs.
- **Evidence:** `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`, `compiler/codegen/CodeGen.java:1942-1974` (`forAtomicBlock`) and `:2284-2288` (`forTry`). The tests listed. The report section named.
- **Could not resolve:**
  - "a plain write by another thread that runs its outer block": this can be read as a write outside any transaction by a thread that runs the same outer block, such as a sibling task inside it. Or it can be read as a write by any thread while the nested block's outer block runs. (unclear wording, two readings)
  - "the global lock has moved", "did not get the lock at its snapshot": the design of the transactional memory is not in my context. This is partly inferable as a global version lock. (concept I lack)

## F-268

- **Established:**
  - The code generator emits `Any` as a static argument in an `extends` clause, as `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6451-6455`).
  - It crashes on a tuple static argument that holds `Any`, as `Holder[\(Any, ZZ32)\]` does: 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889).
- **Conditions:** Static arguments in an `extends` clause. The tuple case is open.
- **Consequence:** A worker can extend a generic trait at `Any`, but not at a tuple that holds `Any`.
- **Evidence:** Tests `compiler_tests/ExtendsGenericAtAnyCompiled.test` and `XXXExtendsGenericAtTupleOfAny.test`. The report sections named.
- **Could not resolve:** Nothing.

## F-315

- **Established:** The code generator compiles these:
  - a trait or object that extends a generic trait at `Any`;
  - a `try` with a `forbid` clause. An exception of a listed type that no `catch` clause took is thrown again as a `ForbiddenException` chained to it, made by "the library's own constructor". The `finally` clause does not run (row 890).
  - a function or method declared `test`. The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3206-3208`).
- **Conditions:**
  - A method declared `test` compiled and ran in one probe, and "no test gates it".
  - Still refused:
    - `Bottom`, `Self` or an abbreviated type as that static argument;
    - a tuple that holds `Any` (row 889);
    - the `override` modifier (row 650).
  - The library's `test stringifyChars` next stops at a varargs call (row 624). F-34 gives the rest.
- **Consequence:** A worker can compile `forbid` clauses and `test` declarations, but must not rely on `finally` after an exception leaves the `try`.
- **Evidence:** Tests `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test` and `TestModifierCompiled.test`, and `XXXFinallyOnEscape.test` for row 890. The code read at `CodeGen.java:3206-3208`. The report and review sections named.
- **Could not resolve:**
  - "a method declared `test` ... no test gates it", beside the listed `TestModifierCompiled.test`: I guess that the test covers a function declared `test` but not a method. The entry does not say. (unclear, two readings)
  - "made by the library's own constructor": this could be the compiler's prelude, the compiled path's library until the switch-over, or the one library. (unclear wording)

## F-369

- **Established:**
  - A top-level tuple binding compiles. Each name is a top-level variable of its element's type. The right side is evaluated once, at the first read of any of the names.
  - The checker gives the tuple, rebuilt from the checked elements, its tuple type. Each name's thunk reads its own element from it (`Decls.scala:272-277`).
  - Where only some names declare a type, and the right side is not a tuple expression with as many elements, the checker checks the right side again against each name's type (`Decls.scala:324-336`).
  - The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>`. It gives each name its own class, whose initializer takes its element out through the tuple's typed getter (`CodeGen.java:6661`).
  - A wildcard binds nothing.
  - Every compiled top-level variable is initialized at its first read, not at load as under walk. So a binding of wildcards alone never evaluates its right side (row 1011).
- **Conditions:**
  - Under walk, the same right side runs once for each name and once more (row 1026).
  - Open: a local tuple binding's declared name beside untyped names is not checked (row 1029).
  - Open: a typed tuple binding over an `if` with tuple branches stops the code generator (row 1031).
- **Consequence:**
  - A model line of this form compiles as written, the model's lines 17 to 19 among them.
  - A name bound so is typed as a single binding's name is. So `MicroGptFlat.fss:72`, `beta1 m`, is "a new checker site" against the one library (F-58).
  - A worker must not rely on the right side's side effects at load on the compiled path.
- **Evidence:** Tests `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test` and `XXXTopLevelTupleBindingType.test`. The report sections named.
- **Could not resolve:**
  - "is a new checker site against the one library": this could mean a new place where the checker reports an error, which F-58 would list. Or it could mean a new place that the checker now checks, because `beta1` has a type. (unclear wording)
  - "the model's lines 17 to 19": the entry does not say whether these are the flat program's lines or the APL program's. The flat program is likely, since line 72 is cited in it. (unclear)
  - `XXXTopLevelTupleBindingType.test`: the entry does not say which defect it pins. (minor)

## F-258

- **Established:**
  - Walk and the compiled checker read exclusion between two declarations, where one or both have static parameters, over the whole parameter type, by existential reduction:
    - A value of both declared domains has, at each position, one instance of each generic type that the two parameter types there are or extend. So those instances' static arguments are equal.
    - The domains exclude where those equalities cannot hold together.
    - They also exclude where, at the instance that the equalities force, the parameter types at some position exclude.
  - Walk:
    - The Meet branches of `genericPairValid`, and of `validOnDeclaredDomains`'s reading of a generic beside a plain declaration, also ask `domainsExcludeTogether`.
    - That method reads bounds where `mayBeEqual` and `meetParams` read them. It reads no `where` clause, no varargs and no lists of different lengths.
    - At the forced instance, it reads two parameter types that still mention a static parameter as apart only where they cannot meet at any instance of it: an object type is apart from a type that neither it nor a supertype of it may be. It reads no `comprises` clause (`excludesAtMeet`).
  - The checker:
    - `OverloadingOracle.excludes` asks `TypeSchemaAnalyzer.emptyED` beside `subtypeED`: the existential reduction's first premise alone, with its bounds not read.
    - It also asks `meetEmptyWithBounds`, which reads each static parameter at the top of the meet as its declared bounds (F-277).
    - On the interpreter's library, `emptyED` is never reached: `subtypeED` shows all 691 meets that the count stage tests to be empty.
- **Conditions:** The paths differ on three cases:
  - two type parameters whose bounds exclude (row 786);
  - such a pair where one declaration has a `where` clause. Walk refuses it and the checker accepts it (row 787).
  - `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`. Walk's parameter check reads it apart and loads it; the checker refuses it (row 788).
- **Consequence:** A worker can rely on both paths to accept pairs that forced equalities keep apart. A test must not assert either path's answer for rows 786 to 788.
- **Evidence:**
  - Walk: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:935` at `a93fb3bfd`, and `:1041` at `84957e6ef`.
  - The checker: `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:367`, and `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:444` and `:533`.
  - Tests that load, compile and dispatch: `ProjectFortress/tests/GenericPairExcludesTogetherWalk`, `GenericPairForcedObjectApartWalk`, `ProjectFortress/compiler_tests/GenericPairExcludesTogether`, `GenericPairSharedSupertypeExclusion`.
  - Tests of refusals: `ProjectFortress/tests/GenericPairFreeArgumentWalk`, `GenericPairObjectSupertypeOverlapWalk`, `ProjectFortress/compiler_tests/XXXGenericPairFreeArgument`.
  - The report sections named.
- **Could not resolve:**
  - "the existential reduction's first premise alone": the reduction's premises are not described in my context. (type-theory concept I lack)
  - `OverloadingOracle.scala:367` is cited both for `excludes` and for `meetEmptyWithBounds`. Two methods at one line is possibly a wrong citation. (citation)
  - "an object type apart from a type that neither it nor a supertype of it may be": I read it as follows: object type O and type X are apart if, at no instance, X can be O or a supertype of O. The sentence is dense. (wording)
  - How `meetEmptyWithBounds` relates to `excludes`, for example whether it is a further branch, is not said. (unclear)

## F-349

- **Established:**
  - Among declarations that apply with coercion, where none wins directly, walk chooses by specificity "read through other applicable declarations".
  - That is the specification's choice: the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"). It holds wherever the relation has no cycle.
  - So a call with three declarations in a chain of coercions runs "the first", as the compiled path does, with no 'Ambiguous coercion' (a probe, no test).
  - A float numeral to the left of an `RR32` operand runs `RR32`'s operator.
- **Conditions:** Walk's rule for a numeral at a call runs before this one (F-366). Behaviour when the relation has a cycle is not stated.
- **Consequence:** A worker can expect walk and the compiled path to agree on such chains.
- **Evidence:** `interpreter/evaluator/values/OverloadedFunction.java:2545` and `:2608-2628`. The test `tests/NumeralLeftOfRR32Walk`. The report's section 1.
- **Could not resolve:**
  - "by specificity read through other applicable declarations": I cannot tell whether this means transitively (A beats C because A beats B and B beats C) or something else. The specification's own phrase does not need "through". (unclear wording)
  - "runs the first": the first in the chain could be the most specific declaration, or the one that the argument reaches first by coercion. (unclear, two readings)
  - "where none wins directly", and what happens at a cycle. (unclear and missing)

## F-366

- **Established:**
  - On both paths, a numeral at a call leaves the declaration that its default type fits only for a declaration that the numeral's own coercion reaches and whose declared parameter types lie strictly below, by subtyping.
  - Examples:
    - `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`.
    - `h = 0.5` is `true` for `h: QQ = 1/2`.
    - `k(5)` runs `k(x: NN32)` beside `k(x: Any)`.
    - A `case` clause `0` matches a zero `NN32`.
    - A program's own number type with a numeral coercion compares with a numeral by its own `=`.
  - `Equality[\T\]`'s `=/=`, the negation of `=` (`Library/FortressLibrary.fss:102`), is reached before the `=/=` over `Any` (`:98`).
  - The order is subtyping on the declared parameter types, not the coercion chapter's relation:
    - `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration.
    - `x^2` for an `RR64` keeps its integer power.
  - A value's coercion, as opposed to a numeral's, is not ranked so.
  - Where a call reaches two declarations only by coercion, and they are not ordered, the one whose parameter the numeral's default fits runs. So `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition.
- **Conditions:**
  - It builds P-46's rule. P-46 does not word the order: the worker chose subtyping, and the curator read that choice as landed and let it stand, without wording a decision.
  - The checker compares only "where the declaration that fits has a numeral at a parameter that is not of the numeral's default type". So `i + 1` costs nothing more.
  - Departures:
    - Under walk, a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016).
    - On both paths, a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017).
- **Consequence:** A model line may compare a number of any type with a numeral, and may write a float numeral beside an integer value, on both paths. For a comparison with a value typed `Any` under walk, bind the numeral first (`interpreter.md`).
- **Evidence:** `numeralAttempt` and `numeralTie` in `scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066` and `:1117`. `bestMatchForNumerals` and `belowByNumerals` in `interpreter/evaluator/values/OverloadedFunction.java:2422-2525`. Tests `compiler_tests/NumeralMostSpecificCompiled`, `NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `NumeralEqualsNumberWalk` and `NotEqualNumeral`. The report sections named.
- **Could not resolve:**
  - "the curator has read that choice as landed and let it stand, without wording a decision of his own": I cannot tell whether a worker must treat the subtyping order as decided, or as open to change. (unclear status)
  - "where the declaration that fits has a numeral at a parameter that is not of the numeral's default type": a declaration does not have a numeral; a call does. I read it as "where the call has a numeral at a parameter whose declared type is not the numeral's default type". (unclear wording)
  - "the report says which choices walk keeps in its dispatch cache": a worker who changes walk's cache would need this, and the entry only points to it. (missing, pointed to)

## F-367

- **Established:**
  - Under walk, a generic function is a value. It has a type of its own (`FTypeGenericArrow`), below `Any` and below each arrow type that it can be received at.
  - These receive the instance that a direct call with arguments of the arrow's domain types would run (`Fcn.received`, `EvaluatorBase.instanceReceivedAt`):
    - a parameter of a function or a constructor;
    - a local variable declared with an arrow type;
    - a variable of arrow type at an assignment, a mutable top-level variable among them.
  - The receiving callee's static parameters are fixed by its other arguments first. So `rows(rmsn, x)` runs with a sized `rmsn`.
  - The value stays generic, and each application infers its static arguments as a direct call does, in these places:
    - where the arrow type leaves one of the function's static parameters open;
    - at `Any`, at a type parameter, and at an untyped place.

    The compiled checker refuses these forms (row 1021).
  - An overloaded name keeps its whole overload set, and its type as a value holds its generic overloads. So `pick(twice)`, for an overloaded `twice` with a generic declaration, runs the `pick` declared over an arrow type, not `pick(x: Any)` (`OverloadedFunction.java:3067`). No test pins this.
- **Conditions:**
  - Not built: an immutable top-level variable keeps the generic value (row 1019).
  - Not built: a callee's type parameter fixed only by a value's run-time type refuses the function (row 1018).
  - A generic function declared in a block does not run under walk at all, called or passed (row 1020).
- **Consequence:**
  - A worker can pass a generic function where an arrow type is expected under walk.
  - On the compiled path, a worker must write the static arguments where the arrow type leaves one open.
  - Do not rely on the `pick(twice)` choice: no test pins it.
- **Evidence:** Tests `tests/GenericFunctionAsValueWalk.fss`, `GenericFunctionRowLiftWalk.fss` and `GenericFunctionAssignedWalk.fss`. The source files named. The report sections named.
- **Could not resolve:**
  - "the row lift `rows(rmsn, x)`": "row lift", `rows` and `rmsn` look like model-program names that my context does not define. I read it as applying `rmsn` to each row of `x`. (missing context)
  - "A generic callee's static parameters": I read the callee as the function that receives the generic function, such as `rows`, not the generic function itself. (wording)
  - "its type as a value holds its generic overloads": the entry does not say what happens to the non-generic overloads. (unclear)

## F-173

- **Established:** The specification's inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred.
  - A type parameter that a parameter's type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by the argument at that position.
  - A type parameter that is the whole declared type of one or more parameters, as in `x: T`, and that nothing else fixes, takes the narrowest type within its bounds that every such argument has or converts into: `ZZ64` for a `ZZ32` and an `NN32`.
  - Where there is no such type, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes.
  - Inference never gives `BottomType`.
- **Conditions:**
  - The chapter states P-46, P-48 and P-49.
  - The compiled path departs from the chapter "among others" in this way: its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` give `ZZ`, not `ZZ64`. No callout names this (row 442, `XXXInferPromoteNN32`).
  - The callouts at `inference.tex:285-347` and `:448-512` give walk's departures. One is the return type `BottomType` that walk gives a function expression that declares none (row 587).
- **Consequence:** On both paths, a worker can rely on a whole-type parameter taking the narrowest common type, or else its bound. Until the switch-over, expect `ZZ` for a `ZZ32` with an `NN32` on the compiled path.
- **Evidence:** Tests `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. `Specification/basic/inference.tex:45-125`. The rung's report.
- **Could not resolve:**
  - "and no numeral settles the tie": the entry does not say how a numeral settles it, perhaps by F-366's rule. (missing)
  - "narrowed by what the call's expected type requires of the return type": the entry does not say narrowed to what. Perhaps the meet of the bound and what the expected type requires. (unclear)
  - "among others": the compiled path's other departures are not listed. (missing)

## F-175

- **Established:**
  - Every passage of the specification reads a `comprises` clause at the level of values. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change.
  - A call whose argument's static type "stands between two closed traits" runs the declaration that covers its value.
  - Where the call's declarations have no static parameters, its type is the intersection of its most specific declarations' return types.
- **Conditions:** It builds P-60. Appendix I names five places where the compiled path departs:
  - The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487).
  - The code generator crashes on a method call on a result typed by that intersection (row 540).
  - Where any declaration of the set has static parameters, the checker types such a call by one of its most specific declarations, "a deliberate choice" (row 543).
  - The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546).
  - The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547).
- **Consequence:** In compiled code, a worker avoids method calls on a result typed by such an intersection, and expects the four departures of the checker listed above.
- **Evidence:** `Specification/appendices/changes.tex:3474-3670`, with the rows at `:1674-1677` and `:3740-3747`. The decision record's sections 8 and 9. No test is named; this is a fact about the specification's text.
- **Could not resolve:**
  - "at the level of values": `SKILL.md` says that every value has a listed type. The reading that this replaces, presumably "at the level of types", is not explained. (language concept I lack in part)
  - "A call whose argument's static type stands between two closed traits": I cannot parse "stands between". It could mean a static type below one closed trait and above its listed types, or a type in the meet of two closed traits. (unclear wording)
  - "a deliberate choice (row 543)": the entry does not say whose choice it is (the curator's, a worker's or the team's), or whether it is decided. (unclear status)
