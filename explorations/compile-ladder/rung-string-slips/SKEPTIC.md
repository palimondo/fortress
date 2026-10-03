# Rung S, climb batch 9: the skeptic's first judgement

Judged head: `3f829ce884d5962af623b19a8e366aa1d2da7d51` (branch `wip/rung-string-slips`).

**Verdict: refused.** The one thing that must change: the range-end reads the rung wrote turn a strided slice of a string, which the base refused loudly, into wrong characters. The precedents the rung cites for them read the stride, and the rung dropped that part.

## 1. The refusal: strided slices

The rung replaced `r1.lower` and `r1.upper` with `r1.left.get` and `r1.right.get` in `FlatString.uncheckedSubstring` (`Library/FlatString.fss:64`). In SubString it replaced `range.lower` with `range.left.get` and `seq(range)` with `seq(range.left.get # range.extent.get)` (`Library/String.fss:376`, `:383`, `:400`, `:407`, `:429`, `:455`, `:461`, `:472`, `:476`, `:479`, `:491`). REPORT.md section 4 says "so the values are the same". That holds only for a compact range. `lower` and `upper` are `CompactFullRange`'s getters (`Library/FortressLibrary.fss:3969-3970`), so on the base a strided range raised. On the head it answers ends that ignore the stride. String's own indexing passes a strided range on unchanged: `opr[r0]` calls `narrowToRange` then `uncheckedSubstring` (`Library/FortressLibrary.fss:4170-4173`), and `CatString.uncheckedSubstring` wraps it in a SubString (`Library/String.fss:153`).

Programs of mine, run under walk on the head and in `/home/user/fortress-strings-base`, where `cs = ("a"^20) || "bcdefghijklmnopqrstu"`:

    $ bin/fortress SkStride.fss                       (head)
    range [0,2,4] ilk StridedFullParScalarRange extent Just(3) |r| 3 left Just(0) right Just(4)
    cs[18:24:2] = [aabcdef] SubString size 4 |s2| 4
    flat[0:4:2] = [abcde] FlatString
    $ FORTRESS_HOME=/home/user/fortress-strings-base .../bin/fortress BkStride.fss   (base)
    com.sun.fortress.exceptions.ProgramError: .../Library/FlatString.fss:64:40-46:
    Cannot find definition for method upper given receiver StridedFullParScalarRange

    $ bin/fortress SkS2half.fss    -> half [bcdefghijkl]          base: the same ProgramError at FlatString.fss:64
    $ bin/fortress SkS2write.fss   -> write [abcdef]               (writeOn of cs[18:24:2]; base: the same ProgramError)
    $ bin/fortress SkStget1.fss    -> get1 a                        (cs[18:24:2].get(1); base: "Cannot find definition for method lower", String.fss:467)

The specification makes `a:b:c` the set `{a, a+c, …}` (`Specification/basic/expressions/ranges.tex`, section "Ranges"). So `"abcdef"[0:4:2]` is `"ace"`, `cs[20:30:2]` is `"bdfhjl"`, and `cs[18:24:2]` is `"abdf"`. On the head the last of these is a SubString of size 4 that flattens to seven characters (`aabcdef`), writes six (`abcdef`) and answers `'a'` at index 1. A loud failure has become a quiet wrong value that does not even agree with itself.

