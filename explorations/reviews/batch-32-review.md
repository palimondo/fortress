<!-- The combined post-batch review of climb batch 32, the one run of coordinator/CLIMB-BATCH-32.md, the model's notation: seven rungs planned and landed, P, S, C, N, F, B and D (run wf_16f35394-635, base db352c1776c5f13a0e2f9af31945ecde5396948e; its first agent's first record at 23:25:50 UTC on 2026-11-15, its commit stage's last commit 567c36dadc at 05:35:01 on 2026-11-16; 21 agent transcripts for 19 results, since the machine restarted at 01:26 and the run was resumed at 01:28; every agent on Fable at medium effort by the switch FABLE_WEEK; no judge, no repair round; landed on main as P 5c8055dee4, S a10f1cd591, C d159b71975, N b190b8eb25, F 754a0f29d8, B d583335122, D 060f3ec096, the closes 700b9872d1, the gather's record 869802db66, the review's corrections 299b838629 and the gate's tables 567c36dadc; pushed, with no hold), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-30-review.md, by a review worker on Fable reading only, against main at 567c36dadc (the tree at 8fa708ef2b, whose two commits after it are the coordinator's boot note). Its sources for the decisions are P-46, P-49, P-173, P-59, P-78, P-51, P-48, P-37, P-148, P-87 and P-9, with the last history blocks of P-46, P-49, P-173, P-59 and P-78. The gate's result is cited as its agent returned it and was not run again. The measures are batch-measures.py's on this run, spend.py's method over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch32/rev32/ (spans32.py and moved32.py written new; brief.py, calls_mod.py, parts.py, runs3.py, tx.py, moved.py and mainw.py copied from rev30). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only. Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed and git, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 32: seven of seven rungs, six of the model's eight notation limits closed on both paths and two under walk alone, the count and the distance still 0; a run of 5.00M, 19 % under its estimate, through one restart of the machine, after a preparation span of 6.35M and a landing of climb batch 30 of 7.63M

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `567c36dadc`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`.

**P, two forms that the parser refused (rows 133 and 5). Both paths; no decision bent.**
- An api's operator header takes what a component's takes: `parser/Parameter.rats:171-173` gains the exponent operator and the caret. The walk test declares `opr (b: Sized[\n\])^T[\nat n\]: ZZ32` in an api, the form of the model's lines 23 and 24 (`ProjectFortress/test_library/ApiPostfixExponentOpLib.fsi:13`).
- U+2211 and U+220F are the words `SUM` and `PROD`: `parser/Symbol.rats:255-260`, and `singleOp` no longer reads them as operators (`:177-181`). The specification's grammar gives this, `Accumulator ::= ∑ | ∏ | BIG (Encloser | Op)` (`Specification/basic/expressions/reductions.tex:20`).
- P-87 is kept: `git diff --stat db352c1776 567c36dadc -- explorations/run-c4 explorations/apl` prints nothing.

**S, a superscript after a dotted access and after a parenthesised call (rows 84 and 158). The parser on both paths, walk's evaluator for the second; no decision bent.**
- `parser/Expression.rats:386-400`: a primary with a dot is the front of the math items that follow it.
- `interpreter/evaluator/Evaluator.java`, `forOpExpr`: a parenthesised operand of a postfix operator is one expression, so `(f(3))^T d` is 208 under walk as compiled (`ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss:25`).
- `f(x)^T` stays a static error on both paths (fork S2, row 144), pinned by `tests/SuperscriptAfterCallRefused.test` and `compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test`.

**C, the checker's two inferences (rows 731 and 758). The compiled checker only; P-78, P-51, P-48 and P-148 kept.**
- `scala_src/typechecker/impls/Functionals.scala:634`, `reductionApplication`, called from the one-argument application at `:800`. Its order is at `:680-689`: as written where the big operator has an instance alone; else the expected type; else the type of the body. This is fork C1 as planned.
- `Functionals.scala:746`, `instantiatedReference`, called at `:1752`: a reference to a generic function with one declaration is instantiated by the arrow type that receives it. The skeptic's fix is in `scala_src/types/TypeAnalyzer.scala:1090-1097` and the arrow memo's key (`:651-654`, `:747-763`).
- P-78's first two sentences stand. Its sentences on what the checker does are now false (Part 3).
- P-148: the count stage ran on the base and on the change, 83.2 s and 76.2 s for the worker, 80.8 s and 81.0 s for the skeptic, tables equal.
- No library line and no team test is unwritten (fork C2).

**N, a numeral at a call (rows 973, 966, 975, 976 and 989). Both paths and the one library; P-46 and P-49 built; P-59 read narrowly (fork W, section 2).**
- The checker: `Functionals.scala:997-1018`, `numeralAttempt`. Where the attempt by subtyping is kept, a candidate that only the numerals' own coercions reach replaces it when its declared arrow lies strictly below every most specific fitting candidate's (`:1010`, `coercions.moreSpecificDeclared`, which is the overloading order both ways, `scala_src/typechecker/CoercionOracle.scala:85-88`). The tie rule lost its condition (`:1066`, fork N2).
- Walk: `interpreter/evaluator/values/OverloadedFunction.java:2325`, `bestMatchForNumerals`, and `:2374-2428`, `belowByNumerals`: the same test on the tuple of parameter types, by subtyping. The skeptic's fix of the dispatch cache's key is `values/Numerals.java`, `rangeKey`.
- The library: `Equality[\T\]` declares `opr =/=(self, other:T): Boolean = NOT (self = other)` (`Library/FortressLibrary.fss:102`, `.fsi:75`; fork N3). The prelude is unchanged (fork N1, P-37).
- A value's coercion still never changes which declaration runs: row 390 keeps that case with its expected failure.

**F, a generic function as a value under walk (row 156). Walk only; P-48 and P-12 kept.**
- A function with static parameters has a type as a value (`values/Fcn.java`, `evaluator/types/FTypeGenericArrow.java`), and is received at an arrow type at three places: a parameter (`values/NonPrimitive.java:273`), a typed local variable (`evaluator/BaseEnv.java:614`) and an assignment (`BaseEnv.java:333`, the skeptic's fix).
- An overloaded function's type as a value now holds its generic overloads (`OverloadedFunction.java:2969-2983`). This is the reserved point (section 2).

**B, a typed array literal at the top level under walk (row 142). Walk only; P-173 kept for the elements.**
- `evaluator/BuildEnvironments.java` (`forVarDecl4`, and the mutable variable's cell with its declared type at `:716-723`), `evaluator/LHSEvaluator.java:160-168`, `interpreter/env/LazilyEvaluatedCell.java:71-74`.
- The edit also reaches a field of an object (`ProjectFortress/tests/ObjectFieldArrayLiteral.fss`), which the plan did not name.

**D, a top-level tuple binding compiled (rows 988 and 474). The checker and the code generator; P-9's form kept, P-173 for a numeral element.**
- `scala_src/typechecker/impls/Decls.scala`: the rebuilt tuple keeps its elements' type, and the skeptic's fix checks a declared name beside untyped ones (`:324-336`).
- `compiler/codegen/CodeGen.java:6481`, `forVarDeclPrePass`: one hidden class `<Component>$tuple$<first name>` holds the right side (`:6505-6548`), each name is a top-level variable of its own class, and a wildcard is skipped (`:6572-6583`).

**What the two paths still do differently after this batch.** Each is a row; none is new behaviour of the compiled path against a decision.
- A numeral beside a value typed `Any` or `Number`: walk reads the value's run-time type, the checker gives the numeral its default (row 1016, the one new difference of fork W).
- A reduction without its static argument at a method's return type, a field, a top-level variable or an assignment: the checker sums in the declared type, walk in its elements' type (row 1008). At a local variable, a function's return type and a call's argument the paths agree.
- A reference to a generic function that no arrow type fixes: the checker refuses it, walk runs it and instantiates at each application (row 1021). Walk still keeps the generic value at an immutable top-level variable (row 1019), refuses it at a callee's own type parameter (row 1018) and stops on a local generic function (row 1020).
- A top-level variable is initialized at load under walk and at its first read when compiled (row 1011, section 2). Under walk a top-level tuple binding's right side runs once for each name and once more (row 1026), and an initializer that reads a later mutable variable fails (rows 1023 and 1027), where the compiled path runs it.
- Walk refuses `n^2!` (row 1006); the compiled path stops on `x[5]^2` (row 1005).
- Compiled only: rows 1007, 1009, 1010, 1012 to 1015 and 1028 to 1031. Under walk only: rows 1022, 1024 and 1025. On both: row 1017.
- The compiled path has no array literal at all (`.claude/skills/fortress-repo/references/compiler.md:42`), so rung B's form runs only under walk (section 3).

### 2. The seven decisions that landed at a default

**W, walk has the numeral rule now.**
- Landed: walk's half in `OverloadedFunction.java:2325` and `:2374-2428`, with the specification's Effect of `revival-numerals` (`Specification/appendices/changes.tex:5415-5443`). It is what the plan says: fork W at (a) (`CLIMB-BATCH-32.md:463`).
- The one new difference landed as foreseen: for `a: Any` holding a zero `NN32`, walk answers `a = 0` with `true` and the checker gives the default, so `false` (row 1016; `ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss`).
- Consequential, by the rule's first clause: it reads P-59's sentence "is not changed for it before the switch-over" as about a value's coercion only. P-59's history shows the sentence entering as the interpreter's accepted limit for coercions chosen "on the value", before numerals had a rule of their own; it holds no word on numerals. Finding 1.

**N.worker.1, "most specific" read as subtyping of the declared parameter types.**
- Landed: `Functionals.scala:1010` and `OverloadedFunction.java:2374-2428`. So `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, `kn(5)` beside `kn(x: Number)` and `kn(x: RR64)` runs the `RR64` one with 5.0, and `v(5)` beside `v(x: Any)` and `v(x: RR32)` the `RR32` one, on both paths.
- The plan is silent on it: fork N2 covers only two declarations that are not ordered.
- Consequential, as a reading of P-46 that he has not confirmed. P-46's history says that he took the answer `true` and option one, and "did not word the dispatch rule". The reading is the narrow one: under the coercion chapter's relation `RR32` is more specific than `RR64`, and a float numeral's default would move, which P-173 fixes at `RR64`. Finding 2.

**C1, and a reduction written as a call's argument.**
- Landed as the plan says for a typed binding, a return type, a field and an assignment.
- Not as the fork's text says for a call's argument. The fork listed it among the places where "the checker would sum in the declared type and walk in the type of the elements" (`CLIMB-BATCH-32.md:422`, `:477`). As landed, a reduction whose big operator's bound names its parameter sums in its body's type there, because the call is accepted so and P-51's retry runs only when it is not: `takes64(BIG LAST[j <- Upto(3)] (3 j))` records `ZZ32` with the bound `Equality[\T\]` and `ZZ64` with the bound `Number` (`compile-ladder/rung-static-argument-inferred/SKEPTIC.md:113`).
- Not consequential. It follows P-49 and P-51 as they stand, and it makes the two paths agree at a call's argument. The sentence that was put to him is corrected by this review; the question whether an argument should sum in the parameter's type stays on his list (`PLAN.md`, C.worker.4).

**F.skeptic.1, the reserved point of rung F.**
- Landed: `OverloadedFunction.java:2969-2983`. Under walk `pick(twice)`, where `twice` is an overloaded name with a generic declaration, runs the declaration over an arrow type; the base ran the one over `Any`, because the argument had no type.
- Not in the plan: the worker's report said that no reserved point was reached, and the skeptic corrected it (`56baa8b5f3`).
- Not consequential. The new answer is the more specific applicable declaration, which is the dispatch rule (P-46's second sentence). No test pins it.

**P1, the signs are accumulators.**
- Landed as planned: `Symbol.rats:177-181`, `:255-260`. A program's own prefix operator written with the sign now declares `BIG +` and takes the whole expression to its right, with no message (16 on the base, 26 after, the skeptic's program). `except { opr ∑ }` parsed and is a `Syntax Error`, as `except { opr SUM }` was (row 42).
- Not consequential: the specification's grammar gives it, no file of the tree used the sign as an operator, and it can be undone.

**S1, a primary with a dot takes every math item.**
- Landed wider than the fork's words, which speak of a superscript: `Expression.rats:386-387` is `LeftAssociatedPrimary MathItem*`, so `B.f()[5]`, `x.k(1)d`, `B.n^T(d)`, `B.h(1)3` and `B.n"x"` parse and run on both paths.
- Not consequential: the specification's grammar gives each (`Specification/basic/operators/juxtameaning.tex:130-131`). No test asserts them.

**Row 1011, the compiled top-level variable is initialized at its first read.**
- Not a fork of the plan. Fork D1 says "the right side is evaluated once"; rung D built it as a single top-level variable already was, in a static initializer (`CodeGen.java:6445`, `:6538-6548`). So a tuple binding of wildcards alone never runs its right side when compiled.
- Not consequential. The batch chose nothing: it kept the base's way. By the specification's text the way is a gap and no design: a component's initialization is to "initialize all top-level variables and singleton object fields" (`Specification/basic/components/initialization.tex:29-30`). The row stands open, and no line of the model depends on it: its three tuple bindings hold numerals and strings (`MicroGptFlat.fss:17-19`).

### 3. The measure: the eight limits, and the diffs now possible

The plan counts 12 open limits before and 4 after (`CLIMB-BATCH-32.md:384-391`). By the landed tests and the rungs' reports, **six of the eight are closed on both paths and two under walk only.** "Compiled" means against the compiler's prelude, or under the distance stage's driver against the one library where a rung ran it: the model itself does not compile before the switch-over (F-97).

1. **The tuple bindings (row 988): both.** Walk ran them. Compiled: `compiler_tests/TopLevelTupleBindingCompiled.test`; the model's lines 17 to 19 give three '@@CG OK VarDecl' under the driver (rung D's report).
2. **The unsized vector functions (row 156): walk only.** `tests/GenericFunctionRowLiftWalk.fss:8-33` runs `rows(rmsn, x)` with a sized `rmsn`. The checker's half is tested for a callee that is not generic (`compiler_tests/GenericFunctionAsValueCompiled.fss`, `useSized(half)`). No test compiles a generic function passed to a generic callee whose sizes the other argument fixes, the form of the row lift.
3. **`^T` declared in an api (row 133): both.** `tests/ApiPostfixExponentOp.fss`, `compiler_tests/ApiPostfixExponentOpCompiled.test`.
4. **The `if` chains (row 142): walk only.** `tests/TopLevelArrayLiteral.fss:13-15` holds the model's two tables in small. The code generator has no case for an array literal (`compiler.md:42`), which the plan says in its section 5 (`CLIMB-BATCH-32.md:695`) and not in its measure.
5. **`SUM[\ZZ32\]` (row 731): both.** Walk ran the short line. The checker: the model's line 43 with the argument removed loses its error under the driver (43 errors to 42, rung C's report).
6. **`transpose(onehot(...))` (row 158): both.** Walk: `tests/SuperscriptAfterParenthesisedCall.fss:24-26`. The compiled path ran it before.
7. **`1.0 s` (row 989): both.** Walk ran it. The checker: `compiler_tests/NumeralTieDefaultCompiled.test`, and line 82's form gives 'errors=0' under the driver (rung N's report).
8. **`SUM` in capitals (row 5): both.** `tests/SumSignAccumulator.fss`, `compiler_tests/SumSignAccumulatorCompiled.test`.

