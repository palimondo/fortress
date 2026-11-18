# The task: the cast where a value typed by a trait stands for the type that the trait's `comprises` clause lists: the checker accepts it, and the compiled code now casts (rows 991 and 695)

**The mission.** A `comprises` clause says that every value of its trait is a value of a listed type (P-60). So the checker lets a value typed by `trait Q comprises { R }` stand where `R` is expected, and in a self-typed trait it lets `self` be returned as the implementing type (P-146). The code generator emits no cast at those places, and the JVM's verifier refuses the class. Against the one library that stops every program: `trait QQ comprises { Ratio }` passes `self` to `numerator` and `denominator` on 23 lines, and the library's static initializer loads `QQ`'s class. An earlier trial ran with the verifier off, so nobody knows how many other methods it refuses.

**The decisions this task builds.** P-60, P-146 (`decisions.md`). And this design choice, settled before the work: the cast is emitted only where the value's static type is not a subtype of the declared type by the `extends` clauses, so a call that verifies today keeps its bytecode. The other way casts at every call, and changes the bytecode of calls that work today.

**What you build, in order.**
1. **The cast** (row 991). Test first, `ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled.test` (`compile`, `link`, `run`): a trait's value passed as a function's argument at the listed object type, as a method's argument, returned at that type, bound to a variable of that type; a trait that lists two types, with a `typecase` before the use. Seen failing on the base: 'VerifyError: Bad type on operand stack … is not assignable to'.
2. **The returned `self`** (row 695). `compiler_tests/XXXSelfTypeReturnSelfRun` promoted, if the same cast reaches a returned value.
3. **The kin, by a run each:** `compiler_tests/XXXNatOpenRun` (row 307) and row 815's `num(R)`. Promote what passes, and report what does not; build nothing more for them.
4. **The whole compiled suite once,** `ant testFast`.

**Files.** `compiler/codegen/CodeGen.java`: `conditionallyCastParameter` (`:7289-7321` on the base) and its callers' arguments to it, the returned value in `generateFunctionalBody`, and a new member put directly above `conditionallyCastParameter`; your tests. Not: `evalArg`'s forking; `dumpMethodChaining`; `forAtomicBlock`; microGPT.

A cast that is needed at a field, whose code is another task's (`forObjectDeclPrePass`, `VarCodeGen`), or in a forwarder, whose code is another task's (`generateForwardingFor`), is reported with its program, not built.

**Reserved points** (to be reported, not done): a change to a line of the model program, microGPT; a cast at a place that verifies today.

(The task also asked for a sentence of the specification to be brought in line, and for reports and records; those files are outside this folder.)
