<!-- The check of climb batch 31's record, `CLIMB-BATCH-31.md` (`98dbf519ed` on `main`), with its probe notes `compile-ladder/plan-31/PROBES.md`, before the launch of its first run, by a fresh reader on Fable on 2026-11-13: each citation at its source, each reproducer run once on the base's code, each rung against the decisions on record, the sources the plan was cut from, the forks sorted by the `coordinator` skill's rule, the merge of the four rungs that edit `CodeGen.java`, and the measure; with the changes made to the record in place. Its runs were in a worktree of its own, `/home/user/fortress-chk31`, seeded from the base build `/home/user/fortress-base33` (`84f1c37190`) and removed after. The batch has no go, and this check launches nothing. -->

# The check of climb batch 31's record, before the launch

## 1. For the curator

**What this is.** Climb batch 31 is a plan for seven changes to the compiler, in two runs. It has no go from you. I read the plan as a stranger and checked it against the code and against your decisions. I changed no design.

**The words.**

- **Walk** is the interpreter. The **compiled path** is the compiler: its **checker** checks types, its **code generator** writes Java bytecode.
- The **prelude** is the compiler's own small library. The **one library** is the interpreter's library, which the compiler must learn to compile.
- A **rung** is one change, built by one worker. A **reproducer** is a small program that shows a defect. A worker must see its test fail before it repairs anything.
- A **numeral** is a number written in digits, such as `0`.

**What I checked.**

- Every file, line, ledger row and decision that the plan cites.
- Every reproducer, run once on today's code.
- Every rung against your decisions.
- Whether four workers can edit the code generator's main file in one run.
- The plan's way of counting progress.

**What I found.**

- **The plan is sound in its main lines.** Eleven of its twelve reproducers fail today exactly as the plan says. Its citations hold, with eight small corrections.
- **One step has no failing test.** Rung L has two halves. Its first half, `label` and `exit`, is fine. Its second half gives each closure class a name of its own. A closure is a function written inside an expression. The plan says that two old programs show this defect. I ran both. Both compile and run today. So a worker cannot see that test fail first. The defect is real in the one library, but nobody has a small program that shows it. This should be settled before the launch: either a short probe finds such a program, or that half waits.
- **Your one question, fork W, is the right question.** It asks whether walk gets the new numeral rule now, or later. Now is way (a). Later is way (b). I agree that only you can answer it. I corrected one sentence in it. Details below.
- **No other fork needs you.** I checked all seventeen by the rule. One, fork N2, comes nearest: it lets two lines of microGPT compile unchanged. Your decision P-173 already covers it.
- **Four workers in one file can be merged.** Each keeps to its own part of the file. Three places need a word from the coordinator first. None needs you.

**Fork W, what each way leaves different between walk and the compiler.**

- **Way (a), walk now.** `u = 0` is `true` on both. One new difference appears. Take a variable declared with the widest type, `a: Any`, that holds a zero of type `NN32`. Walk will say `a = 0` is `true`. The compiler will say `false`. Today both say `false`. The plan said that this difference "stays". It does not exist today, so I wrote "appears".
- **Way (b), walk waits.** `u = 0` stays `false` under walk and `true` when compiled, as today. The same holds for `u =/= 0`, for `case u of 0`, and for a program's own number type. These are four known defects that stay open until walk runs the checker. The `a: Any` case stays the same on both.
- **What your record says.** P-59 holds your words of 29 September: walk is not touched until the library is switched. They were about converting a value. Since then you decided twice that walk converts numerals by the new design before the switch (P-173, P-176). That supports way (a). It is still your sentence that is read more narrowly, so it is yours to say.
- **One gap in way (b).** The plan says that under (b) one step of rung N is struck. More changes than that. The step that adds `=/=` to the library then has no test that can fail first. I list this for the coordinator.

**What I changed in the plan.** Eight corrections of fact. No design.

- A figure in the record of facts was updated while the plan was written. The plan now cites the new text.
- Three defects were filed as ledger rows after the plan was drafted. The plan now says so.
- Rung L's closure test: the plan now says that its two programs do not fail today.
- Rung A: the plan named the wrong piece of code for one kind of mutable field. I added the right one.
- Fork W: "stays" became "appears".
- A test that the plan owes had one of its two lines missing.
- One sentence called 27 classes "number types". Some are not.

