# Rung T of climb batch 22: String's api and the string objects' missing members

problem: the distance stage's export error names `String` among its 15 entries, "(TraitDecl String at FortressLibrary.fsi:2453.1, due to different method size ..., different excludes clauses for traits)" (`explorations/compile-ladder/gate/distance-sites.tsv:2`), its 10 differences sorted by the planner (`explorations/coordinator/CLIMB-BATCH-22.md:203`); under walk four calls of members the api declares stop (`explorations/coordinator/CLIMB-BATCH-22.md:222-226`)
spec: a matching definition "includes definitions for all declarations other than the methods or fields declared abstract", at the same header (`Specification/basic/components/apis.tex:252-256`); a trait is satisfied by one with the same header, the types of its `excludes` clause in any order (`Specification/basic/components/source-code.tex:373-379`); exclusion is symmetric (`Specification/basic/traits.tex:234-244`)
precedent: the api's `abstract splitWithOffsets()` and `abstract split()`, the team's own lines for members the component's trait never declares (`Library/FortressLibrary.fsi:2498-2499`), and `abstract get` for a member it declares without a body (`Library/FortressLibrary.fsi:2476`, the component's `Library/FortressLibrary.fss:4352`); the bodies after SubString's `balanced` (`Library/String.fss:373-376`), FlatString's `isBalanced` (`Library/FlatString.fss:48`), CatString's `uncheckedSubstring` (`Library/String.fss:148-161`) and SubString's `∈` (`Library/String.fss:431`)
deviation: the component's `excludes` clause loses `AnyList`, the team's own text since `a874948ac` (`Library/FortressLibrary.fss:4336`)
deviation: the api's `excludes` clause gains `Number` and `Char`, where the revival's line named `AnyMultiplicativeRing` alone (`Library/FortressLibrary.fsi:2454`)
historical: `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/String.fss`, `Library/FlatString.fss` (first edit `Library/FlatString.fss:52`)

The branch is `wip/rung-string-members`: the test at `9bc5b69de`, the library at `650263804`. The harness refused the worker's write of this file and of `record.md`; their text is the run's journal.

## 1. What changed and why

The library text is the planner's `rung-T.patch` as it stands, applied by `python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py /home/user/fortress-stringmembers str4h str5 strexcl strbodies` ("applied str4h str5 strexcl strbodies"). `git diff` of the result against the patch, with the `index` lines left out, printed "identical to rung-T.patch". I found nothing to improve in it (section 9, decision 1).

- **The api's String writes `abstract` on nine members** (`Library/FortressLibrary.fsi`):
  - four that the component's trait declares without a body (`Library/FortressLibrary.fss:4337`, `:4348`, `:4381`, `:4408`): `getter size()` (`fsi:2455`), `getter asFlatString()` (`:2460`), `uncheckedSubstring` (`:2482`) and `opr ||(self, c:Char)` (`:2512`);
  - five that the component's trait never declares, nor did it at `a874948ac`: `getter depth()` (`:2459`), `getter isBalanced()` (`:2461`), `verify()` (`:2465`), `rangeContains` (`:2486`) and `balanced()` (`:2502`).

  So String's api now writes 14 members `abstract`, the 5 it had and these 9. The component's trait declares 7 of the 14, none with a body. This is the library's rule for a member that the component leaves without a body (the skill's `library.md`, "Designing a change"). The export check asks no component member for an api member written `abstract` (F-282).
- **String's `excludes` clause is one text on both sides**, `{ Number, Char, AnyMultiplicativeRing }` (`fsi:2454`, `fss:4336`): the component's clause, less `AnyList`. The api cannot name `AnyList` without importing `List`. `AnyList` states the exclusion itself on both of its sides (`Library/List.fsi:55`, `Library/List.fss:86`), and by the specification's symmetry that keeps `String` and `AnyList` exclusive (`Specification/basic/traits.tex:234-244`).
- **The four members those lines ask of the string objects** (written by the planner, taken as written):
  - `CatString`'s `rangeContains(r, c)` (`Library/String.fss:128-133`) asks its two halves over the parts of `r` that fall in each. It splits `r` as its own `uncheckedSubstring` splits a range (`r ∩ first.bounds`, `(r ≪ first.size) ∩ second.bounds`, `Library/String.fss:152-153`). Each half is guarded as SubString's `∈` guards a piece, `(¬ ….isEmpty) AND: ….rangeContains(…)` (`:431`).
  - `FlatString`'s `balanced():String = self` (`Library/FlatString.fss:52`) sits after its getters, since the parser refuses a method among them: 'Field/getter/setter declarations should come before method declarations.' (the planner's second run, `explorations/coordinator/CLIMB-BATCH-22.md:209`).
  - `EmptyString`'s `getter isBalanced():Boolean = true` (`Library/String.fss:286`) and `balanced():String = self` (`:333`).

  The two `balanced` bodies answer `self`, as SubString's does when it is balanced (`Library/String.fss:373-376`). A flat or empty string is balanced, as FlatString's `isBalanced` says (`Library/FlatString.fss:48`).

