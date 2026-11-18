<!-- The record of climb batch 33, in two runs (climb batch 33 and climb batch 33b), for the coordinating session, the curator and the batch's workers: the first rungs of microGPT's slice under P-33. Run 1: the selector by which the compile command reads the one library beside the compiler's prelude, with a test track under the gate (S); a typecase arm at an undefined name refused (D); the kind environment of two generic forms (V); self at a self type or a listed type in a conditional's arm, a closure and a default body, review-queue item 572 (Q); four of the checker's smaller gaps (C). Run 2, on run 1's landed tree: a method entry found by its api, the root of rows 940, 942 and 1061 (R); the prelude's half of P-178 by the carriers' review's way C in its form 2, built once for both libraries (N). -->
<!-- History. Drafted 2026-11-17 by the planning worker of climb batch 33, on Opus, against `main` at `1c7e7415aa`, whose code is that of `c3b16ef2d1`, the base build `/home/user/fortress-base37` (`git diff --stat c3b16ef2d1 HEAD -- . ':!explorations' ':!docs' ':!.claude'` prints nothing). -->
<!-- Checked 2026-11-17 by a fresh reader on Fable before any launch; its findings, and each change that it made here with its reason: `coordinator/climb-batch-33-review.md`. -->
<!-- Amended 2026-11-17 by the same planner at the coordinator's request, after the curator asked why varargs and rows 540 and 315 were not in the batch: rung I (row 540) added to run 1; rungs W (row 315) and G (row 624, varargs) added to run 2; the probes in `compile-ladder/plan-33/PROBES.md`, section 11. -->
<!-- Read again 2026-11-18 for run 2 on run 1's landed tree, `main` with the code of `d3747846c1`, by a worker of the coordinator's on Opus: run 2's manifest fields, sections N, W, G and R, "The rule the rungs keep", run 2's parts of section 2 and section 6, by `reviews/batch-33-review.md`, Part 5, each correction checked at its source; the measure taken on `d3747846c1` (F-34); run 2's estimate by that review's process finding 1. No design and no fork's default changed. -->
<!-- **No go.** The curator asked on 2026-11-13 for this batch to be planned and said that its start is not authorized ("You should work on planning next batch (Start's not authorized yet!)"). This record launches nothing. Section 2 is written for his go or his refusal. -->
<!-- Sources: the planner's brief (`<scratchpad>/batch31/planner-33-brief.md`); POSITIONS P-33 with its history, P-178 with its history, P-37 with its history, P-17, P-60, P-146, P-148, P-167, P-173; FACTS F-34, F-53, F-352, F-353; `compile-ladder/plan-31/probes/switch-rehearsal.md`; `compile-ladder/plan-31/probes/probe-y.md`; `reviews/plan-review-2026-11-10.md`, section 7; `reviews/carriers-ways-2026-11-13.md`, whole; `coordinator/CLIMB-BATCH-31.md`, section 2, "The merge" and "For the batch after, in this order", and section 3, item 5; `reviews/batch-31-review.md`, "The steps due before run 2"; `reviews/batch-31b-review.md`, Part 5 and "The steps due before the batch after"; review-queue items 513, 521, 522 and 572; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`, "The go" and "The workflow"; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the code at the sites. -->
<!-- The planner's probes: `compile-ladder/plan-33/PROBES.md`, with the prelude probe's patch and the programs in `compile-ladder/plan-33/probes/`, run in two worktrees of the planner's own, `/home/user/fortress-p33` and `/home/user/fortress-p33m`, seeded from the base build and removed after. The two compiled tracks ran twice in scratch; no gate stage ran. -->

# Climb batch 33

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 33, holds S, D, V, Q, I and C in that order; run 2, climb batch 33b, holds N, W, G and R. In run 1, V, Q and I share `compiler/codegen/CodeGen.java`; in run 2, N, W and G share `compiler/NamingCzar.java`, and N, G and R share `CodeGen.java`. The order of each run is that of the rungs' lowest edited lines in the files that they share (section 4, "The rule the rungs keep"). The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-33.md#`, PRB for `doc:explorations/compile-ladder/plan-33/PROBES.md#`, PY for `doc:explorations/compile-ladder/plan-31/probes/probe-y.md#`, REH for `doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#`, CW for `doc:explorations/reviews/carriers-ways-2026-11-13.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main`, each matching one place (PRB, section 10); run 2's again on run 1's landed tree.

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | S | `rung-library-selector` | The library selector: the compile command reads the one library where it is selected | 200 |
| 1 | D | `rung-typecase-unbound-arm` | A typecase arm at a name that no declaration defines is refused | 150 |
| 1 | V | `rung-kind-env-generic` | The kind environment of a generic declaration's types on the compiled path | 200 |
| 1 | Q | `rung-self-arm-closure` | self at a self type or a listed type: a conditional's arm, a closure, a default body | 200 |
| 1 | I | `rung-intersection-receiver` | A method call on a value typed by an intersection | 150 |
| 1 | C | `rung-checker-small-gaps` | Four of the checker's smaller gaps | 220 |
| 2 | N | `rung-number-payload-objects` | The prelude's seven number types as value objects over hand-written payload classes | 300 |
| 2 | W | `rung-closure-name-once` | One class name for each function expression that shares a source span with another | 150 |
| 2 | G | `rung-varargs` | A varargs parameter compiled as one immutable array of the arguments | 280 |
| 2 | R | `rung-api-method-index` | A method of an imported api's trait found by its api | 200 |

Fields common to the ten rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-library-selector`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** S's test track joins `testFast` (section 4, S); otherwise none, but the specification's build at each run's gather. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. N, W, G and R are written on run 1's landed tree: N's names table follows S's selector, and the tests of W, G and R compile programs under it. G and W need no other rung of run 2: the planner compiled their programs under the selector without row 1061's repair (PRB, section 11).
- **its test is the stage:** no. **the stages:** S, D, V, C, N and R run the count stage and the distance stage once on their final trees, as a step of their sections: S edits the command that the stages' driver calls, D the disambiguator that both paths run, V, C and R the checker's Scala, N the table that the checker's rewrite of the bindings reads. Q, I, W and G run neither and list their files (`STAGE_BLIND`): their edits are in the code generator, which the stages do not run. V, Q, I, N, G and R each run the distance stage's shadow patch once on their final trees, since that tool edits a copy of `CodeGen.java`; W too if it edits that file.
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 31b's gate left them (F-53). **expected checker crash:** none.

### S
- **slug:** `rung-library-selector`
- **worktree:** `/home/user/fortress-library-selector`
- **section:** `S. The library selector: the compile command reads the one library where FORTRESS_LIBRARY=one selects it, with a caches folder of its own and a test track under the gate (P-33, F-353)`
- **blurb:** the compiled path reads only the compiler's prelude. By the decision on record, the compile command selects the one library beside the prelude, so that each wall that only the one library shows is met as one rung with its own test under the gate. The rung builds probe Y's selector properly: one variable or property read once, the caches folder that follows it, the build's stamp over both folders, and a test track run under the selection in testFast, whose first tests compile programs against the one library.
- **points to report:**
  - The selector as built: its variable and property, where it is read, which commands follow it, what a run with a wrong pairing does.
  - The caches folder of the selection, the build's stamp and `ant cleanCache` over both folders, and the scripts that take the folder.
  - The track: its folder, its ant target, how the gate runs it, its private caches; each test failing on the base and passing after, and the expected failure of the run.
  - Every existing test that failed after your change, with its cause.
  - The two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (14 keys, 9 checks):
  - P-33 (check): the order, and the selector with one build serving both libraries.
  - P-37 (check): the prelude stays until the switch-over, and gains no declaration.
  - F-353 (check): probe Y's result, one build for two libraries.
  - F-352: the rehearsal's switch and its walls.
  - PY `2. How the library is selected` (check): the selector as probed, and what follows it.
  - PY `3. The hacks` (check): the proper form of each of probe Y's shortcuts.
  - PY `7. Doing it properly, in rungs`: the selector's rung as probe Y sized it.
  - REH `1. The switch itself`: the two lines that switch the compile command.
  - PRB `6. The selector` (check): what the selector alone compiles on this code, and where `Arr` stops.
  - SRC `Shell.java#public static void useCompilerLibraries` (check): where the compiled path chooses its library.
  - SRC `compiler/WellKnownNames.java#public static boolean areCompilerLibraries`: the library's names.
  - SRC `repository/ProjectProperties.java#public static final String CACHES` (check): where the caches folder is set.
  - `map:modules-and-phases.md#B.13 Where each library enters`: where each path reads its library.
  - REC `Forks the batch takes` (check): the defaults you build.

### D
- **slug:** `rung-typecase-unbound-arm`
- **worktree:** `/home/user/fortress-typecase-unbound-arm`
- **section:** `D. A typecase arm at a name that no declaration defines is refused on both paths (row 959)`
- **blurb:** the parser reads a typecase arm Id => as a type variable, and no phase reports a name that binds nothing, so on both paths such an arm takes every value with no message (row 959). Since the merge, Int, Long, Float, BigNum and UnsignedLong name no type, and an old program's arm at one of them gives a wrong answer silently. The rung refuses such an arm where every other type name that no declaration defines is refused: 'X is undefined.'
- **points to report:**
  - Where the refusal is made, and why a type variable in scope still binds the arm.
  - Row 959's walk test promoted, and its compiled sibling, each failing on the base and passing after; a typecase over a type parameter, unchanged.
  - Every existing test and every line of the libraries that names such an arm, and what each now does.
  - The two stages' tables on your final tree against the comparand.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (8 keys, 5 checks):
  - P-167 (check): walk's internal names are no types that a program sees.
  - ledger:959 (check): the arm that takes every value, which closes.
  - SPEC `basic/expressions/typecase.tex#Typecase Expressions` (check): what an arm's type is.
  - SRC `compiler/disambiguator/TypeDisambiguator.java#public Node forVarType(final VarType that)` (check): where a type name is bound.
  - `code:ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats#typecase w a1:Expr w a2:(of / do / in) w a3:TypecaseClauses`: where the arm is parsed.
  - `map:modules-and-phases.md#B.4 Disambiguation`: the phase that both paths run.
  - F-361: the merge's probe, which met this row.
  - REC `Forks the batch takes` (check): the defaults you build.

### V
- **slug:** `rung-kind-env-generic`
- **worktree:** `/home/user/fortress-kind-env-generic`
- **section:** `V. The kind environment of a generic declaration's types on the compiled path: a member of a generic trait under a comprises clause at a where-clause type, and a typecase in a generic function (rows 812 and 822)`
- **blurb:** the code generator stops, 'E is not in the kind env', on a generic trait that defines a member of a trait whose comprises clause lists a type at a where-clause variable (row 812), and '<X> is not in the kind env' on a typecase inside a generic function where an arm binds a value at a type that names the function's type parameters and reads that value (row 822). The checker passes both. Four declarations of the one library stop so: __bigOperator2, List's app and ArrayList, CovariantCollection's APPCOV. The rung gives the code generator the static parameters that are in scope where it normalizes such a type.
- **points to report:**
  - The cause as found for each row, by file and member, and the scope that the repair gives.
  - Rows 812 and 822: each test failing on the base and passing after, at one thread and at four.
  - The one library's four declarations: by your reading, whether each now passes this wall, and what stands behind it.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (11 keys, 8 checks):
  - P-60 (check): a comprises clause speaks of values, a where-clause type among its entries.
  - ledger:812 (check): the generic member under a where-clause comprises, which closes.
  - ledger:822 (check): the typecase in a generic function, which closes.
  - F-34 (check): the measure, four of whose declarations are this kind.
  - REH `3. The code generator over the library today, against F-34`: the four sites.
  - SPEC `basic/trait-parameters.tex#Where Clauses` (check): a where-clause variable's scope.
  - SPEC `basic/expressions/typecase.tex#Typecase Expressions`: the arm's binding.
  - SRC `compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)` (check): the typecase's code.
  - SRC `scala_src/types/TypeAnalyzer.scala#is not in the kind env` (check): the lookup that stops.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a generic declaration.
  - REC `Forks the batch takes` (check): the defaults you build.

