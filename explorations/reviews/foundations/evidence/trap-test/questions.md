<!-- Four forks of the coordinating session, in the record-test kit's form, for one reader in each copy of the repository to answer as that session would. -->

# Record test: four forks of the coordinating session

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
