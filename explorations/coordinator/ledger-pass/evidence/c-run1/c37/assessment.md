# Chunk c37 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 113: rewrite
- scope pass; present meaning fail: "`Library/FortressLibrary.fss:1503`" now names a generator line; `Just[\T\](x:T)` stands at :1640 (evidence, moved). evidence pass (probes in history, outputs quoted); comprehension pass; ownership pass; consistency pass (row 114 is its DUPLICATE pointer).
- Change: the pin re-pointed to :1640. `FOrdinaryObject.java:46-57` and `FTypeObject.java:53-63` unchanged since the row's commit, still the mechanism. Nothing dropped.
- Read beyond evidence: `Library/FortressLibrary.fss:1640`.

## 126: rewrite
- scope pass; present meaning pass; evidence pass (probe g24 in the parent of e879b6a44, output quoted); comprehension fail: the row names no source for "A getter is a method", and does not name row 830, the same rule met by the library; ownership pass; consistency fail: no `siblings:` with 830.
- Change: `siblings: 830`; the specification's note `Specification/basic/traits.tex:438-439` ("Getters must always be called with the special syntax: receiver.getterName") quoted and its section added to the spec cell. Nothing dropped. Area kept `walk`: only walk ran g24 (830's run shows binding on both paths stops at the same names, recorded there).
- Read beyond evidence: `Specification/basic/traits.tex:424-442`.

## 320: rewrite
- scope pass; present meaning fail: pins shifted, "`CodeGen.java:394`" (now :397), "`:3779-3839`" (now :4055-4115), "`NamingCzar.java:1653-1656`" (now :1699-1702), "`Operators.scala:444`" (now :467); evidence pass (XXX test, a compiled test not run here); comprehension fail: "(climb batch 2, rung X)" and "at 052a7c3fe" are batch story; ownership pass; consistency pass (FACTS.md:16, POSITIONS.md:30 agree).
- Change: four pins re-pointed; "(climb batch 2, rung X)" and "at 052a7c3fe" dropped (home: the history's row 320; the fix commit 4e4b80253 and test ExportVarRungX stay).
- Read beyond evidence: CodeGen.java:395-399, 4055-4119; NamingCzar.java:1699-1702; Operators.scala:462-470; Linker.java:66-78; the XXX test file.

## 323: keep
- All six pass. Claim states the walk failure and the compiled answer; controls in notes; probes in the parent of ab067d9b6 (path-gone signal: probe-explained). Spec citations unchanged. No commits touch the area since.

## 474: keep
- All six pass. Thunker.scala:183-217 unchanged since the row's commit; probes in the parent of 84aef6a4f with outputs quoted; "where the elements' types are lost was not traced" is the honest bound. FACTS.md:55 agrees. No lead says the checker's later batches changed it; not measured.

## 830: rewrite
- consistency fail: no `siblings:` with 126, the same rule (a getter reached by naked name) in a test program. Others pass; `Library/Avl.fss:103` unchanged.
- Change: `siblings: 126` added. Nothing dropped.

## 842: rewrite
- scope pass; present meaning fail: "siblings: 801, 816" names two FIXED rows (signal siblings-closed, confirmed: both FIXED); comprehension fail: "at `c3c22817c` and on the rung's head", "on the old code and on the head" are batch story, and the mechanism has no pinned line; evidence pass (XXX test); ownership pass; consistency pass (FACTS.md:130,132 agree).
- Change: siblings dropped (home: rows 801 and 816 themselves, FIXED, and the history); mechanism pinned at `ExportChecker.scala:875-889` (`equalMember`) with `:860-872` (`equalAbstractMember`, which covers only the reverse direction); story dropped (home: history).
- Read beyond evidence: ExportChecker.scala:826-900.

## 878: keep
- All six pass. Driver.java:495, 436-437, 315 unchanged since pin dc571c1f3 (the moved words are function names on other lines); report path names the probe and its output is quoted.