The library's own way is on record in the very precedents REPORT.md cites. `List`'s `opr[n:Range[\ZZ32\]]` reads `r.left.get` and `|r|` only under `if r.stride = 1`, and otherwise selects element by element (`Library/List.fss:146-151`). The arrays' `opr[r:Range[\ZZ32\]]` reads `|r'|`, `r'.left.get` and `r'.stride` and passes the stride on (`Library/FortressLibrary.fss:2290-2295`, `:2515-2521`). Under walk the List device answers the specification's set:

    $ bin/fortress SkListStride.fss
    list[0:4:2] <|a, c, e|> list[1#3] <|b, c, d|>

The rung cites `List.fss:148` and `FortressLibrary.fss:2516` and leaves out the stride. That does not follow POSITIONS' "The library's own practice is the standard." The compiled path cannot express the case: its String has only `substring(lo, hi)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:42`), and it has no strided range (row 514). So this is outcome 2 of rule 4: the specification settles against the head's walk, and the defect is the rung's own.

What the repair must do. It reads the stride as those precedents do. The smallest place is String's `opr[r0]`, the one entry point, using List's device there (`if r1.stride = 1 then self.uncheckedSubstring(r1) else` a selection by element, the way `reverse` builds a string with `BIG ||`, `Library/FortressLibrary.fss:4283`). The other way is a guard at each reader. Or the repair keeps the strided case loud and holds the specification's answer in an XXX test (home 2). `StringPieces` gets assertions for a strided slice of a flat string and of a CatString: their characters, and that size, flat form and written form agree. Each assertion cites ranges.tex, section "Ranges", and each is shown failing at this head (`"abcde"`, `"bcdefghijkl"`). Whichever answer the repair gives is a walk value change, the record's reserved stop, and it is listed.

## 2. Check 3: the stage as the test

- Checker count. The landed `explorations/compile-ladder/climb-batch-8/gate/checker-count.txt` and the worker's `tmp/rung-string-slips/checker-count-postedit.txt` are identical (`diff` of the sorted files is empty): `#total 56`, `#crash none`. The report declares 56 and none, in agreement.
- Distance. Read with `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-8/gate/distance.txt tmp/rung-string-slips/distance-postedit.txt`:

      DISTANCE DOWN   565 -> 496 (-69)
          class SF 22 -> 0 (-22), CV 10 -> 2 (-8), NM 54 -> 29 (-25), GF 10 -> 4 (-6), I3 7 -> 5 (-2), OT 183 -> 177 (-6), X1 10 -> 9 (-1), BR 10 -> 11 (+1)
          unit component String 69 -> 8, FlatString 6 -> 1, FortressLibrary 276 -> 273

  This is what REPORT.md section 8 says. BR +1 lies outside the rung's files and inside the stated variation of 2 to 4.
- Per site. The landed list holds 78 sites in String, FlatString and Stream, and 12 in `FortressLibrary.fss:4129-4290`. Six of those are excluded by the record's section for S: the two `asString` sites of the symbolic families, upto's and beyond's `BIG MIN`, and row 560's `:4287` and `String.fss:426`. That leaves 84. In the after list (`tmp/rung-string-slips/after-classified.tsv`) 14 of them remain: `String.fss:330`, `:332`, `:334`, `:336`, `:435`, `:436`, `:476`; `Stream.fss:70`, `:71`, `:12`; `FlatString.fss:12`; `FortressLibrary.fss:4139`, `:4140`, `:4154`. Each carries a provisional row (587, 589, a note on 585). REPORT.md section 8 lists the same 14.
- Order in the transcripts. In `agent-a016f9a2c67378efc.jsonl`, `StringPieces.fss` was written at 23:26:23 and failed through `harness-one.sh` at 23:26:50 on the unedited tree ("Library/String.fss:293:15-80: Unification error"). It was committed alone at 23:27:25 (`9261317e9`), and the library edits begin at 23:28:00. In `agent-ab01060e653ba6064.jsonl`, the added assertions failed on the base copy at 23:55:43 ("FAIL: J20/0:aaaaaaaaaaaaaaaaaaaa =/= a Char: a") and were committed alone at 23:56:06 (`632fc9d53`). The library commit `dfc7c5d0d` (00:03:42) is the last commit that touches `Library/`. The checker count ran at 00:07:02 on `dfc7c5d0d` with a clean `git status`, and the distance stage started at 00:09 on the same tree. The stages use caches of their own, and a library edit needs no build under walk, so the after tables are of the head's library. The final harness pass (00:13:13) records "tree 0c89ca877", but the message edit that became `3f829ce88` was written at 00:13:06, before it. The run is therefore of the head's test file.

## 3. Other findings

