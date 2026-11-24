<!-- The claims of each of the 29 FACTS entries of the chunk `exec` (section "Execution model"), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map of 2026-11-24 (brief: `brief-claims.md` beside this file); it rewrites no entry and decides no order. -->

# Claims of the chunk `exec`

Read on FACTS as it stands after `d52210a046` (the five consolidated chunks restored). Overlaps were found by `grep -F` of each claim's distinctive names over the whole of `explorations/coordinator/FACTS.md`; the words searched are given where nothing was found, and in brackets where they found the overlap. Checks are copied from `evidence/consolidation/scout-exec.md` (scout), `evidence/stale-claims.md` (stale) and `evidence/consolidation/followups.md`, exec (followups). "Sound" means the scout found the cited thing and found it to agree, and no source lists a finding. Subject labels start with the brief's areas; "both paths" is added for a claim about the parser or linker that holds for walk and the compiled path alike, and "the repository" covers the Java baseline of the model program.

Each claim reads: number, sentence, then subject and kind.

### F-7, "Walk and the compiled path share the parser and the phases ..."

1. Claims
   - C1. Walk and the compiled path share the parser and the phases. Subject: walk: static checking off. Kind: property.
   - C2. Walk switches the static type checker off and no switch turns it on. Subject: walk: static checking off. Kind: property.
   - C3. So under walk an ill-typed expression shows only when it runs, as a failed dispatch or another run-time error such as F-239's `if` refusal. Subject: walk: static checking off. Kind: property.
   - C4. At load walk refuses some ill-formed declarations, listed in `interpreter.md`, with evidence in F-29, F-142, F-145. Subject: walk: load checks. Kind: pointer.
   - C5. Where the paths part is in the skill's "How a program runs"; detail in `repo-internals.md`. Kind: pointer.
2. Overlaps (property): C1-C3: F-9 ["Scala checker off", walk "runs with type checking ... off"]; skill SKILL.md:72 (scout). C3: F-239 [`if` refusal]. Searched "switches the checker off", "failed dispatch": only F-7.
3. Checks: sound (scout: sources exist; SKILL.md:72 says the same). Followups: optional skill change to name F-239's error in "The phases".
4. Shape: one subject (walk: static checking off), with pointers. Title: walk and compiled share phases, only compiled runs the checker; the body serves it.

### F-9, "`fortress typecheck` checks a program against the compiler's library ..."

1. Claims
   - C1. `fortress typecheck` checks against `CompilerLibrary.fsi` unless `FORTRESS_LIBRARY=one` selects the one library. Subject: the checker: the command's library. Kind: property.
   - C2. So by default it is no oracle for walk programs. Subject: the checker: the command's library. Kind: property.
   - C3. `Shell.java` calls `useCompilerLibraries()` for the command, which follows the selection (F-381). Subject: the checker: the command's library. Kind: detail.
   - C4. Under the selection, `f(i: Index)` passes the check (row 69). Subject: the checker: the command's library. Kind: defect (row 69).
   - C5. P-12 has walk run the checker on its own programs after the switch-over. Kind: pointer.
   - C6. Walk cannot run the checker as it stands: type checking and the Scala checker are off, and the Java checker is gone (`StaticChecker.java:228-229`). Subject: walk: running the checker. Kind: defect.
   - C7. Walk has no case for the `CoercionInvocation` nodes that the checker inserts, by reading (row 833). Subject: walk: running the checker. Kind: defect (row 833).
