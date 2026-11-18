# The task: `self` at a self type or a listed type on the compiled path: an arm of a conditional, a function expression's or a local function's result, and a default body that calls a method on a value of the self-type parameter (rows 1051, 1050 and 1052)

**The mission.** The checker types `self` in a self-typed trait as the trait met with the implementing type (P-146), and in a trait with a `comprises` clause lets it stand for the listed type (P-60). The code generator casts a method's returned `self` (`castToTypeBelow`, `CodeGen.java:7630` on the base; an earlier change), but not an arm of a conditional (row 1051) nor a closure's result (row 1050), and each fails the JVM's verification when its class loads. The one library's `StandardTotalOrder` writes `MIN`, `MAX` and `MINMAX` with `self` in one arm (`Library/FortressLibrary.fss:291-294`), and each built-in integer type is a value object directly below it, so the first compiled program against the one library meets it. A default body that calls a method on a value of the self-type parameter dies with `ClassCircularityError` where the object lists the trait first (row 1052; `runtimeSystem/MethodInstantiater.java:269` on the base). You repair the three.

**The decisions this task builds.** P-146; P-60 (`decisions.md`). And two design choices, settled before the work:
- Each arm of a conditional, and the result of a function expression or a local function, is cast to the declared type where its static type is not already a subtype of it, as the earlier change casts a method's returned value. Way not taken: a cast after the conditional joins, which needs the join's type at the JVM.
- Row 1052 is repaired where the loader loads the static argument's class to choose a call's opcode: the choice is made without loading a class that is being expanded. The worker finds the place first and reports what is loaded in its place.

**What you build, in order.**
1. **The owed test first.** `compiler_tests/XXXSelfTypeArmRun.test` with its link test: a trait `Tord[\T extends Tord[\T\]\]` with `mx(self, other: T): T = if lt(other, self) then self else other end` and an object that extends it. Seen failing on the base: 'VerifyError: Bad return type'.
2. **The arms** (row 1051). Promote it and `XXXComprisesValueAtConditionalArmRun`.
3. **The closures** (row 1050). Promote `XXXComprisesValueFromClosureRun`, and add the self-type parameter's form.
4. **The circular load** (row 1052). Promote `XXXSelfTypeParameterReceiverRun`.
5. **The whole compiled suite once,** `ant testFast`.

**Files.** `compiler/codegen/CodeGen.java`: `forFnExpr` (`:3867` on the base), `forLetFn` (`:3941`), `forIf` (`:4485`) and `castToTypeBelow` (`:7630`), a new member directly above `castToTypeBelow`; `runtimeSystem/MethodInstantiater.java`; your tests. Not: `forTypecase` and the kind environment (another task's); the prelude; the one library; microGPT.

**Reserved points** (to be reported, not done): a change to a line of the model program, microGPT; a change of which declaration a call reaches.

(The task also asked for the sentences of the specification that the change makes false to be listed, and for reports and records; those files are outside this folder.)
