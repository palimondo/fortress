<!-- The record of climb batch 32, in one run, for the coordinating session, the curator and the batch's workers: the model's notation, that is the gaps of today's tree that keep a line of microGPT's flat program (C4, `explorations/run-c4/src/MicroGptFlat.fss`) or of its helper file (`FlatArrays.fss`) from the form that the specification allows. Drafted 2026-11-15 by a planning worker on Fable against `main` at `3fc1ac6e78`, whose code is the base build's, `/home/user/fortress-base33` at `84f1c37190` (`git diff --stat 84f1c37190 main -- . ':!explorations' ':!docs'` prints nothing). It proposes five rungs in one run: P, S, B, F and C. **The batch has no go. It is planned beside climb batch 31, which is planned and not launched; the curator chooses the order of the two. This record launches nothing.** It has no fork that must be answered before a launch, one question for the curator that a later run hangs on (array comprehensions, row 50, section 2), and twelve forks with defaults (section 3). No rung changes a line of the model program or of its helper file: the diffs that each rung makes possible are listed for the curator (section 2), and applying them is his word, after the landing (P-87). -->
<!-- Sources: the planner's brief (`<scratchpad>/batch31/planner-32-brief.md`), with the curator's words of 2026-11-15; `reviews/c4-fortress-way-2026-11-15.md`, the review of each limit, whose section 1 is the list of limits; `CLIMB-BATCH-31.md`, for the form and for what the two batches share; POSITIONS P-87, P-78, P-51, P-48, P-55, P-9, P-12, P-26, P-79, P-148, P-173; FACTS F-53, F-59, F-221, F-285; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the specification and the code at the sites. -->
<!-- The planner's probes: `compile-ladder/plan-32/PROBES.md`, with their programs in `compile-ladder/plan-32/probes/`, run in a worktree of the planner's own, `/home/user/fortress-plan32`, seeded from the base build and removed after. No suite and no stage of the gate was run. -->

# Climb batch 32

## 1. The manifest, rung by rung

The batch's generator writes the run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. The one run, climb batch 32, holds P, S, C, F and B in that order. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-32.md#`, REV for `doc:explorations/reviews/c4-fortress-way-2026-11-15.md#`, PRB for `doc:explorations/compile-ladder/plan-32/PROBES.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main` (PROBES, section 5).

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | P | `rung-parser-declarations` | Three forms that the grammar gives and the parser refuses | 200 |
| 1 | S | `rung-superscript-after` | A superscript after a dotted access and after a parenthesised call | 200 |
| 1 | C | `rung-static-argument-inferred` | Two static arguments that the checker leaves open today | 240 |
| 1 | F | `rung-generic-function-value` | A generic function passed as a value under walk | 220 |
| 1 | B | `rung-toplevel-array-literal` | An array literal at the top level under walk | 150 |

Fields common to the five rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-parser-declarations`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none, but the specification's build at the gather, for C's text. **expected moves:** none.
- **lands only with:** none. Every rung lands on its own.
- **its test is the stage:** no. **the stages:** P, S and C run the count stage and the distance stage once on their final trees: P and S because both measures read the library through the parser that they edit, C because it edits the checker, with the checker's timing (P-148). F and B edit files under `interpreter/` only, run neither and list their files (`STAGE_BLIND`).
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 30's gate left them (F-53). **expected checker crash:** none.

### P
- **slug:** `rung-parser-declarations`
- **worktree:** `/home/user/fortress-parser-declarations`
- **section:** `P. Three forms that the grammar gives and the parser refuses: a postfix operator declared in an api, a mutable local without its type, and the signs for sum and product as accumulators (rows 133, 177 and 5)`
- **blurb:** three gaps of the parser, each a form that the specification's grammar gives. An api cannot declare a postfix operator whose sign is an exponent operator, as opr (m)^T, because the api's rule lacks one alternative that the component's rule has (row 133). A mutable local without its type, var p = e, is refused by a check after the parse, though both paths run it once the check is gone (row 177). The signs for sum and product, U+2211 and U+220F, are read as prefix operators and never as accumulators, so only the ASCII SUM and PROD begin a reduction (row 5). The rung repairs the three on both paths, since both read the same parser.
- **points to report:**
  - Each form failing on the base and passing after, under walk and compiled.
  - Row 5: the productions changed; what a program that declares or applies U+2211 or U+220F as an operator of its own meets after the change; every existing test or library line that the change reaches.
  - Row 177: every form of a mutable local without its type that you tried (a numeral, a call, a tuple of names, an array literal), with what each path does; a form that still fails, with its row.
  - Every existing test whose pinned message changed; every line of a team test changed.
  - The count and distance tables on your final tree, and the commit they ran on.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (14 keys, 10 checks):
  - P-87 (check): no line of the model or of its helper file changes in this batch.
  - P-173: the default type that a numeral takes at an untyped binding, which `var p = 3` meets.
  - ledger:133 (check): the api's rule, which closes.
  - ledger:177 (check): the check that refuses the untyped mutable local; its `:=` half is the grammar's and stays.
  - ledger:5 (check): the sum sign as a prefix operator, which closes.
  - ledger:166: the `null` before the file name in the message, a neighbour that is not yours.
  - PRB `3. One trial build` (check): what a one-line edit of each site gave, and what it left for row 5.
  - SPEC `basic/expressions/reductions.tex#Summations and Other Reduction Expressions` (check): the accumulator's grammar.
  - SPEC `basic/variables.tex#Local Variable Declarations` (check): the local declaration's forms.
  - SRC `parser/Parameter.rats#FnHeaderFront AbsOpHeaderFront` (check): the api's rule.
  - SRC `parser/Parameter.rats#FnHeaderFront OpHeaderFront`: the component's rule, the precedent.
  - SRC `parser/Symbol.rats#transient Op Accumulator` (check): the accumulator.
  - SRC `parser_util/SyntaxChecker.java#public void forLocalVarDeclOnly` (check): the check.
  - `map:modules-and-phases.md#B.2 Rats! parsing`: how the grammars are built and what a grammar edit makes stale.

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
- **briefing** (12 keys, 10 checks):
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