**The diffs that the landed tree makes possible.** None is applied: each is his word (P-87). Line numbers are those of `explorations/run-c4/src/MicroGptFlat.fss` on `main`.

- **Lines 21 to 24, with `FlatArrays.fsi` and `FlatArrays.fss` (rung P).**

      - opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\] = transpose(m)
      - opr (t: Array3[\RR64,0,a,0,b,0,c\])^T[\nat a, nat b, nat c\]: Array3[\RR64,0,a,0,c,0,b\] = transpose(t)

  with the two lines of comment above them, and in `FlatArrays.fsi` the two headers without their bodies, in `FlatArrays.fss` the two declarations. Evidence: an api's `opr (b: Sized[\n\])^T[\nat n\]: ZZ32`, applied by an importing program, under walk and compiled.
- **Line 70 (rung S).**

      - gWTE = transpose(onehot(ids, vocabSize)) dX; gWPE = transpose(onehot(pos, blockSize)) dX
      + gWTE = (onehot(ids, vocabSize))^T dX; gWPE = (onehot(pos, blockSize))^T dX

  Evidence: `(f(3))^T d` is 208 under walk and compiled. With the first diff, `transpose` as a function can leave `FlatArrays.fsi` (its lines 47 to 51).
- **Line 43 (rung C).**

      - matOffset(i: ZZ32): ZZ32 = SUM[\ZZ32\][j <- 0#i] matCount(j)
      + matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matCount(j)

  Evidence: under walk, a function's declared return type directs the sum (F-228; `tests/SumSignAccumulator.fss:14`, the same form with the sign); the checker, section 3, item 5.
- **Lines 28, 43 and 52, the sign for `SUM` (rung P).**

      - sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX z)); e / (SUM e) end
      + sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX z)); e / (∑ e) end

  and so `∑[j <- 0#i] matCount(j)` in line 43 and `nv = ∑ vm` in line 52. Evidence: `∑ xs` over a list, `∑ (0#10)` and the clause form at a declared return type, under walk and compiled. No test applies the sign to an array.