### Q
- **slug:** `rung-self-arm-closure`
- **worktree:** `/home/user/fortress-self-arm-closure`
- **section:** `Q. self at a self type or a listed type on the compiled path: an arm of a conditional, a function expression's or a local function's result, and a default body that calls a method on a value of the self-type parameter (rows 1051, 1050 and 1052; review-queue item 572)`
- **blurb:** in a self-typed trait or a trait with a comprises clause, the checker types self as the trait met with the implementing type. The code generator casts a method's returned self since climb batch 31's rung K, but not an arm of a conditional (row 1051), nor a function expression's or a local function's result (row 1050), and each fails the JVM's verification when its class loads; the one library's StandardTotalOrder has the first form in MIN, MAX and MINMAX, so the first compiled program against the one library meets it. A default body that calls a method on a value of the self-type parameter dies with ClassCircularityError when the object lists the trait first (row 1052). The rung repairs the three.
- **points to report:**
  - The cast as built at each place: where it is emitted, and the test that decides whether one is needed.
  - Rows 1051, 1050 and 1052: each expected-failure test promoted, failing on the base and passing after; the owed test of the self-type parameter's form, from the record's step 1.
  - Row 1052's cause as found: which class the loader loads, why it is circular, and what the repair loads in its place.
  - The bytecode of a conditional that needs no cast, before and after.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (13 keys, 9 checks):
  - P-146 (check): self in a self-typed trait.
  - P-60: a comprises clause speaks of values.
  - ledger:1051 (check): the conditional's arm, which closes.
  - ledger:1050 (check): the closure's result, which closes.
  - ledger:1052 (check): the circular class load, which closes.
  - ledger:991: rung K's cast at a returned value, the precedent.
  - `doc:explorations/reviews/batch-31b-review.md#Part 5. What the batch after holds`: where item 572 is met.
  - `code:Library/FortressLibrary.fss#trait StandardTotalOrder` (check): the one library's site.
  - SRC `compiler/codegen/CodeGen.java#private void castToTypeBelow(Expr expr, Type declared)` (check): the cast at a returned value.
  - SRC `compiler/codegen/CodeGen.java#public void forIf(If x)` (check): the conditional.
  - SRC `compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)`: the function expression; `forLetFn` beside it.
  - SRC `runtimeSystem/MethodInstantiater.java#Class cl = Class.forName(new_owner_class_name, true, icl)` (check): the load of row 1052.
  - REC `Forks the batch takes` (check): the defaults you build.

### I
- **slug:** `rung-intersection-receiver`
- **worktree:** `/home/user/fortress-intersection-receiver`
- **section:** `I. A method call on a value typed by an intersection on the compiled path: the receiver found among the conjuncts (row 540)`
- **blurb:** where a call's result is typed by the intersection of its candidates' return types, as choose(m) is by LeftResult and RightResult, a method call on it crashes the compile: 'ClassCastException: IntersectionType cannot be cast to NamedType' (row 540). The checker's typing is right and stays. The one library's __filter stops at this wall. The rung finds the method's owner among the conjuncts and casts the receiver to it.
- **points to report:**
  - The owner as found: the rule that picks the conjunct, where several declare the method, and the cast.
  - Row 540's test promoted to a run test, failing on the base and passing after; the variable, the getter and the `.right()` forms of its notes.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (7 keys, 5 checks):
  - P-60 (check): a `comprises` clause speaks of values; the typing by the intersection stays.
  - ledger:540 (check): the method call on an intersection, which closes.
  - SPEC `advanced/overloading.tex#Coercion and Overloading Resolution`: how a call's type is fixed.
  - SRC `compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)` (check): the dotted call.
  - SRC `compiler/codegen/CodeGen.java#private Type sanitizePossibleStupidIntersectionType(Type receiverType)` (check): where the receiver's type is narrowed today.
  - REH `3. The code generator over the library today, against F-34`: the library's site, `__filter`.
  - REC `Forks the batch takes` (check): the defaults you build.

### C
- **slug:** `rung-checker-small-gaps`
- **worktree:** `/home/user/fortress-checker-small-gaps`
- **section:** `C. Four of the checker's smaller gaps: a subscript then a superscript, a top-level variable made mutable by := under an api's var, a typed name in a local tuple binding, and a block's numeral at an untyped binding (rows 1005, 1028, 1029 and 1060)`
- **blurb:** four gaps of the compiled checker, each held by an expected-failure test: x[5]^2 stops the compile with intermediate nodes left in the tree (row 1005); tally: ZZ32 := 0 under the api's var tally: ZZ32 is not matched (row 1028); a local tuple binding's declared type of one name goes unchecked where the right side is no tuple expression (row 1029); and a variable bound with no type to a block that ends in a numeral keeps the numeral's own type, so a later conversion dies at run time (row 1060). The rung repairs the four in the checker.
- **points to report:**
  - Each repair, by file and member, and the rule that it follows.
  - Rows 1005, 1028, 1029 and 1060: each expected-failure test promoted, failing on the base and passing after; each program under walk, with the same answer.
  - Every existing test whose pinned message changed.
  - The two stages' tables on your final tree against the comparand, and the checker's timing before and after.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (12 keys, 8 checks):
  - P-173 (check): a numeral converts where it stands; elsewhere it takes its default.
  - P-148 (check): the checker's timing after a change.
  - ledger:1005 (check): the subscript then superscript, which closes.
  - ledger:1028 (check): the top-level variable made mutable by `:=`, which closes.
  - ledger:1029 (check): the local tuple binding, which closes.
  - ledger:1060 (check): the numeral at an untyped binding, which closes.
  - SPEC `basic/operators/juxtameaning.tex#Juxtaposition`: a subscript and a superscript.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): `:=` and `var` at the top level.
  - SPEC `basic/variables.tex#Local Variable Declarations`: a tuple binding's names.
  - SPEC `basic/expressions/blocks.tex#Do Expressions`: a block's value and type.
  - `map:compile-path-walkthrough.md#What it writes onto the tree`: what the checker writes onto the tree.
  - REC `Forks the batch takes` (check): the defaults you build.

