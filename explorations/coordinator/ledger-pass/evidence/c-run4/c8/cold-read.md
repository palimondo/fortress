# Cold read: c-run4 / c8

Read with `CLAUDE.md`, `fortress-repo/SKILL.md`, and `references/records.md`, `compiler.md`, `interpreter.md`, `tests-writing.md`, `library.md` (term look-ups only). Nine rows: 896, 368, 812, 818, 819, 822, 895, 340, 498.

Applies to every row: the skill names the seven status words but defines them only in "the row template" (`explorations/fortress-gap-ledger.md`), which a cold reader may not open. So `NEGATIVE-VERIFIED` and `NEGATIVE-BOUNDED` are words I could read only by guessing ("confirmed defect" against "defect with known limits"?). The skill does not define `siblings: N, M` either: I read it as "related rows", but not whether they share a cause, a fix or only a message. The `Found by` cells (climb batch N rung X, skeptic, repair round, distance probe) are provenance only, and a worker does not need them.

## Row 896

- **Defect:** under walk, `getProperty` with an empty name (`""` or an `EmptyString`) raises Java's `IllegalArgumentException: key can't be empty`, and the program sees it as a raw Java exception, not as a Fortress library exception.
- **Where:** walk. `Library/System.fss:51` binds `nativeHelpers/systemOps.getProperty`, which goes through `ProjectProperties.get` and `StringMap` to Java's `System.getProperty`. Walk's `StaticNativeApp.java:252-257` rethrows the helper's `RuntimeException` unchanged. The `EmptyString` route through `asFlatString` (`System.fss:52-56`) was found by reading the code and was not run.
- **Reproduce:** a scratch program `getProperty("", "?")` under `bin/fortress` prints the Java exception line. There is no test.
- **Status:** an open gap with a workaround (check the name for emptiness first). The specification is silent, so by `tests-writing.md` item 3 this looks like a deferred defect: a test of today's behaviour and the row. But the status word is undefined to me, so I cannot tell whether a worker should build a fix.
- **Could not resolve:**
  - The claim ends "not as one of the library's" with no noun after it. I take it to mean "the library's exceptions", but the row never names which Fortress exception it should raise. A fixer has no target. (Unclear wording.)
  - "by reading": I take it to mean "inferred from the source, not run". (Unclear wording; it could be defined somewhere I cannot read.)
  - The compiled path is not stated. Is it unaffected, untested, or out of reach until the switch-over (`CompilerSystem` is the compiled path's `System`)? SKILL.md asks a row to say which paths show the defect. (Missing fact.)
  - `NEGATIVE-BOUNDED`: what is bounded, and does it allow a fix? (Status word that the skill does not define.)

## Row 368

- **Defect:** the native-wrapper generator fails the whole import of a Java helper class if any method of it, private methods included, has a parameter or result type with no Fortress counterpart. Its error does not say which method caused it.
- **Where:** the compiled path's code generator, at the build of `CompilerBuiltin`: `compiler/nativeInterface/FortressTransformer.java:53` reads the whole class, `FortressMethodAdapter.visitMethod` (`:215-225`) wraps every method, and `toImplFFFF` (`:250-258`) throws on an unmapped type. `compiler.md`, "Natives", states the same rule, which confirms it.
- **Reproduce:** add `private static boolean hasOwnToString(Class<?> c)` to `nativeHelpers/stringOps.java` and rebuild. The build fails with `java.lang.Error: No Fortress type (yet) for foreign Java type descriptor 'Ljava/lang/Class;'`.
- **Status:** a confirmed gap with a workaround (give every private helper a mappable signature). The row does not say which fix is wanted: skip private or unused methods, or only name the method in the error. So a worker can follow the workaround but cannot design the fix from the row alone.
- **Could not resolve:**
  - "and names no method": it reads as a second defect (the message names no method), but grammatically it could attach to "class". (Unclear wording.)
  - "imported by no Fortress source": does it mean the helper method is called by no Fortress binding, or that no Fortress source imports `Class`? I read the first. (Two readings.)
  - "unsayable descriptors": descriptors the adapter cannot express? The skill does not define it. (Term missing.)
  - "siblings: 895, 874": 895 is in this file. 874 is not, and I cannot see how it relates. (Undefined convention.)
  - "full text: history, row 368": I read it as "the earlier text is in `explorations/fortress-gap-ledger-history.md`" (`records.md`), which is clear enough.

## Row 812

- **Defect:** take a trait C whose `comprises` clause lists a type at a `where`-clause type variable, and a generic trait that gives a body to one of C's members. The code generator crashes on that pair with 'E is not in the kind env [][]', because its type analyzer has no binding for the extending declaration's static parameter.
- **Where:** the compiled path's code generator. The crash comes from `TypeAnalyzer.lteq`, called in `STypesUtil.removeIdenticallyCoveredMethods` (`scala_src/useful/STypesUtil.scala:1587`) from `CodeGen.<init>` (`CodeGen.java:488`). Walk runs the program.
- **Reproduce:** `fortress compile -debug stacktrace ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodChecker.fss`. A dotted method gives the same crash. If the body is moved into the object only, it compiles and runs. There is no gated test, because the compile crashes (`tests-writing.md` item 3).
- **Status:** a confirmed code-generator defect with a ready program, and the row reads as a fix to build. No workaround is stated beyond moving the body into the object.
- **Could not resolve:**
  - The claim's nesting ("a generic trait that defines a member of a trait listing a type at a type `where`-clause variable in its `comprises` clause") took several readings. Which trait is generic, and which lists? "a type `where`-clause variable" could be "a `where`-clause type variable" or "a type at a `where`-clause". (Unclear wording.)
  - "at the object's `extends C[\E\]`": the claim mentions no object. Is it an object in the test file that extends the generic trait? (Unclear wording.)
  - "whose analyzer binds no static parameter of the extender": "whose" can refer to `CodeGen.<init>` or to the commit c124c6b65. (Two readings; I took `CodeGen`.)
  - The file name says `...Checker`, and the claim says "compiled, stops", but the class is codegen. I read "compiled" as "on the compiled path". (Mildly unclear.)

## Row 818

- **Defect:** the code generator cannot compile a type assumption `e asif T`. It has no visitor for `AsIfExpr`, so it stops with "Can't compile AsIfExpr". So library declarations that pass the checker still cannot be compiled, among them `SequentialGenerator`'s `asString` (`Library/FortressLibrary.fss:1496`).
- **Where:** the compiled path's code generator, at `CodeGen.defaultCase` (`CodeGen.java:1675-1677`). Walk has a case for it (`Evaluator.java:109`), by reading. The affected library files are `FortressLibrary` (4 sites), `RangeInternals` (1) and `String` (8): 13 sites, 7 declarations refused at 32242b80d.
- **Reproduce:** compile, under the compiler's prelude, `trait Named getter name(): String = "Named" end`, `object Leaf extends Named getter name(): String = "Leaf" end` and `run():() = println((Leaf asif Named).name)`. The output is 'AsIfProbe.fss:11:25-35: Can't compile AsIfExpr'. The probe file is not committed, so the worker rebuilds it from these lines. There is no gated test.
- **Status:** a clear missing feature of the code generator, and a fix to build: add an `AsIfExpr` case. It blocks compiling the one library.
- **Could not resolve:**
  - "declarations of the one library that the checker passes are refused at it": readable, but heavy. "it" is the missing case. (Wording.)
  - Why only 7 declarations were refused for 13 sites is not explained. I assume several sites share a declaration. (Minor.)
  - "by reading" again (see row 896).

## Row 819

- **Defect:** a postfix operator whose parameter is a tuple, called on a tuple-typed value, crashes the code generator with 'Error trying to close method scope'. The calling method receives the tuple's elements as separate JVM parameters (`x1`, `x2`), rebuilds `x`, and then passes the one tuple to `postfix !`, which takes two `FZZ32` values. ASM's `Frame.merge` then fails. The same call from a plain function works.
- **Where:** the compiled path's code generator (`CodeGen.java:2874`). It refuses four library operators, at `Library/FortressLibrary.fss:4199`, `:4200`, `:4242` and `:4243`.
- **Reproduce:** compile, under the compiler's prelude, `opr (x:(ZZ32,ZZ32))! : ZZ32 = 3` together with `opr (x:(ZZ32,ZZ32)): : ZZ32 = x!`. The output is 'TupleParamOpr.fss:5:31: Error trying to close method scope'. The probe is not committed. As a control, `g(x:(ZZ32,ZZ32)): ZZ32 = h(x)` prints `3`. There is no gated test.
- **Status:** a confirmed code-generator defect with a small program and a known cause, so a fix to build. There is no workaround.
- **Could not resolve:**
  - `opr (x:(ZZ32,ZZ32)): : ZZ32`: is this a postfix `:` operator? The doubled colon reads like a typo. (Language concept I lack: which tokens may be postfix operators is not in the skill.)
  - "four range operators over pairs and triples": the sites show `= x#` and `= l#`, and the row does not say which are pairs and which are triples, or whether the triples fail the same way. (Unclear.)
  - In the control, `h` is not defined. I assume it is a function with the same body as `!`. (Unclear.)
  - "377 (its message)": does row 377 hold the same message, or is it the row that names this message? (Two readings.)
  - The claim says "applied to a tuple operand", but the note's failing case is a tuple-typed parameter `x` passed on. Does a literal tuple, `(1,2)!`, also fail? (Unclear scope.)

