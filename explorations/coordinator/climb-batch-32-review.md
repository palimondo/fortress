<!-- The check of climb batch 32's record, `CLIMB-BATCH-32.md` (`b14d8753a8` on `main`), with its probe notes `compile-ladder/plan-32/PROBES.md`, before any launch, by a fresh reader on Fable on 2026-11-15. The batch has no go. Checked: each citation at its source on the base's code (`/home/user/fortress-base33`, `84f1c37190`), each reproducer run once in a worktree seeded from the base build and removed after (`/home/user/fortress-check32`), each repair against the team's unrevised specification (`Specification-1.0-frozen/`), each rung against the decisions on record, the forks, the merge and climb batch 31, and the measure. The record was corrected in place only where a citation, a count or a sentence was wrong; no design was changed. No suite, no stage of the gate and no timing was run. -->

# The check of climb batch 32's record

## For the curator

What this is. Climb batch 32 is a plan for five repairs. Each repair lets a line of microGPT's flat program be written in the short form that the specification allows. I am a second reader. I checked the plan against its sources before anyone launches it. Nothing was launched.

What I checked.

- Every file, line and ledger row that the plan cites. A ledger row is one known gap in the gap list.
- Every small program that the plan uses to show a gap. I ran each once on today's code.
- Whether the Sun team's own specification text allows each short form, and not only our revised text.
- Whether each repair agrees with your decisions on record.
- Whether the five repairs can be merged, and what the plan shares with climb batch 31.
- The plan's counts.

What I found.

- **Every small program fails today as the plan says,** with the message that the plan gives.
- **One repair may not be a gap: `var p = e`, a variable that can change, declared without its type.** The plan says that the specification allows it. The team's text says two things.
  - The grammar appendix, the list of all syntax rules at the end of the specification, allows it.
  - The chapter on variables does not. It gives three forms, and the one with `var` has a type. It says: "mutable variables are declared and initialized either by `:=` or ... with the modifier `var`", and both of those forms carry a type.
  - The team's parser also refuses it on purpose. The line of code has a comment that says the type is required.
  - So two of the team's three sources ask for the type. This touches lines 88 to 90 of the model. I think this one is yours to decide. Until you do, the repair should not be built. The other two repairs of the same worker are not affected.
- **One repair is planned wider than it can be built: a table written as a literal at the top of the program, without a type.** With a type, as `shp: ZZ32[3] = [27 16 27]`, the plan is sound, and that is the form that the model's diff uses. Without a type, the plan says "do what a function body does". But in a function body today, the untyped form stops with an error (row 49). I ran it. So the untyped half has no working form to copy. The coordinator must cut it or widen the repair.
- **The sum's type (`SUM` without `[\ZZ32\]`).** The plan says that the type checker will take the declared type first and the type of the summed expression second, as the interpreter does, and that this does not bend your decision P-78. I checked P-78 and its history. That holds. One limit: the interpreter reads a declared type only at a local variable and at a function's return type. In other places the two could sum in different types. The worker should report those places.
- **The plan's sentence on the sum's type is from our revised specification, not from the team's.** The team's text allows the short form and does not say which type it sums in.
- **Array comprehensions, the form `[(i, j) ↦ e | ...]`, are rightly left out.** The team's text gives no rule for the array's size, and marks the form "not yet supported". One thing the plan missed: the team's overview shows two examples and says that each "describes a 3 × 3 array". So the team's examples take the size from the ranges. That supports way (c) of the plan's question to you.
- **"You asked for the notation's gaps to come first."** Your words, as the planner's brief quotes them, are that such gaps "should obviously be priority fixes" if the specification allows the short form. No decision on record says "first". The order against climb batch 31 is still yours.
- **The counts hold.** 12 boxed gaps are open today and 5 would stay open. If `var p = e` is not a gap, it is 6. The line counts match the two files. Three lines of the model that another open gap shapes are outside the count; the record now says so.
- **The merge is clean as planned.** No two repairs edit the same declaration. Climb batch 31 can run before or after. Whichever runs second only needs its line numbers read again.

What I changed in the plan. Twelve small corrections: one line number, one row number, two sentences on the table literal, two on the specification's text, one on your decision P-87, one on the counts, one added key in each worker's reading list, one key that matched two places, and one step that pointed a worker at text it does not read. The list is below.

## Findings that would change a decision of the curator's

