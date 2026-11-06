# Chunk c9, assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read `Library/FlatString.fss`, `interpreter/glue/StaticNativeApp.java` (lines 40-300) and `interpreter/glue/prim/Util.java` (grep of SS2B, S2V, getString), and grepped POSITIONS for 861 and the specification for FileNotFound.

## 141: keep
Pass on all six. `FlatString.fss:152` is still `split():Generator⟦String⟧ = Nothing⟦String⟧` at the base, and the api text at 2482-2493 holds; 93884be8d touched the file but not `split`. The probe's old path is named with its deleting commit, as the template allows for a `none` reproducer. silent.txt: choice.

## 607: rewrite
- ownership fails: found by "climb batch 9 rung S's skeptic" names a role; now "climb batch 9 rung S".
- evidence: the pin "650263804" is replaced by "at c124c6b65", where line 117 holds the same text.
- comprehension: "Repair: ..., the curator's" now "Fix and workaround: ..., the curator's", the same JUDGE.md pointer.
- scope, present meaning, consistency (FACTS.md:80 and :123 agree) pass. Dropped: the word "skeptic" and the old pin; both in the history.

## 846: rewrite
- consistency fails: rows 877 and 897 name 846 as a sibling, and 846 named neither; it now opens `siblings: 877, 897.`
- To make room the citation of `NativeApp.java:208-212` is dropped (the cited lines, the class load, do not show the hand-over the sentence claims); the sentence's fact stays. Its home: the history, row 846.
- All pins hold at the base (Util.java:254 and :286 are SS2B's and S2V's bodies; StaticNativeApp :70, :178, :282 read as cited). 93884be8d, which names the row, landed before the row's latest line. The gated walk test holds under gate a12ab5c60.

## 857: rewrite
- ownership fails: found by "climb batch 24's planner" names a role; now "climb batch 24". All else passes; pins hold; FACTS.md:137 agrees. Dropped: "planner", in the history.

## 861: rewrite (status stays CONTESTED)
- ownership fails: "climb batch 24's planner"; now "climb batch 24". POSITIONS holds no entry that settles the form of `asExprString`, so the row stays CONTESTED; FACTS.md:138 agrees.

## 872: keep
Pass. The three cited bodies hold unchanged at the base; the gated test holds. The note on `javaIndexOf` answering -1 is a sibling consequence a worker needs.

## 877: rewrite
- evidence fails: the pin `StaticNativeApp.java:54, at dc571c1f3` moved: the `FlatString`/`JavaString` test of `javaFor` is now `:58`, and `unbox`'s `v.getString()` now `:282` (was `:231`). Both pinned at c124c6b65.
- present meaning: 93884be8d changed this file, but only for `self` (`javaForSelf(FType)`, :113-120); a parameter still goes through `javaForParameter` -> `javaFor` by name (:70, :58), read at the base, so the claim stands. The fix sentence now names that function instead of "the probe's way 1".
- comprehension: a workaround added, "give the program's type another name" (binding over `String` is refused at load, row 846).
- Dropped: "on the base and on the shadow" (the probe's two trees); home: the history and the probe's REPORT.md section 4.

## 897: keep
Pass. Cited lines hold at pin c141e7f6a; sibling 846 named. The `e109c9812` sentence is the mechanism's origin, not a repair story. Found-by names a review file, whose name carries a date; left as the stream's name.

## 899: keep
Pass. `Library/Writer.fss:52-53` holds; `:53:54-57` is the run's position, not a line range (the mechanical "gone" is the scratch output path).

## 902: keep
Pass. `FileReadStream.java:43-44` and fileOps :37, :82 hold; sibling 903 named. The "path-gone" signal is the program's missing-file argument, by design.

## 903: keep
Pass. Cited lines hold; sibling 902 named. Class "library gap vs spec" beside a `silent` cell is a mild mismatch, left: the status question for silent rows is review-queue item 265's.

## 904: keep
Pass. simplePrintln :25, :48-50 hold at the pin; the "gone" citations are `System.out` and the review's scratch program, not tree paths.

## Pairs
846 and 877 (this chunk) are siblings at two sites (a glue class's `getString` and the helper loader's name-read parameter), not duplicates; both now name each other. No pair across chunks.