### N
- **slug:** `rung-number-payload-objects`
- **worktree:** `/home/user/fortress-number-payload-objects`
- **section:** `N. The prelude's seven number types as value objects whose classes the code generator writes over hand-written payload classes, serving the prelude and the one library alike (P-178 and P-37; rows 1003, 866, 995 and 698)`
- **blurb:** the compiler's prelude declares ZZ32, ZZ64, ZZ, NN32, NN64, RR32 and RR64 as open traits, each carried by a hand-written class that extends the trait's generated class; a program's object can extend them and dies when it runs (row 866). By the decisions on record each is one value object on both paths before the switch-over, and the code generator writes the object's class over a small hand-written class that holds the bare JVM value (the carriers' review, way C, form 2). The rung makes the change, built once for the prelude and for the one library under the selector, as the planner's probe built it in scratch.
- **points to report:**
  - The design as built: the payload classes, the table of payload objects, what the code generator writes for such an object, how Java code makes a value, and the one name that every place gives a payload object's type.
  - Each place that names a payload object's type, by file and member, and the name it gives.
  - Row 866's and row 698's tests promoted; the team's `Compiled6.bx` with its second message; row 566's test under two hash modes; each new test failing on the base and passing after.
  - The whole compiled tracks, and walk's suite: every test that failed after your change, with its cause.
  - The one library's seven number objects are left out (fork N4): each place where their entries would go, by file and member.
  - The two stages' tables on your final tree against the comparand.
  - Each sentence of the specification and of Appendix I's Effects that your change makes false, before and after.
  - A line of the model program or of its helper files that the change needs: none, or the line, not changed.
  - A file edited beyond those named.
- **briefing** (22 keys, 17 checks):
  - P-178 (check): the decision you build, its detail way D.
  - P-37 (check): the prelude's second exception, and no stopgap.
  - P-17 (check): unboxed numbers, which the form leaves open.
  - P-33 (check): one build serving both libraries.
  - ledger:1003 (check): the prelude's open traits, which closes.
  - ledger:866 (check): a program's object below `ZZ32`, which closes.
  - ledger:995 (check): a carried type's two names, closed for the seven numbers.
  - ledger:996: the order of the code generator's output, under which you run the tests twice.
  - CW `Way C. The object's class carries the value, and the trait stays an interface` (check): the machinery and its three forms.
  - CW `Way D. One object per type: each number trait merged with its one object` (check): the decision's detail.
  - PRB `2. Form 2 for the prelude: what was built` (check): the probe's design, file by file.
  - PRB `3. What ran` (check): the programs and the two runs of the tracks.
  - PRB `4. What form 2 met, in the order met` (check): the three naming walls.
  - PRB `5. The one library: the measure with form 2` (check): the seven objects emitted.
  - REH `W12. A carried type has two names at run time`: the wall's first form.
  - SRC `compiler/runtimeValues/FZZ32.java#public final class FZZ32` (check): today's carrier.
  - SRC `compiler/codegen/CodeGen.java#public void forObjectDeclPrePass(ObjectDecl x)` (check): where an object's class is written.
  - SRC `compiler/NamingCzar.java#private static void bl(APIName api, String str, String cl)` (check): the table of carried types.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait ZZ32 extends`: the prelude's text.
  - `code:Library/FortressLibrary.fss#value object ZZ32 extends`: the one library's form, the precedent.
  - `map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader`: how a class is loaded and named at the run.
  - REC `Forks the batch takes` (check): the defaults you build.

### W
- **slug:** `rung-closure-name-once`
- **worktree:** `/home/user/fortress-closure-name-once`
- **section:** `W. One class name for each function expression on the compiled path, where two share a source span: the right operand of AND: that is a reduction (row 315)`
- **blurb:** the code generator names a function expression's class by its source span alone, so two function expressions at one span get one name, and the compile dies: 'ZipException: duplicate entry'. The one library's = on lists and on its ordered sequences meets it at (|self| = |other|) AND: (BIG AND [(a,b) <- self.zip(other)] a = b): the thunk that AND: makes of its operand and a closure of the reduction share the operand's span (row 315). The compiled = of two integers names that class. The rung gives each function expression a name of its own, with its test under the selector.
- **points to report:**
  - Which two nodes share the span, by the desugaring that makes each.
  - The naming as built: which expression keeps today's name, how the second is named, and why the result does not depend on a hash order.
  - Row 315's test under the selector, failing on the base and passing after; its run test, an expected failure until the one library compiles whole.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (8 keys, 4 checks):
  - ledger:315 (check): the closure class written twice, which closes.
  - PRB `11. Varargs` (check): the program, its two variants that compile, and the span.
  - SRC `compiler/NamingCzar.java#public static String gensymArrowClassName(String desc, Span sp)` (check): where the name is made.
  - SRC `compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)`: its caller, which run 1's rung Q edited.
  - REH `W10. A closure class written twice into the jar`: the library's site, on the path of `=` on two integers.
  - ledger:996: the order of the code generator's output, on which the name must not depend.
  - REC `S. The library selector`: the selector under which the test compiles.
  - REC `Forks the batch takes` (check): the defaults you build.

### G
- **slug:** `rung-varargs`
- **worktree:** `/home/user/fortress-varargs`
- **section:** `G. A varargs parameter on the compiled path: the arguments that no plain parameter takes passed as one immutable array, at a call and in a dispatch method, under the selector (row 624)`
- **blurb:** the code generator refuses every function and method with a varargs parameter, 'Can't compile VarArgs yet', and every call of one (row 624). The one library declares assert, deny, the list constructor and its stream's print and println so, and println is on the path of every program. The specification and the decisions on record fix the value: an immutable one-dimensional array of the arguments that no plain parameter takes, typed ImmutableArray[T, ZZ32], as walk builds it with the library's __immutableFactory1. The rung compiles it under the selector; the prelude declares no such array type, so there it stays refused.
- **points to report:**
  - The convention as built: the JVM parameters of a varargs declaration, where the array is made, at a call and in a dispatch method, and how a call of each arity reaches the varargs declaration.
  - Row 624's test under the selector, failing on the base and passing after; the run test, an expected failure until the one library compiles whole; the bytecode of one call, with the array made and filled.
  - The prelude's two expected-failure tests: unchanged, or their message.
  - The measure on a scratch copy of your final tree: how many of the refused declarations remain, and what stops `Generator2` and `CatString` behind varargs.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (15 keys, 10 checks):
  - P-37 (check): the prelude gains no declaration, so no array type there.
  - F-86 (check): the checker types the parameter as `ImmutableArray[\T, ZZ32\]` and applies the expansion rule.
  - ledger:624 (check): the refusal, which closes under the selector.
  - ledger:604: the checker's refusal under the prelude, which stays.
  - SPEC `basic/functions.tex#Function Declarations` (check): the parameter's type, and the revival callout that names the array.
  - SPEC `basic/functions.tex#Function Applications` (check): which arguments the parameter holds, in order.
  - SPEC `basic/overloading.tex#Applicability for Functionals with Varargs and Keyword Parameters` (check): the expansion rule that a dispatch method follows.
  - SRC `interpreter/evaluator/values/NonPrimitive.java#private Environment buildEnvFromParams` (check): walk's way, the precedent.
  - `code:Library/FortressLibrary.fsi#__immutableFactory1[\T, nat b0, nat s0\]()`: the library's factory that walk calls.
  - SRC `compiler/NamingCzar.java#private static String makeUnboxedTupleDescriptor` (check): one of the four refusals.
  - SRC `compiler/OverloadSet.java#public static String getSignature(IntersectionType t, int paramCount, TypeAnalyzer ta)`: a dispatch method's signature by arity.
  - PRB `11. Varargs` (check): the stand-in, the test and the measure.
  - REH `W8. `: `println`'s path through the stream's varargs methods.
  - REC `S. The library selector`: the selector under which the test compiles.
  - REC `Forks the batch takes` (check): the defaults you build.

### R
- **slug:** `rung-api-method-index`
- **worktree:** `/home/user/fortress-api-method-index`
- **section:** `R. A method of an imported api's trait found by its api on the compiled path: an object's overload beside an inherited method, a call at an assumed trait, and a program's compile against the one library (rows 942, 940 and 1061)`
- **blurb:** the code generator gathers a trait's methods with entries that name the trait without its api, and then looks the trait up by its bare name: 'Not in the trait table'. It stops on an object's overload beside a method inherited from an imported api's trait (row 942), at a call on an assumed api trait that declares the method twice (row 940), and, with the compile command switched onto the one library, at a program that names Array1 (row 1061). For the prelude's own types the team's search by the prelude's api names hides it. The rung repairs the root.
- **points to report:**
  - The root as found: where an entry loses its api, by file and member, and what now carries it.
  - Rows 942 and 940: each expected-failure test promoted; row 1061's test under the selector; each failing on the base and passing after.
  - The trait table's search by the prelude's names: whether any test still reaches it after your repair.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`, if you edited it.
  - The two stages' tables on your final tree against the comparand, and the checker's timing if you edited the checker.
  - A file edited beyond those named.
- **briefing** (13 keys, 8 checks):
  - P-148: the checker's timing, if your edit is in its code.
  - ledger:942 (check): the overload beside an inherited method, which closes.
  - ledger:940 (check): the call at an assumed api trait, which closes.
  - ledger:733: an older row of the same family.
  - REH `W3. 'Not in the trait table' (row 942), and the team's search hack` (check): the wall under the switch.
  - PRB `6. The selector` (check): row 1061 and its stack.
  - SRC `scala_src/typechecker/TraitTable.scala#A terrible search hack` (check): the team's search.
  - SRC `scala_src/useful/STypesUtil.scala#def allMethodsNotIdenticallyCovered` (check): the gathering of a trait's methods.
  - SRC `compiler/codegen/CodeGen.java#methodsNamed(TraitType t, IdOrOp name, int selfIndex) {`: the code generator's use of it.
  - SPEC `basic/traits.tex#Method Declarations` (check): what a trait's declaration does to an inherited one.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks an object.
  - REC `S. The library selector`: what run 1 landed, under which row 1061's test runs.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** first checks a program's types with the **checker**, then writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses today. The **one library** is the interpreter's library. The **switch-over** is the move of the compiled path onto the one library, after which the prelude is deleted.
- Your decision P-33 says how the switch-over's work goes: first microGPT's **slice**, the parts of the one library that microGPT needs. The **selector** lets one compile command read the one library beside the prelude. Each problem that only the one library shows is then fixed as its own small change, with its own test, under the full check.
- A **wall** is a place where the compiler or the compiled library stops.
- A **rung** is one change. One worker builds it, and a second, the skeptic, checks it. A **run** is one launch of the batch workflow. The **gate** is the full check before a run lands.
- A **value object** is an object without identity: two with equal contents are the same value. No type can extend an object.
- A **payload class** is a small class written by hand in Java that holds a bare JVM `int`, `long` or `double`. Under the chosen form, the code generator writes the class of `ZZ32` itself, on top of the payload class `FZZ32`.
- The **ledger** is the list of known defects. A **row** is one defect. An **expected-failure test** is a test that is known to fail and is marked so.
- **microGPT** is the model program. No rung changes a line of it.

### The go

None yet. You asked on 13 November for this batch to be planned, and said that its start is not authorized. The coordinator launches nothing until you say so. Each fork below has a default. None needs your answer before the start: none bends a decision of yours, and none touches microGPT.

### The two runs

- **Run 1, climb batch 33, six rungs:** S, D, V, Q, I and C.
- **Run 2, climb batch 33b, four rungs:** N, W, G and R, on run 1's landed tree.
- **Why two runs.** N, W, G and R need S on `main` first. N's table of names follows S's selector, and the tests of W, G and R compile programs under it. A rung cannot build on another rung of its own run.
- **Why I is in run 1.** Rung N of run 2 edits the same method of the code generator. In run 1 no rung edits it.

### Run 1, rung by rung

Each program is shortened to the lines that matter.

**S. The selector.**

- What it changes: the commands. `FORTRESS_LIBRARY=one` makes the compile command read the one library, with a caches folder of its own. A new group of tests runs that way inside the full check.
- The program that fails today:

      q: QQ = 1/2
      println(q)

- Today: `fortress compile` stops: 'QQ is undefined.' The prelude has no `QQ`, and the compiled path reads only the prelude.
- After, with `FORTRESS_LIBRARY=one`: it compiles. A program of one `println` compiles too. Running either still fails: the one library is not yet compiled to bytecode. That is a later batch's work (section 2, "What the batch leaves out").
- A program that names `Array1` still stops, at row 1061. Rung R of run 2 repairs it.

**D. A `typecase` arm at a name that means nothing.**

- What it changes: the phase that binds names, which both paths run.
- The program that runs wrongly today:

      v: Any = 2.5
      typecase v of Int => println("an Int") else => println("other") end

- Today: it prints `an Int`, on both paths, with no message. `Int` names no type since your merge (P-178).
- After: it is refused: 'Int is undefined.'

**V. Two generic forms that the code generator refuses.**

- What it changes: the code generator.
- The program that fails today:

      trait AnyC comprises { C[\E\] } where [\E\] cat(self, f: AnyC): AnyC end
      trait C[\E\] extends AnyC cat(self, f: AnyC): AnyC = self end
      object Ci[\E\](item: E) extends C[\E\] end

- Today: the compile stops: 'E is not in the kind env'. A second form stops the same way: a `typecase` inside a generic function, where an arm binds a value at a type that names the function's type parameters and then uses that value. Four declarations of the one library, among them `List`'s, stop at this wall.
- After: both compile and run as under walk.

**Q. `self` returned from an arm, a closure or a default body.**

- What it changes: the code generator, and the class loader for the third form.
- The program that fails today:

      trait Tord[\T extends Tord[\T\]\]
          lt(self, other: T): Boolean
          mx(self, other: T): T = if lt(other, self) then self else other end

- Today: it compiles. When an object of that trait runs it: 'VerifyError: Bad return type'. The one library's `MIN` and `MAX` have this form, so the first compiled program on the one library meets it. That is review-queue item 572. The coordinator took it into this batch without asking you. You can still undo that before the launch.
- After: it runs. A function expression that returns `self`, and a default body that calls a method on another value of the same type, also run.

**C. Four of the checker's small gaps.**

- What it changes: the checker.
- One program that fails today:

      x = do k: ZZ32 = 3
          4 end
      y: ZZ32 = x

- Today: it compiles, and the run dies: 'NoClassDefFoundError: fortress/CompilerBuiltin$v'. Three more gaps go with it: `x[5]^2` stops the compile; `tally: ZZ32 := 0` does not match the interface file's `var tally: ZZ32`; and in `(total: ZZ64, part) = pair()` the type of `total` goes unchecked.
- After: each compiles and runs as under walk.

**I. A method call on a value of two types at once.**

- What it changes: the code generator.
- The program that fails today, where `choose` has one declaration for each of two traits and the checker types `choose(m)` as both results at once:

      choose(s: S): LeftResult = LeftResult
      choose(t: T): RightResult = RightResult
      println(choose(m).left())

- Today: the compile crashes: 'ClassCastException: IntersectionType cannot be cast to NamedType' (row 540). The one library's `__filter` stops at this wall.
- After: it compiles and runs as under walk. The checker's typing does not change.

### Run 2, rung by rung

**N. The prelude's seven number types become value objects.**

- What it changes: the prelude, the code generator and seven run-time classes. `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` become value objects in the prelude, as they already are in the one library. The code generator writes each type's class on top of a small hand-written class that holds the bare value. That is the form that the review of the carriers recommended, form 2, and the detail of your decision P-178.
- The program that fails today:

      object MyNum extends ZZ32 end
      println(MyNum + 1)

- Today: it compiles. When it runs: 'IncompatibleClassChangeError: ... FZZ32, because it is not an interface' (row 866).
- After: it is refused when it compiles: 'Invalid type in extends clause: ZZ32'. That is the answer of your decision.
- What else a program sees: `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a program's own trait `List` is refused today, and compiles after (row 698).
- The probe: I built this form in a scratch tree. The seven types compiled. Programs with each type ran. Both compiled test tracks passed, 1,694 and 263 tests, except four tests whose answer the change itself gives. On the one library, the same form adds no refused declaration.
- One build serves both libraries for these seven types. So the numbers need no second set of run-time classes (review-queue item 521, below).
- The one library's seven take this form later, in the rung where the first program runs on the one library, so that their test can fail first. This rung's code generator already serves them.

**W. Two hidden functions, one class name.**

- What it changes: the code generator's names for function classes.
- The program that fails today, with the selector:

      same(xs: List[\ZZ32\], ys: List[\ZZ32\]): Boolean =
          (|xs| = |ys|) AND: (BIG AND [(a, b) <- xs.zip[\ZZ32\](ys)] a = b)

- Today: the compile stops: 'ZipException: duplicate entry: ...$\=fn@5\!23-66.class' (row 315). The compiler makes two hidden functions from that line, one for `AND:` and one for `BIG AND`, at the same place in the source, and names both after that place.
- After: it compiles. The one library's `=` on lists has this form, and the compiled `=` on two integers needs its class.
- Its run waits until the one library compiles whole.

**G. Functions with a variable number of arguments.**

- What it changes: the code generator.
- The program that fails today, with the selector:

      count(xs: ZZ32...): ZZ32 = |xs|
      println(count(4, 5, 6))

- Today: the compile stops: 'Can't compile VarArgs yet' (row 624).
- After: it compiles. The extra arguments become one array that cannot be changed, as under walk. The specification and its revision say so already, so there is nothing to decide.
- The one library's `assert`, `deny`, list constructor, `print` and `println` take arguments this way, and `println` stands on the path of every program.
- Its run waits until the one library compiles whole, so the rung is checked by the compile and by a reading of the bytecode.
- Against the prelude it stays refused, since the prelude has no array type (your P-37).

**R. A method found by its interface on the compiled path.**

- What it changes: the code that gathers a trait's methods.
- The program that fails today, with `B` a trait of another component that has `tag(self, s: String)`:

      object O extends B
          tag(self, n: ZZ32): String = "num"
      end

- Today: the compile stops: 'Not in the trait table: B'. With the selector, `a = array1[\ZZ32, 8\]()` stops the same way (row 1061).
- After: both compile. Under the selector, a program with an array compiles against the one library.

### Item 521, answered by the probe

Probe Y asked whether the second set of run-time value classes is a map of names over the first set, or files of its own.

- For the seven number types: neither, by the probe's reading. Their hand-written classes extend no class that the code generator writes, so one set can serve both. They still name the prelude's string type in one method, `asString`. The string's own rung must free that. No program has run to show it.
- For `Boolean`, `Char`, the flat string and the Java-backed types: files of their own. The two libraries give these types different shapes, an object in one and a trait in the other, so a map of names cannot serve.
- No decision of yours is needed. P-33 already names the second set as the mechanism. That work is for the batch after.

### The merge

- Rung S: one change of the commands, no code-generator file.
- Rungs V, Q and I edit the code generator's main file, `CodeGen.java`, in different methods. D, C and S share no file with them.
- In run 2, N, W and G edit the code generator's table of names, `NamingCzar.java`, and N, G and R edit `CodeGen.java`, each in methods of its own. None needs another rung of run 2.
- No two rungs of one run edit the same method. Rung I of run 1 and rung N of run 2 edit one method, the dotted call's code, and N is read again on I's landed code. The order and the files are in section 4, "The rule the rungs keep".
- Run 1's landed code meets run 2 at three more places. Rung Q changed the two methods that name a hidden function's class, after the name is made: W's place. Rung V changed how the code generator reads a type's inherited methods, at the call where R's rows stop. Rung I added a new user of the code generator's search for a trait's methods, whose entries R repairs. W's and R's sections name these.

### The measures

- **Declarations of the one library that the code generator refuses** (F-34):
  - Before run 1: 17, in 5 kinds, on run 1's base code (`c3b16ef2d1`). The script printed 18: it counted one declaration twice.
  - After run 1, measured on its landed code (`d3747846c1`): 13, in 4 kinds, and 745 emitted against 742. Varargs 9 (row 624); a closure class written twice 2 (row 315); `Stream`'s `WriteStream` 1, whose `print` and `println` take varargs; and a new wall, 1 (row 1076). With V's and I's repairs, `ArrayList`, `APPCOV`, `__filter` and `app` compile. `__bigOperator2` (`Library/FortressLibrary.fss:1656`) gets past both walls and stops at a third: the code generator's call of a generic method casts the receiver's type to a trait type, and here the receiver's type is a type variable ('ClassCastException: VarType to TraitType', at `CodeGen.forMethodInvocation`'s `(TraitType)receiverType`, `:7326`).
  - Run 2: G should take the 10 of varargs, the 9 and `WriteStream`. In the planner's probe, 8 of them then compiled, and 2 stopped at another wall: `Generator2`, and `CatString`, which may be varargs' own operator form. W should take the 2 of row 315. No rung of run 2 takes `__bigOperator2`'s wall: it is in the dotted call's code, which is I's and N's, and N changes there only the receiver of a number object. So 2 or 3 after run 2, `__bigOperator2`, `Generator2` and perhaps `CatString`, if nothing stands behind the walls removed.
  - N and R move none: their walls are not of this kind. The probe measured 17 on run 1's base with N's form in place.
- **Programs that run compiled against the one library:** the rehearsal ran three in a scratch tree (F-352). On `main`: none after run 1, where S's run test is an expected failure (row 1062), and none after run 2. The first one runs after the batch after (below).
- **Programs that compile against the one library under the selector:** after run 1, two, a `println` and a `QQ` binding, S's two compile tests. After run 2: five, an array program, a varargs call and the `AND:` reduction among them.
- **microGPT itself:** it does not compile against the one library after this batch. The reviewer tried the flat program once under the selector. The checker refuses its helper file `FlatArrays` first, with 17 errors of static types, the ones that F-58 counts. That work is a later phase's. This batch moves the library's side only: after run 2 a small program with an array compiles against the one library. No program can run there until the one library compiles whole, which is the batch after's work.
- The checker's two measures stay 0 and 0.

### What the batch leaves out

- **The rest of the carriers** (row 874): `Boolean`, `Char`, the flat string, the reader, the writer and the two array stores, on the one library. Rung N's machinery serves them, but each needs a second hand-written class for the one library. That is the batch after's first rung.
- **The refused declarations that remain after run 2,** 2 or 3 by the measure after run 1 and the planner's probe: `__bigOperator2`, at a generic method called on a receiver typed by a type variable (row 1076; "The measures", above); `Generator2`, which stops at a third wall behind varargs ('Error trying to close method scope', not traced); and perhaps `CatString`. Each declaration counts at its first wall, so others may show once these go. The one library cannot be compiled to bytecode until none is left.
- **The checker's other gaps** (rows 1007, 1009, 1010, 1012 and 1015): none has a test yet, and two of them touch a decision of yours (P-51).
- **The stable order of the code generator's output** (row 996; item 522). The selector's tests do not need it. Its rung goes with the next rung that edits the order of the dispatch methods.
- **Rows 818, 1054, 1055, 1056 and 1035,** in code that rung T of the last batch left.

### What still stands before the first program runs on the one library

After both runs, these stand between `main` and `Hello` compiled and run against the one library:

- **The carriers** (row 874): `Boolean`, `Char`, `FlatString`, the reader, the writer and the two stores, by rung N's machinery, with their hand-written classes as the second set under the selector; the one library's seven number objects in the same form (fork N4); the converters for a helper's `String` and `Object`.
- **The names of the prelude in the run time:** the helpers' 105 exception names, which name the prelude's classes (probe Y, section 3, item 4), and the string type that `FValue.asString()` returns (the check of this record, A3).
- **`NN32`'s two getters** (row 993), which stop `FortressBuiltin`'s compile.
- **The refused declarations that remain** (above): `__bigOperator2` (row 1076), `Generator2` and perhaps `CatString`, and whatever stands behind them.
- **The library order of fourteen compiles** in the selector's track, about 200 s a gate.

Then `Hello` runs. S's expected failure `XXXOneLibraryRunHalf` (row 1062) is the test of the first program that runs there. At the run, the rehearsal met more: the dispatch's package (row 994, at `seq`), the rest of row 995, and the JVM's verifier, which every rehearsal run had off.

### For the batch after, in this order

1. The carriers, the run time's prelude names and `NN32`'s getters, above, with the first program that runs on the one library as their test.
2. `Generator2`'s third wall and `__bigOperator2`'s (row 1076), and what else the measure shows then. Then the one library compiles whole, and `Hello` runs against it under the gate. Its library order of fourteen compiles joins the selector's track.
3. Varargs' and row 315's run tests promoted, with the first program that runs.
4. The walls that only a running program shows: row 994 (the dispatch's package, met at `seq`), `NN32`'s two getters (row 993), what is left of row 995, and the count of what the JVM's verifier refuses in the emitted library. The rehearsal's `Arr` and `Dot` become tests.
5. Row 996, the stable order, with the next rung on the dispatch's order; rows 818, 1054 to 1056 and 1035; the checker's other gaps.
6. Then the matrix and the library's `DOT`, whose walls the last batch removed, as tests; then microGPT's own needs under the checker (F-58).

One choice for the batch after is worth your eye now. The rehearsal and probe Y ran programs early by letting the compiler skip each declaration that it refuses. My default is not to do that on `main`: the one library is compiled only when it compiles whole (item 2). The other way runs `Hello` sooner, but puts a skipping mode into the compiler.

### Cost and time

The agents run on the regular tiers (`tier-mode.sh status` prints `regular`).

- **Run 1: about 4.6 million tokens written, 5.4 million with the reserve. The range is 4.0 to 6.4 million. About 4 hours and a half, and 5 hours and a quarter with the reserve.** Six workers write about 2.3 million, six skeptics about 1.4 million, and the fixed roles about 0.9 million. The reserve is 0.8 million and 45 minutes: one ruling on the review with its repair, and one on the gate with its repair and a second gate.
- **Run 2: about 4.6 million, 5.7 million with the reserve. The range is 3.9 to 6.7 million. About 4 hours and a quarter, 5 hours with the reserve.** Each role is priced from run 1, the last run on the same tier, Opus (the post-batch review's process finding 1). N writes about 1.0 million with its skeptic, G about 0.95 million, R about 0.7 million, W about 0.7 million, and the fixed roles about 1.3 million. The reserve is about 1.0 million and 45 minutes: one ruling on the review with its repair, and one on the gate with its repair and a second gate.
- The evidence for run 1's estimate: climb batch 31's run 1 wrote 5.08 million with six rungs in 4 hours 23 minutes, and its run 2 3.93 million with three rungs in 3 hours 24 minutes. Its fixed roles wrote 0.90 million in run 1 and 1.25 million in run 2. A rung with its skeptic wrote 0.53 million on average in run 1 and 0.89 million in run 2.
- The evidence for run 2's, run 1 on Opus (`reviews/batch-33-review.md`, section 5): 5.57 million with six rungs in 4 hours 54 minutes, 21 % over its estimate, which took the skeptics' and the fixed roles' figures from a run on Fable.
  - A worker wrote 330 to 432 thousand, a skeptic 303 to 386 thousand, and a rung with its skeptic 0.67 to 0.76 million. W, at 150 minutes, is priced as D and I were, 0.71 and 0.67 million. R, at 200 minutes, as S, V and Q, 0.76, 0.69 and 0.69 million.
  - N and G, at 300 and 280 minutes, are larger than any rung of run 1 (150 to 220). Each worker is priced at C's 432 thousand for 220 minutes, scaled by its minutes: N 0.59 million, G 0.55 million. Each skeptic at run 1's largest, 0.39 million.
  - The fixed roles: the gather 0.51 million, the merged-diff review 0.46, the gate 0.14, the commit stage 0.13 and the disk check 0.07.
  - The reserve: no run on Opus has had a ruling. The one run with two, climb batch 31's run 1 on Fable, wrote 0.66 million for its two judges and two repairs, and 0.11 million for its second gate (`reviews/batch-31-review.md`, section 5). Between that run and run 1, Opus wrote 1.3 to 1.45 times Fable's figure in each role, so the two rulings with their repairs are priced at about 0.9 million, and the second gate at run 1's gate, 0.14 million. The roles sum to 4.61 million, and 5.67 million with the reserve.
  - The minutes: run 1's workers took 46 to 64 minutes each and its skeptics 17 to 26, two at a time; the gather 46, the review beside the gate 25, the commit stage 4. With N and G longer, run 2's four rungs take about 3 hours, and the rest about 1 hour and a quarter.
- **The disk.** The script stops a run under 1.5 G for each rung plus 4 G. Run 1 needs 13 G. Run 2 needs 10 G. Free on 17 November, after the planner's scratch trees went: about 15 G.

### Your review list from this record

- The 28 forks of section 3. Each takes its default. None is consequential by the rule.
- Item 521, answered by the probe (above).
- The choice for the batch after: no skipping mode in the compiler (above).
- Row 1061, filed by the planner.
- The words of P-33, "one build serving both by a second set of the run time's value classes". After run 2 the seven number types use no second set. The entry's words are brought in line after the landing, and you see the old and the new words.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

None. The way of the prelude's half (fork H2 of climb batch 31) is settled by P-178's detail, the carriers' review's way D, whose code generator is way C's (P-178's history, block of 2026-11-17 15:26Z). Inside way C, the review leaves the form of the class; it recommends form 2, and the planner's probe shows that form holding for the prelude and adding no refusal on the one library (PRB, sections 3 and 5). So form 2 is not a fork. Review-queue item 521 reaches the curator only on a real fork; the probe shows none (PRB, section 7).

### Forks the batch takes

Each fork below builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is S, D, V, Q, I and C; run 2 is N, W, G and R on run 1's landed tree. **Default: so.** Way not taken: one run of ten, in which N's names would not follow the selector, and the tests of W, G and R would have no selector to compile under. The reason: `references/batch.md`, "The go".
2. **B2. What the batch takes from the list for the batch after.** Of `CLIMB-BATCH-31.md`'s list: the prelude's half (N), row 959 (D), rows 812 and 822 (V), four of the checker's smaller gaps, those with a test (C), row 540 (I, in run 1, before N edits its method), and varargs and row 315 (G and W, in run 2, whose tests compile under S's selector; PRB, section 11). **Default: so.** The rest wait, each with its home in section 2. The reason: each taken piece is defined by its test and its rows; the ones left need a test first (rows 1007, 1009, 1010, 1012, 1015) or sit in members that N edits (rows 818, 1054 to 1056).
3. **B3. The first rung of the batch is item 572 (Q), as the coordinator took it** (review-queue item 572, 1a). **Default: so; Q is in run 1.**
4. **S1. The selector is `FORTRESS_LIBRARY=one` in the environment or `-Dfortress.library=one`, read once for the JVM, as probe Y built it.** The compile, the run and the harness's run step follow it, since the run step is a process that inherits the environment. **Default: so.** Way not taken: an option of each command, which every script passes on. The reason: the harness's tracks are started with their environment.
5. **S2. The caches folder follows the selection: `default_repository/caches-one` unless a caches folder is named; the build's stamp and `ant cleanCache` cover both folders.** **Default: so.** Probe Y named the folder by hand; its section 3, hack 2, gives this form.
6. **S3. A mark in a program's jar that stops a run against the other library is not built.** **Default: so; a run with a wrong pairing fails at load, as today, and the rung reports its message.** Way not taken: a mark that the run reads. It waits for the first program that runs on the one library.
7. **S4. The selector's track is a new test folder run by a new ant target inside `testFast`, so the gate runs it.** Its first tests compile; its run test is an expected failure. **Default: so.** Way not taken: a track outside the gate.
8. **S5. No second set of run-time classes in rung S.** The numbers need none under N's form, and the other carried types come with their own rung. **Default: so.** Way not taken: probe Y's map of names, which cannot serve the one library's objects (PRB, section 7).
9. **S6. The order of the code generator's output is not made stable for the selector.** **Default: so.** Its tests compare no bytes (PRB, section 8; review-queue item 522).
10. **D1. A `typecase` arm whose name binds no type variable in scope and no declared type is refused when names are bound, on both paths, with the message that a type name elsewhere gets: 'X is undefined.'** **Default: so.** Way not taken: a refusal in the checker only, which leaves walk's answer wrong.
11. **V1. Where the code generator normalizes a type, the static parameters in scope there, a generic function's and a `where` clause's, are in its kind environment.** **Default: so.** The reason: the checker passes both forms with those parameters in scope.
12. **Q1. Each arm of a conditional, and the result of a function expression or a local function, is cast to the declared type where its static type is not already a subtype of it, as rung K casts a method's returned value.** **Default: so.** Way not taken: a cast after the conditional joins, which needs the join's type at the JVM.
13. **Q2. Row 1052 is repaired where the loader loads the static argument's class to choose a call's opcode: the choice is made without loading a class that is being expanded.** **Default: so; the worker finds the place first and reports what is loaded in its place.**
14. **C1. Each of the four rows is repaired where its test shows the cause, and the rows with no test (1007, 1009, 1010, 1012, 1015) are not touched.** **Default: so.**
15. **N1. Every descriptor names a payload object's type by its payload class, as the table of carried types does today; a dotted call casts the receiver to the object's class.** **Default: so, as probed.** Way not taken: descriptors that name the object's class, with every helper wrapper and every run-time class cast. The reason: the wrappers, the class loader's names and the bytecode optimizer key on the payload class today.
16. **N2. The payload class's `make` reaches the object's class through a method handle, found by the class's name in a small table that follows the selector.** **Default: so, as probed.** Way not taken: a factory that the object's class registers when it loads, which a value made before that load would miss.
17. **N3. A payload object's RTTI, and every place that names its type, gives the payload class's name.** **Default: so.** The reason: the carriers' review's rule for W12, "the stamped class is named by the carrier"; the probe met three such places (PRB, section 4).
18. **N4. The one library's seven number objects get the same form under the selector in the rung where the first program runs on the one library, with that program as their test, not in this rung.** **Default, the coordinator's: so, by the rule of the test first (P-102): no program runs on the one library yet, and the names table is read only when a value is made at a run, so their entries would land with no test that can fail (the check before the launch, `climb-batch-33-review.md`, B1).** Way not taken: the same rung, checked by the measure alone, which loads no class.
19. **N5. Row 566's test is promoted only if it passes under both hash modes.** It passed in the probe, where nothing touched its dispatch. **Default: so; else it stays an expected failure and its row gets a note.**
20. **N6. The team's test `Compiled6.bx` takes its second message, 'Objects can only extend traits.'** Its program's object below `ZZ32` is now refused, which is P-178's answer. **Default: so; a reserved point.**
21. **R1. The root is repaired, and the team's search of the trait table by the prelude's names stays.** It goes with the prelude. **Default: so; the worker reports whether any test still reaches it.**
22. **I1. The method's owner is found among the intersection's conjuncts: the conjunct that declares or inherits the called method, the most specific where several do, and the receiver is cast to it.** The checker's typing stays (P-60). **Default: so.** Way not taken: the checker types such a result by one candidate, which narrows what P-60 reads.
23. **W1. A second function expression at a span that already names a class in its component takes that name with an ordinal suffix, in the order in which the code generator meets them; the first keeps today's name.** **Default: so.** Way not taken: a name from a counter for every function expression, which renames every closure class. The reason: no other class's name changes, and the name follows the tree's order, not a hash order (row 996).
24. **G1. A declaration's varargs part is one JVM parameter of the type `ImmutableArray[\T, ZZ32\]`; its value is an `ImmutableArray1[\T, 0, n\]` that the library's `__immutableFactory1` makes and the caller fills in order, as walk does.** **Default: so.** The reason: the specification's revival callout on the parameter's type, F-86 and walk's `buildEnvFromParams` fix the value; no decision on record names its JVM form, and a varargs part has no fixed width.
25. **G2. The array is made where the varargs declaration is chosen: at the call, for a declaration that is not overloaded; in the dispatch method's branch, for an overloaded name, whose dispatch methods hold the varargs declaration at each arity that a call uses, by the expansion rule.** **Default: so.** Way not taken: one method per arity, which writes the body again for each.
26. **G3. A spread argument at a call, as `f(1, xs...)`, which no line of the libraries writes, is not built.** **Default: so; an expected-failure test and a new row if the parser takes it.**
27. **G4. Against the prelude a varargs declaration stays refused, since the prelude declares no `ImmutableArray` (P-37); row 624's two prelude tests stay expected failures.** **Default: so.**
28. **G5. The rung's run test is an expected failure until the one library compiles whole; the check is the compile under the selector and the skeptic's reading of one call's bytecode.** **Default: so.** Way not taken: varargs held until a program runs on the one library, which varargs itself holds back, since `println` needs it.

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation in run 1's sections, S to C, is of `c3b16ef2d1`, whose code was `main`'s when they were written. Run 2's sections, N to R, and run 2's part of "The rule the rungs keep" were read again on run 1's landed tree before its launch: their line citations are of `d3747846c1`, whose code is `main`'s at that reading. The record's forks are section 3's. The planner's probe programs are in `explorations/compile-ladder/plan-33/probes/programs/`; a test is written new in the test folders, and no file is moved from there.

### S. The library selector: the compile command reads the one library where `FORTRESS_LIBRARY=one` selects it, with a caches folder of its own and a test track under the gate (P-33, F-353)

**The mission.** The compiled path reads only the compiler's prelude: `Shell.useCompilerLibraries()` points `WellKnownNames` and `Types` at the prelude's names for every compiled-path command (`Shell.java:373-379`). The decisions on record take microGPT's slice first: the compile command selects the one library beside the prelude, so that each wall that only the one library shows is met as one rung with its own test under the gate (P-33; F-353). Probe Y built the selector in scratch with eight shortcuts (`probe-y.md`, sections 2 and 3). You build it properly, without the parts that later rungs own.

**The decisions this rung builds.** P-33; P-37, by which the prelude stays the default and gains nothing. Section 3's forks S1 to S6.

**What you build, in order.**
1. **The tests first.** A new folder for the track, `ProjectFortress/one_library_tests/`, and its first tests, from `probes/programs/Half.fss` and a program of one `println`: each `compile`, under the selection. Run under the selection on the base (`tools/old-fortress.sh` with the variable set), each fails: 'QQ is undefined.' for the first, as the base has no selector; write the second so that it fails on the base too, by naming a declaration that only the one library has. Then `XXXOneLibraryRunHalf.test`, the same program with its `run` step, an expected failure: the one library has no jars yet (rows 874, 624 and 315).
2. **The selector.** `WellKnownNames` reads `FORTRESS_LIBRARY` or `fortress.library` once (fork S1). `Shell.useCompilerLibraries()` takes the one library's names and types where it is selected, and the prelude's where not. Nothing else of the code generator follows it in this rung.
3. **The caches folder** (fork S2). `ProjectProperties.CACHES` defaults to `${REPOSITORY}/caches-one` under the selection; `bin/run_classpath` and `bin/fortress_classpath` take the same default; `build.xml`'s stamp and `ant cleanCache` cover both folders.
4. **The track** (fork S4). An ant target that runs the folder's `.test` files under the selection, with private caches as the other tracks have, called by `testFast`.
5. **The whole suites once,** `ant testFast` and `ant testSystem`: your change reaches every compiled-path command.
6. **The stages.** Run the count stage and the distance stage once on your final tree.

**The stages.** Both, once, on your final tree; their tables against the comparand.

**Rows.** None closes. Row 1061 is met by an array program under the selection: do not write that test; rung R of the next run does.

**Specification.** No sentence names a selector. List any that your change makes false, or none.

**Files.** `Shell.java`; `compiler/WellKnownNames.java`; `repository/ProjectProperties.java`; `bin/fortress_classpath`, `bin/run_classpath`; `build.xml`; your tests and the track's folder. Not: `CodeGen.java`, `NamingCzar.java`, `runtimeValues/`, the prelude, the one library, microGPT.

**Reserved points.** A model line: none. A change of what a compiled-path command does without the selection.

**Overlaps by file.** None with the other rungs of run 1.

### D. A `typecase` arm at a name that no declaration defines is refused on both paths (row 959)

**The mission.** The parser reads a `typecase` arm `Id =>` as a type variable (`parser/DelimitedExpr.rats:241-248`), and no phase reports a name that binds nothing, so on both paths such an arm takes every value with no message (row 959). Since the merge (P-178), `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` name no type. You refuse such an arm where a type name elsewhere is refused.

**The decisions this rung builds.** P-167; section 3's fork D1.

**What you build, in order.**
1. **Tests first.** Promote `tests/XXXTypecaseUndefinedArmWalk.fss` to a refusal; write its compiled sibling, `compiler_tests/TypecaseUndefinedArmCompiled.test`, `compile` with `compile_err_contains=is undefined`. Seen failing on the base: the arm runs.
2. **The refusal** in the phase that binds names, which both paths run (fork D1). An arm at a type parameter in scope still binds.
3. **The sites.** Grep the libraries and the tests for arms at the five removed names and at any other undefined name. Each line of a library is a reserved point; each test's line is changed, with its reason.
4. **The whole suites once,** `ant testFast` and `ant testSystem`.
5. **The stages** once on your final tree.

**The stages.** Both, once.

**Rows.** Close 959.

**Specification.** `typecase.tex`'s section names no such refusal. The rule that refuses the program is the general one: "it is a static error for a reference to a name to occur where it is not in scope in the appropriate namespace" (`Specification/basic/declarations.tex:571-572`). List each sentence that your change makes false, or none.

**Files.** `compiler/disambiguator/` (the type disambiguator), and the parser only if the arm must be marked there; your tests. Not: `CodeGen.java`, the checker's Scala, the libraries' text except a reserved line, microGPT.

**Reserved points.** A model line: none. A line of a library.

**Overlaps by file.** None.

### V. The kind environment of a generic declaration's types on the compiled path: a member of a generic trait under a `comprises` clause at a `where`-clause type, and a `typecase` in a generic function (rows 812 and 822)

**The mission.** The code generator stops 'E is not in the kind env' on `compiler_tests/ComprisesWhereFunctionalMethodChecker.fss` compiled (row 812), and '<X> is not in the kind env' on a `typecase` in a generic function where an arm binds a value at a type that names the function's type parameters and reads that value (row 822; the check before the launch, `climb-batch-33-review.md`, A1), as the one library's `app[\T,E extends T,F extends T\]` (`Library/List.fss:93`). Four declarations of the one library stop so (F-34). You give the code generator the static parameters in scope where it normalizes such a type.

**The decisions this rung builds.** P-60; section 3's fork V1.

**What you build, in order.**
1. **Tests first.** `compiler_tests/ComprisesWhereMemberCompiled.test` (`compile`, `link`, `run`), from row 812's program, printing as walk prints; `compiler_tests/TypecaseGenericArmsCompiled.test`, a generic function with `app`'s arms over the program's own generic trait. Seen failing on the base with the two messages. The second form fails only where an arm's body reads the value that the arm binds: on the base, `pick[\T, E extends T, F extends T\](a: Bx[\E\], b: Bx[\F\])` with the arm `(a': Bx[\T\], b': Bx[\T\]) => a'.same(b')` stops, 'E is not in the kind env [][]', at the function's first parameter, and the same function with arms that return a string alone compiles and runs (`climb-batch-33-review.md`, finding 1). So the message can name another parameter than `T`: pin 'is not in the kind env'.
2. **The cause** of each, by file and member: find where the kind environment is made for the type that is normalized.
3. **The repair** (fork V1).
4. **The one library's four sites,** by reading: whether each passes this wall, and what stands behind it (row 812's crash stands behind `ArrayList`).
5. **The whole compiled suite once,** `ant testFast`.
6. **The stages** once on your final tree; the shadow patch once.

**The stages.** Both, once. Run `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` once and report its exit.

**Rows.** Close 812 and 822.

**Specification.** List each sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`, the members that set up or pass the kind environment, `forTypecase` (`:2524`) among them; `scala_src/types/TypeAnalyzer.scala`, the kind environment's lookup only (`:1102`); your tests. Not: `forIf`, `forFnExpr`, `forLetFn`, `castToTypeBelow` (Q's); `STypesUtil.scala`; microGPT.