### C
- **slug:** `rung-static-argument-inferred`
- **worktree:** `/home/user/fortress-static-argument-inferred`
- **section:** `C. The checker fixes two static arguments that it leaves open today: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value (rows 731 and 758)`
- **blurb:** two places where the compiled checker has no instance for a static parameter that the program's text fixes. In a reduction with generators that writes no static argument, as SUM[j <- 0#i] f(j), a big operator whose bound names its own parameter has no instance at its bound, and the reduction is refused (row 731); the rung fixes the argument from the reduction's declared type, else from its body. A generic function passed as a value, as useOne(count), stops the checker with an internal error (row 758); the rung instantiates the reference at the arrow type that receives it. The first frees the model's line 43; the second is the compiled half of the model's row lift, whose walk half is rung F.
- **points to report:**
  - The rule as built for the reduction: what fixes the static argument, in which order, and what the checker answers where the declared type and the body's type differ; the same program under walk.
  - The rule as built for the function reference: where the arrow type comes from, what happens where it leaves a static parameter open, and an overloaded name whose declarations are generic.
  - Row 731's reproducer and row 758's, failing on the base and passing after; the library's three written sites and the model's line 43 with the argument removed, under the distance stage's driver, as runs to report.
  - Every existing test whose verdict, output or pinned message changed.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification changed, before and after; each sentence your change makes false that this section does not name.
  - Step 2 not landed: what remains, and row 758's whole new line.
  - A file edited beyond those named.
- **briefing** (21 keys, 14 checks):
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

### F
- **slug:** `rung-generic-function-value`
- **worktree:** `/home/user/fortress-generic-function-value`
- **section:** `F. A generic function passed as a value under walk: it takes its static arguments from the arrow type that receives it, or at its first call (row 156)`
- **blurb:** under walk a function with static parameters has no type as a value, so passing it as an argument fails at the call with a unification error, a missing-type error or a Java NullPointerException (row 156). The specification says that a reference to a generic function takes its static arguments from its context. The rung gives such a value a type under walk: it is instantiated at the arrow type of the parameter that receives it, and where that type leaves a static parameter open, at its first application, as a direct call is today.
- **points to report:**
  - The rule as built: when the value is instantiated, from what, and what walk answers where no instance fits.
  - Each of row 156's three failures, failing on the base and passing after; a function generic in a type, in one size and in two sizes; an overloaded name with a generic declaration; a generic function bound to a local variable and then called.
  - The row lift with sized functions: `rows(rmsn, x)` for `rmsn[\nat n\](x: Vector[\RR64,n\])` and a `rows` whose arrow parameter is sized, in a test program of your own.
  - Every existing test whose verdict, output or pinned message changed.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (14 keys, 8 checks):
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
  - SRC `interpreter/evaluator/EvaluatorBase.java#static Simple_fcn inferAndInstantiateGenericFunction(List<FValue> args,` (check): how a direct call fixes the static arguments.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: where walk binds and applies.

### B
- **slug:** `rung-toplevel-array-literal`
- **worktree:** `/home/user/fortress-toplevel-array-literal`
- **section:** `B. An array literal at the top level is an array under walk, with its declared type or without one (row 142)`
- **blurb:** under walk an array literal that is the value of a top-level variable is never built into an array: with a declared type the binding fails with a type mismatch against a tuple, and without one the name holds a tuple of tuples (row 142). In a function body the same literal is built. The rung builds it at the top level too, so that a table of the model can be a literal.
- **points to report:**
  - Row 142's four probes and the untyped form, failing on the base and passing after; a literal of rank 1 and 2, of numerals, of names and expressions, of strings; a literal at a `var` top-level variable.
  - What an untyped top-level literal's type is, and whether it differs from the same literal's in a function body.
  - Every existing test whose verdict, output or pinned message changed; a top-level binding of a pasted tuple that a program relied on.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (10 keys, 7 checks):
  - P-87 (check): no line of the model changes.
  - P-173 (check): where a numeral converts, which the elements of a typed literal meet.
  - ledger:142 (check): the binding, which closes.
  - ledger:49: a sibling on the array literal.
  - ledger:104: a sibling on the array literal.
  - SPEC `basic/expressions/aggregate.tex#Array Expressions` (check): the literal and its type.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): the top-level declaration.
  - SRC `interpreter/evaluator/BuildEnvironments.java#private void forVarDecl4` (check): the top-level binding.
  - SRC `interpreter/evaluator/LHSEvaluator.java#public Voidoid forLValue(LValue x)` (check): the body's binding, the precedent.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: how walk builds a component's environment.

## 2. For the curator

### The words this record uses

- **The model** is microGPT's flat program, `MicroGptFlat.fss`. **The helper file** is `FlatArrays.fss`, the array operations that the model's lines call.
- **Walk** is the interpreter. **The compiled path** checks types with **the checker**, then writes JVM bytecode. The model runs only under walk today.
- **The parser** reads the source text. Both paths use the same one.
- **An api** is an interface file. The helper file has one, `FlatArrays.fsi`.
- **A gap** is a form that the specification gives and that today's tree refuses. **A row** is a gap's entry in the ledger.
- **A rung** is one repair, built by one worker and checked by a second. **A run** is one launch of the batch workflow.
- **A static argument** is a type or a size written in white brackets, as the `ZZ32` in `SUM[\ZZ32\]`.

### The go

You asked for the notation's gaps to come first. This batch is planned and has no go. Nothing here launches.

### Your choices

- **The order of this batch and climb batch 31.** Either order works. Each batch is written against the same code. The second to launch has its sections read again against the first one's landed tree. They share one file of the checker and no line of it (below, "What it shares with climb batch 31").
- **Array comprehensions (row 50): one question.** The specification has the form `[(i, j) ↦ e | i ← 0#n, j ← 0#m]`. It would be the form of the model's `mask` and of the helper file's `gather`, `onehot` and `pick`. The specification's text does not say how large the array is. It rewrites the form to `a = array()` and a row of assignments, with no size. So I left it out. The ways:
  - **(a) Leave it out for now.** `mask`, `gather`, `onehot` and `pick` stay as they are. Cost: nothing.
  - **(b) The size comes from the declared type.** `mask: RR64[16,16] = [(i, j) ↦ ... ]`. This is how the plain array literal works today. It needs sized types in the model, which is your open decision D. About 2 rungs.
  - **(c) The size comes from the generators.** Where each index is a plain loop variable over a range, the array spans those ranges. Any other shape needs a declared type. This serves today's unsized lines. It is a rule of ours, written into the specification. About 2 rungs.
  - **Recommended: (a) now, and (c) or (b) with your answer on static sizes** (question 3 of the review). The two questions decide each other.
