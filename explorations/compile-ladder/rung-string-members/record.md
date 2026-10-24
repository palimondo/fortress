# Rung T (`rung-string-members`): record lines for the gather

Climb batch 22, rung T. The branch is `wip/rung-string-members`: the test at `9bc5b69de`, the library at `650263804`. `<T>` below stands for the landed commit of the library edit. NEW-T-1 is the placeholder for the new row.

## Findings

1. **Under walk, four members that the api's `String` declares were missing from the string objects that should define them.**
   - The claim: `CatString` had no `rangeContains`, `FlatString` no `balanced`, `EmptyString` neither `balanced` nor `isBalanced`. Each call stopped with 'Cannot find definition for method ... given receiver ...'.
   - Conditions: this holds at the base `64386618b` and, by reading, in the team's tree at `a874948ac` (the same declarations).
   - The fourth case: `c IN s`, where `s` is a substring of a concatenation of concatenations, stopped inside the library. SubString's `∈` (`Library/String.fss:422` at the base) asks each piece of its base, a CatString, for `rangeContains`.
   - The fifth case, which the skeptic measured and asserted: `s.rangeContains(r, c)` for a substring `s` of any concatenation stopped too. SubString's `rangeContains` (`Library/String.fss:429-430` at the base) asks its base, a CatString: 'Library/String.fss:430:9-64: Cannot find definition for method rangeContains given receiver CatString' (`harness-one.sh` on the old code, `SKEPTIC.md`).
   - Evidence: `harness-one.sh` on the base, 02:04:39Z and 02:05:03Z: 'Cannot find definition for method rangeContains given receiver CatString', '... balanced given receiver "abc"', '... isBalanced given receiver EmptyString', '... balanced given receiver EmptyString', and 'Library/String.fss:422:51-91: Cannot find definition for method rangeContains given receiver CatString'.
   - The repair: `Library/String.fss:128-133`, `:286`, `:333`; `Library/FlatString.fss:52`. Test: `ProjectFortress/tests/StringMembersPromisedWalk.fss`, green.
   - Meaning: every string object now answers every member the api writes `abstract`.