## Row 822

- **Defect:** inside a generic function's `typecase`, the code generator stops with 'T is not in the kind env' when it normalizes a type, because its type analyzer lacks the function's own static parameters. So `app[\T,E extends T,F extends T\]` (`Library/List.fss:93`), which the checker passes, cannot be compiled.
- **Where:** the compiled path's code generator: `CodeGen.forVarRef` calls `TypeAnalyzer.normalize`, which ends in `pExc`.
- **Reproduce:** none on its own. It was seen only in the distance probe's per-declaration code generation over the library (`explorations/perf-probes/codegen-distance/REPORT.md` §3 (c)). It was "not reproduced apart from it, not traced". A worker must first write a small program: a generic function whose body is a `typecase` over its type parameter.
- **Status:** a fix to build, but it starts with a reproduction. The second half (`object ArrayList[\E\]`, `List.fss:252`) is said to be row 812's site and message, so a worker would look at 812 for it.
- **Could not resolve:**
  - `NEGATIVE-VERIFIED` with "not reproduced apart from it, not traced": verified only as a library observation? Is the cause in the claim (the analyzer lacks the static parameters) a guess? (Status word and wording conflict.)
  - "the probe's code generation per declaration with the checker's failures caught": how the probe ran is not given, nor where its script is. (Missing.)
  - `pExc`: not defined; perhaps a helper that throws. (Term missing.)
  - The ArrayList case: is it covered by row 812? 812's claim is about a `comprises`/`where` pair, and the note does not say whether `ArrayList` has one. (Unclear.)
  - "Row 789 holds the message in the checker": the same message raised by the checker, I take it. (Fine.)

