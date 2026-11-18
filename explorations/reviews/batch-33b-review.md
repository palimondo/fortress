<!-- The combined post-batch review of climb batch 33, run 2, which the record calls climb batch 33b, of `coordinator/CLIMB-BATCH-33.md`: the compiler prelude's seven number types as value objects over hand-written payload classes, one class name for each function expression where two share a source span, a varargs parameter compiled as one immutable array under the selector, and a method of an imported api's trait found by its api (four rungs, N, W, G and R, landed at `ba3c7c876d` on 2026-11-18 on the curator's go of about 17:13 UTC on 2026-11-17, every fork at the planner's default; run `wf_1413c43f-684`, every agent on Opus, one ruling on rung N's contested fix, one ruling on the merged-diff review with its repair of two sentences of the specification, one green gate, a VM restart at 03:54 UTC and a resume at 03:56), by a review worker reading only: the landed changes against P-178, P-37, P-33, P-17, P-148 and P-26, what the two paths still do differently, the decisions that landed at a default and the run's twelve items for the curator, the measure on the landed tree, the cost in three spans and by role against the estimate, the restart's cost, the briefing's use, re-measuring, three events, the practice's measures, the skill writer's list, the record's sentences made false, the routing, what the batch after holds, and a section for the curator that shows each rung on a small program. Base `c799851472afc09b66e72d37e16f5a39e614ba5f`, base build `/home/user/fortress-base38` at `d3747846c1`; launched 02:10:09 UTC (the disk check's first record); killed by the VM restart at 03:53:51 and resumed at 03:56:03 with the same args; landed on `main` as N `75f9f2fbf4`, W `5af98dbca4`, G `e9bc2ed3e3`, R `90ee716db0`, the closes `49c11ccfd5`, the gather's record `f9acd7f6c2`, the review's corrections `17b55bcc72`, the judge's ruling `b3bfdf2526`, the repair `50a0aac2e0` and the gate's tables `ba3c7c876d` (06:41:55), pushed by the commit stage with no hold; 18 agent transcripts, 18 starts and 16 results in the journal. Read against `main` at `478ad94c8b`, whose commits after `ba3c7c876d` are the coordinator's boot notes and F-34's measure on the landed tree, `3fbce96856` (06:54:04), which the coordinator's worker took after the landing and which this review cites as a finding. Sources for the decisions: P-178 with its six history blocks, P-37 with its last blocks, P-33 with its last block, P-17, P-148 and P-26. The gate's result is cited as its agent returned it and was not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch33/rev33b/ (tx.py, brief.py, brief2.py, calls_mod.py, skill.py, attach.py, usertext.py, taskrem.py, runs3.py and mainw.py, copied from the review of run 1). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, git and one `git apply --check`, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 33, run 2: four of four rungs, the prelude's seven number types value objects, a varargs parameter and the `AND:` reduction compiled under the selector, an imported api's method found by its api, and the one library's refused declarations down from 13 to 1; the count and the distance still 0 at a green first gate; a run of 5.58M, 1 % over its estimate with the reserve, of which about 0.38M was the VM restart's, after a preparation of 0.96M and run 1's landing of 4.80M

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `ba3c7c876d`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs in the manifest's order N, W, G, R. Three files are shared: `compiler/codegen/CodeGen.java` by all four, `compiler/NamingCzar.java` by N, W and G, and `compiler/OverloadSet.java` by N and G. Every hunk applied cleanly (`compile-ladder/climb-batch-33b/RECORD.md`, "Conflicts"). The merged-diff review found that the three shared files equal a three-way merge of the four branches onto the base (its result, `fixesChecked`, last item).

