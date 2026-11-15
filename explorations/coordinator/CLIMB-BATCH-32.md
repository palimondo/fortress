<!-- The record of climb batch 32, in one run, for the coordinating session, the curator and the batch's workers: the model's notation, that is the gaps of today's tree that keep a line of microGPT's flat program (C4, `explorations/run-c4/src/MicroGptFlat.fss`) or of its helper file (`FlatArrays.fss`) from the form that the specification allows. Drafted 2026-11-15 by a planning worker on Fable against `main` at `3fc1ac6e78`, whose code is the base build's, `/home/user/fortress-base33` at `84f1c37190` (`git diff --stat 84f1c37190 main -- . ':!explorations' ':!docs'` prints nothing). It proposed five rungs in one run: P, S, B, F and C. **Amended 2026-11-15, at the curator's request of that day: the two rungs of climb batch 31 that close a limit of the model program, N (the numeral rule, row 989) and D (the top-level tuple binding, row 988), moved into this record, on the same base, so the batch is one run of seven rungs: P, S, C, F, B, N and D.** **The curator gave the go on 2026-11-15, between 23:10 and 23:19 UTC, for after the check of the joined record (`climb-batch-32-review.md`, "The check of the joined record, 2026-11-15"): "Go for the joined batch after the check is clean." Climb batch 31 is planned, has no go and is not launched. This record launches nothing; the coordinator does.** It has no fork that must be answered before a launch (fork W of climb batch 31's record, walk's half of the numeral rule, stands at (a), walk now, by the coordinator's reading of the curator's words of 2026-11-10, and is named to him: sections 2 and 3), two questions for the curator that no launch waits on (array comprehensions, row 50, and the type on a mutable local, row 177, which the check of 2026-11-15 and the coordinator's ruling took out of rung P; section 2), and sixteen forks with defaults (section 3). No rung changes a line of the model program or of its helper file: the diffs that each rung makes possible are listed for the curator (section 2), and applying them is his word, after the landing (P-87). -->
<!-- Sources: the planner's brief (`<scratchpad>/batch31/planner-32-brief.md`), with the curator's words of 2026-11-15; `reviews/c4-fortress-way-2026-11-15.md`, the review of each limit, whose section 1 is the list of limits; `CLIMB-BATCH-31.md`, for the form and for what the two batches share; POSITIONS P-87, P-78, P-51, P-48, P-55, P-9, P-12, P-26, P-79, P-148, P-173; FACTS F-53, F-59, F-221, F-285; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the specification and the code at the sites. -->
<!-- Rungs N and D: their manifest entries and sections are `CLIMB-BATCH-31.md`'s as the coordinator's rulings left them (`be216fe46f`, `d93634b9f9`), their line citations unchanged, since the base is the same. Their sources are that record's: `reviews/numeral-equality-ways-2026-11-10.md`, `compile-ladder/plan-31/probes/model-closure-check.md`, `reviews/batch-30-review.md`, Part 5, POSITIONS P-46, P-49, P-59, P-174, P-176, P-168, P-165, P-37, and that record's check, `climb-batch-31-review.md`, whose section 5.2 ran their reproducers on the base's code. What changed in their sections here: each one's "Not" list and "Overlaps by file.", and the gate that rung D's stages are compared with. The declarations that two rungs of the run name in one file were read on the base's code for this amendment (section 4, "The rule the rungs keep"). Nothing was built or run for it. -->
<!-- The planner's probes: `compile-ladder/plan-32/PROBES.md`, with their programs in `compile-ladder/plan-32/probes/`, run in a worktree of the planner's own, `/home/user/fortress-plan32`, seeded from the base build and removed after. No suite and no stage of the gate was run. -->

# Climb batch 32

## 1. The manifest, rung by rung

The batch's generator writes the run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. The one run, climb batch 32, holds P, S, C, F, B, N and D in that order. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-32.md#`, REV for `doc:explorations/reviews/c4-fortress-way-2026-11-15.md#`, PRB for `doc:explorations/compile-ladder/plan-32/PROBES.md#`, NEQ for `doc:explorations/reviews/numeral-equality-ways-2026-11-10.md#`, MCC for `doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main` (PROBES, section 5; N's and D's again on 2026-11-15, by `lists32.py`).

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | P | `rung-parser-declarations` | Two forms that the grammar gives and the parser refuses | 200 |
| 1 | S | `rung-superscript-after` | A superscript after a dotted access and after a parenthesised call | 200 |
| 1 | C | `rung-static-argument-inferred` | Two static arguments that the checker leaves open today | 240 |
| 1 | F | `rung-generic-function-value` | A generic function passed as a value under walk | 220 |
| 1 | B | `rung-toplevel-array-literal` | An array literal at the top level under walk | 150 |
| 1 | N | `rung-numeral-most-specific` | A numeral at a call goes to the most specific declaration that takes it | 210 |
| 1 | D | `rung-tuple-binding` | A top-level tuple binding | 170 |

Fields common to the seven rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-parser-declarations`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none, but the specification's build at the gather, for C's and N's text. **expected moves:** none.
- **lands only with:** none. Every rung lands on its own.
- **its test is the stage:** no. **the stages:** P, S, C, N and D run the count stage and the distance stage once on their final trees: P and S because both measures read the library through the parser that they edit; C, N and D because they edit the checker, N the one library too, each of the three with the checker's timing (P-148). F and B edit files under `interpreter/` only, run neither and list their files (`STAGE_BLIND`).
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 30's gate left them (F-53). **expected checker crash:** none.

### P
- **slug:** `rung-parser-declarations`
- **worktree:** `/home/user/fortress-parser-declarations`
- **section:** `P. Two forms that the grammar gives and the parser refuses: a postfix operator declared in an api, and the signs for sum and product as accumulators (rows 133 and 5)`
- **blurb:** two gaps of the parser, each a form that the specification's grammar gives. An api cannot declare a postfix operator whose sign is an exponent operator, as opr (m)^T, because the api's rule lacks one alternative that the component's rule has (row 133). The signs for sum and product, U+2211 and U+220F, are read as prefix operators and never as accumulators, so only the ASCII SUM and PROD begin a reduction (row 5). The rung repairs the two on both paths, since both read the same parser. A mutable local without its type (row 177) is not in the rung: the team's chapter and the team's check ask for the type.
- **points to report:**
  - Each form failing on the base and passing after, under walk and compiled.
  - Row 5: the productions changed; what a program that declares or applies U+2211 or U+220F as an operator of its own meets after the change; every existing test or library line that the change reaches.
  - Every existing test whose pinned message changed; every line of a team test changed.
  - The count and distance tables on your final tree, and the commit they ran on.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (11 keys, 8 checks):
  - P-87 (check): no line of the model or of its helper file changes in this batch.
  - ledger:133 (check): the api's rule, which closes.
  - ledger:5 (check): the sum sign as a prefix operator, which closes.
  - ledger:166: the `null` before the file name in the message, a neighbour that is not yours.
  - PRB `3. One trial build` (check): what a one-line edit of each site gave, and what it left for row 5.
  - SPEC `basic/expressions/reductions.tex#Summations and Other Reduction Expressions` (check): the accumulator's grammar.
  - SRC `parser/Parameter.rats#FnHeaderFront AbsOpHeaderFront` (check): the api's rule.
  - SRC `parser/Parameter.rats#FnHeaderFront OpHeaderFront`: the component's rule, the precedent.
  - SRC `parser/Symbol.rats#transient Op Accumulator` (check): the accumulator.
  - `map:modules-and-phases.md#B.2 Rats! parsing`: how the grammars are built and what a grammar edit makes stale.
  - REC `Forks the batch takes` (check): the defaults you build.

### S
- **slug:** `rung-superscript-after`
- **worktree:** `/home/user/fortress-superscript-after`
- **section:** `S. A superscript after a dotted access and after a parenthesised call: p.wq^T parses on both paths, and walk runs (f(x))^T (rows 84 and 158)`
- **blurb:** two places where a superscript, an exponent or a postfix exponent operator such as ^T, is refused though the specification gives it. After a dotted access, as p.wq^T, the grammar has no place for it, and both paths stop with a bare Syntax Error (row 84). After a parenthesised call, as (f(x))^T, walk refuses the form as if the parentheses were not there, while the compiled path runs it (row 158). A call followed directly by a superscript, f(x)^T, stays a static error: it is the language's rule (row 144).
- **points to report:**
  - Each form of row 84's seven probes and of row 158's three, failing on the base and passing after, on each path; `f(x)^T` still refused on both, with its message.
  - The tree that the parser now builds for `p.wq^T`, `p.wq^T x`, `a.m(x)^T` and `p.wq[i]^2`, and what the compiled path does with each.
  - Every existing test whose verdict, output or pinned message changed.
  - The count and distance tables on your final tree, and the commit they ran on.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (13 keys, 11 checks):
  - P-87 (check): no line of the model changes.
  - ledger:84 (check): the grammar's gap, which closes.
  - ledger:158 (check): walk's refusal, which closes.
  - ledger:144 (check): the language's rule, which stays.
  - ledger:301: the method form `.t()` after a call, which runs today and stays.
  - SPEC `basic/operators/juxtameaning.tex#Juxtaposition` (check): a tight juxtaposition with a dot is left-associated; the reassociation and its two static errors.
  - SPEC `basic/expressions/operator-app.tex#Operator Applications` (check): a postfix operator's operand.
  - SRC `parser/Expression.rats#constant Expr LeftAssociatedPrimary` (check): the dotted forms.
  - SRC `parser/Expression.rats#constant Expr MathPrimary` (check): where a superscript attaches today.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forOpExpr(OpExpr x)` (check): walk's postfix branch.
  - SRC `interpreter/evaluator/Evaluator.java#private FValue forTightJuxt(Juxt x, boolean isPostfix)` (check): walk's refusal.
  - `map:compile-path-walkthrough.md#1. Parsing and the syntax tree`: the tree that both paths read.
  - REC `Forks the batch takes` (check): the defaults you build.

### C
- **slug:** `rung-static-argument-inferred`
- **worktree:** `/home/user/fortress-static-argument-inferred`
- **section:** `C. The checker fixes two static arguments that it leaves open today: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value (rows 731 and 758)`
- **blurb:** two places where the compiled checker has no instance for a static parameter that the program's text fixes. In a reduction with generators that writes no static argument, as SUM[j <- 0#i] f(j), a big operator whose bound names its own parameter has no instance at its bound, and the reduction is refused (row 731); the rung fixes the argument from the reduction's declared type, else from its body. A generic function passed as a value, as useOne(count), stops the checker with an internal error (row 758); the rung instantiates the reference at the arrow type that receives it. The first frees the model's line 43; the second is the compiled half of the model's row lift, whose walk half is rung F.
- **points to report:**
  - The rule as built for the reduction: what fixes the static argument, in which order, and what the checker answers where the declared type and the body's type differ; the same program under walk.
  - Each place where your rule gives a reduction another type than walk gives the same program (a method's return type, a top-level variable, a field, an assignment, a call's argument), with the program and both paths' values.
  - The rule as built for the function reference: where the arrow type comes from, what happens where it leaves a static parameter open, and an overloaded name whose declarations are generic.
  - Row 731's reproducer and row 758's, failing on the base and passing after; the library's three written sites and the model's line 43 with the argument removed, under the distance stage's driver, as runs to report.
  - Every existing test whose verdict, output or pinned message changed.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification changed, before and after; each sentence your change makes false that this section does not name.
  - Step 2 not landed: what remains, and row 758's whole new line.
  - A file edited beyond those named.
- **briefing** (22 keys, 16 checks):
  - P-78 (check): the reduction's decision; the written argument is row 731's workaround.
  - P-51 (check): a call written as an argument is typed again against each parameter type.
  - P-48 (check): a type parameter that a call does not fix takes its bound.
  - P-148 (check): the checker's timing for your edit.
  - P-79: the team demos whose reductions leave out the argument.
  - F-59 (check): what the checker does today with an unwritten argument, and what walk does.
  - F-221 (check): the retry as built, and where a self-bounded big operator falls out of it.
  - F-285: the library's written sites, which this rung does not unwrite.
  - ledger:731 (check): the refusal, which closes.
  - ledger:758 (check): the crash, which closes if step 2 lands.
  - ledger:716: walk's empty sum, a neighbour that is not yours.
  - ledger:817: the demo `trips.fss`, a neighbour that you report on if it moves.
  - ledger:156: walk's half of the function as a value, rung F's.
  - `doc:explorations/compile-ladder/rung-argument-context/REPORT.md#5. Old against new` (check): the self-bounded case, measured, and why the retry is not reached.
  - SPEC `basic/expressions/reductions.tex#Summations and Other Reduction Expressions` (check): the reduction is for the type of its expression; the box that says what each path does today.
  - SPEC `basic/inference.tex#The Static Arguments of a Call` (check): the contexts that give an expected type.
  - SPEC `appendices/changes.tex#The contexts that give a call an expected type` (check): the Effect that you bring in line.
  - SPEC `basic/expressions/var-ref.tex#Identifier References` (check): a reference to a generic function takes its static arguments from the context.
  - SRC `scala_src/typechecker/impls/Functionals.scala#private def retypedApplication(` (check): the retry.
  - SRC `scala_src/types/TypeAnalyzer.scala#def staticParam(x: Id)` (check): where the crash is raised.
  - `map:compile-path-walkthrough.md#3. The checker`: how the checker walks a call.
  - REC `Forks the batch takes` (check): the defaults you build.

### F
- **slug:** `rung-generic-function-value`
- **worktree:** `/home/user/fortress-generic-function-value`
- **section:** `F. A generic function passed as a value under walk: it takes its static arguments from the arrow type that receives it, or at its first call (row 156)`
- **blurb:** under walk a function with static parameters has no type as a value, so passing it as an argument fails at the call with a unification error, a missing-type error or a Java NullPointerException (row 156). The specification says that a reference to a generic function takes its static arguments from its context. The rung gives such a value a type under walk: it is instantiated at the arrow type of the parameter that receives it, and where that type leaves a static parameter open, at its first application, as a direct call is today.
- **points to report:**
  - The rule as built: when the value is instantiated, from what, and what walk answers where no instance fits.
  - Each of row 156's three failures, failing on the base and passing after; a function generic in a type, in one size and in two sizes; an overloaded name with a generic declaration.
  - As runs to report, not tests: a generic function bound to an untyped local variable and then called, and one passed where the arrow type leaves a static parameter open, with what walk does; rung C's checker refuses both.
  - The row lift with sized functions: `rows(rmsn, x)` for `rmsn[\nat n\](x: Vector[\RR64,n\])` and a `rows` whose arrow parameter is sized, in a test program of your own.
  - Every existing test whose verdict, output or pinned message changed.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (15 keys, 9 checks):
  - P-87 (check): no line of the model changes; the sized row lift is decision D's diff, not yours.
  - P-48 (check): a type parameter that a call does not fix takes its bound, and walk's open parameter.
  - P-55: sizes are compared by their written form.
  - P-12: walk has no static types until after the switch-over.
  - ledger:156 (check): the three failures, which close.
  - ledger:165: a neighbour under walk's overloading.
  - ledger:171: the arrow-typed parameter that the workaround uses.
  - ledger:758: the checker's half, rung C's.
  - REV `1.2 Lines 27 to 34 and 51` (check): the model's lines and the run with the size written.
  - SPEC `basic/expressions/var-ref.tex#Identifier References` (check): the static arguments of a reference come from its context.
  - SPEC `basic/functions.tex#Function Declarations` (check): a function is a value.
  - SRC `interpreter/evaluator/values/Fcn.java#public FType type()` (check): the value's missing type.
  - SRC `interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction(List<FValue> args,` (check): how a direct call fixes the static arguments.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: where walk binds and applies.
  - REC `Forks the batch takes` (check): the defaults you build.

### B
- **slug:** `rung-toplevel-array-literal`
- **worktree:** `/home/user/fortress-toplevel-array-literal`
- **section:** `B. An array literal with a declared type at the top level is an array under walk (row 142)`
- **blurb:** under walk an array literal that is the value of a top-level variable is never built into an array: with a declared type the binding fails with a type mismatch against a tuple (row 142). In a function body the same literal is built where it has a declared type. The rung builds the typed literal at the top level too, so that a table of the model can be a literal. A literal without a declared type is row 49's, in a function body too, and is left out.
- **points to report:**
  - Row 142's typed probes, failing on the base and passing after; a literal of rank 1 and 2, of numerals, of names and expressions, of strings; a literal at a `var` top-level variable.
  - What an untyped top-level literal does on your tree, as a run to report: it is row 49's and is not repaired here.
  - Every existing test whose verdict, output or pinned message changed; a top-level binding of a pasted tuple that a program relied on.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (11 keys, 8 checks):
  - P-87 (check): no line of the model changes.
  - P-173 (check): where a numeral converts, which the elements of a typed literal meet.
  - ledger:142 (check): the binding, which closes.
  - ledger:49: the untyped literal, in a function body too, which is left out.
  - ledger:104: a sibling on the array literal.
  - SPEC `basic/expressions/aggregate.tex#Array Expressions` (check): the literal and its type.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): the top-level declaration.
  - SRC `interpreter/evaluator/BuildEnvironments.java#private void forVarDecl4` (check): the top-level binding.
  - SRC `interpreter/evaluator/LHSEvaluator.java#public Voidoid forLValue(LValue x)` (check): the body's binding, the precedent.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: how walk builds a component's environment.
  - REC `Forks the batch takes` (check): the defaults you build.