- **The diffs to the model.** No rung changes a model line. Each rung makes a diff possible. They are listed below. Applying each is your word, after the landing (P-87).

### The scope: one run, five rungs

Each rung is given as the line of the model that it frees, before and after, and a program that fails today.

- **P, three forms that the parser refuses.**
  - *`^T` declared in the helper file's api (row 133).* Lines 21 to 24 leave the model:

        - opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\] = transpose(m)
        - opr (t: Array3[\RR64,0,a,0,b,0,c\])^T[\nat a, nat b, nat c\]: Array3[\RR64,0,a,0,c,0,b\] = transpose(t)

    and stand once in `FlatArrays.fsi`. Fails today, in an api: `Syntax Error`.

        api A
        opr (x: ZZ32)^T: ZZ32
        end

  - *A mutable variable without its type (row 177).* Lines 88 to 90:

        - p: Array[\RR64,ZZ32\] := loadParams(weightsDir, matName, 9, nParams())
        + var p = loadParams(weightsDir, matName, 9, nParams())

    and the same for `m` and `v`. Fails today: `The type of p is required.`

        run(): () = do
            var p = 3
            p := p + 1 end

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

**Why one run.** No two rungs edit one declaration. P and S share one grammar file in productions 200 lines apart. C alone edits the checker. F and B edit different files of walk.

**Why five rungs and not nine.** The parser's three small forms are one rung, because each grammar edit costs a full rebuild. The checker's two inferences are one rung, because both are in one file. The two `^T` gaps are one rung, because they are one subject.

### The measure

Two counts, from the review's section 1.