2. **String's export entry is gone.**
   - The claim: the api's `String` now writes `abstract` on the nine members its component's trait leaves without a body (`size`, `asFlatString`, `uncheckedSubstring`, `opr ||(self, c:Char)`) or never declares (`depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`) (`Library/FortressLibrary.fsi:2455-2512`). Its `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides (`fsi:2454`, `Library/FortressLibrary.fss:4336`).
   - Effect: the distance stage's export error loses `String`'s entry, and nothing comes.
   - Evidence: `compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/.../errors.tsv` printed "export 'are not matched by the declarations': landed 15 entries, now 14" and "entry GONE (TraitDecl String at FortressLibrary.fsi:L, ...". `compare.sh` printed 'DISTANCE SAME 5'. The count stage's table is byte for byte the landed one, '#total 3'.
   - Conditions: rung T's tree alone. The merged count is the gate's.
   - Meaning: the export error's zero now waits only on rung E's 14 entries. It holds under question 1's default reading of `abstract` (row 816).
3. **CatString's new `rangeContains` carries row 607's miss.**
   - The claim: it answers what its flat halves answer, so it misses a later occurrence of the character as FlatString's does.
   - Evidence: a probe on the new code (`bin/fortress CatRangeFirstOccurrence.fss`), for `"abcdefghijklmnopqrsa" || "ABCDEFGHIJKLMNOPQRST"`, printed 'cat.rangeContains(10#10, 'a') = false' and 'cat.rangeContains(15#10, 'a') = false', where the `a` at 19 lies in both ranges.
   - Conditions: under walk, after this rung.
   - Meaning: row 607's repair at the leaf repairs this route too.
4. **Dropping `AnyList` from `String`'s `excludes` clause leaves the two exclusive.**
   - The claim: `AnyList` states the exclusion itself (`Library/List.fsi:55`, `Library/List.fss:86`), and exclusion is symmetric (`Specification/basic/traits.tex:234-244`).
   - Evidence: walk's suite shows no load refusal and no failure, 679 tests. The distance stage shows no new site.

## FACTS.md

A new entry, under "The checker and the one library":

- **The api's `String` writes `abstract` on every member that its component's trait leaves without a body or does not declare, and every string object defines them.**
  - Members: `Library/FortressLibrary.fsi:2453-2528` writes 14 of String's members `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. The component's trait (`Library/FortressLibrary.fss:4335-4445`) declares 7 of them, none with a body, and leaves out `depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`, `splitWithOffsets` and `split`. FlatString, CatString, EmptyString and SubString each define all 14 under walk.
  - Exclusion: String's `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides. `AnyList` states its exclusion of String itself (`Library/List.fsi:55`).
  - Result: `String` has no entry in the `FortressLibrary` export error. A compiled client's call of one of the seven members the component's trait does not declare is row 816's case.
  - Gated by `ProjectFortress/tests/StringMembersPromisedWalk.fss` and by the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`, sections 1, 2 and 5.

Entries made wrong, for their rewrite:
- **F-83.** Its sentence "`String` has an entry, among other declarations, in the `FortressLibrary` component's export error for declarations that differ from the api's: among its differences, its `size` method and its `excludes` clause (`compile-ladder/rung-export-align/REPORT.md` section 5). That site is `FortressLibrary`'s, and it clears with that export error (`reviews/array-sites-ways.md`, section 4)." is false after `<T>`.
  - Proposed: "`String`'s api writes `abstract` on the members its component's trait leaves without a body or does not declare, and its `excludes` clause is the component's (the new entry), so `String` has no entry in the `FortressLibrary` export error."
  - Evidence: compare-sites.py, 'entry GONE (TraitDecl String ...'.
  - Its row-607 sentence stays true, with the reach added by finding 3.
- **F-282.** Its "the distance's export error, still one site, names 15: ... `String` (P-155) ..." is false after `<T>`: on rung T's tree alone it names 14, String gone. The merged tree's count is the gate's.

## Ledger

New row (section "10. Strings, maps and printing"), to be added and then closed by `<T>` with the test `ProjectFortress/tests/StringMembersPromisedWalk.fss` (fork 16):

| NEW-T-1 | **under walk, string objects lack members the api's `String` declares**: `CatString`'s `rangeContains`, `FlatString`'s and `EmptyString`'s `balanced`, `EmptyString`'s `isBalanced` stop, 'Cannot find definition for method', and so do a substring's `rangeContains` and `IN` that reach a `CatString` | NEGATIVE-VERIFIED | library bug (library) | `basic/components/apis.tex`, "Component and API Identity" | `ProjectFortress/tests/StringMembersPromisedWalk.fss` | climb batch 22 rung T | At 64386618b the api's `String` declared `depth`, `isBalanced`, `verify`, `rangeContains` and `balanced` (`Library/FortressLibrary.fsi:2459-2502`), the component's none, and `CatString` (`Library/String.fss:75`), `FlatString` (`Library/FlatString.fss:34`) and `EmptyString` (`:275`) lacked the four. Through the harness at the base: '... rangeContains given receiver CatString', '... balanced given receiver "abc"', '... isBalanced given receiver EmptyString', '... balanced given receiver EmptyString', and the first at `Library/String.fss:422:51-91` for `'Z' IN` a substring of a concatenation of concatenations (SubString's `∈`), at `:430:9-64` for a substring's `rangeContains`. |

(Linted with `ledger.py check --rows` with a numeric placeholder in its # cell: '0 fail the template'.)

Row 607: its whole new line, for `ledger.py rewrite 607`. It states the gap as it stands after `<T>`, with the line citations the edit moves (`Library/FlatString.fss:115` to `:117`; SubString's `∈` to `Library/String.fss:426-436`; Generator's comment, now at `Library/FortressLibrary.fsi:853-854`). It also adds the CatString route (finding 3). A note would take the row past 1,200 characters. Linted: '0 fail the template'.

| 607 | **`FlatString.rangeContains` finds only the first occurrence of the character**: under walk `"abca".rangeContains(3#1, 'a')` answers `false`, and so do `'a' IN` a substring whose `a` lies past the string's first and a `CatString`'s `rangeContains` through its flat halves | NEGATIVE-VERIFIED | library bug (library) | silent | `ProjectFortress/tests/StringPieces.fss` | climb batch 9 rung S's skeptic | `self.javaIndexOf(c) ∈ self.bounds[r]` (`Library/FlatString.fss:117`, 650263804) misses a later occurrence in `r`: `'a' IN sub` is `false` for the substring `aabcd` of `("a"^20) \|\| "bcdefghijklmnopqrstu"` at `18#5`, through SubString's `∈` (`Library/String.fss:426-436`), and `cat.rangeContains(10#10, 'a')` for `"abcdefghijklmnopqrsa" \|\| "ABCDEFGHIJKLMNOPQRST"`, through CatString's (`:128-133`). The answer: Generator's comment (`Library/FortressLibrary.fsi:853-854`). `StringPieces.fss` pins two `false`s. Repair: `BIG ∨ [i ← self.bounds[r]] (self.get(i) = c)`, the curator's (`explorations/compile-ladder/rung-string-slips/JUDGE.md` section 2). full text: history, row 607 |

Citations that the edit moves, line only, each row's claim unchanged (old at 64386618b, new at `<T>`):
- Row 387: `Library/String.fss:508` to `:517`.
- Row 674: `Library/FlatString.fss:115` to `:117`; `Library/String.fss:301` to `:309`.
- Row 611: `Library/String.fss:318` to `:326`.
- Row 316: `Library/String.fss:569` to `:578`.
- Row 823: `Library/String.fss:328` to `:337`.
- Row 138: `Library/FlatString.fss:101` to `:103`.
- Row 141: `Library/FlatString.fss:150` to `:152`.

`Library/FortressLibrary.fsi` and `.fss` keep their line counts.

## Handover line

Climb batch 22 rung T (rung-string-members), branch `wip/rung-string-members` at `650263804`:
- String's api writes `abstract` on its nine bodyless or undeclared members, and its `excludes` clause is one text, `{ Number, Char, AnyMultiplicativeRing }`;
- CatString's `rangeContains`, FlatString's and EmptyString's `balanced` and EmptyString's `isBalanced` are written;
- NEW-T-1 is opened and closed by `StringMembersPromisedWalk`;
- distance 5, the export error 15 to 14 entries (String's gone), count 3, '#crash none'; the count stage about 91 s;
- testSystem 679 and testSpecData 130, no failure;
- row 607's reach through CatString recorded in its rewrite.

## Revival change

**The change.**
- **The team's text.**
  - The team's api for the interpreter's prelude declared these members of `String` without `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `uncheckedSubstring`, `rangeContains`, `balanced` and `opr ||(self, c:Char)` (`Library/FortressLibrary.fsi`, its `trait String`, at `a874948ac`).
  - The team's component's `trait String` declared four of them without a body and never declared `depth`, `isBalanced`, `verify`, `rangeContains` or `balanced` (`Library/FortressLibrary.fss:3955` on, at `a874948ac`).
  - Its string objects lacked four of the members: `CatString` had no `rangeContains`, `FlatString` no `balanced`, and `EmptyString` neither `balanced` nor `isBalanced` (`Library/String.fss:75`, `:270` and `Library/FlatString.fss:34`, at `a874948ac`).
  - So, by reading, the team's walk stopped on `c.rangeContains(r, x)` for a concatenated `c`, on `"abc".balanced()`, and on the empty string's `isBalanced` and `balanced()`.
  - The team's component's `excludes` clause was `{Number, Char, AnyMultiplicativeRing, AnyList}` (`Library/FortressLibrary.fss:3956` at `a874948ac`); the team's api's `String` had none.
- **What the tree does now.**
  - The api writes the nine `abstract` (`Library/FortressLibrary.fsi:2455`, `:2459-2461`, `:2465`, `:2482`, `:2486`, `:2502`, `:2512`).
  - String's clause is `excludes { Number, Char, AnyMultiplicativeRing }` in the api and the component (`Library/FortressLibrary.fsi:2454`, `Library/FortressLibrary.fss:4336`).
  - The objects define the four: `CatString`'s `rangeContains` asks its halves over the parts of the range in each (`Library/String.fss:128-133`); `FlatString`'s and `EmptyString`'s `balanced()` answer `self` (`Library/FlatString.fss:52`, `Library/String.fss:333`); `EmptyString`'s `isBalanced` is `true` (`Library/String.fss:286`).
  - Test: `StringMembersPromisedWalk`. The distance stage's export error no longer names `String`.
- **Departures.**
  - The component's trait does not declare `depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`, `splitWithOffsets` or `split`. After the switch-over, a compiled client's call of one of them on a String is row 816's case.
  - `CatString`'s `rangeContains` answers what its flat halves answer, so it misses a later occurrence of the character, as `FlatString`'s does (row 607).
- **The reason.**
  - The specification: "A matching definition of a declaration $d$ is a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$. The header and type of $d'$ must be the same as the header and type of $d$." (`Specification/basic/components/apis.tex:252-256`).
  - The compiled checker refused the api against its component: '(TraitDecl String at FortressLibrary.fsi:2453.1, due to different method size @ FortressLibrary.fsi:2455:5-24, ..., Asbtract method size @ FortressLibrary.fss:4337:5-24 is not declared in the API, different excludes clauses for traits)'.
  - Under walk the four calls stopped, through the harness on the earlier code: 'Cannot find definition for method rangeContains given receiver CatString', and the same for `balanced` on "abc" and on EmptyString, and for `isBalanced` on EmptyString.
  - Exclusion is symmetric (`Specification/basic/traits.tex:234-244`), and `AnyList` excludes `String` itself (`Library/List.fsi:55`).

**Provenance.**
- F-83 and F-282.
- P-27, and the library's rule for a member the component leaves without a body (the `fortress-repo` skill's `library.md`, "Designing a change").
- The batch record's forks at their defaults: 13 (`abstract` in the api), 14 (one `excludes` text), 15 (the four bodies) and 16 (one row opened and closed).
- Question 1 at its default, option 1: no component member for an api member written `abstract` (row 816).
- The planner's `rung-T.patch`, taken as written.
- Climb batch 22, rung T.