### N
- **slug:** `rung-numeral-most-specific`
- **worktree:** `/home/user/fortress-numeral-most-specific`
- **section:** `N. A numeral at a call goes to the most specific declaration that takes it, by its own conversion if need be, its default the last resort: u = 0 is true for a zero u of NN32, on both paths (P-46, P-49, P-173)`
- **blurb:** the decision on record for a numeral at a call (P-46): a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion; among the applicable declarations the most specific runs, and where two are not ordered, the one that the default fits. Built in the compiled checker and, by fork W's default, in walk; the one library's Equality gains =/= so that u =/= 0 follows; the two expected-failure walk tests are promoted (rows 973 and 966, their kin 975 and 976); row 390's numeral case and row 989 close under the prelude, and the two model lines that row 989 names pass the checker against the one library; the specification's coercion chapter and the Effect of Appendix I's numerals are brought in line.
- **points to report:**
  - The rule as built in the checker and in walk, by declaration, and what each does where two applicable declarations are not ordered.
  - The one library's overload sets in which a numeral now reaches another declaration than on the base, each with a call that shows it; any such call on a model line, which is reserved.
  - Every existing test whose verdict, output or pinned message changed, with its line before and after; every line of a team test changed.
  - `k(5)` beside `k(x: Any)` and `k(x: NN32)`, and `mul(1.0, f)` of row 989, on each path, before and after; the two model lines under the distance stage's driver, before and after.
  - Row 390: what closes and what stays, with the row's whole new line.
  - What walk answers for `a = 0`, `a: Any` holding an `NN32` zero, and what the checker answers.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification changed, before and after; each sentence your change makes false that this section does not name.
  - A file edited beyond those named.
- **briefing** (26 keys, 19 checks):
  - P-46 (check): the decision you build, with the numeral's rule and its tie.
  - P-49 (check): the checker's order of attempts, and its exception for a numeral.
  - P-173 (check): where a numeral converts, and its default as the last resort.
  - P-174 (check): the numeral types; no `=` ties one to a number type.
  - P-176: one value for each place where a numeral is written.
  - P-168 (check): the library's `=` over `Any`, which stays.
  - P-165: which pairs of number types compare by `=`.
  - P-59 (check): walk chooses a coercion by the run-time value; fork W reads it.
  - P-12: walk runs the checker only after the switch-over.
  - P-148 (check): the checker's timing for your edit.
  - P-37: the prelude is not changed for this.
  - ledger:973 (check): `u = 0` under walk, which closes.
  - ledger:966 (check): `u =/= 0` under walk, which closes.
  - ledger:975 (check): the `case` clause, its kin.
  - ledger:976 (check): a program's own number type, its kin.
  - ledger:390 (check): the dispatcher at `Any` that is never emitted; its numeral case is yours.
  - ledger:989 (check): the float numeral beside a value, two declarations by coercion.
  - NEQ `Way B. A numeral goes to the most specific declaration that takes it; the default is the last resort` (check): the way, what it sees, keeps and bends.
  - NEQ `2.3 The one thing measured: the checker against the one library` (check): what the checker chooses today, call by call.
  - `doc:explorations/reviews/batch-30-review.md#Part 5. What changes run 2's plan`: the sites in walk and the checker that the last landing left.
  - MCC `2. A line of the model that the checker refuses against the one library`: the model line and its driver.
  - SPEC `basic/conversions-coercions.tex#Coercion Resolution` (check): the specification's rule and the sentences you change.
  - SRC `scala_src/typechecker/impls/Functionals.scala#def typedApplication(` (check): the checker's attempts at a call.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals` (check): walk's choice for a call with a numeral.
  - `code:Library/FortressLibrary.fss#trait Equality`: where `=/=` goes.
  - REC `Forks the batch takes` (check): the defaults you build.

### D
- **slug:** `rung-tuple-binding`
- **worktree:** `/home/user/fortress-tuple-binding`
- **section:** `D. A top-level tuple binding on the compiled path: the checker types each name by its element, and the code generator declares each name (rows 988 and 474)`
- **blurb:** a top-level binding of several names to a tuple, the form of the model program's hyperparameters, stops the compile: the checker leaves a node that it should have replaced (row 988), types each name so that it is accepted anywhere (row 474), and behind it the code generator has no case for a left side of more than one name. The rung types each name by its element and compiles the binding.
- **points to report:**
  - Where the names' types were lost in the checker, and the repair.
  - The binding as compiled: when the right side is evaluated, how many times, and what each name is.
  - Row 988's reproducer and row 474's cases, before and after; a numeral element's type at each name; a `var` tuple binding, a typed one, and one whose right side is a call that returns a tuple.
  - The model's lines 17 to 19 under the distance stage's driver, before and after.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (12 keys, 9 checks):
  - P-9 (check): the model writes its hyperparameters as tuple bindings.
  - P-87: a model line does not change.
  - P-173 (check): the default type of a numeral where nothing fixes one, which each name of such a binding takes.
  - P-148 (check): the checker's timing for your edit.
  - ledger:988 (check): the stop, which closes.
  - ledger:474 (check): the names typed so that they are accepted anywhere, which closes.
  - ledger:175: the single-binding form, the workaround that the model does not take.
  - MCC `3. The model's hyperparameter lines do not compile under either library` (check): the runs and the code generator's site.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): the tuple notation.
  - SRC `compiler/codegen/CodeGen.java#private void forVarDeclPrePass` (check): the code generator's case.
  - `map:compile-path-walkthrough.md#3. The checker`: how the checker types top-level variables.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **The model** is microGPT's flat program, `MicroGptFlat.fss`. **The helper file** is `FlatArrays.fss`, the array operations that the model's lines call.