**F2. String's default `CASE_INSENSITIVE_CMP` is reached under walk, and the defect has no home.** REPORT.md section 8 and provisional row 589 say that "no string object runs" the body at `Library/FortressLibrary.fss:4153-4154` and that "no program observes it", so it gets the ledger alone. That is false. SubString's own fallback calls it through `(self asif String) CASE_INSENSITIVE_CMP (other asif String)` (`Library/String.fss:411`). It is taken by every SubString whose base is flat, which is every piece of a substring's `splitWithOffsets`. A FlatString compared with such a piece reaches it as well (`Library/FlatString.fss:78`).

    $ bin/fortress SkSlices.fss      (head; base the same at FortressLibrary.fss:4151 and String.fss:406)
    CICMP piece 0 SubString vs FlatString
    com.sun.fortress.exceptions.ProgramError: .../Library/FortressLibrary.fss:4154:50-59:
    Failed to find any matching overload, args = ('a','a'), overload = { CASE_INSENSITIVE_CMP(self:...String,other:...String) ...

The decision to leave the body ("no string object runs it") rests on that premise. The site is one of the rung's 84 and lies in its section. The library states the answer in its own contracts, `ensures {outcome = (self.asFlatString CASE_INSENSITIVE_CMP other.asFlatString)}` (`Library/String.fss:114`, `:393`), and FlatString's native `cicmp` (`Library/FlatString.fss:76-77`) is the library's case folding. So the repair round has two ways. It can repair the body by that contract, which picks no case folding of its own, and add an assertion that a piece of a substring compares `EqualTo` with its flat form ignoring case. Or it can give the defect a test that pins it, with the row's text corrected.

**F3. `'a' IN sub` answers `false` for `sub = "aabcd"`, and the defect has no home.** `FlatString.rangeContains` is `self.javaIndexOf(c) ∈ self.bounds[r]` (`Library/FlatString.fss:115`). It looks only at the first occurrence of `c` and misses a later one inside `r`. SubString's `∈` and `rangeContains` reach it (`Library/String.fss:416-429`, lines the rung edited).

    $ bin/fortress SkIn.fss          (head; base identical)
    sub [aabcd] SubString a IN sub false b IN sub true a IN flat true
    abca rangeContains 3#1 a false abca[3] a

The library's contract is that "x IN self holds if x is generated by this generator" (`Library/FortressLibrary.fsi:826-828`). The specification's prose is silent on membership in a string (I found nothing in `Specification/basic/` or `basic-lib/`). The rung's test asserts `'b' IN sub` and `'z' IN sub` on this same object (`ProjectFortress/tests/StringPieces.fss:72-73`), and both pass by coincidence. This is a sibling defect in a file of the rung's, measured here. It needs a home: a repair in FlatString with an assertion of `'a' IN sub` (home 1), or a test that pins today's `false` with a ledger row (home 3).

**F4. A test citation names a section that does not say what the message says.** `StringPieces.fss:35-36` cite "objects.tex, section Field Declarations" for "a concatenated string's left getter is String's". That section is about naked field references (`Specification/basic/objects.tex:336-345`). The rule that a field declares a getter of its own name and type is in `Specification/basic/traits.tex`, section "Abstract Field Declarations" (`:641-646`). The spec: line of the provenance block and REPORT.md section 4 cite the getter paragraph of "Method Declarations" (`traits.tex:484-497`) for the same rule; that paragraph is about explicitly declared getters.

**F5. Provenance block lines.** `ConcatGenerator(first, second)` is at `Library/String.fss:262` at the base, not `:260`, which is `end BalancingForest`. "The api's `abstract` members (`Library/FortressLibrary.fsi:2442` at the base)": `:2442` is a doc comment. The abstract members are `:2439-2440` and `:2480`. `r'.extent.get` is at `Library/FortressLibrary.fss:2517`, not `:2516`, and the same precedent reads `r'.stride` at `:2519`. `List.fss:148` belongs to `:146-151`, whose `r.stride = 1` test is the point of F1. The problem, deviation and historical lines check out: all seven files of the 2012 tree the diff edits are named.

**F6. The unreported walk value change.** REPORT.md section 6 says the old and new programs agree "on every line but three". The strided slices of section 1 are a fourth change, from a ProgramError to wrong characters, and the record's stop "a repair that changes a value walk prints" covers it.

**F7. A decision's alternatives.** The String api now gives SubString its constructor header (`Library/String.fsi:28`). No reader outside `String.fss` names SubString (grep of `Library/`, `ProjectFortress/`), so leaving SubString out of the api, which the component may do (`Specification/basic/components/apis.tex`, section "Component and API Identity": the component defines what the api declares), is a third way the decision list does not name. Under walk a client builds `SubString("abcdef", 1#0)` on both trees alike (`ctor SubString isEmpty false size 0 []`), so walk sees no change. Only the checker's view changes. This is not a required correction.

## 4. What holds

- CatString's halves and String's ends answer as on the base. The head's `cs.first` and `cs.second` equal the base's `cs.left` and `cs.right`; `"pq".left` and `.right` are `p` and `q` on both; `EmptyString.left` and `"".left` are `Nothing` on both (`SkHalves.fss`, `BkHalves.fss`). A CatString's `left` and `right` are now its first and last character, as the report lists. Under `traits.tex`, section "Abstract Field Declarations", the field `left: String` declared a getter of type String that overrides String's `getter left(): Maybe[\Char\]`, so the rename is owed.
- Compact slicing through `narrowToRange` in place of `bounds[r0]` (`Library/FortressLibrary.fss:4171`) behaves the same. `SkSlices.fss` gives identical lines on both trees for `flat[2:]`, `[6:]`, `[7:]`, `[:2]`, `[#3]`, `[2#0]`, `[1:3]`, `[4#5]` (raises), `[-1:2]` (raises), `cs[38:]`, `[40:]`, `[41:]`, `[15#10]`, `[39#3]` (raises), `sub[1:]`, `[5:]`, `[1#3]`, `[3#4]` (raises) and `EmptyString[0:]`, `[0#1]`. The same holds for `verify()`, the pieces, the statistics (`minFlat = 0` with an EmptyString inside), rebalancing, `"ab" || sub`, `reverse`, `asDebugString` and `newline = lineSeparator`. The only differences are `EmptyString.get` (now `IndexOutOfBounds`, "0 is outside the range []") and `cs.left`/`cs.right`.
- Threads. StringStats' `var` fields were renamed, so `SkSlices` ran at `FORTRESS_THREADS=1` and `=4` on both trees. The output was byte-identical across the counts (head md5 `894539cd` at 1 and 4, base `ca0e091a` at 1 and 4).
- The compiled path agrees with walk on what it can express. For `SkCmp.fss` (a 40-character concatenation: `|cs|`, `cs[0]`, `cs[39]`, `cs[25]`, `CMP`, `=`, `<`, print) walk and `fortress compile`/`run` on the head both print `40 a u g EqualTo true true aaaaaaaaaaaaaaaaaaaabcdefghijklmnopqrstu`.
- The expected-failure tests are named XXX, have `.test` files with `compile_err_contains`, and carry one comment line citing file and section. Each was shown through `fortress junit` counted as an expected failure and failing on a deliberate fix (`tmp/rung-string-slips/xxx-junit-1.txt`, `xxx-junit-fix.txt`).
- Competing declarations. `Concatenable`, `Balanceable`, `PieceCollector`, `writtenBy`, `piecesOf`, `sizeField` and `minFlatField` occur nowhere in `ProjectFortress/src/com/sun/fortress`, in the corpora under `ProjectFortress/`, or in `Library/` outside `String.fs*` and the new test.
- Q1 is unanswered in the record's answers line for S, and the rung left item 20's bounds as they are.

## 5. Required in the repair round

1. Section 1: the strided slices, with assertions shown failing at `3f829ce88`.
2. F2: a home for String's default `CASE_INSENSITIVE_CMP`, and the report and row 589 corrected.
3. F3: a home for `FlatString.rangeContains`.
4. F4 and F5: the citations.
5. F6: the value changes in REPORT.md section 6 and in stopsMet.
