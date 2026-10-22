<!-- Chunk f1 of the FACTS clarity assessment: F-7, F-9, F-11, F-12, F-17 to F-24, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `4caa90c81`. -->

# FACTS chunk f1: assessment

The base is `main` at `4caa90c81`. FACTS.md there is the same as at `a898e1baf`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the ledger rows, the tests, the specification and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-7 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-9 | pass | pass | pass | pass | pass | pass | keep |
| F-11 | pass | pass | pass | pass | pass | pass | keep |
| F-12 | pass | pass | **fail** | **fail** | **fail** | **fail** | **reorganize** |
| F-17 | pass | pass | pass | pass | pass | pass | keep |
| F-18 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-19 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-20 | **fail** | pass | pass | **fail** | pass | **fail** | **reword** |
| F-21 | **fail** | **fail** | **fail** | **fail** | pass | **fail** | **reword** |
| F-22 | pass | **fail** | pass | **fail** | pass | **fail** | **reword** |
| F-23 | pass | pass | pass | pass | pass | pass | keep |
| F-24 | pass | pass | pass | pass | pass | pass | keep |

Counts: keep 5, reword 6, reorganize 1, investigate 0. Each fail below has a resolution that the cited sources or the linked entries already give, so no entry needs a question settled first. Fails by criterion: scope 5, present meaning 2, evidence 2, comprehension 5, ownership 1, consistency 5.

## F-7, the two paths and the static type checker

- **Scope: fail.** The consequence is wider than the support. Quoted: "so walk shows a type error only as a failed dispatch at run time." Walk refuses some ill-formed programs at load: an extender that a main component's `comprises` clause does not allow (F-29), an object that leaves an inherited abstract method uncovered, an `override` that overrides nothing (F-145), and a Meet Rule break (F-142). The skill's `interpreter.md`, "What walk checks", lists these. Some run-time type errors are not dispatch failures either: an `if` on a non-`Boolean` is "If clause did not return boolean" (F-239).
- **Present meaning: pass.** It states the current split of the two paths.
- **Evidence: pass.** `Shell.java:420-424` makes walk call `setScala(false)`. `repo-internals.md`, "The pipeline, phase by phase", says that TYPECHECK is a no-op under walk. By reading, the property `fortress.compile.typecheck=true` would not turn the checker on under walk: with `use_scala` false, `StaticChecker.checkCompilationUnit` throws "The Java version of the type checker is gone now." (`StaticChecker.java:228-229`). So "no switch turns it on" holds.
- **Comprehension: pass.**
- **Ownership: pass.** One subject. The phases are left to the skill.
- **Consistency: fail.** F-29, F-142, F-145 and F-239 describe walk's checks at load and at run time. F-7 does not give their scope, and its last clause reads against them (see Scope).
- **Disposition: reword.** Bound the clause. Walk checks no static types of expressions, so an ill-typed expression shows only at run time, most often as a failed dispatch. At load it refuses some ill-formed declarations: the skill's "What walk checks" and F-29, F-145.

## F-9, `fortress typecheck` and the compiler's library