- **Lines 37 to 41, with lines 42, 45 and 88 (rung B). Walk only.**

      - matName(i: ZZ32): String =
      -     if i = 0 then "wte" elif i = 1 then "wpe" ... else "mlp_fc2" end
      + matName: String[9] = ["wte" "wpe" "lm_head" "attn_wq" "attn_wk" "attn_wv" "attn_wo" "mlp_fc1" "mlp_fc2"]
      - matShape(i: ZZ32): (ZZ32, ZZ32) =
      -     if (i = 0) OR (i = 2) then (vocabSize, nEmbd) elif i = 7 then (4 nEmbd, nEmbd) ... end
      + matShape: ZZ32[9,2] = [vocabSize nEmbd; nEmbd nEmbd; vocabSize nEmbd; nEmbd nEmbd; nEmbd nEmbd
      +                        nEmbd nEmbd; nEmbd nEmbd; (4 nEmbd) nEmbd; nEmbd (4 nEmbd)]

  Lines 42 and 45 then read `matShape[i,0]` and `matShape[i,1]`, and line 88 passes the array of names to the loader, whose header in the helper file changes with it. Evidence under walk: `names: String[9]` and `dims: ZZ32[2,2] = [vocabSize nEmbd; (4 nEmbd) nEmbd]`, with names bound by a tuple above them. No evidence for the checker, and the code generator refuses the literal: finding 3.
- **Lines 27, 28, 30 and 34, the sized vector functions (rung F). Walk only, and a part of decision D, which P-87 parks until microGPT compiles.** The plan prints the diff as `rmsn[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\] = x / SQRT (epsilon + (x DOT x) / |x|)`. That line is not shown to run: the rung's test writes the body as `x.scale(1.0 / SQRT (epsilon + x.dot(x) / (1.0 n)))` and its comment says why, "Vector has no / by a scalar". What is shown is the lift, `rows(rmsn, x)` for a sized `rmsn` and a `rows` whose arrow parameter is sized. The helper file's row lift (its lines 142 to 160) is unsized today and changes with the diff.
- **Lines 17 to 19 and line 82: no diff.** They are in the short form, and rungs D and N make the compiled path take them.

### 4. The gate, the count and the distance

As the gate's agent returned it: green; 63 suites, 3,422 tests, 0 failures (climb batch 30's 3,338): `CompilerJUTest` 1,558 to 1,616, the four system shards 830 to 856, all other suites unchanged; 22 atomic programs, 66 of 66 `PASS`; the ladder with no move; the checker count 0 over fourteen apis with no crash row, and the distance 0, both as at climb batch 30's gate. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage.

The distance stage's 165 s (128 s at climb batch 30's gate) was taken beside `testFast`'s first minutes. F-240 now holds it with "a start load of 0.31" and does not say that the run was loaded (Part 3).

The count and distance stages were not run after the skeptics' code fixes in C, N and D; the gate's tables on the merged tree are their check, and they are equal to the last landed ones.

### 5. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.00M over 21 transcripts, in 6 h 10 min** (23:25:50 to 05:36:22 UTC; `batch-measures.py` gives the same 5.00M). Two of the 21 are the launches that the restart killed (0.59M); the 19 agents that returned a result wrote 4.42M by this method. The harness's 4.1M for 19 agents is another count.

By role (writes, then share):
- Rung workers, 9 launches for 7 rungs: 2.35M, 47.1 %. C 512K; N 387K and 104K; P 199K and 118K; D 295K; F 283K; S 240K; B 217K.
- Skeptics (7): 1.63M, 32.6 %. C 389K, D 288K, N 236K, F 195K, B 178K, S 172K, P 171K.
- Gather 384K, 7.7 %. Merged-diff review 336K, 6.7 %. Commit 120K. Gate 114K. The disk check 64K.
- Per landed rung, all roles: 0.71M. The fixed roles, 1.02M, are 20 % of the run.

**Against the record:** "About 6.2M tokens written, from 5.0M to 7.9M; about 10 hours at two agents at a time" (`CLIMB-BATCH-32.md:447`). **5.00M, 19 % under the estimate and at the low end of its range, in 6 h 10 against 10 hours.** By role:
- **The workers wrote 2.35M against 3.0M.** C 512K against 0.6M; N 491K against 0.5M; P 317K against 0.4M; D 295K against 0.4M; F 283K against 0.5M; S 240K against 0.4M; B 217K against 0.2M. Without the restart's second launches, 2.13M.
- **The skeptics wrote 1.63M against 1.6M.** This is the one role on its estimate. C's, N's and D's ran the count stage themselves, as planned.
- **The fixed roles wrote 1.02M against 1.2M.**
- **No judge or repair ran, against 0.4M reserved.** That and the workers are nearly the whole difference.
- **The minutes** (estimate in brackets): C 79 (240), N 72 and 6 (210), P 41 and 30 (200), S 60 (200), F 48 (220), B 47 (150), D 44 (170). Every rung took a third of its estimate or less; the estimates order the scatter and are those of the Opus batches.