**N, the prelude's seven number types as value objects over payload classes (P-178, P-37's second exception; rows 1003, 866, 698 and 566 closed, rows 995 and 496 narrowed, rows 1080, 1081 and 1082 opened). The prelude's text, seven run-time classes, a new names class, `NamingCzar`, `OverloadSet` and `CodeGen`; forks N1 to N6 built as the plan says, with one skeptic's fix that a judge upheld.**
- The prelude's text: each of `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64`, `RR64` and `RR32` is `value object ... extends { Number, Equality[\T\] ... }` with its `excludes` clause gone and no body changed (`LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:273`, `:332`, `:401`, `:444`; the same seven headers in `CompilerBuiltin.fss`). The one library's form, the precedent, is `value object ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }` (F-379). The stub file's seven entries are gone (`src/fortress/CompilerBuiltin.java`, 70 lines removed).
- The payload classes: `FZZ32` and its six siblings are abstract over `FValue`, with a protected constructor; `make` reaches the object's class's `make` through a method handle that `LibraryNames.factory` finds by name (`compiler/runtimeValues/FZZ32.java:22`, `:40-48`, `:52-54`). `LibraryNames.numberObjectClass` gives `fortress.CompilerBuiltin$<T>` under the prelude and `null` under the selector (`compiler/runtimeValues/LibraryNames.java:30-32`), so under the selector the first `make` raises an `Error` (`:35-45`). That is fork N4: the one library's seven have no rows.
- The code generator (forks N1 and N3): an object whose name has a row of `NamingCzar.payloadObjects` (`compiler/NamingCzar.java:615-623`, the prelude's seven only) gets a class over its payload class, no singleton field, a static `make` and a constructor that passes the payload up (`CodeGen.java:4941-4955`, `:5063-5084`), forwarders for its traits' bodies (`dumpMethodChaining`, the `payloadObjectSuper` guard), and an RTTI whose `className()` gives the payload class's name (`:6296-6305`). A dotted call names the object's class (`methodCall`, `:649-651`) and casts the receiver to it inside rung I's `castReceiver` (`:7659-7667`), one cast where the two meet, as the section asked. A dispatch method reads a payload object's RTTI from the object's class (`OverloadSet.java:1153-1155`). Descriptors still name the payload class (the carried table, `NamingCzar.java:589-602`).
- The skeptic's fix, `eabbfc918b`, contested and upheld: `forVarRef` refuses a payload object's name used as a value, 'Can't compile the number type ZZ32 as a value yet' (`CodeGen.java:7016-7020`; `compiler_tests/XXXNumberTypeAsValueCompiled.test:3`). On the worker's head, `x: Object = ZZ32` compiled and its run died, 'NoSuchFieldError: ... does not have member field ...FZZ32 ONLY'; on the base the checker refused it, 'Variable 'ZZ32' not found.' (`compile-ladder/rung-number-payload-objects/JUDGE.md`). The ruling holds by reading: a payload object is no singleton (`:4955`), so no `ONLY` field exists, and the wall decides no value. Section 2 has the value question.
- P-178 (history read whole): its block of 2026-11-16 01:57Z records his words "bring the two implementations to do the same thing" and "Of course, I'm making exception for the P37", so the prelude takes the form before the switch-over; its block of 2026-11-17 15:26Z settles the way: "way (b), a value object with a JVM payload in the code generator ... built once for both libraries". The prelude's half is built: a program's object below a number type is refused at the compile, 'Invalid type in extends clause: ZZ32' (`compiler_tests/XXXNumberTypeExtendRefusedCompiled.test:3`), as walk refuses it at load, 'Attempt to extend object type ZZ32' (F-379). Row 866, P-178's stated reason, is closed.
- P-37: "no declaration is added to the compiler's prelude", with the number types' exception. N changes seven headers and adds no declaration. G adds no `ImmutableArray` (fork G4).
- P-17 is left open, as the plan says: each number is still an object, now of the object's class over the payload class.
- **What of P-178 is not built.** The one library's seven under the selector, fork N4: their rows in `payloadObjects` and in `LibraryNames` (`NamingCzar.java:615-623`; `LibraryNames.java:23-32`), the carried table's entries keyed by the library (`NamingCzar.java:589-602`) and `runtimeSystem/Naming.java:298-302` (`compile-ladder/rung-number-payload-objects/REPORT.md`, "The one library's seven"). Beside them stand the sites that call `FZZ32.make` under the selector: G's varargs indices (`CodeGen.java:7904`) and the numeral sites (`:4708`), which pass an `FZZ32` where the one library's descriptors name `fortress/FortressLibrary$ZZ32` (G.worker.1; row 1062's notes). And P-178's aim, a bare JVM `int`, `long` or `double` in compiled code, which P-17 owns.

**W, one class name for each function expression (row 315 closed; rows 1083 and 1084 opened). `NamingCzar` and `CodeGen` only; fork W1 built as the plan says.**
- `gensymArrowClassName(desc, sp, taken)` gives the first function expression of a component at a span the span's name, and each later one `#2`, `#3` in the order met (`NamingCzar.java:971-977`). The set is one per component, made in `CodeGen`'s component constructor (`CodeGen.java:423`), copied into each child `CodeGen` (`:400`) and never iterated (`:4253-4256`); the two callers are `forFnExpr` (`:3954-3955`) and `localFunctionClosure` (`:4110-4111`), after which rung Q's casts follow. So the names do not depend on a hash order (row 996): W's report shows equal jars by name and by byte under `-XX:hashCode=0` (`compile-ladder/rung-closure-name-once/REPORT.md`, "4. The naming as built").
- The skeptic found two more desugarings that make a second function expression at a span: a binding `if`'s else part that is a reduction, and an arrow coercion's wrapper around a function-expression argument (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:380`; `compiler/desugarer/CoercionDesugarer.scala:184`). Both are covered by the same naming, with tests (`one_library_tests/OneLibraryConditionalReduction.fss`, `orSum`; `compiler_tests/ArrowCoercionFnExprCompiled`).
- No decision names the mechanism. The specification makes `x OP: y` sugar for `x OP (fn () => y)` (`Specification/advanced/subscripting.tex:90-91`) and names no class. Nothing on record is touched.

**G, a varargs parameter as one immutable array under the selector (row 624 closed under the selector; rows 1085 and 1086 opened; row 304 rewritten). `NamingCzar`, `OverloadSet`, `CodeGen` and two passages of the specification; forks G1, G4 and G5 built as the plan says, G2 narrower than its words, G3 as worded but with an effect that the plan did not picture.**
- G1: a domain's varargs part is one JVM parameter of the declared type `ImmutableArray[\T, ZZ32\]` of the library in use (`NamingCzar.varargsParamType`, `:1028-1034`; `varargsDomainAsArray`, `:1037-1045`; `paramType`, read at each of the four places that threw 'Can't compile VarArgs yet'). The array is made by `__immutableFactory1` and filled in order with `init` (`CodeGen.evalVarargsArgs` and `emitVarargsArray`, `:7775-7911`), as walk's `NonPrimitive.buildEnvFromParams` builds it. A single argument of tuple type passes its elements (the skeptic's defect fix, `2f4729d94b`), as the checker types it (`TypeAnalyzer.scala:328-329`).
- G2: where another declaration of the name takes as many arguments, the dispatch method holds the varargs declaration at that arity (`OverloadSet.VarargsExpansion`, `:196-243`; `CodeGen.partitionByArgCount`, `:8594-8621`). It expands only a top-level varargs function without static parameters (`OverloadSet.java:222`). A varargs method of a trait or object, or a generic varargs function, beside another declaration of its name with as many parameters, still stops the code generator with `OptionUnwrapException` (row 1086). G2's words, "for an overloaded name", are wider than this. No declaration of the one library has the two forms (`compile-ladder/rung-varargs/REPORT.md:101`).
- G3: a spread argument is not built. The parser keeps it, and walk and the checker drop it, so `count(1, ys...)` counts 1 where `ys` holds two, on both paths, with no message (row 1085; `tests/XXXVarargsSpreadArgument.fss`, an expected failure under walk only). The plan expected "an expected-failure test and a new row if the parser takes it", and both came. It did not picture a silent wrong answer.
- G4: against the prelude a varargs declaration is refused, the message naming the missing type: 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter' (`NamingCzar.java:1029-1032`; `compiler_tests/XXXVarargsMethodCodeGeneration.test:3`, whose key moved from `OptionUnwrapException` to that message).
- G5: the run test is an expected failure (`one_library_tests/XXXOneLibraryRunVarargs.test`), and the skeptic read one call's bytecode: '__immutableFactory1?...ZZ32,0,3...', then 'FZZ32.make', 'init' for the indices 0, 1 and 2 (`compile-ladder/rung-varargs/SKEPTIC.md`).
- The specification: the `functions.tex` callout (`Specification/basic/functions.tex:192-200`) and the `revival-varargs` Effect (`Specification/appendices/changes.tex:4046-4062`) by the rung, rows 1085 and 1086 named there by the gather; the `revival-supported` Effect (`changes.tex:6407-6412`) and the introduction's callout (`Specification/preliminaries/intro/nutshell.tex:110-111`) by the repair after the merged-diff review (section 7). `grep -rn '~624' Specification --include=*.tex` printed nothing after the repair (`compile-ladder/climb-batch-33b/REPAIR-review.md`, step 3).
- P-37 and F-86: met. The prelude gains no array type, and the code generator follows the checker's type for the parameter.

**R, a method of an imported api's trait found by its api (rows 942, 940 and 1061 closed; rows 1087 and 1088 opened). `STypesUtil.scala` and two lines of `CodeGen.java` beyond `methodsNamed`; fork R1 built.**
- The root, in two parts: `STypesUtil.gatherMethods` named a trait's own declarations by the declaration's header, which has no api, and now names them by the name that the trait table was asked for (`scala_src/useful/STypesUtil.scala:1666`, `tt_name`); the special arrow of a functional method named its trait by `declaringTrait`, and now takes the api from the self type (`nameBySelfType`, `:150-163`). Row 942 needs the arrow, row 1061 and the intersection the gathering, row 940 both (the worker's summary).
- Beyond `methodsNamed`, two calls read the body by `hasBodyInItsTrait`, which counts a body that an api's trait declares without `abstract` (`CodeGen.java:1167-1171`, its callers `:7205` in `emitBodyGivenBy` and `:7246` in `assumedReceiverCall`). So a call at an assumption of an imported api's trait runs the trait's body, also over an object's override (R.reserved.1, section 2).
- Fork R1: no compiled test, of 2,092 under the prelude and 4 under the selection, reaches the trait table's search by the prelude's names, with a positive control that reaches it with the base's `STypesUtil` (`compile-ladder/rung-api-method-index/REPORT.md`, "The trait table's search by the prelude's names"). The search stays.
- Rung I's caller: `IntersectionApiTraitCompiled` calls a method on a value typed by an intersection one of whose conjuncts is an imported api's trait, as the section read again before the launch asked (`compiler_tests/IntersectionApiTraitCompiled.test`).
- P-148, since the checker's Scala changed: the worker's pair was 88.7 s on the base at load 10.15 against 75.6 s on the change at load 0.85; the skeptic's pair was 63.9 s and 64.5 s, the tables equal (RECORD.md, R's points). No slowdown.
- The merge with N: on R's branch alone, `(k asif ZZ32) < (j asif ZZ32)` failed the JVM's verification, since R read the prelude's trait `ZZ32`'s body; with N's object, `assumedTrait` answers none (`CodeGen.java:7146-7152`). The gather's `compiler_tests/AsIfNumberOrderCompiled` guards the pair: 'true', 'PASS' on the merged tree.

**What the two paths still do differently after this run.** Each is a row; run 1's differences stand as its review gives them.
- The library: walk reads the one library; the compiled path reads the prelude unless `FORTRESS_LIBRARY=one` selects the one library, and a program so compiled does not run (row 1062).
- A built-in number type's name as a value, `x: Object = ZZ32`: walk answers the type's zero, 'ZZ32 0'; compiled, the code generator refuses it (row 1082).
- A `typecase` clause at a program's trait over a `ZZ32` selector: compiled, the checker refuses it as unreachable (row 1081); walk runs it and prints 'integer'.
- A function argument whose arrow type coerces to the parameter's: walk does not convert it, 'Unification error' (row 1083); compiled, it converts, but to an arrow type of no parameters the call dies (row 1084).
- At the prelude's `String`, `("ab" asif String) < ("cd" asif String)`: compiled, `false`, from the prelude's placeholder body (`LibraryBuiltin/CompilerBuiltin.fss:393`; R.reserved.2); walk was not run on it.
- Compiled only: a tuple expression as the argument of a parameter of type `Any` stops the code generator (row 1080); a varargs method or a generic varargs function beside a declaration of its name with as many parameters (row 1086); under the prelude, `RR64[n,n]` at a declared return type crashes the checker (row 1087); a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter (row 1088). Walk runs each but the generic varargs form, which it refuses at load (row 1086's notes).
- The same on both paths, wrongly: a spread argument is dropped (row 1085).
- Now the same, where the base differed: a program's object below `ZZ32` is refused on both paths (row 866 closed); a call at an assumption of an imported api's trait runs the trait's body on both paths (R.reserved.1); the dispatch beside a local trait of an api trait's simple name reaches the api trait's body on both paths (R.reserved.3).

### 2. The decisions that landed at a default

The record's section 3 gives run 2 forks N1 to N6, R1, W1 and G1 to G5, and B1 to B3 for both runs. The run's result holds twelve items for the curator, in six entries of `PLAN.md:899-904`, "Climb batch 33b, listed for his review". Those that change what a program does or accepts follow. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions").

**N.worker.1, N.skeptic.2 and N.reserved.2: a `typecase` clause refused as unreachable over a `ZZ32` selector (row 1081, CONTESTED).**
- Landed: no code of the rung refuses it. The team's checker does: "Redundancy check : signals an error if a type in a type clause exclusives the type of the selector", `if (self.analyzer.excludes (checkedType, checkLeft._1)==True)` then 'The typecase clause, ..., is unreachable.' (`scala_src/typechecker/impls/Misc.scala:330-334`; the team's lines, older than the history's cut at `5a68404fdf`). With `ZZ32` an object, it excludes a program's trait, so `typecase x of Shape => "shape" else => "integer" end` for `x: ZZ32` is refused (`compiler_tests/XXXTypecaseArmExcludedRefused.test:3`). On the base it compiled and printed 'integer'.
- Against the plan: N's reserved point "A program that ran and is now refused, beyond row 866's form" was reached and reported, as the plan asks. The record's section for him showed `object MyNum extends ZZ32` only; it did not show this form.
- The sources: the chapter types each clause's identifier at the intersection of the selector's type and the clause's type (`Specification/basic/expressions/typecase.tex:105-109`) and names no static error for an unreachable clause. Its note, by two of its designers, declines one for a clause after a more specific one: "We may want to use the feature for reasoning and debugging in a development environment. Some IDE may give a warning." (`:114-120`). That reason fits a clause that the selector's type excludes too. The team's checker refuses this case, with its rule in a comment. Among the peers, Java refuses an `instanceof` that cannot hold for a final class; Scala, Haskell and Rust warn.
- Consequential, by the rule's third clause: the team's specification note and the team's checker point different ways on what is unreachable, and the peers split. It can be undone: one check in the checker. It reached him the second way, landed and on his list (`PLAN.md:899`, default as landed). It holds nothing.

**N.skeptic.1, N.judge.1 and N.judge.2: what a built-in number type's name denotes as a value, and row 1082's status.**
- Landed: the code generator's wall (`CodeGen.java:7016-7020`). The base refused the program at the checker, and walk answers the type's zero. So no program that ran is refused, and the wall decides no value.
- The status: row 1082 is `NEGATIVE-VERIFIED`, home 2, whose `XXX` test's comment reads "A built-in number type named as a value compiles, since ZZ32 is a value object without value parameters, a singleton declaration" (`compiler_tests/XXXNumberTypeAsValueCompiled.fss:1`). The judge wrote: "Nothing on record settles which, so this is a decision I took." The singleton sentence (`Specification/basic/objects.tex:213-217`) speaks of a sole object, which a type of many values is not, and `Specification/basic-lib/basic-integers.tex:106` still calls `ZZ` "the trait". The team's two libraries made no number type a value: each was a trait.
- Consequential for the status's reading, by the third clause; the wall itself is not. It is on his list with three ways (`PLAN.md:900`), and the entry says that the status follows his answer. The judge named `CONTESTED` as the status under way (a). Until he answers, the status claims more than the record settles; the entry already tells him so, and nothing holds.

**N.reserved.1 and fork N6: the team's `Compiled6.bx` with a second message.**
- Landed as the plan says. The team's line kept its checked message and gained one. Before: `Compiled6.bx.fss:17:11-19:19: No such method ZZ32.foo.` and `File Compiled6.bx.fss has 1 error.`; after: the same first error, then `Compiled6.bx.fss:17:28-30: Objects can only extend traits.` and `File Compiled6.bx.fss has 2 errors.` (`compiler_tests/XXX6bx.test:13-19`). Its program's `object extends { ZZ32 }` is refused by P-178's answer.
- Not consequential: it follows his decision. It is the one line of the team's tests that the batch rewrote.

**R.reserved.1, R.reserved.2 and R.reserved.3: three calls that now reach another declaration.**
- R.reserved.1: at `Q asif R`, for an imported api's trait `R` whose `stamp` has a body and an object `Q` that overrides it, the compiled call ran `Q`'s body on the base ('pd') and runs `R`'s after ('sd'), as walk does and as the specification gives: an assumption "considers both the static and the dynamic type of the value ... to be the specified type" for the enclosing call (`Specification/basic/expressions/type-annotation.tex:45-48`; `CodeGen.java:7205`, `:7246`; `compiler_tests/AsIfApiTraitOverrideCompiled.test`). Not consequential. The same change turns one form that compiled into a refusal: a call at an assumption of an imported api's generic trait whose method's parameter has the trait's type parameter, the prelude's `Equality[\T\]` among them, ran the object's override on the base and now stops the code generator, 'Can't find the body that ... gives ...' (row 1088's notes). The entry of `PLAN.md:904` does not name it.
- R.reserved.2: `("ab" asif String) < ("cd" asif String)` printed true on the base, from `JavaString`'s body, and prints false after, from the prelude's `opr <(self, b: String): Boolean = false`, which the team marked "Needs to be replaced by generic definition once big operators work" (`LibraryBuiltin/CompilerBuiltin.fss:393`). The rule is the specification's, and P-37 leaves the prelude's text alone. Not consequential: no decision bends, and the prelude goes at the switch-over. But a compiled program's answer changed silently, and no ledger row or test records it (section 2 of Part 1).
- R.reserved.3: beside a local trait of an imported api trait's simple name, the compiled dispatch of `tag(O, L)` died on the base, 'StackOverflowError', and reaches the api trait's body after, as walk does (`STypesUtil.scala:148-163`; `compiler_tests/ApiTraitShadowedNameCompiled.test`). Not consequential.

**G.worker.1: the varargs index made as `FZZ32.make` under the selector.**
- Landed: `emitVarargsArray` pushes each index as `INVOKESTATIC FZZ32.make` (`CodeGen.java:7904`), the code generator's one conversion of a JVM `int` to a `ZZ32`, which the numeral sites use too (`:4708`). Under the selector `FZZ32.make` raises `LibraryNames`' `Error` (`LibraryNames.java:30-45`), and `init`'s descriptor names `fortress/FortressLibrary$ZZ32`. No program runs under the selector (row 1062), so nothing shows it.
- Against the plan: N2 and N4 as planned; the meeting of G and N is what the merged-diff review named as its second combination.
- Not consequential: a planning step. The rung of fork N4 lists these sites, since its test, the first program that runs on the one library, needs `println`, whose varargs reach them. The entry asks him "Should the rung of fork N4 ... list the varargs indices among its sites?"; that is the planner's step, not his decision.

**G.worker.2 and fork G3: a spread argument dropped on both paths (row 1085).**
- Landed: section 1, G3. The drop is in walk's `Evaluator.forTupleExpr` (`interpreter/evaluator/Evaluator.java:1471-1473`) and in the checker's `getArgList` (`scala_src/typechecker/impls/Functionals.scala:87`), so the code generator never meets one.
- Against the plan: as worded, but the form gives a wrong answer with no message on both paths, where the plan's "not built" pictured a failure. The specification gives the answer: the parameter takes the spread's elements ("Function Applications"), as its examples `f(1, [2 3]...)` show.
- Not consequential: the specification settles it and no decision bends. Its repair has no rung; Part 5 places it.

**N's contested fix and its ruling.** The judge upheld `eabbfc918b` (section 1, rung N): without it a program that the base refused compiles and dies when it runs, "the shape P-178 names as its own reason" (`JUDGE.md`). The ruling rests on the tree as read: `isSingletonObject` is false for a payload object (`CodeGen.java:4955`), and the singleton field is written only for a singleton. The fix touches no member that another rung of run 2 declares. Not consequential: it is the code generator's own wall form.

**The other forks, by what a program sees.**
- N1, N2, N3 and N5: as planned; programs see one name for each number type, so row 496's `ZZ32` spelling and row 566 run (`compiler_tests/GenericBesidePlainZZ32.test`, `ComprisesMeetGenericTrait.test`, which passes under both hash modes, fork N5). Row 698's overloading at `ZZ32` beside a program's trait compiles and runs (`OverloadZZ32BesideUserTraitCompiled.test`). Not consequential.
- W1: as planned; more programs compile, and only a second function expression's class name is new. Not consequential.
- G1, G2, G4 and G5: section 1. Not consequential.
- R1: as planned. Not consequential.
- B1 to B3: ordering only.

### 3. The measure: the declarations of the one library that the code generator refuses

**Before run 2: 13, in 4 kinds,** on `d3747846c1`'s code (F-34): 'Can't compile VarArgs yet' 9 (row 624), a closure class written twice 2 (row 315), `Stream`'s `WriteStream` 1 (row 624), and `__bigOperator2`'s cast of a type variable to a trait type 1 (row 1076). Run 2's record expected G to take 10 and W 2 (`CLIMB-BATCH-33.md`, section 2, "The measures").

**No stage of the batch measured it after run 2.** The gather left it to the record-landing workflow (RECORD.md, "FACTS entries"); the gate and the commit stage do not run it.

**What the rungs' own runs show.**
- Rung W on its code (`39f833b8e5`): 'refused declarations 12 | emitted (OK lines) 746', 3 kinds; the closure class's kind gone; `LexicographicOrder` emitted, `List` past the closure class and stopped at varargs (`compile-ladder/rung-closure-name-once/REPORT.md`, section 8).
- Rung G on its code (`888c20dd93`): 'refused declarations 3 | emitted (OK lines) 751', 2 kinds: the closure class 2 and `__bigOperator2` 1. The ten of varargs emitted, and nothing stops `Generator2` or `CatString` behind varargs: the planner's stand-in met its own gaps there (`compile-ladder/rung-varargs/REPORT.md`, "The measure").

**After run 2, measured on the landed tree after the landing** (a finding, by the coordinator's worker, not run again here): on `ba3c7c876d`'s code, 'refused declarations 1 | emitted (OK lines) 753 | component failures 0', 1 kind, `FortressLibrary`'s `__bigOperator2`, row 1076, its cast now at `CodeGen.java:7405` (`explorations/compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`, committed `3fbce96856`). G took its 10 and W its 2, as planned; nothing is newly refused; `measure-hacks.patch` applied whole. Emitted rose by 8, not 12: the four objects refused in the object pre-pass were already counted as emitted by the earlier file (the same file's last paragraph). The record's "2 or 3 after run 2" was 1: `Generator2` and `CatString` had no wall behind varargs.

**What the record should state:** F-34, "On the code of `ba3c7c876d`, the code generator refuses 1 declaration of the fourteen components, in 1 kind, `FortressLibrary`'s `__bigOperator2` (row 1076), and emits 753, with no component failure; on `d3747846c1` it refused 13 in 4 kinds", with the earlier figures and the caveats it keeps (the patch for row 874, a declaration counted at its first wall, the dispatch methods skipped, no emitted class run). `PLAN.md:68` the same. Row 1076 is the one wall of this kind that stands between the fourteen components and bytecode, beside row 874's wrappers that the patch removes.

### 4. The gate, the count and the distance

**The one gate is green,** as its agent returned it, on `main` at `f9acd7f6c2`: `testFast` 59 suites, 2,600 tests; `testSystem` four shards, 878 tests; `testSpecData` 130 tests; 0 failures in 3,608 tests in 64 suites (run 1's 3,565 in 64). `CompilerJUTest` 1,736 to 1,766, `OneLibraryJUTest` 3 to 14, the system shards 876 to 878; every other suite unchanged. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, the 18 microGPT components unchanged. The checker count 0 over 14 apis with `#crash none`, 'COUNT SAME   0, declared none'; the distance 0, 'DISTANCE SAME   0', every kind 0. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' (38 s and 32 s), on `50a0aac2e0`.

**After the gate.** The review's corrections `17b55bcc72` and the judge's `b3bfdf2526` change only paths under `explorations/`; the repair `50a0aac2e0` changes `Specification/appendices/changes.tex` and `Specification/preliminaries/intro/nutshell.tex`, which no gate stage reads. The commit stage wrote the line '# repair-ungated' for them, and the gate's tables stand.

**The comparisons.** `gate_compare` printed only the three rows that grew; `ladder_compare` and the microGPT phase diff printed nothing. Nothing hidden goes to the list. The one line of the team's tests rewritten to keep its checked value is `XXX6bx.test`'s (section 2, N.reserved.1).

**The stages' seconds.** The count stage about 65 s (63 s by the log's file times), against 78 s at run 1's gate; the distance stage 117 s (`FortressLibrary` 75 s), at a start load of 0.08 and then beside `testFast`, against 137 s (87 s). The commit stage wrote both into F-240.

**After the skeptics' fixes.** Two fixes changed code: N's `eabbfc918b`, its test seen failing on the worker's head ('Tests run: 1,  Failures: 1') and passing after ('OK (15 tests)'), and G's `2f4729d94b` ('NegativeArraySizeException: -1', then 'OK (8 tests)'), each in the maker's transcript (the merged-diff review's `fixesChecked`). The gate is their whole-suite check on the merged tree.

### 5. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.74M over 18 transcripts, in 4 h 33 min** (02:10:09 to 06:43:16 UTC; `batch-measures.py` gives the same 5.74M). Span 3 below counts it without the commit agent, whose transcript changed after the span: 5.58M. 16 results; the two launches without one are the restart's.

By role (writes, then share):
- Rung workers (5 launches for 4 rungs): 2.30M, 40.1 %. G 658K, N 581K, R 706K in two launches (346K killed, 360K after), W 356K.
- Skeptics (5 launches for 4 rungs): 1.60M, 27.8 %. G 391K, R 349K, W 347K, N 338K and 171K killed.
- The judge on N's contested fix: 214K, 3.7 %.
- Gather 471K, 8.2 %. Merged-diff review 464K, 8.1 %. The judge on the review 152K, 2.6 %, and its repair 165K, 2.9 %. Commit 164K, 2.8 %. Gate 149K, 2.6 %. The disk check 65K, 1.1 %.
- By rung, all its roles: N 1.30M (with its judge and its killed skeptic), R 1.06M, G 1.05M, W 0.70M; per landed rung, all roles: 1.43M.

**Against the record:** "Run 2: about 4.6 million, 5.7 million with the reserve. The range is 3.9 to 6.7 million. About 4 hours and a quarter, 5 hours with the reserve. ... N writes about 1.0 million with its skeptic, G about 0.95 million, R about 0.7 million, W about 0.7 million, and the fixed roles about 1.3 million. The reserve is about 1.0 million and 45 minutes" (`CLIMB-BATCH-33.md`, section 2, "Cost and time"). **5.74M: 24 % over the estimate without the reserve, 1 % over it with the reserve, inside the range; 4 h 32 min to the commit stage's last commit, against about 4 h 15 and 5 h with the reserve.** By role:
- **N: 0.92M against 1.0M (−8 %),** the worker 581K against 0.59M; 1.09M with the killed skeptic.
- **G: 1.05M against 0.95M (+10 %),** the worker 658K against 0.55M, which built six times while it worked out the convention.
- **R: 1.06M against 0.7M (+51 %).** The restart made the difference: its second worker launch wrote 212K re-reading before its first new run (below). Without it, R wrote about 0.84M, +20 %.
- **W: 0.70M against 0.7M.**
- **The fixed roles: 1.31M against 1.3M** (gather 471K against 0.51M, review 464K against 0.46M, gate 149K against 0.14M, commit 164K against 0.13M, disk 65K against 0.07M). Run 1's figures on the same tier held, as its review's process finding 1 proposed.
- **The reserve: 0.53M of about 1.04M spent:** one ruling on a rung with no repair (214K), one ruling on the review with its repair (317K), no second gate.
- **The restart: about 0.38M, outside every role's estimate.**
- **The minutes.** The rung stage took 3 h 14 (02:10 to 05:24), the restart's 2 minutes down and R's 8½ minutes of re-reading among them, against about 3 h; the gather 41 minutes, the review 22 beside the gate's 22, the judge and the repair 10, the commit stage 5.

**What the restart cost.** The two killed launches wrote 0.52M: R's first worker 346K (44 min) and N's first skeptic 171K (2 min). R's first launch had committed `838c729304` and written its logs; its second launch "reran nothing whose log was whole" (its summary), and wrote 212K in its first 8½ minutes (03:56:03 to 04:04:29) reading the skill, its brief, its briefing, the first launch's transcript and its logs, before its first new run. N's first skeptic had read its briefing into slice files, which the second read back; the second's first call wrote 0K on a warm cache. So the restart cost about 0.38M (171K + 212K) and about 11 minutes. Without it, the run would have written about 5.36M, 16 % over the estimate without the reserve.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed.
- **Span 1, run 1's landing work,** from its commit stage's last commit `d3747846c1` (22:36:00) to the end of its record-landing workflow, run `wf_d55ec738-a36`, whose journal was last written at 01:43:47; the boundary is 01:43:48. Over that run's folder and its headless writers (the two in `-home-user-fortress-landing-33`, and `7abc0ddf` and `be89447a` in the project's folder): `spend.py` printed 4.80M from 1794954960 and 0.00M from 1794966228. **4.80M over 32 transcripts.**
  - By part: the record (23:12 to 00:17) 1.91M, its two headless record writers 563K among it; the orientation update (00:17 to 01:10) 1.68M, of which 99K in the two launches that the VM restart of 00:57 cut (a reread, 13K, and quiz reader 2, 86K), run again after it (159K and 132K); the skill step (01:10 to 01:23) 0.43M; the page of `fortress-repo` changes (01:23 to 01:42) 0.56M; the push and the revival page (01:42 to 01:43:47) 0.23M. Of the 32, eight ran on Sonnet.
  - In the span's time but outside its folders: run 1's post-batch review 549K (22:40 to 23:11), run 2's base build 61K (22:40 to 22:45), the batch script's four fixes 347K (22:45 to 23:05), F-34's measure on run 1's tree 83K (23:12 to 23:19), the arrays page's compiled half 863K (22:19 to 23:02, begun before the span); the coordinating session's own writes, 295K over 73 messages (`mainw.py`).