- **Scope: pass.** It names the command, the library and the consequence.
- **Present meaning: pass.**
- **Evidence: pass.** `Shell.java:453-456` calls `useCompilerLibraries()` and `setTypeChecking(true)` for `typecheck`. Row 69 holds the same.
- **Comprehension: pass.** "No oracle" is plain enough with "for walk programs".
- **Ownership: pass.**
- **Consistency: pass.** P-12 agrees ("it is no check of walk's programs"), and so does F-7. Note: `useCompilerLibraries()` also swaps in `CompilerBuiltin`, so "the compiler's library" means the whole compiler prelude (P-37's three files). This does not mislead.
- **Disposition: keep.**

## F-11, boxing on the compiled path

- **Scope: pass.** The title's claim on array code rests on Java models, and the body's second sentence says so. `perf-probes/kernels/REPORT.md` section 4 draws the same conclusion from the same models. Its reason is that array element results escape, so the JIT cannot scalar-replace them.
- **Present meaning: pass.** "No such kernel compiles yet" is current (row 305, NEGATIVE-VERIFIED; F-183).
- **Evidence: pass.** Section 2's tables give 6.26×, 6.53× and 2.59× for "boxed as the runtime boxes". Note: the cited skill part, "The compiled run time", says that a number is a boxed `FRR64`, but not that the loop holds no `dadd`. `perf-probes/boxing/REPORT.md` section 4 shows that in `javap` ("No `dmul`, no `dadd`, no `dload`"). The sentence follows from the skill's statement, so this is no fail.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** P-17, F-12, F-40 and F-183 agree.
- **Disposition: keep.**

## F-12, the compiled scalar loop's time and what remains

- **Scope: pass.** The title bounds the times to one pair timed in one session.
- **Present meaning: pass.** The measurement is stated as a measurement.
- **Evidence: fail.** Quoted: "Two costs remain." The cited section, `compile-ladder/rung0/REPORT.md` "The four timings", holds only the timings (0.7384 s and 13.0566 s). The remaining costs come from `perf-probes/boxing/REPORT.md` section 5 and `perf-probes/kernels/REPORT.md` section 3. The 10-13 rewrite dropped that source (history, "the representational rest ... to the boxing report's section 5 and F-11"). Section 5 lists more than boxing in what remains: "the volatile transacted cell, the four allocations, the interface hop ... and the `checkcast`s".
- **Comprehension: fail.** Quoted: "The compiled scalar `RR64` loop `bench1t` runs in 0.74 s, against 13.06 s without the fixes of rows 302 and 303". `bench1t` is not defined: 20 M iterations of `acc := acc a + b` over `RR64`, with both float literals in the loop. The rows have no subject. Row 302 is the debug string that `BaseTask.inATransaction` builds on every call. Row 303 is the float literal that is parsed again at each use.
- **Ownership: fail.** Quoted: "The 9.34 s of the boxing and kernels reports is the unfixed tree in another session, so compare only a pair timed in one session." The entry mixes three things. One is what the repair of rows 302 and 303 bought (its before and after). One is a note that reconciles the reports' numbers. One is the current claim: what the compiled loop still costs. The first two belong in the history and the rung's report.
- **Consistency: fail.** F-40 counts "boxing and a transaction check per local variable" at about 31 ns per element. `perf-probes/nat/size-cost.md:89` says that each read and write of a mutable local asks `BaseTask.inATransaction`, six times per iteration. That is after the fix of row 302, which removed only the debug string. F-12 names only the generator and boxing as what remains.
- **Disposition: reorganize.** Keep the current property: the compiled scalar loop runs in about 0.74 s for 20 M iterations in one session's measurement. Name its remaining costs: the generator `countedseqloop`, boxing (F-11), and the transaction check on each mutable local (F-40). Cite the boxing report's section 5. Move the before figure and the note on the reports' other session to the history and to rung 0's report.

## F-17, an empty bytecode cache after a library order

- **Scope: pass.** "Can" rests on one observation. The entry claims no cause.
- **Present meaning: pass.** It states a current hazard, and what to check.
- **Evidence: pass.** `perf-probes/boxing/REPORT.md` section 1: "the first pass reported `exit=0` for every step and left `default_repository/caches/bytecode_cache/` **empty** ... Re-running the identical commands one at a time produced the jars."
- **Comprehension: pass.** "Library order" and "the five jars" are defined in the skill part it names.
- **Ownership: pass.** The fact is here, and the procedure is in the skill.
- **Consistency: pass.** `build-and-caches.md`, "The library order", says the same, for "a jar is missing", and F-100 does not conflict.
- **Disposition: keep.**

## F-18, generic instantiation by the class loader

- **Scope: fail.** Quoted: "Generic instantiations are stamped out at class-load time by ASM rewriting of template bytecode." Neither the title nor the body names the path. This holds for the compiled path only. Walk instantiates generics another way, and the section "Execution model" covers both paths.
- **Present meaning: pass.**
- **Evidence: pass.** `runtimeSystem/InstantiatingClassloader.java` imports ASM (`:29-38`) and overrides `loadClass` (`:178`). The skill's "The compiled run time" states the mechanism. The cited `perf-probes/nat/java.md` section 1 holds only the name `pNatMeth$Box⟦3⟧`. The entry does not name the skill's part, although its history says the mechanism moved there.
- **Comprehension: pass.**
- **Ownership: pass.** One subject. Note: the skill's "The compiled run time" states the whole mechanism, and F-129 owns the size's descriptor. Question 5 of "What an entry is" asks for the skill's part in place of the restatement.
- **Consistency: pass.** F-129 and the skill agree.
- **Disposition: reword.** Say "On the compiled path" and name the skill's part for the mechanism. Keep the size in the class's name, which a reader needs to read class names in errors. Merging that sentence into F-129, so that F-18 is no longer needed, is an option for the writer.

## F-19, implicit parallelism

- **Scope: fail.** Quoted: "a `for` loop is parallel unless every generator is `seq`, and a tuple's elements and an operator's operands are evaluated in parallel." This is the specification's rule. `for.tex:29-32` says "the programmer must assume that each loop iteration will occur independently in parallel". The entry gives the rule as what the tree does, on no named path. By reading, both paths spawn a task only where they judge it worthwhile. Walk does so when `TupleTask.worthSpawning()` holds (`TupleTask.java:119-121`). The code generator does so where `ParallelismAnalyzer.worthParallelizing` marks the node (`CodeGen.java:4906`).
- **Present meaning: pass.**
- **Evidence: pass.** `tuple-expr.tex:23-24` and `operator-app.tex:59` say it. The rule for `for` is not cited, but the skill part it names states it. By grep, no `.fss` or `.fsi` under `explorations/` uses `spawn` or `also` as code: the four hits are comments or strings.
- **Comprehension: fail.** Quoted: "No program under `explorations/` writes `spawn` or `also`." The entry does not say what this means for the work. A reader cannot tell why the sentence is there.
- **Ownership: pass.**
- **Consistency: pass.** The skill's "Parallelism and mutable state" says that these parts "can run at once", and F-135 agrees.
- **Disposition: reword.** Say that the specification makes these parts parallel, and that a program must assume that they run at once. Say what the survey sentence tells a worker, for example that every race in the project's programs comes from implicit parallelism, or drop it.

## F-20, sizes at run time

- **Scope: fail.** Quoted: "Under walk, a `nat` parameter does not unify with an array built at run time, while a literal size does (row 23)." Row 23 holds this for the `T[n]` array-type syntax only. Row 214 (POSITIVE-VERIFIED, reproducer `explorations/apl/rung-1/r02a_rankover.fss`) is stated as a sharpening of row 23: "the `T[n]` array-type syntax does not unify with a runtime-built array, but `Vector[\RR64,s\]` does". `explorations/apl/rung-1/REPORT.md:77-81` says the same. The entry drops that condition.
- **Present meaning: pass.**
- **Evidence: pass.** `trait-parameters.tex:97` supports the first sentence ("instantiated at runtime with numeric values"). Rows 254 and 23 support the rest as each row states it. Row 23's probe is no longer in the tree.
- **Comprehension: fail.** "while a literal size does" has no clear referent: an array type written with a literal size, such as `T[3]`. "Sizes ... check shapes only" makes the sizes do the checking.
- **Ownership: pass.** One subject, sizes at run time.
- **Consistency: fail.** Row 214, and the model program's use of `Vector[\RR64,n\]` and `Matrix` parameters on arrays built at run time (F-151's family), contradict the sentence as it is written.
- **Disposition: reword.** Under walk, only the `T[n]` array-type syntax fails to unify with an array built at run time (row 23). `Vector` and `Matrix` take their sizes from such an array, and dispatch on them (row 214).

