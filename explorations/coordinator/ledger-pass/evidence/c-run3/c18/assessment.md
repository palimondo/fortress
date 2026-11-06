# Assessment, chunk c18 (base c124c6b65)

## Row 864: rewrite
- scope: pass. One defect, one path (walk).
- present meaning: pass. 93884be8d changed StaticNativeApp (javaForSelf(FType), declaringComponent for the library's FlatString) but not where the self check runs; `find(s, defn, declarer)` still refuses at `StaticNativeApp.java:189-193`, reached from closure creation.
- evidence: fail on the pin. "`interpreter/glue/StaticNativeApp.java:137-141`, at d1228e1f0": d1228e1f0 is not in the base's history, and lines 137-141 are now `declaringComponent`. Repinned to :189-193 at c124c6b65. The reproducer is a plain passing test; it asserts the defective half (a program with no instance loads, prints 'loaded'), so it reproduces the "not at load" claim; the new notes say so, so a reader does not take it as a fix's test.
- comprehension: pass.
- ownership: pass (walk's loader).
- consistency: pass. FACTS.md:134 states the same departure.
- Read beyond the evidence: StaticNativeApp.java:90-200, MethodClosure.java:25-45, the test file, `git show --stat 93884be8d`.
- Dropped: nothing. Added one sentence on what the reproducer asserts.
- silent.txt: defect.

## Row 883: rewrite (pin and path only)
- scope, present meaning, comprehension, ownership, consistency: pass (FACTS.md:133 agrees). Parser.java:111/117/132/156-159 and GraphRepository.java:1025 hold at the base; `macroParse` is called at GraphRepository.java:823.
- evidence: fail, mildly: "(`Parser.java:117`)" and "(`:132`)" are ambiguous between compiler/Parser.java and parser_util/instrumentation/Parser.java, and no commit pins the mechanism. Rewritten as `compiler/Parser.java:117`, `compiler/Parser.java:132`, and "at c124c6b65". The reproducer `none` carries the instrumented-copy method and its counts; it is not a tracked probe, so it stays `none`.
- Dropped: nothing.
- silent.txt: defect.

## Row 888: rewrite
- scope, comprehension, ownership, consistency: pass.
- present meaning: pass. forTry at CodeGen.java:2022-2035 still emits the table entry before the body.
- evidence: fail on the pin: ":2032 at 97a416b18" now reads a blank line; the call is at :2033. Repinned at c124c6b65.
- notes: "On the old code a probe ..." tells a code-era story; now "A compiled probe of the test's two functions printed ...". The probe outcome stays as the mechanism's evidence.
- Dropped: the words "On the old code"; the fact (the probe's output) stays; the era is in the history's old line.

## Row 892: rewrite
- scope, ownership, consistency: pass.
- present meaning: fail: the claim says "after climb batch 25's rung C", a batch story in the claim; rung C (8833d89c5) is in the base, so the claim now reads "compiles and runs on the compiled path".
- evidence: fail: `TestCallDiff.fss` was never a tracked path; the notes now say so and point to the probe's description, `explorations/compile-ladder/rung-codegen-walls/SKEPTIC.md:28`. No commit since 8833d89c5 names a refusal of test calls, and a search of the checker for the chapter's rule found none.
- notes: "On the old code the compile stops at row 823's guard, 'Don't know how to compile this kind of FnDecl. node = t():()'; on the rung's code" is a repair story of row 823, now FIXED. Dropped; its home is row 823 (FIXED, its own history) and this row's old line in the history.
- Dropped: the old-code guard message (home: row 823 and the history).

No closes, duplicates, measures or pairs. No overlaps were found for any row.