The running library has four objects that extend `String`: FlatString, CatString, EmptyString and SubString (`grep -rn -E 'extends.*\b(String|Concatenable|Balanceable)\b' Library/ --include=*.fss`). By reading each object's declarations, each now defines all 14 members the api writes `abstract`.

## 2. The test: its failure on the base and its pass

`ProjectFortress/tests/StringMembersPromisedWalk.fss` is a walk test. It checks:
- CatString's `rangeContains` on a 40-character concatenation, longer than `maxLeafSize`, 32 (`Library/String.fss:576`): over a range in its left half, in its right half, and across both on each side of the join, and on characters outside the range or nowhere;
- `rangeContains` across the halves of a concatenation of two concatenations;
- for `s`, that nested concatenation's substring `2#70`: `'Z' IN s`, `'a' IN s` (at 0 only, outside `s`) and `'9' IN s` (nowhere);
- for the same `s`, `s.rangeContains(36#6, c)` across the join of its base's halves: true for `T` and `u`, false for `y` (three assertions the skeptic added, `SKEPTIC.md`);
- FlatString's `isBalanced` and `balanced()`;
- `isBalanced` and `balanced()` of the EmptyString got from a CatString's `uncheckedSubstring(3#0)`.

Every leaf's characters are distinct, so no assertion rests on row 607's later occurrences.

The failing run, through the harness on the base's code. It ran before any library edit: the tree's library files were the base's, and the edit came at 02:07.

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-members/h1 ProjectFortress/tests/StringMembersPromisedWalk.fss
    # harness-one 2026-10-24T02:04:39Z; tree 64386618b; nproc=4; load 0.06 0.15 0.43; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    com.sun.fortress.exceptions.ProgramError: ... StringMembersPromisedWalk.fss:12:12-37:
    Cannot find definition for method rangeContains given receiver CatString
    Tests run: 1,  Failures: 1,  Errors: 0

The test stops at its first defect. So the other three defects, and `IN` on the substring, were also run on the base before the edit: four scratch programs made of the test's own lines, through the harness in one call.

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-members/h1 <four programs: SubIn, Flat, Empty, EmptyBalanced>
    # harness-one 2026-10-24T02:05:03Z; tree 64386618b; nproc=4; load 0.34 0.22 0.44; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
    Cannot find definition for method balanced given receiver "abc"
    Cannot find definition for method isBalanced given receiver EmptyString
    Cannot find definition for method balanced given receiver EmptyString
    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/String.fss:422:51-91:
    Cannot find definition for method rangeContains given receiver CatString
    Tests run: 4,  Failures: 4,  Errors: 0

In the FlatString program, `flat.isBalanced` passed and `flat.balanced()` stopped. The planner's four programs showed the same four failures on the old code (`explorations/coordinator/CLIMB-BATCH-22.md:222-226`).

The pass, after the edit, with the three string tests beside it:

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-members/h1 ProjectFortress/tests/StringMembersPromisedWalk.fss ProjectFortress/tests/StringPieces.fss ProjectFortress/tests/LongStringTests.fss ProjectFortress/tests/FlatStringSplit.fss
    # harness-one 2026-10-24T02:07:56Z; tree 9bc5b69de; ... cache empty
    OK (4 tests)

In the last run after the last code change, `ant testSystem` (section 6), shard 0 printed ' interpret /home/user/fortress-stringmembers/ProjectFortress/tests/StringMembersPromisedWalk  OK (time = 669ms)'.

## 3. Where the fix belongs, and the precedent search