## 2. Changes of the record that I made

Each is a citation, a count or a sentence that contradicted its source. All are in `CLIMB-BATCH-31.md` now, and its header names this review.

### A1. F-34's text

The record cited F-34 as "38 in 10 kinds", "of older code" (section 2, "The measure"; section 6, "For the record-landing workflow"). F-34 was rewritten on `main` in `5064f7f80b`, after the draft: "refuses 24 declarations of the fourteen components … in 8 kinds". Both sentences now cite the present text.

### A2. Rows filed since the draft

Section 5 said "Not filed": `NN32`'s two getters, the code generator's order by identity hashes, the compile that writes no jar. `081afda73e` filed them: rows 993 and 996, and row 757 rewritten. The sentence now says so.

### A3. Row 315's reproducers do not fail (finding B1)

Rung L, step 2, said of row 315's two programs: "Seen failing on the base: 'ZipException: duplicate entry'." Section 5 said that they "run under the prelude". On the base's code both compile and run:

    $ bin/fortress compile ClosurePos.fss ; bin/fortress run ClosurePos      # 5 :OP: 6 over three overloads of opr OP
    3
    $ unzip -l …/bytecode_cache/ClosurePos.jar | grep fn@
    ClosurePos$\=fn@6\!21.class
    ClosurePos$\=fn@6\!28.class
    $ bin/fortress compile SkLitThunk.fss ; bin/fortress run SkLitThunk      # sz(fn () => 2147483646 + 1)
    2147483647

The first program is `ProjectFortress/tests/ConditionalOpTruncation.fss` with its result printed; the second is row 315's probe from the parent of `ab067d9b6`. Each of the two closures of the first now has its own numeral's position, and the second's sum folds before the checker (P-173). Both sentences of the record now state this. What follows from it is B1.

### A4. Rung A's `var` value parameter

The record's reproducer `PFieldAtomic.fss` declares `object Ctr(var n: ZZ32)`: its `n` is a `var` value parameter, and so is `OneShot`'s `canTryIt` and `Box`'s `val`, the one library's sites. A value parameter is not a `MutableFieldVar`. `CodeGen.forObjectDeclPrePass` gives it a `VarCodeGen.FieldVar` (`compiler/codegen/CodeGen.java:4813-4831`) and declares its JVM field `ACC_PUBLIC + ACC_FINAL` (`:4827-4828`); `FieldVar.assignValue` writes it with a bare `PUTFIELD` (`compiler/codegen/VarCodeGen.java:174-200`). The record's "Files." and its briefing named only the body fields (`:4850-4862`) and `MutableFieldVar`. Changed:

- rung A's "Files." and its line of "The rule the rungs keep": the value parameters' loop and `FieldVar` beside the body fields and `MutableFieldVar`;
- step 2: `PFieldAtomic`'s `n` is called a value parameter, and the body field is the second case;
- the briefing gains `SRC compiler/codegen/VarCodeGen.java#public static class FieldVar` as a check: 12 keys, 10 checks. The key matches one place (`facts-extract.sh --check`: `VarCodeGen.java:174-200`).

My run of `PFieldAtomic` at four threads printed 35,450 of 40,000.

### A5. Fork W: the difference under way (a)

Section 2 said: "One difference stays: for `a: Any` that holds an `NN32` zero, walk answers `a = 0` with `true`". Under walk today that call answers `false` (`reviews/numeral-equality-ways-2026-11-10.md`, section 2.1: "a = 0 (Any holding NN32): false"). So way (a) makes a difference between the paths that does not exist today. The sentence now reads "One difference appears … where it answers `false` today".

### A6. The test owed

Rung N, step 2, added `h: QQ = 1/2`, `h = 0.5` to the promoted test. PLAN's line on the test owed asks for both orders: "add `h: QQ = 1/2` with `h = 0.5` and `0.5 = h` asserted `true`" (`PLAN.md:753`). Added.

### A7. The 27 classes

Section 2 said "The library's number types have this shape in 27 classes." The rehearsal counts 24 classes of `FortressLibrary`'s jar and 3 of `RangeInternals`', `narrowToRange` (`switch-rehearsal.md`, W6). Now: "The one library has this shape in 27 classes, its number types among them."

### A8. The header

One comment line names this review.

## 3. Points for the coordinator to decide