### 1. Row 177, `var p = e`: the team's chapter and the team's check both ask for the type

- The record: fork P2, "`var p = e` takes the type of `e` ... The reason: `LocalVarDecl ::= [var] VarMayTypes = Expr`", and row 177's class, "implementation gap (parser)".
- The appendix has the production (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1125-1126`).
- The chapter does not. Its prose gives three forms, `id: Type = expr`, `id = expr` and `var id: Type = expr`, with `[var] id: Type := expr`, and sums up: "immutable variables are declared and initialized by `=` and mutable variables are declared and initialized either by `:=` or by declaring them according to the third form above with the modifier `var`" (`Specification-1.0-frozen/basic/variables.tex:57-96`). Its grammar of a local declaration gives the untyped form no `var`: `LocalVarWoTypes = Expr` against `[var] LocalVarWTypes InitVal` (`:174-181`). `Specification/basic/variables.tex` is the same text, line for line.
- The code: `forLocalVarDeclOnly` carries the comment "variable declaration without a body expression or ... a mutable variable ... type is required" (`ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:178-181`). The refusal is written, not an omission.
- So this is a conflict between two of the team's texts, with the team's code on the chapter's side. By the `coordinator` skill's rule it is consequential: the record does not settle it, the principles split (the appendix against the chapter and the code), and it shapes model lines 88 to 90 and the helper file's line 182.
- The record's briefing key for rung P, SPEC `basic/variables.tex#Local Variable Declarations` (check), "the local declaration's forms", shows the worker and the skeptic the text that does not give the form.
- What it needs: the curator's word, or rung P without its step 2. Rows 133 and 5 stand without it. The measure is then 12 to 6.
- I changed no design. I added one sentence of fact to fork P2 (change 7 below).

### 2. The array comprehension's size: the overview's examples take it from the generators

- The record's question to the curator said: "The specification's text does not say how large the array is", and of way (c): "It is a rule of ours".
- The desugaring gives no size, as the record says (`Specification/advanced/parallelism-locality/defining-generators.tex:241-266`, "copied from F1.0β").
- The overview says of `[(x,y) = 0 | x ← {0,1,2}, y ← {0,1,2}]` that it "describes a 3 × 3 array", and of a second example "a 3 × 3 identity matrix" (`Specification/preliminaries/overview.tex:976`, `:991`; the same lines in `Specification-1.0-frozen/`).
- So leaving row 50 out holds: the text has no rule, two notations, and the team's note "Array comprehensions are not yet supported" (`comprehensions.tex:15`). But way (c) is not only ours: the team's examples read so. This weighs on the curator's choice between (b) and (c).
- Changed in place (change 5).

## Points for the coordinator to decide

### 3. Rung B's untyped half has nothing to copy

- The record: "In a function body the same literal is built"; fork B1, "An untyped array literal at the top level is the array that the same literal is in a function body"; step 1 asks for "the untyped forms of both, with the same values and the type that the literal has in a body".
- On the base, in a function body, `shp = [27 16 27]` and `m = [27 16; 16 16; 27 16]` each stop: "Can't infer element type for array construction" (my programs `B49.fss` and `B49b.fss`, scratch, run once under walk). That is row 49, which the record lists as "a sibling" that stays.
- So by B1 the untyped top-level literal would answer row 49's error in place of today's tuple of tuples. Step 1's untyped test cannot pass unless B also repairs row 49, which is a wider rung with a rule to choose (the element type of an untyped literal).
- The typed half is sound, and it is the half that the model's diff uses (`matName: String[9]`, `matShape: ZZ32[9,2]`).
- The ways: cut the untyped forms from B's step 1 and say that the top level then meets row 49's error; or add row 49 to B. I corrected the three sentences of fact (change 3) and left step 1 and B1 as they are.
- Fork P3 called the same error "a row of its own if no row holds it". Row 49 holds it (change 2).

### 4. Fork C1, "one answer on both paths", holds only where walk reads a declared type

- F-228: walk reads the declared type of "a local variable ... or a top-level or local function's declared return type"; "a method's return type, a top-level variable, a field, an assignment ... a call's argument" do not direct it, and walk then takes the join of the elements' run-time types.
- The checker's expected type reaches those other places too. There `x: RR64 = SUM[j <- 0#n] f(j)`, with `f` a `ZZ32` function, would sum in `RR64` when compiled and in `ZZ32` under walk, with the value converted after. The two differ where the `ZZ32` sum overflows.
- The model's line 43 is a top-level function's return type, where both agree.
- What it needs: one more point to report for rung C, the places where the checker's rule and walk's differ. Not added by me.

### 5. Rungs C and F give one program two verdicts

- Rung F: where the receiving arrow type leaves a static parameter open, or there is none, the value "stays generic and is instantiated at its first application"; its test binds a generic function to an untyped local and calls it at two sizes.
- Rung C, step 2: "a reference whose expected arrow leaves a parameter open, refused with a message".
- So the same program runs under walk and is refused when compiled. Walk runs many programs that the checker refuses, so this can stand. But F's plain test then asserts as correct a behaviour that the checker's rule refuses. The coordinator may want that case of F's test reported, not pinned.

### 6. The team's text on a generic function as a value (rungs F and C, step 2)

- The team's sentence: "the static arguments are statically inferred from the context of the function call" (`Specification-1.0-frozen/basic/expressions/var-ref.tex:35-40`), and "Functions can be passed as arguments and returned as values" (`basic/functions.tex:38`).
- So the team's text allows a reference without its static arguments, and a function as a value. It speaks of "the function call", and its inference chapter is one note, "This chapter will include the Fortress static type inference mechanism" (`Specification-1.0-frozen/basic/inference.tex:15`). Inferring from the arrow type that receives the value is the reading that the review gave (section 1.2: "the inference chapter does not describe this context yet"). The form is the team's; the rule for it is ours to write, which rung C's specification step does.

### 7. The premise "You asked for the notation's gaps to come first"

- Its source is the planner's brief, which quotes the curator's dictated words of 2026-11-15: "If the Fortress specification allows for some desired terse expression form and we are compromised due to implementation gaps, then these should obviously be priority fixes".
- No POSITIONS entry and no history block holds it. "Priority" is not "first". The record itself leaves the order with climb batch 31 to the curator, so nothing in the plan rests on "first". The condition "if the specification allows" is what finding 1 tests.

### 8. Smaller points

- Row 731's own text names the library's sites at `Library/FortressLibrary.fss:4410`, `:4416`; F-285 has them at `:4580`, `:4586`. Rung C's step 3 sends the worker to "the library's three sites that row 731 names". The row's line numbers are old.
- The specification's sentences that rung C changes cite row 425, which is row 731's duplicate. The worker should carry the number over.
- Rung P's files do not name `parser/DelimitedExpr.rats`, which also builds accumulators (`:304`, `:312`, the comprehension forms). Row 5's repair may not need it.
- PROBES, section 4, gives walk's refusal at `Evaluator.java:1322-1326`; it ends at `:1327`.

## The reproducers

Each ran once, in `/home/user/fortress-check32`, seeded from the base build. Each failed as the record says.

- Row 133, `P133.fss`: `P133Api.fsi:3:1: Syntax Error`.
- Row 177, `P177.fss` under walk and `C177.fss` compiled: `4:9: The type of p is required.`
- Row 5, `P5.fss`: `Operator prefix SUM is not defined.`; `P5c.fss`: `Operator prefix PROD is not defined.`
- Row 84, `P84.fss` under walk and `C84.fss` compiled: `4:38: Syntax Error`.
- Row 158, `P158.fss` and `P158b.fss` under walk: "a function argument should not be immediately followed by a non-expression element"; `C158` compiled and ran: `104`.
- Row 156, `P156.fss`: "Unification error ... got arg half ... of type null"; `P156b.fss`: `[0#3][ 4.0 4.0 4.0 ]`.
- Row 142, `P142.fss`: "Type mismatch binding (27,16,27)"; `P142b.fss`: "Non-object receiver"; `P142c.fss`: `64 wpe`.
- Row 731, `P731b.fss` compiled: one error, "is not applicable to an argument of type ()".
- Row 758, `P758.fss` compiled: `F is not in the kind env [][][]`.
- Row 50, `P50.fss`, `P50b.fss`: `Variable i is not defined.`

## Each form against the team's unrevised text

- Row 133, a postfix operator in an api: allowed. `opr AbsValParam (Op | ExponentOp | ^)` (`Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:737-738`).
- Row 177, `var p = e`: the appendix allows it; the chapter and the code do not (finding 1).
- Row 5, the signs for sum and product: allowed. `Accumulator ::= ∑ | ∏ | BIG (Encloser | Op)` (`concrete-syntax.tex:1245`; `basic/expressions/reductions.tex:20`), and in an operator's declaration (`:739-740`).
- Row 84, a superscript after a dotted access: allowed. `Primary ::= Primary.Id | Primary ^ Exponent | Primary ExponentOp` (`concrete-syntax.tex:947-952`), and "A tight juxtaposition is always left-associated if it contains any dot" (`basic/operators/juxtameaning.tex:130`).
- Row 158, a superscript after a parenthesised call: allowed. The static error is for an argument "immediately followed by a non-expression element" (`juxtameaning.tex:159-160`).
- Row 731, a reduction without its static argument: allowed, `Accumulator [StaticArgs] ...` (`reductions.tex:16-18`). The team's text does not say at which type it sums; "for the type N of the expression" is the revised text's.
- Rows 758 and 156, a generic function as a value: allowed as a form; its inference is not described (finding 6).
- Row 142, an array literal at the top level: allowed. "Array element expressions are enclosed in brackets" and the type's short form (`basic/expressions/aggregate.tex:120`, `:136`); the top-level declaration takes any expression.

Where the record departs from the review's section 1: it adds the product's sign to row 5; it puts rows 731 and 758 in one rung where the review counts two or three; it leaves out rows 140, 141, 292, 54, 307 and 50, each with its home; and it takes row 177 as a gap, as the review does.

## Each rung against the decisions on record

- **P-78 and rung C.** P-78: "A reduction written with generators writes its static argument where nothing at the call fixes the element type", the refusal "(row 731, a gap of the checker)", and "Row 731's workaround is to write it in every clause form". Its history shows the gap and the workaround entering on 2026-10-22 (the blocks of 12:37Z and 22:14Z), the second "applied at the curator's word ... without his review of each change". The repair removes the workaround's need and bends nothing. The record's claim holds.
- **P-48.** A parameter that nothing fixes takes its bound. Rung C acts only where the bound gives no instance, and its "Reserved points" keep every call that is accepted today. Holds.
- **Fork C1 and F-228.** The order, the declared type and then the elements, is walk's as landed. See finding 4 for its reach.
- **P-87 and P-9.** No rung edits `explorations/run-c4/` or `explorations/apl/`. Each diff is shown, and rung F's diff is said to be decision D's. Holds. The record's "For the record-landing workflow" gave P-87 a sub-item on row 731 that it does not have (change 6).
- **P-173 and P-174.** The numerals in the reproducers stand at places that fix a type or take the default (`var p = 3` a `ZZ32`; `[27 16 27]` under `ZZ32[3]`). Nothing writes a numeral type. Holds.

## The forks

By the rule of the `coordinator` skill's `SKILL.md`, "The curator's role and decisions".

- R1, one run of five rungs: not consequential. A choice of process that can be undone.
- R2, row 758 as rung C's second step: not consequential. The same.
- R3, row 50 left out: the question is the curator's, as the record says. Leaving it out builds nothing.
- P1, the two signs as accumulators: not consequential. The team's grammar gives it, and no file of the tree uses either sign as an operator of its own.
- **P2, `var p = e`: consequential** (finding 1). The team's texts split, and it shapes model lines.
- P3, the untyped mutable local with an array literal: not consequential. Row 49 holds it.
- S1, a superscript after any dotted primary: not consequential. The team's sentence gives it.
- S2, `f(x)^T` stays an error: not consequential. The team's rule.
- C1, the declared type first: not consequential. It builds walk's landed rule (F-228) and keeps P-78. Finding 4 is a point to report.
- C2, no library line unwritten: not consequential. It keeps F-285.
- F1, walk instantiates at the arrow type or at the first call: not consequential. It widens what walk runs and changes no direct call.
- B1, the top-level literal as in a body: not consequential as a rule, but it contradicts rung B's untyped test (finding 3).

## The merge, and climb batch 31

- **The five rungs.** P and S share `parser/Expression.rats` in productions that do not touch (`:380-680` and `:685-720`); row 5's repair may need the order of the expression grammar outside `:685-720`, and P's section keeps it out of S's lines. S edits `Evaluator.java`; F edits `EvaluatorBase.java` and the function values; B edits `BuildEnvironments.java` and `LHSEvaluator.java`; C alone edits `scala_src/` and the specification. No two rungs edit one declaration. The gather can merge them.
- **One behaviour two ways:** only finding 5, across the two paths.
- **Climb batch 31.** Shared: `Functionals.scala` (its rung N, the choice of a declaration for a call with a numeral; this batch's rung C, the static arguments of a reduction and of a function reference); walk's `OverloadedFunction.java` (N's `bestMatchForNumerals`; rung F only for an overloaded name as a value); and the specification's `appendices/changes.tex`, at different entries (added to the record, change 8). Batch 31's record gives rung N the whole of `Functionals.scala` "and what it calls", not the three functions that this record names; the split by function is this planner's reading.
- **The order.** Neither order needs a rung planned again. The second batch needs a new base build and its line citations read again, as both records say. If climb batch 31 lands first, rung C's "Not" list is read against what N edited.

## The measure

- The boxed gaps: sections 1.1 to 1.12 of the review give 12 that are gaps and open (rows 988, 156, 133, 142, 731, 307, 292, 158, 989, 177, 140 with 141, and 5). Seven close, 5 stay. With finding 1, six close and 6 stay.
- The model: lines 21 to 24, 27, 28, 30, 34, 37 to 41, 43, 45, 52, 70 and 88 to 90 are 20 of 98. Each is as the record says. Line 45 holds no `reflect`; it calls the helper file's `view`, whose line 64 does.
- The helper file: lines 47 to 51, 64, 95, 108, 142, 148, 154, 160, 181 and 182 are 14 of 190. Each is as the record says.
- Outside the count, and shaped by an open gap or rewritten by a diff: line 29 (`mask`, row 50), line 51 (the unsized arrays of `step`; the review's section 1.2 is headed "Lines 27 to 34 and 51") and line 42 (rung B's diff rewrites it). The record now says so.

## Changes made to the record

1. Fork S1's citation, `juxtameaning.tex:128-129`, is `:130-131`.
2. Fork P3 and "Rows filed by plan": the untyped local with an array literal is row 49's, not a row to file.
3. Rung B's blurb, its mission and its briefing reason for row 49: the literal is built in a function body only with a declared type.
4. Fork C1: "the specification's plain sentence" is the revised text's (`reductions.tex:27-29`, the box `revival-reductions`), not the Working Draft's.
5. The question on row 50 and fork R3: the overview's two examples name a size.
6. "For the record-landing workflow": P-87 names no row; the quoted sentence is `PLAN.md:106`'s.
7. Fork P2: one sentence that the production is the appendix's, and that the chapter and the check differ.
8. "What it shares with climb batch 31": `appendices/changes.tex`.
9. "The measure": line 45's reason, and the three lines outside the count.
10. Section 1: each rung's briefing gains the key REC `Forks the batch takes` as a check, as climb batch 31's briefings have it, since each rung's section names section 3's forks and no other key carries them. The counts go to 15 and 11 (P), 13 and 11 (S), 22 and 16 (C), 15 and 9 (F), 11 and 8 (B). Rung C's count of checks was 14 for 15 marked keys.
11. Rung S's step 4 read "as rung P's step 5". A worker reads only its own section, so the step now names the two stages and their comparand itself.
12. Rung F's key for `EvaluatorBase.inferAndInstantiateGenericFunction` matched two declarations (`EvaluatorBase.java:72` and `:86`), so `facts-extract.sh --check` refused it; PROBES, section 5, says that each key matched one place. The key is now the public declaration's, which is the one that a direct call enters and which calls the other.

## The manifest generator (task 2)

- `explorations/compile-ladder/plan-32/manifest/`: `lists32.py` (the briefing keys, each checked with `facts-extract.sh --check`: 0 bad lists), `gen32.py` (the block from the record's sections 1, 4 and 6), `check32.js` (the block's checks on a spliced scratch copy: 115 ok, 0 problems), and `block32.js`, the block as generated from the record at this commit.
- `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced scratch copy: 0 problems.
- The block is not installed in `climb-batch-workflow.js`, and `FABLE_WEEK` is as it was. To install it after the go: run `lists32.py`, `gen32.py` and `check32.js`, then `check32.js --write`, then the scenario checker on the tracked script, as the manual's "Before the launch", step 4, gives them. If the record changes first (findings 1 and 3), the generator reads it again; a changed briefing bullet needs the same change in `lists32.py`.