The fix belongs in the library. String is declared in `FortressLibrary`'s api and component, and its objects in `String.fss` and `FlatString.fss` (`explorations/coordinator/map/spec-to-implementation.md:330`). No Java, Scala or test is wrong: walk reports a missing method because the object lacks it, and the checker reports the api against its component.

The precedent for the same defect in the same trait is climb batch 9's rung S (`1e176516c`). It declared `abstract get(i:ZZ32): Char` and `abstract asDebugStringIndented(indent: ZZ32): String` on String's api, with a body in each of the four objects (`explorations/compile-ladder/rung-string-slips/REPORT.md`, section 4, "Names the api lacked").

The other sites of the defect in `Library/FortressLibrary.fsi`: none left.
- The file has 165 lines written `abstract` at the base (88 at `a874948ac`) and 174 after this rung (`grep -c -E '^\s*abstract '`).
- Of the export error's 15 entries, String's was the only one where an api member lacked `abstract` while its component gives no body (the planner's sort, `explorations/coordinator/CLIMB-BATCH-22.md:189-203`).
- The per-site list after this rung shows no other.

The ways the language and the library offer for the five members the component's trait never declares:
1. `abstract` in the api, with no member in the component. Taken (fork 13), as the api already does for `splitWithOffsets` and `split`.
2. Default bodies in the component's `String`: fork 13's other way, not this rung's. A body there would guess at a representation the trait does not have, and SubString's `balanced` and `isBalanced` already read their base.
3. Bodyless declarations of the five in the component's trait, at the api's headers, which question 1's other reading asks for. Not this rung's (`explorations/coordinator/CLIMB-BATCH-22.md:61-81`).

For CatString's `rangeContains`:
- (a) Ask the halves, splitting the range as `uncheckedSubstring` does. Taken.
- (b) `BIG ∨ [i ← r] (self.get(i) = c)`. This is row 607's stated repair for FlatString and the curator's call; here it would walk every index through `get`'s descent of the tree.
- (c) `c IN self.uncheckedSubstring(r)`, which builds a SubString whose `∈` asks the halves again.

## 4. What the specification settles

- The api's `abstract` lines: `Specification/basic/components/apis.tex:252-256`, quoted above. The component's definitions of the nine are the ones its objects give; the trait itself defines none of them.
- The `excludes` clause: a trait in an api is satisfied by a declaration "that has the same header", where the order of "the types in the extends, excludes and comprises clauses may differ" (`Specification/basic/components/source-code.tex:373-379`). The new clause names Character's type and the number types, which the specification makes exclusive of `String`: "These types are mutually exclusive; no value has more than one of them" (`Specification/basic/types-vals-vars.tex:572-580`).
- The four members: the specification says nothing of `balanced`, `depth`, `isBalanced` or `rangeContains`. `grep -rn -E 'rangeContains|isBalanced|balanced\(' Specification/ --include=*.tex` prints nothing, and `grep -rn -i 'balanced' Specification/` finds only comments and load balancing. Their meaning is in the api's own comments (`Library/FortressLibrary.fsi:2501-2502`, "A balanced version of the receiver").

## 5. The stages

Both stages ran once, on the final code (`650263804`, the library edit; walk's library needs no build). Output went to `tmp/rung-string-members/`, under `nice -n 19`, one stage at a time. Their before is climb batch 21b's landed tables (`explorations/compile-ladder/climb-batch-21b/gate/`) and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`.

**The count stage** started at 02:08:53 and wrote its table at 02:10:24, about 91 s. Machine: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load at start 1.16 0.52 0.50, openjdk 25.0.4.1, `FORTRESS_THREADS=1`.

    $ explorations/coordinator/tools/checker-count/run.sh tmp/rung-string-members/checker-count-postedit.txt tmp/rung-string-members/cc-post
    #total	3
    #locations	3
    #crash	none
    $ diff explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt tmp/rung-string-members/checker-count-postedit.txt
    (no output)

Its three errors are rung R's and item 46's, unmoved:
- `Library/FortressLibrary.fss:1466:39-1483:4`: 'Function body has type OR(I0,O0), but declared return type is O0.'
- `:4395:13-51` and `:4401:13-51`: 'Could not check call to operator BIG MIN'.

**The distance stage** printed '#seconds 222 FortressLibrary 167' and '#machine nproc=4; ...; load at start 11.17 8.79 4.86'; another rung's runs were beside it.

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/rung-string-members/distance-postedit.txt
    DISTANCE SAME   5
    $ python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-string-members/dist-post/errors.tsv
    landed 5 now 5
    export 'are not matched by the declarations': landed 15 entries, now 14
      entry GONE   (TraitDecl String at FortressLibrary.fsi:L, due to different method size @ FortressLibrary.fsi:L, ...

- Every `#kind` row is the landed one ('typecheck 4', 'export 1', 'abstract-method 0'), and '#crash none'.
- Read by row against the per-site list (row 577), the five sites are the landed five at the same locations: `FortressLibrary.fss:12` (export), `:4395`, `:4401`, `:1466` and `List.fss:146`. `diff` of the kind, unit, stage and location columns printed nothing.
- The messages differ in one place only: the export message's `String` entry is gone, and the other 14 entries are word for word the same.
- No site came. In particular, none of the four abstract-method errors that the api lines bring without the bodies came (`FlatString.fss:34`, `String.fss:275` twice, `String.fss:75`; `explorations/coordinator/CLIMB-BATCH-22.md:208`).

## 6. The suites and the ladder subset

The change is library text only, so the skill owes no whole suite. The brief asks for both once after the change (P-124):

    $ ant testSystem
    [junit] Tests run: 174, Failures: 0, Errors: 0 ... Tests run: 164 ... Tests run: 171 ... Tests run: 170, Failures: 0, Errors: 0
    BUILD SUCCESSFUL
    Total time: 5 minutes 16 seconds
    $ ant testSpecData
    [junit] Tests run: 130, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 68.291 sec
    BUILD SUCCESSFUL

That is 679 tests, the landed 678 and the new one, with no failure. The build printed 'Caches /home/user/fortress-stringmembers/default_repository/caches kept'. StringPieces, LongStringTests and FlatStringSplit are among them, green as before.

The ladder subset: no file's recorded first error names anything this change touched. I grepped the baseline's `ladder.tsv` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`) and the newest landed one (`explorations/compile-ladder/climb-batch-21b/gate/ladder/ladder.tsv`) for the four members, the three objects, `String.fss` and `excludes`. The compiled path also links the compiler's prelude, not this library.

As a check I ran the ladder's four string programs, with the gate's drivers copied under `tmp/rung-string-members/ladder/` and the seeded caches copied twice. Each kept its baseline's phase and first error:
- `matchingStringMarks.fss`: pass (landed: pass);
- `LongStringTests.fss`: disambiguate, 'Char is undefined.';
- `StringTests.fss`: disambiguate, 'ImmutableArray is undefined.';
- `ObjectToStringTest.fss`: codegen, 'emitDesc of type Object failed'.

The 52 team demos are not run here: the brief gives them to the gather, on the merged tree (fork 20).

## 7. Old against new

- `StringMembersPromisedWalk`: old, the failure above; new, green.
- The four scratch programs: old, the four failures above. Their lines are the test's, which passes on the new code.
- A probe of row 607's reach, on the new code only (`bin/fortress CatRangeFirstOccurrence.fss`, a scratch program; on the old code the call stops, as above). For `cat = "abcdefghijklmnopqrsa" || "ABCDEFGHIJKLMNOPQRST"`:

      cat.rangeContains(10#10, 'a') = false
      cat.rangeContains(15#10, 'a') = false
      cat.asFlatString.rangeContains(10#10, 'a') = false
      'a' IN cat[10#20] = false

  The `a` at 19 lies in each range. So CatString's new `rangeContains` answers what its FlatString leaf answers, which is row 607's first-occurrence miss (section 10, and `record.md`'s rewrite of row 607).

## 8. Sentences made false

- **The specification: none.** `grep -rn -E 'rangeContains|isBalanced|balanced\(|CatString|FlatString|EmptyString' Specification/ --include=*.tex` prints nothing. Appendix I has no entry on String's members or its api (`grep -n -w String Specification/appendices/changes.tex` names `Nothing[\String\]` and `toString` only). Part IV is generated from the api at build time (`Specification/library/default-libraries.tex:25-27`), so it will render the nine members `abstract` and the clause `excludes { Number, Char, AnyMultiplicativeRing }`. It needs no edit.
- **The record:**
  - F-83: "`String` has an entry, among other declarations, in the `FortressLibrary` component's export error for declarations that differ from the api's: among its differences, its `size` method and its `excludes` clause" (`explorations/coordinator/FACTS.md:77`).
  - F-282: "the `FortressLibrary` export error names 15 traits and objects ... `String` (P-155)" (`explorations/coordinator/FACTS.md:118`).

  On this tree the entry is gone and 14 remain. Their rewrites are in `record.md`.
- **The skill:** `.claude/skills/fortress-repo/SKILL.md:100` gives an example cache entry, 'It starts `(Component @"/home/user/fortress/Library/FlatString.fss":12:1~156:2 ...`'. FlatString.fss has two more lines, so the span is now `12:1~158:2`.
- **Row citations** that the edit moves (lines only, claims unchanged) are listed in `record.md` for the gather.

## 9. Decisions

1. **`rung-T.patch` taken as it is.**
   - Not taken: writing CatString's `rangeContains` another way (section 3, (b) and (c)); placing FlatString's `balanced` elsewhere (among the getters the parser refuses it, the planner's second run).
   - Evidence: the patch's text follows the library at every line (section 1). The planner measured it at distance 0 with the other rungs (`explorations/coordinator/CLIMB-BATCH-22.md:210-211`). On this tree alone it gives the predicted drop from 15 to 14 entries (section 5).
2. **The five never-declared members by `abstract` in the api alone**, with fork 13 and question 1 at their defaults.
   - Not taken: default bodies in the component's trait; bodyless declarations in the component (question 1's option 2).
   - Evidence: F-282; `explorations/coordinator/CLIMB-BATCH-22.md:61-81`.
3. **The `excludes` clause as the component's less `AnyList`** (fork 14).
   - Not taken: keeping `AnyList` in the component, which leaves the entry 'different excludes clauses for traits'. Having the api import `List.{AnyList}`, as it imports `String.{StringStats}` (`Library/FortressLibrary.fsi:16`): that puts `List`'s api under the prelude's for one name whose exclusion `AnyList` already states. Writing the api's old text `{ AnyMultiplicativeRing }` into the component, which would drop `Char`; only `String`'s clause excludes `Char`.
   - Evidence: `Library/List.fsi:55`, `Library/List.fss:86`; `Specification/basic/traits.tex:234-244`.
4. **One test file for the four defects**, named by its topic, `StringMembersPromisedWalk`, with each leaf's characters distinct so that row 607 cannot decide an assertion.
   - Not taken: four test files (the brief asks for one test); an `XXX` test (no defect is deferred).
   - The other three defects' failures on the base were shown through the harness by scratch programs of the test's lines (section 2).
5. **No demo run here**, against `tests-running.md`, "Outside the gate", which asks it of an edit of the interpreter's library. The brief gives the 52 demos to the gather on the merged tree (fork 20).
6. **Row 607 rewritten, not noted.**
   - Why: a note of its new reach would take the row past 1,200 characters (it is at 1,167). The edit also moves both of its line citations: `Library/FlatString.fss:115` to `:117`, and SubString's `∈` to `Library/String.fss:426-436`. The rewrite states the gap as it stands.
   - Not taken: a note (refused by the template); no change (the row's lines would be wrong).
7. **The long runs under `nice -n 19`, one at a time**, as `session.md` asks beside a batch. Otherwise the brief's command lines were used as given.

No decision of the curator is crossed. Question 1 and row 607's repair stay the curator's.

## 10. Defects, each with its home

| Defect | Home | Where |
|---|---|---|
| CatString has no `rangeContains` under walk | 1 | `StringMembersPromisedWalk`; NEW-T-1, opened and closed (fork 16) |
| FlatString has no `balanced` | 1 | the same |
| EmptyString has no `balanced` | 1 | the same |
| EmptyString has no `isBalanced` | 1 | the same |
| `c IN s` stops in the library for a substring of a concatenation of concatenations (`Library/String.fss:422` at the base), by the first defect | 1 | the same |
| String's export entry: the api's bodyless members without `abstract`, five not in the component, the `excludes` clauses differing | 1 | the distance stage's per-site list, the entry gone (section 5) |
| `s.rangeContains(r, c)` stops in the library for a substring of any concatenation (`Library/String.fss:430` at the base, SubString's `rangeContains`), by the first defect; measured and asserted by the skeptic (`SKEPTIC.md`) | 1 | the same |
| Row 607's first-occurrence miss, now reached through CatString's `rangeContains` too | 3, its row | row 607, rewritten (`record.md`); the new route is not asserted, since row 607's repair is meant to change it |

The four take home 1 because the specification settles that a component defines every non-abstract api member (`apis.tex:252-256`), and this change repairs them. They are one row, NEW-T-1, because one cause makes all four: the api declares members that the objects lack.

## 11. Points to report

- **`rung-T.patch` taken as it is** (decision 1). The bodies: CatString's `rangeContains` (`Library/String.fss:128-133`), FlatString's `balanced` (`Library/FlatString.fss:52`), EmptyString's `isBalanced` (`Library/String.fss:286`) and `balanced` (`Library/String.fss:333`).
- **The four defects.** Before: 'Cannot find definition for method rangeContains given receiver CatString', '... balanced given receiver "abc"', '... isBalanced given receiver EmptyString', '... balanced given receiver EmptyString', and the first again at `Library/String.fss:422:51-91` for `IN`. After: `StringMembersPromisedWalk` green (section 2).
- **The distance and the export entries.** Distance 5 to 5, `DISTANCE SAME`. Export error 15 entries to 14, `String`'s gone, nothing new. Count stage 3 to 3, its table identical (section 5).
- **The count stage's seconds:** about 91 s (02:08:53 to 02:10:24), under `nice -n 19`, load at start 1.16. The distance stage took 222 s under load 11.
- **The api's declarations that change, and so Part IV.** These become `abstract` (`Library/FortressLibrary.fsi:2455-2512`): `getter size()`, `getter depth()`, `getter asFlatString()`, `getter isBalanced()`, `verify()`, `uncheckedSubstring`, `rangeContains`, `balanced()` and `opr ||(self, c:Char)`. String's clause `excludes { AnyMultiplicativeRing }` becomes `excludes { Number, Char, AnyMultiplicativeRing }` (`:2454`). Part IV renders both.
- **Walk values beyond the four:** none moves.
  - By reading, each new body is reached only by a call that stopped before. `SubString`'s `balanced` reaches its base's only when the base is unbalanced (`Library/String.fss:373-376`), which a flat or empty base never is. `SubString`'s `∈` and `rangeContains` reach CatString's only through a CatString piece or base.
  - The excludes change leaves `String` and `AnyList` exclusive.
  - No test's verdict changes: 679 interpreter tests and 130 examples, no failure (section 6).
- **The new row:** NEW-T-1, its test `ProjectFortress/tests/StringMembersPromisedWalk.fss`.
- **Sentences made false:** none in the specification; F-83's and F-282's String sentences; the skill's example span (section 8).
- **Files edited beyond those named:** none. The edited files are `Library/FortressLibrary.fsi` (String's ten lines), `Library/FortressLibrary.fss` (one line), `Library/String.fss`, `Library/FlatString.fss`, `ProjectFortress/tests/StringMembersPromisedWalk.fss`, and this folder.

## 12. Greps for competing declarations

`grep -rn -E '\b(rangeContains|isBalanced|balanced|StringMembersPromisedWalk)\b' ProjectFortress/tests ProjectFortress/*_tests ProjectFortress/src/com/sun/fortress/` finds only calls of the library's members (`LongStringTests.fss:31-82`, `StringPieces.fss:74-131`) and a Java comment (`useful/BATreeEC.java:15`, "A balanced, applicative tree"). No declaration competes with the four members or the test's name.

## 13. Commands worked out

- The other defects' base failures: scratch programs of the test's lines, run through the harness in one call before the edit: `harness-one.sh $PWD/tmp/rung-string-members/h1 tmp/rung-string-members/before/StringMembersBefore{SubIn,Flat,Empty,EmptyBalanced}.fss`.
- The per-site comparison by row: `diff <(tail -n +2 explorations/compile-ladder/gate/distance-sites.tsv | cut -f1,4,5,6) <(tail -n +2 tmp/rung-string-members/dist-post/errors.tsv | cut -f1,4,5,6)`. The messages, entry by entry: `cut -f7 | sed 's/), (/),\n(/g'` on both.
- A ledger row linted before handing it over, without writing the ledger: `python3 explorations/coordinator/tools/ledger.py check --rows FILE`.
- The ladder subset: a `subset.txt` of four lines, `tests<TAB>matchingStringMarks.fss` and the three others, with the drivers of `gate.md`, "The ladder regression", step 1; then `run-subset.sh`, then `classify.py`.
