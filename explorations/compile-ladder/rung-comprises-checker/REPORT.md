# Rung Y: the 2012 reading of `comprises` in the checker (climb batch 7C, `rung-comprises-checker`)

problem: the count stage's `FortressLibrary` api row of 2 is one error counted twice, the compiled checker's refusal of `AnyIntegral`'s clause at `Library/FortressLibrary.fsi:436` ("its immediate subtype Integral is not eligible to extend it"), which stops the api before its overloading and return-type checks (ledger row 459; `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-preedit.txt:5`, `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-preedit-errors.txt:7`)
spec: `Documentation/Specification/Prose/Language/types.tick:384-390` with `:277-283` (the later Types chapter, cited beside `Specification/` where it covers a topic: POSITIONS 2026-09-26, the lineage note) and `Papers/Welterweight/grammar.tick:21-22`; `Specification/basic/` is against the edit in the draft note at `Specification/basic/traits.tex:236-240`, a `\note` that rung X revises, and reads the clause at the type level at `Specification/basic/types-vals-vars.tex:600-604` (on rung X's list); its rendered rule for a plain extender is kept, the `Molecule` example at `Specification/basic/traits.tex:264-280`
precedent: `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64`, the narrow form with its switch, itself verbatim from `explorations/perf-probes/nat/shadow.patch:911-938`; the rule it extends is Sukyoung Ryu's `isEligibleToExtend` (`360905925`), stated by the team at `ProjectFortress/compiler_tests/Compiled10.i.fss:13-21`
deviation: the switch `aicwNarrow` is gone, so the disjunct reads `(!tt.getArgs.isEmpty && everyKnownSubtypeListed(tt, comprises, analyzer))` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:261-262`); the shadow's provenance comment is replaced by a one-sentence doc comment (`:273-274`); the comment above `isEligibleToExtend` gains the rule's fourth case (`:252-255`); the shadow's two other switches (the broad form and the instance rule) and `extendsSomeInstance` are not taken (`explorations/compile-ladder/rung-comprises-checker/probes/shadow-vs-landed.txt`); against the specification's spelling, the rule applies to every generic subtrait, the decision's "generic child", not only to one "with static parameters the closed trait does not have", as the judgement's proposed text words it (`explorations/reviews/anyintegral-comprises-judgement.md:105`)
historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:247-287`

## 0. What was inherited, and the file itself

Nothing was inherited. At the start the branch held no commit past the base `715816bdd` and the worktree no edit (`git log`, `git status`). Every capture below is this session's.

The harness refused this session's write of `REPORT.md`, so this text is the structured result's `reportText`. `record.md` was written and committed. The lists handed to Pavol are also `explorations/compile-ladder/rung-comprises-checker/probes/lists-for-pavol.txt`.

## 1. The answers this rung follows

Section 1 of the batch record asks one question, Q1, whether the batch runs alone or inside batch N's first run; it changes nothing here. Read from the record and followed:
- the count is declared as measured on the base: 75, which is the prediction, 10 plus 65;
- the hole a program's own integer type opens is a new row, home 3, its capture already on file (row 487, the number the gather kept);
- row 459 closes.

## 2. Where the fix belongs

The map's row for `comprises` (`explorations/coordinator/map/spec-to-implementation.md:194`) places the check in `TypeHierarchyChecker.scala`, on the compile path only. Walk holds the clause and never enforces it (`types/FTypeTrait.java:40-80`, the same row). The static checker never runs under walk (FACTS, "The static type checker (Scala, scala_src/typechecker/) runs only on the compile path").

The refusal is made at one place. `checkDeclComprises` calls `isEligibleToExtend` at `TypeHierarchyChecker.scala:203-208` and reports "is not eligible to extend it" when it is false. `isEligibleToExtend` has no other caller: a grep of `ProjectFortress/src` finds only that call and its own recursion at `:267-268`.

So the fix is a checker rule. It cannot be a library line, because the library's clause is what the team meant: their comment on the line reads "not yet: `comprises Integral[\I\] where [\I\]`" (`Library/FortressLibrary.fsi:434`). It cannot be in walk, which checks nothing here.

The count stage never saw the api's later checks because `StaticChecker.java:268-272` returns on any earlier error before the overloading check at `:275`. That is not this rung's to change: the count stage checks a copy of that file.

## 3. Precedent search: how the team put an unlisted trait between a closed trait and its listed types

The rule is Ryu's of 2009-04-17 (`360905925`, "[static checker] Implemented comprises relationship checking"). Its three cases are the team's own statement in `ProjectFortress/compiler_tests/Compiled10.i.fss:13-21`, pinned by `XXX10i.test`.

The tree admits an unlisted intermediate trait in four ways:
1. **Case 3, the intermediate trait's own clause.** In `Compiled10.i.fss:29`, `trait S extends Ttt comprises { O, P }` is eligible because each entry of its own clause is. This is not open to `Integral`. The later Types chapter lets a generic trait's clause list only types it determines (`types.tick:277-283`), which for `Integral[\I\]` means its parameter.
2. **The self-type idiom.** `comprises I`, with the filter at `TypeHierarchyChecker.scala:267` (`:262` on the base) dropping the type variable (Ryu's `3a8ad3b67`; the compiler library's `Library/CompilerAlgebra.fsi:16`, `:24`). Refused by route A (POSITIONS 2026-09-24), and it overflows walk (row 407).
3. **The 2008 clause on `Integral[\I\]`.** Refused by the listed-type check at `:220-242`, five "does not extend Integral[\I\]" errors (row 459's text).
4. **Ryu's 2009 deletion of the clause**, leaving the "not yet" comment (`3d2849cef`; `.fsi:434`).

The revival wrote the accommodation twice, both times as a shadow behind a switch:
- the zero probe's `explorations/perf-probes/nat/shadow.patch:911-938`, broad and narrow;
- the ways note's `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64`, the narrow form re-applied verbatim.

The decision names the narrow form, and that is what was followed. The method body is character for character the shadow's (section 6).

**Counting sites.** The eligibility rule is applied at one call site (`:204`) and one recursion (`:267`). The message is written once (`:206-208`). Two other rules in the same method are separate from this one and are not this rung's: the listed-type check (`:220-242`) and the ellipsis rule (`:209-212`, row 354). No second site in the file needs the same repair.

## 4. What the specification settles

**`Specification/`**, the standard, is against the edit for a generic subtrait, in four places:
- The rendered text says a listed reference "is a declared trait identifier" (`Specification/basic/traits.tex:163-165`). Victor Luchangco's note beside it asks "Does it include instantiations of parametric traits?" (`:166-170`), and the text never answers.
- The draft note says "the traits listed in its comprises clause are exactly the traits that immediately extend T" (`:236-240`). It is a `\note`, which a release build renders as nothing (`Specification/fortress/fortress.tex:35-36`). It restates Ryu's rule.
- The rendered `Molecule` example forbids a plain trait the clause does not list to extend the closed trait (`:264-280`).
- `Specification/basic/types-vals-vars.tex:589-604` reads a clause at the type level: "any subtype of both S and T must be a subtype of V".

**The later Types chapter and Welterweight** read the clause as a statement about values. The Types chapter says "An instantiation of the generic type defined by such a declaration is covered by the union of the types in this set and the corresponding instantiations of the generic type in this set" (`Documentation/Specification/Prose/Language/types.tick:384-390`). The set holds only types and generic types the declaration determines (`:277-283`), so `AnyIntegral` may list the five and may not list `Integral`. Welterweight says "no value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`). Its D-Trait asks each listed type to be a subtype of the trait and asks nothing of the traits that extend it (`Papers/Welterweight/fig-wellformeddecls.tick:38-62`).

**Which governs.** The type group's later word weighs more (POSITIONS 2026-09-23). The Types chapter is cited beside `Specification/` where it covers a topic (2026-09-26, the lineage note). Pavol took the 2012 reading (2026-09-28, `AnyIntegral`'s `comprises` clause, "Option 1."). Rung X brings `traits.tex:234-246` into line, and `types-vals-vars.tex:589-604` is on X's list.

**What the edit enforces of that reading.** For a generic immediate subtrait, it enforces the value condition over the types the checker sees: at least one known type extends it immediately, and each such type is below a listed type.
- A plain unlisted extender is still refused, as the `Molecule` example says and `XXX10i` pins.
- A generic subtrait with no known extender is refused (the guard's first arm). Under the coverage reading its clause is vacuously true of today's values. The rule asks for evidence because any later unit may extend such a trait. This is the decision's "at least one" (the judgement, section 3, the text rung X takes).

## 5. The tests, the recorded failure and the recorded pass

**`ProjectFortress/compiler_tests/ComprisesGenericSubtrait.fss` and `.test`** (`link`, `run`, `run_out_contains=PASS`). The file holds two shapes:
- The library's `AnyIntegral` and `Integral` shape, in names of the test's own: `trait AnyWhole comprises { SmallWhole, LargeWhole }`, and `trait Whole[\W extends Whole[\W\]\] extends AnyWhole`, which each listed trait implements at itself (`trait SmallWhole extends { AnyWhole, Whole[\SmallWhole\] }`). Objects sit below the listed traits.
- `zElig2`'s shape beside it: `trait Closed comprises { Listed }`, a generic `Tagged[\X\] extends Closed`, and `trait ListedTagged extends { Listed, Tagged[\ZZ32\] }` with an object.

Three asserts run a generic function over `Whole` at both listed types and a `typecase` on `Closed`. Their messages cite `types.tick:384-390` and `grammar.tick:21-22`.
- **Recorded failure**, on the base (`explorations/compile-ladder/rung-comprises-checker/probes/pre-edit-tests.txt`): the link is refused with two errors, "AnyWhole has a comprises clause but its immediate subtype Whole is not eligible to extend it" and the same for `Closed` and `Tagged`. Two junit failures.
- **Recorded pass**, with the edit (`explorations/compile-ladder/rung-comprises-checker/probes/post-edit-tests.txt`): "link … OK", "run … PASS", "OK (2 tests)".

**The false-list guard, `ProjectFortress/compiler_tests/XXXComprisesGenericUnlisted.fss` and `.test`**, pinned with `compile_err_equals` as `XXX10i.test` pins its own. It has two arms:
- `zElig`'s shape: `Closed comprises { Listed }`, with the generic `Unextended[\X\]`, which nothing extends.
- A second arm added by this rung: `Shut comprises { Named }`, with the generic `Outside[\X\]` extended by `object Stray extends Outside[\ZZ32\]`, not below `Named`. The list is false with a value in hand.

Its runs:
- green before the edit, "Saw expected failure" (`explorations/compile-ladder/rung-comprises-checker/probes/pre-edit-tests.txt`);
- green after it (`explorations/compile-ladder/rung-comprises-checker/probes/post-edit-tests.txt`);
- **red on the broad form**: a deliberate local fix, the disjunct replaced by `(!tt.getArgs.isEmpty)`, the ways note's way 10, rebuilt with `ant compileAll` and the library cache (`explorations/compile-ladder/rung-comprises-checker/probes/broad-red.txt`, the diff in its header). The result was "Saw failure, but did not satisfy compile_err_equals" and "Saw wrong failure", with the compile accepting the program, as FACTS says such a test reports ("An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure").

Under the same broad form the team's `XXX9z` also goes red (`Compiled9.z.fss` from 2 errors to 1), as the ways note measured, and the plain test still passes.

The broad form was undone by `git checkout` of the file, then rebuilt, and both tests passed again (`explorations/compile-ladder/rung-comprises-checker/probes/post-restore-tests.txt`). This is the rung's first `XXX` file, shown red as `explorations/coordinator/climb-batch-workflow.md:32` asks.

The harness driver is `explorations/compile-ladder/rung-comprises-checker/probes/rung-tests.sh`. It runs each `.test` in its own JVM, with its cache entries removed first.

## 6. The edit

In `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala`, 22 lines added and 1 changed, in `isEligibleToExtend` and one new private method beside it:

```diff
@@ -249,12 +249,17 @@
    *  1) S does not have any comprises clause, or (already checked)
    *  2) S's comprises clause contains T's supertype, or
    *  3) T has a comprises clause and every type in the comprises
-   *     clause is eligible to extend S
+   *     clause is eligible to extend S, or
+   *  4) T is generic, and the trait table knows at least one type that
+   *     immediately extends T and each such type is a subtype of a type
+   *     in S's comprises clause
    */
   private def isEligibleToExtend(tt: TraitType, comprises: Set[NamedType],
 				 analyzer: TypeAnalyzer,
 				 errors:JavaList[StaticError]): Boolean = {
     comprisesContains(comprises, tt, analyzer) ||
+    (!tt.getArgs.isEmpty &&
+       everyKnownSubtypeListed(tt, comprises, analyzer)) ||
     (getTypes(tt.getName, errors) match {
@@ -265,6 +270,22 @@
      })
   }
 
+  /** Whether the trait table knows at least one type that immediately extends
+   *  the generic trait 'tt', and each such type is a subtype of a type in 'comprises'. */
+  private def everyKnownSubtypeListed(tt: TraitType, comprises: Set[NamedType],
+				      analyzer: TypeAnalyzer): Boolean = {
+    val subs = analyzer.traits.iterator.toList.collect{ case ti: TraitIndex => ti }.filter(ti =>
+      toListFromImmutable(ti.extendsTypes).exists(tw => tw.getBaseType match {
+        case st: TraitType => st.getName.getText.equals(tt.getName.getText)
+        case _ => false }))
+    subs.nonEmpty && subs.forall(ti => toOption(ti.typeOfSelf) match {
+      case Some(self) => SNodeUtil.getTraitType(self) match {
+        case Some(sub) => comprisesContains(comprises, sub,
+			    analyzer.extend(toListFromImmutable(ti.staticParameters), None))
+        case _ => false }
+      case _ => false })
+  }
+
```

**Against the shadow, line by line.** `explorations/compile-ladder/rung-comprises-checker/probes/shadow-vs-landed.txt` is `shadow-thc.py` run on the base's file and diffed against the landed file:
- the method body (`:275-287`) is identical to `shadow-thc.py:52-63`;
- the disjunct (`:261-262`) is `shadow-thc.py:47-48` without `aicwNarrow &&`;
- the three switch fields, the broad disjunct, the instance rule and `extendsSomeInstance` are absent;
- the only other differences are the two comments.

No switch or system property is left: the diff reads no `ProjectProperties`. The diff against the base touches no other Java or Scala file (`git diff --stat 715816bdd`).

**What the rule reads, for rung X's text and the gather's check.** Line numbers are the landed file's.
- It applies to every generic immediate subtrait, `tt` with static arguments (`:261`), including one the closed trait's clause could list. The decision's words, "a generic child", match this. The judgement's proposed wording, "a trait with static parameters the closed trait does not have", is narrower (`explorations/reviews/anyintegral-comprises-judgement.md:105`, repeated at `explorations/coordinator/CLIMB-BATCH-7C.md:133`).
- The "types the checker knows" are the trait table's (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:99-110`): the unit being checked and every api in its global environment, not another component.
- "Extends it" means names it in its `extends` clause: an immediate extender, trait or object alike, since `TraitIndex` covers both (`ProperTraitIndex`, `ObjectTraitIndex`). The condition then holds of every type below, by transitivity.
- The name is compared by its simple text (`:279`). The extenders of a trait of the same name in another api are counted too. It can refuse a true clause, and it can satisfy "at least one" for a generic subtrait nothing extends, when an unrelated trait of the same simple name in an api of the environment has an extender below a listed type (`explorations/compile-ladder/rung-comprises-checker/probes/skeptic/name-collision.txt`; row 490).
- "Below a listed type" is `comprisesContains`: a subtype of a trait type in the clause, under the extender's own static parameters. A type variable in the clause is skipped.

The rule's result can only turn a refusal into an acceptance: it is a third disjunct, and `isEligibleToExtend`'s value feeds nothing but the error at `:204-208`. Its subtype queries are another matter: they move the body checker's errors on the distance stage, deterministically (section 8, row 488).

## 7. The count stage, before and after

Both runs used `explorations/coordinator/tools/checker-count/run.sh` with private caches.
- The pre-edit run is on the base's build, the `ProjectFortress/build` copied in, whose last source change `3be1fecd7` precedes it.
- The post-edit run is after `ant compileAll`.

| api | pre-edit | post-edit |
|---|---|---|
| `FortressLibrary` | 2 | **132** |
| `RangeInternals` | 18 | 18 |
| every other of the twelve | 0 | 0 |
| **total** | **10** | **75** |
| crash | none | none |
| shadow | matches | matches |

Sources: `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-preedit.txt`, `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-postedit.txt`. The pre-edit table equals batch 7R's landed one (`explorations/compile-ladder/climb-batch-7R/gate/checker-count.txt`) row for row. The rise is 65, which the record's prediction (10 plus 65, 75) meets exactly. The crash row does not change.

The error lists are errlist.py's (`explorations/compile-ladder/rung-comprises-checker/probes/checker-count-preedit-errors.txt`, `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-postedit-errors.txt`). They are compared, positions masked, by `explorations/compile-ladder/rung-comprises-checker/probes/count-compare.py` into `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-compare.txt`:

**Pre-edit against post-edit: 1 gone, 66 new.**
- Gone: the clause's own error, "FortressLibrary.AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it".
- New: the 66. **All 66 are in the ways note's list** (`explorations/reviews/anyintegral-comprises-ways/captures/count/narrow-base.txt`, measured at `81f0151be`), with none new and none missing.

By name, the 66 are the ways note's exactly:

| family | kind | count |
|---|---|---|
| `FORWARD_CMP` | overloading | 19 |
| `IN` | overloading | 7 |
| `lift` | overloading | 6 |
| `seq` | overloading | 5 |
| `juxtaposition` | overloading | 4 |
| `generate` | overloading | 4 |
| `MIN` | overloading | 4 |
| `MAX` | overloading | 4 |
| `ivmap` | overloading | 3 |
| `map` (in `Maybe`) | overloading | 2 |
| `isLeftZero` | overloading | 1 |
| `copy` | overloading | 1 |
| `SQCAP` | overloading | 1 |
| `CMP` | return type | 2 |
| `shift` | return type | 2 |
| `unsigned` | return type | 1 |

That is 61 overloading and 5 return-type errors.

**The ways note's 87 against today's 75: 21 only in the ways note, 9 only today.** Every one of them is in the `RangeInternals` row, none among the 66, and every one is batch 7R's rung J (`3be1fecd7`):
- **12 gone.** The `CAP` overloading errors of `RangeInternals`, which rung J removed. Its record says "The count stage went 22 → 10 (the 12 `CAP` overloading errors)" (`explorations/compile-ladder/rung-ranges-zz32/record.md`, its FACTS entry).
- **9 changed, 9 for 9.** They are respelled with `I` read as `ZZ32` by rung J's respelling (`explorations/compile-ladder/rung-ranges-zz32/respell.py`):
  - `map` in `CompactFullSeqScalarRange` and `StridedFullSeqScalarRange`, 2;
  - `every` and `atMost` return types, 3;
  - `IN` of `RangeInternals`, 1;
  - `openRangeHelper`, 3.
  Each appears in the pre-edit list already.

No count-stage error on the base is left that neither this edit nor a named edit of batch 7R accounts for.

**Per api:** only `FortressLibrary` moved, from 2 to 132, each error counted twice.

## 8. The distance stage, before and after

`explorations/coordinator/tools/distance/run.sh`, run through `run_bg`, each run's scratch directory deleted once its table was captured, `df` read before each. The pre-edit run is `explorations/compile-ladder/rung-comprises-checker/probes/distance-preedit.txt` (815 s; load at start 0.50) and the post-edit run `explorations/compile-ladder/rung-comprises-checker/probes/distance-postedit.txt` (835 s; load at start 3.35). Both ran on nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, JDK 25.0.4, `FORTRESS_THREADS=1`, with the other rung of the batch on the box. `compare.sh` gives (`explorations/compile-ladder/rung-comprises-checker/probes/distance-compare.txt`):

- pre-edit 627, the same as batch 7R's landed table (DISTANCE SAME);
- post-edit **626**:
  - `comprises` 2 → 0 and class H2 2 → 0: the clause's two errors, in the api (`FortressLibrary.fsi:436`) and in the component (`FortressLibrary.fss:650`);
  - `typecheck` 388 → 389 and class BR 10 → 11;
  - unit api `FortressLibrary` 67 → 66;
- the crash rows unchanged, 9 and 9, the same lines.

Sites (`explorations/compile-ladder/rung-comprises-checker/probes/distance-sites-diff.txt`):
- the two H2 errors gone;
- one BR error new: "Function body has type UniqueItem[\T\], but declared return type is BigReduction[...]" at `Library/FortressLibrary.fss:1535`, `BIG SQCAP`;
- the two `BIG ||` errors at `:304` and `:314`, their second candidate's result type printed differently;
- the `Comprehension` return-type error moved from `:3436` to `:3416`.

The record expected by reading that H2's 2 would go and nothing else would move. The BR error at `Library/FortressLibrary.fss:1535`, the two `BIG ||` messages at `:304` and `:314`, and the `Comprehension` site's move from `:3436` to `:3416` are caused by the edit's `everyKnownSubtypeListed` queries, deterministically. The rung's skeptic measured it in four runs (`explorations/compile-ladder/rung-comprises-checker/probes/skeptic/distance-attribution.txt`):
- the landed build read 626 twice, site for site the same (the rung's post-edit run and the skeptic's);
- the base's checker ahead of the build read 627, site for site the rung's pre-edit run;
- the broad form, which clears the same two H2 errors without calling `everyKnownSubtypeListed`, read 625, the pre-edit sites less exactly the two H2 errors.

So removing the H2 errors moves nothing else, and running the narrow rule's subtype queries in the hierarchy pass is what moves the body checker's errors. The families are the ones FACTS, "The true distance to the switch-over", records as moving between setups and not between repeated runs of one setup (`explorations/compile-ladder/rung-result-bounds/probes/distance-AB-any.txt`), and `explorations/coordinator/tools/distance/compare.sh:16-18` reads such a move as variation. The same sites differ on file: `explorations/compile-ladder/rung-tabulate/probes/distance-base-variation.txt:24-29`, `:52-53` (two runs of one tree in two directories, with `BIG ||`'s message and the `Comprehension` site) and `explorations/compile-ladder/rung-exclusion-remainder/probes/distance-variation-post.txt:26` (this same `UniqueItem` error in one of two runs whose libraries differed in two unrelated lines). The mechanism is not established; the candidate is the trait table's memos of `parents` and `excludesClause`, keyed by `TraitType` alone and shared across analyzers (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:81-97`), the skeptic's section 8.

It gets row 488, home 3.

## 9. The ladder subset

The one file whose recorded first error in `explorations/compile-ladder/baseline-2026-09-19/raw/` names this refusal is `tests/atomicList.fss`, for the non-generic `object ListError extends Exception` against the compiler library's `Exception comprises { UncheckedException, CheckedException }`. It was run before and after with the restricted driver, copied as `explorations/compile-ladder/rung-comprises-checker/run-subset.sh` and `explorations/compile-ladder/rung-comprises-checker/subset.txt` with a private `LADDER_ROOT` and without `env.sh`'s `rm` of `/tmp/fortress*rats`.
- Its compile output is byte-identical: three errors, rc 255 (`explorations/compile-ladder/rung-comprises-checker/ladder-pre/results.tsv`, `explorations/compile-ladder/rung-comprises-checker/ladder-post/results.tsv` and their `raw/`).
- None of the ladder's 85 files (`explorations/compile-ladder/climb-batch-7R/gate/ladder/ladder.tsv`) contains `comprises` (grep). A ladder file can therefore move only through the compiler library's clauses, which compiled before the edit and cannot lose an acceptance.

## 10. The name grep (step 7)

Every name the two tests and the edit add was grepped in `ProjectFortress/tests/`, every `*_tests/` directory, `test_library/`, `LibraryBuiltin/`, `Library/` and the whole of `src/com/sun/fortress/` (`explorations/compile-ladder/rung-comprises-checker/probes/names-grep.txt`). No competing declaration was found. `Closed` occurs in a string and a comment. `Tagged` is a `private object` of the `QuickCheck` component (`Library/QuickCheck.fss:937`), which no compiler test imports.

## 11. Every measured defect and its home

- **Row 459, the clause refused: repaired, home 1.** The assertions are `ComprisesGenericSubtrait.fss`'s three, which pass (`explorations/compile-ladder/rung-comprises-checker/probes/post-edit-tests.txt`), and the link that precedes them. The row closes.
- **The false list: not a defect but kept behaviour, guarded.** `XXXComprisesGenericUnlisted` is a gated expected failure that goes red if the rule is broadened (`explorations/compile-ladder/rung-comprises-checker/probes/broad-red.txt`).
- **The hole, row 487: home 3.** A type declared in another unit below a generic subtrait of a closed trait is accepted. The probe and capture are already on file: `explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss` and `explorations/reviews/anyintegral-comprises-ways/captures/probes/user-integral.txt`, with 0 errors on the tree and under both forms. It is not measured again.

  It is not home 2 although the specification's later word settles it. Every value of a closed trait belongs to a listed type (`types.tick:384-390`; `grammar.tick:21-22`). But no gated test can hold that answer today. An `XXX` compile test demands that the compile fail, which the checker does not yet do, and a plain test would pin the wrong answer (FACTS, "The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only").

  The sound check is at an object declaration, where values are made: Welterweight's D-Object (`Papers/Welterweight/fig-wellformeddecls.tick:66-85`), whose premises state no `comprises` condition, so the check is a derived one. It is a candidate for batch 8 or later.
- **The distance stage's BR move, row 488: home 3.** It is caused by the edit's `everyKnownSubtypeListed` queries, deterministically (section 8). The specification says nothing of whether a checker's diagnostics may depend on anything but the program. The captures are the three named in section 8 and the skeptic's `explorations/compile-ladder/rung-comprises-checker/probes/skeptic/distance-attribution.txt`.

The rung measured no other defect.

## 12. Decisions taken in the rung

1. **The comment's new case is appended as 4)**, though the disjunct is evaluated before case 3. This keeps the team's numbering, which `Compiled10.i.fss:15-21` and `checkDeclComprises`' header at `:143-147` also use.

   The alternative was to renumber in code order, which would make the two comments disagree on what "3)" is. A disjunction's order changes no result here: when the new disjunct is true, case 3's `getTypes` is skipped, and for a declared trait that call adds no error.
2. **A one-sentence doc comment on the new method.** It says what the method computes and carries no provenance. The alternative was none, as `comprisesContains` has none.
3. **The guard has two arms**: `zElig`'s shape, and a generic subtrait with a known object extender outside the list. This guards both conditions of `everyKnownSubtypeListed`, `nonEmpty` and `forall`. The alternative was `zElig` verbatim, which guards only `nonEmpty`.
4. **The test's own names, and one file for both accepted shapes.** This follows the record's "and `zElig2`'s shape beside it". The alternative was two plain tests.
5. **The ladder subset is one file**, the only one on file whose first error is this refusal.
6. **Row 488 is opened for the BR move**, following rung D's decision (POSITIONS 2026-09-26) that an output difference the tree shows between runs is a ledger row. The alternative was to leave it to the FACTS sentence that records the families' variation.
7. **The header comment of `checkDeclComprises` (`:143-147`) is not edited.** It restates the rule's three cases and does not name the fourth. The record allows `isEligibleToExtend` with its comment and one method, and an edit outside them is a stop. The point goes to the review (`forPavol`). The team's own statement in `Compiled10.i.fss:15-21`, an existing test, is likewise left.

## 13. Stops

None met:
- **Compiled test verdicts.** No compiled test's verdict changed as far as measured. The 39 with a clause were measured on the shadow with these lines (`explorations/reviews/anyintegral-comprises-ways/captures/ctests/summary.txt`, `explorations/reviews/anyintegral-comprises-ways/captures/probes/switches.txt`), and the gate runs them. The one ladder file run kept its output.
- **Scope of the edit.** No edit outside `isEligibleToExtend`, its comment and the one new method, and no other Java or Scala file.
- **Switches.** No switch or property in the rule.
- **Protected trees.** No line of `Library/`, `ProjectFortress/LibraryBuiltin/`, `interpreter/`, `explorations/run-c4/src/` or `explorations/apl/mg/`.
- **Walk.** No walk output can change: the checker does not run under walk.
- **The count stage.** Every error is accounted for by this edit or by rung J of batch 7R, and the crash row is unchanged (none).

## 14. What comes back to Pavol

- The Scala edit as a diff (section 6).
- The count stage's move api by api: `FortressLibrary` 2 → 132 and nothing else, 10 → 75. The 66 by name against the ways note's list, identical (section 7).
- The new rows 487 (the hole) and 488 (the BR move).

All of this is also in `explorations/compile-ladder/rung-comprises-checker/probes/lists-for-pavol.txt`.

## 15. Machines and timings

nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1`, with the other rung of batch 7C on the box. Each capture's first line or `#machine` row carries its load.

| step | time | load at start |
|---|---|---|
| `ant compileAll` | 67 s, then 24 s and 28 s | 1.36 at the first |
| the library-order cache rebuild, cold (AnyType, CompilerBuiltin, CompilerLibrary, CompilerAlgebra, CompilerSystem) | 106 s (15, 61, 27, 2, 1) | 0.6 to 3.6 |
| the library-order cache rebuild, beside the distance run | 155 s (24, 95, 31, 3, 2) | 3.4 to 3.7 |
| distance stage, pre-edit | 815 s | 0.50 |
| distance stage, post-edit | 835 s | 3.35 |

No timing here is a comparison.