- **Boxed limits of the walk-through that are gaps and still open. Before: 12.** They are the tuple bindings (row 988), the unsized vector functions (156), `^T` in the model (133), the `if` chains (142), `SUM[\ZZ32\]` (731), the sizes through `reflect` (307), the rank-3 product (292), `transpose(onehot(...))` (158), `1.0 s` (989), the type on a mutable variable (177), the float reader and line scanner (140, 141), and `SUM` in capitals (5).
- **After this batch: 5.** Seven close: rows 156, 133, 142, 731, 158, 177 and 5. Of the five left, climb batch 31 closes two (988 and 989). Three wait on your decisions or on the switch-over (307, 292, 140 with 141).
- **Lines that an open gap shapes. Before: 20 of the model's 98, and 14 of the helper file's 190.**
  - The model: lines 21 to 24, 27, 28, 30, 34, 37 to 41, 43, 45, 52, 70, 88 to 90.
  - The helper file: lines 47 to 51 (`transpose` as functions), 64, 95 and 108 (`reflect`), 142, 148, 154 and 160 (the row lift's unsized functions), 181 and 182.
- **After, once you apply the diffs: 1 of the model's lines** (line 45, `reflect`) **and 3 of the helper file's** (the three `reflect` lines). Without decision D, the four vector functions and the four row-lift lines stay: 5 and 7.
- Lines 17 to 19 and line 82 are not in the count. Their text is already the short form. Only the compiled path refuses them, and climb batch 31 repairs that.
- The checker's count and the distance stay 0 and 0 (F-53). microGPT's quick checks under walk stay 7 of 7 for both programs, with no line of either changed.

### What it shares with climb batch 31

- **`Functionals.scala`, the checker's file for calls.** Batch 31's rung N edits how a call with a numeral chooses its declaration (`typedApplication`, `typedApplicationOfChecked`, `numeralTie`). This batch's rung C edits how a call's static arguments are inferred (`checkApplicableWithInference`, `typedApplicationOfArg`, `retypedApplication`, the functional reference's case). `typedApplicationOfChecked` calls both. No line is edited by both as planned.
- **Walk's `OverloadedFunction.java`.** Batch 31's rung N edits `bestMatchForNumerals` there. This batch's rung F may edit how an overloaded name with a generic declaration is passed as a value. Rung F keeps out of `bestMatchForNumerals`, `Coercions.java` and `Numerals.java`.
- **The top-level variable declaration.** Batch 31b's rung D repairs the tuple binding in the checker (`Thunker.scala`) and the code generator (`forVarDeclPrePass`). This batch's rung B repairs the array literal in walk (`BuildEnvironments.forVarDecl4`). Same construct, different paths, no shared file.
- **`label` and `exit` (batch 31's rung L):** nothing shared. No rung here edits the code generator.
- **Does the order matter?** No. Whichever batch launches second is read again against the first one's landed tree, and its base build is made new. If both were launched from one base at once, the two edits of `Functionals.scala` would have to be merged by hand; the workflow runs one batch at a time, so this does not arise.

### The forks you may want to see

No fork of section 3 is consequential by the `coordinator` skill's rule. Each lands at its default and goes on the review list. Three that you may want first:

- **Fork C1, what fixes a sum's type in the checker.** Walk takes the declared type that receives the sum, and else the type of its elements. The checker will do the same: the declared type first, else the body's type. So `x: RR64 = SUM[j <- 0#n] f(j)` sums in `RR64` on both paths. This does not bend your decision P-78. P-78 says that the argument is written "where nothing at the call fixes the element type", and calls the checker's refusal a gap with a workaround. The repair removes the need for the workaround. The library's own written sites stay as they are.
- **Fork P1, `∑` and `∏`.** After the repair, `∑` at the start of an expression is the sum's sign, exactly as `SUM`. A program can no longer use `∑` as a prefix operator of its own. No program or library file in the tree does.
- **Fork S1, `a.m(x)^T`.** A superscript after a method call with a dot applies to the call's result. The specification says that a form with a dot is read from left to right. `f(x)^T`, without a dot, stays refused.

### What the batch leaves out

- **Any change to a line of the model or of the helper file** (P-87).
- **The layout of the parameters, static sizes, decision D, and which helper operations move into the library:** your decisions, questions 2 to 4 and 6 of the review.
- **The library rungs that hang on them:** the float reader (row 140), the line scanner (141), a slice as a vector (54), the rank-3 product (292).
- **Sizes made from a number at run time, compiled (row 307):** after the switch-over, or never if the sizes become static.
- **Array comprehensions (row 50):** your question above.
- **The language's own rules:** a call followed directly by `^T` (row 144), `/` on two integers (174), a variable as a size (25). I found no reason to call any of them a gap.

### Before the batch runs

- **Your go.**
- **The Fable review of this record** (`references/batch.md`, "The go").
- **The manifest's generator,** `compile-ladder/plan-32/manifest/`, made by the coordinator from `plan-31/manifest/` with this record's values.
- **The base build:** `/home/user/fortress-base33` at `84f1c37190`, if this batch runs first. If climb batch 31 lands first, a new base build at its landing, and sections 4's line citations read again.
- **The disk.** The script stops under 1.5 G a rung plus 4 G: 11.5 G for five rungs. Free on 2026-11-15: 16,670,680 KB by `df -P /home/user`, about 15.9 G.

### Cost

- **About 4.6M tokens written, from 3.7M to 5.9M; about 7 hours at two agents at a time.**
  - Workers, about 2.1M: C 0.6M, F 0.5M, P 0.4M, S 0.4M, B 0.2M. Skeptics, about 1.1M; C's runs the count stage itself.
  - The fixed roles, about 1.1M: the disk check, the gather with five rungs and one specification build, the merged-diff review, the gate, the commit stage. A judge and a repair round, about 0.3M.
  - Minutes: C 240, F 220, P 200, S 200, B 150.
- **The evidence.** Climb batch 30's three rungs and fixed roles wrote 3.13M. Every agent runs on Fable at medium effort (`FABLE_WEEK`).

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential forks

None that a launch waits on. One question is the curator's and is not taken: whether array comprehensions (row 50) are built, and by which rule for the array's size (section 2, "Your choices"). It chooses among ways that the specification's text leaves open and that decide the form of model lines, so it is consequential; its default, (a), builds nothing and reverses nothing.

### Forks the batch takes

None of the forks below is consequential: each builds within a decision on record or the specification's text, or chooses where the record leaves an implementation open, and each can be undone.

1. **R1. One run of five rungs.** **Default: so.** Ways not taken: nine rungs, one a row, which the disk floor does not hold (17.5 G) and which pays a grammar rebuild and a skeptic four times for one-line repairs; two runs, which nothing needs, since no two rungs share a declaration. The reason: `references/batch.md`, "The go".
2. **R2. Row 758 is in the batch, as rung C's second step.** Rows 731 and 758 are not one repair. They are one rung because both are in `Functionals.scala`, in the code that infers a call's static arguments. **Default: so; step 2 lands if it fits, and else the rung lands step 1 and reports.** Way not taken: 758 in a second run of one rung, about 1.0M of fixed roles for it.
3. **R3. Row 50 is left out** until the curator's answer. **Default: so.** The text gives the form and the desugaring, `do a = array(); a[i1] := e1, gs1; ...; a end` (`Specification/advanced/parallelism-locality/defining-generators.tex:241-266`), and says that the comprehension need not define every cell (`Specification/basic/expressions/comprehensions.tex:15-19`). It leaves open: the array's size and lower bounds, since `array()` takes none; its element type and its static type for the checker; and its two notations, `↦` in the chapter and `=` in the overview (`Specification/preliminaries/overview.tex:974-990`).
4. **P1. The signs U+2211 and U+220F are accumulators wherever `SUM` and `PROD` are,** in an expression and in an operator's declaration, and are no longer prefix operators. **Default: so.** The reason: the specification's grammar, `Accumulator ::= ∑ | ∏ | BIG (Encloser | Op)`; `Operators.java` already names them `SUM` and `PROD`. The other Unicode big operators that the grammar reads through `BIG` are not touched.
5. **P2. `var p = e` takes the type of `e`,** a numeral its default (P-173). **Default: so.** The reason: `LocalVarDecl ::= [var] VarMayTypes = Expr`; both paths already run it once the check is gone (PROBES, section 3). The `:=` form without a declaration stays refused: the grammar asks for a type there.
6. **P3. An untyped mutable local whose value is an array literal** stops under walk with "Can't infer element type for array construction" (PROBES, section 3). **Default: P reports it; a row of its own if no row holds it; not repaired here.**
7. **S1. A superscript after any dotted primary applies to the whole primary to its left,** a method call's result included. **Default: so.** The reason: "A tight juxtaposition is always left-associated if it contains any dot" (`Specification/basic/operators/juxtameaning.tex:128-129`).
8. **S2. `f(x)^T` stays a static error on both paths** (row 144). **Default: so; S's tests pin it.**
9. **C1. The checker fixes a reduction's unwritten static argument by the reduction's declared type where it has one that fits the bound, and else by the type of its body.** **Default: so.** Way not taken: the body's type first, which is the specification's plain sentence ("a sum is desugared with the reduction for the type N of the expression") and which would sum `x: RR64 = SUM[j <- 0#n] f(j)` in `ZZ32` when compiled and in `RR64` under walk. The reason: walk's rule as landed (F-59), and one answer on both paths. P-78 is not bent: its written argument is row 731's workaround by its own words, and its history shows the workaround entering with the gap (`POSITIONS-history.md`, P-78, the blocks of 2026-10-22).
10. **C2. No library line and no test is unwritten.** The library's sites keep their static arguments (F-285), and so do the team's tests. **Default: so.** The team demos that leave the argument out (P-79) then need no respelling: C reports which of them the checker now accepts, if its probe reaches them.
11. **F1. Under walk a generic function value is instantiated at the arrow type of the parameter or variable that receives it; where that leaves a static parameter open, it stays generic and is instantiated at its first application from the arguments' run-time types,** as a direct call is. **Default: so.** The reason: `var-ref.tex`, "the static arguments are statically inferred from the context"; walk has no static types (P-12), so the context it has is the receiving type and the call.
12. **B1. An untyped array literal at the top level is the array that the same literal is in a function body.** **Default: so.** The reason: `aggregate.tex`, "Array Expressions"; one meaning for one form.

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation is the base build's, `84f1c37190`. The record's forks are section 3's. The reproducers are in `explorations/compile-ladder/plan-32/probes/`; a test is written new in the test folders, and no file is moved from there. No rung edits `explorations/run-c4/` or `explorations/apl/`.

### P. Three forms that the grammar gives and the parser refuses: a postfix operator declared in an api, a mutable local without its type, and the signs for sum and product as accumulators (rows 133, 177 and 5)

**The mission.** The parser is shared by walk and the compiled path. Three forms that the specification's grammar gives are refused before either path sees them, and each one shapes lines of the model program: the model declares `^T` itself because its helper file's api cannot; its three mutable variables carry types that nothing else needs; and its sums are written `SUM`. You repair the three, each on both paths.

**The decisions this rung builds.** P-87, which keeps the model's lines as they are. Section 3's forks P1, P2 and P3.

**What you build, in order.** Each test is seen failing on the base first.
1. **Row 133.** In `parser/Parameter.rats`, `AbsOpHeaderFront` takes what `OpHeaderFront` takes after its value parameter: `Op`, `ExponentOp` or a caret. Tests: `ProjectFortress/tests/ApiPostfixExponentOp.fss` with its api and component beside it, as the probes `P133Api.fsi`, `P133Api.fss` and `P133.fss` are, the operator declared in the api, defined in the component and applied in the importing program, on a plain value and with static parameters as the model's `opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]` has them; and a compiled test of the same shape under the prelude, `ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiled.test`. Seen failing on the base: `Syntax Error` at column 1 of the line after the declaration.
2. **Row 177.** In `parser_util/SyntaxChecker.java`, `forLocalVarDeclOnly` asks for a type only where the grammar does: a declaration without a right side. Tests: `tests/MutableLocalUntyped.fss` and `compiler_tests/MutableLocalUntypedCompiled.test`: `var p = 3`, then `p := p + 1`, prints 4; a call's result; a tuple of names; an assignment of another type refused as for a typed variable; `p := e` without a declaration still refused. Report every form that still fails (fork P3).
3. **Row 5.** U+2211 and U+220F begin a reduction wherever `SUM` and `PROD` do, with and without a static argument and a generator clause list, and name the same operators in a declaration (fork P1). The alternative in `parser/Symbol.rats` alone is not enough (PROBES, section 3): find where the sign is taken as an operator first. Tests: `tests/SumSignAccumulator.fss`, each form of `tests/` that `SUM` and `PROD` take, written with the signs, with the same values; a compiled test under the prelude with the prelude's own sum.
4. **The whole suites** where the skill's `tests-running.md`, "When to run a whole suite", asks for them: a grammar edit reaches every program on both paths.
5. **The stages,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`.

**Rows.** Read each with `ledger.py show N` first. Close 133 and 5. Row 177: close it if every form of step 2 runs; else its whole new line.

**Specification.** No Effect of Appendix I and no note names these rows (a grep of `Specification/` on `main`). List each sentence your change makes false, or none.

**Files.** `parser/Parameter.rats`, `AbsOpHeaderFront` and the operator headers at `:116-131`; `parser/MethodParam.rats:62`, `:82`; `parser/Symbol.rats`, `SUM`, `PROD`, `Accumulator`; `parser/Expression.rats:685-720` and `parser/NoNewlineExpr.rats:35`, the productions that use `Accumulator`; `parser_util/SyntaxChecker.java`, `forLocalVarDeclOnly`; your tests. Not: `parser/Expression.rats:380-680`, which is rung S's; the library; microGPT.

**Reserved points.** A model line. A program or a library line that reads U+2211 or U+220F as an operator of its own. A change of what `SUM` or `PROD` in ASCII parses to.

**Overlaps by file.** `parser/Expression.rats` with S: "The rule the rungs keep".

### S. A superscript after a dotted access and after a parenthesised call: `p.wq^T` parses on both paths, and walk runs `(f(x))^T` (rows 84 and 158)

**The mission.** A superscript is an exponent, as `^2`, or a postfix exponent operator, as the model's `^T`. The specification reads a tight juxtaposition with a dot from left to right, so `p.wq^T` is `(p.wq)^T`; the grammar as built gives a dotted form no place for a superscript, and both paths stop with a bare `Syntax Error` (row 84). And where a call stands in parentheses, `(f(x))^T`, the specification makes it an expression that an exponent may follow; the compiled path runs it, and walk refuses it as it rightly refuses `f(x)^T` (row 158). The model writes `transpose(onehot(...))` in one line for this reason.

**The decisions this rung builds.** P-87. Section 3's forks S1 and S2.

**What you build, in order.** Each test is seen failing on the base first.
1. **Row 158, walk.** In `interpreter/evaluator/Evaluator.java`, the postfix branch of `forOpExpr` and `forTightJuxt` tell a parenthesised call from a call followed directly by a non-expression element. Tests: `tests/SuperscriptAfterParenthesisedCall.fss`: `(f(3))^T`, `(f(3))^T d`, `((f(3))^T) d`, `(f(3))^2`, each with the value that the compiled path gives; `f(3)^T` still refused, in a test that expects the refusal as the skill's `tests-writing.md` gives it. A compiled guard of the same forms, `compiler_tests/SuperscriptAfterParenthesisedCallCompiled.test`, which passes on the base.
2. **Row 84, the parser.** In `parser/Expression.rats`, a dotted primary takes the math items that `MathPrimary` takes after its front (fork S1). Tests, under walk and compiled: the row's seven probes as one program each way, `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, after a getter, after a method call, and `p.wq^T x` with a juxtaposed operand, each with its value; `B.data[5]` and `B.data!`, which run today, as guards.
3. **The whole suites** where the skill asks for them: your grammar edit reaches every dotted expression on both paths.
4. **The stages,** once on your final tree, as rung P's step 5.

**Rows.** Close 84 and 158. Row 144 stays; read it, and change nothing of it.

**Specification.** `Specification/basic/expressions/operator-app.tex:72`, the note "The following examples are not yet working": if an example of its list now runs on both paths, say which; change the note only if the whole list runs. List each other sentence your change makes false, or none.

**Files.** `parser/Expression.rats:380-680`, `PrimaryItem`, `LeftAssociatedPrimary`, `MathPrimary`, `MathItem`, `Exponentiation`; `interpreter/evaluator/Evaluator.java`, `forOpExpr`, `forTightJuxt` and what they call; what the checker or the code generator needs for the new tree of step 2, reported as a file beyond those named; your tests. Not: `parser/Expression.rats:685-720`, which is rung P's; the library; microGPT.

**Reserved points.** A model line. `f(x)^T` accepted on either path. A change of how an expression without a dot and without parentheses reassociates.

**Overlaps by file.** `parser/Expression.rats` with P: "The rule the rungs keep".

### C. The checker fixes two static arguments that it leaves open today: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value (rows 731 and 758)

**The mission.** The compiled checker infers a call's static arguments from its arguments, from the bound, and, for a call written as an argument, from the parameter type that receives it. Two forms of the model program fall outside that. A reduction with generators, `SUM[j <- 0#i] matCount(j)`, is desugared to a call whose first argument is the big operator's own call, `BIG +()`, with no arguments; where the operator's bound names its own parameter, as `SUM`'s does, that call has no instance, and the reduction is refused, so every such line writes `SUM[\ZZ32\]` (row 731). And a generic function passed as a value, as the model's `rows(rmsn, x)` would be with a sized `rmsn`, stops the checker with an internal error (row 758). You repair both.

**The decisions this rung builds.** P-78, whose written argument is row 731's workaround; P-51 and P-48, whose retry and bound stay for every call that they serve today; P-148 for your checker edit. Section 3's forks C1, C2 and R2.

**What you build, in order.** Each test is compiled under the prelude and seen failing on the base first.
1. **Row 731.** In `scala_src/typechecker/impls/Functionals.scala`, a big operator's call that is the first argument of a reduction's desugared call, and whose static parameter nothing fixes and whose bound gives no instance, is instantiated by the reduction's declared type where it has one that fits the bound, and else by the type of the reduction's body (fork C1). Tests: `compiler_tests/InferBigOperatorSelfBound.test`, from `compiler_tests/InferBigOperatorExpectedType.fss` with the big operator and its object bounded by a self-typed trait of the prelude, as the probe `P731b.fss` is: a reduction with a declared type; one without, whose body fixes it; one whose declared type and body differ, with the value that walk gives for the same program; a written argument, which still wins; a list comprehension under a declared `List[\E\]` if the prelude can write one. `compiler_tests/InferBigOperatorExpectedType` and `InferBigOperatorUnwritten` are guards. Seen failing on the base: "is not applicable to an argument of type ()".
2. **Row 758.** A reference to a generic function, where an arrow type is expected (an argument at a parameter of arrow type, a typed binding), is instantiated by that arrow type; the kind environment holds the function's own static parameters while its type is read. Tests: `compiler_tests/GenericFunctionAsValueCompiled.test`: the row's program prints its value; a function generic in a size, `half[\nat n\]`, at a parameter of a sized arrow type; a reference whose expected arrow leaves a parameter open, refused with a message and not a crash; a typed local binding. Seen failing on the base: "F is not in the kind env [][][]". If this step does not fit, land step 1, and report what remains with row 758's whole new line.
3. **Runs to report, not gated tests:** the library's three sites that row 731 names and `explorations/run-c4/src/MicroGptFlat.fss:43`, each with its static argument removed in a scratch copy, under the distance stage's driver, on the base and on your tree.
4. **The whole compiled suite once,** `ant testFast`: your edit reaches every reduction and every function reference.
5. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 30's gate, 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Close 731. Close 758 if step 2 lands. Rows 716 and 817: a note only if a test of theirs changed.

**Specification.** Your change makes these false; bring them in line, and build the specification as the skill's `specification.md` gives it:
- `Specification/basic/expressions/reductions.tex:44-50`, in the box `revival-reductions`: "the compiled type checker ... takes the bound of the big operator's static parameter, which is not the element type, or, where the reduction's type at that bound does not fit the reduction's expected type, that expected type", and what follows it on a bound that mentions the parameter;
- the Effect of Appendix I's "Reductions whose element type nothing fixes", `Specification/appendices/changes.tex:1256-1264` and what the same entry says of a self-bounded big operator;
- the Effect of Appendix I's "The contexts that give a call an expected type" (`changes.tex:2434`), where it says that a self-bounded big operator is still refused; and the list of contexts in `Specification/basic/inference.tex`, "The Static Arguments of a Call", which gains the reference to a generic function where an arrow type is expected, if step 2 lands.

**Files.** `scala_src/typechecker/impls/Functionals.scala`: `checkApplicableWithInference`, `typedApplicationOfArg`, `retypedApplication` and the functional reference's case (`:1464`); `scala_src/types/TypeAnalyzer.scala`, `staticParam` and its callers; your tests; the specification's sentences named. Not: `typedApplication`, `typedApplicationOfChecked`'s numeral code and `numeralTie`, which climb batch 31's rung N edits; `interpreter/`; the library; the prelude; microGPT.

**Reserved points.** A model line. A library line or a team test unwritten (fork C2). A change of which declaration a call that is accepted today invokes.

**Overlaps by file.** None with P, S, F or B.

### F. A generic function passed as a value under walk: it takes its static arguments from the arrow type that receives it, or at its first call (row 156)

**The mission.** The model's four vector functions, `rmsn`, `sm` and their backward forms, are passed to the row lift, `rows(rmsn, x)`. With sizes in their types they would be generic in a size, `rmsn[\nat n\](x: Vector[\RR64,n\])`, and under walk a function with static parameters cannot be passed: the value has no type, so the call fails with a unification error, a missing-type error or a Java `NullPointerException` (row 156). So the model declares them over unsized arrays. The specification makes a function a value and says that a reference to a generic function takes its static arguments from its context. You give walk that.

**The decisions this rung builds.** P-48 and P-12; P-87, which keeps the model's lines. Section 3's fork F1.

**What you build, in order.** Each test is seen failing on the base first.
1. **The value.** A generic function passed where a parameter or a typed variable of arrow type receives it is instantiated at that arrow type, the callee's own static parameters being fixed first from its other arguments; where the receiving type leaves a static parameter of the function open, or there is no receiving type, the value stays generic and is instantiated at its first application from the arguments' run-time types, as a direct call is (`EvaluatorBase.inferAndInstantiateGenericFunction`). No instance: the refusal that a direct call with those arguments gives. Tests: `tests/GenericFunctionAsValueWalk.fss`: row 156's three failures, each now with its value (the probe `P156.fss` is the first); a function generic in a type, in one size and in two; `app(half[\3\], v)`, which runs today, as a guard; a generic function bound to an untyped local and called twice at two sizes; an overloaded name one of whose declarations is generic.
2. **The row lift.** In a test program of your own, not in `explorations/`: a `rows[\nat r, nat c\](f: Vector[\RR64,c\] -> Vector[\RR64,c\], m: Matrix[\RR64,r,c\])` called as `rows(half, m)`, the callee's `c` fixed by `m`.
3. **The whole walk suite once,** as the skill gives it: your edit reaches every call that passes a function.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 156. Rows 165 and 171: a note only if a test of theirs changed. Row 758 is rung C's.

**Specification.** No Effect of Appendix I and no note names row 156 (a grep on `main`). List each sentence your change makes false, or none.

**Files.** `interpreter/evaluator/values/Fcn.java`, `GenericFunctionOrConstructor.java`, `FValue.java` and the generic function classes beside them; `interpreter/evaluator/EvaluatorBase.java`, the check of an argument against a parameter type (`:941`) and `inferAndInstantiateGenericFunction`; in `OverloadedFunction.java` only what passing an overloaded name as a value needs; your tests. Not: `OverloadedFunction.bestMatchForNumerals`, `Coercions.java`, `Numerals.java`, which climb batch 31's rung N edits; `scala_src/`; the library; microGPT.

**Reserved points.** A model line. A change of which declaration a direct call runs. A change of walk's open parameter (P-48).

**Overlaps by file.** None with P, S, C or B.

### B. An array literal at the top level is an array under walk, with its declared type or without one (row 142)

**The mission.** The model program holds two tables, the names and the shapes of its nine matrices, as chains of `if` in two functions, because under walk an array literal at the top level is not built into an array: with a declared type the binding fails against a tuple, and without one the name holds a tuple of tuples (row 142). In a function body the same literal is an array, with numerals, names or expressions as its elements. You make the top level do what the body does.

**The decisions this rung builds.** P-87; P-173 for the elements of a typed literal. Section 3's fork B1.

**What you build, in order.** Each test is seen failing on the base first.
1. **The binding.** In `interpreter/evaluator/BuildEnvironments.java`, `forVarDecl4` builds a top-level array literal as `LHSEvaluator.forLValue` builds a local one, typed and untyped. Tests: `tests/TopLevelArrayLiteral.fss`: `shp: ZZ32[3] = [27 16 27]` and `shp[1]`; rank 2 with `;`, typed `ZZ32[3,2]`, and `shp[2,0]`; the untyped forms of both, with the same values and the type that the literal has in a body (fork B1); elements that are top-level names and expressions, as `[vocabSize nEmbd; (4 nEmbd) nEmbd]`, the names bound by a tuple binding above; a `String[9]`; a `Vector[\ZZ32,3\]`; a literal at a top-level `var`; a size that does not match its declared type, refused.
2. **The whole walk suite once,** as the skill gives it: your edit reaches every top-level variable.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 142. Rows 49 and 104: a note only if a test of theirs changed.

**Specification.** No Effect of Appendix I and no note names row 142. `Specification/basic/variables.tex:16` and `aggregate.tex:15`, "matrix unpasting ... not yet supported", stay true. List each sentence your change makes false, or none.

**Files.** `interpreter/evaluator/BuildEnvironments.java`, `forVarDecl4` and what it calls; `interpreter/evaluator/LHSEvaluator.java` only to share its building code; your tests. Not: the compiled path, whose prelude has no array type; the library; microGPT.

**Reserved points.** A model line. A top-level tuple binding's behaviour, which climb batch 31b's rung D repairs on the compiled path. A change of the literal in a function body.

**Overlaps by file.** None with P, S, C or F.

### The rule the rungs keep, and how they meet

- **P and S share `parser/Expression.rats`, by production:** S owns `:380-680` (`PrimaryItem` through `Exponentiation`); P owns `:685-720` (the productions that use `Accumulator`). The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first, so S before P; the hunks do not overlap in either order. The parser's generated Java is built, never merged.
- **C alone edits `scala_src/`.** F and B edit different files under `interpreter/evaluator/`. S edits `Evaluator.java` there, which neither F nor B names.
- **Against climb batch 31,** if it has not landed: C keeps out of `typedApplication` and the numeral code of `Functionals.scala`; F keeps out of `bestMatchForNumerals`, `Coercions.java` and `Numerals.java`; B changes nothing of a top-level tuple binding.
- **They meet on the merged tree:** the suites, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks, 7 of 7 for both programs, which read P's and S's parser, F's function values and B's top-level bindings under walk.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, candidate by candidate, with its home here. Each was reproduced on the base's code (PROBES, section 2).

- **Row 133,** `opr (m)^T` in an api: P. A one-line edit of the grammar made the probe run (PROBES, section 3).
- **Row 177,** `var p = e`: P. With the check gone, both paths ran the probe.
- **Row 5,** the sum's and the product's signs: P. The row has the sum's sign; the grammar's rule gives the product's beside it, and the other big operators are written with `BIG`, which parses today.
- **Row 84,** `p.wq^T`: S, with row 158, as one subject.
- **Row 158,** `(f(x))^T`: S. The compiled path runs the form today, so the repair is walk's alone, and its compiled test is a guard.
- **Row 156,** a function with a size parameter passed as a value: F. The compiled path needs row 758 for the same form: C, step 2.
- **Row 142,** a top-level array literal: B. The compiled path has no array literal before the switch-over (the skill's `compiler.md`), so the repair is walk's alone.
- **Row 731,** with row 758: C. They are two repairs in one rung (fork R2). P-78 with its history: the repair removes the need for the workaround and bends nothing (fork C1).
- **Row 50,** the array comprehension: out, the curator's question (fork R3).
- **Each repair test first, in the suite, on both paths where the gap is on both:** section 4.
- **The line of the model that each rung frees, before and after:** section 2, "The scope".
- **The measure:** section 2, "The measure".

### The planner's probes

`compile-ladder/plan-32/PROBES.md` holds each with its output: the base; each gap on the base's code, under walk and compiled; one trial build of three one-line parser edits; the sites by file and declaration; the briefing keys; the disk.

**Not run:** a suite, a stage, a timing, the model's quick checks.

### Rows filed by plan

None. Every defect met is in a row. Fork P3's neighbour, an untyped mutable local whose value is an array literal, is rung P's to file if no row holds it. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out". Their homes: rows 140, 141, 54 and 292, the curator's questions 2 to 4 and 6 of `reviews/c4-fortress-way-2026-11-15.md`; row 307, after the switch-over; row 50, the curator's question in section 2; decision D, P-87 and P-85.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 30: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-32/manifest/` is the coordinator's, made from `plan-31/manifest/`:

- `BATCH` `32`, the folder `compile-ladder/climb-batch-32/`, the rungs P, S, C, F, B in that order;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- P's, S's and C's sections naming the two stages; F and B `STAGE_BLIND`.

### What every agent reads first

This run is climb batch 32, the one run of the record CLIMB-BATCH-32.md: the model's notation. The project's model program, microGPT, is written around gaps of today's tree: forms that the specification gives and that the parser, the interpreter or the compiled checker refuses. These rungs repair the gaps that need no decision, so that each line of the model can later be written in the specification's short form. No rung changes a line of the model program or of its helper file. Its rungs:

- P, three forms that the parser refuses: a postfix operator declared in an api, a mutable local without its type, and the signs for sum and product as accumulators;
- S, a superscript after a dotted access, on both paths, and after a parenthesised call, under the interpreter;
- C, two static arguments that the compiled checker leaves open: a big operator's in a reduction that does not write it, and a generic function's where the function is passed as a value;
- F, a generic function passed as a value under the interpreter;
- B, an array literal at the top level under the interpreter.

Each rung has tests that fail on the base and pass after, on both paths where the gap is on both. P and S share one grammar file by production: each keeps to its own, as its section says. P, S and C run the count stage and the distance stage once on their final trees, C with the checker's timing; F and B run neither. microGPT's quick checks under the interpreter stay 7 of 7 for both programs. The gather applies the rungs in the script's order, builds the specification once, and runs the 52 team demos on the merged tree.

### Before the launch

The coordinator, after the curator's go:

1. **The order with climb batch 31.** If climb batch 31 has landed, sections 1 and 4 are read again against the landed tree: the line citations, C's and F's "Not" lists, and the gate's comparands, which are then climb batch 31's.
2. **The Fable review of this record,** its changes in place.
3. **The script and the generator,** its checks and the splice, as the manual's "Before the launch", step 4, gives them. The base is `main`'s head after that commit.
4. **The base build:** `/home/user/fortress-base33`, if `git diff --stat 84f1c37190 <base> -- . ':!explorations' ':!docs'` prints nothing; else a new one; its trial seed and the old code's run.
5. **The disk:** 11.5 G or more free; `git status --porcelain` empty in the main tree.
6. **Check-ins** for about 7 hours, 45 minutes apart (`<scratchpad>/batch32/checkins.txt`).

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base33'}})`. The arguments are kept byte for byte.

### The gate, and what it should show

The comparands are climb batch 30's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-30/gate/`, or climb batch 31's if it landed first.

- `testSystem`: the comparand's count, with the new walk tests: P's three, S's two, F's one or two, B's one.
- `testFast`: the compiler track's count plus P's three, S's guard and its row 84 test, and C's two; the library track unchanged.
- The ladder: no rung declares a move. P's and S's grammar reaches every program: a changed output is traced to its rung.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each, with `git diff <base> -- explorations/run-c4 explorations/apl` empty.
- **The measure,** after the landing: 12 boxed gaps open before, 5 after; the lines are freed only by the curator's diffs.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Closed:** 133, 5, and 177 if every form runs (P); 84, 158 (S); 731, and 758 if step 2 lands (C); 156 (F); 142 (B).

### After the landing

- **PLAN:** phase 5's line on row 731 (`PLAN.md:106`) answered by C; the demos' line (`:261`), row 731's demo half; a line for the model's notation with the diffs that wait for the curator's word; rows 140, 141, 54, 292, 307 and 50 with the questions that they wait on.
- **The review queue:** this record's forks as new items; the question on row 50; one item for each diff of section 2, "The scope", for the curator's word (P-87); item 51, the probe of the checker's driver over the team demos, which C's landing changes.
- **The post-batch review.**

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After the landing, these are false:

- **P-78:** "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`": the checker fixes it; the decision's first two sentences stand.
- **P-79:** "and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)".
- **P-87:** its sub-item on row 731, "the phase 3 exit judgement places the checker's fix before microGPT compiles ... review-queue item 51 waits".
- **F-59:** its title's second half, "and the compiled checker needs that argument written in every clause form", and the sentences on row 731; "the refusal is row 731's, and no test pins it".
- **F-221:** "an F-bounded one is still refused (row 731)".
- **F-285:** "while row 731's checker gap stays for user programs and the team demos"; the library's written sites stand.
- The entries that name rows 133, 177, 5, 84, 158, 156, 142 and 758 as open, if any does by then: none does at `3fc1ac6e78` by a grep of FACTS and POSITIONS for those rows.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landing, the record-landing workflow's skill writer brings these in line (each at `84f1c37190`).

- `references/revival-changes.md`, "Reductions and comprehensions": "**Only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`.** The checker does not, because their bound names the parameter (row 731). Write it in every clause form of these four, as `SUM[\ZZ32\][j <- 0#n] f(j)`." (C)
- `references/library.md`, the item on `SUM` and `PROD`: "Write the element type wherever generators stand in brackets, also where the generators, the body or a declared type fix it: `SUM[\ZZ32\][j <- 0#n] f(j)`. The checker refuses a call without it (ledger row 731)." (C)
- `SKILL.md`, "Parallelism and mutable state": "`x = e` declares an immutable variable. `var x: T = e` and `x: T := e` declare a mutable one": true still, and incomplete once `var x = e` runs (P).
- `references/revival-changes.md`, "Static parameters, `where` clauses and sizes", and `references/interpreter.md`, where walk's handling of a generic function is given: no sentence says that a generic function cannot be passed; one that says how walk instantiates a generic function at a call gains the value's case (F), if the writer judges it a rule.
- `references/compiler.md`, "What the compiled path cannot compile yet": no sentence names rows 758, 84 or 133.

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-31.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-31.md), [the review of C4's limits](https://github.com/palimondo/fortress/blob/main/explorations/reviews/c4-fortress-way-2026-11-15.md), [PROBES.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-32/PROBES.md), [the probe programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-32/probes), [decision-d-diff.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/decision-d-diff.md).
- The model: [MicroGptFlat.fss](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/MicroGptFlat.fss), [FlatArrays.fss](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/FlatArrays.fss), [FlatArrays.fsi](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/FlatArrays.fsi).
- Code: [Parameter.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Parameter.rats), [Symbol.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Symbol.rats), [Expression.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/Expression.rats), [SyntaxChecker.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java), [LHSEvaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java), [Fcn.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Fcn.java), [EvaluatorBase.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala).
- Specification: [reductions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/reductions.tex), [comprehensions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/comprehensions.tex), [defining-generators.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/parallelism-locality/defining-generators.tex), [juxtameaning.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/operators/juxtameaning.tex), [variables.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/variables.tex), [aggregate.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/aggregate.tex), [var-ref.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/var-ref.tex), [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