- **Span 2, the preparation,** from 01:43:48 to the launch (02:10:09). Over the session's Agent-tool workers' folder and the project's folder of headless runs: `spend.py` printed 1.10M from 1794966228 and 0.41M from 1794967809; the 0.41M is this review and the measure worker, which changed after the span. **0.69M over 3 transcripts, and the coordinating session's own 266K over 43 messages, its compaction of 01:57:50 among them: 0.96M.**
  - Record writer A, F-34 on run 1's tree and rows 1076 to 1079: 215K (01:45 to 01:56). Record writer B, run 2's sections read again on run 1's landed tree: 375K (01:45 to 02:04). The manifest worker: 103K (02:05 to 02:09).
- **Span 3, the run,** 02:10:09 to 06:41:55, over the run's folder: `spend.py` printed 5.74M from 1794967809 and 0.16M from 1794984115. **5.58M over 17 transcripts,** the killed part before 03:54 included (0.52M). The commit agent, 164K, last changed at 06:43:16 and counts after the span. The coordinating session wrote 23K during the run, over 29 messages, its check-ins and the resume. No other worker ran in the span's time.

So run 1's landing cost 4.80M in its span, against climb batch 31b's 4.20M, and this run's preparation 0.96M, against run 1's 3.98M: run 2 was planned in run 1's record, and only its sections were read again.