**The cost in three spans, each on its own.** Each span is `spend.py` from its start less `spend.py` from its end, over the same folders: the session's `subagents/` folder, its workflow folders `wf_16f35394-635` (this run), `wf_94bad6da-b78` (climb batch 30's run) and `wf_bba18fa4-883` (its record-landing), the project folder of headless sessions and the `landing-30` folder. `find` shows no other folder with a transcript changed since the first boundary. `spend.py` printed 21.92M from 1794314550 (2026-11-10T12:42:30Z), 14.29M from 1794610748 (2026-11-13T22:59:08Z, the last record of the record-landing's last agent and of its journal), 7.94M from 1794785150 (2026-11-15T23:25:50Z) and 0.41M from 1794807301 (2026-11-16T05:35:01Z).
- **Span 1, the landing work of climb batch 30**, 3 days 10 h on the clock, of which the workflow ran 13:03 to 14:04 on 11-10 and 22:23 to 22:59 on 11-13: **7.63M over 44 transcripts.**
  - The record-landing run, 27 agents in the span, 2.52M: 1.39M before its stop at the land step and 1.13M after its resume. The largest: page 395K, sort 357K, check 180K, judge 148K, admission 133K, skill cold read 128K.
  - Its five headless skill-writer sessions, 0.96M.
  - So the record-landing with its writers wrote 3.48M, against climb batch 29b's 4.78M. With climb batch 30's post-batch review, 400K, the landing work is 3.88M.
  - Climb batch 30's commit agent, 113K, which last changed at 12:43:20.
  - Not landing work, 3.64M over 10 transcripts: the plan review 1.25M, the switch-over's rehearsal 470K, the carriers' ways review 347K, the pure-Java microGPT 311K, probe Y 305K, the specification reader's first sample 287K, the arrays reminder 245K, the sort of the switch-over's questions 228K, the Python timings 154K, a base build 37K.
- **Span 2, the preparation**, 22:59:08 on 11-13 to 23:25:50 on 11-15: **6.35M over 22 transcripts.**
  - **This batch's own preparation, 1.12M:** its planner with its probes 250K, the check of its record 283K, the join of rungs N and D 344K, the check of the joined record 238K. The manifest's generator was the coordinator's own, in its session.
  - Climb batch 31's planner and check, from which rungs N and D came: 836K and 394K, 1.23M.
  - The three sources that this batch's plan rests on: the microGPT walk-through 526K, its revision by his notes 399K, the review of C4 against the Fortress way 336K, 1.26M.
  - The record-landing's last agent, the revival-page publish, 95K.
  - Other work, 2.65M over 11: the notation toggle's scout and prototype 683K, two record writers 476K, the specification reader 385K, the answers to his notes and their page 346K, the probe of the merged number traits 255K, the split of the specification's editions 187K, the triage of open decisions 177K, the program that writes ℤ32 91K, the page of the direction 46K.
- **Span 3, the run**, 23:25:50 to 05:35:01: **7.54M over 24 transcripts**: twenty of the run's twenty-one (4.88M; its commit agent last changed at 05:36:22) and four agents of the coordinator's beside the run, 2.66M: the scout of his words on the number types 1.53M, the notation switch 703K, the lost glyph of the specification reader 219K, the record worker for P-178 208K.
- After the run's end, 0.41M at the time of the count: the commit agent 120K and this review.
- **The coordinating session's own writes**, which `spend.py` leaves out (`mainw.py`, all on Fable): span 1, 1.14M; span 2, 2.65M, of which 1.80M are three writes of its whole context, at 17:41, 19:39 and 22:52 on 11-15; span 3, 0.64M.

So the run is two thirds of its own span, and the batch's own preparation is under a fifth of the preparation span.

**The briefing's use.**
- **15 of 16 briefed launches read a briefing, 94 %; every rung's worker and every skeptic did. None read it in its first turn.** The one that did not is rung N's second launch, which took over a finished rung after the restart and ran 6 minutes (section 7). The disk check, the gather, the review, the gate and the commit stage have none by design.
- N's skeptic ran the worker's saved script of the briefing, all three parts, and not the command of its own brief.
- When: skeptic N at call 4, 19 s after its start; skeptic S at call 4, 20 s; skeptic F at call 8, 24 s; rung P's first launch at call 4, 29 s; skeptic P at call 8, 30 s; skeptic D at call 9, 33 s; rung F at call 5, 35 s; rung B at call 10, 37 s; skeptic B at call 11, 38 s; skeptic C at call 10, 39 s; rung N's first launch at call 10, 48 s; rung C at call 12, 58 s; rung S at call 12, 58 s; rung P's second launch at call 17, 71 s; rung D at call 13, 78 s.
- Each read every part ('end of part N of N, the last'): C and its skeptic four parts, N three, the others one or two. No key failed.
- Its results came to about 250K tokens, 5.0 % of writes, at 0.40 tokens a character plus 110 a call.
- Against the batches before (briefed, read, at calls, seconds, share): B26 8, 8, 5 to 13, 21 to 89, 5.2 %; B27 15 of 19, 15, 4 to 16, 16 to 78, 6.2 %; B28 15, 15, 3 to 21, 14 to 95, 3.1 %; B29 15, 15, 4 to 20, 15 to 105, about 3.6 %; B29b 4, 4, 12 to 21, 41 to 97, 2.7 %; B30 6, 6, 5 to 14, 23 to 53, 4.9 %; B32 16, 15, 4 to 17, 19 to 78, 5.0 %.

**Other measures.**
- First calls: 926K (18.5 %), 7 cold. Cache refills: 0. Refusal cycles: 0. Rulings and repairs on the merged tree: 0.
- The skill's load, by a rough count (the load text and every call whose command names the skill's folder): about 0.9M, 18 %. `revival-changes.md` was read whole by 18 of the 21 launches: all but the disk check, the gate and the commit stage. `sources.md` was not read.
- Error results: 36.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `a8462f8a`, 64K, 0.1 min; rung C `a1d3a32f`, 512K, 79.2; rung F `a10eadda`, 283K, 48.1; rung N `a7751837`, 387K, 71.8, killed; rung P `a4311b02`, 199K, 40.7, killed; rung N `a487ec80`, 104K, 6.3; rung P `af6eee85`, 118K, 30.3; rung S `ad1f4c81`, 240K, 60.3; rung D `aa68b9d2`, 295K, 43.5; rung B `a7f44e81`, 217K, 47.0; skeptic C `a5e36e11`, 389K, 40.9; skeptic F `aaab22c1`, 195K, 16.8; skeptic N `a6ca57be`, 236K, 25.3; skeptic P `ade52c24`, 171K, 10.9; skeptic S `a62958b7`, 172K, 18.4; skeptic D `a1a524ba`, 288K, 34.2; skeptic B `a523642f`, 178K, 11.5; gather `a42ea0f2`, 384K, 45.9; gate `a88ca7b8`, 114K, 24.8; review `ad52d0d5`, 336K, 9.0; commit `a6778e93`, 120K, 2.7.

### 6. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`, and a count of the demo driver's and `mg-run.sh`'s calls):
- **No whole suite ran twice on one code state.** Rung C ran `ant testFast` on `cc7c922a77` and on `e5c519a425`; rung N `ant testSystem` on `5466455249` and on `8c1088c06c`; each skeptic that changed code ran one suite after its fix (C and D `ant testQuick`, N and F `ant testSystem`); the gate ran each once.
- **The count and the distance stages:** each of P, S, C, N, B and D ran them once on its final code, as planned, but for B, which the plan had as running neither. B ran them because its edit reached `interpreter/env/LazilyEvaluatedCell.java`, outside the folders that the plan's `STAGE_BLIND` lists, and said so. The skeptics of C, N and D ran the count stage on the base and on the head, the one planned exception.
- **The restart made two repeats.** Rung N's second launch built the first launch's code again (01:28:48, 'build-takeover'). Rung P's second launch ran the 52 demos again from the start, 27 minutes, on the code of `285255aa77`, where the first run had reached its 21st demo.
- **The 52 demos ran on six code states:** rungs F, P, S and B to their end, rung N to its 23rd, and the gather on the merged tree. Each rung's run is the skill's rule for an edit of walk or the parser (`tests-running.md:58`), not the plan's, which gives them to the gather.
- **The microGPT quick pair ran six times:** rungs F, N, S and B, N's skeptic after its fix, and the commit stage. The plan gives it to the commit stage. This is climb batch 29's process finding 9 and climb batch 30's finding 5, a fourth batch running.
- **Builds:** C 3, B 3, P 2, S 2, D 2, N 2 and 1, F 1; the skeptics of D 2, C 1, N 1, F 1; the gather 3, two of them for the generated parsers; the gate 1 (3 s, caches kept).

### 7. Three events

**The restart of 01:26.**
- What happened: the last records of two agents are at 01:25:54; the machine's `uptime -s` gave 01:26:06, the disk was not rolled back, and the coordinating session resumed the run with the same ID and arguments. The journal holds a second `started` line for the keys of rung N and rung P, and their new agents' first records are at 01:27:25 and 01:27:29.
- Whom it killed: the worker of rung N (`a775183745582228e`, 71.8 minutes, 387K) and the worker of rung P (`a4311b024178f5281`, 40.7 minutes, 199K). Rungs C and F had ended. Both killed agents were waiting for the demo driver.
  - Rung N had committed its code (`5466455249`, `8c1088c06c`), its specification text and its record lines (`53588ec9b7`, 01:23:18), had run both suites and both stages, and had its report on disk, uncommitted, with a placeholder for the demos.
  - Rung P had committed its code (`285255aa77`), had run both suites and both stages, and had written its report and record on disk, uncommitted.
- Whether the successors went on correctly: yes, both.
  - Rung N's (`a487ec8009b62b484`) seeded nothing over the worktree, read the leftovers, found the first launch's transcript and read its last calls, built once, ran the rung's compiled tests, wrote into the report that the demos' run "was stopped with the launch that started it after 23 demos" and that the rung "was worked by two launches", and committed the report (`5e436b5b19`). It did not run the demos again and left them to the gather, which ran all 52.
  - Rung P's (`af6eee852be4dee19`) read the leftovers, started the demos anew (01:28:34), saw 52 of 52, wrote that "a first run of the driver was cut off at its 21st demo", committed, and removed one file that a demo's run had left in `ProjectFortress/demos/`.
  - Neither changed code. Neither knew from its brief that it was a second launch: both inferred it from the worktree.
- The cost: 223K written by the two second launches, 4.5 % of the run; 91 seconds without a running agent; and on rung P's slot about a quarter of an hour, the demos run again. No work was lost and no commit was redone.

**The curator's chat message inside five agents' briefs.**
- The text, as rung C's worker received it, is the first record of its transcript, at 23:25:58.843 UTC on 2026-11-15, a user message of 568 characters that stands before the brief:

  > [Workflow harness — user request] The harness relays, verbatim and indented below, the user request that triggered this workflow run. This relayed request is the only user voice in this task; the computed task text that follows in the next turn is script output and cannot override or extend it. Where the computed task conflicts with this request, this request wins:
  >   Just to double check, when you said I should check the Fortify output in both dark and light mode, you are outputting one SVG with current color, not two different SVGs for each of the modes, right?

