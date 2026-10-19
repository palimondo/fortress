<!-- Probe of 2026-10-17: the 205 errors that the compiled checker's full overloading check adds to the distance when it reads symbolic operators, sorted by family into known library fixes and design choices. The probe worker, the Opus agent `a9a1ade50bd06d7f9`, returned its report as text, as its brief asked, at 12:41 UTC on 2026-10-17; this is that text word for word, from the session transcript (line 35451) with the harness's indent removed, written here on 2026-10-19 by the coordinating session's record worker in place of the coordinator's condensed text (`e8312aee5`). Its worktree /home/user/fortress-probe-opsort (branch wip/probe-symbolic-sort, at main d212b2c1f) holds the patches and site lists under gitignored tmp/. Earlier probe: ./REPORT.md in this folder. -->

# Sorting the symbolic-operator errors of the full overloading check

## Where and how it ran

- **The worktree.** I worked in my own worktree, `/home/user/fortress-probe-opsort`, on the branch `wip/probe-symbolic-sort`. It is at `main` `d212b2c1f`. Nothing is committed and nothing is pushed.
- **Why not the earlier worktree.** The base build `/home/user/fortress-base16` no longer exists: BOOT.md says it was removed at 18:42 UTC on 2026-10-16. The earlier probe's worktree, `/home/user/fortress-probe-strings`, sits at `d19ade2fb`. That is before batch 16 changed the checker, and it still has way JC applied, uncommitted. So I built my tree with `ant compileAll` (55 s). I only read the old worktree; I changed nothing there.
- **The shadow.** I rebuilt it from the report's text, in `tmp/shadow/src/OverloadingChecker.scala`. The checker's three loops at `:223`, `:370` and `:379` call `isCheckedName`, which admits every `SOp`. `isDeclaredName` is unchanged. I compiled it with scalac into `tmp/shadow/classes`.
- **The library did not change.** `git diff d19ade2fb main -- Library ProjectFortress/LibraryBuiltin` is empty, so the earlier probe's line numbers still hold.
- **Machine rules.** Everything ran under `nice -n 19`, one JVM of mine at a time, and each start was after `free -g` showed at least 12 GB available.

**The distance stage ran once.** I ran a copy of `distance/run.sh` with the shadow class ahead on its class path, on the library as on `main`. It ran from 11:29:43 to 11:33:05 UTC, about 200 s, of which FortressLibrary took 149 s. The machine was 4 CPUs (Xeon, 2.1 GHz), load 3.21 at start, JDK 25.0.4.1, `FORTRESS_THREADS=1`. The result is `#total 253`.

**The instrument for the patches (my decision).** To keep that one run, I measured every patch with a cheaper instrument:
- It is `tmp/run-fast.sh` with `tmp/skip-patch.py`: the same driver and shadow, plus `-Dprobe.skipBodies=true`.
- That flag does two things. It skips the type check of component bodies. It also keeps the component's index instead of rebuilding it, so return types left out still resolve through their thunks.
- **Calibration.** On the unpatched library it gives 212 errors. That is the distance run less exactly its 39 typecheck and 2 wellformed body errors, site for site: 0 new, 0 other gone.
- **What it cannot see.** Body errors are not re-measured under any patch.
- **Cost.** 16 runs of 110 to 152 s each.

## Step 1: the reproduction

Compared site by site with `explorations/compile-ladder/gate/distance-sites.tsv` (the batch 16 gate, 49 errors), with numbers masked:
- **New: 205 errors.** All come from the overloading check.
- **Gone: 1 error.** It is the BIG LEXICO "Function body has type TotalComparison" error, which depends on identity hashes (row 737).
- So 253 = 49 − 1 + 205.