- **Walk** is the interpreter. **The compiled path** checks types with **the checker**, then writes JVM bytecode. The model runs only under walk today.
- **The parser** reads the source text. Both paths use the same one.
- **An api** is an interface file. The helper file has one, `FlatArrays.fsi`.
- **A gap** is a form that the specification gives and that today's tree refuses. **A row** is a gap's entry in the ledger.
- **A rung** is one repair, built by one worker and checked by a second. **A run** is one launch of the batch workflow.
- **A static argument** is a type or a size written in white brackets, as the `ZZ32` in `SUM[\ZZ32\]`.
- **A numeral** is a number written in digits, as `0` or `1.0`. Its **default** is the type that it takes where nothing fixes one: `ZZ32`, or `RR64` with a point.
- **A tuple binding** gives several names their values at once, as `(a, b) = (1, 2)`.
- **The prelude** is the compiled path's own small library, which it uses until the switch-over. **The one library** is the interpreter's library, which both paths use after it.

### The go

You asked whether the work should focus on the notation's gaps first. You said that where the specification allows a terse form and an implementation gap compromises it, "these should obviously be priority fixes".

On 2026-11-15 you asked to move into this batch the two rungs of climb batch 31 that close a limit of the model: rung N, the numeral rule, and rung D, the top-level tuple binding. They are here now. This batch is one run of seven rungs. Climb batch 31 keeps its other five rungs.

On 2026-11-15, between 23:10 and 23:19 UTC, you gave the go, in these words: "Go for the joined batch after the check is clean." The check is the review of this record, `climb-batch-32-review.md`, "The check of the joined record, 2026-11-15". The coordinator launches the batch after it. Climb batch 31 has no go.

### Your choices

- **The order of this batch and climb batch 31.** Your go puts this batch first. Climb batch 31 has no go. Each batch is written against the same code, so before climb batch 31 launches, its sections are read again against this batch's landed tree. With N and D here, the two batches share two files. One is the code generator's main file: rung D edits one declaration of it, and climb batch 31's rungs edit others, far from it. The other is the specification's appendix of changes: rungs C and N edit four entries of it, and climb batch 31's rungs K and T edit two others.
- **One fork that I name to you: walk gets the numeral rule now (fork W).** In climb batch 31's record this was the one question before a launch. It is no longer a question that the launch waits on. The coordinator takes the answer from your words of 2026-11-10, which P-46 and its history hold.
  - You decided that `u = 0` is `true` for a zero `u` of type `NN32`. You said "of course this needs to answer true", and that an option that does not answer true "is out of the question".
  - The model runs only under walk today. So rung N builds the rule on both paths: in the checker and in walk. This is way (a).
  - Way (b) would build it in the checker only. Walk would keep answering `false` until it runs the checker, some batches after the switch-over.
  - **The one new difference between the paths under (a).** Take a variable of the widest type, `a: Any`, that holds a zero of type `NN32`. Walk sees the value, so it will answer `a = 0` with `true`. The checker sees only `Any`, so the compiled answer is `false`. Today both answer `false`. Your decision P-59 already accepts this kind of difference: walk chooses by the value at run time.
  - It reads one sentence of P-59 narrowly. P-59 says that walk "is not changed for it before the switch-over". That sentence was about converting a value. A numeral is not a value.
  - If you want (b), say so before the launch. It costs one run of the generator (`gen32.py --fork-w b`). The fork is on the review list either way.
- **Array comprehensions (row 50): one question.** The specification has the form `[(i, j) ↦ e | i ← 0#n, j ← 0#m]`. It would be the form of the model's `mask` and of the helper file's `gather`, `onehot` and `pick`. The specification's text does not say how large the array is. It rewrites the form to `a = array()` and a row of assignments, with no size. So I left it out. The ways:
  - **(a) Leave it out for now.** `mask`, `gather`, `onehot` and `pick` stay as they are. Cost: nothing.
  - **(b) The size comes from the declared type.** `mask: RR64[16,16] = [(i, j) ↦ ... ]`. This is how the plain array literal works today. It needs sized types in the model, which is your open decision D. About 2 rungs.
  - **(c) The size comes from the generators.** Where each index is a plain loop variable over a range, the array spans those ranges. Any other shape needs a declared type. This serves today's unsized lines. The overview's two examples read so ("describes a 3 × 3 array"); the rule itself would be ours, written into the specification. About 2 rungs.
  - **Recommended: (a) now, and (c) or (b) with your answer on static sizes** (question 3 of the review). The two questions decide each other.
- **A mutable variable without its type, `var p = e` (row 177): one question.** It is not in this batch.
  - The chapter on variables gives a mutable variable its type: `var id: Type = expr`, or `id: Type := expr`. The team's parser refuses `var p = e` on purpose, with the message "The type of p is required."
  - The grammar appendix, the list of all syntax rules at the end of the specification, allows `var p = e`.
  - The batch leaves the rule as the team's check has it. Lines 88 to 90 of the model keep their types. If you want the appendix's form, it is one small rung.
- **The diffs to the model.** No rung changes a model line. Each rung makes a diff possible. They are listed below. Applying each is your word, after the landing (P-87).

### The scope: one run, seven rungs

Each rung is given as the line of the model that it frees, before and after, and a program that fails today. For N and D the model's lines stay as they are: they are already in the short form, and only the compiled path refuses them.

