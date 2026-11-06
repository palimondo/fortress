# Check of c13 (run c-run2), base c124c6b65

mech.md: 11 lines, 0 failing. No closes, no duplicates, no silent rows. Citations below were opened at the base with `git show c124c6b65:PATH`.

## Row 790: FAIL (cold read)
- Fidelity: holds. `NamingCzar.java:779-803` writes `result[i]` for each entry with no test for a repeat; `PreDisambiguationDesugaringVisitor.java:102-103` replaces a clause naming only Any with `{Object}`.
- Nothing lost: `NamingCzar.java:733-755` is the stale pin, replaced by `:779-803` (false at the base).
- Failure: the passage "writes one JVM interface for each entry and checks for no repeat" reads both ways, as the cold reader says ("checks that there is no repeat" contradicts the crash). Source: `NamingCzar.java:779-803`, which has no such check. Correction: replace "and checks for no repeat" with "and does not check for a repeat". Optional, same line: "the pre-disambiguation desugaring" -> "the pre-disambiguation desugaring (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java`)", if it fits.

## Row 889: pass
- `CodeGen.java:6024` is the tuple branch's `generateTypeReference(..., null, ...)`, `:6051` the arrow branch's; `NamingCzar.java:1720` dereferences `id_or_op`. Dropped tokens (`:5774`, `CodeGen.java:5747`, `compiler/NamingCzar.java[:1720]`) are the stale and short forms of these pins. The batch phrase is gone. The cold reader's "what does walk do" does not stop a worker on a code-generation crash.

## Row 366: pass
- `MethodInstantiater.java:119-132` folds the opr parameters into the stem (`oprArgAnnotatedRTTI`) and calls `RTTI_FACTORY` unconditionally; the non-generic branch takes `RTTI_SINGLETON` (`:141`). F-39 and `perf-probes/nat/size-probes.md` section 5 say the three `ONLY` lines ran the program and the gated test was not run.
- Nothing lost: the CodeGen `"factory"` list, `:5756/:5783/:5822-5823/:5831` and `OpArg` were a shape "not verified to be this path"; home is history row 366 (the OpArg skip stands at `CodeGen.java:6100`, inside row 406's cited range). "once repaired, `stringOps.typeName` renders the stem verbatim" is false by size-probes section 5 (the fix printed walk's spelling `Op[\+\]`); dropped rightly. `❮+❯` stays in the claim.

## Row 404: FAIL (cold read)
- Fidelity holds; probe path given with how to read it; siblings 850 added rightly.
- Failure 1: the cold reader cannot tell what the fix is ("refuse variance in the checker, or build it"); a worker would stumble the same. Passage: "Future work (POSITIONS, "The `covariant` keyword is future work")". Source: POSITIONS P-62, "The future work is declaration-site variance, carried to run time on both paths". Correction: replace that passage with "Fix: declaration-site variance carried to run time on both paths, future work (P-62)" (shorter, which frees room).
- Failure 2 (Nothing lost): `AltEveryContraObject.fss` is dropped; its home is only history, and the reader cannot name the twin. Correction: with the room from failure 1, write "and its contravariant twin `AltEveryContraObject.fss` beside it".

## Row 406: FAIL (cold read)
- Fidelity holds: `TypeAnalyzer.scala:544-552` (`cP`, "Todo: Handle bool args" at `:546`, `case _ => pFalse()` at `:550`); `CodeGen.java:6086` `BoolArg` branch falls to the throw at `:6108`. `row 402` (FIXED) dropped, home history. Siblings 768, 850 right.
- Failure: the reader cannot tell whether the program should be refused or compile, because the fix's "decision on what code generation emits" reads as if this clause should compile. Source: FACTS F-48 (two literal sizes do exclude and the checker refuses them) and FACTS.md:64 (row 406 is a part of P-40 still to build). Correction: after "passes the checker" in the notes' fix, say what is meant: "Fix: a `bool` case in `cP` beside the size case, so the checker refuses the clause as it refuses two literal sizes (F-48); and, for one boolean instantiation in an `extends` clause, a decision on what code generation emits." Also "returns no exclusion" -> "counts as no exclusion" (F-48's words).

## Row 414: FAIL (cold read, small)
- Fidelity holds: `TypeHierarchyChecker.scala:297` calls `definitelyExcludes(st, other)`. Dropped `:216` is the stale pin; `Box[\ZZ32\]`/`Full[\ZZ32\]` run clause has its home in row 489 and history row 414; the Odd sentence is in `pairs.txt` for the reconcile.
- Failure: "Walk prints both (row 371)" is unclear (both what). Correction: "Walk runs both programs (row 371)". And "accepts in this class" -> "accepts by the same gap".

## Row 850 (measure): FAIL (question)
- Keep is right: CONTESTED stays, pins unchanged since 501140f96, no settlement. The first program and its outcomes are sound.
- Failure: the second program puts the overloading half behind a call, `run() = println(f(DC))`. If the checker takes the two `f` as excluding (the row's claim), the call `f(DC)` still has two applicable declarations, neither more specific, and is refused as ambiguous at the call; the questions file maps that outcome to "the overloading half is false", the wrong line. Source: the skill's dispatch rule (the checker accepts two overloads only if they exclude, one is more specific, or a third covers their meet) and `questions.md`'s second outcome. Correction: make `P850f`'s `run() = println("REACHED")` (declarations only, no call). Outcomes: compiles -> the overloading half holds; refused at the declarations for a missing meet (or as overlapping) -> the overloading half is false, the claim rewritten to the extends half. The call `f(DC)` may be a third, separate observation, recorded in the notes and mapped to no status.

## Row 768: FAIL (cold read)
- Fidelity holds: `ExportChecker.scala:671-678` compares only `STypeArg` and `SIntArg` pairs; header `:73-78`. Dropped `:636-643` stale pin; `row 737` closed, its fact kept. Repair story gone.
- Failure: "so such a declaration that leaves it out takes none" has no clear antecedent. Correction: "A component declaration with such a parameter type that leaves out its return type takes none from the api, since one is taken only from the api declaration whose parameter types are equal by the same `equalTypes`; the export check refuses it either way."
- Note for the judge, not a failure: the header at `:74` also lists IntArg as "ignored", though `:675-676` compares it; "as the team's header lists BoolArg, OpArg, DimArg and UnitArg" is selective but true.

## Row 769: pass
- `existsMatching` at `:431-437`, called at `:290`; `source-code.tex:356-361` holds the union rule. Siblings 834, 835 right; 737 closed.

## Row 834: pass
- Only the pin changed; `:431-437`, `source-code.tex:356-361` and `:413-418` hold their words. CONTESTED kept. The cold reader's points (class word, `P782Api`) do not stop a worker: row 827 is named.

## Row 835: FAIL (cold read)
- Fidelity holds: `uncoveredDeclarations` collects `SDeclaredFunction` only (`:613-620`); `OverloadingChecker.scala:848-852` filters likewise; `ExportChecker.scala:251` calls `coverOverloading`; `bb3925156` is in the base's history.
- Failure: "a named function was refused alike" reads as then or now. Correction: "Before `bb3925156` the check skipped operators: the program compiled and a client's call through the api printed PASS, and a named function was refused then as now."

## Row 836: pass
- `equalStaticParams` at `:654-662` compares `nameL, nameR`; `equalFnHeaders` at `:632-645` reads it. CONTESTED kept; "on the base" replaced by "before `bb3925156`".