### B1. Rung L's closure half has no test that fails first

Row 315's two reproducers pass (A3). The library's form, two closures of one `BIG AND [(a,b) <- self.zip[\E\](other)] a = b` in a generic trait's method, cannot be written under the prelude (PROBES, section 2). I tried two forms under the prelude, a generic trait's method with a `BIG +` over one generator and over two: both run (6 and 15). So today:

- the only evidence of the defect is the measure's two refused declarations, `LexicographicOrder` and `List`;
- the cause at those two sites is not traced. The rehearsal says of them "315 by its text; not checked that the cause is the same". The refused class's name is 'FortressLibrary$\=fn@2227\!12-52??', the span of the whole comprehension;
- rung L's step 2 breaks the skill's rule that a test is seen failing first, and its skeptic will say so.

The ways, none of them mine to take: a short probe that looks for a reproducer under the prelude before the launch; step 2 struck from L and held with varargs as a wall whose test needs the one library; or step 2 kept, with the measure as its only check, said so in the section. With step 2 struck, the measure's expectation after run 1 is 19 to 21, not 17 to 19.

Row 315 needs its whole new line: its two reproducers no longer fail at `84f1c37190`, and only the library's sites remain.

### B2. An `exit` out of an `atomic` block has no owner

The specification: "If it completes abruptly by exiting to an enclosing `label` expression, writes within the block are retained and become visible to other threads" (`Specification/basic/expressions/atomic.tex:60-63`). The compiled handler takes every exception and ends the transaction, "whose writes go with it" (`runtimeSystem/BaseTask.java:285-314`; F-351). By fork L1 an `exit` is an abrupt completion that travels as a throwable. So an `exit` out of a compiled `atomic` block will discard the block's writes.

Rung L may not edit `forAtomicBlock`, `BaseTask.java` or `Transaction.java`. Rung A may not edit `forAtomicBlock`'s body. L's section asks only for a report of "what a `finally` clause and an `atomic` block between the `exit` and its label do". It names no expected answer. Proposed: L's section names the specification's answer, and says that L writes the case as an expected-failure test with a new row if it cannot reach it. This is a pair that touches one behaviour (`references/batch.md`, "The go"); it needs no `landsOnlyWith`, since neither rung repairs it.

### B3. The merge: three places to settle

The verdict is in section 5.6. The three places:

1. **K beside L.** K's "Files." give it "`conditionallyCastParameter` and its callers' arguments to it". Two callers are in `genParallelExprs` (`CodeGen.java:1756`, `:1768`), which L is told not to edit and which ends 8 lines above L's new members (`:1776`). The hunks do not overlap, so `git apply --3way` takes both. But K's lowest edited line is then below L's and A's, and by the manual's rule the gather applies N, M, K, L, A. The record and the intro that every agent reads say "N, M, L, A, then K". The script decides the order, so the sentence is a forecast; it can turn out false.
2. **K beside A.** K's points to report list "a field" among the places where a cast is emitted. K's "Files." name no field code. The field code is A's (`:4813-4862`), and A changes what a `var` field holds. K's section should say that a cast at a field is reported, not built.
3. **K beside M.** Row 695's returned `self` is in a trait's default method. If the cast is needed in a forwarder, it is in `generateForwardingFor`, which is M's. The same word for K.

### B4. Fork W at (b): more than step 2 changes

The record says: "At (b), step 2 of N's section is struck, with rows 973, 966, 975 and 976 left open and their clauses of the specification kept." Also then false or without ground:

