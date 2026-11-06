# Judgement, chunk c18 (base c124c6b65)

- Row 864: apply. The check passes it (stale pin StaticNativeApp.java:137-141 repinned to :189-193; MethodClosure.java:36 holds).
- Row 883: apply, corrected. The check failed it on the cold read; its correction is exact from its sources and is made: the Notes cell now says `importCollector` parses the component "its `builtinPrimitive` bodies rewritten" (comment at `compiler/Parser.java:159`), and that `readCUFor` calls it "twice in one compile" (callers `GraphRepository.java:438` and `:449`; the row's own counts make four full parses), with `repository/GraphRepository.java:1025` as the path.
- Row 888: apply. The check passes it (CodeGen.java:2032 repinned to :2033; "On the old code" removed).
- Row 892: apply. The check passes it (batch clause removed from the claim, rung C 8833d89c5 in the base; TestCallDiff named as never in the tree, SKEPTIC.md:28).

final.silent: silent.txt's two lines (864 defect, 883 defect), upheld. No closes, duplicates or pairs.