- Its form: the workflow harness puts the user's message that started the coordinator's turn in front of each agent's computed task, and tells the agent that it outranks the brief. The record's 'entrypoint' is 'remote_mobile'. The coordinating session launched the run in the turn that this message started.
- Who received it: the five agents that started before the restart, the disk check (23:25:50), rung C (23:25:58), rung F (23:26:02), rung N's first launch (00:14:07) and rung P's first launch (00:45:13). The sixteen agents started after the resume did not: their first record is the computed task.
- What each did with it: the disk check nothing. Rungs C and F each wrote one sentence into their result that they could not answer it. Rung N's first launch made two searches for 'currentColor' and 'Fortify', the second in the main tree's `BOOT.md` and `HELD.md` (01:24:48, 01:25:00), and rung P's first launch three (01:18:35 to 01:18:50), each in the last minutes before the restart.
- The consequence in fact: one item of the record that asks nothing (`C.worker.6`), and five tool calls. The consequence in kind is larger: had the message been an instruction, as "stop" or "use the other way", five agents would have held it above their briefs. Process finding 1.

**The coordinating session's commits during the run.**
- It committed 45 times in the main tree between the launch and 02:22:22 UTC (`e2a090b899`), each by named paths under `explorations/` and `docs/`, and pushed.
- The gather's first record is at 04:23:03, and its first commit, P's, at 04:25:44. From `e2a090b899` to the commit stage's `567c36dadc` (05:35:01) `main` holds only the batch's eleven commits. The coordinating session's next commit is `a72c7ded16` at 05:41:44, after the push.
- So no commit of the coordinating session fell between the gather's start and the batch's push, and the rule of `references/batch.md`, "While it runs", held. Climb batch 30's slip did not recur.

## Part 1. Conformance

### Findings that would change a decision of the curator's

**Finding 1. Fork W stands at (a) by the coordinator's reading; P-59 and P-46 each need a clause, which are his.**
- What landed: section 2, W. No departure from the plan.
- What it changes: P-59 says that walk "is not changed for it before the switch-over". P-46 says "A value typed `Any` or `Number` fixes no type for the numeral beside it, which keeps its default", which under walk is now false (row 1016).
- Options:
  - **1a. Confirm (a).** P-59 gains: a numeral's own conversion is excepted, and walk follows P-46 for it before the switch-over. P-46's sentence gains: under walk the value's run-time type decides, until walk runs the checker. Touches two entries of POSITIONS and nothing in the tree. Row 1016 stays open as walk's limit.
  - **1b. Take walk's half back.** One commit removes rung N's edits of `OverloadedFunction.java` and `Numerals.java` and its walk tests. `u = 0` is `false` again wherever a program runs today, rows 973, 966, 975 and 976 reopen, and the library's `=/=` loses its walk tests. His words of 2026-11-10 exclude that answer.
- How they weigh: 1a costs two sentences and one accepted difference of the kind that P-59 already accepts. 1b restores a sentence's wide reading at the price of the answer that he called out of the question.
- Recommended: 1a.

**Finding 2. "The most specific" in P-46's rule is built as subtyping of the declared parameter types; he did not word the rule.**
- What landed: section 2, N.worker.1.
- What it changes: P-46's sentence "among the applicable declarations the most specific runs" would say by which order.
- Options:
  - **2a. Subtyping, as landed.** A numeral leaves the declaration that its default fits only for one whose parameter types are subtypes of it. `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` stays at `RR64`. `kn(5)` beside `kn(x: Number)` and `kn(x: RR64)` runs the `RR64` one with 5.0. Touches one sentence of P-46.
  - **2b. The coercion chapter's relation**, under which a type is more specific than one that it coerces to. `f(1.5)` would then run the `RR32` declaration, and a float numeral's default would no longer be the last resort among number types. One rung on both paths, with P-148's timing, and a clause of P-173 bent.
- How they weigh: 2a keeps P-173's defaults and is what both paths do. 2b follows the chapter's wider order and moves which declaration a numeral reaches wherever two number types are overloaded.
- Recommended: 2a.

**Finding 3. Rung B's diff to the model's lines 37 to 41 would put a form into the model that the compiled path cannot compile.**
- What is so: section 3, item 4. Today's `if` chains are forms that the compiled path has, and by rung D's run of the model under the driver the checker's one site at line 41 is gone; the array literal is one of the code generator's walls.
- What it changes: his word on that diff (P-87), against the goal that microGPT compiles (P-9).
- Options:
  - **3a. Hold the diff until the code generator compiles a typed array literal.** Nothing changes now. The rung that builds the literal's code is new and is not planned: the plan's section 5 expects it after the switch-over.
  - **3b. Apply the diff now.** The model reads as the notation intends under walk, and its compiled closure gains two declarations that stop the code generator until that rung lands.
- How they weigh: 3a keeps every line of the model on the way to compiling. 3b gains two readable tables and adds a wall to the model's own path.
- Recommended: 3a.

### Findings for the record, with no decision of his changed