**Reserved points.** A model line: none. A change to the one library's text.

**Overlaps by file.** Q and I edit `CodeGen.java` too: "The rule the rungs keep".

### Q. `self` at a self type or a listed type on the compiled path: an arm of a conditional, a function expression's or a local function's result, and a default body that calls a method on a value of the self-type parameter (rows 1051, 1050 and 1052; review-queue item 572)

**The mission.** The checker types `self` in a self-typed trait as the trait met with the implementing type (P-146), and in a trait with a `comprises` clause lets it stand for the listed type (P-60). The code generator casts a method's returned `self` (`castToTypeBelow`, `CodeGen.java:7630`; climb batch 31's rung K), but not an arm of a conditional (row 1051) nor a closure's result (row 1050), and each fails the JVM's verification when its class loads. The one library's `StandardTotalOrder` writes `MIN`, `MAX` and `MINMAX` with `self` in one arm (`Library/FortressLibrary.fss:291-294`), and each built-in integer type is a value object directly below it, so the first compiled program against the one library meets it. A default body that calls a method on a value of the self-type parameter dies with `ClassCircularityError` where the object lists the trait first (row 1052; `runtimeSystem/MethodInstantiater.java:269`). You repair the three.

**The decisions this rung builds.** P-146; P-60. Section 3's forks Q1 and Q2.

