# Record test: eight scenarios

You have a copy of the Fortress revival repository. Each scenario puts you in a role, quotes the entries of the record that a brief would hand you (each `{FACTS n}` or `{POSITIONS n}` line stands for one entry's text, quoted whole), and asks a task. Answer each in a few paragraphs, in the form the task names: a decision with its reasons, the key lines of a brief, or an answer for the curator. You may search your copy of the repository and open any report, test, ledger row or source file; cite what you used. Build nothing, run nothing, edit nothing. Where the record does not settle something, say so and say what you would do.

---

## 1. A rung that repairs row 665

You are a worker launched on a rung of the next climb batch, in a worktree seeded from `main`. Your brief says: "Repair row 665: under walk, the load check of an inherited abstract method left without a body skips generic objects and object expressions in generic functions. Test first. Your files: walk's evaluator under `ProjectFortress/src/com/sun/fortress/interpreter/`, `ProjectFortress/tests/`, and `Library/` only where the fix needs it. Points to report: any library edit; any test of the team's whose verdict changes." The brief quotes this entry of the record:

{FACTS 145}

Before you edit anything, write the plan of your first step: the test you start from and what it shows before and after the fix; where in walk the check lives today and what it skips; what in the library your fix will meet, and what you do about it; which existing tests must stay green and why. Say which choices are yours and which you leave to the curator.

---

## 2. A rung that repairs row 686

You are a worker on a checker rung of the next climb batch. Your brief says: "Repair row 686 so that the library's norm checks on the compiled checker. Your files: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/`, `scala_src/types/`, `ProjectFortress/compiler_tests/`. Beside its own tests, this rung's test is the gate's distance stage." The brief quotes:

{FACTS 94}

{FACTS 53}

Write the key lines of your plan: the test you start from and what its failing run shows; the library site your fix should move, and how you take the before and the after (what you run, what you compare, what counts as a change and what does not); where in the checker you expect the cause and what your fix must not break; and the cost limits your work runs under.

---

## 3. Two refusals while a rung's tests are written

You are a worker on a library rung. Your fix is done and you are writing your test program: a compiled test under `compiler_tests/` and its walk twin under `tests/`. Two of your lines are refused.

Compiled, with `object BoxT[\T\](v: ZZ32) end`, `wrapT[\T\](x: T): BoxT[\T\] = BoxT[\T\](1)` and `takesBox64(b: BoxT[\ZZ64\]): ZZ32 = 1`, the line `takesBox64(wrapT(3))` is refused: the checker finds `takesBox64` not applicable to the argument's type, a `BoxT` at the numeral's own type.

Under walk, with `object BoxK[\T\](v: T) end` and `wrapK[\T\](x: T): BoxK[\T\] = BoxK[\T\](x)`, the line `a: BoxK[\ZZ64\] = wrapK(3)` stops the program with "RHS expression type BoxK[\Int\] is not assignable to LHS type BoxK[\ZZ64\]", although the line before it, `i: ZZ64 = idK(3)` with `idK[\T\](x: T): T = x`, runs and prints `3 : ZZ64`.

Your brief quotes:

{FACTS 55}

{FACTS 87}

Decide for each refusal: is it a defect of your change, a gap the record knows, or something new? What do you do with each line of your test, and what, if anything, do you open or ask? Write the lines of your report that cover the two.

---

## 4. The next batch's rung on the sized arrays

You are the coordinator. The curator says: "For the next batch I want one rung on the sized arrays, the class V2, since after the `Integral` bodies it is the biggest. Draft the measurement lines of its brief: what the worker is given as its before, what its test is, how its after is read, and what it has to know about that corner of the distance before it starts." The entries you have at hand:

{FACTS 53}

{FACTS 94}

and the entry "The distance to the switch-over by root cause: the self-typed `Integral` bodies lead, then the sized arrays' bodies and factories", which you find in your copy. Write the lines, and under them, for the curator, anything about this class that should change how the rung is cut.

---

## 5. Two objections from an outside reader

You are the coordinator. The curator forwards two objections from an outside reader of the specification and asks: "Are they right? Does either change a decision of mine? Draft my reply, two paragraphs, and tell me what I should re-decide, if anything."

The objections: (1) "Your instance rule, that a type parameter nothing fixes takes its bound, is lifted from the POPL 2019 paper, but that paper's soundness proof excludes exactly the shape your library leans on, the F-bounded functions such as `SUM` and `BIG MAX`. The rule is unjustified where you need it most." (2) "Your typing of a call between two closed traits by the intersection of its candidates' return types is presented as proved, but the proof covers ground declarations only, and your library's families are generic."

The entries you have at hand:

{POSITIONS 48}

{FACTS 166}

{POSITIONS 60}

---

## 6. The process stopped in the gate

You are the coordinator. The platform's cap stopped the session's process during climb batch 14's run and restarted it in resume mode a minute later. At the stop, the run stood so: every rung and skeptic had returned; the gather had returned and its commits are on `main`; the gate was in its suites, with the distance stage it had started in the background still running; the commit stage had not begun. Since the launch you had edited the workflow script once: one sentence added to the commit stage's prompt. The run's journal is on disk. The entry you have at hand:

{FACTS 201}

Decide what you do, in what order, and what you do not do. Say what you check on disk first; how you bring the run back and with what; which agents run again and which do not; what you do about the script edit; and what the stopped gate may have left behind that the resumed one meets.

---

## 7. What C4 still fails on after decision D

You are the coordinator. The curator is about to take item 13's fifth fork, decision D, the model's sized types. He asks: "If I take D1, the re-based diff, what does C4 still fail on under the compiled checker, and how many errors are they? Is any of it the numeral work we did, or is it the arrays again? And can I trust the number?" The entry you have at hand:

{FACTS 58}

Answer him in a few paragraphs, with the numbers you stand on and what each rests on.

---

## 8. A worker's finding on the coverage typing

You are the coordinator. A worker on a checker rung reports mid-rung: "For my test I wrote a closed family, `trait M comprises { L, R }`, with a declaration on `L` and one on `R` whose return types differ, and a third declaration generic in a type parameter, over a `Box[\X\]`, which cannot apply to a value of `M`. The checker accepts the three by coverage, but a call on an argument of static type `M` is typed by one candidate's return type rather than by the intersection of the two, so a binding to the other candidate's type is refused. The specification says such a call is typed by the intersection. This looks like a checker defect: shall I open a row and fix the condition in my rung, or is the specification wrong?" The entry you have at hand:

{POSITIONS 60}

Decide, and write the reply to the worker: what this is, what the worker does with its test, what goes in its report, and what, if anything, goes to the curator.

---

## 9. Where the instance rule stands, path by path

You are the coordinator. The curator is writing phase 5's line of `PLAN.md` and asks: "My instance rule, the paper's. Where does it stand today, path by path? Is it in force in the compiled checker, in the compiled dispatcher, under walk, and in the specification? Where does each still depart from it, and for each departure, is that a decision of mine or a defect, and which test pins it? What is left, and for which phase? And is the library back to the team's own declarations as I asked, and what does the rule still refuse there?" The entry you have at hand:

{POSITIONS 48}

Answer him in a few paragraphs, path by path, with the rows and tests you stand on.

---

## 10. A rung on row 559, and the shorter way

You are a worker on a rung of the next climb batch; the curator pulled row 559 forward from phase 5's list. Your brief says: "Repair row 559: on the compiled path, a generic declaration instantiated at an intersection type dies loading its instance. Promote `compiler_tests/XXXCoverageReturnInferred` and `XXXInferBoundMeetsExpectedTrait`. Your files: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/`, `scala_src/types/`, `runtimeSystem/`, `ProjectFortress/compiler_tests/`." It quotes:

{FACTS 78}

{FACTS 76}

You have read the row and the two programs. Two ways are open. (a) The run time: give the class loader a class for an intersection type, where every such instance dies today. (b) The checker: never hand the run time an intersection. In the first program, type `choose(m)` by one candidate's return type, the head of the sort, as the checker did before and still does when a declaration of the family has static parameters, so that `pass(choose(m))` instantiates `X` at a named type; in the second, instantiate `mk()`'s `T` at its declared bound `A` alone, or at the expected type `B` alone, or leave it as the base did, which ran the program. Way (b) is smaller, lies in files your brief names, and turns both tests green. Before you choose: whose rule does each half of (b) change, where is that rule written, and why was it taken? What does that make of (b)? Which way do you take, and what do you do if (a) does not fit in the rung? Write the lines of your report that cover it.