## F-21, the specification's bare `Nothing`

- **Scope: fail.** Quoted: "The specification's own declaration of `Nothing` compiles on neither path, and the reason is name resolution, not code generation." Today the specification's own declaration is the parametric `value object Nothing[\T\]` (`Specification/basic-lib/convenience.tex:50`). The bare form is the Working Draft's, and the specification now marks it "Not allowed" (`:58-66`). The declaration as written also stops first at the grammar (`excludes`), not at name resolution. The body says both, and the title claims one cause.
- **Present meaning: fail.** The title reads as a statement about today's specification (see Scope). The body's "The specification marks it 'Not allowed'" shows that the title is stale.
- **Evidence: fail.** Quoted: "stops at `excludes`: an object has no `excludes` clause." The cited `compile-ladder/rung-maybe/REPORT.md` section 5 measured the declaration without `excludes` (`probes/WhereClauseNothing.fss`). The stop at `excludes` is in `reviews/spec-refused-examples.md`, E4 ("both paths stop at a syntax error there **[measured, `SpecNothing`]**"). The 10-13 rewrite dropped that source. The `T is undefined` half is supported.
- **Comprehension: fail.** "The Working Draft" is not identified: the February 2011 Working Draft, `Specification-1.0-frozen/basic-lib/convenience.tex:40`.
- **Ownership: pass.** One subject. Note: F-47 already says "The where-clause examples stop earlier on both paths, at `T is undefined`". F-21 is that case for E4, so the writer may merge it into F-47.
- **Consistency: fail.** F-167 (P-97) says that the specification now refuses the bare `Nothing` by instantiation exclusion and bars a `where`-clause variable from an `extends` clause's static arguments. F-21's "the reason is name resolution" and its comparison with row 17, a defect, suggest that a fix of name resolution would let the declaration compile. F-21 points only to P-90, and P-90's "future work" conflicts with the specification. Review-queue item 224 holds that conflict for the curator, and item 41 the bar's wording. F-21 states neither.
- **Disposition: reword.** The title should name the Working Draft's bare `Nothing`. Give both stops: the grammar refuses `excludes` on an object, and without it name resolution leaves `T` undefined. Say that today's specification refuses the form by instantiation exclusion (F-167). Point to item 224 for P-90's open question. Cite E4 for the stop at `excludes`. The facts do not wait for the curator's answer on P-90.