## Row 895

- **Defect:** when the compiled checker checks a library binding against the interpreter's prelude (count stage or distance stage), naming any helper of `nativeHelpers/systemOps` stops the whole component with 'FortressBuiltin.StringVector is undefined.'. The checker reads every method of the class, and `systemOps.getArgs` returns `FStringVector`. `NamingCzar` maps that type to `FortressBuiltin.StringVector`, which the interpreter's `FortressBuiltin` does not declare.
- **Where:** the compiled checker in the distance (and count) stage. The files are `nativeHelpers/systemOps.java:29` and `compiler/NamingCzar.java:339-340`. `Library/System.fss:41` and `:51` (`getEnvironment`, `getProperty`) bind `systemOps` today, but neither stage reads `System`, so the gap is hidden. `compiler.md`, "Natives", says the same.
- **Reproduce:** edit `Library/FlatString.fss:25-26` to name `systemOps.lineSeparator`, then run the distance stage. Its output: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.', '#total none: 1 target(s) stopped'. The distance stage's command comes from a brief (`compiler.md`), so a worker without one cannot run it.
- **Status:** a confirmed gap with a workaround (bind a helper of another class). The row does not say whether to fix it (declare `StringVector`, change `getArgs`, or check only the method named) or whether it waits for the switch-over. I read it as: avoid it, and fix it when `System` comes into the stages.
- **Could not resolve:**
  - "the checker reads the whole class": row 368 says the same of the wrapper generator. Is this the checker, or the wrapper generator invoked during the check? (Unclear which area.)
  - "#total none": what "none" stands for in the table. (Minor.)
  - The distance stage's command is not in the row or the skill. (Missing for a cold worker.)