- the section's heading and the blurb ("on both paths", "by fork W's default, in walk", "the two expected-failure walk tests are promoted");
- three points to report that ask for walk's rule and walk's answers;
- "Rows." ("Close 973, 966, 975, 976 and 989"), "Specification." (the Effect's clause of rows 966 and 973 stays true), "Files." (`OverloadedFunction.java`, `Coercions.java`, `Numerals.java`);
- **step 3, the library's `=/=`, has no test that fails first.** Under walk at (b) `u =/= 0` still reaches `=/=` over `Any`, which the numeral fits as it is; compiled, the prelude's own `=/=` already answers `false` (fork N1). Only the checker's choice against the one library shows it, by the distance stage's driver, which is a run to report;
- the gate's forecast (`testSystem`: "N's one new walk test"), the intro's first rung line, and the sentences for the record-landing workflow and the skill writer marked "with fork W at (a)".

The generator of task 2 writes a block for (b) that makes the first three groups true by exact substitutions, each asserted (`plan-31/manifest/gen31.py --fork-w b`). Its words are a proposal of this check. The record itself is written for (a) and is not changed for (b).

### B5. Smaller points

- **A guard for `x^2`.** Way B says "`x^2` is unchanged: `^` over `(RR64, RR64)` is not more specific than `^` over `(RR64, AnyIntegral)`". N's tests hold `gg(5, w)` as a guard and not this one. The prelude has an `RR64` power with a `ZZ32` exponent, so the guard can be written there.
- **The second walls.** The record expects 17 to 19 after run 1, for two declarations with varargs behind their first wall (`Generator2`, `List`). F-34 now names a third second wall: "behind `SubString`'s `label` stands the partial type assumption (row 818)". The rehearsal saw it in the real compile, not in the probe's count. If the probe shows it, the figure is 20.
- **The disk.** `df -P /home/user` at this check: 16,641,572 KB available, about 15.9 G, with this check's worktree standing. The floor for run 1 is 11.5 G.
- **`W9. `.** L's briefing key for the rehearsal's W9 ends in a space, because the heading has backticks after it. It matches one place. A longer prefix without backticks does not exist; it stays.
- **The key sizes.** N's briefing prints 60,555 bytes, M's 52,750, K's 47,873 (`facts-extract.sh --check`).

## 4. Points that would change a decision of the curator's

**Fork W, and nothing else.** The record judges it consequential, and so do I: way (a) changes walk before the switch-over, where P-59 says that walk "is not changed for it before the switch-over".

- **The entry and its history.** P-59's sentence is from his message of 2026-09-29 14:07 UTC, "item seven as recommended. So one now and two after the switch.", which the history block of 2026-10-22 08:48Z renders as: for now walk is not touched until the library is switched. The item was walk's run-time choice of a value's coercion (`reviews/decisions-review/judgement.md`, item 7).
- **What supports (a).** Two later decisions give walk a numeral rule before it runs the checker: P-173 ("walk converts from the exact value at the same places, place by place, before it runs the checker") and P-176 ("walk runs that coercion at the place's first evaluation"). P-46 holds his words that an answer of `false` "is out of the question". The ways review recommends "one rung, on the checker and on walk together" (its section 10).
- **What supports (b).** The ways review itself names it as "a timing choice inside" way B: "walk can wait for P-12 and take the checker's choice then, which leaves rows 973 and 966 open under walk until P-12". The plan review's section 7.5 names "the numeral rule in the checker" for this batch, not walk's half. P-59's and P-12's words.
- **Whether the record states both ways fairly.** Yes, after A5. Two things it does not say. Under (a), walk's answer for `a: Any` goes against P-46's own sentence "A value typed `Any` or `Number` fixes no type for the numeral beside it, which keeps its default", so P-46 needs a clause for walk, as the record's section 6 foresees for P-59. Under (b), the record's sentence "microGPT runs only under walk today, so every program written until then meets the wrong answer" should not be read as a cost to microGPT: its two programs compare only `ZZ32` values with numerals, which is `true` on both paths under either way (the ways review, section 8).
- **What each way leaves different between the paths.** (a): `a = 0`, `m = 0` and a `case` over them, for a value typed `Any` or `Number` that holds a number of another type than the numeral's default: walk `true`, compiled `false`. (b): `u = 0`, `0 = u`, `u =/= 0`, `case u of 0` and a program's own number type: walk as today (rows 973, 966, 975, 976), compiled right.

**No premise stated as the curator's is missing from the record.** "You decided how a numeral at a call chooses its declaration" is short for P-46's history: he decided the answer `true` and took option one, the review's way B; "he did not word the dispatch rule". The rule that rung N builds is the review's, as P-46 says.

## 5. The checks, one by one

### 5.1 Citations

Checked at `84f1c37190`, the base build's commit, whose code is `main`'s (`git diff --stat 84f1c37190 HEAD -- . ':!explorations' ':!docs'` prints nothing).

- **Code lines.** `CodeGen.java`: `dumpTraitDecls` `:769`, `generateForwardingFor` `:788` and `:792`, `dumpMethodChaining` `:926`, `dumpOverloadedMethodChaining` `:1108`, `genParallelExprs` `:1692`, `defaultCase` `:1776`, `forAtomicBlock` `:1835-1868`, `generateFunctionalBody` `:2880`, `forFnExpr` `:3643`, the name in `forLetFn` `:3829`, the fields `:4850-4862`, `forVarDeclPrePass` `:6472` with its throw at `:6476`, `conditionallyCastParameter` `:7208-7240`. All as the record gives them.
- **The specification.** `conversions-coercions.tex:111-117` holds the quoted sentence and its example. `changes.tex:5286-5298` holds the clause of rows 966 and 973, `:3817-3824` the sentence on `=/=`, `:4312` row 695, `:3204` row 832, `:1676` and `inference.tex:458` row 307. No other row of the batch is named in the specification's text, so "No Effect of Appendix I and no note names these rows" holds for M and L.
- **The library.** `FortressLibrary.fss:2188-2194` (`indexOf`), `String.fss:148-158` (a label as a method's whole body), `OneShotFlag.fss:18`, `List.fss:13` (its import), `FortressLibrary.fss:4961` (`Box`), 23 lines of `trait QQ` (`:554-660`) that pass `self` to `numerator` or `denominator`.
- **The tests named.** All exist: `XXXNumeralEqualsNumberWalk`, `XXXNotEqualNumeral`, `NumeralStaticDesignCompiled`, `XXXFunctionalMethodMeetNarrowedSelfNotFirst`, `XXXSelfTypeReturnSelfRun`, `XXXNatOpenRun`, `VarargsExportMethod` with its api.
- **The briefing keys.** All 104 keys of the seven rungs match one place each (`lists31.py`, task 2).
- **The ledger rows.** Rows 390, 989, 973, 966, 975, 976, 990, 732, 571, 81, 875, 319, 641, 991, 695, 307, 815, 992, 832, 819, 988, 474 and 624 say what the record says of them. Row 315 does not (A3).
- **The entries.** P-46, P-49, P-173, P-174, P-176, P-59, P-12, P-169, P-175, P-9, P-47, P-87, F-53, F-350, F-351 say what the record says of them. F-34 had changed (A1).

### 5.2 The reproducers

One compile and one run each, under the prelude, in `/home/user/fortress-chk31`.

| rung | program | the record's failure | this run |
|---|---|---|---|
| N | `PPick3` | the run dies, 'NoSuchMethodError … \=k{…}(fortress.AnyType$Any)' | the same |
| N | `PNumeralTie` | 'Ambiguous coercion in call to function mul' | the same, word for word |
| M | `PDupMethod3` | 'ClassFormatError: Duplicate method name "mx?0"' | the same |
| M | `GenApi`, `PGenUse4` | 'AbstractMethodError … does not define or inherit an implementation' | the same, for `map` |
| L | `PLabel` | 'Can't compile Label' | the same |
| L | row 315's two programs | 'ZipException: duplicate entry' | **both compile and run** (A3, B1) |
| A | `PAtomicExpr` | 'Can't compile AtomicExpr' | the same |
| A | `PFieldAtomic`, four threads | 29,456 and 39,276 of 40,000 | 35,450 |
| K | `PComprisesCast` | 'VerifyError: Bad type on operand stack … is not assignable to' | the same |
| T | `PTupleIndex` | 'VerifyError … is not assignable to FZZ32' | the same |
| T | row 832's program | `ClassCastException` at the call | the same |
| T | row 819's program | 'Error trying to close method scope' | the same |
| D | `TupleTopPlain` | '** bug! Result of typechecking still contains intermediate nodes.' | the same |

A guard of rung N's first test, by one more run: with `k(x: Any)` beside `k(x: NN32)`, `k(a)` for `a: Any` prints `any` and `k(u)` for `u: NN32` prints `nn32` today. So `k(5)` dies for the numeral's own reason, row 390's numeral case, and the test's guard `k(a)` does not meet row 390's other case.

Each rung's first test can fail first, for its wall's reason, but L's step 2.

### 5.3 Each rung against the decisions

- **N.** It builds P-46's rule in the review's words, P-49's exception and P-173's last sentence. It keeps P-174 (no `=` pairs), P-176, P-168 (the `=` over `Any`) and P-165. Fork N3, `Equality`'s `=/=`, is way B's own change. Fork N2 applies P-46's tie, "where two are not ordered, the one that the default fits", to two declarations that differ at a value's place too; P-173 covers the case: "a float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`". Walk prints `rr64` today. What it leaves out: the `x^2` guard (B5). What no entry supports: nothing.
- **A.** P-169 is about natives and the array store; its part here is the transaction's keying, which fork A1 does not use: a `var` field goes in a cell, the code's way for a mutable variable. The parallelism review's section 8 lists row 319 among the repairs "before anything relies on `atomic`", and its section 7.2 confirms the row. F-351 is the handler that A builds on. P-125 is met: the tests run at four threads, and fork B2 puts them in the atomic runs. What A leaves out of section 8's list: `tryatomic` (row 353) and strong atomicity (its question D2), both by the plan review's section 7.5. No var field stands in the one library's arrays or in the model's vocabulary (`grep` of `Library/` and `explorations/run-c4/src/`: `Box`, `OneShot`, `String.fss`), so the cell and its check (row 641) do not reach microGPT.
- **L.** Fork L1 is P-175's rule and F-350's code: a group joins every arm that it forked before an exception leaves, and the exception that leaves is the first arm's in the arms' order. An `exit` that travels as a throwable gets both. The record's test asks for "the label's value one of the values that an iteration exits with", which is right for a parallel loop. Left out: the `atomic` case (B2).
- **D.** P-9 keeps the tuple bindings, P-87 keeps the model's lines, P-173 gives each untyped name its numeral's default. The rung builds exactly that.
- **M, K, T.** M1 is the skill's rule that a declaration without `override` replaces an inherited one at its own parameter types, and P-47's library shape. K builds P-60 and P-146 in the code generator. T builds within P-156. Nothing is built without a ground.

### 5.4 The sources the plan was cut from

- **The carriers review's "Points to report".** Seven points. Points 1, 2, 3 and 5 are about the rehearsal's W14, W2, W12 and its question; point 4 about F-18; point 6 about the plan review's "One build serves one library"; point 7 about PLAN's N5. The record leaves W2, W12, W13 and W14 out, and repeats none of the seven sentences. It carries no error of the rehearsal into a rung. It corrects one itself: the rehearsal's W16 names rows 495 and 732, and the record says that the wall is row 732's defect and that rows 495 and 496 are another.
- **Varargs.** The planner's reason holds, by reading. The checker types a varargs parameter `ImmutableArray[\T,ZZ32\]` of the default library (`compiler/Types.java:49`), which the prelude does not declare. `XXXVarargsBodyIterates` pins the refusal of a body that reads the parameter. The two tests whose bodies do not read it, `XXXVarargsCodeGeneration` and `XXXVarargsMethodCodeGeneration`, could be promoted only by a repair that passes no array at the call, since under the prelude no class exists for the value. No doubt stayed, so I ran nothing.
- **The three ways of the carriers' review, and the merge.** The claim holds, by reading. N edits the checker, walk and `Equality`. L, A, T and D are about constructs, not carriers. K's library site is `trait QQ comprises { Ratio }`: `QQ` is not one of the five merged traits (`ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`), and `Ratio` is not a native object, so the cast is needed under A, C, D and the merge. M: under the merge the five traits become objects, and an object that declares a method beside two inherited bodies already runs (PROBES, section 2, "the same, narrowed"), so those five classes leave W6's 27. The other 22 stay, and row 990's program stays a defect. No rung is wasted or redone. M's library count shrinks under way D.

### 5.5 The forks

By the rule of the `coordinator` skill's `SKILL.md`, "The curator's role and decisions".

| fork | consequential | the reason, in one line |
|---|---|---|
| W | yes | it reads P-59's sentence on walk anew (section 4) |
| B1 | no | the shape of the batch; it can be undone |
| B2 | no | two programs join the gate's atomic runs |
| V | no | varargs waits for a test that only the one library can hold; no decision is touched |
| S | no | an order of work; rung M's choice does not depend on it |
| N1 | no | P-37: the prelude is not changed |
| N2 | no | P-46's tie in its own words, and P-173's sentence on a float numeral; it keeps two model lines as they are |
| N3 | no | way B's own library change, which he took with it |
| N4 | no | a row's text |
| M1 | no | the specification's rule and the library's shape (P-47) |
| M2 | no | what the same call does today with the trait first |
| L1 | no | P-175 and F-350 |
| L2 | no | a class name; a closure alone keeps today's |
| A1 | no | the code's own way; no `var` field on microGPT's path (5.3) |
| K1 | no | no bytecode changes where a call verifies today |
| T1 | no | today's convention kept; the other way is reported before it is built |
| D1 | no | `variables.tex` and P-173 |
| D2 | no | a scope |

I agree with the planner: one consequential fork.

### 5.6 The merge

**The gather can merge the four rungs' edits of `CodeGen.java` cleanly, if each rung keeps to its declarations.** The gather applies each rung's net diff with `git apply --3way --index` (`climb-batch-workflow.md`, "Gather"). The declarations:

- M: `:769-1690`, and a new member above `:926`.
- L: new members above `:1776`; `:3643-3707`; `:3829`.
- A: a new member below `:1868`; `:4813-4862`.
- K: a new member above `:7208`; `:7208-7240`; the returned value in `generateFunctionalBody` (`:2880`); the callers' arguments, at `:1756`, `:1768`, `:5339-5441`, `:6665` and `:7155-7200`.

The nearest two edits are K's at `:1768` and L's above `:1776`, 8 lines apart. No two rungs are given one declaration.

**Climb batch 30's sentence.** Its record put rung C into run 2 "because run 1 already has three rungs in `CodeGen.java`". That is a reason for one placement, not a measured limit; the plan review reads it as the most that phase 4 has landed in one batch. Four is one more than has been done. What grows with the number is not the text merge but two other things: the pairs that meet in behaviour (B2, B3), and the tools that patch `CodeGen.java` by text, the distance stage's shadow patch and the measure. Each rung runs the shadow patch on its own tree; the merged tree meets it first at the gate's distance stage.

**A pair that changes one behaviour two ways.** None changes one behaviour two ways. Two pairs leave a behaviour to nobody: L and A at an `exit` out of `atomic` (B2), and K and A at a cast into a field (B3).

**N beside M.** N edits `scala_src/typechecker/`, M edits `scala_src/useful/STypesUtil.scala`. If N's "what it calls" reaches `STypesUtil.scala`, the two meet in one file, in other functions.

**M in run 1, T in run 2.** The split is right. Both edit `generateForwardingFor`, so they cannot share a run. M first, because W6 stops the one library's first load and T's bridge is a forwarder of the kind that M repairs. T also builds on K's landed cast.

### 5.7 The measure

- **The count is what it claims.** `codegen-measure.sh` applies `measure-hacks.patch` (`NamingCzar.java`, `Naming.java`, `FortressMethodAdapter.java`, `TraitTable.scala`), sets `NN32`'s two getters, builds, and runs F-34's probe. `cgkinds.py` counts one for each top-level declaration, by component, name and span, at its first failing line. The planner's output is in PROBES, section 3: 24 refused, 745 emitted, 8 kinds. The kinds add up: 7 + 4 + 4 + 4 + 2 + 1 + 1 + 1. The record's "varargs 8" is the 7 and the trait's `OptionUnwrapException`, which is row 624's form for a method. The forecasts follow: 24 less 7 is 17, and two second walls give 19; 4 less gives 13 to 15.
- **A rung can move it without repairing its wall.** The count sees a throw of the code generator and nothing else. No emitted class is loaded or run. So a rung that emits wrong code lowers the count as a right one does, and M, K and the first half of T cannot move it at all, as the record says.
- **A rung can raise it.** A cell for every `var` field (A), a cast (K) or a changed forwarder (M) meets library declarations that no test under the prelude has; a new throw there is a new refused declaration. The count after a run should be read with the emitted figure beside it (745 today): refused down and emitted up by the same number.
- **A whole trait counts once.** `Indexed` is one declaration. Behind its `label` another wall can stand, which the count shows only after L.
- **It is the only check of L's closure half** (B1).
- **Its patch.** It edits `NamingCzar.java`, where L changes `gensymArrowClassName`, and `TraitTable.scala`, in the folder that N edits. The record names the first.

## 6. What this check did not do

- No suite, no stage of the gate, no timing, no run of the measure.
- No run against the one library.
- Run 2's sections were checked as far as they go; they are read again against run 1's landed tree.
- The cost estimates of the record's section 2 were not checked.