## F-22, an api implemented by a component of another name

- **Scope: pass.** The body states the general rule, and the title's case falls under it.
- **Present meaning: fail.** Quoted: "An exported function fails exactly as an exported variable does". The title gives the rung's comparison. The batch record had said that functions link, and the rung measured that they do not. The current property is the body's second sentence: both paths look for an api's component under the api's own name.
- **Evidence: pass.** `compiler_tests/XXXExportVarRungXLinked.test` asserts `link_err_contains=Could not find an implementation for API ExportVarRungXLibApi`. `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them", gives the probes and `Linker.whoIsImplementingMyAPI`.
- **Comprehension: fail.** Quoted: "the failure is the repository's, not codegen's". "Repository" here means the Fortress component repository that the linker consults (`GraphRepository`, `Linker`), not this git repository. The entry does not say so.
- **Ownership: pass.**
- **Consistency: fail.** Row 320, which the entry cites, has the class "implementation gap (codegen)". Its notes say that `functionalRefToPackageClassAndMethod` and `NamingCzar.jvmClassForToplevelDecl` resolve a reference to the api's name. The report names two fixes: a scan of the source path in `whoIsImplementingMyAPI`, or the api-named forwarder that the team reserved in `CodeGen.java`. "Not codegen's" leaves out the second, and the row's class contradicts it.
- **Disposition: reword.** Title: when a component's name differs from the api it exports, neither path finds the component. Say that the linker's repository looks only under the api's name, and that the code generator names references after the api, so either side can hold the fix (report). Name the "repository" plainly. Point out the row's class, or correct it in the ledger.

## F-23, a comment widens the span of the declaration before it

- **Scope: pass.** It is bounded to declarations that end in an expression or a type. Row 359 is NEGATIVE-BOUNDED and says that "which productions consume it was not traced". The entry claims no more than that rule.
- **Present meaning: pass.**
- **Evidence: pass.** `Fortress.rats:145-157` steps back over `' '` only. The report's section 6, D1, gives the probe's spans (`4:1~5:63`, and `9:1~11:2` for the declaration that ends in `end`).
- **Comprehension: pass.** Note: the report adds that "Nothing but diagnostics and location-derived names depends on it". The entry implies this ("maps positions back first") but does not say it.
- **Ownership: pass.**
- **Consistency: pass.** No other entry holds spans.
- **Disposition: keep.**

## F-24, a catchable exception from a walk native

- **Scope: pass.** "Under `walk`" is the condition.
- **Present meaning: pass.**
- **Evidence: pass.** `Int.overflow()` returns a `FortressError` that holds the library's `IntegerOverflow` object (`Int.java:258-261`). `FunctionClosure.applyInnerPossiblyGeneric` rethrows a `FortressException` and wraps any other `RuntimeException` in a `ProgramError` (`FunctionClosure.java:188-193`). `Int$Div` and `Int$Rem` still end in a bare `x / y` and `x % y` (`Int.java:123-133`), as row 336 says. `tests/IntSemanticsRungI.fss` has 26 `overflows(` assertions.
- **Comprehension: pass.** Note: "row 347, fixed" carries no subject (the narrowing checks `Int.rc` and `NN32.rc`, now catchable). The claim does not need it.
- **Ownership: pass.**
- **Consistency: pass.** F-132 and rows 336 and 347 agree, and so does F-20's `ProgramError`. `Int.divisionByZero()` exists and is used only by the power natives (`Int.java:291`, `UnsignedLong.java:342`, `BigNum.java:320`). It does not change row 336.
- **Disposition: keep.**