- **P, two forms that the parser refuses.**
  - *`^T` declared in the helper file's api (row 133).* Lines 21 to 24 leave the model:

        - opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\] = transpose(m)
        - opr (t: Array3[\RR64,0,a,0,b,0,c\])^T[\nat a, nat b, nat c\]: Array3[\RR64,0,a,0,c,0,b\] = transpose(t)

    and stand once in `FlatArrays.fsi`. Fails today, in an api: `Syntax Error`.

        api A
        opr (x: ZZ32)^T: ZZ32
        end

  - *`∑` for `SUM` (row 5).* Lines 28, 43 and 52 could write `∑`. Fails today: `Operator prefix SUM is not defined.`

        run(): () = println(∑[i <- 1#3] i)

- **S, `^T` after a call in parentheses and after a field (rows 158 and 84).** Line 70:

      - gWTE = transpose(onehot(ids, vocabSize)) dX; gWPE = transpose(onehot(pos, blockSize)) dX
      + gWTE = (onehot(ids, vocabSize))^T dX; gWPE = (onehot(pos, blockSize))^T dX

  With lines 21 to 24 gone, the function `transpose` then leaves the helper file's api. Fails today under walk: `a function argument should not be immediately followed by a non-expression element`.

      opr (x: ZZ32)^T: ZZ32 = x + 100
      f(x: ZZ32): ZZ32 = x + 1
      run(): () = println((f(3))^T)

  The parentheses stay: `onehot(...)^T` without them is refused by the language itself. The second half, `p.wq^T`, frees no line today. It is needed if the model's matrices become fields of an object. Fails today on both paths: `Syntax Error`.

      object B(v: ZZ32) end
      run(): () = do b = B(3); println(b.v^2) end

- **C, the checker's two missing inferences (rows 731 and 758).** Line 43:

      - matOffset(i: ZZ32): ZZ32 = SUM[\ZZ32\][j <- 0#i] matCount(j)
      + matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matCount(j)

  Walk runs the short line today. The checker refuses it, so the model writes the argument. Fails today when compiled, for a sum of a program's own: `is not applicable to an argument of type ()`. The second half lets the checker accept a generic function passed as a value. It is the compiled half of rung F. Fails today when compiled: `F is not in the kind env`.

      object Box[\F extends Object\](v: F) end
      count[\F extends Object\](b: Box[\F\]): ZZ32 = 1
      useOne(g: Box[\ZZ32\] -> ZZ32): ZZ32 = do z: ZZ32 = 7; g(Box[\ZZ32\](z)) end
      run(): () = println(useOne(count))

- **F, a sized function passed to the row lift (row 156).** Lines 27, 28, 30 and 34, the four vector functions:

      - rmsn(x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = x / SQRT (epsilon + (x DOT x) / |x|)
      + rmsn[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\] = x / SQRT (epsilon + (x DOT x) / |x|)

  Line 57, `xp = rows(rmsn, x)`, stays as it is. This diff is a part of your decision D, which is open and parked. The rung only removes what stands in its way under walk. Fails today under walk: `got arg half ... of type null`.

      half[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\] = x + x
      app(f: Vector[\RR64,3\] -> Vector[\RR64,3\], v: Vector[\RR64,3\]): Vector[\RR64,3\] = f(v)
      run(): () = do v: Vector[\RR64,3\] = [2.0 2.0 2.0]; println(app(half, v)) end

- **B, a table as a literal (row 142).** Lines 37 to 41, the two `if` chains:

      - matName(i: ZZ32): String =
      -     if i = 0 then "wte" elif i = 1 then "wpe" elif ... else "mlp_fc2" end
      + matName: String[9] = ["wte" "wpe" "lm_head" "attn_wq" "attn_wk" "attn_wv" "attn_wo" "mlp_fc1" "mlp_fc2"]
      - matShape(i: ZZ32): (ZZ32, ZZ32) =
      -     if (i = 0) OR (i = 2) then (vocabSize, nEmbd) elif i = 7 then (4 nEmbd, nEmbd) ...
      + matShape: ZZ32[9,2] = [vocabSize nEmbd; nEmbd nEmbd; vocabSize nEmbd; nEmbd nEmbd; nEmbd nEmbd
      +                        nEmbd nEmbd; nEmbd nEmbd; (4 nEmbd) nEmbd; nEmbd (4 nEmbd)]

  Lines 42 and 45 then read the table by subscript, and the loader takes the names as an array. Names as elements run today inside a function. Fails today under walk, at the top level: `Type mismatch binding (27,16,27)`.

      shp: ZZ32[3] = [27 16 27]
      run(): () = println(shp[1])

- **N, a numeral beside a value (row 989, with rows 973 and 966).** Line 82 stays as it is:

      learningRate(s: ZZ32): RR64 = lr0 (1 - (1.0 s) / nSteps)

  Walk runs it. Against the one library the checker refuses `1.0 s`. It finds two products, the float one and the rational one, and cannot choose. The rung builds your decision on a numeral at a call (P-46): the numeral goes to the most specific declaration that takes it, and of two that are not ordered, to the one that its default fits. So the checker takes the float product, as walk does. And `u = 0` becomes `true` for a zero `u` of type `NN32`, on both paths. Fails today: the compiled program dies when it runs, and walk prints `any`. After: `nn32` on both.

      k(x: Any): String = "any"
      k(x: NN32): String = "nn32"
      run(): () = println(k(5))

- **D, the hyperparameter lines (rows 988 and 474).** Lines 17 to 19 stay as they are:

      (nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)

  Walk runs them. The compiled path stops on the first of them. After the rung they compile, and each name has the type of its value. Fails today when compiled: `Result of typechecking still contains intermediate nodes`.

      (nEmbd, blockSize) = (16, 4)
      run(): () = println(nEmbd + blockSize)

**Why one run.** No two rungs edit one declaration ("How the seven rungs meet in one run", below).

**Why P, S and C are one rung each.** The parser's two small forms are one rung, because each grammar edit costs a full rebuild. The checker's two inferences are one rung, because both are in one file. The two `^T` gaps are one rung, because they are one subject. N and D are as climb batch 31 planned them.

### The measure

Two counts, from the review's section 1.

- **Boxed limits of the walk-through that are gaps and still open. Before: 12.** They are the tuple bindings (row 988), the unsized vector functions (156), `^T` in the model (133), the `if` chains (142), `SUM[\ZZ32\]` (731), the sizes through `reflect` (307), the rank-3 product (292), `transpose(onehot(...))` (158), `1.0 s` (989), the type on a mutable variable (177), the float reader and line scanner (140, 141), and `SUM` in capitals (5).
- **After this batch: 4.** Eight close.
  - Six by P, S, C, F and B: rows 156, 133, 142, 731, 158 and 5.
  - Two more by N and D: `1.0 s` (row 989) and the tuple bindings (row 988).
- **The four that are left, and why.**
  - The sizes through `reflect` (row 307). The compiled path cannot make a size from a number at run time. It waits for the switch-over. It goes away if the model's sizes become static, which is your decision D.
  - The rank-3 product (row 292). It waits on your answers to the review's questions on which helper operations move into the library.
  - The float reader and the line scanner (rows 140 and 141). The same.
  - The type on a mutable variable (row 177). It is your question above. The team's chapter and check ask for the type.
- **Lines that an open gap shapes. Before: 20 of the model's 98, and 14 of the helper file's 190.**
  - The model: lines 21 to 24, 27, 28, 30, 34, 37 to 41, 43, 45, 52, 70, 88 to 90.
  - The helper file: lines 47 to 51 (`transpose` as functions), 64, 95 and 108 (`reflect`), 142, 148, 154 and 160 (the row lift's unsized functions), 181 and 182.
- **After, once you apply the diffs: 4 of the model's lines** (line 45, which calls the helper file's `view`, whose line 64 uses `reflect`, and lines 88 to 90, the types on the mutable variables) **and 4 of the helper file's** (the three `reflect` lines and line 182, a typed mutable variable). Without decision D, the four vector functions and the four row-lift lines stay: 8 and 8.
- Line 29 (`mask`, row 50), line 51 (the unsized arrays of `step`, decision D) and line 42 (which rung B's diff rewrites with line 45) are not in the count either way: the count holds the lines that a boxed gap of this batch shapes, and line 45.
- Lines 17 to 19 and line 82 are not in the count. Their text is already the short form. Only the compiled path refuses them, and rungs D and N repair that.
- The checker's count and the distance stay 0 and 0 (F-53). microGPT's quick checks under walk stay 7 of 7 for both programs, with no line of either changed.

### How the seven rungs meet in one run

A run can hold two rungs that edit one file, if they edit different declarations of it. The step that merges the rungs, the gather, then takes both. I read each shared file on the base's code. Each pair below merges cleanly. Each rung's section has a "Not" list that names the other's part.

- **N and C, in the checker's file for calls (`Functionals.scala`). Merges cleanly.** Both rungs change how the checker handles a call. N changes which declaration a call with a numeral chooses. C changes how a call's static arguments are found. One function there, `typedApplicationOfChecked`, calls both rungs' code. N owns that function. C owns the functions that it calls for the retry. C does not edit it: if C's repair needs a change inside it, C reports that and does not build it.
- **N and F, in walk's file for overloaded functions (`OverloadedFunction.java`). Merges cleanly.** N owns the members that choose a declaration for a call. F owns the last members of the class, which make a function value, and adds its new members at the end.
- **D and B, on the top-level variable declaration. No shared file.** D repairs the tuple binding on the compiled path. B repairs the array literal under walk. One of B's tests binds its names by a tuple under walk, which runs today.
- **D and C, in the checker. No shared file.** D edits where top-level variables are typed. C edits the file for calls.
- **N and C, in the specification's appendix of changes (`changes.tex`). No shared sentence.** N edits two entries on numerals. C edits two entries on reductions and on a call's context.
- **P and S, in one grammar file. Merges cleanly,** as before: each owns its own productions.
- **Where they meet in behaviour.** B's typed literal converts its numerals as P-173 says, and N changes only a numeral at a call. The suites on the merged tree run both.
- **Climb batch 31.** D edits the code generator's main file in one declaration, far from those of climb batch 31's rungs. C and N edit entries of the specification's appendix of changes that climb batch 31's rungs do not. Whichever batch launches second is read again against the first one's landed tree, and its base build is made new.

### The forks you may want to see

Fork W is consequential, and it is named to you above. No other fork of section 3 is consequential by the `coordinator` skill's rule. Each lands at its default and goes on the review list. Four that you may want first:

- **Fork C1, what fixes a sum's type in the checker.** Walk takes the declared type that receives the sum, and else the type of its elements. The checker will do the same: the declared type first, else the body's type. Where walk reads a declared type, at a local variable and at a function's return type, both paths answer alike: `x: RR64 = SUM[j <- 0#n] f(j)` in a function body sums in `RR64` on both. Walk does not read the declared type of a method's return, a top-level variable, a field, an assignment or a call's argument (F-228). There the checker would sum in the declared type and walk in the type of the elements, and convert after. The worker reports each such place. This does not bend your decision P-78. P-78 says that the argument is written "where nothing at the call fixes the element type", and calls the checker's refusal a gap with a workaround. The repair removes the need for the workaround. The library's own written sites stay as they are.
- **Fork P1, `∑` and `∏`.** After the repair, `∑` at the start of an expression is the sum's sign, exactly as `SUM`. A program can no longer use `∑` as a prefix operator of its own. No program or library file in the tree does.
- **Fork S1, `a.m(x)^T`.** A superscript after a method call with a dot applies to the call's result. The specification says that a form with a dot is read from left to right. `f(x)^T`, without a dot, stays refused.
- **Fork N2, the tie.** `1.0 s`, with `s` an integer variable, fits the float product and the rational product, each only by a conversion. P-46 says that the one that the numeral's default fits runs: the float product. That is what walk does today, and what line 82 of the model needs.

### What the batch leaves out

- **Any change to a line of the model or of the helper file** (P-87).
- **The layout of the parameters, static sizes, decision D, and which helper operations move into the library:** your decisions, questions 2 to 4 and 6 of the review.
- **The library rungs that hang on them:** the float reader (row 140), the line scanner (141), a slice as a vector (54), the rank-3 product (292).
- **Sizes made from a number at run time, compiled (row 307):** after the switch-over, or never if the sizes become static.
- **Array comprehensions (row 50):** your question above.
- **A mutable variable without its type (row 177):** your question above. **An array literal without a declared type (row 49):** not built, at the top level or in a function body.
- **The language's own rules:** a call followed directly by `^T` (row 144), `/` on two integers (174), a variable as a size (25). I found no reason to call any of them a gap.

### Before the batch runs

- **Your go:** given on 2026-11-15, for after a clean check of the joined record.
- **The Fable review of this record** (`references/batch.md`, "The go"): `climb-batch-32-review.md`, "The check of the joined record, 2026-11-15".
- **The manifest's generator,** `compile-ladder/plan-32/manifest/`, made by the coordinator from `plan-31/manifest/` with this record's values, and extended to the seven rungs.
- **The base build:** `/home/user/fortress-base33` at `84f1c37190`, if this batch runs first. If climb batch 31 lands first, a new base build at its landing, and sections 4's line citations read again.
- **The disk.** The script stops under 1.5 G a rung plus 4 G: 14.5 G for seven rungs. Free on 2026-11-15 at the check of the joined record: 17,049,176 KB by `df -P /home/user`, about 16.3 G. That is 1.8 G above the floor, and it fell by 0.14 G in the hour before. Three older worktrees stand beside the base build, about 1.7 G together (`/home/user/fortress-base32`, `/home/user/fortress-probe-y`, `/home/user/fortress-merge`). The coordinator removes those that no note still needs before the launch.

### Cost

- **About 6.2M tokens written, from 5.0M to 7.9M; about 10 hours at two agents at a time.**
  - Workers, about 3.0M: C 0.6M, F 0.5M, N 0.5M, P 0.4M, S 0.4M, D 0.4M, B 0.2M. These are the two records' figures for each rung.
  - Skeptics, about 1.6M. C's, N's and D's run the count stage themselves.
  - The fixed roles, about 1.2M: the disk check, the gather with seven rungs and one specification build, the merged-diff review, the gate, the commit stage. A judge and a repair round, about 0.4M.
  - Minutes: C 240, F 220, N 210, P 200, S 200, D 170, B 150.
- **Against the plan before.** This batch with five rungs was about 4.6M, and climb batch 31's two runs about 7.2M. Now this batch is about 6.2M, and climb batch 31's two runs about 5.8M.
- **The evidence.** Climb batch 30's three rungs and fixed roles wrote 3.13M. Every agent runs on Fable at medium effort (`FABLE_WEEK`).

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential forks

None that a launch waits on.

**W, walk's half of the numeral rule now or when walk runs the checker.** It came with rung N from climb batch 31's record, where it was the one question before a launch. **It stands at (a), walk now, in rung N.** The coordinator takes (a) from the curator's words of 2026-11-10, which P-46 and its history hold (`POSITIONS-history.md`, P-46, the block of 2026-11-13 23:12Z): for `u: NN32 = 0`, "of course this needs to answer true", and an option that does not answer true "is out of the question". The model program runs only under walk, so (b) would leave the answer `false` wherever a program runs today. Two later decisions give walk a numeral rule before it runs the checker (P-173, P-176), and the ways review recommends "one rung, on the checker and on walk together" (`reviews/numeral-equality-ways-2026-11-10.md`, section 10). The fork is consequential, because P-59 says that walk "is not changed for it before the switch-over", and (a) reads that sentence as about a value's coercion only; so it is named to the curator (section 2, "Your choices") and stays on the review list. Its one new difference between the paths, by the check of climb batch 31's record (`climb-batch-31-review.md`, A5 and section 4): for a value typed `Any` or `Number` that holds a number of another type than the numeral's default, as `a: Any` holding an `NN32` zero, walk answers `a = 0` with `true` and the compiled path with `false`, where both answer `false` today; P-46's sentence "A value typed `Any` or `Number` fixes no type for the numeral beside it, which keeps its default" then needs a clause for walk, as P-59 does (section 6, "For the record-landing workflow"). Way (b), walk waits: rung N builds the checker's half and the library's `=/=` only, rows 973, 966, 975 and 976 stay open under walk, and the library's `=/=` has no test that fails first (`climb-batch-31-review.md`, B4). The generator keeps (b): `gen32.py --fork-w b` makes the changes of its `W_B_RECORD` in a copy of this record and writes rung N's block from it, so a change of the curator's costs one regeneration (`compile-ladder/plan-32/manifest/block32-fork-w-b.js` is that block as generated on 2026-11-15).

Two questions are the curator's and are not taken (section 2, "Your choices"). Whether array comprehensions (row 50) are built, and by which rule for the array's size: it chooses among ways that the specification's text leaves open and that decide the form of model lines, so it is consequential; its default, (a), builds nothing and reverses nothing. And whether `var p = e` (row 177) is the language: the appendix's grammar gives it (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1125-1126`), the chapter's grammar and prose give a mutable variable its type (`Specification/basic/variables.tex:76-96`, `:174-181`, the same in the Working Draft), and the team's check refuses the form on purpose (`parser_util/SyntaxChecker.java:178-181`); the batch leaves the rule as the check has it, by the coordinator's ruling of 2026-11-15 on the check's finding 1 (`climb-batch-32-review.md`). It was fork P2 of the plan, and fork P3 went with it.

### Forks the batch takes

None of the forks below is consequential: each builds within a decision on record or the specification's text, or chooses where the record leaves an implementation open, and each can be undone.

1. **R1. One run of seven rungs.** P, S, C, F and B as planned, and N and D from climb batch 31's record, at the curator's request of 2026-11-15. **Default: so.** Ways not taken: one rung a row, ten rungs, whose floor of 19 G the disk does not have, and which pays a grammar rebuild and a skeptic three times for one-line repairs; two runs, which nothing needs, since no two rungs share a declaration (section 4, "The rule the rungs keep"). The reason: `references/batch.md`, "The go".
2. **R2. Row 758 is in the batch, as rung C's second step.** Rows 731 and 758 are not one repair. They are one rung because both are in `Functionals.scala`, in the code that infers a call's static arguments. **Default: so; step 2 lands if it fits, and else the rung lands step 1 and reports.** Way not taken: 758 in a second run of one rung, about 1.0M of fixed roles for it.
3. **R3. Row 50 is left out** until the curator's answer. **Default: so.** The text gives the form and the desugaring, `do a = array(); a[i1] := e1, gs1; ...; a end` (`Specification/advanced/parallelism-locality/defining-generators.tex:241-266`), and says that the comprehension need not define every cell (`Specification/basic/expressions/comprehensions.tex:15-19`). It leaves open: the array's size and lower bounds, since `array()` takes none; its element type and its static type for the checker; and its two notations, `↦` in the chapter and `=` in the overview (`Specification/preliminaries/overview.tex:974-990`). The overview's examples do name a size: a comprehension over `x ← 0:2, y ← 0:2` "describes a 3 × 3 array" (`overview.tex:976`, `:991`, the same in the Working Draft), so the team's examples read the size from the generators, with no rule written.
4. **P1. The signs U+2211 and U+220F are accumulators wherever `SUM` and `PROD` are,** in an expression and in an operator's declaration, and are no longer prefix operators. **Default: so.** The reason: the specification's grammar, `Accumulator ::= ∑ | ∏ | BIG (Encloser | Op)`; `Operators.java` already names them `SUM` and `PROD`. The other Unicode big operators that the grammar reads through `BIG` are not touched.
5. **S1. A superscript after any dotted primary applies to the whole primary to its left,** a method call's result included. **Default: so.** The reason: "A tight juxtaposition is always left-associated if it contains any dot" (`Specification/basic/operators/juxtameaning.tex:130-131`).
6. **S2. `f(x)^T` stays a static error on both paths** (row 144). **Default: so; S's tests pin it.**
7. **C1. The checker fixes a reduction's unwritten static argument by the reduction's declared type where it has one that fits the bound, and else by the type of its body.** **Default: so.** Way not taken: the body's type first, which is the plain sentence of the revival's revised text, not of the Working Draft ("a sum is desugared with the reduction for the type N of the expression", `Specification/basic/expressions/reductions.tex:27-29`, in the box `revival-reductions`) and which would sum `x: RR64 = SUM[j <- 0#n] f(j)`, a local variable, in `ZZ32` when compiled and in `RR64` under walk. The reason: walk's rule as landed (F-59, F-228). The two paths answer alike where walk reads a declared type: a local variable's, and a top-level or local function's return type. They would differ where the checker has an expected type that walk does not read: a method's return type, a top-level variable, a field, an assignment, a call's argument; there walk sums at the join of its elements' run-time types and converts the value after, and the checker sums in the declared type. Rung C reports each such place; walk is not changed here. P-78 is not bent: its written argument is row 731's workaround by its own words, and its history shows the workaround entering with the gap (`POSITIONS-history.md`, P-78, the blocks of 2026-10-22).
8. **C2. No library line and no test is unwritten.** The library's sites keep their static arguments (F-285), and so do the team's tests. **Default: so.** The team demos that leave the argument out (P-79) then need no respelling: C reports which of them the checker now accepts, if its probe reaches them.
9. **F1. Under walk a generic function value is instantiated at the arrow type of the parameter or variable that receives it; where that leaves a static parameter open, it stays generic and is instantiated at its first application from the arguments' run-time types,** as a direct call is. **Default: so.** The reason: `var-ref.tex`, "the static arguments are statically inferred from the context"; walk has no static types (P-12), so the context it has is the receiving type and the call. Rung C's checker refuses a reference whose receiving type leaves a static parameter open, and one with no receiving type, since nothing static fixes it. So rung F's tests assert only the programs that the checker accepts after rung C; what walk does with the others is a run to report, not a test, because walk runs them only for want of static types.
10. **B1. A typed array literal at the top level is the array that the same literal is in a function body.** **Default: so.** The reason: `aggregate.tex`, "Array Expressions"; one meaning for one form. An array literal without a declared type is row 49's, in a function body too, and is left out.
11. **N1. The prelude is not changed.** It declares no `=` over `Any`, and its `=/=` is each type's own, so the compiled `u = 0` is already `true` there. **Default: so.** The reason: P-37.
12. **N2. Where two applicable declarations are not ordered, the one that the numeral's default fits runs,** whether they differ only at the numeral's position or elsewhere too. **Default: so.** The reason: P-46's words; walk's answer for `1.0 s` and for row 989's reproducer.
13. **N3. `Equality[\T\]` gains `opr =/=(self, other: T): Boolean = NOT (self = other)`.** The library's `=/=` over `Any` stays, and so do the three types' own `=/=`. **Default: so.** The reason: the ways review; the Working Draft's sentence that `e =/= e'` is `NOT (e = e')`.
14. **N4. Row 390's other case stays.** A value's coercion beside `Any` (`p(NarrowOf(1))`) is not the numeral's rule. **Default: the row's whole new line, its numeral case gone.**
15. **D1. Each name of a tuple binding is a top-level variable of its element's type; the right side is evaluated once.** A numeral element takes its default at an untyped name (P-173). **Default: so.** The reason: `variables.tex`, the tuple notation; walk.
16. **D2. D's code-generator half is built only for a top-level binding.** A local tuple binding already compiles (row 474). **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation is the base build's, `84f1c37190`. The record's forks are section 3's. The reproducers are in `explorations/compile-ladder/plan-32/probes/`, and N's and D's in `explorations/compile-ladder/plan-31/probes/planner/` and `plan-31/probes/model-closure/`; a test is written new in the test folders, and no file is moved from there. No rung edits `explorations/run-c4/` or `explorations/apl/`.

### P. Two forms that the grammar gives and the parser refuses: a postfix operator declared in an api, and the signs for sum and product as accumulators (rows 133 and 5)

**The mission.** The parser is shared by walk and the compiled path. Two forms that the specification's grammar gives are refused before either path sees them, and each one shapes lines of the model program: the model declares `^T` itself because its helper file's api cannot, and its sums are written `SUM`. You repair the two, each on both paths.

**The decisions this rung builds.** P-87, which keeps the model's lines as they are. Section 3's fork P1.

**What you build, in order.** Each test is seen failing on the base first.
1. **Row 133.** In `parser/Parameter.rats`, `AbsOpHeaderFront` takes what `OpHeaderFront` takes after its value parameter: `Op`, `ExponentOp` or a caret. Tests: `ProjectFortress/tests/ApiPostfixExponentOp.fss` with its api and component beside it, as the probes `P133Api.fsi`, `P133Api.fss` and `P133.fss` are, the operator declared in the api, defined in the component and applied in the importing program, on a plain value and with static parameters as the model's `opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]` has them; and a compiled test of the same shape under the prelude, `ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiled.test`. Seen failing on the base: `Syntax Error` at column 1 of the line after the declaration.
2. **Row 5.** U+2211 and U+220F begin a reduction wherever `SUM` and `PROD` do, with and without a static argument and a generator clause list, and name the same operators in a declaration (fork P1). The alternative in `parser/Symbol.rats` alone is not enough (PROBES, section 3): find where the sign is taken as an operator first. Tests: `tests/SumSignAccumulator.fss`, each form of `tests/` that `SUM` and `PROD` take, written with the signs, with the same values; a compiled test under the prelude with the prelude's own sum.
3. **The whole suites** where the skill's `tests-running.md`, "When to run a whole suite", asks for them: a grammar edit reaches every program on both paths.
4. **The stages,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`.

**Rows.** Read each with `ledger.py show N` first. Close 133 and 5. Row 177, the type on a mutable local, is not yours: change nothing of it.

**Specification.** No Effect of Appendix I and no note names these rows (a grep of `Specification/` on `main`). List each sentence your change makes false, or none.

**Files.** `parser/Parameter.rats`, `AbsOpHeaderFront` and the operator headers at `:116-131`; `parser/MethodParam.rats:62`, `:82`; `parser/Symbol.rats`, `SUM`, `PROD`, `Accumulator`; `parser/Expression.rats:685-720` and `parser/NoNewlineExpr.rats:35`, the productions that use `Accumulator`; your tests. Not: `parser_util/SyntaxChecker.java`, whose check on a mutable local stays; `parser/Expression.rats:380-680`, which is rung S's; the library; microGPT.

**Reserved points.** A model line. A program or a library line that reads U+2211 or U+220F as an operator of its own. A change of what `SUM` or `PROD` in ASCII parses to.

**Overlaps by file.** `parser/Expression.rats` with S: "The rule the rungs keep".

### S. A superscript after a dotted access and after a parenthesised call: `p.wq^T` parses on both paths, and walk runs `(f(x))^T` (rows 84 and 158)

**The mission.** A superscript is an exponent, as `^2`, or a postfix exponent operator, as the model's `^T`. The specification reads a tight juxtaposition with a dot from left to right, so `p.wq^T` is `(p.wq)^T`; the grammar as built gives a dotted form no place for a superscript, and both paths stop with a bare `Syntax Error` (row 84). And where a call stands in parentheses, `(f(x))^T`, the specification makes it an expression that an exponent may follow; the compiled path runs it, and walk refuses it as it rightly refuses `f(x)^T` (row 158). The model writes `transpose(onehot(...))` in one line for this reason.

**The decisions this rung builds.** P-87. Section 3's forks S1 and S2.

**What you build, in order.** Each test is seen failing on the base first.
1. **Row 158, walk.** In `interpreter/evaluator/Evaluator.java`, the postfix branch of `forOpExpr` and `forTightJuxt` tell a parenthesised call from a call followed directly by a non-expression element. Tests: `tests/SuperscriptAfterParenthesisedCall.fss`: `(f(3))^T`, `(f(3))^T d`, `((f(3))^T) d`, `(f(3))^2`, each with the value that the compiled path gives; `f(3)^T` still refused, in a test that expects the refusal as the skill's `tests-writing.md` gives it. A compiled guard of the same forms, `compiler_tests/SuperscriptAfterParenthesisedCallCompiled.test`, which passes on the base.
2. **Row 84, the parser.** In `parser/Expression.rats`, a dotted primary takes the math items that `MathPrimary` takes after its front (fork S1). Tests, under walk and compiled: the row's seven probes as one program each way, `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, after a getter, after a method call, and `p.wq^T x` with a juxtaposed operand, each with its value; `B.data[5]` and `B.data!`, which run today, as guards.
3. **The whole suites** where the skill asks for them: your grammar edit reaches every dotted expression on both paths.
4. **The stages,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`.

**Rows.** Close 84 and 158. Row 144 stays; read it, and change nothing of it.

**Specification.** `Specification/basic/expressions/operator-app.tex:72`, the note "The following examples are not yet working": if an example of its list now runs on both paths, say which; change the note only if the whole list runs. List each other sentence your change makes false, or none.

**Files.** `parser/Expression.rats:380-680`, `PrimaryItem`, `LeftAssociatedPrimary`, `MathPrimary`, `MathItem`, `Exponentiation`; `interpreter/evaluator/Evaluator.java`, `forOpExpr`, `forTightJuxt` and what they call; what the checker or the code generator needs for the new tree of step 2, reported as a file beyond those named; your tests. Not: `parser/Expression.rats:685-720`, which is rung P's; in `Functionals.scala`, the declarations that are rungs N's and C's, `scala_src/types/TypeAnalyzer.scala`, which is rung C's, `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`, and `CodeGen.forVarDeclPrePass` with its caller, which are rung D's ("The rule the rungs keep"); under `interpreter/`, every file but `Evaluator.java`; the library; microGPT.

**Reserved points.** A model line. `f(x)^T` accepted on either path. A change of how an expression without a dot and without parentheses reassociates.

**Overlaps by file.** `parser/Expression.rats` with P: "The rule the rungs keep".

### C. The checker fixes two static arguments that it leaves open today: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value (rows 731 and 758)

**The mission.** The compiled checker infers a call's static arguments from its arguments, from the bound, and, for a call written as an argument, from the parameter type that receives it. Two forms of the model program fall outside that. A reduction with generators, `SUM[j <- 0#i] matCount(j)`, is desugared to a call whose first argument is the big operator's own call, `BIG +()`, with no arguments; where the operator's bound names its own parameter, as `SUM`'s does, that call has no instance, and the reduction is refused, so every such line writes `SUM[\ZZ32\]` (row 731). And a generic function passed as a value, as the model's `rows(rmsn, x)` would be with a sized `rmsn`, stops the checker with an internal error (row 758). You repair both.

**The decisions this rung builds.** P-78, whose written argument is row 731's workaround; P-51 and P-48, whose retry and bound stay for every call that they serve today; P-148 for your checker edit. Section 3's forks C1, C2 and R2.

**What you build, in order.** Each test is compiled under the prelude and seen failing on the base first.
1. **Row 731.** In `scala_src/typechecker/impls/Functionals.scala`, a big operator's call that is the first argument of a reduction's desugared call, and whose static parameter nothing fixes and whose bound gives no instance, is instantiated by the reduction's declared type where it has one that fits the bound, and else by the type of the reduction's body (fork C1). Tests: `compiler_tests/InferBigOperatorSelfBound.test`, from `compiler_tests/InferBigOperatorExpectedType.fss` with the big operator and its object bounded by a self-typed trait of the prelude, as the probe `P731b.fss` is: a reduction with a declared type; one without, whose body fixes it; one whose declared type and body differ, with the value that walk gives for the same program; a written argument, which still wins; a list comprehension under a declared `List[\E\]` if the prelude can write one. `compiler_tests/InferBigOperatorExpectedType` and `InferBigOperatorUnwritten` are guards. Walk reads a declared type only at a local variable and at a top-level or local function's return type (F-228): report each other place where your rule gives the reduction another type than walk gives the same program, with both values, and change nothing of walk. Seen failing on the base: "is not applicable to an argument of type ()".
2. **Row 758.** A reference to a generic function, where an arrow type is expected (an argument at a parameter of arrow type, a typed binding), is instantiated by that arrow type; the kind environment holds the function's own static parameters while its type is read. Tests: `compiler_tests/GenericFunctionAsValueCompiled.test`: the row's program prints its value; a function generic in a size, `half[\nat n\]`, at a parameter of a sized arrow type; a reference whose expected arrow leaves a parameter open, and one with no expected type, as at an untyped binding, each refused with a message and not a crash (walk runs both, rung F's fork F1, and rung F does not assert them); a typed local binding. Seen failing on the base: "F is not in the kind env [][][]". If this step does not fit, land step 1, and report what remains with row 758's whole new line.
3. **Runs to report, not gated tests:** the library's three sites that row 731 names and `explorations/run-c4/src/MicroGptFlat.fss:43`, each with its static argument removed in a scratch copy, under the distance stage's driver, on the base and on your tree.
4. **The whole compiled suite once,** `ant testFast`: your edit reaches every reduction and every function reference.
5. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 30's gate, 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Close 731. Close 758 if step 2 lands. Rows 716 and 817: a note only if a test of theirs changed.

**Specification.** Your change makes these false; bring them in line, and build the specification as the skill's `specification.md` gives it:
- `Specification/basic/expressions/reductions.tex:44-50`, in the box `revival-reductions`: "the compiled type checker ... takes the bound of the big operator's static parameter, which is not the element type, or, where the reduction's type at that bound does not fit the reduction's expected type, that expected type", and what follows it on a bound that mentions the parameter;
- the Effect of Appendix I's "Reductions whose element type nothing fixes", `Specification/appendices/changes.tex:1256-1264` and what the same entry says of a self-bounded big operator;
- the Effect of Appendix I's "The contexts that give a call an expected type" (`changes.tex:2434`), where it says that a self-bounded big operator is still refused; and the list of contexts in `Specification/basic/inference.tex`, "The Static Arguments of a Call", which gains the reference to a generic function where an arrow type is expected, if step 2 lands.

**Files.** `scala_src/typechecker/impls/Functionals.scala`: `checkApplicableWithInference`, `typedApplicationOfArg`, `retypedApplication` and the functional reference's case (`:1464`); `scala_src/types/TypeAnalyzer.scala`, `staticParam` and its callers; your tests; the specification's sentences named. A new member goes directly above the comment of the first `checkApplication` (`:616`). Not: `typedApplication`, `typedApplicationOfChecked` with its `numeralTie`, and the other declarations of `Functionals.scala` that are rung N's ("The rule the rungs keep"); `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`, which are rung D's; `interpreter/`; the library; the prelude; microGPT.

A change that your repair needs inside a declaration of rung N's, as the retry's call in `typedApplicationOfChecked` (`:787-789`), is reported with its program, not built. Rung N's declarations call `checkApplicableWithInference` (`:167`) and `retypedApplication` (`:789`): keep the two signatures as they are, so that the merged file compiles.

**Reserved points.** A model line. A library line or a team test unwritten (fork C2). A change of which declaration a call that is accepted today invokes.

**Overlaps by file.** `Functionals.scala` with N: "The rule the rungs keep".

### F. A generic function passed as a value under walk: it takes its static arguments from the arrow type that receives it, or at its first call (row 156)

**The mission.** The model's four vector functions, `rmsn`, `sm` and their backward forms, are passed to the row lift, `rows(rmsn, x)`. With sizes in their types they would be generic in a size, `rmsn[\nat n\](x: Vector[\RR64,n\])`, and under walk a function with static parameters cannot be passed: the value has no type, so the call fails with a unification error, a missing-type error or a Java `NullPointerException` (row 156). So the model declares them over unsized arrays. The specification makes a function a value and says that a reference to a generic function takes its static arguments from its context. You give walk that.

**The decisions this rung builds.** P-48 and P-12; P-87, which keeps the model's lines. Section 3's fork F1.

**What you build, in order.** Each test is seen failing on the base first.
1. **The value.** A generic function passed where a parameter or a typed variable of arrow type receives it is instantiated at that arrow type, the callee's own static parameters being fixed first from its other arguments; where the receiving type leaves a static parameter of the function open, or there is no receiving type, the value stays generic and is instantiated at its first application from the arguments' run-time types, as a direct call is (`EvaluatorBase.inferAndInstantiateGenericFunction`). No instance: the refusal that a direct call with those arguments gives. Tests: `tests/GenericFunctionAsValueWalk.fss`: row 156's three failures, each now with its value (the probe `P156.fss` is the first); a function generic in a type, in one size and in two; `app(half[\3\], v)`, which runs today, as a guard; an overloaded name one of whose declarations is generic. Every program of the test is one that the checker accepts after rung C: the receiving arrow type fixes each static parameter. A generic function bound to an untyped local and called at two sizes, and one whose receiving type leaves a parameter open, are runs to report, not tests: the checker refuses both (rung C, step 2), and walk runs them only for want of static types.
2. **The row lift.** In a test program of your own, not in `explorations/`: a `rows[\nat r, nat c\](f: Vector[\RR64,c\] -> Vector[\RR64,c\], m: Matrix[\RR64,r,c\])` called as `rows(half, m)`, the callee's `c` fixed by `m`.
3. **The whole walk suite once,** as the skill gives it: your edit reaches every call that passes a function.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 156. Rows 165 and 171: a note only if a test of theirs changed. Row 758 is rung C's.

**Specification.** No Effect of Appendix I and no note names row 156 (a grep on `main`). List each sentence your change makes false, or none.

**Files.** `interpreter/evaluator/values/Fcn.java`, `GenericFunctionOrConstructor.java`, `FValue.java` and the generic function classes beside them; `interpreter/evaluator/EvaluatorBase.java`, the check of an argument against a parameter type (`:941`) and `inferAndInstantiateGenericFunction`; in `OverloadedFunction.java` only what passing an overloaded name as a value needs, in the members from the inner class `Factory` (`:2777`) to the class's end, a new member going at the class's end; your tests. Not: the rest of `OverloadedFunction.java`, `bestMatch` and `bestMatchForNumerals` among it, `Coercions.java` and `Numerals.java`, which are rung N's; `Evaluator.java`, which is rung S's; `BuildEnvironments.java` and `LHSEvaluator.java`, which are rung B's ("The rule the rungs keep"); `scala_src/`; the library; microGPT.

**Reserved points.** A model line. A change of which declaration a direct call runs. A change of walk's open parameter (P-48).

**Overlaps by file.** `OverloadedFunction.java` with N: "The rule the rungs keep".

### B. An array literal with a declared type at the top level is an array under walk (row 142)

**The mission.** The model program holds two tables, the names and the shapes of its nine matrices, as chains of `if` in two functions, because under walk an array literal at the top level is not built into an array: with a declared type the binding fails against a tuple (row 142). In a function body the same literal is an array where it has a declared type, with numerals, names or expressions as its elements. You make the top level do what the body does for a literal with a declared type. A literal without a declared type stops in a function body with "Can't infer element type for array construction" (row 49); it is left out, at the top level too.

**The decisions this rung builds.** P-87; P-173 for the elements of a typed literal. Section 3's fork B1.

**What you build, in order.** Each test is seen failing on the base first.
1. **The binding.** In `interpreter/evaluator/BuildEnvironments.java`, `forVarDecl4` builds a top-level array literal that has a declared type as `LHSEvaluator.forLValue` builds a local one. Tests: `tests/TopLevelArrayLiteral.fss`: `shp: ZZ32[3] = [27 16 27]` and `shp[1]`; rank 2 with `;`, typed `ZZ32[3,2]`, and `shp[2,0]`; elements that are top-level names and expressions, as `[vocabSize nEmbd; (4 nEmbd) nEmbd]`, the names bound by a tuple binding above; a `String[9]`; a `Vector[\ZZ32,3\]`; a literal at a top-level `var`; a size that does not match its declared type, refused. No test of an untyped literal (fork B1): report what it does on your tree.
2. **The whole walk suite once,** as the skill gives it: your edit reaches every top-level variable.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 142; if the untyped top-level literal still binds a tuple of tuples, say so in row 142's close. Rows 49 and 104: a note only if a test of theirs changed.

**Specification.** No Effect of Appendix I and no note names row 142. `Specification/basic/variables.tex:16` and `aggregate.tex:15`, "matrix unpasting ... not yet supported", stay true. List each sentence your change makes false, or none.

**Files.** `interpreter/evaluator/BuildEnvironments.java`, `forVarDecl4` and what it calls; `interpreter/evaluator/LHSEvaluator.java` only to share its building code; your tests. Not: the compiled path, whose prelude has no array type; `Coercions.java` and `Numerals.java`, which `forVarDecl4` and `forLValue` call and which are rung N's; `Evaluator.java`, which is rung S's; `EvaluatorBase.java` and the function values under `interpreter/evaluator/values/`, which are rungs F's and N's ("The rule the rungs keep"); the library; microGPT.

**Reserved points.** A model line. A top-level tuple binding's behaviour, which rung D repairs on the compiled path. A change of the literal in a function body.

**Overlaps by file.** None with P, S, C, F, N or D.

### N. A numeral at a call goes to the most specific declaration that takes it, by its own conversion if need be, its default the last resort: `u = 0` is `true` for a zero `u` of `NN32`, on both paths (P-46, P-49, P-173)

**The mission.** A numeral has no value of its own when a program runs: it becomes a value of the type that its place fixes, or of its default. At a call, a numeral fits a parameter of type `Any` at its default, so the library's `=` over `(Any, Any)` took `u = 0` before `NN32`'s own `=` was tried, and answered `false`. The decision on record changes the rule for a numeral at a call (P-46, P-49). You build it.

**The decisions this rung builds.** P-46, P-49, P-173; P-174, P-168 and P-165, which stay; P-59 as fork W reads it; P-148 for your checker edit. Section 3's fork W at its default and forks N1 to N4.

**What you build, in order.**
1. **The checker.** In `scala_src/typechecker/impls/Functionals.scala`, a call with a numeral argument compares the attempt by subtyping with the attempt by the numeral's own coercion: the most specific applicable declaration runs; of two not ordered, the one that the numeral's default fits. A value's coercion stays as it is. Tests first, compiled, under the prelude:
   - `ProjectFortress/compiler_tests/NumeralMostSpecificCompiled.test`: `k(5)` for `k(x: Any)` beside `k(x: NN32)` prints `nn32` (today the run dies, 'NoSuchMethodError … \=k{…}(fortress.AnyType$Any)', row 390's numeral case); a program's `same(a: Any, b: Any)` beside `same(a: NN32, b: NN32)` on `(u, 0)` and `(0, u)`; `k(a)` for `a: Any` still runs the `Any` declaration; `gg(5, w)` of P-173 still runs the `ZZ32` declaration; `x^2` for `x: RR64` still runs the prelude's `RR64` power with a `ZZ32` exponent, the numeral a `ZZ32`, shown by a result that the `RR64` exponent's power would round otherwise or by the checked tree.
   - `ProjectFortress/compiler_tests/NumeralTieDefaultCompiled.test`: row 989's program prints `rr64` (today 'Ambiguous coercion in call to function mul').
   - `compiler_tests/NumeralStaticDesignCompiled` is a guard.
2. **Walk** (fork W). In `interpreter/evaluator/values/OverloadedFunction.java`, `bestMatchForNumerals` and what it calls follow the same rule, and the dispatch cache's keys tell apart what the rule tells apart. Tests first: `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss` promoted, the first with `h: QQ = 1/2`, `h = 0.5` and `0.5 = h` added (PLAN's line on the test owed); `tests/NumeralMostSpecificWalk.fss` with step 1's programs, a `case u of 0 => …` (row 975) and a program's own number type (row 976).
3. **The library.** `Equality[\T\]` in `Library/FortressLibrary.fss` and its api gains `=/=` (fork N3). Study first how the library's order traits give an operator beside a catch-all.
4. **The list.** Before step 1's edit lands in your tree, list the one library's overload sets where one position has a type that fixes no type for a numeral and another declaration has a number type other than the default's there, since each changes its choice. Report it. A changed choice on a model line is reserved.
5. **The model lines.** `explorations/compile-ladder/plan-31/probes/model-closure/run.sh check <out> <dir> NumeralLine.fss`, on the base and on your tree: three refusals, then none. It is a run to report, not a gated test.
6. **The whole suites** where the skill's `tests-running.md`, "When to run a whole suite", asks for them: your edits reach every call with a numeral on both paths.
7. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Read each with `ledger.py show N` first. Close 973, 966, 975, 976 and 989. Row 390's whole new line (fork N4).

**Specification.** Your change makes these false; bring them in line, and build the specification as the skill's `specification.md` gives it:
- `Specification/basic/conversions-coercions.tex:111-117`, "At a call, a numeral is applicable without coercion to a parameter of its default type and to a parameter of a type that fixes no type for it; its conversion into any other type is a coercion", and the example after it;
- the Effect of Appendix I's `revival-numerals`, `Specification/appendices/changes.tex:5286-5298`, the clause of rows 966 and 973, and the sentence on `=/=` near `:3813-3825`.

**Files.** `scala_src/typechecker/impls/Functionals.scala` and what it calls in `scala_src/typechecker/`; `interpreter/evaluator/values/OverloadedFunction.java`, `Coercions.java`, `Numerals.java`; `Library/FortressLibrary.fss` and `.fsi`, `Equality` only; your tests; the specification's sentences named. Not: `compiler/codegen/`, the prelude, microGPT; in `Functionals.scala`, the declarations that are rung C's ("The rule the rungs keep"); `scala_src/types/TypeAnalyzer.scala`, which is rung C's; `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`, which are rung D's; in `OverloadedFunction.java`, the members from the inner class `Factory` (`:2777`) to the class's end, which are rung F's; every other file under `interpreter/`; the signature of a public method of `Coercions.java` or `Numerals.java` that a file outside your list calls; the signature of `typedApplication`, `typedApplicationOfChecked`, `preDefault` or `defaultAtUnfixedEach`, which rung C's declarations call (`:641`, `:936`, `:198`, `:279`).

**Reserved points.** A model line. A change of what a value's coercion chooses. A change of the default. The three numeral lines inside `checkApplicableWithInference` of `Functionals.scala` are rung C's declaration: if the rule needs a change there, report it and do not build it.

**Overlaps by file.** `Functionals.scala` with C, and `OverloadedFunction.java` with F: "The rule the rungs keep".

### D. A top-level tuple binding on the compiled path: the checker types each name by its element, and the code generator declares each name (rows 988 and 474)

**The mission.** The model program binds its hyperparameters as tuples, `(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`, the form that the decisions on record keep for it (P-9). Under walk it runs. On the compiled path it stops under either library: 'Result of typechecking still contains intermediate nodes' (row 988); the checker types each such name so that it is accepted anywhere (row 474); and the code generator throws 'tupled lhs not handled' (`CodeGen.forVarDeclPrePass`).

**The decisions this rung builds.** P-9, P-87, P-173; P-148 for your checker edit. Section 3's forks D1 and D2.

**What you build, in order.**
1. **The checker** (rows 988 and 474). Each name of a top-level tuple binding has its element's type. Tests first: `ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled.test` (`compile`, `link`, `run`), from `explorations/compile-ladder/plan-31/probes/model-closure/TupleTopPlain.fss`: integers and floats, used in arithmetic; a typed binding; a right side that is a call; and a checker test, `z: String = headDim` refused, which row 474 says passes today.
2. **The code generator** (fork D1). Each name is declared as a top-level variable is; the right side is evaluated once.
3. **The model's lines.** `explorations/compile-ladder/plan-31/probes/model-closure/run.sh check` over `MicroGptFlat.fss`'s closure, as `model-closure-check.md` gives the command, before and after: lines 17 to 19. A run to report.
4. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Close 988 and 474.

**Specification.** List each sentence your change makes false, or none.

**Files.** `scala_src/typechecker/`, where top-level variables are typed (`Thunker.scala` and what it calls); `compiler/codegen/CodeGen.java`, `forVarDeclPrePass` and its caller; your tests. Not: the rest of `CodeGen.java`; `scala_src/typechecker/impls/Functionals.scala` and `scala_src/types/TypeAnalyzer.scala`, which are rungs N's and C's; walk; microGPT.

**Reserved points.** A model line. A change of how a single top-level binding or a local tuple binding is typed.

**Overlaps by file.** None with P, S, C, F, B or N.

### The rule the rungs keep, and how they meet

No two rungs edit one declaration. Each pair below was read on the base's code, `84f1c37190`. The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first; the hunks do not overlap in either order.

- **P and S share `parser/Expression.rats`, by production:** S owns `:380-680` (`PrimaryItem` through `Exponentiation`); P owns `:685-720` (the productions that use `Accumulator`). The gather's order is the script's: S before P. The parser's generated Java is built, never merged.
- **C and N share `scala_src/typechecker/impls/Functionals.scala`, by declaration:**
  - C: `checkApplicableWithInference` (`:185-292`); the first `checkApplication` and `typedApplicationOfArg` (`:616-648`); `retypedApplication`, `retypable` and `writesStaticArgs` (`:890-976`); in `checkExprFunctionals`, the functional reference's arm and the function application's arm (`:1464-1589`). A new member goes directly above the comment at `:616`.
  - N: `checkApplicable` (`:120-183`); `checkApplicableWithCoercion`, `isNumeral`, `numeralReading` and `checkApplicableWithoutInference` (`:294-547`); the second `checkApplication`, `typedApplication` and `typedApplicationOfChecked` with its `numeralTie` (`:650-888`); `signalAmbiguity` and the numeral members through `signalNumeralRanges` (`:978-1243`); in `checkExprFunctionals`, the operator's arm and the `case` expression's arm (from `:1591`). A new member goes directly above the comment of `isNumeralType` (`:998`).
  - `typedApplicationOfChecked` calls both rungs' code: the retry, `retypedApplication` (`:787-789`), which is C's, and `numeralTie` (`:882`), which is N's. Both calls stay where they are. C changes what the retry does inside its own function; N changes the attempts and the tie. A blank line or a comment stands between each two neighbouring parts, so the hunks do not touch.
  - Six calls cross between the two rungs' declarations. N's call C's `checkApplicableWithInference` (`:167`) and `retypedApplication` (`:789`). C's call N's `preDefault` (`:198`), `defaultAtUnfixedEach` (`:279`), `typedApplication` (`:641`) and `typedApplicationOfChecked` (`:936`). Neither rung changes the signature of one of the six, so that the merged file compiles; each section says so.
  - `inferFnExprParams` and `makeOverloadingError` (`:549-614`), `getCandidatesForMethod` and `getCandidatesForFunction` (`:1245-1367`), and the other arms of `checkExprFunctionals` are neither rung's: a rung that needs one reports it with its program and does not edit it.
- **C alone edits `scala_src/types/TypeAnalyzer.scala`. D alone edits `scala_src/typechecker/Thunker.scala` and `impls/Decls.scala`,** where top-level variables are typed, and `compiler/codegen/CodeGen.java`, in `forVarDeclPrePass` and its caller. D and C share no file, and D and N none.
- **N and F share `interpreter/evaluator/values/OverloadedFunction.java`, by member:**
  - N: the dispatch cache (`:99`); `applyInnerPossiblyGeneric` through `mostSpecificThroughOthers` (`:2246-2449`), `bestMatch` and `bestMatchForNumerals` among them; `convertedCall` (`:2581`); `argsMatchTypes` (`:2737-2751`). `Coercions.java` and `Numerals.java` are N's alone; N changes no signature of a public method of theirs that another file calls, since F's `EvaluatorBase.inferAndInstantiateGenericFunction` (`:90`) and B's `LHSEvaluator` call them.
  - F: the members from the inner class `Factory` (`:2777`) to the class's end (`make`, `compatible`, `typeApply`); a new member goes at the class's end.
- **F and B edit different files under `interpreter/evaluator/`.** S edits `Evaluator.java` there, which neither F, B nor N names. Each of the three sections' "Not" lists names the other rungs' files there, since "what it calls" in a "Files" line stops at them: B's `forVarDecl4` and `forLValue` call N's `Coercions.coerce`, and a typed variable that receives a function value is bound in B's two declarations, which F leaves as they are.
- **D and B meet on the top-level variable declaration, in different files:** D in the checker and the code generator, B in walk's `BuildEnvironments.forVarDecl4`. B changes nothing of a top-level tuple binding.
- **The specification's `appendices/changes.tex`, by entry:** N edits the Effect of `revival-numerals` (`:5286-5298`) and the sentence on `=/=` near `:3813-3825`; C edits `:1256-1264` and the entry at `:2434`. No sentence is edited by both. N alone edits `basic/conversions-coercions.tex`; C alone `basic/expressions/reductions.tex` and `basic/inference.tex`.
- **N alone edits the library,** `Equality` in `Library/FortressLibrary.fss` and its api.
- **Against climb batch 31,** if it has not landed: D keeps to `forVarDeclPrePass` and its caller in `CodeGen.java`, which that batch's rungs M, L, A, K and T edit elsewhere; in `appendices/changes.tex`, that batch's K and T name the entries at `:4312` and `:3204`, which neither C nor N edits.
- **They meet on the merged tree:** the suites, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks, 7 of 7 for both programs, which read P's and S's parser, F's function values, B's top-level bindings and N's rule under walk.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, candidate by candidate, with its home here. Each was reproduced on the base's code (PROBES, section 2).

- **Row 133,** `opr (m)^T` in an api: P. A one-line edit of the grammar made the probe run (PROBES, section 3).
- **Row 177,** `var p = e`: out. With the check gone, both paths ran the probe, but the check is the team's rule: the chapter and the check ask for the type, and only the appendix's grammar gives the form. The curator's question (section 2).
- **Row 5,** the sum's and the product's signs: P. The row has the sum's sign; the grammar's rule gives the product's beside it, and the other big operators are written with `BIG`, which parses today.
- **Row 84,** `p.wq^T`: S, with row 158, as one subject.
- **Row 158,** `(f(x))^T`: S. The compiled path runs the form today, so the repair is walk's alone, and its compiled test is a guard.
- **Row 156,** a function with a size parameter passed as a value: F. The compiled path needs row 758 for the same form: C, step 2.
- **Row 142,** a top-level array literal: B. The compiled path has no array literal before the switch-over (the skill's `compiler.md`), so the repair is walk's alone.
- **Row 731,** with row 758: C. They are two repairs in one rung (fork R2). P-78 with its history: the repair removes the need for the workaround and bends nothing (fork C1).
- **Row 50,** the array comprehension: out, the curator's question (fork R3).
- **Rows 989, 973 and 966,** the numeral at a call: N. **Rows 988 and 474,** the top-level tuple binding: D. Both moved from climb batch 31's record on 2026-11-15, at the curator's request. Their reproducers were run on the base's code by that record's check (`climb-batch-31-review.md`, section 5.2: `PPick3`, `PNumeralTie` and `TupleTopPlain`, each failing as the sections say) and are not run again.
- **Each repair test first, in the suite, on both paths where the gap is on both:** section 4.
- **The line of the model that each rung frees, before and after:** section 2, "The scope".
- **The measure:** section 2, "The measure".

### The planner's probes

`compile-ladder/plan-32/PROBES.md` holds each with its output: the base; each gap on the base's code, under walk and compiled; one trial build of three one-line parser edits; the sites by file and declaration; the briefing keys; the disk. Rung N's and rung D's are climb batch 31's: `compile-ladder/plan-31/PROBES.md` and `compile-ladder/plan-31/probes/model-closure-check.md`.

**Not run:** a suite, a stage, a timing, the model's quick checks.

### Rows filed by plan

None by this record's planner. Rows 988 and 989 were filed by climb batch 31's planner. Every defect met is in a row. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out". Their homes: rows 140, 141, 54 and 292, the curator's questions 2 to 4 and 6 of `reviews/c4-fortress-way-2026-11-15.md`; row 307, after the switch-over; rows 50 and 177, the curator's questions in section 2; row 49, no home yet; decision D, P-87 and P-85.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 30: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-32/manifest/` is the coordinator's, made from `plan-31/manifest/`:

- `BATCH` `32`, the folder `compile-ladder/climb-batch-32/`, the rungs P, S, C, F, B, N, D in that order;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- P's, S's, C's, N's and D's sections naming the two stages; F and B `STAGE_BLIND`;
- `--fork-w a|b`, the answer to fork W: the record is written for (a), and at (b) the generator makes the changes of its `W_B_RECORD` in a copy of the record and writes the block from that copy, as `plan-31/manifest/gen31.py` did.

### What every agent reads first

This run is climb batch 32, the one run of the record CLIMB-BATCH-32.md: the model's notation. The project's model program, microGPT, is written around gaps of today's tree: forms that the specification gives and that the parser, the interpreter or the compiled checker refuses. These rungs repair the gaps that need no decision, so that each line of the model can later be written in the specification's short form, and the two gaps of the compiled path that stop lines of the model as they are written today. No rung changes a line of the model program or of its helper file. Its rungs:

- P, two forms that the parser refuses: a postfix operator declared in an api, and the signs for sum and product as accumulators;
- S, a superscript after a dotted access, on both paths, and after a parenthesised call, under the interpreter;
- C, two static arguments that the compiled checker leaves open: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value;
- F, a generic function passed as a value under the interpreter;
- B, an array literal at the top level under the interpreter;
- N, a numeral at a call goes to the most specific declaration that takes it, on both paths, so that u = 0 is true for a zero u of NN32;
- D, a top-level tuple binding on the compiled path, the form of the model program's hyperparameters.

Each rung has tests that fail on the base and pass after, on both paths where the gap is on both. P and S share one grammar file by production, C and N the checker's file for calls by declaration, and N and F one file of the interpreter by member: each keeps to its own, as its section says. P, S, C, N and D run the count stage and the distance stage once on their final trees, C, N and D with the checker's timing; F and B run neither. microGPT's quick checks under the interpreter stay 7 of 7 for both programs. The gather applies the rungs in the script's order, builds the specification once, and runs the 52 team demos on the merged tree.

### Before the launch

The coordinator, after the curator's go:

1. **The order with climb batch 31.** If climb batch 31 has landed, sections 1 and 4 are read again against the landed tree: the line citations, D's part of `CodeGen.java`, and the gate's comparands, which are then climb batch 31's. **Fork W** is named to the curator: at (a), the record stands as written; at (b), the block is generated with `--fork-w b`.
2. **The Fable review of this record,** its changes in place.
3. **The script and the generator,** its checks and the splice, as the manual's "Before the launch", step 4, gives them. The base is `main`'s head after that commit.
4. **The base build:** `/home/user/fortress-base33`, if `git diff --stat 84f1c37190 <base> -- . ':!explorations' ':!docs'` prints nothing; else a new one; its trial seed and the old code's run.
5. **The disk:** 14.5 G or more free; `git status --porcelain` empty in the main tree.
6. **Check-ins** for about 10 hours, 45 minutes apart (`<scratchpad>/batch32/checkins.txt`).

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base33'}})`. The arguments are kept byte for byte.

### The gate, and what it should show

The comparands are climb batch 30's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-30/gate/`, or climb batch 31's if it landed first.

- `testSystem`: the comparand's count, with the new walk tests: P's two, S's two, F's one or two, B's one, N's one; N's two promotions keep the count.
- `testFast`: the compiler track's count plus P's two, S's guard and its row 84 test, C's two, N's two and D's one or two; the library track unchanged.
- The ladder: no rung declares a move. P's and S's grammar reaches every program, and N's rule every call with a numeral: a changed output is traced to its rung.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The atomic runs: the comparand's programs; no rung adds one.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each, with `git diff <base> -- explorations/run-c4 explorations/apl` empty.
- **The measure,** after the landing: 12 boxed gaps open before, 4 after; the lines are freed only by the curator's diffs.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Closed:** 133, 5 (P); 84, 158 (S); 731, and 758 if step 2 lands (C); 156 (F); 142 (B); 973, 966, 975, 976 and 989 (N); 988 and 474 (D). **Rewritten:** 390 (N). Row 177 stays open as it is; its class, an implementation gap of the parser, is the coordinator's to change once the curator has answered.

### After the landing

- **PLAN:** phase 5's line on row 731 (`PLAN.md:106`) answered by C; the demos' line (`:261`), row 731's demo half; a line for the model's notation with the diffs that wait for the curator's word; rows 140, 141, 54, 292, 307 and 50 with the questions that they wait on; phase 5's lines for the tuple binding and the model's line 82 (the plan review's 6.2, lines 2 and 3) answered by D and N.
- **The review queue:** this record's forks as new items, fork W among them with its one new difference between the paths; the question on row 50; one item for each diff of section 2, "The scope", for the curator's word (P-87); item 51, the probe of the checker's driver over the team demos, which C's landing changes.
- **The post-batch review.**

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After the landing, these are false:

- **P-78:** "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`": the checker fixes it; the decision's first two sentences stand.
- **P-79:** "and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)".
- **P-87:** nothing. P-87 names no row; the sentence "the phase 3 exit judgement places the checker's fix before microGPT compiles ... review-queue item 51 waits" is `PLAN.md:106`'s, which "After the landing" above lists.
- **F-59:** its title's second half, "and the compiled checker needs that argument written in every clause form", and the sentences on row 731; "the refusal is row 731's, and no test pins it".
- **F-221:** "an F-bounded one is still refused (row 731)".
- **F-285:** "while row 731's checker gap stays for user programs and the team demos"; the library's written sites stand.
- **P-46:** its sentence "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`"; and, for walk, "A value typed `Any` or `Number` fixes no type for the numeral beside it, which keeps its default", which gains walk's case (fork W). **P-173:** "rows 973 and 966 hold where walk departs".
- **P-59:** it gains the numeral's case, that walk's choice for a call with a numeral follows P-46 before the switch-over (fork W at (a)).
- F-349's sentence that walk's rule on a declaration that fits a numeral as it is "is apart from it".
- P-9's and PLAN's sentences that the tuple binding does not compile, if any names it; the entries that name rows 474, 988, 989, 973, 966, 975 and 976 as open.
- The entries that name rows 133, 5, 84, 158, 156, 142 and 758 as open, if any does by then: none does at `3fc1ac6e78` by a grep of FACTS and POSITIONS for those rows.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landing, the record-landing workflow's skill writer brings these in line (each at `84f1c37190`).

- `references/revival-changes.md`, "Reductions and comprehensions": "**Only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`.** The checker does not, because their bound names the parameter (row 731). Write it in every clause form of these four, as `SUM[\ZZ32\][j <- 0#n] f(j)`." (C)
- `references/library.md`, the item on `SUM` and `PROD`: "Write the element type wherever generators stand in brackets, also where the generators, the body or a declared type fix it: `SUM[\ZZ32\][j <- 0#n] f(j)`. The checker refuses a call without it (ledger row 731)." (C)
- `SKILL.md`, "Parallelism and mutable state": "`x = e` declares an immutable variable. `var x: T = e` and `x: T := e` declare a mutable one": true still, since `var x = e` stays refused.
- `references/revival-changes.md`, "Static parameters, `where` clauses and sizes", and `references/interpreter.md`, where walk's handling of a generic function is given: no sentence says that a generic function cannot be passed; one that says how walk instantiates a generic function at a call gains the value's case (F), if the writer judges it a rule.
- `references/compiler.md`, "What the compiled path cannot compile yet": no sentence names rows 758, 84 or 133; a sentence that advises single bindings for a top-level tuple, if one stands by then (D).
- `references/revival-changes.md`, "Numbers": "Under walk it is `false` (row 973): bind the numeral at the value's type first, as `z: NN32 = 0`, then write `u = z`." (N, with fork W at (a))
- `references/revival-changes.md`, "Numbers": "Where the tied declarations differ only at the positions of the call's numerals, both paths read the numeral as its default.": the tie also holds where they differ elsewhere (N).
- `references/revival-changes.md`, "Dispatch and overloading" and `SKILL.md`, "Fortress as a language": "A conversion never changes which declaration runs when one already fits.": a numeral's own conversion does (N).
- `references/interpreter.md`, walk's departures from "Numbers": the items of rows 973, 966, 975 and 976 (N, with fork W at (a)).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-31.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-31.md), [the review of C4's limits](https://github.com/palimondo/fortress/blob/main/explorations/reviews/c4-fortress-way-2026-11-15.md), [PROBES.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-32/PROBES.md), [the probe programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-32/probes), [decision-d-diff.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/decision-d-diff.md), [the check of climb batch 31's record](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-31-review.md), [the numeral ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/numeral-equality-ways-2026-11-10.md), [the model's closure check](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/model-closure-check.md), [climb batch 31's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/PROBES.md).
- The model: [MicroGptFlat.fss](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/MicroGptFlat.fss), [FlatArrays.fss](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/FlatArrays.fss), [FlatArrays.fsi](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/FlatArrays.fsi).
- Code: [Parameter.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Parameter.rats), [Symbol.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Symbol.rats), [Expression.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Expression.rats), [SyntaxChecker.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java), [LHSEvaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java), [Fcn.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Fcn.java), [EvaluatorBase.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [Thunker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss).
- Specification: [reductions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/reductions.tex), [comprehensions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/comprehensions.tex), [defining-generators.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/parallelism-locality/defining-generators.tex), [juxtameaning.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/operators/juxtameaning.tex), [variables.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/variables.tex), [aggregate.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/aggregate.tex), [var-ref.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/var-ref.tex), [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex), [conversions-coercions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/conversions-coercions.tex).