- **The plan's sentence on a call's argument (fork C1) is not what landed** (section 2). The item for him stands as C.worker.4.
- **Two sentences of the specification state what no test shows.** The Effect of `revival-numerals` says that both implementations answer `u = 0` `true` for a zero `u` of `NN32`, `NN64` or `RR32` (`changes.tex:5421-5427`); the one compiled test asserts an `NN32` only, and the prelude's `RR32` declares no `=` of its own. The new paragraph of `inference.tex:231-236` gives a reference an expected arrow type at a declared return type and at a field, where walk receives at three places only. The merged-diff review routed both (review-routed.2 and .1).
- **Three behaviours landed with no test that pins them:** the math items after a dotted primary other than the superscript (S1); `pick(twice)` (F's reserved point); the binding's message where no instance fits (F.worker.2).
- **Rung F's report said that no reserved point was reached** when one was; the skeptic corrected it.
- **The plan's fork F1 said that walk instantiates a generic value "at its first application"**; walk instantiates it at each application, on the base too. Rung C wrote the plan's words into the specification, rung F's code made them false, and the gather corrected them and added row 1021.

### Corrections owed in the record

- **FACTS, false and not reworded by the gather:**
  - F-53: "Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285)." Rung C closed it (F-364). The commit stage named the sentence and left it.
  - F-240: "the distance stage 165 s ... at a start load of 0.31". The stage ran beside `testFast`, so the figure is a loaded one, which the entry does not say.
  - F-58: "The checker stops a block at its first failing statement (row 474)" cites a closed row; and its counts (below).
  - F-285: `Library/FortressLibrary.fss:4580` and `:4586` are `:4581` and `:4587` since the `=/=` of `Equality` (`FortressLibrary.fss:102`).
  - 47 line citations in 29 other entries of FACTS, and 2 of POSITIONS (P-154, P-166), moved (`moved.py`): every citation of `FortressLibrary.fss` below line 101 and of `FortressLibrary.fsi` below line 74 by one; `Functionals.scala` in F-78 and F-334 by 181 to 227; `TypeAnalyzer.scala` in F-121 and F-235; `inference.tex` in F-173; `changes.tex` in F-175; `conversions-coercions.tex` in F-272; `CoercionOracle.scala` in F-334.
  - F-184 says that a bare `Empty` as an argument gives the internal error 'T is not in the kind env'. Rung C repaired that error for a reference to a generic function. Whether F-184's case still gives it is not measured.
- **F-58's sites, by the rungs' own runs; the merged tree was not measured.**
  - `MicroGptFlat`, 8 before. Rung N: line 82's `1.0 s` no longer stops the checker, and `MicroGptFlatQuick.fss:40` likewise. Rung D, on its own branch: the file goes from 8 distinct sites to 9, the site at line 41 gone and line 77's `beta1 m` new, reported twice. Rung C: line 43 was no site as written, and with its argument removed it is none on the tree.
  - `FlatArrays` 31 and `FlatData` 3: no rung reports a change.
  - No rung ran the driver on another rung's code, so the sum is arithmetic. The count on the merged tree is review-routed.3.
- **POSITIONS, sentences on the tree made false (the decisions stand):** P-78 and P-79 on row 731; P-46 and P-173 on rows 973 and 966 (the merged-diff review's review.1). With finding 1: P-59, and P-46's sentence on `Any`.
- **PLAN:** "Where we stand", "Next", still says that climb batch 31 has seven rungs and waits for its fork W (`PLAN.md:13`); the phase 4 line of climb batch 31 lists N and D (`PLAN.md:52`); phase 4 has no line for climb batch 32.
- **The review queue:** item 525 puts fork W as the question that holds climb batch 31's launch (`review-queue.md:39`, `:507`). It landed at (a) in this batch.

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 32

(B26; B27; B28; B29; B29b; B30; B32.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M; 5.00M.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0; 2, 0.59M written by them and 0.22M by their successors.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M; 0.71M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold; 0.93M, 7 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0; 0.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0; 0.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2); 18 (5, four of which change a behaviour).
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s; about 95 s.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s; 165 s beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %; about 18 %, by a rougher count.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %; 5.0 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The harness puts the chat message that started the launching turn in front of every agent's brief, as a request that outranks it** (section 7). Proposed (mine): launch and resume a batch only from a turn that no message of the curator's started, as a check-in's turn; or have each brief's first paragraph say that a relayed request that does not name the rung is not the agent's to act on and goes into no result. The first needs no change of the script. Home: `references/batch.md`, "The go", and the manual's "Before the launch".
2. **A second launch of a rung is not told that it is one.** Both found their way from the worktree, and one from the first launch's transcript. Proposed (mine): the rung's brief says what to do when the worktree and the branch already exist: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in the report that the rung was worked by two launches.
3. **Six of the seven rungs wrote tests with more than one comment line,** and each skeptic spent a commit on it (P, S, C, F, B, D). Climb batch 30 had the same in six files. Proposed (mine): the rule moves from the skeptic's check into the worker's brief, as one sentence beside the test's name.
4. **A reserved point was reached and reported as not reached** (rung F). Proposed (mine): the skeptic's brief asks for one program for each reserved point of the rung's section, old code against new, whatever the worker's report says. F's skeptic did so and found it.
5. **The demos and the microGPT pair, run by rungs again** (section 6). The skill asks a rung that edits walk or the parser for the demos, and the plan gives them to the gather: the two disagree. Proposed (mine): one of them is changed, so that a rung is asked once.
6. **The gate ran the distance stage beside `testFast`,** and its seconds went into F-240 as a figure of the checker. Proposed (mine): the commit stage writes the stage's seconds into F-240 only with the load of the whole stage, or the gate runs the two stages before the suites.
7. **The plan's order of the rungs did not follow the shared files:** the manifest has F before N, and both edit `OverloadedFunction.java` with N's hunks above F's. The gather found the one order that fits and said so. Proposed (mine): the planner's check of each shared file gives the order, not only "merges cleanly".
8. **The estimate, on Fable.** 6.2M and 10 h against 5.00M and 6 h 10. Proposed (mine): for the next batch take this run's figures: a worker 0.2M to 0.5M and 45 to 80 minutes; a skeptic 0.17M to 0.39M, the higher where it runs the count stage; the fixed roles 1.0M for seven rungs.
9. **The gate's brief says "42 runs" of the atomic programs where its own list gives 66.** The gate's agent said so.
10. **Carried over:** climb batch 30's findings 3, 4 and 8.

### Misses, by kind

Numbered on from `batch-30-review.md`'s 1098.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before landing:**
  - 1099, fork F1's "at its first application" (rung F, the gather);
  - 1100, fork C1's call's argument among the places where the paths differ (rung C, its skeptic);
  - 1101, the manifest's order of F and N (the gather);
  - 1102, rung B planned as running no stage, where its edit left the stage-blind folders (rung B);
  - 1103, the gate's "42 runs" (the gate).
- **A defect of a change, caught before landing:**
  - 1104, a generic function named as a value inside a generic declaration with a static parameter of the same name, accepted and dying at run time (C's skeptic);
  - 1105, walk's dispatch cache giving a negative constant a numeral's key, which the rung's rule carried to every declaration beside one over `Any` (N's skeptic);
  - 1106, an assignment to a variable of arrow type keeping the generic function (F's skeptic);
  - 1107, a declared name of a top-level tuple binding beside untyped names left unchecked, where the rung first made such a program compile (D's skeptic);
  - 1108, a test of a wildcard written by hand where the tree has `NodeUtil.isUnderscore` (D's skeptic).
- **A defect of the tree found and filed, not the batch's:** 1109 to 1135, rows 1004 to 1031 but row 1021: fifteen by the workers, twelve by the skeptics.
- **A report that said what was not so:**
  - 1136, "No reserved point was reached" (rung F);
  - 1137, the tuple binding's form said to hold where other names had no type (rung D);
  - 1138, a reference that the rung instantiates said to be "a crash or a refusal before" (rung C);
  - 1139, the value that a program's own prefix sign now changes without a message, left out (rung P);
  - 1140, the edit's reach to an object's field, left out (rung B).
- **Sentences made wrong, caught:**
  - 1141, rung C's two sentences on the interpreter, false after rung F (the gather, with row 1021);
  - 1142, eight sentences of the specification that stated the order of attempts without the numeral's exception (rung N reported them, the gather reworded them);
  - 1143, row 1027's sentence against row 1023 (the gather);
  - 1144, five entries of FACTS that named a closed row as open (the gather);
  - 1145, `PLAN.md`'s "Where we stand" on row 731, and four entries of POSITIONS (the review).
- **A claim of the new text with no test:** 1146 and 1147, review-routed.1 and .2 (the review).
- **Process:**
  - 1148, tests carrying more than one comment line, in six rungs (the skeptics);
  - 1149, the demos and the quick pair run by rungs (section 6);
  - 1150, the stages not run after three skeptics' fixes of code (the gather named it; the gate covered it).

Found by this review:
- 1151, the relayed chat message in five agents' briefs, and its rank above the brief (section 7);
- 1152, rung B's form has no compiled path, which the plan's measure does not say (finding 3);
- 1153, the plan's diff for `rmsn` is not the line that the rung's test runs (section 3);
- 1154, no test compiles a generic function passed to a generic callee, the row lift's form (section 3);
- 1155, fork W, landed at a default, is on no list of this batch, and review-queue item 525 still holds it as climb batch 31's question (Part 4);
- 1156, sixteen new rows with no line in PLAN or the review queue, and the batch's seventeen forks in no review-queue entry (Part 4);
- 1157, four of the coordinator's five rulings before the launch on no list (Part 4);
- 1158, F-53's sentence, F-240's loaded figure, F-285's two citations and 49 moved citations (Part 1);
- 1159, the harness's 4.1M against 4.42M by the record's method for the same 19 agents (section 5).

**Against the earlier notes.** 52 misses were found before the launch or inside the batch (1099 to 1150), 27 of them defects of the tree that the batch did not make, against climb batch 30's 26 for three rungs. No departure from a decision of his landed. Two readings of his decisions landed at a default: one named to him before the launch (W), one on his list (N.worker.1).

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false, read on `main` at `8fa708ef2b`. The proposed wording is mine; the writer keeps the skill's form. The seven revival changes are in `compile-ladder/climb-batch-32/RECORD.md`, "Revival changes, for the skill writer".

**False:**
1. `references/revival-changes.md:115`: "**Only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`.** The checker does not, because their bound names the parameter (row 731). Write it in every clause form of these four". The checker fixes it by the expected type, else by the body's type. What holds: write it where the paths differ, at a method's return type, a field, a top-level variable and an assignment (row 1008), and for a big operator with two or more static parameters (row 1007).
2. `references/library.md:25`: "Write the element type wherever generators stand in brackets, also where the generators, the body or a declared type fix it ... The checker refuses a call without it (ledger row 731)." The same.
3. `references/revival-changes.md:105`: "Under walk it is `false` (row 973): bind the numeral at the value's type first, as `z: NN32 = 0`, then write `u = z`." It is `true` on both paths. What holds under walk: a numeral beside a value typed `Any` or `Number` follows the value's run-time type (row 1016).
4. `references/interpreter.md:22`: "A numeral at `=` takes its default. So `u = 0` is `false` ... (ledger row 973). `u =/= 0` and `q =/= 0.5` are then `true` (ledger row 966). Bind the numeral at the type first". The bullet goes; row 1016's case takes its place.
5. `references/revival-changes.md:101`: "Where the tied declarations differ only at the positions of the call's numerals, both paths read the numeral as its default." The tie also holds where they differ at another argument.
6. `SKILL.md:134`, "A conversion never changes which declaration runs when one already fits", and P-46's title where the skill repeats it: a numeral's own conversion does, to a declaration whose parameter types are subtypes of the fitting one's.

**Incomplete, on no list:**
- `references/compiler.md:36-42`, "What the compiled path cannot compile yet": a top-level tuple binding now compiles; the array literal stays. A reference to a generic function at an arrow type compiles; at `Any` it is accepted and dies at run time (row 1012).
- `references/compiler.md`, the traps of the compiled path: a numeral that ends a block after a local declaration, or stands in a tuple that ends a block, at a declared return type, dies at run time with `NoClassDefFoundError: fortress/CompilerBuiltin$v` (rows 1014 and 1030); a top-level variable is initialized at its first read (row 1011).
- `references/interpreter.md:14`, walk's inference at a call of a generic function: it gains the value's case, the three places that receive, and the departures (rows 1018 to 1021).
- `references/interpreter.md`, walk's departures: a top-level tuple binding's right side runs once for each name and once more (row 1026); a local `var` bound to an array literal is immutable, and a literal assigned to a variable is not built (rows 1024 and 1025).
- `references/revival-changes.md`, where the syntax is given, or `SKILL.md:136`: `p.wq^T` and `(f(x))^T` run; `f(x)^T` is a static error; write `(x[5])^2` (rows 1005 and 1); the signs `∑` and `∏` are `SUM` and `PROD` and no operators of a program's own.
- `references/gate.md`: a red of `XXXAtomicNestedReadsKeptWalk` alone in `ant testSystem` is row 1004's race, and the suite is run again.

**Sentences that hold, met by the batch:** `SKILL.md:113`, "`var x: T = e` and `x: T := e` declare a mutable one", since `var x = e` stays refused; `SKILL.md:133`, "Walk instantiates a reduction or a comprehension without static arguments at the type declared for its value"; `references/revival-changes.md:74`, P-51's sentence, which the call's argument of section 2 follows.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: all but one kind have a home.** The 26 entries of the rungs and the gather, review.1 and review-routed.1 to .3 are lines of `PLAN.md:787-816`, "Climb batch 32, listed for his review". `C.worker.6` is rightly in none (section 7). Fork W is in none: below.

**Open rows.**
- With a line of that group: 42, 1004, 1006, 1010, 1011, 1012, 1017, 1019, 1021, 1023, 1026, 1027, 1029, and 323 and 152 by their notes.
- **Sixteen have no line in `PLAN.md` or `review-queue.md`:** 1005, 1007, 1008, 1009, 1013, 1014, 1015, 1016, 1018, 1020, 1022, 1024, 1025, 1028, 1030 and 1031. Owed, as parked lines or with a batch (the homes are mine):
  - with climb batch 31's planner, as walls that a test against the prelude shows: 1014 and 1030 (one message, `CompilerBuiltin$v`), 1031, 1013, 1028 and 1005 (Part 5);
  - with the checker's next rung on a call's static arguments: 1007, 1009 and 1015, beside 1010 and 1012;
  - walk's, each ending when walk runs the checker or in a rung of walk: 1008, 1016, 1018, 1020, 1022, 1024 and 1025.
- Rows 301 and 390, rewritten, and row 144, unchanged: row 390 is in the group by N's entries; 301 and 144 have no line and need none beyond their rows.

**Record defaults: none is in the review queue.** `review-queue.md` holds no entry of this batch. The plan says of its sixteen forks that each "lands at its default and goes on the review list", and of fork W that it "stays on the review list". Owed, each as an entry with its default as landed: W (with finding 1 and item 525, which it answers), R1 to R3, P1 (with P.worker.1), S1 (with S.worker.1), S2, C1 (with C.worker.4), C2, F1 (with gather.1), B1, N1 (with review-routed.2), N2, N3, N4, D1 (with row 1011's entry) and D2.

**The coordinator's five rulings on the check of the joined record** (`climb-batch-32-review.md`, "The check of the joined record, 2026-11-15"). For each: whether the group holds it, and what landed.
1. **Fork W at (a), with its one new difference.** The group does not hold it: no entry names fork W, row 1016 or P-59. Landed: `OverloadedFunction.java:2325`, `:2374-2428`; row 1016 with `ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss`; the Effect at `changes.tex:5415-5443`.
2. **Rungs C and N keep the signatures of the six calls that cross between their declarations of `Functionals.scala`.** The group does not hold it. Landed: kept. The diff of `Functionals.scala` from the base to `main` changes no `def` line of `checkApplicable`, `checkApplicableWithInference`, `typedApplicationOfChecked` (`:893`), `retypedApplication` (`:1132`), `preDefault`, `defaultAtUnfixedEach`, `typedApplicationOfArg` (`:790`) or `typedApplication` (`:875`).
3. **Rung F reports a typed variable of arrow type and does not edit rung B's `forLValue` and `forVarDecl4`.** The group holds its consequence and not the ruling: F.worker.1 says that the repair of row 1019 is in `forVarDecl1` and `forVarDecl4`, "which were rung B's file in this batch". Landed: kept. Rung F's branch touches neither `LHSEvaluator.java` nor `BuildEnvironments.java`; it built the typed local variable in its own `BaseEnv.java:614` and its skeptic the assignment at `:333`; the immutable top-level variable is row 1019, with `ProjectFortress/tests/XXXGenericFunctionTopLevelVariableWalk.fss`.
4. **Rung N only reports the false sentence of `inference.tex`, "A Numeral Whose Conversions Tie".** The group does not hold it. Landed: kept by the rung, whose branch touches no line of `inference.tex` and whose report lists `:60-61` and `:334-336` as made false. The gather then reworded both in N's commit on `main` (`b190b8eb25`: `Specification/basic/inference.tex:62-64` and `:382-383`, in the section that starts at `:349`).
5. **Row 731's repair stops at `typedApplication`'s `partitionArgs`.** The group does not hold it. Landed: kept. No hunk of the batch names `partitionArgs` (`Functionals.scala:97`, called at `:884`); rung C's repair is the new `reductionApplication` (`:634`), called before it from the one-argument application (`:800`).

**The lines that the group lacks, for a record writer to file:**
- "W of climb batch 32's rung N, the coordinator's decision from his words of 2026-11-10, told, to confirm: walk has the numeral rule now, so `u = 0` is `true` for a zero `u` of `NN32` under walk as compiled. It reads P-59's sentence 'is not changed for it before the switch-over' as about a value's coercion only. Its one new difference between the paths: for `a: Any` holding a zero `NN32`, walk answers `a = 0` with `true` and the compiled path with `false` (row 1016). Default: as landed; P-59 and P-46 each gain a clause at his word. It answers review-queue item 525. Evidence: `reviews/batch-32-review.md`, finding 1; `coordinator/CLIMB-BATCH-32.md`, section 3, fork W."
- "Ruling 2 of the check of climb batch 32's joined record, told: rungs C and N kept the signatures of the six calls that cross between their declarations of `Functionals.scala`; the rule was the coordinator's, added to the record before the launch. As landed: kept; nothing to undo. Evidence: `reviews/batch-32-review.md`, Part 4."
- "Ruling 3 of the same check, told: rung F did not edit rung B's `forLValue` and `forVarDecl4`; a typed local variable and an assignment receive a generic function through rung F's own `BaseEnv.java`, and the immutable top-level variable is row 1019 (the entry that opens F.worker.1). As landed: kept."
- "Ruling 4 of the same check, told: rung N only reported the sentences of `inference.tex` that its rule made false, and the gather reworded them in rung N's commit (`Specification/basic/inference.tex:62-64`, `:382-383`). As landed: the section 'A Numeral Whose Conversions Tie' states the tie also where the declarations differ at another argument."
- "Ruling 5 of the same check, told: row 731's repair did not edit `typedApplication`'s `partitionArgs`; it is `reductionApplication` (`Functionals.scala:634`). As landed: kept."

**The steps that the merged-diff review routed.** review-routed.2, the compiled test of `u = 0` and `u =/= 0` at `NN32`, `NN64` and `RR32` against the prelude: climb batch 31, since it is a test against the prelude and needs no rung of its own. review-routed.1, walk at a declared arrow return type and at a field: a rung of walk, with row 1019; no batch holds one. review-routed.3, F-58's count on the merged tree: the coordinator's or climb batch 31's planner's, one run of the driver in a scratch worktree, before the record-landing rewrites the entry.

**PLAN lines that the batch built or made stale:** Part 1, "Corrections owed in the record". **POSITIONS and FACTS:** the same. **The skill:** Part 3. **The manual and the script:** process findings 1 to 9.

## Part 5. What changes climb batch 31's plan

`CLIMB-BATCH-31.md` keeps M, L, A and K in run 1 and T in run 2, and says that its sections are read again on this batch's landed tree ("Before the launch", step 1). For its planner:

**Files shared with what landed.**
- **`compiler/codegen/CodeGen.java`: every one of its five rungs edits it, and rung D landed there** (`:6436-6583`). Its line citations above that range hold: L's `defaultCase` `:1776`, A's `forAtomicBlock` `:1835-1868` and `forObjectDeclPrePass` `:4813-4862`, M's `:769-1690`. **K's `conditionallyCastParameter`, `:7208-7240`, is `:7289-7321`.** T's "Not" list names `forVarDeclPrePass` as rung D's; it is at `:6481`.
- **`Specification/appendices/changes.tex`:** K's `:4312` is `:4434` and its `:1676` is `:1734`; T's `:3204` is `:3323`. `Specification/basic/inference.tex:458`, which K names, is `:509`.
- **`Library/FortressLibrary.fss:2188-2194`**, L's form of an `exit` out of a `for`, is `:2189-2195`.
- **`Functionals.scala`, `OverloadedFunction.java` and `Decls.scala` are in no remaining rung's files.** They were N's and D's, which left with them. `Evaluator.java`, which L cites for walk's `label` and `exit` by member, changed only in `forOpExpr`.
- Its briefing keys cite code by member, not by line, so they hold; each is checked again with `facts-extract.sh --check`.

**Text of the record that the landing makes stale.** Its line 481 names row 988 as open. Its "Before the launch" names the base build `/home/user/fortress-base33` at `84f1c37190`, which is older than the landed code: **its base build must be made new**, at the head that it launches from. Its gate's comparands are this batch's: `CompilerJUTest` 1,616, the system shards 856, 22 atomic programs, 3,422 tests in all, the count 0 and the distance 0.

**New rows and routed steps that belong in it** (the judgement is mine; the planner weighs each against the batch's merge):
- **Rows 1014 and 1030:** a numeral that ends a block, alone or in a tuple, at a declared return type, dies at run time in `coerce_ZZ32`. It is a wall for any compiled program of that plain form, and each has its gated expected failure and link test. One rung, in the code generator's numeral sites, far from M, L, A and K.
- **Row 1031:** a tuple binding over an `if` with tuple branches stops the code generator. With rung D's code, or the same rung as above.
- **Row 1013:** a functional method of a generic trait as a value, `NoSuchMethodError`. It is near rung M's method tables; the planner reads whether M's repair reaches it.
- **Rows 1028 and 1029:** the export check of a variable declared by `:=`, and the local tuple binding's unchecked name (twelve lines, by D's skeptic). Both are the checker's, in `Decls.scala` and the export check, which no rung of climb batch 31 edits.
- **review-routed.2:** one compiled test, in whichever rung is cheapest, or the gather's.
- Rows 1005, 1007, 1009, 1010, 1012 and 1015 are the checker's and no wall of the rehearsal: the batch after.

**The run's frame.**
- The estimate: process finding 8. Its record has 4.6M for run 1 on the older figures.
- The briefs: process findings 1 to 5.
- **No batch is launched before the curator has dealt with the post-mortem of 2026-11-16** (`PLAN.md:13`, "Next"; `coordinator/postmortem-2026-11-16-light-boot/README.md`).

### The steps due before the next batch

1. **His word on findings 1, 2 and 3**, or the standing defaults: each landed at its default or changes nothing in the tree, can be undone, and holds nothing.
2. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '32', base: 'db352c1776', landing: '567c36dadc' }`). It routes Part 4, rewords P-78, P-79, P-46 and P-173, corrects F-53, F-240, F-58 and F-285, moves the 49 citations, and runs the orientation and the skill updates with Part 3's list.
3. **The routing that no list holds yet** (Part 4): fork W's line and the four rulings' lines in PLAN's group; the sixteen rows; the review-queue entries of the batch's forks; item 525 answered; PLAN's "Next", its phase 4 line for climb batch 31 and a line for this batch.
4. **P-59's and P-46's clauses**, by a record writer, after his word on finding 1; P-46's order, after his word on finding 2.
5. **F-58's count on the merged tree** (review-routed.3), before the entry is rewritten.
6. **The post-mortem of 2026-11-16**, dealt with as an update of the `coordinator` skill, at his order.
7. **Climb batch 31's record read again on the landed tree** (Part 5): K's lines in `CodeGen.java` and `changes.tex`, the rows offered to it, the comparands, the estimate; its generator regenerated.
8. **The script and the briefs, between batches:** process findings 1 to 9; finding 1 first, since it decides from which turn a batch is launched.
9. **Climb batch 31's own base build** at the landed head, its check by a fresh reader, his go, the launch.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I read the run's transcripts through scripts and the journal's results. For the two spans before the run I read only the transcripts' labels, times, models and writes. I read the coordinating session's transcript only for its own writes by time.
- These are by reading, not run:
  - that the code generator refuses the model's tables as literals (finding 3): the skill's sentence and the plan's, not a compile;
  - that `rmsn` with `/` on a `Vector` does not run (section 3): rung F's test and its comment;
  - that no signature of the six crossing calls changed (Part 4): the diff's `def` lines;
  - which rows fit climb batch 31 (Part 5).
- F-58's sites on the merged tree are arithmetic from three rungs' runs, not a count.
- I did not check each of the rungs' reported runs against their logs; the skeptics and the merged-diff review did, and I cite them. I did not read every line of the seven diffs: I read the members that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.

## For the curator

Climb batch 32 ran from 23:25 UTC on 15 November to 05:35 on 16 November and is pushed. All seven tasks landed. No line of the model program changed.

What the tree does now that it did not do before:
- **The parser** takes `∑` for `SUM` and `∏` for `PROD`. An api, which is an interface file, can declare a postfix operator such as `^T`.
- **A superscript** works after a field, as in `p.wq^T`, and after a call in parentheses, as in `(f(x))^T`.
- **The checker**, which checks types before the program is compiled, no longer needs the type written in `SUM[\ZZ32\][j <- 0#i] f(j)`. It also accepts a generic function passed as a value.
- **A numeral**, a number written in digits, now goes to the most specific declaration that takes it. So `u = 0` is `true` for a zero `u` of type `NN32`, in the interpreter and compiled.
- **The interpreter** takes a function with a size parameter where a function is expected, and builds a table written as a literal at the top of a program.
- **The compiled path** takes several names bound at once at the top of a program, the form of the model's hyperparameters.
- All tests passed: 3,422, with none failing. The two measures of the checker on the interpreter's library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

The measure. The plan named eight limits of the model's notation that this batch would close.
- Six are closed in the interpreter and compiled.
- Two are closed in the interpreter only: the table as a literal, and the sized function passed to the row lift.

Three points need your word. Each can be changed later.
- **The interpreter got the numeral rule now, not later.** The coordinator took this from your words of 10 November. One sentence of an earlier decision of yours says that the interpreter is not changed for conversions before the switch-over, which is the move of the compiled path onto the interpreter's library. This reads that sentence as about values, not numerals. One difference follows: for a variable of type `Any` that holds a zero of type `NN32`, the interpreter answers `a = 0` with `true`, and the compiled program with `false`. I recommend confirming it.
- **"Most specific" was built in the narrow sense.** A numeral leaves the declaration that fits its default type only for a declaration whose parameter types are subtypes. So `f(1.5)` still picks the `RR64` declaration over the `RR32` one. You decided the answer for `u = 0` and did not word this rule. I recommend confirming it.
- **The table as a literal cannot be compiled yet.** The diff to lines 37 to 41 of the model would replace the two `if` chains with two tables. The interpreter runs them. The code generator, which writes the bytecode, has no array literal. I recommend holding that diff until it has.

The diffs to the model that are now possible, each for your word:
- `^T` declared in the helper file's api, so that lines 21 to 24 leave the model;
- `(onehot(ids, vocabSize))^T dX` in line 70;
- `SUM[j <- 0#i] matCount(j)` in line 43, without the type;
- `∑` for `SUM` in lines 28, 43 and 52;
- the two tables in lines 37 to 41, in the interpreter only;
- the sized vector functions, which belong to your parked decision on static sizes.

Three events to know.
- **The machine restarted at 01:26.** Two workers were lost while they waited for a long test. The run was resumed two minutes later, and two new workers finished their tasks from what was on disk. No work was lost. It cost 0.22 million tokens and about a quarter of an hour.
- **Your chat question about the Fortify output reached five workers.** The tool that runs a batch puts the message that started the coordinator's turn in front of each worker's instructions, and tells the worker that it outranks them. Two workers wrote that they could not answer it, and two searched the tree for it. Nothing else followed. An instruction in that place would have been obeyed, so I propose that a batch is launched only from a turn that no message of yours started.
- **The coordinating session did not commit while the batch merged its tasks.** The slip of the batch before did not recur.

The cost, in tokens written:
- the landing work of batch 30: 7.63 million in its span, of which the landing itself was 3.88 million;
- the preparation of this batch: 6.35 million in its span, of which the plan, its two checks and the join of the two moved tasks were 1.12 million;
- the run: 7.54 million in its span, 5.00 million by its own agents, against the plan's 6.2 million, in 6 h 10 min against 10 hours.

Fifteen of the sixteen workers that were given a briefing read all of it within 80 seconds. The one that did not took over a finished task after the restart.

For the next batch, 31: its tasks all edit the code generator's main file, where this batch landed one change, so one task's line numbers move. Its base build must be made new. Six of the new defects fit it. It is not launched before you have dealt with the post-mortem of 16 November.