**The briefing's use.**
- **12 of 12 briefed launches read their briefing, 100 %, and each read every part. None read it in its first turn.** The briefed launches are the five worker launches (full briefing), the five skeptic launches, N's judge and the review's repair (the slice of checks). The disk check, the gather, the review, its judge, the gate and the commit stage have none by design.
- When: N's judge at call 8, 28 s after its start; skeptic R at call 8, 34 s; N's first skeptic at call 8, 36 s; the repair at call 11, 45 s; skeptic W at call 8, 46 s; N's second skeptic at call 12, 73 s, from its first launch's slice files; skeptic G at call 19, 85 s; rung W at call 18, 95 s; rung N at call 21, 108 s, which saved its four parts to files and read each; rung G at call 24, 120 s; R's first launch at call 20, 130 s; R's second at call 22, 153 s.
- Its results came to about 0.21M tokens, 3.6 % of writes, at 0.40 tokens a character plus 110 a call (`brief2.py`, which adds the reads of saved briefing files to `brief.py`'s count).
- Against the batches before (briefed, read, at calls, seconds, share): B26 8, 8, 5 to 13, 21 to 89, 5.2 %; B27 15 of 19, 15, 4 to 16, 16 to 78, 6.2 %; B28 15, 15, 3 to 21, 14 to 95, 3.1 %; B29 15, 15, 4 to 20, 15 to 105, about 3.6 %; B29b 4, 4, 12 to 21, 41 to 97, 2.7 %; B30 6, 6, 5 to 14, 23 to 53, 4.9 %; B32 16, 15, 4 to 17, 19 to 78, 5.0 %; B31 run 1 16, 16, 5 to 16, 18 to 73, 5.0 %; B31 run 2 6, 6, 7 to 22, 34 to 73, 3.0 %; B33 run 1 12, 12, 8 to 22, 27 to 82, 2.6 %; B33 run 2 12, 12, 8 to 24, 28 to 153, 3.6 %.

**Other measures.**
- First calls: 995K (17.3 %), 11 cold. Cache refills: 0. Refusal cycles: 1 rung, N's judge, 214K. Rulings and repairs on the merged tree: 317K, no second gate.
- The skill's load, by a rough count: about 954K, 17 %. `revival-changes.md` was read whole by 17 of the 18 launches, all but the disk check. `sources.md` was not read.
- Error results: 25.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `aac4bb75`, 65K, 0.2 min; rung N `a9751652`, 581K, 59.1; rung G `a79df77e`, 658K, 60.6; rung R `a2d90f81`, 346K, 44.4, killed; rung W `a49f11cb`, 356K, 40.9; skeptic N `ad799ace`, 171K, 1.9, killed; rung R `a4abb959`, 360K, 32.0; skeptic N `a69b1f64`, 338K, 26.0; skeptic G `ad31412c`, 391K, 31.5; skeptic W `a77537fd`, 347K, 29.1; judge N `ab7f30df`, 214K, 7.3; skeptic R `a8f4b6d2`, 349K, 26.9; gather `aa1a55b9`, 471K, 41.1; gate `ac2b753e`, 149K, 22.1; review `a642d6dc`, 464K, 22.4; judge of the review `a27af700`, 152K, 5.1; repair `a2614791`, 165K, 5.0; commit `ad05970f`, 164K, 5.3.

### 6. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No agent ran a whole suite twice on one code state.** N ran `ant testFast` and `ant testSystem` once each, on `b9aa895753`; its next commit changed a test only. W, G and R ran `testFast` once each. G started one more `testFast` at 02:56:20 and stopped it within a minute (it killed the process at call 234), since it found a change of code to make (`4526151e00`); its one whole run is on the final code. No skeptic ran a whole suite. The gate ran each suite once.
- **The count and the distance stages:** N and R ran each once on their final code; R also ran the count stage on the base build for P-148's pair, and R's skeptic ran it on the base build and on the worker's head, the one planned exception (`references/batch.md`, "The roles"). So the base build's count ran twice, once for each role, as in run 1. The gate ran each stage once.
- **The measure** ran twice in the run, W's and G's, each on its own code; the coordinator's worker ran it once after the landing, on `ba3c7c876d`.
- **The specification was built three times on two texts:** by the gather on G's text; by the repair on the repaired text; and by the commit stage on the same repaired text, since the repair removed its build's files and kept no PDF (`REPAIR-review.md`, step 4; the commit stage's summary, "The PDF"). The last build is a repeat, about 65 s.
- **The one library's track ran twice on one code state:** the gather's `ant testOneLibrary` on `90ee716db0`'s code ('Tests run: 14', 23 s), and the gate's `testFast` on `f9acd7f6c2`, whose code is the same. The gather's runs of the batch's own tests are the manual's check before the gate, as in run 1.
- **The 52 demos ran once,** at the gather. **The microGPT quick pair ran once,** at the commit stage.

### 7. Three events

**The VM restart at 03:54 UTC and the resume at 03:56. Two agents ran twice; each second launch found the first's work and said so; nothing was committed twice or lost.**
- The journal holds one `launched` line, 18 `started` lines and 16 `result` lines. The restart killed R's first worker (03:09:29 to 03:53:51) and N's first skeptic (03:51:55 to 03:53:51); both were started again with the same keys, R's at 03:56:03 and N's skeptic at 03:56:06. The resume's log: 'Resume: 4 of the journal's 4 saved results served from cache. Call 7 and every call after it run fresh'. The four from the cache are the disk check and the workers of N, G and W, whose results came before the restart.
- R's second launch read the branch's log, the logs in its `tmp/` and the first launch's transcript (calls 3 to 12), and its result says: "Two launches worked rung R. The first committed 838c729304 and ran its build, testFast, both stages, the checker's timing and profile, the shadow-patch check and the ladder subset. A machine restart ended it while it was starting the run that looks for the trait table's search. The second launch reran nothing whose log was whole."
- N's second skeptic looked for the first's transcript (call 5) and read its slice files (calls 12 to 14), and its summary says: "Two launches of this role worked the rung. The first stopped after reading, when the machine restarted, and committed nothing."
- Commits: `wip/rung-api-method-index` holds the first launch's `838c729304` (03:37:50) and the second's `0f7cc2729e` (04:16:35) and `ec5fba4c1f` (04:25:24), each once; `wip/rung-number-payload-objects` holds no commit between 03:05:31 and 04:17:23. The disk was not rolled back: the first launches' files were found. Lost: N's first skeptic's 171K of reading, and the start of R's instrumented search run, which the second launch ran with a positive control.
- The killed launch's task output, `wskkyn4aa.output`, is empty; the run's whole result is the resumed task's, `w9folkhdy.output`.
- The coordinator committed its boot note `83e464cf63` at 03:56:16, before the gather, which started from it.

**No commit other than the batch's fell between the gather's start and the batch's push.**
- The gather's first record is at 05:24:14 and its first commit, N's `75f9f2fbf4`, at 05:32:06; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `83e464cf63` (`RECORD.md:7`). From then to `ba3c7c876d` (06:41:55), `git log --first-parent c799851472..ba3c7c876d` holds the batch's ten commits and, before them, only the coordinator's two boot notes, `cf2a3df367` (02:10:51) and `83e464cf63` (03:56:16). The commit stage pushed at 06:42:08: '83e464cf63..ba3c7c876d  main -> main', and the same for the two other refs. The coordinator's next commit on `main` is `ec6f960f60` at 06:46:47. The transcript backup's snapshots of 05:56:53 and 06:42:00 are on `transcripts-blinded`, not `main`.
- So the rule of `references/batch.md`, "While it runs", held.
- One departure at the push: the commit stage pushed the three refs one at a time, with retries, as the batch script's step 3 tells it (`explorations/coordinator/climb-batch-workflow.js:1599`), where `fortress-repo`'s committing part gives one `git push --atomic` of the three. The third push printed 'fatal: expected 'acknowledgments', received 'packfile'' and 'push negotiation failed; proceeding anyway', and still updated `blinded-fable` (checked with `git ls-remote`, its summary). All three refs are at `ba3c7c876d`; with one push failed, they would have parted (process finding 3).

**No agent received text from outside its brief.**
- His go came at about 17:13 UTC on 17 November, before run 1. During the run (02:10 to 06:43) he sent no message; the coordinating session's incoming messages were its six check-ins' notices (02:56, 03:41, 04:26, 05:11, 05:56, 06:41) and the run's end.
- The first record of each of the 18 transcripts is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill; R's second launch also loaded `cloud-container` itself.
- Beside them the harness attached its standing material (the environment, the project's instructions, the list of skills, the date, the attribution reminder, the session's context, the connectors' instructions), the shared task list, and one notice to the review's judge that the file it wrote changed on disk. The task list carried rung N's to-dos (tasks 38 to 42), R's second launch's (43) and the gather's (44 to 49) to the agents that ran beside or after them (`taskrem.py`). No file was attached that no brief asks for.
- No transcript holds his words of the go ("when these probes come back", "you have a go for the batch", "so that if possible they can join"), or the markers '<agent-message', 'Another Claude session', 'sent a message while you were working', 'user request]' or 'relays, verbatim'. The curator's name stands in seven transcripts only where a file of the record or a tool's comment names him, as the heading "Pavol's answers" of `PLAN.md`.

## Part 1. Conformance

No departure from a decision of the curator's landed, and no finding of this review would change one. Two defaults that landed are consequential by the rule's third clause, rows 1081 and 1082 (section 2); both are on his list with their defaults, both can be undone, and neither holds anything. So this review gives no options.

### Findings for the record, with no decision of his changed

1. **R.reserved.2, the prelude `String`'s placeholder at an assumption, changed a compiled program's answer and has no row or test.** `("ab" asif String) < ("cd" asif String)` was `true` and is `false` (section 2). It follows the specification's rule on the prelude's own text, which P-37 does not fix. Owed: a ledger row of the prelude's limit, class `implementation gap (prelude)`, reproducer the skeptic's `SkPreS1` as a compiled `XXX` test, and a trap line of `fortress-repo`'s `compiler.md` (Part 3).
2. **Rung R turned a form that compiled into a code-generator stop,** a call at an assumption of an imported api's generic trait whose method's parameter has the trait's type parameter, the prelude's `Equality[\T\]` among them (row 1088's notes). It ran the object's override before, a wrong answer by the specification. Row 1088 holds it; `PLAN.md:904` does not name it. A line in that entry, "told", is owed.
3. **A spread argument gives a wrong answer with no message on both paths** (row 1085). The batch after should either build it in the two shared places (walk's `forTupleExpr`, the checker's `getArgList`) or refuse it statically until built. No line of the libraries writes one.
4. **Row 1082's status claims that the specification settles a value, where the judge wrote that nothing on record does** (section 2). The entry of `PLAN.md:900` tells him; nothing else is owed until he answers.
5. **The section for him showed one form that N refuses and not the second,** a `typecase` clause at a program's trait over a number (row 1081), as run 1's section showed `Int =>` and not the team's bare binder (run 1's review, process finding 6). The rung reported it and the gather filed it, so it reached him.
6. **The plan's words were wider or narrower than what landed in five places:**
   - fork G2's "for an overloaded name", built for a top-level function without static parameters only (row 1086);
   - fork G3's picture of an unbuilt form as a failure, where it is a silent drop (row 1085);
   - section 2's "2 or 3 after run 2", 1 on the landed tree, since `Generator2` and `CatString` had no wall behind varargs;
   - N's section's Files, which did not name `forVarRef`, a site that names an object's class, as its step 4 asked the rung to read every such site (the skeptic found it);
   - R's section's Files, "`methodsNamed` only", where R edited `emitBodyGivenBy` and `assumedReceiverCall` too.
7. **G's report missed two sentences of the specification that G made false,** `changes.tex:6407-6409` and `nutshell.tex:110-111`; the merged-diff review found the first, its judge the second, and the repair changed both. A rung that closes a row can find such a sentence with the judge's grep, `grep -rn '~<row>' Specification --include=*.tex` (process finding 5).
8. **The skeptics' fixes were right:** two defects of a change (N's singleton field, G's tuple argument), seven tests added or corrected, and three records corrected; one fix contested, upheld.

### Corrections owed in the record

- **POSITIONS:**
  - P-33 (`POSITIONS.md:30`), "the compile command selects the one library beside the prelude, one build serving both by a second set of the run time's value classes (F-353)". After both runs the selector serves both libraries from one build with one set of run-time classes (F-381), and the seven number types are written over payload classes that serve under either library (F-388; fork N4 for the one library's rows). For the other carried types, the way is review-queue item 521's question, whose default is files of their own. The words should state: "the compile command selects the one library beside the prelude, one build serving both (F-381): the seven number types by the run time's payload classes, over which the code generator writes each library's number objects (F-388), and each other carried type by its own rung (review-queue item 521)". His decision, the slice first, is unchanged. The change is told to him with the old and the new words, as the record says (`CLIMB-BATCH-33.md`, "For the record-landing workflow").
  - P-178 (`POSITIONS.md:107`), its "Why": "and the compiler prelude's open trait lets a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866, such a program compiles and dies when it runs)". The reason held when he decided; the tree no longer does it (row 866 closed, F-388). In the present form of POSITIONS: "and an open trait lets a program's object extend `ZZ32`, which a bare `int` cannot hold: on the prelude's trait form such a program compiled and died when it ran (row 866)". The record calls P-178 and P-37 true (`CLIMB-BATCH-33.md`, "For the record-landing workflow"); this clause is the exception.
- **FACTS, false or short, and not reworded by the gather or the review:**
  - F-34 (`FACTS.md:38`): the measure on `ba3c7c876d` (section 3).
  - F-136 (`FACTS.md:224`): "They die on an arm's static parameter left unrewritten, or on `ZZ32`, which the run time spells `…runtimeValues|FZZ32` and static code `fortress|CompilerBuiltin%ZZ32`." Since N, one name serves both, and row 496's `ZZ32` form runs (`compiler_tests/GenericBesidePlainZZ32.test`); row 496 stands for the `grab` form at a program's object.
  - F-352 (`FACTS.md:170`): "rows 624 and 315 stand", and rows 866 and 942 among the walls that only the switch shows; each is closed. Left by the record to the record-landing workflow, with F-353.
  - F-353 (`FACTS.md:171`): the second set, which the numbers no longer need. Left to the record-landing workflow.
- **PLAN and the review queue:** Part 4.
- **The ledger:** rows 1080 to 1088 filed, 995, 496, 1062, 1083 and 304 rewritten; owed, the row of finding 1 and the homes of Part 4.

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 33b

(B26; B27; B28; B29; B29b; B30; B32; B31 run 1; B31 run 2; B33 run 1; B33 run 2.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M; 5.00M; 5.08M; 3.93M; 5.57M; 5.74M.
- The tier: B31 run 1 ran on Fable, B31 run 2 and both runs of B33 on Opus; the earlier batches' reviews give theirs.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0; 2, 0.59M written by them; 2, 0.24M written by them; 0; 0; 2, 0.52M written by them.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M; 0.71M; 0.85M; 1.31M; 0.93M; 1.43M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold; 0.93M, 7 cold; 1.22M, 12 cold; 0.65M, 7 cold; 0.80M, 7 cold; 0.995M, 11 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0; 0; 1, 159K; 0; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0; 0; 0; 0; 0; 1 rung, 214K.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0; 0; 660K, and a second gate of 114K; 0; 0; 317K.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2); 18 (5); 10 (1); 10 (2); 20 (1); 12 (2).
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s; about 95 s; about 75 s; about 85 s; 78 s; about 65 s, each by the log's file times.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s; 165 s; 136 s and 143 s; 150 s; 137 s; 117 s, the last five beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %; about 18 %; about 20 %; about 14 %; about 18 %; about 17 %, the last five by a rougher count.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %; 5.0 %; 5.0 %; 3.0 %; 2.6 %; 3.6 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The estimate held by role where nothing broke.** W, N and the fixed roles came within 8 %, G within 10 %; R's 51 % is the restart's. Run 1's process finding 1, each role priced from the last run on the same tier, worked. Proposed (mine): keep it; price a rung of N's or G's size at 0.9 to 1.1M with its skeptic, and leave a restart outside the estimate, as its cause is the platform's.
2. **The measure had an owner this time:** the coordinator's worker built the landed tree's base build and took F-34's measure twelve minutes after the push (`3fbce96856`). Run 1's process finding 2 is answered by the coordinator's routing. Proposed (mine): the manual's routing names it as a step, so that it does not depend on the brief of the day.
3. **The batch script pushes the three refs one at a time** (`climb-batch-workflow.js:1599`), against `fortress-repo`'s `git push --atomic` (section 7). Proposed (mine): the script gives the skill's one atomic command, and its retry repeats that command whole.
4. **A rung's timing was taken beside another rung's work again:** R's base pair at load 10.15 (88.7 s against 75.6 s); the skeptic's pair settled it (63.9 s and 64.5 s). Run 1's process finding 4 recurred. Proposed (mine), as before: the skeptic's pair is the P-148 timing of record.
5. **A rung's report missed sentences of the specification that its change made false outside its section's passage** (Part 1, finding 7). Proposed (mine): each section's "Specification" step adds the grep for each row that the rung closes, `grep -rn '~<row>' Specification --include=*.tex`, and the rung lists each line it prints.
6. **The specification was built twice on one text,** since the repair cleans its build and keeps no PDF (section 6). Proposed (mine): the repair copies its PDF to `tmp/`, as the gather does, and the commit stage reuses it when no file under `Specification/` changed after.
7. **A fork that leaves a form unbuilt pictured a failure where the form gives a wrong answer** (G3, row 1085). Proposed (mine): the check before the launch asks of each "not built" fork what a program that writes the form gets, a refusal, a failure or a wrong answer, and a wrong answer becomes a refusal in the rung or an ask.
8. **The restart cost about 0.38M, most of it in R's second launch's re-reading.** The second launches did what the batch's intro asks: each read its first launch's work and said so. No change proposed: a cold launch must read its skill and its briefing again.
9. **Of run 1's process findings:** 1 (the tier's figures) held (finding 1 here); 2 (the measure's owner) answered (finding 2 here); 3 (a tool fix after the base) did not arise; 4 (timing beside a rung) recurred (finding 4 here); 5 (reserved points to the list) worked: the gather filed N.reserved.1 and .2 and R.reserved.1 to .3 in `PLAN.md`'s group; 6 (the section for him names each form that ends) recurred once (Part 1, finding 5); 7 (a landing's span end) arose as a tail of one commit, the coordinator's quiz cases `ad505d77e6` at 01:44:29, in span 2.

### Misses, by kind

Numbered on from `batch-33-review.md`'s 1293.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1294, run 1's review's Part 5 corrections of run 2's sections, applied in `cfdd14dafc` and `7875d559d2` (R's analyzer from rung V and rung I's caller, G's `forLetFn` member, the moved lines of N, G and R, N's names table by the selector's name, the estimate re-priced).
- **The planner's text wrong, caught before landing:**
  - 1295, fork G2's width (G's worker, `4526151e00`; G's skeptic, `2039463906`; row 1086);
  - 1296, fork G3's picture of a failure (G; row 1085);
  - 1297, section 2's walls behind varargs at `Generator2` and `CatString` (G's measure);
  - 1298, N's Files without `forVarRef` (N's skeptic);
  - 1299, W's two nodes, where four desugarings make a second function expression at a span (W's skeptic, `e9ba4a5eae`, `c5eaf263c8`);
  - 1300, R's Files, "`methodsNamed` only" (R).
- **A defect of a change, caught before landing:** 1301, N's payload object named as a value, which compiled and died, 'NoSuchFieldError' (N's skeptic, `eabbfc918b`, contested, upheld); 1302, G's single tuple argument, 'NegativeArraySizeException: -1' (G's skeptic, `2f4729d94b`); 1303, R alone at the prelude's `ZZ32` under an assumption, 'VerifyError', removed by N's merge and guarded by the gather (`AsIfNumberOrderCompiled`).
- **A case of a change with no test, caught:** 1304, R's base defect beside a local trait of an api trait's name (R's skeptic, `7d3dddf4d4`); 1305, R's generic trait at an assumption (R's skeptic, `efaf63f027`; row 1088); 1306, G's overloaded method and generic forms (G's skeptic, `2039463906`; row 1086).
- **A defect of the tree found and filed, not the batch's:** 1307 to 1311, rows 1080 (N), 1083 and 1084 (W's skeptic), 1087 (R), and 1081, the team's checker newly reached (N).
- **A report that said what was not so:** 1312, N's citation of a `basic-floats.tex` that does not exist and five moved lines (N's skeptic); 1313, W's citations of the probe's paragraph and the sugar sentence (W's skeptic); 1314, G's FACTS hand-over (G's skeptic); 1315, R's reserved point naming another dispatch method (R's skeptic); 1316, the skeptic's "as on the base" for N's refusal (N's judge); 1317, the gather's remap of citations written as a member and a bare line, and one base line unmarked (the review); 1318, F-315, F-320, F-301 and F-302, made false and listed by no rung (the review).
- **Sentences made wrong, caught:** 1319, `changes.tex:6407-6409` (the review) and `nutshell.tex:110-111` (the review's judge); 1320, the placeholders NEW-G-1 and NEW-G-2 in `changes.tex:4057`, `:4060` (the gather).
- **Process:** 1321, R's worker's timing pair under load (R's skeptic retook it).

Found by this review:
- 1322, R.reserved.2's changed answer with no row and no test (Part 1, finding 1);
- 1323, R's form that compiled and now stops, not named in the reserved point's entry (Part 1, finding 2);
- 1324, F-136's two spellings of `ZZ32`, false since N, not reworded (Part 1);
- 1325, P-178's "Why" in the present tense on a defect now closed (Part 1);
- 1326, six new rows without a home, run 2's thirteen forks without a queue item, and two queue items made stale (Part 4);
- 1327, the commit stage's push of the three refs one at a time (section 7);
- 1328, the specification built twice on one text (section 6);
- 1329, sentences of the skill beyond the record's lists (Part 3).

**Against the earlier notes.** 28 misses were found before the launch or inside the batch (1294 to 1321), 5 of them defects of the tree that the batch did not make, against run 1's 35 for six rungs and climb batch 31b's 27 for three. No departure from a decision of his landed. Two defaults landed that are consequential by the rule, each on his list with its default.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false, read on `main` at `478ad94c8b`; the batch changed no file under `.claude/`. The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-33b/RECORD.md`, "Revival changes, for the skill writer": N's and G's; W's and R's are "none".

**False, on the record's lists, checked:**
1. `references/revival-changes.md:89`: "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)." The prelude declares the seven as value objects (F-388); the compile refuses such an object, 'Invalid type in extends clause: ZZ32'. The record still calling the types "the tower" holds.
2. `SKILL.md:94`: "`RR64` is the class `FRR64`." An `RR64` value's class is the object's class `fortress.CompilerBuiltin$RR64`, which extends the payload class `FRR64`; descriptors name `FRR64` (F-388).
3. `references/compiler.md:21`: "the compiled `compiler/runtimeValues/` (`FZZ32`, `FRR64`)". These are payload classes now, abstract over `FValue`, under the code generator's object classes.
4. `references/compiler.md:34`: "a brief may ask to declare each built-in number type as one `value object`, the form that both libraries are to take". Done for the prelude (F-388); the one library's seven wait for their rows (fork N4).
5. `references/compiler.md`, "What the compiled path cannot compile yet" (`:36-47`), short: a built-in number type named as a value, 'Can't compile the number type ZZ32 as a value yet' (row 1082); and G's sentence, that against the prelude a varargs declaration is refused, 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, ...', and under the selector it compiles, except a varargs method or a generic varargs function beside a declaration of its name with as many parameters (row 1086).

**False or short, on no list:**
- `references/compiler.md:50-55`, the type assumption's refused forms "(ledger row 818)": a fourth, a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter, 'Can't find the body that ... gives ...' (row 1088). And at an assumption of an imported api's trait the trait's body runs, also over an object's override (F-391).
- `references/compiler.md`, the traps (`:103-140`), short of the run's rows:
  - at an assumption of the prelude's `String`, its placeholder comparisons answer `false`: `("ab" asif String) < ("cd" asif String)` is `false` (`LibraryBuiltin/CompilerBuiltin.fss:393-398`; Part 1, finding 1);
  - beside `:120`, row 963's line: a `typecase` clause at a type that the selector's static type excludes is refused as unreachable, as a program's trait over a `ZZ32` (row 1081);
  - a tuple expression as the argument of a parameter of type `Any` stops the code generator, 'Error trying to close method scope'; bind it first, `p: Any = (k, k)` (row 1080);
  - a function argument coerced to an arrow type of no parameters dies when called (row 1084);
  - a spread argument `f(1, ys...)` is dropped on both paths; pass the elements (row 1085);
  - under the prelude, `RR64[n,n]` at a declared return type crashes the checker, 'Not in the trait table: CompilerLibrary.Array2' (row 1087).
- `references/revival-changes.md:103`: "Walk converts a value other than a numeral at a call ...". Short: walk does not convert a function argument by an arrow coercion, 'Unification error' (row 1083; F-128).
- `references/revival-changes.md:89`, its next sentences on walk: "Walk refuses an object below one of the seven at load ... The compiler's prelude declares no `QQ` ...". With item 1, both paths refuse such an object, so the sentence on walk can state both.

**Sentences that hold, met by the batch:** `SKILL.md:90-92` on the class loader as code that the revival changes; `references/tests-writing.md:52` on `one_library_tests/` ("a program compiled so does not run yet"); `references/tests-running.md:14` ("about 2,560 tests"), now 2,600; `references/compiler.md:120` on row 963, unchanged.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home in `PLAN.md`, none yet in the review queue.** The twelve ids (N.worker.1, N.skeptic.1 and .2, N.judge.1 and .2, N.reserved.1 and .2, G.worker.1 and .2, R.reserved.1 to .3) are the six entries of `PLAN.md:899-904`, "Climb batch 33b, listed for his review", made in the rungs' commits. The merged-diff review confirmed each (its `curatorItems`). Owed: their items in the queue's group for climb batch 33, as 590 to 597 are run 1's, and the line of Part 1, finding 2, in `PLAN.md:904`.

**Open rows.**
- With a home: 1081 (`PLAN.md:899`), 1082 (`:900`), 1085 (`:903`); 995 (`:70`), 496 (`:271`, `:793`), 1062 (`:9`, `:55`, `:70`, `:902`; queue 517); 1076 (`CLIMB-BATCH-33.md`'s list for the batch after, item 2, which `PLAN.md:55` names).
- **Six have no line of their own in `PLAN.md` or `review-queue.md`:** 1080, 1083, 1084, 1086, 1087 and 1088. Owed (the homes are mine):
  - row 1080, a tuple argument at a parameter of type `Any`: the list for the batch after, item 5, beside rows 1054 to 1056, the tuple forms;
  - rows 1083 and 1084, the arrow coercion of a function argument, walk's and the compiled path's: a parked line with walk's conversions (F-128, row 395), the compiled half with item 5;
  - row 1086, the overloaded varargs method and generic: item 3, with varargs' run tests; no library line writes the form;
  - row 1087, a prelude-only crash of the checker: a parked line with the prelude's limits, which go at the switch-over (P-37);
  - row 1088, an assumption at a generic trait's method: item 5, with row 818, the assumption's forms.
- Row 1085 has `PLAN.md:903`, but its repair has no rung: item 5, or a line of its own if he wants it refused before it is built (Part 1, finding 3).

**Record defaults.** The record gives its forks to the queue as new items after the landing (`CLIMB-BATCH-33.md`, "After the landing": "this record's 28 forks as new items"). Item 595 holds run 1's that no other item holds. **Run 2's forks, N1 to N6, R1, W1 and G1 to G5, have no item.** Owed: one item, as 595 is, each default as landed and its line of section 2 here; N4 with G.worker.1, G2 with row 1086, G3 with row 1085.

**PLAN lines that the batch built or made stale.** The record lists phase 4's F-34 line, the merge's line, the line on the walls that only the switch shows, "Next" and the batch's own line (`CLIMB-BATCH-33.md`, "After the landing"), and RECORD.md the F-34 line (`RECORD.md`, "Left for the coordinator and the skill writer"). Each is checked:
- "Next" (`PLAN.md:13`): run 1's landing and run 2 waiting; now run 2 landed at `ba3c7c876d` and the batch after waits for its plan;
- phase 4's line of climb batch 33 (`:55`): its run 2 landed; the list for the batch after as Part 5 gives it;
- F-34's line (`:68`): section 3's figure;
- the merge's line (`:71`): "The prelude's half is in no run, and the prelude keeps its traits; it is now the whole of P-178 that is left (row 1003)": built by N; what is left is fork N4;
- the walls that only the switch shows (`:70`): rows 866 and 942 closed, "the five number traits with one object each below them" gone, row 995 narrowed to the other carried types, and its "rows 624 and 315 stand" and "the prelude's half and row 866 wait for way (b)" built.

Stale too, on no list:
- "Where we stand" (`:9-11`): the last landed gate, the walk check's landings, and the landed batches name run 1 as the last;
- varargs' line (`:69`), "Varargs (row 624) waits for a program compiled against the one library": built under the selector; what waits is its run test;
- the queue's item 423 (`review-queue.md:176`, `:1596`), "Row 940 fixed in `CodeGen.methodsNamed`, or once in `STypesUtil.gatherMethods`": answered by rung R, which repaired the root in `STypesUtil` (rows 940 and 942 closed);
- the queue's item 6 (`:401`), "the functional-method form is accepted and dies at run time (row 566)": row 566 is closed, and the form runs (`ComprisesMeetGenericTrait.test`).

**The manual and the script:** process findings 2 to 7. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. What the batch after holds

**The record's list, "For the batch after, in this order"** (`CLIMB-BATCH-33.md:502-511`), with run 1's additions (`reviews/batch-33-review.md`, Part 5; `PLAN.md:55`), still holds, and this landing changes it so:
1. **The carriers, the run time's prelude names and `NN32`'s getters,** with the first program that runs on the one library as their test (row 1062). Fork N4 belongs here: the one library's seven get their rows (Part 1's list of places), and with them every site that makes a `ZZ32` from a JVM `int` under the selector, G's varargs indices (`CodeGen.java:7904`) and the numeral sites (`:4708`), since `println`'s varargs reach the first. N's machinery serves the other carriers, each with its own hand-written class (item 521's default).
2. **`__bigOperator2`'s wall (row 1076),** the one refused declaration on the landed tree (section 3). `Generator2` has no third wall: G's measure and the landed tree's both emit it. No rung of run 2 took row 1076, as planned: it is in `forMethodInvocation`'s cast of a receiver typed by a type variable (`CodeGen.java:7405`). Then the one library compiles whole without the patch's hacks only after item 1 removes row 874's wrappers.
3. **Varargs' and row 315's run tests promoted,** `XXXOneLibraryRunVarargs` and `XXXOneLibraryRunConditionalReduction`, with the first program that runs; row 1086 beside them.
4. **The walls that only a running program shows:** unchanged (rows 994, 993, the rest of 995, the verifier's count).
5. **Row 996, rows 818, 1054 to 1056 and 1035, the checker's other gaps:** run 1's rows 1067 and 1070 to 1075 stand there; this run adds rows 1080, 1084 and 1088, and row 1085's build or refusal.
6. **The matrix and `DOT`, then microGPT's own needs:** unchanged; row 1087 is the prelude's and goes with it.

**Fork N4** is the whole of P-178 that is not built for the one library, beside P-17's unboxed values; its test is item 1's first program.

**Review-queue item 592,** fork D1 and row 1064: this landing changes nothing in it. Row 1081 is a third question of the same kind, which arms of a `typecase` are static errors, beside 592 and 593 (row 1068); its row names row 1064 as a sibling. If he takes them together, one rung on the clause's static rules answers the three.

**The choice for the batch after** (item 597, no skipping mode in the compiler) stands; the measure's 1 makes it smaller, since only row 1076 and row 874's wrappers stand between the fourteen components and their jars.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I did not take the measure; section 3 cites the coordinator's worker's, `3fbce96856`, as the coordinator sent it, and I read its file.
- I read the run's transcripts through scripts and the journal's results. For run 1's record-landing and the preparation, I read only the transcripts' labels, times, models, first messages and writes. I read the coordinating session's transcript for its own writes by time and for its incoming messages from 01:40 to 06:50.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times and the files' times.
- These are by reading, not run:
  - that the redundancy check that refuses row 1081's clause is the team's (`Misc.scala:330-334`, older than the history's cut);
  - that `FZZ32.make` raises under the selector at G's indices and the numeral sites (`LibraryNames.java:30-45`);
  - walk's answer for R.reserved.2's program;
  - that the restart did not roll the disk back, from the files that the second launches found.
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the four diffs of the source whole, and of the tests only the programs that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.

## The steps due before the batch after

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept from the shared task list (tasks 38 to 49), and each decision named in one line.
2. **The routing that no list holds yet** (Part 4): homes for rows 1080, 1083, 1084, 1086, 1087 and 1088; one queue item for run 2's thirteen forks; the six entries of `PLAN.md:899-904` as queue items, with finding 2's line; items 423 and 6 brought in line; PLAN's stale lines.
3. **The record's corrections** (Part 1): F-34 by section 3; F-136's two spellings; F-352 and F-353 as the record gives them; P-33's words and P-178's "Why", each told to him with its old and new words; the row and the test of finding 1.
4. **The record-landing workflow for run 2** (`tools/record-landing/README.md`, with `batch: '33b'`, `base: 'c799851472afc09b66e72d37e16f5a39e614ba5f'`, `landing: 'ba3c7c876d'`), with Part 3's list for the skill writer. The base build of the landed tree is ready, `/home/user/fortress-base39`.
5. **The script, before the next launch:** process findings 3 (one atomic push), 5 (the specification's grep for each closed row) and 6 (the repair's PDF kept).
6. **The batch after's plan** (Part 5): N4 with the varargs indices and the numeral sites in item 1; item 2 as row 1076 alone; rows 1080, 1084, 1086 and 1088 in items 3 and 5; row 1085 built or refused.
7. **His word** on the items of his list holds nothing; item 597 is needed when the batch after is planned.

## For the curator

Run 2 of climb batch 33, which the record calls climb batch 33b, ran from 02:10 UTC to 06:42 UTC on 18 November. In your time that is 03:10 to 07:42. It is pushed. All four tasks landed. No line of the model program changed. You gave the go at about 17:13 UTC on 17 November, for both runs. Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses by default. The **one library** is the library of the interpreter.
- The **selector** is the setting `FORTRESS_LIBRARY=one`. With it, the compile command reads the one library. A program compiled so does not run yet.
- A **value object** is an object with value semantics, like a Swift `struct`. Nothing can extend an object.
- A **payload class** is a small hand-written Java class that holds the bare JVM number, such as an `int`. The code generator writes each number object's class on top of it.
- A **row** is one known defect in the ledger. An **expected-failure test** is a test that is known to fail and is marked so.
- The **gate** is the full check before a run lands.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change. A **judge** is a third agent that rules where the skeptic contests a fix.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **varargs parameter** takes any number of arguments, written `xs: ZZ32...`.
- A **type assumption**, `e asif T`, makes the call around it choose its declaration as if `e` were a `T`.
- An **arm** is one clause of a `typecase`.
- The **measure** counts the declarations of the one library that the code generator refuses.

**What each task changed.** Each program is shortened from the tests that landed.

- **N. The prelude's seven number types are value objects.** The prelude, the code generator and seven run-time classes changed.

      object MyNum extends ZZ32 end

  - Before: the program compiled. When it ran, the JVM refused the class: 'IncompatibleClassChangeError'.
  - Now: the compile refuses it: 'Invalid type in extends clause: ZZ32'. Walk refuses it too. This is your decision P-178, now on both libraries' text.
  - Also now: `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)`, for a program's own trait `List`, compiles and runs. Before, the checker refused it.
  - Also now, one program that compiled is refused:

        kindOf(x: ZZ32): String = typecase x of
            Shape => "shape"
            else => "integer"
          end

    `Shape` is a trait of the program. Before, it printed "integer", as walk does. Now the checker refuses it: 'The typecase clause, Shape, is unreachable.' The team's checker has this rule. The specification has no such rule. It is on your list.
  - Also now: `x: Object = ZZ32` is refused by the code generator. Before, the checker refused it. Walk gives 0. What the name `ZZ32` means as a value is on your list.

- **W. Two hidden functions at one place get two class names.** The code generator changed.

      same(xs: List[\ZZ32\], ys: List[\ZZ32\]): Boolean =
          (|xs| = |ys|) AND: (BIG AND [(a, b) <- xs.zip[\ZZ32\](ys)] a = b)

  - Before: the compile stopped: 'ZipException: duplicate entry'. The compiler makes two hidden functions from that line, at one place in the source, and gave both one name.
  - Now: it compiles, under the prelude and with the selector. The second hidden function's name ends in `#2`. The one library's `=` on lists has this form.

- **G. A function with a varargs parameter compiles with the selector.** The code generator changed.

      count(xs: ZZ32...): ZZ32 = |xs|
      println(count(4, 5, 6))

  - Before, with the selector: the compile stopped: 'Can't compile VarArgs yet'.
  - Now: it compiles. The three arguments become one array that cannot be changed, as under walk. Its run waits until the one library compiles whole.
  - Without the selector it is still refused. The message now names the missing array type.
  - Still wrong on both paths: `count(1, ys...)`, where `ys` holds two numbers, gives 1. It should give 3. The extra arguments are dropped with no message. It is a new row, and no task repairs it yet.

- **R. A method of a trait from another component is found.** The code that gathers a trait's methods changed.

      object O extends B
          tag(self, n: ZZ32): String = "o"
      end

  - `B` is a trait of another component, with `tag(self, s: String)`.
  - Before: the compile stopped: 'Not in the trait table: B'.
  - Now: it compiles and runs. With the selector, a program with an array, `a = array1[\ZZ32, 8\]()`, compiles too.
  - Also now: `stamp(Q asif R, "d")`, where the object `Q` overrides `R`'s `stamp`, runs `R`'s body, as walk and the specification say. Before, it ran `Q`'s.
  - Also now: `("ab" asif String) < ("cd" asif String)` gives false. Before, it gave true. The prelude's `String` has a placeholder `<` that gives false, and the call now runs it. The prelude goes at the switch-over.

All tests passed at the gate, on the first run: 3,608 tests, and no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The measure.** Before run 2, the code generator refused 13 declarations of the one library. After run 2, it refuses 1, `__bigOperator2`. The coordinator measured it after the landing.

**The decisions that took the planner's default.** Each one can be undone.

- **Each number type's class is written over its payload class, and every compiled name of the type names the payload class (forks N1 and N3).** The other way named the object's class everywhere and changed every helper. Now each type has one name when a program runs, so two old defects run.
- **The payload class finds its object's class by name, in a small table that follows the selector (fork N2).** The other way was a table that each class fills when it loads, which misses a value made before that.
- **The one library's seven number types take this form later, in the task where the first program runs on the one library (fork N4).** The other way was this task, with no test that can fail. Until then, with the selector, a compiled varargs call would stop when it runs. That task must also cover the varargs indices.
- **A test of the team that pinned one error now pins two (fork N6).** Its program extends `ZZ32` in an object expression, which your decision now refuses.
- **The second hidden function at one place takes its name with `#2`; the first keeps today's name (fork W1).** The other way was a counter for every function, which renames every class.
- **The extra arguments are one JVM parameter of the array type, made by the library's factory and filled in order (fork G1).**
- **The array is made at the call, or in the dispatch method where another declaration of the name takes as many arguments (fork G2).** It works for top-level functions. For a method or a generic function in that case, the code generator still stops. No library line has that form.
- **A spread argument is not built (fork G3).** This is the wrong answer above.
- **The prelude stays without an array type, so it refuses varargs (fork G4),** by your decision P-37.
- **The run tests are expected failures until the one library compiles whole (fork G5).**
- **The team's search of the trait table by the prelude's names stays (fork R1).** No test reaches it now. It goes with the prelude.
- **Two runs, what the batch takes, and item 572 first (forks B1, B2, B3).** These order the work.

**The items on your list.** None holds a batch.
- Should the checker refuse a `typecase` arm that the selector's type excludes, as `Shape` over a `ZZ32` above? The team's specification note says no to a similar case. The team's checker says yes. Default: the refusal stays. This is consequential by the rule: the team's texts point both ways.
- What does `ZZ32` mean as a value, as in `x: Object = ZZ32`? The ways: an error on both paths; the number 0 on both paths, as walk gives now; or the code generator's refusal until you choose. Default: the refusal. The judge marked its row as settled by the specification. The judge also wrote that nothing on record settles it. That reading waits for your answer too.
- A team test pins a second error. A `typecase` arm that compiled is now refused. Both are told above.
- The varargs indices go into the task of fork N4. That is a step of the plan, not a question.
- A spread argument is dropped on both paths, and no task repairs it. Told.
- Three calls now reach another declaration, at a type assumption and in one dispatch. Each now does what walk does, except the prelude's `String`, which gives its placeholder's false. One more form that compiled now stops, at an assumption of a generic trait. Told.

**The record.** Two words of your decisions are now inexact. You see the old and the new words after the record's update.
- P-33 says that one build serves both libraries "by a second set of the run time's value classes". The number types use no second set now.
- P-178 gives as a reason that a program's object can extend the prelude's `ZZ32`. That is no longer so.

**Three events.**
- **The machine restarted at 03:54 UTC (04:54 in your time).** The run went on at 03:56. Two agents ran again: one task's worker and one skeptic. Each found the first agent's work and said so. Nothing was committed twice or lost. The restart cost about 0.38M tokens written.
- **Nothing else was committed while the run merged its tasks.** The coordinator committed two status notes, both before the merge.
- **No message of yours reached an agent.** You sent none during the run.

**The cost.** The run wrote 5.58M tokens. The estimate was 4.6M, and 5.7M with its reserve. The reserve paid for the two rulings and the repair, and the restart for the rest.