## Row 340

- **Defect:** when a `typecase` is the whole body of a function or method, and its clause values are integer literals coerced to the declared `ZZ32` result, the code generator crashes with 'Error trying to close method scope'. Two paths reach the coercion with different JVM stacks, so ASM's `Frame.merge` fails, under `CodeGen.methodReturnAndFinish`.
- **Where:** the compiled path's code generator (`CodeGen.java:3477-3481`, error at `:2874`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXTypecaseBodyCoerceRungG.test`. The same crash shows for related shapes: an `if` argument coerced to an overloaded method's parameter; a size read in a clause; a named tuple clause spread into a call (`XXXTupleClauseSpreadRungG`); `r = try … end` then `r = -1` (`XXXTryCompareCoerceRungE`); a numeral `try` operand (row 526); a `ZZ32` function's `try` body with a numeral `catch` value.
- **Status:** a confirmed code-generator defect with an `XXX` test to promote. The fix is to build. The workaround is to wrap the body in `do … end`.
- **Could not resolve:**
  - "Same (walk runs all but the last)": does walk fail the last shape (the `try`/`catch` one)? Is that a walk defect recorded anywhere? (Unclear.)
  - "(83b1cae78)": a commit with that shape's test? It is not named as a test the way the others are. (Unclear.)
  - "a size read in a clause": which construct? A static size parameter, or `.size` of an array? (Unclear wording.)
  - "The coercion desugarer's `typecase` binds a pattern name": I read this as linking to row 498, but what follows for this row is not said. (Unclear.)

## Row 498

- **Defect:** a name bound in a `typecase` clause's pattern, as `i` in `Leaf(i) => i`, is unbound in the clause's body. The compiled path fails at run time with `NoClassDefFoundError: SkPatternBind$i`. Walk fails with 'undefined variable [i]'. The checker accepts the program, and `PatternMatchingDesugarer.scala:668-671` (`checkClause`) keeps the pattern.
- **Where:** both paths. The class says only "(codegen)", although walk fails too.
- **Reproduce:** the old probe `explorations/compile-ladder/rung-generic-runtime/probes/skeptic/SkPatternBind.fss`, from git at `ab067d9b6^` (it is deleted at `ab067d9b6`). The same shape is in the team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:39`. There is no test.
- **Status:** the specification is silent: the `typecase` chapter defers patterns to the pattern-matching proposal (`typecase.tex:15`). So by `tests-writing.md` item 3 the row reads as deferred, and the language question is open. I could not tell whether to fix it on both paths, refuse it in the checker, or wait. That is a curator question, and the row does not mark it.
- **Could not resolve:**
  - The class names codegen alone while walk also fails, so which area owns the fix? (Unclear.)
  - "The coercion desugarer's union `typecase` binds such a name too": does this mean row 340's crashes come from this gap, or only that the desugarer produces this shape? (Two readings.)
  - "the pattern-matching proposal": which document it is and whether it is binding is not in the skill. (Concept I lack.)
