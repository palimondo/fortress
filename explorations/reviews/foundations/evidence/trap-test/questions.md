<!-- Nine forks of the coordinating session, in the record-test kit's form, for one reader in each copy of the repository to answer as that session would; the first four of 2026-10-26, the last five of 2026-10-28. -->

# Record test: forks of the coordinating session

You have a copy of the Fortress revival repository. In each scenario you are the coordinating session: load the `fortress-repo` skill and then the `coordinator` skill, as that session does at its boot. Each scenario quotes the entries of the record that you have at hand (each `{FACTS n}` or `{POSITIONS n}` line stands for one entry's text, quoted whole), and puts a fork to you. Answer each in a few paragraphs, in the form that the scenario asks: what you do, and why, with the entries that you rely on. You may search your copy of the repository and open any report, test, ledger row or source file; cite what you used. Build nothing, run nothing, edit nothing. Where the record does not settle something, say so and say what you would do.

---

## 1. A tuple-typed parameter of a dotted method

Climb batch 22c is running. One of its rungs makes `fortress compile` take the implicit bound `Any` in place of `Object`: one line of `ProjectFortress/src/com/sun/fortress/Shell.java` and ten compiled tests. The rung's files are `Shell.java` and `ProjectFortress/compiler_tests/`. Mid-rung, its worker reports:

"While I respelled one of the ten tests, I met the defect that the bound-`Any` probe found (`explorations/perf-probes/bound-any-compiled/REPORT.md`). With `object Box[\T\](x: T) first[\U\](y: (U, U)): U = do (a, c) = y; a end end`, the call `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))` compiles, and the run dies at the call with `ClassCastException`. Walk prints `2`. It fails under either bound. The cause is `CodeGen.receiverPrependedDomainType` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6250-6263`), which cannot tell one parameter of a tuple type from several parameters. The team's comment at that site reads: 'I think we start to have a problem here in the future, when generics can be parametrized by tuples. We need to figure out what this means.'

I see two ways, and I lean to the first.

(a) Make the shape a static error of the language. The type group, who built the compiled path, left it unsettled. P-26 says that they worked to make the language run and learned what is feasible, and that the implementers' later word also outweighs unfinished text. P-77 already makes a limit of the JVM a rule of the language. So the checker, and walk's load check, refuse a generic method called with a dot whose one parameter has a tuple type; a revision callout in `Specification/basic/functions.tex` states the rule and its reason, as P-95 asks; and the new ledger row is classed `design limit (specification)`. About 20 lines. No declaration of the library has the shape.

(b) Keep the compiled path's extends-`Object` pre-desugaring for the static parameters of dotted methods only. The Working Draft gives a type parameter with no `extends` clause the bound `Object` (`Specification-1.0-frozen/basic/trait-parameters.tex:50`), and an `Object` bound keeps tuple static arguments out of such methods.

A fix in the code generator is outside my files, and I cannot size it."

The entries you have at hand:

{POSITIONS 26}

{POSITIONS 42}

{POSITIONS 77}

Decide, and write your reply to the worker: what the defect is; what the rung does about it now; where it is recorded, and how it is classed; what becomes of (a) and of (b), and why; and what, if anything, goes to the curator.

---

## 2. The order traits' self type, in a planner's draft

The planner's draft record for climb batch 22c, the batch that closes phase 3, holds a rung that none of its other rungs needs. The rung rests on a sweep of the record against the compiler's prelude, which reports:

- The compiler's prelude spells the order traits with the self-type idiom, and with no F-bound: `trait StandardTotalOrder[\T\] extends {Equality[\T\], AllStandardTotalOrders} comprises T` and `trait Equality[\T\] comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`).
- The team's last edits of `StandardTotalOrder` are Guy Steele's of June 2012. On 2012-06-05 (`655e65d53`) he added `comprises T` to the F-bounded `trait StandardTotalOrder[\T extends StandardTotalOrder[\T\]\]`. On 2012-06-06 (`59fdeff62`) he took the F-bound away, in the same commit as a change of the checker for `comprises` clauses. So on the compiled path, the team's last word on this trait went from the F-bound, which the interpreter's library still has, to the idiom.
- The history of the idiom in the notes behind P-146 stops at 2011-12-06 (`explorations/reviews/self-typed-bodies-ways.md`, section 3, step 7). Those notes call the idiom way 5.

The rung is way 5: `comprises T` on the seven traits of the interpreter's library that way 5 names in `explorations/reviews/self-typed-bodies-judgement.md`, after walk's six-line edit of `BuildEnvironments.finishTrait`, so that walk does not overflow its stack on the clause (row 407). The planner writes: "The team's later word wins, and the revival does not second-guess it (P-26). The one library may take a design of the prelude's, as it took the flat number types (P-37)."

The Fable reviewer of the draft writes: "Drop the rung. P-146 settled the self type. The compiler's prelude is a bootstrap that the switch-over deletes (P-37), and the library's own practice is the standard (P-27): the checker reads the library as the team wrote it."

The entries you have at hand:

{POSITIONS 26}

{POSITIONS 37}

{POSITIONS 146}

{POSITIONS 27}

Decide what climb batch 22c does with the rung, and what you do with the sweep's finding: who decides it, in what form it reaches them, what you do before that, and on what grounds. If something goes to the curator, write its question and the main points of its context.

---

## 3. A `case` guard typed by a type variable

A worker on a checker rung, briefed to repair row 480, reports before it edits anything:

"The checker's `case` rule for a clause with no comparison operator chooses ∈ or `=` in `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1396-1403`. In the compiler's world, it asks whether the guard's type is a subtype of `GeneratorZZ32`, the prelude's range trait (`Types.makeGeneratorZZ32Type`; `Library/CompilerLibrary.fsi:111`). In the one-library world, a branch that the revival added asks whether a trait type has `Contains` among its ancestors, and answers false for every other type. So a guard typed by a type variable bounded by `Range[\ZZ32\]`, or by a union of ranges, gets `=`, and the clause never matches. I see two ways.

(a) The prelude's way. Declare `trait GeneratorZZ32` in `Library/FortressLibrary.fsi`, make the scalar `ZZ32` ranges extend it, and let both worlds ask the team's question, the subtype test against `GeneratorZZ32`. The revival's branch goes. A subtype test sees through a type variable's bound and through a union, so row 480 closes. Two library lines, and a deletion in the checker.

(b) Row 480's own fix. Keep the question about `Contains`, and answer it for a type variable through its bounds, for a union through all its members, and for an intersection through any of them. About 15 lines of the checker; no library line.

I lean to (a). P-37 lets the one library take a design of the prelude's, as it took the flat number types. P-43 says that the flattened prelude is the team's last record of the Fortress way, and P-26 counts the prelude's number types, made siblings in 2009 and 2010, among the type group's later word. P-77 already takes the prelude's `ZZ32` ranges, as the prelude declares them. And (a) is the team's own checker code."

The entries you have at hand:

{FACTS 133}

{POSITIONS 37}

{POSITIONS 43}

{POSITIONS 77}

Decide which way the worker takes, and write your reply: why; what its test must show before and after the fix; what goes into its report; and whether anything goes to the curator.

---

## 4. `System` on the compiled path after the switch-over

The planner's draft for the names batch, the batch that moves the compiled path onto the one library and deletes the compiler's prelude, holds this rung:

"Rung Y: `System` on the compiled path. Both microGPT programs import `System.{...}`. Walk's `System` (`Library/System.fss`) binds `args` as it loads, through `getProgramArgsPrim`, a native with no compiled analogue, over `NativeArray`, whose natives have none either (F-32); its `getEnvironment` and `getProperty` are natives too. So the compiled path keeps `CompilerSystem` (`Library/CompilerSystem.fsi` and `.fss`), which 27 compiled tests import today, and the names batch maps the api name `System` to `CompilerSystem` on the compiled path, as `WellKnownNames` maps the prelude's names today. The rung adds walk's `programName`, `getEnvironment` and `toDirectoryName` to `CompilerSystem`, over `import java` helpers, so that the two apis declare the same names; `CompilerSystem`'s `args` stays a `StringVector`. `CompilerSystem` is not one of the three prelude files that the switch-over deletes (P-37), so no decision bars this. `System`'s own two checker errors need no rung: the switch-over's measure is the distance over the twelve components (P-33, F-53), and `System` is not one of them. Cost: one rung, no native work, and microGPT's import lines do not change."

The entries you have at hand:

{POSITIONS 37}

{POSITIONS 33}

{FACTS 32}

{FACTS 290}

Decide whether the rung goes into the batch as drafted, and write the lines of your reply to the planner: what `System` is on the compiled path after the switch-over; which work that needs, and in which phase; and what, if anything, goes to the curator.

---

## 5. The export rule, in the asks before climb batch 22c

Climb batch 22c waits for its launch. Its record's questions go to the curator first, one per message (`explorations/coordinator/CLIMB-BATCH-22c.md`, section 5, "Before the launch"). The Opus worker that drafts the asks writes:

"Question 3 can go. It asks his informed yes to P-158 against the specification's export rule, but there is no conflict to ask about. P-158 already says that the specification asks for no body there, not for no declaration (`apis.tex`). The sentence at `Specification/basic/components/source-code.tex:380-385` lists what a satisfying declaration must contain, and it adds that 'a satisfying trait declaration is allowed to provide a concrete declaration' of an abstract method. So the specification allows the component to declare such a member; P-158 only makes the allowed shape required, and what an implementation requires is its own business. The team's export check of 2012, later than the Working Draft of 2010-12, counts every api member, and by P-26 the team's later word wins and the revival does not second-guess it. So rung A needs no revision box and no Appendix I entry: one clarifying footnote at `source-code.tex:385` is enough, and he gets one ask fewer. I would send him questions 1 and 2 and the batch's go, and take question 3 as answered by P-158."

The entries you have at hand:

{POSITIONS 158}

{POSITIONS 26}

{POSITIONS 95}

Decide what goes to the curator before the launch, and what rung A does with the specification. Write your reply to the worker: whether question 3 goes, and why; what the specification's sentence says; on what ground P-158 stands; and what, if anything, changes in the record.

---

## 6. A self-typed trait extended at an element type

A worker clears the checker's errors in `PureList`, one of the library's components outside the fourteen that the distance stage counts, ahead of the step at which walk runs the checker (P-12; F-290). It reports before it edits anything:

"`Library/PureList.fsi:41` declares `trait List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] }`, the team's text, and the checker refuses it twice: `E` does not satisfy `Equality`'s bound, and by the self-type rule `PureList.List[\E\]` is not a subtype of `E` (row 355). The component's own header, `Library/PureList.fss:41-42`, does not extend `Equality`. I see two ways.

(a) Narrow the self-type rule. P-146's reason is that the checker reads the library as the team wrote it, and P-27 makes the library's own practice the standard. Yet the rule refuses the team's own declarations: this one, and the demo `trips.fss`, which had to be edited (row 710). Its ground is weak too: in June 2012 Steele took the F-bound off the compiler prelude's `StandardTotalOrder` (`59fdeff62`), so the team's last word drops the very bound that the rule reads. I would let a trait that extends a self-typed trait at one of its own type parameters pass, with a warning, and skip the bound check there. About 20 lines of the checker; the api stays as the team wrote it, and walk runs it today.

(b) Row 355's repair: the api's header written as the component's, and the api's `zip` at `:75`, which the component does not have, deleted. Two library lines.

I lean to (a): it keeps the team's text."

The entries you have at hand:

{POSITIONS 146}

{POSITIONS 27}

Decide which way the worker takes, and write your reply: why; on what ground the self-type rule stands; what the worker's test and report hold; and whether anything goes to the curator.

---

## 7. The compiled helper for the integer power

A rung of the integer families, after climb batch 23 (the natives), moves the one library's `ZZ32` power onto a static helper (P-58): `opr ^(self, b:AnyIntegral):ZZ32 = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$Pow")` (`Library/FortressLibrary.fss:802-803`), with rows 441 and 523 in its scope. Its worker reports before it edits anything:

"`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java` has two helpers for it. `intExp`, which the compiler's prelude binds, casts `Math.pow` to `int` (rows 441 and 523). Steele's `intToIntPower` (`:380-398`), which nothing binds, checks overflow and answers 0 at `2^(-1)`. P-153 rests on the team's later code, which outweighs the specification's early text (P-26), and the revival does not second-guess the team. That code is the prelude's power and this helper, and both answer 0 at a negative exponent: P-153 took the code's type and not its value. The specification's own rationale says that a reversal to the zero would change only the natives at a negative exponent (`Specification/appendices/changes.tex`, the revision of the negative power). So I see two ways.

(a) Bind `intToIntPower` as it stands, one string for each integer type and no new Java, and put to the curator the reversal of P-153's value at a negative exponent to 0, as the team's later word, with that as the default.

(b) Write a new helper by P-153's contract, about 30 lines of Java, with its tests.

I lean to (a)."

The entries you have at hand:

{POSITIONS 153}

{POSITIONS 26}

{POSITIONS 8}

Decide which way the worker takes, and write your reply: on what ground P-153's rule rests; what the team's code counts for here; what the rung's tests must show; and whether anything goes to the curator.

---

## 8. The tuples' order, in a planner's draft

The planner's draft for the batch after climb batch 22c holds a rung that none of its other rungs needs:

"Rung T: the tuple comparisons follow the lists. Since climb batch 13 the library's ten tuple comparison operators bound each element by `StandardPartialOrder` (review-queue item 213), so a pair of floats is ordered while a list of floats is not, a mismatch that the curator accepted (P-154). The team's later code settles it: both lexicographic traits of `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140` bound the element by a total order, `X extends TotalOrderOperators`, even the one named `LexicographicPartialOrder`. P-154 already took that bound for the lists on the team's later word (P-26), and the revival does not second-guess it. So the rung bounds each element of a pair and a triple by `StandardTotalOrder`, as P-154's application, and closes item 213; it needs no ask. Cost: ten declarations and the walk values that change; one rung."

The entries you have at hand:

{POSITIONS 154}

{POSITIONS 26}

{POSITIONS 8}

Decide what the batch does with rung T and what becomes of item 213: who decides it, on what grounds, and what you do before that. If something goes to the curator, write its question and the main points of its context.

---

## 9. The symbolic operators, in the asks before climb batch 22c

Climb batch 22c waits for its launch. Its record's questions go to the curator first, one per message (`explorations/coordinator/CLIMB-BATCH-22c.md`, section 5, "Before the launch"). The Opus worker that drafts the asks writes:

"Question 2 need not go. It asks whether P-155 covers the export check, so that rung O's checker half makes the export check read top-level symbolic operators (row 782). P-155 settles it: the checker reads symbolic operators by the rules that it applies to any function, so that the distance reaches zero with them checked, and a zero with them unchecked would hide known errors, in P-155's own words. The export check's skip hides 9 real header differences (F-287), each a `NoSuchMethodError` at a compiled call, and the export check's errors count in the distance. The phase 3 exit judgement ruled the repair 'not a design fork; the coordinator schedules it' (`explorations/reviews/phase3-exit/judgement.md`, its ruling on row 782). The coordinator skill says that if the record settles a question, you act on it. So I would take question 2 as settled by P-155, launch with rung O whole on his go, and write at the landing that P-155 covers the export check."

The entries you have at hand:

{POSITIONS 155}

{POSITIONS 33}

{FACTS 287}

Decide whether question 2 goes to the curator before the launch, and write your reply to the worker: why; what rung O builds if his answer is yes and if it is no; and what the record says at the landing.