**What you build, in order.**
1. **The owed test first.** `compiler_tests/XXXSelfTypeArmRun.test` with its link test: a trait `Tord[\T extends Tord[\T\]\]` with `mx(self, other: T): T = if lt(other, self) then self else other end` and an object that extends it. Seen failing on the base: 'VerifyError: Bad return type'. Name it in row 1051 by `ledger.py note`.
2. **The arms** (fork Q1; row 1051). Promote it and `XXXComprisesValueAtConditionalArmRun`.
3. **The closures** (fork Q1; row 1050). Promote `XXXComprisesValueFromClosureRun`, and add the self-type parameter's form.
4. **The circular load** (fork Q2; row 1052). Promote `XXXSelfTypeParameterReceiverRun`.
5. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once and report its exit.

**Rows.** Close 1051, 1050 and 1052.

**Specification.** `traits.tex`'s callouts on these shapes, if any name them: list each sentence that your change makes false.

**Files.** `compiler/codegen/CodeGen.java`: `forFnExpr` (`:3867`), `forLetFn` (`:3941`), `forIf` (`:4485`) and `castToTypeBelow` (`:7630`), a new member directly above `castToTypeBelow`; `runtimeSystem/MethodInstantiater.java`; your tests. Not: `forTypecase` and the kind environment (V's); the prelude; the one library; microGPT.

**Reserved points.** A model line: none. A change of which declaration a call reaches.

**Overlaps by file.** V and I edit `CodeGen.java` too: "The rule the rungs keep".

### I. A method call on a value typed by an intersection on the compiled path: the receiver found among the conjuncts (row 540)

**The mission.** Where the checker types a call's result by the intersection of its candidates' return types, as `choose(m)` by `LeftResult` and `RightResult` (P-60's reading of `comprises`), a method call on that result crashes the compile: `CodeGen.forMethodInvocation` casts the receiver's static type to `NamedType` (`:7323`), after `sanitizePossibleStupidIntersectionType` (`:7420`) leaves the intersection as it is (row 540). The one library's `__filter` (`Library/FortressLibrary.fss:1404`) is the refused declaration of this kind. You find the method's owner among the conjuncts and cast the receiver to it.

**The decisions this rung builds.** P-60, whose typing stays. Section 3's fork I1.

**What you build, in order.**
1. **The test first.** Promote `compiler_tests/XXXCoverageReturnMethodCall` to `compile`, `link`, `run`, with the answer that walk prints; add the forms of the row's notes: `choose(m).right()`, the call on a variable bound to the result, and a getter. Seen failing on the base: 'IntersectionType cannot be cast'.
2. **The owner** (fork I1), and the cast.
3. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once and report its exit.

**Rows.** Close 540.

**Specification.** List each sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: `forMethodInvocation` (`:7186`) and `sanitizePossibleStupidIntersectionType` (`:7420`); your tests. Not: `castToTypeBelow` and the members that Q names; `forTypecase` and the kind environment (V's); the checker; microGPT.

**Reserved points.** A model line: none. A change of which declaration a call reaches.

**Overlaps by file.** V and Q edit `CodeGen.java` too: "The rule the rungs keep". Rung N of run 2 edits `forMethodInvocation` after you, on your landed code.

### C. Four of the checker's smaller gaps: a subscript then a superscript, a top-level variable made mutable by `:=` under an api's `var`, a typed name in a local tuple binding, and a block's numeral at an untyped binding (rows 1005, 1028, 1029 and 1060)

**The mission.** Four gaps of the compiled checker, each held by an expected-failure test: `XXXSubscriptThenSuperscriptCompiled` (row 1005), `XXXTopLevelVarByAssignExport` (row 1028), `XXXLocalTupleBindingMixedTypes` (row 1029) and `XXXNumeralEndsUntypedBlockCompiled` (row 1060). Walk runs each program. You repair the four in the checker.

**The decisions this rung builds.** P-173, for row 1060; P-148, for the timing. Section 3's fork C1.

**What you build, in order.**
1. **Each row in turn,** its test seen failing first through the harness, then its repair, then the test promoted: 1060, 1005, 1029, 1028.
2. **The whole compiled suite once,** `ant testFast`, after the four.
3. **The stages** once on your final tree, and the checker's timing before and after (P-148).

**The stages.** Both, once.

**Rows.** Close 1005, 1028, 1029 and 1060.

**Specification.** List each sentence that your change makes false, or none.

**Files.** `scala_src/typechecker/` and `scala_src/typechecker/ExportChecker.scala`; your tests. Not: `scala_src/types/TypeAnalyzer.scala`'s kind environment (V's); `CodeGen.java`; microGPT.

**Reserved points.** A model line: none. A program that compiled and is now refused.

**Overlaps by file.** None.

### N. The prelude's seven number types as value objects whose classes the code generator writes over hand-written payload classes, serving the prelude and the one library alike (P-178 and P-37; rows 1003, 866, 995 and 698)

**The mission.** The decisions on record make each built-in number type one `value object` on both paths before the switch-over, the prelude by P-37's second exception (P-178). The one library has that form since climb batch 31b. The prelude declares `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` as open traits, each carried by a hand-written class that extends the trait's generated springboard (`runtimeValues/FZZ32.java:14-15`), so a program's object below one compiles and dies (row 866). P-178's detail, the carriers' review's way D, takes way C's machinery; inside it the review recommends form 2: the code generator writes the object's class over a small hand-written payload class that extends nothing generated. The planner built that form in scratch for the prelude and ran both compiled tracks on it, and measured it on the one library (PROBES, sections 2 to 5; its patch, `compile-ladder/plan-33/probes/form2-prelude.patch`). You build it, once, for both libraries. No stopgap that compiles the prelude's number objects as traits: P-37 calls the prelude a bootstrap to remove.

**The decisions this rung builds.** P-178 with its detail; P-37's second exception; P-33's one build. Section 3's forks N1 to N6.

**What you build, in order.**
1. **Tests first.** Promote `compiler_tests/XXXObjectExtendsZZ32Compiled` to a refusal ('Invalid type in extends clause: ZZ32'); promote `XXXOverloadZZ32BesideUserTrait` (row 698) to a run test. A new test, `compiler_tests/NumberObjectsCompiled.test`, from `probes/programs/PZ1.fss` to `PZ3.fss`: each of the seven types in arithmetic, a getter, a `typecase` arm, a generic box and an overloaded call. Each seen failing on the base where it can; the new test passes on the base and is a guard; say so.
2. **The prelude's text.** The seven traits become value objects in `CompilerBuiltin.fsi` and `.fss`, each `excludes` clause gone, no body changed.
3. **The payload classes.** The seven in `runtimeValues/` become abstract payload classes over `FValue`, their `make` reaching the object's class (fork N2), with a names table that follows S's selector, `WellKnownNames.compiledPathUsesOneLibrary` (`compiler/WellKnownNames.java:149-150`), which `ProjectProperties.compiledPathUsesOneLibrary` reads once per JVM (`repository/ProjectProperties.java:290-291`). The stub file's entries for the seven go.
4. **The code generator** (forks N1 and N3): a payload object's class over its payload class, with its constructor and factory, forwarders for every trait, the cast at a dotted call's receiver, and one name for the type in every place: its RTTI, a dispatch test's RTTI, a generic instance's name. Read every site that names an object's class, not only the three that the probe met.
5. **The one library** (fork N4): not in this rung. Name in your report each place where the entries for `FortressLibrary`'s five and `FortressBuiltin`'s two would go, for the rung where the first program runs on the one library.
6. **The team's test and row 566** (forks N5 and N6): `Compiled6.bx` takes its second message; `XXXComprisesMeetGenericTrait` runs under the default hash mode and under `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` in `JAVA_FLAGS`, on your tree and once on the base's code under the same two modes (`tools/old-fortress.sh`). Two orders that pass do not show the cause. Row 566's message names an instance stamped `fortress|CompilerBuiltin%ZZ32`, the two names of fork N3, so read which name the failing cast holds on the base and on your tree, and say in the row whether the one name repairs it.
7. **The whole suites once,** `ant testFast` and `ant testSystem`.
8. **The stages** once on your final tree; the shadow patch once.

**The stages.** Both, once.

**Rows.** Close 1003, 866 and 698; 566 if fork N5 promotes its test; a note on 995: closed for the seven numbers, open for the other carried types.

**Specification.** Grep Appendix I's Effects and the callouts for the prelude's number traits and for row 866; list each sentence that your change makes false, before and after.

**Files.** `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` and `.fss`, the seven declarations; `compiler/runtimeValues/F{ZZ32,ZZ64,ZZ,NN32,NN64,RR32,RR64}.java` and a new names class there; `src/fortress/CompilerBuiltin.java`, the seven's stub entries; `compiler/NamingCzar.java`; `compiler/OverloadSet.java`, the dispatch test's RTTI; `compiler/codegen/CodeGen.java`: a field and a helper beside `springBoardClass` (`:233`) with its copy in the private constructor (`:367`), as the probe's patch has them, `methodCall` (`:613`, its choice of the opcode at `:626`), `dumpMethodChaining` (`:1025`), `forObjectDeclPrePass` (`:4871`), the RTTI's class in `RttiClassAndInterface` (`:5993`) and its helpers, the dotted call's receiver in `forMethodInvocation` (`:7235`); your tests. Not: the one library's text; walk; the checker's Scala; microGPT.

**Reserved points.** A model line: none. A team test changed. A program that ran and is now refused, beyond row 866's form.

**Overlaps by file.** W and G edit `NamingCzar.java`, G and R `CodeGen.java`: "The rule the rungs keep". Rung I of run 1 changed `forMethodInvocation`: a receiver type that is an intersection is replaced by the conjunct that owns the method (`:7264-7270`, by `intersectionMethodOwner`, `:7523`), and the receiver, once on the stack, is cast to it (`castReceiver`, `:7346` and `:7372`; `:7581-7584`) by `NamingCzar.jvmTypeDesc(owner, thisApi(), false)`, which under fork N1 names a payload object's type by its payload class. Your cast to a payload object's class applies to the receiver's type after that choice and comes after I's cast; read both before you write your own, and fold them into one cast where they meet. The probe's patch is of the base: on the landed tree each of its hunks applies but the one at that receiver ('patch failed: ...CodeGen.java:7312', `git apply --check`), where I's `castReceiver` now follows `obj.accept(this)` (`:7371-7372`).

### W. One class name for each function expression on the compiled path, where two share a source span: the right operand of `AND:` that is a reduction (row 315)

**The mission.** The code generator names a function expression's class by its component and source span alone (`NamingCzar.gensymArrowClassName`, `:892`, called from `CodeGen.forFnExpr`, `:3933`, and from `localFunctionClosure`, `:4095`, which `forLetFn` calls for each local function, `:4025`), so two function expressions at one span get one name, and the jar takes the first and the compile dies: 'ZipException: duplicate entry' (row 315). The one library's `=` on lists and on its ordered sequences meets it at `(|self| = |other|) AND: (BIG AND [(a,b) <- self.zip[\E\](other)] a = b)` (`Library/List.fss:127-128`, and `LexicographicOrder`'s `=`), and the compiled `=` on two integers names that class (the rehearsal's W10). The planner's probe under the selector (PROBES, section 11): the thunk that `AND:` makes of its right operand and a closure of the reduction's desugaring share the operand's span; the reduction alone, in parentheses or not, and an operand that is a block, compile. You give each function expression a name of its own.

**The decisions this rung builds.** None names the mechanism. Section 3's fork W1.

**What you build, in order.**
1. **The test first,** in S's track: `probes/programs/LexSame.fss`, `compile` under the selection. Seen failing on run 1's landed tree: 'duplicate entry: LexSame$\=fn@5\!23-66.class'. Its run test, an expected failure until the one library compiles whole.
2. **The two nodes,** by the desugaring that makes each; say which closure of the reduction takes the span.
3. **The naming** (fork W1), the same from compile to compile.
4. **The whole compiled suite once,** `ant testFast`: every closure class is named here.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once if you edited `CodeGen.java`.

**Rows.** Close 315.

**Specification.** None names a class. List any sentence that your change makes false, or none.

**Files.** `compiler/NamingCzar.java`, `gensymArrowClassName` (`:888-900`); `CodeGen.java`'s two calls of it (`:3933`, `:4095`) only if the name needs the node; your tests. Not: N's table of payload objects and G's tuple descriptors in `NamingCzar.java`; microGPT.

**Reserved points.** A model line: none. A class name that a test or a tool reads.

**Overlaps by file.** N and G edit `NamingCzar.java`: "The rule the rungs keep". Rung Q of run 1 edited both members that call it: each now casts the body's result at the declared return type (`:3968`, `:4127`), after the class name is made.

### G. A varargs parameter on the compiled path: the arguments that no plain parameter takes passed as one immutable array, at a call and in a dispatch method, under the selector (row 624)

**The mission.** The code generator refuses every function and method with a varargs parameter and every call of one, 'Can't compile VarArgs yet' (row 624): `NamingCzar` throws it for a tuple type with a varargs part (`:1307`, `:1317`, `:1457`, `:1568`), `jvmSignatureFor` unwraps each parameter's declared type (`:964`, `:970`), and `forLetFn` refuses a local function's (`CodeGen.java:3999-4000`). The value is settled: the specification binds the parameter to the arguments that no plain binding takes, in order ("Function Applications"); its revival callout gives the type, `ImmutableArray[\T, ZZ32\]`, an immutable one-dimensional array, on both paths ("Function Declarations"); the checker types the parameter so and applies a varargs declaration by the expansion rule (F-86); walk makes it with the library's `__immutableFactory1` and fills it in order (`NonPrimitive.buildEnvFromParams`). The one library declares `assert`, `deny`, `<|...|>` and `WriteStream`'s `print` and `println` so, and `println` is on every program's path (the rehearsal's W8). The prelude declares no array type, so there it stays refused. The planner's stand-in (PROBES, section 11) shows the test failing first under the selector, and the measure's ten of varargs gone at their first wall. Its patch (`probes/varargs-standin.patch`) is of the base: on the landed tree each of its hunks applies but the two of probe Y's selector, in `Shell.java` and `WellKnownNames.java`, whose lines rung S replaced.

**The decisions this rung builds.** P-37, by which the prelude gains no array type; F-86. Section 3's forks G1 to G5.

**What you build, in order.**
1. **The test first,** in S's track: `probes/programs/VarargsCount.fss`, `compile` under the selection; then a call of each arity of an overloaded name with a varargs member, as the library's `assert`, and a varargs method of a trait called on an object. Seen failing on run 1's landed tree: 'Can't compile VarArgs yet'. The run test, an expected failure until the one library compiles whole.
2. **The declaration** (fork G1): its JVM signature and its parameter in the body.
3. **The call** (fork G2): the array made and filled where the declaration is chosen, at a call and in a dispatch method's branch, an operator's application among the calls.
4. **The prelude** (fork G4): its two tests, unchanged or with the message that names the missing array type.
5. **The measure** on a scratch copy of your final tree: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh`; what stops `Generator2` and `CatString`. Its comparand is run 1's landed tree: 13 refused (F-34), of which the ten of varargs are yours, the nine 'Can't compile VarArgs yet' and `WriteStream`; the closure class's two are W's, and `__bigOperator2`'s wall (row 1076) is no rung's of this run.
6. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once and report its exit.

**Rows.** Close 624 under the selector, with a note that it stays against the prelude; a new row for a spread argument if fork G3 meets one.

**Specification.** The revival callout of `functions.tex`, "the code generator does not yet compile a function with a varargs parameter": before and after.

**Files.** `compiler/NamingCzar.java`, the tuple descriptors (`:1304-1330`), the two visitors' tuple cases (`:1457`, `:1568`) and `jvmSignatureFor` over parameters (`:958-990`); `compiler/codegen/FnNameInfo.java`; `compiler/OverloadSet.java`, a dispatch method's signature and branches by arity; `compiler/codegen/CodeGen.java`: `forFnDecl` (`:3356`), `forLetFn`'s refusal (`:3999-4000`, in a member that run 1 did not change: rung Q's member beside it is `localFunctionClosure`, `:4069`, which `forLetFn` calls), `evaluateSubExprsAppropriately` (`:5724`) and `evalArg` (`:7674`); your tests. Not: N's members of `CodeGen.java`, `NamingCzar.java` and `OverloadSet.java` (`emitInstanceOfNG`); `forMethodInvocation` (`:7235`), I's and N's; microGPT.

**Reserved points.** A model line: none. A change of which declaration a call reaches.

**Overlaps by file.** N and W edit `NamingCzar.java`, N and R edit `CodeGen.java`: "The rule the rungs keep".

### R. A method of an imported api's trait found by its api on the compiled path: an object's overload beside an inherited method, a call at an assumed trait, and a program's compile against the one library (rows 942, 940 and 1061)

**The mission.** The code generator gathers a trait's methods with entries that name the trait without its api, then looks the trait up by the bare name and stops: 'Not in the trait table'. Under the prelude it stops on an object's overload beside a method inherited from an imported api's trait (row 942) and at a call on an assumed api trait that declares the method twice (row 940); the team's search by the prelude's api names (`TraitTable.scala:79-84`) hides it for the prelude's own types. Under S's selector, a program that names `Array1` stops so (row 1061; PROBES, section 6). Rung V of run 1 changed the analyzers that reach the call where rows 1061 and 940 stop: `CodeGen`'s constructor now reads a type's inherited methods with an analyzer that holds the type's static parameters and `where` clause, `typeAnalyzer.extendJ(tci_sps, ...)` (`CodeGen.java:499-502`), passed to `STypesUtil.properlyInheritedMethodsNotIdenticallyCovered` and so to `removeIdenticallyCoveredMethods`'s `analyzer.lteq(tt2, tt)` (`STypesUtil.scala:1588`), where rows 812 and 1061 stopped; and it compiles a generic body with a `CodeGen` whose analyzer holds the declaration's own (`:2754`), which `methodsNamed`, where row 940 stops, passes to `STypesUtil.allMethodsNotIdenticallyCovered` as `typeAnalyzer` (`:7081`). You repair the root.

**The decisions this rung builds.** None names the mechanism. Section 3's fork R1.

**What you build, in order.**
1. **Tests first.** Row 1061's test in S's track: `a = array1[\ZZ32, 8\]()`, its write and its read, `compile` under the selection. Seen failing on the base: 'Not in the trait table: Array1'.
2. **The root**: where an entry loses its api, by file and member.
3. **The repair**, then `XXXApiTraitOverloadCompiled` (row 942) and `XXXAsIfApiTraitCompiled` (row 940) promoted.
4. **The search** (fork R1): whether any test still reaches the trait table's search by the prelude's names.
5. **The whole compiled suite once,** `ant testFast`.
6. **The stages** once on your final tree; the shadow patch once if you edited `CodeGen.java`.

**The stages.** Both, once.

**Rows.** Close 942, 940 and 1061.

**Specification.** List each sentence that your change makes false, or none.

**Files.** `scala_src/useful/STypesUtil.scala`, the gathering of methods; `scala_src/types/TypeAnalyzer.scala` and `scala_src/typechecker/TraitTable.scala` if the root is there; `compiler/codegen/CodeGen.java`, `methodsNamed` (`:7077`) only; your tests. Not: the members of `CodeGen.java` and `OverloadSet.java` that N names; microGPT.

**Reserved points.** A model line: none. A change of which declaration a dispatch method reaches.

**Overlaps by file.** N and G edit `CodeGen.java`: "The rule the rungs keep". Rung I of run 1 added a caller of `methodsNamed`: `intersectionMethodOwner` (`:7523-7553`) calls it on each conjunct of an intersection (`:7538`) and matches the trait that declares the method by `sameTraitName` (`:7574-7578`), which takes a name without an api as equal to the same text in any api. A repair that gives the entries their api changes what that comparison sees; read I's landed code before you edit there, and add a compiled test of a method call on a value typed by an intersection one of whose conjuncts is a trait of an imported api, which guards that comparison.

### The rule the rungs keep, and how they meet

- **Run 1.** S, D and C share no file with any other rung. V, Q and I share `compiler/codegen/CodeGen.java`, by declaration:
  - V: `forTypecase` (`:2524`) and the members that set up the kind environment; `TypeAnalyzer.scala`'s lookup (`:1102`).
  - Q: `forFnExpr` (`:3867`), `forLetFn` (`:3941`), `forIf` (`:4485`), `castToTypeBelow` (`:7630`) and a new member directly above it; `MethodInstantiater.java`.
  - I: `forMethodInvocation` (`:7186`) and `sanitizePossibleStupidIntersectionType` (`:7420`).
  - The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order"). The manifest's order V, Q, I is that order as this record expects it.
  - If V's cause lies in a member that Q names, V reports it and builds its repair outside it.
- **Run 2.** By file and member:
  - `NamingCzar.java`: N, its table of payload objects and their lookups, new members beside `bl` (about `:600`); W, `gensymArrowClassName` (`:888-900`); G, the tuple descriptors and `jvmSignatureFor` over parameters (`:958` on).
  - `CodeGen.java`: N, the field beside `springBoardClass` (`:233`), `methodCall`, `dumpMethodChaining`, `forObjectDeclPrePass`, the RTTI's class and `forMethodInvocation`'s receiver; G, `forFnDecl` (`:3356`), `forLetFn`'s refusal (`:3999-4000`), `evaluateSubExprsAppropriately` and `evalArg`; R, `methodsNamed` (`:7077`) only.
  - `OverloadSet.java`: N, `emitInstanceOfNG`; G, a dispatch method's signature and branches by arity.
  - Run 1's landed code in these members or beside them, which each section names: I's choice of the conjunct and its cast in `forMethodInvocation` (`:7264-7270`, `castReceiver` `:7581`), before N's receiver; Q's casts in `forFnExpr` (`:3968`) and `localFunctionClosure` (`:4127`), the two callers of W's `gensymArrowClassName` (`:3933`, `:4095`); V's analyzer in the constructor's read of inherited methods (`:499-502`) and in a generic body's `CodeGen` (`:2754`), at the calls where R's rows stop; and I's `intersectionMethodOwner` (`:7523-7553`) with `sameTraitName` (`:7574-7578`), a caller of R's `methodsNamed` (`:7538`).
  - The order by the lowest edited lines: N, W, G, R. If R's root lies in a member that N or G names, R reports it and builds its repair in the Scala. If G's call needs `forMethodInvocation`, G reports it: that member is I's and N's.
- **The distance stage's shadow patch** edits a copy of `CodeGen.java` by text. A rung that edits `CodeGen.java` runs it once and reports its exit; if it no longer applies, the rung reports the lines, and the gather repairs the tool.
- **They meet on the merged tree:** the suites, the atomic runs, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief of 2026-11-17, piece by piece, with its home here.

- **The selector on `main`** (the brief's group 1): rung S. Item 521: answered by the probe, no fork (section 2; PROBES, section 7).
- **The prelude's half of P-178** (group 2): rung N, by way C's form 2, probed on both libraries; `NN32` and `RR32` of the prelude included.
- **Item 572** (group 3): rung Q, in run 1.
- **The rest** (group 4): of `CLIMB-BATCH-31.md`'s list, D (row 959), V (rows 812, 822), C (four of the checker's gaps), and, at the coordinator's request after the curator's question, I (row 540), G (varargs, row 624) and W (row 315) (PROBES, section 11); of the walls that only a switched tree shows, R takes row 942's root with row 1061, N row 995 for the numbers and row 866; rows 874, 993 and 994 wait for the batch after, in section 2's order. Item 513 leaves to a rung: the class of `FlatString` while it stays an object, and of `Boolean`, `Char`, the Java-backed traits and the stores, by N's machinery with their own hand-written classes for the one library; F-322's two readings of a helper's `String` parameter; ropes and a program's own `String` compiled, which wait on other rows. PLAN's line that "his decision on the carriers of the other built-in types comes first (review-queue items 513 and 514)" is stale.
- **The stable order** (the brief's question): the selector's tests do not need it; its rung goes with the next rung that edits the dispatch's order (fork S6; PROBES, section 8).

### The planner's probes

`compile-ladder/plan-33/PROBES.md` holds each with its commands and output: form 2 for the prelude (sections 2 to 4), the measure with form 2 on the one library (section 5), the selector, with and without the measure's patch (section 6), item 521 (section 7), the order (section 8), the disk (section 9), the keys (section 10).

**Not run:** a gate stage, walk's suite, a timing, the reproducers of Q, D, V and C (each row's own expected-failure test holds it).

### Rows filed by plan

By this planner on 2026-11-17, with `ledger.py add`: 1061, a program's compile against the one library meets row 940's root. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out" and "For the batch after". Their homes: row 874 and item 513's leftovers, the batch after's first rung; rows 624 and 315, the batch after; row 540, the batch after; rows 993 and 994, the batch after; row 996, item 522; rows 818, 1054 to 1056 and 1035, the batch after; rows 1007, 1009, 1010, 1012 and 1015, the batch after once each has a test.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 31b: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-33/manifest/` is made from `compile-ladder/plan-31/manifest/` before the launch: `lists33.py` holds the briefings of section 1, `gen33.py --run 1|2` writes a run's block from the record, and `check33.js --run 1|2` checks the block in a scratch copy of the script and, with `--write`, splices it.

- run 1: `BATCH` `33`, the folder `compile-ladder/climb-batch-33/`, the rungs S, D, V, Q, I, C in that order; run 2: `BATCH` `33b`, `compile-ladder/climb-batch-33b/`, the rungs N, W, G, R;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- Q, I, W and G `STAGE_BLIND`; S, D, V, C, N and R naming the two stages in a step of their sections;
- S's track named in the gate's comparand (below).

### What every agent reads first

**Run 1.** This run is climb batch 33, the first of the two runs of the record CLIMB-BATCH-33.md, the first rungs of microGPT's slice under the decisions on record: the compile command learns to read the interpreter's library beside the compiler's prelude, and four walls of the compiled path and one of both paths are repaired. Its rungs:

- S, the library selector: the compile command reads the one library where FORTRESS_LIBRARY=one selects it, with a caches folder of its own and a test track under the gate;
- D, a typecase arm at a name that no declaration defines, refused on both paths;
- V, the kind environment of a generic declaration's types on the compiled path;
- Q, self at a self type or a listed type: a conditional's arm, a closure's result, and a default body;
- I, a method call on a value typed by an intersection, the receiver found among the conjuncts;
- C, four of the checker's smaller gaps.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. V, Q and I share CodeGen.java by declaration: each keeps to its own, as its section says. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected S, D, V, Q, I, C, and builds the specification once.

**Run 2.** This run is climb batch 33b, the second of the two runs of the record CLIMB-BATCH-33.md, after climb batch 33, which landed rungs S, D, V, Q, I and C. Its rungs:

- N, the compiler prelude's seven number types as value objects whose classes the code generator writes over hand-written payload classes, serving the prelude and the one library alike;
- W, one class name for each function expression where two share a source span;
- G, a varargs parameter compiled as one immutable array of the arguments, under the selector;
- R, a method of an imported api's trait found by its api on the compiled path, with a program's compile against the one library under the selector.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. N and R run the count stage and the distance stage once; W and G run neither. N, W and G share NamingCzar.java, and N, G and R share CodeGen.java, by declaration: each keeps to its own, as its section says. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies N, W, G, then R, and builds the specification once.

### Before the launch

The coordinator, for run 1, after the curator's go:

1. **The check of this record by a fresh reader on Fable,** its changes in place (`references/batch.md`, "The go").
2. **The generator** for `--run 1`, its checks and the splice, as the manual's "Before the launch", step 4, gives them; the keys into this record and into PROBES checked with `facts-extract.sh --check`. The base is `main`'s head after that commit.
3. **The base build.** `/home/user/fortress-base37` at `c3b16ef2d1` has `main`'s code and serves while `main` moves only under `explorations/`, `docs/` and `.claude/` (`git diff --stat c3b16ef2d1 <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing); its trial seed and the old code's run.
4. **The disk:** 13 G or more free; `git status --porcelain` empty in the main tree. `/home/user/fortress-base36` is an older base build that no run of this record reads.
5. **The launch from a turn that no message of the curator's started,** a check-in's turn.
6. **Check-ins** for about 5 hours and a quarter, 45 minutes apart.

For run 2, after run 1's landing: sections N, W, G and R read again against the landed tree, with S's selector's names and files, I's change of `forMethodInvocation` and its caller of `methodsNamed`, Q's two closure members and V's analyzers as landed; a base build at run 1's landing (`/home/user/fortress-base38`, at `d3747846c1`); the generator's block for `--run 2`, checked and spliced; then steps 4 to 6 with 10 G free and check-ins for about 5 hours.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '<the base build of step 3>'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 31b's, in `compile-ladder/climb-batch-31b/gate/`: 63 suites, 3,515 tests, `CompilerJUTest` 1,694, the system shards 871, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`.

- `testFast`: the compiler track's count plus V's two tests, Q's owed test and its promotions keeping their count, C's promotions keeping theirs, I's promotion and its added forms, D's compiled test; and one new suite, S's track, with its two compile tests and its expected failure. In run 2, S's track gains R's, W's and G's compile tests and W's and G's run tests as expected failures.
- `testSystem`: D's walk test promoted in place.
- The atomic runs: unchanged, 24 programs, each three times `PASS`.
- The ladder: no rung declares a move.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- **The measure,** once after each run's landing, by the coordinator or the post-batch reviewer in a scratch worktree: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Before, on `c3b16ef2d1`: 17 (18 printed) in 5 kinds, 742 emitted. After run 1, on `d3747846c1`: 13 in 4 kinds, 745 emitted (F-34; `compile-ladder/plan-33/probes/measure-d3747846c1.txt`). After run 2: 2 or 3, `__bigOperator2` (row 1076), `Generator2` and perhaps `CatString`, if nothing stands behind the walls removed (G's ten, W's two). If a rung's edit of `NamingCzar.java` stops the measure's patch from applying, its hunk is brought in line by hand.
- For run 2 the comparands are run 1's gate.
  - In `compile-ladder/climb-batch-33/gate/`: 64 suites, 3,565 tests, `CompilerJUTest` 1,736, `OneLibraryJUTest` 3, the system shards 876, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 959 (D); 812, 822 (V); 1051, 1050, 1052 (Q); 540 (I); 1005, 1028, 1029, 1060 (C). Row 1051 gains the owed test's name (Q).
- **Run 2, closed:** 1003, 866, 698, and 566 if fork N5 promotes its test (N); 315 (W); 624 under the selector, with a note that it stays against the prelude (G); 942, 940, 1061 (R). Row 995 gains a note (N).

### After the landing

- **PLAN:** phase 4's F-34 line with the new count and its kinds by row; the merge's line: the prelude's half landed with run 2; the line on the walls that only the switch shows: S's selector landed, item 513's "comes first" taken out, rows 874, 993 and 994 the batch after's; "Next" and the line of climb batch 33.
- **The review queue:** this record's 28 forks as new items; item 521 answered by the probe; item 572 landed; item 522 unchanged.
- **The post-batch review** of each run.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false or name a closed row as open:

- **F-34:** the count and its kinds, if V's and I's repairs reach their five; rows 812, 822 and 540 named as open. **F-281** and **F-181:** row 812.
- **F-361** and **F-379:** row 959.
- **F-225** and **F-377:** rows 1051, 1050 and 1052.
- **F-363, F-369** and **F-380:** rows 1005, 1029 and 1060.
- **F-352** and **F-353:** "on `main` the compile command selects the compiler's prelude alone", and "`main` has no selector".

After run 2:

- **F-352:** row 866 and row 942 named as open, and the carriers' wall as one piece; **F-338:** row 940.
- **F-34** again: rows 624 and 315 named as open, and the count after G and W. **F-86:** "The code generator refuses varargs (row 624)": under the selector it compiles them. **F-352:** rows 624 and 315 named as walls that stand. **F-353:** the second set, which the numbers no longer need.
- **F-379:** the prelude's open traits (row 1003).
- **P-33:** "one build serving both by a second set of the run time's value classes (F-353)": the seven number types use no second set after N; its words are the curator's entry, so the change is told to him with the old and the new words.
- **P-178** and **P-37** stay true. PLAN's and row 1003's "the tree does not do it yet" is done for the prelude.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landings, the record-landing workflow's skill writer brings these in line (run 1's each as on `main` on 2026-11-17; run 2's as on `main` after run 1's skill update, 2026-11-18).

After run 1:

- `SKILL.md`, "How a program runs": "Each path has its own library today. At the switch-over, the compiled path moves onto the interpreter's library": the compile command can now select the one library, and a program compiles there; its run waits for the library's jars.
- `references/compiler.md`, "The compiler's prelude, until the switch-over": "The compiled path uses the compiler's own prelude": unless `FORTRESS_LIBRARY=one` selects the one library (S).
- `references/build-and-caches.md`, "The caches": the second caches folder of the selection, and the stamp over both (S).
- `references/tests-running.md`: the selector's track in `testFast` and its target (S).
- `references/revival-changes.md:41-47`: "Three shapes fail when the class loads ... For the first two shapes, bind `self` to a variable of type `X` first ... For the third shape, declare the method in `T` without a body": the three run (Q).
- `references/revival-changes.md:97`: "As a `typecase` arm, each takes every value, without a message (row 959)": refused (D).
- `references/compiler.md`, the traps: the sentence of row 1060, "Where a variable without a declared type is bound to a block that ends in a numeral ... Declare the variable's type": it runs (C); and each sentence that names rows 1005, 1028 or 1029.

After run 2:

- `SKILL.md`, "The compiled runtime": "A number is a boxed object, also inside a specialised class: `RR64` is the class `FRR64`": `RR64`'s class is the generated object's class, over the payload class `FRR64`, which descriptors name (N).
- `references/compiler.md`, "What the two paths share": "the compiled `compiler/runtimeValues/` (`FZZ32`, `FRR64`)": payload classes now (N).
- `references/compiler.md`, "The compiler's prelude, until the switch-over": "a brief may ask to declare each built-in number type as one `value object`": done (N).
- `references/revival-changes.md:89`: "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)": the seven are value objects in the prelude, and such an object is refused (N).
- No sentence names varargs, row 540 or row 315 as a limit of the compiled path, so I, W and G make none false. `references/compiler.md`, "What the compiled path cannot compile yet", lacks one that stays true after G: against the prelude a varargs declaration is refused, 'Can't compile VarArgs yet', since the prelude has no array type; under the selector it compiles. A sentence to add (G).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-31.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-31.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-33/PROBES.md), [the probe's patch and programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-33/probes), [the rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), [probe Y](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), [the carriers' ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), [the plan review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/plan-review-2026-11-10.md), [climb batch 31b's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-31b-review.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [Shell.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/Shell.java), [WellKnownNames.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java), [ProjectProperties.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [OverloadSet.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java), [FZZ32.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java), [MethodInstantiater.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java), [TraitTable.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala), [STypesUtil.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [TypeDisambiguator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java), [CompilerBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss).
- Specification: [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [typecase.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/typecase.tex), [trait-parameters.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/trait-parameters.tex), [objects.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/objects.tex), [variables.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/variables.tex), [blocks.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/blocks.tex), [juxtameaning.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/operators/juxtameaning.tex).