2. Overlaps: C1-C3: F-381 [selection, `useCompilerLibraries`], F-289, F-293, F-296, F-352 [`useCompilerLibraries`]; compiler.md:193 (scout). C4: none found (searched "Index", "row 69"). C6: F-7 [checker off under walk]. C7: none found (searched "CoercionInvocation", "row 833").
3. Checks: sound. Rows 69 and 833 NEGATIVE-VERIFIED and agree; `StaticChecker.java:228-229` holds the line (scout).
4. Shape: several subjects (the checker: the command's library; walk: running the checker). Title: typecheck reads the compiler's library by default, so no oracle for walk; C5-C7 serve a second question (can walk run the checker).

### F-11, "The code generator boxes every number ..."

1. Claims
   - C1. The code generator boxes every number. Subject: the code generator: boxing. Kind: property.
   - C2. Boxing is the main representational cost of microGPT-shaped array code. Subject: the compiled runtime: cost of boxing. Kind: property.
   - C3. So a compiled `RR64` loop holds no `dadd` or `dmul`. Subject: the code generator: boxing. Kind: property.
   - C4. In Java models of three kernels, boxed elements cost 6.3x, 6.5x and 2.6x over `double[]`. Subject: the compiled runtime: cost of boxing. Kind: detail.
   - C5. No such kernel compiles yet: the prelude has no array type (row 305), and arrays come with the one library (P-37). Subject: the code generator: arrays on the compiled path. Kind: defect (row 305).
   - C6. In a hot loop escape analysis removes temporary boxes, one box per assignment to a mutable variable per iteration stays (F-301), while C2's inline depth reaches the constructor chain (F-302). Subject: the compiled runtime: cost of boxing. Kind: pointer.
2. Overlaps: C1, C3: F-18 ["stamping alone keeps every number boxed"], F-12 ["each value is boxed"], skill SKILL.md:94 (scout). C2: F-358 ["boxing explains 6 to 7"], F-356. C5: F-183 [only array-like types `ZZ32Vector`, `StringVector`], F-333, F-352/F-396 [the one library's arrays run compiled]. C6: F-301, F-302 (same text), F-40 [C2].
3. Checks: sound (scout: row 305 agrees; sources ok). Not checked by any source: C5's "no such kernel compiles yet" against F-396/F-358, where a compiled `Array1` loop ran against the one library.
4. Shape: several subjects (the code generator: boxing; the compiled runtime: cost of boxing; the code generator: arrays on the compiled path). Title: boxes every number, the main cost; the body serves it, except C5.

### F-12, "On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s ..."

1. Claims
   - C1. `bench1t` ran in 0.74 s compiled, median of three loop-only runs at one thread, in one session. Subject: the compiled runtime: scalar loop timing. Kind: detail.
   - C2. `bench1t` is a 20-million-iteration `seq` loop on a `var acc: RR64`. Kind: detail.
   - C3. Times from different sessions on this machine differ, so compare only times of one session. Subject: the tools: timings on this machine. Kind: property.
   - C4. The `seq` loop becomes the prelude's `countedseqloop`, a recursive split over boxed indices with a closure call per element. Subject: the code generator: seq loop shape. Kind: property.
   - C5. Each value is boxed (F-11). Kind: pointer.
   - C6. A mutable local is a volatile cell whose read and write each call `BaseTask.inATransaction` first. Subject: the compiled runtime: mutable-variable cells. Kind: property.
   - C7. The report counts four allocations per iteration, an interface call to the native wrapper and casts. Subject: the compiled runtime: scalar loop timing. Kind: detail.
   - C8. No share of the 0.74 s is measured. Subject: the compiled runtime: scalar loop timing. Kind: property.
2. Overlaps: C3: none in FACTS (searched "different sessions", "one session"); the fortress-repo `records.md` timing rule says it. C4: none found (searched "countedseqloop", "seq("). C6: F-40 ["a transaction check on each read and write of a local"], F-374 [`var` field cell, `inATransaction`], F-358 ["the transaction check and the box on the accumulator", row 641]; compiler.md:103 (scout).
3. Checks: sound (scout: sources ok; names no test or row).
4. Shape: several subjects (scalar loop timing; seq loop shape; mutable-variable cells). Title: the 0.74 s and the three costs; the body serves it, but C6 is a general property of every mutable local.

### F-17, "The bytecode cache can come up empty after a library order that reports exit 0."

1. Claims
   - C1. The bytecode cache can be empty after a library order that exits 0. Subject: the tools: build and caches. Kind: defect (no row).
   - C2. Running the same commands again, one at a time, made the jars. Kind: history.
   - C3. The cause is not known. Subject: the tools: build and caches. Kind: property.
   - C4. Check the five jars before a compiled run (`build-and-caches.md`). Kind: pointer.
2. Overlaps: C1, C3: none in FACTS (searched "bytecode cache", "five jars", "exit 0"); skill `build-and-caches.md:93` holds the check (scout). F-100 is near [`NoClassDefFoundError` until the library order refills the five jars].
3. Checks: sound (scout: source section ok).
4. Shape: mostly a defect. Title: the cache can come up empty; the body serves it.

### F-18, "On the compiled path, the class loader makes the class of a generic instantiation at its first use ..."

1. Claims
   - C1. The class loader makes an instantiation's class at first use, by rewriting the template's bytecode with ASM. Subject: the compiled runtime: generic instantiation. Kind: property.
   - C2. The rewriting only renames, so it gives no instance a `double[]` field, and stamping keeps every number boxed. Subject: the compiled runtime: generic instantiation. Kind: property.
   - C3. A size is part of the made class's name, as in `pNatMeth$Box⟦3⟧`, and inside the class its descriptor is `RTTIsize.of("<n>")` (F-129). Subject: the compiled runtime: sizes. Kind: property.
   - C4. A field of type `T` becomes `LFRR64;` in `Box⟦FRR64⟧`. Kind: detail.
   - C5. `Unbox.java` holds the team's plan of what to unbox, and says nothing of the loader. Subject: the code generator: the team's unboxing traces. Kind: property.
   - C6. The loader has an empty "expando" stub (`InstantiatingClassloader.java:168-172`). Subject: the code generator: the team's unboxing traces. Kind: property.
   - C7. A loader that stamps a `double[]` field, way A4 of array decision A (P-85), does not exist and is unmeasured. Subject: the compiled runtime: unboxed arrays. Kind: plan.
   - C8. Walk instantiates generics in its evaluator, not by classes. Subject: walk: generic instantiation. Kind: property.
2. Overlaps: C1: skill SKILL.md:90 (scout), F-25 [`InstantiatingClassloader`]. C2: F-11 [boxes every number]. C3: F-129 [descriptor from `RTTIsize.of`], F-37 [class of the instantiation `Vec`]. C5: F-359 [`Unbox.java`]. C6: none found (searched "expando"). C8: none found (searched "own evaluator", "instantiates generics").
3. Checks: sound; the scout notes that probe 1 of `array-design.md` is in its section 9, not section 2 as cited (not listed as stale).
4. Shape: several subjects (generic instantiation; sizes; the team's unboxing traces; unboxed arrays). Title: the loader makes classes by renaming, so no `double[]`; C3 and C8 serve other questions.

### F-19, "By the specification, the iterations of a `for` loop ... may run in parallel ..."

1. Claims
   - C1. By the specification, `for` iterations, tuple elements and call or operator arguments may run in parallel, and a program must assume they do. Subject: the specification: implicit parallelism. Kind: property.
   - C2. A `for` loop is sequential only if every generator is `seq` or `sequential`. Subject: the specification: implicit parallelism. Kind: property.
   - C3. An implementation may also run them one after another, so a program cannot count on parallel runs. Subject: the specification: implicit parallelism. Kind: property.
   - C4. Walk starts a task for tuple elements and arguments only where `TupleTask.worthSpawning` judges it worth it. Subject: walk: task spawning. Kind: property.
   - C5. Compiled, arguments of function and dotted calls fork where `ParallelismAnalyzer` marked the argument tuple (joins: F-350). Subject: the code generator: forking. Kind: property.
   - C6. The analyzer counts no call in the prelude's files (row 982) or of a function declared later in the file (row 987). Subject: the code generator: forking. Kind: defect (rows 982, 987).
   - C7. A `for` over a range without `seq` runs by splitting the range into `also do` blocks. Subject: the library: range splitting. Kind: property.
   - C8. Under walk every such block is a task. Subject: walk: task spawning. Kind: property.
   - C9. Walk's library splits a `ZZ32` range into chunks of at most 16, and a strided range down to single elements. Subject: the library: range splitting. Kind: property.
   - C10. Compiled, the first block runs in place, others fork where `BaseTask.forkIfProfitable` judges; the prelude's `parloop` splits down to `FORTRESS_LOOP_CHUNK`, 1 by default. Subject: the code generator: forking. Kind: property.
   - C11. `FORTRESS_THREADS` sizes the pool. Kind: pointer.
   - C12. By grep, no program under `explorations/` writes `spawn` or `also do`; the revival's tests write both. Subject: the repository: explicit parallelism in programs. Kind: property.
   - C13. Sources: four `.tex` passages. Kind: detail.
2. Overlaps: C1-C3: skill SKILL.md:111 (scout); none in FACTS (searched "may run in parallel", "parallelism.tex"). C4, C8: none found (searched "worthSpawning", "every such block"). C5, C10: F-350 [`ParallelismAnalyzer`, arguments fork, joins]. C6: F-350 [row 982]; row 987 none else. C7, C9: F-350 [grainSize 16], F-356 [range stops its split at 16], F-393 [`RangeInternals`, other subject]. C12: none found (searched "spawn": F-335, F-347 are other subjects).
3. Checks: C8 unsettled (stale; followups, exec, "Not re-checked": "walk makes each block a task"). The rest sound (scout; rows 982 NEGATIVE-BOUNDED and 987 CONTESTED agree; `FORTRESS_LOOP_CHUNK`, `forkIfProfitable` not grepped by the scout).
4. Shape: several subjects (specification: implicit parallelism; walk: task spawning; code generator: forking; library: range splitting; repository). Title: the specification's parallel rule; the body mostly serves how each path builds it.

### F-20, "Sizes, the `nat` and `int` static parameters, are values at run time ..."

1. Claims
   - C1. Sizes are values at run time; they check shapes. Subject: the specification: sizes. Kind: property.
   - C2. No optimization uses them (F-40). Subject: the compiled runtime: sizes. Kind: property.
   - C3. The compiled checker checks them (F-67), and a sized program loads and runs compiled (F-129). Kind: pointer.
   - C4. Under walk, `Vector` and `Matrix` take their sizes from an array built at run time, and overloads on them dispatch by rank (row 214). Subject: walk: sizes at run time. Kind: property (row 214, POSITIVE-VERIFIED).
   - C5. `T[n]` with a `nat` parameter does not unify with such an array, where `T[3]` does (row 23). Subject: walk: sizes at run time. Kind: defect (row 23).
   - C6. Walk matches sizes at dispatch, and a mismatch such as a `DOT` of 2x3 by 2x3 is a `ProgramError` that no `catch` takes (row 254). Subject: walk: sizes at run time. Kind: defect (row 254).
   - C7. Source: `trait-parameters.tex:96`. Kind: detail.
2. Overlaps: C2: F-40 [only the dispatcher reads a size; no gain in a hot loop]. C4: F-155, F-151, F-229 [`Vector[\`]. C5: none found (searched "row 23", "ArrayType"). C6: F-154 [wrong shapes stop the run at dispatch, "Failed to find any matching overload", `ProgramError`]; F-343 shares the message only.
3. Checks: C2 unsettled (stale: "no optimization uses a size" rests on a code reading of 2026-09-24; followups, checker-1). Rest sound (scout: rows 214, 23, 254 agree).
4. Shape: several subjects (sizes in general; walk: sizes at run time). Title: sizes are run-time values that check shapes and are not optimized; the walk body serves a narrower question.

### F-21, "The February 2011 Working Draft's bare `Nothing` ... is accepted on neither path ..."

1. Claims
   - C1. The draft's bare `Nothing`, one object for every `T`, is accepted on neither path. Subject: both paths: bare Nothing. Kind: property.
   - C2. Both paths stop at a syntax error at `excludes`, since an object has no `excludes` clause. Subject: both paths: bare Nothing. Kind: property.
   - C3. Without that clause both report `T is undefined`: an object's `where` clause binds no type variable of its `extends` clause, as row 17 holds for a trait. Subject: both paths: where-clause variables in extends. Kind: property.
   - C4. Today's specification refuses the form by instantiation exclusion and marks it "Not allowed" (F-167). Subject: the specification: instantiation exclusion. Kind: property.
   - C5. P-90 calls the bare `Nothing` future work that waits for such `where` clauses. Subject: the library: Nothing. Kind: plan.
2. Overlaps: C1-C2: F-184 [bare `Nothing`, P-90, compiled prelude's own `Nothing`]. C3: F-167 [bars a `where`-clause variable from an `extends` clause], row 17 (FIXED). C4: F-167 ["Not allowed"].
3. Checks: sound. Scout: the cited line `convenience.tex:40` is a TeX comment; row 17 is FIXED and its notes agree in substance.
4. Shape: several subjects (both paths: bare Nothing; where-clause variables; specification). Title: bare `Nothing` accepted on neither path; the body serves it.

### F-22, "When a component's name differs from the api that it exports, neither path finds the component ..."

1. Claims
   - C1. When a component's name differs from its exported api, neither path finds it, for a function or variable alike. Subject: both paths: api-to-component linking. Kind: defect (row 320).
   - C2. The specification resolves an imported api to any component that exports it. Subject: the specification: components. Kind: property.
   - C3. The tree looks only under the api's name unless a user maps it with `LinkShell`'s `alink` or `clink`. Subject: both paths: api-to-component linking. Kind: property.
   - C4. `Linker.whoIsImplementingMyAPI` looks this way, so `fortress link` and walk print "Could not find an implementation". Subject: both paths: api-to-component linking. Kind: detail.
   - C5. The code generator names a reference after the api and the class after the component; without `fortress link`, files compiled one by one die with `NoClassDefFoundError`. Subject: the code generator: api-named references. Kind: defect (row 320).
   - C6. The missing step is the repository's search for the component. Subject: both paths: api-to-component linking. Kind: property.
   - C7. The report names two repairs, neither built: a source-path search, or api-named forwarders. Subject: both paths: api-to-component linking. Kind: plan.
   - C8. Workaround: name the api after its component. Kind: property.
   - C9. Gated by `XXXExportVarRungXLinked.test`. Kind: tests.
2. Overlaps: C1, C3-C6: none in FACTS (searched "whoIsImplementingMyAPI", "row 320", "alink", "Could not find an implementation"); skill compiler.md:166 (scout). C5: F-181 shares `NoClassDefFoundError` only.
3. Checks: sound (scout: row 320 NEGATIVE-VERIFIED agrees; test found).
4. Shape: mostly a defect (row 320). Title: neither path finds a differently named component; the body serves it.

### F-23, "A comment placed after a declaration that ends in an expression or a type becomes part of that declaration's source span ..."

1. Claims
   - C1. A comment after a declaration that ends in an expression or a type joins its source span and its unambiguous name. Subject: both paths: parser source spans. Kind: defect (row 359).
   - C2. `createSpan` trims back over spaces only; a declaration ending in `end` is unaffected. Subject: both paths: parser source spans. Kind: detail.
   - C3. So a comment-only library edit can change the syntax tree, and a before-and-after comparison maps positions first. Subject: both paths: parser source spans. Kind: property.
2. Overlaps: C1: F-389 [class named by "source span", other subject]; skill library.md:62 (scout). Searched "createSpan", "row 359": only F-23.
3. Checks: sound (scout: row 359 NEGATIVE-BOUNDED agrees).
4. Shape: one subject (both paths: parser source spans), mostly a defect. Title matches; the body serves it.

### F-24, "Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees."

1. Claims
   - C1. Under walk a native raises a catchable Fortress exception by throwing a `FortressError` that holds the exception object. Subject: walk: native exceptions. Kind: property.
   - C2. `ZZ32.overflow()` does so for `IntegerOverflow` (F-132; row 347 fixed). Kind: history.
   - C3. A helper of `nativeHelpers/` raises the library's exception by its simple name, which walk reads back through `LibraryNames` (F-336). Subject: walk: native exceptions. Kind: property.
   - C4. So `DIV`, `REM`, `MOD` by zero on five integer types raise `DivisionByZero` (F-299, F-306, F-308, F-312). Subject: the library: division by zero. Kind: property.
   - C5. Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes. Subject: walk: native exceptions. Kind: property.
   - C6. Gated by `IntSemanticsRungI.fss`, `NativeHelperRaiseWalk.fss` and ten `<type>...ByZeroWalk.fss`. Kind: tests.
2. Overlaps: C1: skill interpreter.md:143 (scout); none in FACTS (searched "FortressError"). C3: F-299 [helper's `fortress.<Api>$<Name>` as `<Name>`], F-336 [compiled raise by name]. C4: F-306, F-312 [`DIV`, `REM`, `MOD` throw `DivisionByZero`], F-308, F-90, F-263, F-172 ["DivisionByZero"]. C5: F-20, F-154 [`ProgramError` no catch takes].
3. Checks: sound (scout: all 12 tests found; row 347 FIXED). Followups: F-24 is kept only because F-306 and F-312 cite it.
4. Shape: several subjects (walk: native exceptions; the library: division by zero). Title: a native raises a catchable exception; the body serves it.

### F-25, "On the compiled path, the class loader loads each class under the JDK's class-loading lock ..."

1. Claims
   - C1. The compiled class loader holds the JDK's class-loading lock for the whole load, so a first load of an instantiation's class is safe on four threads. Subject: the compiled runtime: generic instantiation. Kind: property.
   - C2. Without the lock two threads could race and the run died with a `NullPointerException` (row 417, fixed). Kind: history.
   - C3. `FirstLoadThreadsRungG` calls a generic overload at eight instantiations from a parallel loop of 800 iterations. Kind: tests.
   - C4. It failed 5 of 5 before the lock and passed 5 of 5 after, at four threads. Kind: history.
   - C5. It is one of the gate's atomic runs at four threads. Subject: the harness and the gate: atomic runs. Kind: property.
2. Overlaps: C1: F-18 [the loader makes the class at first use]; skill compiler.md:102 (scout). Searched "getClassLoadingLock", "row 417": only F-25. C5: none found (searched "atomic runs").
3. Checks: sound (scout: test found; row 417 FIXED).
4. Shape: one subject (generic instantiation) with history. Title: loads under the lock, safe on four threads; the body serves it.

### F-26, "Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains ..."

1. Claims
   - C1. Under walk, where one of two applicable declarations has its own static parameters, the call chooses on declared domains where exactly one lies inside the other. Subject: walk: dispatch on declared domains. Kind: property.
   - C2. It builds P-45 under walk. Kind: pointer.
   - C3. Defines "own static parameters" and "declared domain" (walk's symbolic instance). Subject: walk: dispatch on declared domains. Kind: property.
   - C4. Otherwise, walk compares the instances that the call makes. Subject: walk: dispatch on declared domains. Kind: property.
   - C5. So a functional method of a generic trait or object is compared on its instance, save two generic ones one inside the other, which stop with an error (F-405). Subject: walk: dispatch on declared domains. Kind: defect (via F-405).
   - C6. A generic dotted method is chosen by F-253, except two whose bounds differ only in the api of a same-named type (row 1134). Subject: walk: generic dotted methods. Kind: defect (row 1134).
   - C7. If the chosen generic declaration takes an argument only by a conversion, walk converts and dispatches again. Subject: walk: dispatch after conversion. Kind: property.
   - C8. No second dispatch for an overloaded dotted method, or where `coercionFor` finds no conversion. Subject: walk: dispatch after conversion. Kind: property.
   - C9. Two generic overloads alike in static parameters share one symbolic instance even if their `where` clauses differ; nothing has such a pair (row 478). Subject: walk: dispatch on declared domains. Kind: defect (row 478).
   - C10. Gated by `DispatchDeclaredDomain.fss`, `DispatchConvertedAgain.fss`. Kind: tests.
2. Overlaps: C1, C3, C4: F-252 [load check on declared domains], F-253 [generic method chosen on declared domains], F-257, F-274, F-375 [declared domains], F-174 and F-408 [P-45 on the compiled side], skill revival-changes.md "Dispatch and overloading" and interpreter.md:61, :68 (scout). C5: F-405 [generic dotted methods of one name, symbolic static arguments]. C6: F-253, F-405 [row 1134]. C7-C8: none found (searched "dispatches the converted", "coercionFor"); F-55 is near [static arguments inferred with coercion]. C9: none found (searched "row 478", "symbolic instance": F-257 only uses the term).
3. Checks: sound (scout: tests found; row 1134 NEGATIVE-VERIFIED, row 478 FIXED, agree). Followups: the skill's `revival-changes.md` sentence should be narrowed to match; F-253's pointer should name F-26.
4. Shape: several subjects (walk: dispatch on declared domains; walk: generic dotted methods; walk: dispatch after conversion). Title: declared domains where one has own static parameters; the body serves it, C7-C8 answer a second question.

### F-27, "Walk's load check reads again two kinds of overload pair ..."

1. Claims
   - C1. Walk's load check reads again two kinds of pair that its parameter check refuses: a generic beside a plain one, and two plain top-level functions whose overlap `comprises` clauses cover. Subject: walk: load checks of overloads. Kind: property.
   - C2. The cover test cuts the overlap by the `comprises` clauses, each combination must lie inside one declaration without static parameters below both, and an unsettled search refuses. Subject: walk: comprises cover of overloads. Kind: property.
   - C3. A generic beside a plain one passes where one declared domain lies strictly inside the other with the inner return type below. Subject: walk: load checks of overloads. Kind: property.
   - C4. Where neither lies inside, the pair needs the cover or exclusion read whole (F-258); equal declared domains are refused. Subject: walk: load checks of overloads. Kind: property.
   - C5. It builds P-46 and P-60 under walk. Kind: pointer.
   - C6. Two generic declarations are read on declared domains too (F-252). Kind: pointer.
   - C7. Walk still refuses the valid POPL 2019 example of three generic declarations (row 539). Subject: walk: load checks of overloads. Kind: defect (row 539).
   - C8. Gated by `ComprisesMeetWalk.fss`, `GenericBesidePlain*.fss`. Kind: tests.
2. Overlaps: C1, C3: F-252 [reads the pair again on its declared domains], F-375 [generic beside a plain one], F-257, F-274 [equal declared domains refused]; skill interpreter.md:61 (scout). C2: F-145 [`comprises` read for coverage, P-147], F-76 [compiled coverage check for the Meet Rule]. C4: F-258 [exclusion over the whole parameter type], F-274. C7: F-252, F-174 [row 539].
3. Checks: C8 cites a thing that is gone or moved: `GenericBesidePlain*` is found only under `compiler_tests/`, none under `tests/` (stale; scout). Rest sound (row 539 agrees). Followups: the skill's "What walk checks" first bullet should be narrowed to C1.
4. Shape: several subjects (walk: load checks of overloads; walk: comprises cover). Title: the two kinds of pair re-read; the body serves it.

### F-28, "Walk instantiates a generic declaration declared to return `Any`."

1. Claims
   - C1. Walk instantiates a generic declaration declared to return `Any`. Subject: walk: generic instantiation. Kind: property.
   - C2. `MakeInferenceSpecific` treats `Any` as a trait type (row 157, fixed). Kind: history.
   - C3. Its visitor has no case for 11 of 18 concrete type classes, of which only the dimension forms can be a return type. Subject: walk: generic instantiation. Kind: defect (no row).
   - C4. Gated by `GenericReturningAny.fss`. Kind: tests.
2. Overlaps: C1-C3: none found (searched "MakeInferenceSpecific", "row 157", "returning `Any`").
3. Checks: sound (scout: test found; row 157 FIXED).
4. Shape: one subject. Title matches; C3 is a residual defect without a row.

### F-29, "Under walk, the load check refuses a trait or object that extends a closed trait ..."

1. Claims
   - C1. Under walk the load check refuses an extender of a closed trait of the main component that its `comprises` clause does not allow. Subject: walk: comprises closure check. Kind: property.
   - C2. The check reads every trait and object of every component, the library's included, as a possible extender. Subject: walk: comprises closure check. Kind: property.
   - C3. An extender is allowed in three cases (below a listed type; a trait whose own clause lists allowed types; a generic trait whose extenders lie below a listed type). Subject: the specification: comprises clauses. Kind: property.
   - C4. The check does not read a clause outside the main component (row 551) or an object expression's `extends` (row 597). Subject: walk: comprises closure check. Kind: defect (rows 551, 597).
   - C5. It does not check that each listed type extends the trait at every instantiation (row 598). Subject: walk: comprises closure check. Kind: defect (row 598).
   - C6. A check that read the library's clauses would refuse programs importing `Reflect` (row 595), and three team tests and two demos (row 596). Subject: the library: comprises violations. Kind: defect (rows 595, 596).
   - C7. Their repairs come first and are the curator's. Kind: plan.
   - C8. Gated by two refused-at-load tests and the `XXX` tests of rows 487, 551, 597, 598. Kind: tests.
2. Overlaps: C1-C2: F-7 [points to F-29]; skill interpreter.md "What walk checks" (scout). C3: F-171 [specification's comprises reading, extender must be below a listed type, two exceptions], F-175 [value-level reading, P-60], F-72 [compiled checker's generic subtrait reading]. C4-C6: none found (searched "row 551", "row 595", "row 596", "row 597", "row 598"); row 487 is in F-72, F-76, F-171, F-175.
3. Checks: sound (scout: tests found; rows 487, 551, 595-598 NEGATIVE-VERIFIED agree).
4. Shape: several subjects (walk: comprises closure check; the specification's reading; the library's violations). Title: refuses an unlisted extender of the main component's closed trait; the body serves it.

### F-269, "Under walk, a program's declarations of a library operator name are checked against the library's only when ..."

1. Claims
   - C1. Under walk, a program's declarations of a library operator name are checked against the library's only when there are two or more, and only on a cold cache. Subject: walk: load checks of overloads. Kind: defect (row 342).
   - C2. Two or more can be refused beside the library's generic declarations even where more specific. Subject: walk: load checks of overloads. Kind: defect (row 341).
   - C3. It refused C4's former `MAX` pair, which C4 dropped for F-119's scalar extension. Kind: history.
   - C4. It refuses the `Matrix`-specialised `×` of `elemwise_nat_probe.fss` (F-155). Subject: walk: load checks of overloads. Kind: detail.
   - C5. Walk writes a component to its cache before the check and skips it on read-back, so a refusal appears once, on a cold cache. Subject: walk: caches and load checks. Kind: defect (row 342).
   - C6. The check runs only when walk analyses the library again; deleting the program's entries does not bring it back. Subject: walk: caches and load checks. Kind: property.
   - C7. So a test that depends on this check must run from an empty cache. Subject: walk: caches and load checks. Kind: property.
2. Overlaps: C1, C5: F-119 ["checks such overloads against the library's only on a cold cache (F-269)"]. C2-C4: F-155 [row 341, `elemwise_nat_probe`, refused at load], F-119. C5: F-276 [row 342, other context]. Searched "cold cache": F-119, F-269.
3. Checks: sound (scout: row 341 FIXED, row 342 NEGATIVE-VERIFIED, agree).
4. Shape: several subjects (load check of overloads; caches and load checks), mostly a defect. Title: checked only at two or more and on a cold cache; the body serves it.

### F-291, "With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments ..."

1. Claims
   - C1. With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments as with `extends Any` written. Subject: the compiled runtime: tuple and arrow generics. Kind: property.
   - C2. `()` fails whatever the bound (row 339). Subject: the compiled runtime: tuple and arrow generics. Kind: defect (row 339).
   - C3. A generic operator whose one parameter has the type parameter's type fails applied to a tuple (row 1056). Subject: the compiled runtime: tuple and arrow generics. Kind: defect (row 1056).
   - C4. Measured once over these shapes; the loader made the same classes and the jars read the same under `javap`. Kind: detail.
   - C5. So the switch to `Any` costs the run time no work for these shapes; its test cost is F-292. Subject: the compiled runtime: tuple and arrow generics. Kind: property.
   - C6. A generic dotted method with one tuple-typed parameter runs (row 832, fixed since). Kind: history.
   - C7. Not run: several shapes (the one library's own instantiations, longer and nested tuples, ...). Subject: the compiled runtime: tuple and arrow generics. Kind: plan.
   - C8. With `extends Object` written they are refused or pass unchecked (row 470). Subject: the checker: static arguments against bounds. Kind: defect (row 470).
   - C9. The compile command's bound is `Any` (`Shell.java:378`). Subject: the checker: default bound Any. Kind: property.
   - C10. No gated test. Kind: detail.
2. Overlaps: C1, C5: F-292 [tracks pass under the bound `Any`], F-289 [distance stage under the bound `Any`]. C2: none found (searched "row 339"). C3: F-378 [row 1056]. C6: F-296 [row 832]. C8: F-70, F-244, F-250, F-256 [row 470]. C9: F-296 [bounds an unbounded type parameter by `Any`, `Shell.java:378`], F-289, F-34, F-49, F-174 ["bound `Any`"].
3. Checks: sound (scout: rows 339, 1056, 470 NEGATIVE-VERIFIED and 832 FIXED agree; `Shell.java:378` agrees).
4. Shape: several subjects (tuple and arrow generics; static arguments against bounds; default bound). Title: generics at tuples and arrows run under `Any`, with two failures; the body serves it.

### F-301, "On the compiled path a native helper is called through a generated wrapper over the box classes ..."

1. Claims
   - C1. On the compiled path a native helper is called through a generated wrapper that unboxes with `getValue`, calls, and boxes with `make`. Subject: the compiled runtime: native helper calls. Kind: property.
   - C2. A `builtinPrimitive` binding and an `import java` alias call compile to the same bytes, an `invokestatic` of `native.pkg.Class.method` in `nativewrapper_cache/`. Subject: the compiled runtime: native helper calls. Kind: property.
   - C3. `make` now calls the value object's `make` through a method handle (F-388). Subject: the compiled runtime: number boxes. Kind: property.
   - C4. When the prelude's numbers were traits, `+` reached the wrapper through dispatcher, interface call, springboard and trait body. Kind: history.
   - C5. Once hot, C2 inlines all these frames, and the call costs nothing of its own. Subject: the compiled runtime: native helper calls. Kind: property.
   - C6. Escape analysis removes every temporary box; one box stays per assignment to a mutable variable per iteration, 16 bytes for `ZZ32`, 24 for `RR64`. Subject: the compiled runtime: cost of boxing. Kind: property.
   - C7. The library's form and the prelude's allocate the same. Subject: the compiled runtime: cost of boxing. Kind: property.
   - C8. Observed once, while numbers were traits, not since, on one small program at load 20 to 25; no test. Kind: detail.
2. Overlaps: C1-C2: F-298 [helper binding compiles as a call of that helper], F-309 [`nativewrapper_cache/`, `ForeignJava`], F-106 [native-wrapper generator]; skill build-and-caches.md:67 (scout). C3: F-388 [value objects over payload classes]. C5: F-40 ["a native helper's call is inlined whole and costs nothing"] (scout). C6: F-11 (same sentence, pointer form), F-358 ["the box on the accumulator"].
3. Checks: cites a thing that is gone or moved: `FortressMethodAdapter.java:303-327` does not hold the wrapper; the table is at `:173-186` (stale; scout). Scope: C5-C7 observed only while numbers were traits (the entry says so).
4. Shape: several subjects (native helper calls; cost of boxing), with history. Title: wrapper calls cost nothing once hot; the body serves it.

### F-302, "In those loops C2 inlines down to depth 12 from the loop ..."

1. Claims
   - C1. In those loops C2 inlined down to depth 12, against 16 by default. Subject: the compiled runtime: C2 inline depth. Kind: detail.
   - C2. A temporary box whose constructor chain passes the limit is no longer removed. Subject: the compiled runtime: C2 inline depth. Kind: property.
   - C3. At `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. Kind: detail.
   - C4. With numbers as traits, `+` reached `Object.<init>` at depth 12, a top-level binding at 10. Kind: history.
   - C5. With the limit at 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration. Kind: detail.
   - C6. So an operator called from more than 4 further inlined frames keeps its temporary boxes. Subject: the compiled runtime: C2 inline depth. Kind: property.
   - C7. A springboard extends its trait's first `extends` entry's springboard. Subject: the code generator: springboards. Kind: property.
   - C8. The prelude's box is now its value object's class over `FZZ32`, which extends no springboard, so the chain no longer follows `extends`. Subject: the compiled runtime: number boxes. Kind: property.
   - C9. The value-object form's depth is not measured; observed once. Subject: the compiled runtime: C2 inline depth. Kind: plan.
2. Overlaps: C2, C6: F-11 ["as long as C2's inline depth reaches each box's constructor chain"]. Searched "MaxInlineLevel": only F-302. C7: F-301 [springboard], none else. C8: F-388 [value objects over payload classes], F-301, F-353, F-390, F-129, F-359, F-180 [`FZZ32`].
3. Checks: cites a thing that is gone or moved: `CodeGen.java:6047-6054` now holds `emitErasedClassFor`; the springboard class is built from `:6092` (stale; scout). `FZZ32.java:22` agrees.
4. Shape: several subjects (C2 inline depth; springboards; number boxes), much history. Title: inline depth 12 of 16, and over-limit boxes stay; C7-C8 serve another question.

### F-348, "A compiled program initializes the class of every component that it uses before `run` ..."

1. Claims
   - C1. A compiled program initializes each used component's class before `run`, in a root task on a one-thread pool. Subject: the compiled runtime: component initialization. Kind: property.
   - C2. The classes are the program's, then each named by its classes at any depth, found by class names in each jar. Subject: the compiled runtime: component initialization. Kind: property.
   - C3. The program's arguments are set first. Subject: the compiled runtime: component initialization. Kind: property.
   - C4. So a numeral's place is filled in a task with no transaction, its coercion's forks run in place, and its side effects come before the first output. Subject: the compiled runtime: numeral places. Kind: property.
   - C5. A top-level variable's initializer runs at the variable's first use, not in the class initializer. Subject: the compiled runtime: top-level variables. Kind: property.
   - C6. An imported component whose declarations no class names is not initialized so. Subject: the compiled runtime: component initialization. Kind: property.
   - C7. It adds about 40 ms to start: 249 to 313 ms against 214 to 263, five runs twice. Kind: detail.
   - C8. Measured on rung N's code, landed as `f36a651243`. Kind: history.
   - C9. Tests: `NumeralCoercionSpawnCompiled`, `NumeralCoercionSpawnImported`. Kind: tests.
2. Overlaps: C1-C3: F-347 [numeral's place made before the program runs, root task], F-337 [`MainWrapper`]; skill compiler.md:93 (scout). C4: F-347, F-340. C5: none found (searched "first use", "top-level variable's initializer"). C6: none found (searched "whose declarations no class names").
3. Checks: C5 and C6 unsettled (stale; followups, exec, "Not re-checked"). Rest sound (scout: `MainWrapper.java`, `FortressExecutable.java` agree; tests found).
4. Shape: several subjects (component initialization; numeral places; top-level variables). Title: initializes every used component before `run` in a root task; the body serves it.

### F-350, "On the compiled path the arms of a parallel `do`, the elements of a tuple ... fork through one method ..."

1. Claims
   - C1. On the compiled path do-arms, tuple elements, operands and call arguments fork through `CodeGen.genParallelExprs`, which joins every forked arm before an exception leaves. Subject: the code generator: forking. Kind: property.
   - C2. Arguments fork where `ParallelismAnalyzer` marked the argument tuple. Subject: the code generator: forking. Kind: property.
   - C3. The exception that leaves is the first arm's in order; an unforked arm is not run; a `VirtualMachineError` leaves without joins. Subject: the code generator: forking. Kind: property.
   - C4. The analyzer marks no call in the prelude's files, so the prelude's reductions run in sequence (row 982). Subject: the code generator: forking. Kind: defect (row 982).
   - C5. The one library's parallel `ZZ32` range splits only a range of more than `grainSize`, 16. Subject: the library: range splitting. Kind: property.
   - C6. So compiled against the one library a reduction over more than 16 elements forks its halves. Subject: the library: range splitting. Kind: property.
   - C7. By reading, microGPT's vectors are 16, 16, 4 and 4 wide, so a reduction over one forks nothing on either path. Subject: the repository: microGPT widths. Kind: property.
   - C8. Tests: `AlsoArmThrowsJoinsCompiled`, `CallArgumentsForkCompiled`, `ParRangeGrainWalk`. Kind: tests.
2. Overlaps: C1-C4: F-19 [arguments fork, joins, row 982]; skill compiler.md:140 (scout). C5-C6: F-19 [chunks of at most 16], F-356 [range stops its split at 16, P-175]. C7: none found (searched "16, 16, 4", "MicroGptFlat.fss:17").
3. Checks: sound (scout: `BaseTask.java:113-131`, `RangeInternals.fss:20` agree; tests found; row 982 agrees).
4. Shape: several subjects (forking; range splitting; microGPT widths). Title: one forking method that joins; the body serves it, C5-C7 answer another question.

### F-351, "A compiled transaction validates itself and every ancestor ..."

1. Claims
   - C1. A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names. Subject: the compiled runtime: transactions. Kind: property.
   - C2. A transaction records no read of its own write, an ancestor's write with that write, a committed value with that value, an empty array element with a mark. Subject: the compiled runtime: transactions. Kind: property.
   - C3. Validation runs at a read after the global lock moved and at a commit that missed the lock. Subject: the compiled runtime: transactions. Kind: property.
   - C4. The block's handler ends the transaction, restarts it for an abort naming it or none, commits on a `LabelExit` and throws it on (F-401), and throws all else after handing reads to the parent. Subject: the compiled runtime: transactions. Kind: property.
   - C5. A nested commit hands its parent its reads and writes. Subject: the compiled runtime: transactions. Kind: property.
   - C6. The exception-table entry of a block or `try` follows its body, so a nested one is taken first. Subject: the code generator: exception tables. Kind: property.
   - C7. A nested block sees a plain write by another thread that runs its outer block (row 984). Subject: the compiled runtime: transactions. Kind: defect (row 984).
   - C8. Source lines in `Transaction.java`, `BaseTask.java`, `CodeGen.java`. Kind: detail.
   - C9. Nine tests. Kind: tests.
2. Overlaps: C1-C5: none found for validation (searched "validates", "Transaction.java"). C4: F-401 [exit commits the block's transaction, `leaveTransaction`], F-373 [`LabelExit`]. C6: none found (searched "exception-table"). C7: none found (searched "row 984"). F-374 [atomic expression is its body in an atomic block] touches the subject.
3. Checks: cites a thing that is gone or moved: `CodeGen.java:2148-2180` (`forAtomicBlock` now `:2142`/`:2155`), `forTry` now `:2485`, `ArrayStoreJUTest` not under `tests/` (stale; scout). Rest sound (row 984 agrees).
4. Shape: one subject (transactions) with C6 beside it. Title matches; the body serves it.

### F-355, "The pure-Java microGPT that P-7 names as the baseline is in `java-baseline/` ..."

1. Claims
   - C1. The pure-Java microGPT baseline that P-7 names is in `java-baseline/`. Subject: the repository: Java baseline of microGPT. Kind: property.
   - C2. One step at batch 1 takes about 0.10 ms without Adam, 0.113 ms with it. Subject: the repository: Java baseline of microGPT. Kind: detail.
   - C3. It is the flat program line for line in `double[]` and plain loops on one thread, and passes the 7 quick and 40 full checks. Subject: the repository: Java baseline of microGPT. Kind: property.
   - C4. Measured once on a shared 4-CPU machine with JDK 25: fork medians, cold-process times. Kind: detail.
   - C5. It is careful scalar Java, not the fastest: HotSpot vectorises no matrix product, and the Vector API gives 75 µs. Subject: the repository: Java baseline of microGPT. Kind: property.
   - C6. In one session, a step took 0.20 ms in NumPy, 13 ms under dzaima/APL, 132 ms in pure Python. Kind: detail.
   - C7. So a compiled Fortress step is measured against about 0.1 ms, and pure Python is about 1,200 times slower. Subject: the repository: Java baseline of microGPT. Kind: property.
   - C8. Only a sum of more than 16 terms is added in another order than the library's. Subject: the repository: Java baseline of microGPT. Kind: property.
   - C9. No test checks the timings; commands `run.sh` and `run.sh bench`. Kind: detail.
2. Overlaps: C1-C8: F-356, F-357, F-358 [`java-baseline`]; none else (searched "java-baseline", "0.113", "P-7": the other P-7 entries cite the decision on other subjects).
3. Checks: sound (scout: sources and `run.sh` found).
4. Shape: one subject (Java baseline). Title: the baseline's place and its step time; the body serves it.

### F-356, "In the fork/join shape that the library and the compiled runtime give parallel work ..."

1. Claims
   - C1. In the library's fork/join shape, a Java model of microGPT's step with unboxed arrays runs 19 to 80 times slower than plain loops at the library's grains. Subject: the library: parallel shape at microGPT sizes. Kind: property.
   - C2. With the matrix product stopped at blocks of 16, it runs 1.4 to 4.8 times slower. Subject: the library: parallel shape at microGPT sizes. Kind: detail.
   - C3. The range stops its split at 16 (P-175), and the matrix product splits to single elements. Subject: the library: range splitting. Kind: property.
   - C4. The model's times are a floor for compiled Fortress with this structure. Subject: the library: parallel shape at microGPT sizes. Kind: property.
   - C5. Per-thread counts: 19 to 32 times on one thread, 55 on two, 80 on four; gains only at large products and dot products. Kind: detail.
   - C6. So at microGPT's sizes the library's parallel shape costs time at any thread count, and the product's missing grain is the largest part. Subject: the library: parallel shape at microGPT sizes. Kind: property.
   - C7. Measured once; commands `run.sh steps`, `kernels`, `scale`. Kind: detail.
2. Overlaps: C3: F-350, F-19 [grain 16]. C1, C4, C6: F-355 [baseline]; none else (searched "fork/join", "missing grain", "FortressLibrary.fss:3129").
3. Checks: sound (scout: `grainSize = 16`, `FortressLibrary.fss:3129` agree).
4. Shape: one subject (parallel shape at microGPT sizes). Title matches; the body serves it.

### F-357, "`FlatData.parseFloat`, the flat program's reader of its weight files, is not correctly rounded ..."

1. Claims
   - C1. `FlatData.parseFloat` is not correctly rounded: 699 of 4,192 parameters differ from the nearest double, by up to 2 ulp. Subject: the repository: microGPT weight parser. Kind: defect (no row).
   - C2. It accumulates digits in a double and scales once. Subject: the repository: microGPT weight parser. Kind: detail.
   - C3. So a port must port the parser to start from the same parameters, as the Java baseline does. Subject: the repository: microGPT weight parser. Kind: property.
   - C4. No check depends on it: the loader check uses the same parser. Subject: the repository: microGPT weight parser. Kind: property.
   - C5. Shown on the Java port by `run.sh parse`; no Fortress run. Kind: detail.
2. Overlaps: C1-C4: none found (searched "parseFloat", "FlatData": F-58 names FlatData on another subject).
3. Checks: sound (scout: `FlatData.java:23`, `run.sh parse` found).
4. Shape: one subject, mostly a defect. Title matches.

### F-358, "In the scratch tree of F-352, a compiled loop over two `Array1` of 1,000 `RR64` ..."

1. Claims
   - C1. In F-352's scratch tree, a compiled loop over two `Array1` ran about 45 times faster than walk and about 100 times slower than Java. Subject: the compiled runtime: array loop timing. Kind: property.
   - C2. Boxing explains 6 to 7 of that. Subject: the compiled runtime: cost of boxing. Kind: property.
   - C3. The loop's shape and its 1.4 s, 39.8 s, 0.8 s, 36 s, 7.5 ms, 4.4 ms times. Kind: detail.
   - C4. Each is one run at different sessions and loads, warm-up inside, verifier off; an order of magnitude only. Subject: the compiled runtime: array loop timing. Kind: property.
   - C5. The rest has no measured share: the store wrapper's read, the range's closure, the accumulator's transaction check and box (F-12, row 641). Subject: the compiled runtime: array loop timing. Kind: defect (row 641).
   - C6. It says nothing of microGPT's kernels. Subject: the compiled runtime: array loop timing. Kind: property.
2. Overlaps: C1: F-352 [scratch tree], F-396 [one-library program runs]. C2: F-11 [6.3x, 6.5x]. C5: F-12 [the same costs on `bench1t`], F-374 [row 641], F-40 [transaction check].
3. Checks: sound (scout: row 641 NEGATIVE-BOUNDED agrees).
4. Shape: one subject (array loop timing) bounded to one run. Title matches; the body serves it.

### F-395, "Walk registers a native singleton's constructor with its values' class as it binds the singleton ..."

1. Claims
   - C1. Walk registers a native singleton's constructor with its values' class as it binds the singleton, so no library line names a native object as a value for walk. Subject: walk: native singletons. Kind: property.
   - C2. `BuildNativeEnvironment` and `BuildEnvironments` apply the constructors of eleven named objects in the first pass, before any top-level variable is initialised. Subject: walk: native singletons. Kind: detail.
   - C3. So a value made before the object's name is read has its type. Subject: walk: native singletons. Kind: property.
   - C4. `FlatString.fss` holds no `ignore(FlatString)`, so row 1082's refusal has no site there. Subject: the library: number types named as values. Kind: property.
   - C5. `ReflectCollection()` and `ReflectMethod()` still register theirs only when called, which `Reflect.fss` does. Subject: walk: native singletons. Kind: property.
   - C6. Test: `NativeStringsReadyAtLoadWalk.fss`. Kind: tests.
2. Overlaps: C1-C3, C5: none found (searched "BuildNativeEnvironment", "native singleton", "ReflectCollection", "NativeStringsReady"). C4: F-388 [row 1082].
3. Checks: sound (scout: lines agree; test found; row 1082 agrees).
4. Shape: one subject. Title matches; the body serves it.

## Subject labels used, with their entries

- walk: static checking off: F-7
- walk: load checks (and of overloads): F-7, F-27, F-269
- walk: comprises cover of overloads: F-27
- walk: comprises closure check: F-29
- walk: caches and load checks: F-269
- walk: running the checker: F-9
- walk: dispatch on declared domains: F-26
- walk: generic dotted methods: F-26
- walk: dispatch after conversion: F-26
- walk: generic instantiation: F-18, F-28
- walk: task spawning: F-19
- walk: sizes at run time: F-20
- walk: native exceptions: F-24
- walk: native singletons: F-395
- the checker: the command's library: F-9
- the checker: static arguments against bounds: F-291
- the checker: default bound Any: F-291
- the code generator: boxing: F-11
- the code generator: arrays on the compiled path: F-11
- the code generator: seq loop shape: F-12
- the code generator: the team's unboxing traces: F-18
- the code generator: forking: F-19, F-350
- the code generator: api-named references: F-22
- the code generator: springboards: F-302
- the code generator: exception tables: F-351
- the compiled runtime: cost of boxing: F-11, F-301, F-358
- the compiled runtime: scalar loop timing: F-12
- the compiled runtime: array loop timing: F-358
- the compiled runtime: mutable-variable cells: F-12
- the compiled runtime: generic instantiation: F-18, F-25
- the compiled runtime: sizes: F-18, F-20
- the compiled runtime: unboxed arrays: F-18
- the compiled runtime: tuple and arrow generics: F-291
- the compiled runtime: native helper calls: F-301
- the compiled runtime: number boxes: F-301, F-302
- the compiled runtime: C2 inline depth: F-302
- the compiled runtime: component initialization: F-348
- the compiled runtime: numeral places: F-348
- the compiled runtime: top-level variables: F-348
- the compiled runtime: transactions: F-351
- both paths: bare Nothing: F-21
- both paths: where-clause variables in extends: F-21
- both paths: api-to-component linking: F-22
- both paths: parser source spans: F-23
- the library: range splitting: F-19, F-350, F-356
- the library: parallel shape at microGPT sizes: F-356
- the library: division by zero: F-24
- the library: comprises violations: F-29
- the library: Nothing: F-21
- the library: number types named as values: F-395
- the specification: implicit parallelism: F-19
- the specification: sizes: F-20
- the specification: instantiation exclusion: F-21
- the specification: components: F-22
- the specification: comprises clauses: F-29
- the harness and the gate: atomic runs: F-25
- the tools: build and caches: F-17
- the tools: timings on this machine: F-12
- the repository: explicit parallelism in programs: F-19
- the repository: microGPT widths: F-350
- the repository: Java baseline of microGPT: F-355
- the repository: microGPT weight parser: F-357

## Entries that overlap

- Boxing and its cost: F-11, F-12, F-18, F-301, F-302, F-358 (and F-40, F-388 outside the chunk). F-11's last sentence is F-301 and F-302 in short; F-358 repeats F-11's 6-7x.
- Transaction check on a mutable local: F-12, F-358, F-40, F-374 (row 641).
- Forking and the range grain: F-19, F-350, F-356 (F-19 repeats F-350's fork and join points; all three give the grain of 16).
- Declared domains under walk: F-26, F-27, F-252, F-253, F-257, F-274, F-375, F-405 (rows 539, 1134 shared).
- `comprises` reading: F-29, F-171, F-175, F-72, F-145, F-76.
- Shape mismatch at dispatch: F-20 and F-154 (row 254 and the message).
- Cold-cache check of library operators: F-269, F-119, F-155 (row 341, `elemwise_nat_probe`).
- Bare `Nothing`: F-21, F-184, F-167.
- Native exceptions and division by zero: F-24, F-299, F-306, F-308, F-312, F-336.
- Bound `Any` on the compiled path: F-291, F-292, F-296, F-289.
- Class loader: F-18, F-25 (one mechanism, two claims); F-18 and F-129 on size descriptors.
- Component initialization and numerals: F-348, F-347, F-340.
- Native wrappers: F-301, F-298, F-309, F-106.
- Transactions and exits: F-351, F-401, F-373, F-374.
- Java baseline: F-355, F-356, F-357, F-358.
- Typecheck command's library: F-9, F-381, F-296.

## Entries that the search could not settle

- F-19's "walk makes each block a task" and F-348's clauses on top-level initializers and unnamed imports: unsettled by the followups; no other entry holds them.
- F-20's "no optimization uses a size": unsettled (checker-1 followups); F-40 holds the measurement it rests on.
- F-11's "no such kernel compiles yet": no source checked it against F-352, F-358 and F-396, which run a compiled `Array1` loop against the one library.
- F-27's `GenericBesidePlain*.fss` tests: the scout found them only under `compiler_tests/`; which walk tests the entry means is not settled.
- F-28's residual (11 of 18 type classes without a case) and F-17's empty cache have no ledger row; the search found no other entry for either.