| Family | Earlier probe | Now |
|---|---|---|
| `_[_]` and `_[_]:=` | 107 + 18 | 107 + 18 |
| `^` | 16 | 16 + 5 new (return type) |
| `\|\|` pair, `\|\|\|`, `//`, `///` (String's four) | 10 × 4 | 10 × 4 |
| arrays' and vectors' `+` and `-` | 6 + 3 | 6 + 3 |
| `=` | 4 | 4 |
| `\|_\|` | 2 + 1 | 2 + 1 |
| FlatString's `\|\|` pair | 2 | 2 |
| EmptyString's `\|\|` | 1 | 1 |
| **Total** | **200** | **205** |

**The only real difference is +5, caused by batch 16's rung K.**
- Commit `c23b85fdc` (P-149) made the checker read a type's bodiless functional methods in components too. In `toFunctionalMethodArrows` the filter `!inComponent || body.isSome || !declaredInUnit` was removed.
- So Integral's bodiless `opr ^(self, b:AnyIntegral):RR64` (`FortressLibrary.fss:721`) now meets MultiplicativeRing's `opr ^(self, other:AnyIntegral): T` (`fss:377`) in the overridden-return loop.
- The message, five times (for `I`, ZZ32, ZZ64, NN64 and ZZ): "For ^, the return type of (Integral[\ZZ32\], AnyIntegral)->RR64 ... should be a subtype of the return type of (MultiplicativeRing[\ZZ32\], AnyIntegral)->ZZ32".

**Differences of order only:**
- The three fancy-rule errors name a Vector pair in some runs and a Matrix pair in others, as the earlier probe saw.
- One union prints as `OR(IN,ON)` instead of `OR(ON,IN)`.

**The export check's 2 reproduce.** I ran a second shadow, `tmp/shadowx`, where `isDeclaredName` admits every `SOp`, with the fast instrument. It gives 214 = 212 + 2: List's component and RangeInternals' component.

**Sites.**
- The full list, one row per error with kind, family, unit, sites and message, is `/home/user/fortress-probe-opsort/tmp/new205.tsv`.
- Grouped by declaration pair: `/home/user/fortress-probe-opsort/tmp/sites-grouped.txt`.
- Both are in gitignored `tmp/`.

The subscript errors fall into four shapes:
- `opr[i:I]` beside `opr[r:Range[\I\]]`: 36 + 6 for `:=`.
- `opr[i:I]` beside `opr[_:TrivialOpenRange]`: 36 + 6.
- `opr[r:Range[\I\]]` beside `opr[_:TrivialOpenRange]`: 34 + 6.
- Maybe's pair: 1.

The declarations are `Indexed` (`FortressLibrary.fsi:1296`, `:1308`, `:1309`), `MutableIndexed` (`:1385-1390`), the arrays (`:1408-1477`) and their component bodies (`fss:1998-2229`), and the mapped, reversed and index-value-pair generators (`fss:3753-4300`). They are reported in 20 types. Every message reads "Invalid overloading of _[_] in trait X: (...)->... and (...)->...".

## The table by family

| Family | Errors | Kind | The fix in one sentence |
|---|---|---|---|
| String's four (`\|\|`, `\|\|\|`, `//`, `///`), row 585 | 40 | known fix | Juxtaposition's device (earlier way J): each family becomes three top-level operators, and String's api states Concatenable's and EmptyString's own `\|\|`. |
| FlatString's `\|\|` pair, row 726 | 2 | known fix | Drop `opr \|\|(a:FlatString, self)` from `FlatString.fsi:20`, which the component lacks. |
| EmptyString's `\|\|`, row 611 | 1 | known fix | Add the meet `opr \|\| (self, _:EmptyString): String = self` to EmptyString (`String.fss`), and also to its api when String's four are fixed. |
| `=` | 4 | known fix | Integral declares the meet `opr =(self,b:I):Boolean` (api and component, bodiless like Integral's other operators), and ZZ's api declares `opr =(self, b: ZZ)`, which its component already has. |
| `\|_\|` | 3 | known fix | Maybe declares the meet `opr \|self\| : ZZ32`; SubString's api states the `opr \|self\|` its component has; Float's `\|self\|` returns `RR64`, not `Number`. |
| Maybe's subscript | 1 | known fix | Maybe declares the meet `opr [i:ZZ32]:T throws NotFound`, with Condition's body restated in the component. |
| Vector's and Matrix's top-level `+`/`-` (fancy rule) | 3 | known fix | Delete the api's six top-level Vector and Matrix `+`/`-` (`fsi:1649-1656`, `:1757-1764`), which the component never defines; the traits' own functional methods remain. |
| Subscripts on generic `Indexed` | 124 | design choice | How a subscript overload over an unbounded index type `I` is to be typed. The team's own text calls the pair "not really a valid overloading". |
| `^` | 21 | design choice | This is P1's open question (what a negative power gives). Under the E or Z library text, plus row 445's `AnyIntegral` exponent in the api and Float's meet `opr ^(self, b:RR64)`, all 21 clear. |
| Arrays' scalar `+`/`-` beside AdditiveGroup's | 6 | design choice | Either Vector and Matrix stop being AdditiveGroups, or the checker uses self-type parameters in overload checks, or the scalar extension goes. |
| The export check's 2 (outside the 205) | 2 | unclear | When the export check reads symbolic names it lists as missing declarations that api and component spell alike, word operators included. This looks like a fault of the check, not of the library. |

**Every known fix verified alone,** with the fast instrument (from 212):

| Patch | Count |
|---|---|
| flat | 210 |
| empty | 211 |
| str4 alone | 173: 40 gone, 1 new (EmptyString's `\|\|` refused in String's api) |
| eq | 208 |
| abs | 209 |
| maybeidx | 211 |
| vecops | 209 |
| all seven | 158: exactly the 54 gone, 0 new |
| pow (P1's E/Z text + 4 lines) | 191: the 21 `^` gone, 0 new |
| all seven + pow | 137 |
| p445 (only the 4 lines, no contract) | 204: 16 `^` gone, 8 new return-type `^` |

In the export messages only the order of entries changed, and FlatString's export error lost its `||` half. Its "different extends clauses" half stays; that is F's other line, not part of these families.

**In terms of the full check:** 253 becomes 199 with the known fixes, and 178 with pow too, assuming the 41 body errors do not move. I did not re-measure bodies. The earlier probe's full run of way J (which is str4 plus F) kept the body count and only moved the two `asString` sites. P1's full run of the E/Z text took the gate's distance from 49 to 44.

## One paragraph per family

**String's four (40).**
- The pairs are `(a:Any, self)` beside `(self, b:Any)` in String, at `FortressLibrary.fsi:2494-2514` and `.fss:4397-4429`, reported in 10 places.
- The library's own way is rung M's device for juxtaposition: three top-level operators, `fss:4457`. The text's own shape is to move only `(a:Any, self)`, which the checker refuses (row 545).
- My patch is the earlier probe's way J without F and without the conversion: 13 members leave String in the api and in the component, 12 top-level declarations enter, and String's api gains 5 lines. That is +46/−28 in 3 files.
- Of PLAN item 38's three forms, J/JC is the only one that needs neither a checker change (JH) nor a change in what kind of string walk builds (JCp). The conversion C is a separate question (F-246).
- Walk keeps every value. My `tmp/probe/OpProbe.fss` prints 39 identical lines on base and patch, among them `"s"||"t"`, `5||"s"`, `e||e` (EmptyString), `(1,2)|||"s"`, `//` and `///`, each with the same kind and depth.
- Walk refuses one program differently. `XXXFunctionalMethodMeetOperator` is now refused at load as "first parameters a:[String,Any] and self:[T,ZZ32] are unrelated" (the new `FortressLibrary.fss:4457` beside the program's `||` on a trait that does not exclude String). The test's keys no longer hold. As the earlier probe found, the same refusal now meets any program that declares one of the four as a functional method of such a trait.

**FlatString's pair (2).**
- `FlatString.fsi:17` and `:20` are the same parameter types at two self positions (row 726), and the component lacks `:20`.
- Patch: 1 line removed. Walk could never run the removed declaration.

**EmptyString (1).**
- EmptyString's `||(self, String)` (`String.fss:317`) sits beside Concatenable's `||(self, _:EmptyString)` (`:36`), with nothing at the meet.
- Patch: 1 line, plus 1 line in String's api when str4 is applied. Without it, str4 alone leaves exactly that one new error. This is the only dependency between patches.
- Under walk, `e || e` answers EmptyString before and after.

**`=` (4).**
- Number's `opr =(self, other:Number)` (`fsi:293`, added by the revival's flat tower `d846e3644`) sits beside StandardPartialOrder's `opr =(self, other:T)` (`:180`), in Integral, ZZ and BigNum.
- ZZ32, ZZ64 and NN64 already declare their own meet. ZZ declares it only in its component (`fss:1004`).
- Patch: +3 lines in 2 files.
- Walk is unchanged: the 26 tests that use ZZ or BigNum pass, and `big(3)=big(3)`, `big(3)=3` and `widen(3)=widen(3)` print the same as before.

**`|_|` (3).**
- Maybe: the api's Condition `:921` beside Indexed's `:1294`. In the api, Condition does not extend ZeroIndexed, though in the component it does (`fss:1517`).
- SubString: `String.fsi:28` lacks the `opr |self|` its component has at `String.fss:361`.
- Float: `FortressBuiltin.fss:79` declares `: Number` against RR64's `: RR64` (`fsi:364`).
- Patch: +4/−1 in 4 files. I put Maybe's meet in both units, restating Condition's body, so the export message keeps its entries.
- Walk prints `|Just(7)|`=1, `|Nothing|`=0, `|"abcdef"[1#3]|`=3, and `|-2.5|`=2.5 as a Float, all the same as before.

**Maybe's subscript (1).**
- Condition's `opr [i:ZZ32]` (`fsi:922`) sits beside Indexed's (`:1296`).
- Patch: +2. Just and Nothing still answer, and `Just(7)[0]` = 7 as before.

**Vector and Matrix fancy rule (3).**
- The api declares top-level `+`, `-` and prefix `-` over Vector and Matrix, the team's lines. They repeat the traits' own functional methods (`fsi:1616-1618`, `:1734-1736`; component bodies at `fss:2525-2529`, `:2838-2842`), and the component never defines the top-level ones.
- Patch: 18 lines deleted.
- Walk is unchanged: v+w, w−v, −v, mm+mm, mm−mm, −mm, v+1.0 and mm+1.0 print the same. The 20 Vector and Matrix tests pass.

**Subscripts (124): a design choice.**
- **The team's own word.** The pair is "not really a valid overloading. We want to say that the type variable I extends a type, say, Index which either excludes Range[I] or is a supertype of Range[I]. However, we cannot say that because ... `a[1, 2, 3]` ... the arguments are passed as a tuple ... we need a magic to convert" (`Specification/appendices/future.tex:186-207`, among the team's issues to discuss, 2009).
- **The two shapes with `I` (84 errors) are invalid by the text.** At `I = Object` or `Any`, the range overload is more specific, and its `Indexed[\E,I\]` result is not an `E`.
- **The range beside the trivial range (40 errors) is valid at every fixed `I`.** By the text's instantiation exclusion (`overloading.tex:584-592`), `Range[\I\]` and `TrivialOpenRange` (an `OpenRange[\Any\]`, `fsi:2218`) meet only at `I = Any`, where the trivial one is more specific with the same result. But the text does not say whether a trait's own parameter is fixed by the receiver in this check; the checker ranges it.
- **The compiler's own prelude** has only `ZZ32` subscripts and no range subscripts (`CompilerBuiltin.fsi:41`, `:572-585`).
- **The options:**
  - (S1) An index bound on `I`, the team's own wish. It needs a language rule for tuple indices. It clears 124. The cost is new language on both paths.
  - (S2) The checker checks a generic trait's subscripts at each type that fixes `I`. It clears 124. The cost is a departure from the text, and a user's `Indexed[\E,Any\]` would then be refused at its own declaration.
  - (S3) The checker fixes the receiver's `I` and uses instantiation exclusion. It clears the 40 only.
  - (S4) Separate slicing from indexing, by another bracket pair (the text permits any) or a method. It changes every program that slices; microGPT slices strings (`FlatData.fss:34`, `:54`).
  - (S5) A `where { I excludes Range[\I\] }` clause. That is future.tex's "type variables in excludes clauses" (`:212-221`), which P-151 does not build.
- **Walk.** It already runs every subscript right, choosing by the run-time type. The 147 subscript tests and the 41 subscript-assignment tests pass, apart from ReflectTest.

**`^` (21): a design choice.**
- MultiplicativeRing's api `^(self, other:ZZ64): T` (`fsi:283`) sits beside each integer type's `^(self, b:AnyIntegral):RR64` (`:472`, `:524`, `FortressBuiltin.fsi:110`, `:167`), beside Float's (`FortressBuiltin.fss:156-161`), plus the 5 component return-type errors.
- Of the 21, 16 involve integer types and need the integer power typed at its own type. That forces P1's question, what a negative power gives.
- The other 5 (RR32's 2 and Float's 3) clear with row 445's `AnyIntegral` in the api plus Float's meet, 4 lines. But P1's R and X contracts give the ring a different exponent, so even those lines are not independent of the contract.
- **Measured:** P1's E/Z text plus the 4 lines (+33/−29 in 4 files) clears all 21, with nothing new.
- **Walk.** The E/Z library text alone, without P1's natives, changes nothing: the whole folder gives the same result, and the 40 power tests pass apart from ReflectTest. Walk's values come from the natives. P1 measured that the E and Z natives move only the three team tests with `10^(-k)`.

**Arrays' scalar `+`/`-` (6): a design choice.**
- AdditiveGroup's `+(self, other:T)` and `-(self, other:T)` (`fsi:267-268`, `fss:362`) sit beside the revival's generic scalar extension (`fsi:2694-2700`, `fss:4892-4898`, generalised in `02d09a39f` from the team's ZZ32 block, which by reading had the same overlap).
- For `MIN` and `MAX` the team's device was `excludes { HasRank }` on StandardMin and StandardMax. AdditiveGroup cannot take it, because Vector and Matrix are both arrays and additive groups. The revival's `Array3 excludes AnyAdditiveGroup` comment (`fsi:1809-1815`) says the same for rank 1 and 2.
- **The options:**
  - (A1) The checker uses the self-type rule (`traits.tex:286-302`) together with instantiation exclusion. That widens P-146, which keeps signatures plain.
  - (A2) Vector and Matrix stop extending AdditiveGroup, and arrays exclude AnyAdditiveGroup. This costs `SUM` over vectors.
  - (A3) Drop or rename the scalar `+`/`-`. This changes walk's answers, for example in `ArrayScalarExtension`.
- **Walk.** It runs these right today.

**The export check's 2: unclear.**
- With `isDeclaredName` admitting symbolic operators, two errors are added (List and RangeInternals). FortressLibrary's existing "Missing declarations" message grows from 17 entries to 165.
- The listed entries include word operators the gate's check matches today (AND, OR, XOR, CMP, BIG AND, RangeInternals' `SCMP`/`PCMP`) and declarations that api and component spell alike (`List.fsi:108-116` against `List.fss:177-186`).
- Only List's `BIG <|...|>` result type really differs: `Comprehension[\T,List[\T\],List[\T\],List[\T\]\]` in the api against `...AnyCovColl,AnyCovColl` in the component.
- The team's own comments at `ExportChecker.scala:289-310` call the matching a "Heisenbug".
- **To find out:** trace `existsMatching` and `equalFnHeaders` for RangeInternals' `SCMP` under `tmp/shadowx`, and see why a set that matches with symbolic names skipped stops matching when they are admitted.

## Step 3: walk

The whole `ProjectFortress/tests` folder ran in one SystemJUTest JVM (`tmp/walkfolder.sh`, `FORTRESS_THREADS=4`, seed `1a1449d46e1_16`, about 5 min each):

| Library | Tests run | Failures | Ran |
|---|---|---|---|
| main | 630 | 1: ReflectTest, which fails in one JVM on the base, as the earlier probes saw | 12:21:49 to 12:26:51 |
| the seven known fixes | 630 | 2: ReflectTest and XXXFunctionalMethodMeetOperator | 12:27:09 to 12:32:08 |
| the seven known fixes + pow text | 630 | 2: the same two | 12:33:08 to 12:37:56 |

Per family, by grep, as base then patched:

| Tests that use | Listed | Pass on main | Pass patched |
|---|---|---|---|
| subscripts | 147 | 146 | 146 |
| subscript assignment | 41 | 41 | 41 |
| `^` | 40 | 39 | 39 |
| the four string operators | 60 | 60 | 59 (XXXFunctionalMethodMeetOperator) |
| Vector, Matrix, scalar extension | 20 | 20 | 20 |
| ZZ, BigNum | 26 | 26 | 26 |
| Maybe | 36 | 35 | 35 |
| `\|_\|` and slices | 139 | 138 | 137 |
| EmptyString | 4 | 4 | 4 |

So the only change in walk's answers from the known fixes is str4's refusal at load. `OpProbe` prints identically on both.

## Step 4: totals

| | Errors | Detail |
|---|---|---|
| Known fix | 54 | String's four 40, FlatString 2, EmptyString 1, `=` 4, `\|_\|` 3, Maybe's subscript 1, the Vector/Matrix fancy rule 3 |
| Design choice | 151 | subscripts 124, `^` 21, scalar `+`/`-` 6 |
| Unclear | 0 of the 205 | plus the export check's 2 outside them |

- **Lines.** The known-fix patches together are +57/−48 in 6 files (`FlatString.fsi`, `FortressLibrary.fsi`, `FortressLibrary.fss`, `String.fsi`, `String.fss`, `FortressBuiltin.fss`). Of that, String's four are +46/−28.
- **No conflicts.** Together they clear exactly the sum of their singles (212 to 158). pow on top clears its own 21 (to 137).
- **The one dependency.** String's four need EmptyString's meet in String's api too, the +1 line beyond the singles.

## Where the patches are

All in gitignored `tmp/` under `/home/user/fortress-probe-opsort`:
- The worktree is left with the seven known fixes applied, uncommitted. The same diff is `/home/user/fortress-probe-opsort/tmp/patch-all-final.diff`.
- Each family alone: `tmp/patch-flat.diff`, `patch-empty.diff`, `patch-str4.diff`, `patch-eq.diff`, `patch-abs.diff`, `patch-maybeidx.diff`, `patch-vecops.diff`, `patch-pow.diff`, `patch-p445.diff`.
- The generator: `/home/user/fortress-probe-opsort/tmp/fix.py`, exact-text edits, one set of families per call.

## Decisions

- My own worktree at `main`, built in place, instead of the earlier one: its code predates rung K, and its JC is held for the planners.
- Patches measured with the body-skipping instrument, calibrated against the one distance run, rather than a second distance run.
- The String fix is J, not JC, so the conversion question (F-246) stays apart. F's DelegatedIndexed line is left out, since it adds a `|_|` error.
- Maybe's meets go in both api and component, with Condition's bodies restated, as rung M did for `map`. The alternative was the api's Condition extending ZeroIndexed, which rung M declined.
- Integral's `=` is bodiless, like Integral's other operators.

## Defects and points for the ledger (proposed, not filed)

1. The export check misfires on operators once it reads symbolic names (above). This is a checker defect; there is no reproducer yet.
2. Indexed's subscript overloads are invalid by the text at `I = Object` or `Any`. The team's future.tex says so, and no row covers it.
3. Library slips that only the full check sees:
   - The api's six top-level Vector and Matrix `+`/`-` that the component lacks.
   - ZZ's api missing `=`.
   - SubString's api missing `|self|`.
   - Float's `|self|: Number`.
   - Maybe without the meets.
4. For row 584's notes: the count on today's tree is 205, not 200. The +5 come from rung K, `c23b85fdc`.

## For FACTS

- **The count.** The full overloading check on `main` adds 205 errors, not 200: the 5 new ones are Integral's `^` return type (`fss:721` against `fss:377`), read since rung K. *Command:* the distance stage with the shadow gives `#total 253`. *Detail:* step 1 above.
- **54 have known library fixes.** They clear 54 of the 205: +57/−48 lines in 6 files, with no walk value moved and one walk refusal changed (XXXFunctionalMethodMeetOperator). The other 151 need choices: subscripts 124, `^` 21, scalar `+`/`-` 6. *Command:* `tmp/run-fast.sh` gives 212 on main and 158 with the patches. *Detail:* the table and step 4.
- **The team's word on subscripts.** The team's own text calls `Indexed`'s subscript pair invalid (`future.tex:186-207`). *Detail:* the subscripts paragraph.
- **The export check.** Admitting symbolic names to the export check lists 165 FortressLibrary entries as missing instead of 17, word operators among them. *Command:* `tmp/run-fast.sh` with `tmp/shadowx`, which gives 214. *Detail:* the export paragraph.

## Commands worked out

- **`tmp/run-fast.sh` + `tmp/skip-patch.py`.** The distance driver with `-Dprobe.skipBodies=true` and two edits to the generated shadow `StaticChecker`: skip each component body's check, and keep the primed index. About 135 s, every non-body error.
- **`tmp/sets.sh "name:fam fam" ...`.** Resets the library, applies a set of families, and runs the instrument, one JVM at a time.
- **`tmp/walkfolder.sh LABEL` and `tmp/wfparse.py LOG tmp/lists`.** The whole walk folder in one JVM, and pass counts per grep list.
- **`tmp/sites.py`.** The earlier probe's site-by-site comparison.

## Questions for the curator (decisions not taken)

1. **Subscripts.** How subscripts on a generic `Indexed` are typed: S1 to S5 above. The team's own wish is S1, an index bound.
2. **`^`.** P1's open question: E, Z, R or X. Under E or Z, the 21 clear with 4 lines more.
3. **Scalar `+`/`-`.** A1, A2 or A3 above. A1 would widen P-146.
4. **PLAN item 38, part (a).** It now stands at 54 errors that library fixes clear and 151 that wait on 1 to 3. Part (b), which device String's four take, narrows to J/JC: the only form that needs no checker change and moves no walk value.
