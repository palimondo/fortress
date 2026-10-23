# Rung S of climb batch 21: the skeptic's review

Head judged: `34747e082` (the worker's last commit). The skeptic's commits: `fc34c9375` (the worker's REPORT.md and record.md, written byte for byte from the run's journal; the first try exited 1 and wrote nothing, because `explorations/compile-ladder/rung-symbolic-library/` did not exist yet, and the second, after `mkdir`, wrote both), `bdead0cee` (the guard's added assertions), `510f94d0b` (the report and record corrected), and this file. Verdict: **approved**, with two corrections and nothing contested. The tables in REPORT.md are those of the worker's head, `34747e082`; nothing the skeptic changed is read by a stage (a walk test and prose), and no stage ran again.

## 1. What was checked

1. **The test.** The full-check stage's after, the worker's `fc-post/d/errors.tsv`, compared with the planner's base table, `explorations/compile-ladder/plan-21/probes/full-check-base.tsv`, by `python3 -I explorations/perf-probes/array-sites/compare-sites.py <base table> <errors.tsv>`: 'landed 191 now 137', 53 site lines GONE (one `x2`), so 54 sites, and one export entry replaced, String's, which loses "different extends clauses"; no site COME. Tallied by message: `||`, `|||`, `//` and `///` 10 each (String's trait in api and component, `Concatenable`, `Balanceable`, `SubString`, `FlatString`, `EmptyString`, `CatString`, the api's and the component's sets), `EmptyString`'s `(Concatenable, EmptyString)` 1, `=` 4 (`Integral` twice, `ZZ`, `BigNum`), `|_|` 3 and `Float`'s return type 1, `Maybe`'s subscript 1, the vectors' top-level `+` and `-` 3, `^` 1: REPORT section 4's table. The three `@@PROBE CRASH` lines, `List.fsi:56`, `List.fss:106` and String's component, are in the run's log as on the base. The stock stages against climb batch 20's landed gate (`explorations/compile-ladder/climb-batch-20/gate/`, the newest by `git log -1 -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'`, `510fac459`): `explorations/coordinator/tools/distance/compare.sh <gate>/distance.txt <worker's distance-postedit.txt>` prints 'DISTANCE SAME   5'; `diff <gate>/checker-count.txt <worker's checker-count-postedit.txt>` prints nothing; the per-site comparison with `explorations/compile-ladder/gate/distance-sites.tsv`, 'landed 5 now 5', String's export entry narrowed as above. The transcript: the generators ran at 14:48:47, the comment edits at 14:49:50 and 14:50:04, the expected failure's respelling at 14:50:39, the commit `34747e082` at 14:51:19, and the full-check and count stages at 14:51:30, the distance stage at 14:54:14, `ant testSystem` at 14:57:27 and `ant testSpecData` at 15:02:38, with no edit of code after 14:50:39. No checker code changed, so no count stage was due on the base beside the head.
2. **Test first.** The rung's section sets the full-check stage as the test and the planner's table as its before, and the walk guard as one that passes on the base and after. The transcript shows the guard green on the base's code before any library edit (14:47:14Z, 'tree 00f2e1bdc', 'OK (1 test)'), red with one expected value changed for one run (14:47:27, 'Tests run: 1,  Failures: 1'), green after the edit (14:50:15Z, 'OK (time = 10154ms)') and in `ant testSystem` ('Tests run: 162', '172', '165', '170', each 'Failures: 0'; 'BUILD SUCCESSFUL'); and the expected failure green on the base (14:47:43Z, 'Saw expected failure'), red with the library edited and the test unchanged (14:50:15Z, 'Refused at load, but did not satisfy load_exception_contains'), green respelled (14:50:39Z). No harness run shows a test failing on the base's code: by the section, none is owed. So `failureWasRecorded` is false, and that is not a defect of the change.
3. **The diff.** The five library files are the generators' text exactly, but for doc comments: `known-fixes.py <copy of the base's six files> empty str4 eq abshead maybeidx vecops floatpow` ('27 edits in 5 files'), then `diff` against the head, prints only comment lines (the generator's rationale comment out, the orphaned `|||` comment out of String's trait in both files, a doc comment over each top-level family). Each edit is the section's, and nothing else changed: `git diff --stat 00f2e1bdc 34747e082` lists the five library files, `XXXFunctionalMethodMeetOperator.fss` and the guard.
4. **Precedent.** Juxtaposition's three top-level operators (`Library/FortressLibrary.fss:4491-4493`, api `Library/FortressLibrary.fsi:2525-2527`) are the library's device for this shape, and the four families follow them. Other sites of the shape: `grep -n '([a-z_]*: *Any, *self)' Library/*.fs? ProjectFortress/LibraryBuiltin/*.fs?`, outside the compiler's files, prints only `MATCH` (`fsi:698`, `fss:1102`) and `IN` (`fss:4078`), whose families have `self` second throughout; no sibling site is left. Every string object is a `FlatString` or a `Concatenable` (`CatString`, `SubString`, `EmptyString`; `grep -rn 'extends[^=]*\bString\b' Library ProjectFortress/LibraryBuiltin`), so the meet's `else` arm is reached by no library object.
5. **The guard.** One comment line, named by its topic; its specification citation names a file and an entry (`advanced-lib/algebraic-constraints.tex`, trait `Monoid`), whose text says that the empty string is the identity of `||` (`Specification/advanced-lib/algebraic-constraints.tex:1353-1357`). It asserted the meet's `FlatString` arm (`("ab" || "cd").depth` is 0) but no value through its `Concatenable` arm: section 4's correction.
6. **Programs old against new** (section 2), under walk on the old code (`old-fortress.sh`) and the head, warm and cold, and on the compiled path.
7. **Homes.** Rows 585 and 784 and row 611's library half: home 1, the full-check stage (no gated test can hold a site of the full check before rung C turns it on, batch 21b). Row 611's walk half: home 2, `ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss`. The cold-cache dependence that section 3 measures is row 342's, home 3, already recorded. `expTest.fss`'s compiled stop is row 442's claim ('`ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`').
8. **The ledger.** `facts-extract.sh 'ledger-find:...'` for concatenation, `EmptyString`, juxtaposition, `Concatenable`, `FlatString`, the string api, `Integral =`, the vector api, Float's power and the cache: rows 316, 726, 341 and 342 bear on the rung besides the brief's. Rows 726 and 316 state the old members (REPORT section 10, corrected); rows 341 and 342 explain section 3.
9. **The report.** Its five provenance lines, each cited line opened with `sed -n`: `full-check-base.tsv:169` and `:176` say what is quoted; `Specification/advanced/overloading.tex:518-523` is the sentence on two `self` positions; `Library/FortressLibrary.fss:4491-4493` and `fsi:2525-2527` are juxtaposition's three; `fss:4461-4466` is the meet's `typecase`; `Library/String.fsi:17-19`, `:29-31` are the six `||`. The `git show a874948ac:...` citations of the record's Revival change section, opened: `FortressLibrary.fsi` lines 2280 (String's header), 2337-2368 (the families), 1496-1503 and 1604-1611 (the vector and matrix operators), `FortressBuiltin.fss` line 79 (`opr |self| : Number =`), each as cited. The whole-suite runs are the head's code (`34747e082`): 669 tests, 0 failures; 130, 0 failures.
10. **Competing declarations.** In the walk tests, `test_library`, `SpecData`, the demos, microGPT's two programs and the compiled test folders, a declaration of `||`, `|||`, `//` or `///` is in `XXXFunctionalMethodMeetOperator.fss`, `ProjectFortress/demos/Words.fss:16` (a generic top-level `||` over lists), and three compiled tests that run on the compiler's library (`Compiled6.aq.fss:21`, `XXXNoDuplicatesRuleSelfPositionsOperator.fss:7-8`, `LineConcatRung5.fss`, a comment). `Words.fss` runs the same on both codes, warm and cold (section 2). In `ProjectFortress/src/com/sun/fortress/`, no Java or Scala names a concatenation operator or `Concatenable` but the generated parsers' tokens.
11. **The failure mode.** No loud failure becomes a quiet value. The one change of that kind goes the other way: under walk, on a cold cache, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` is now refused at load where it ran before (section 3), as the Meet Rule for a function beside a functional method asks (`overloading.tex:525-529`). `Maybe`'s new subscript meet throws `NotFound`, but `Just` and `Nothing` declare their own subscript (`Library/FortressLibrary.fss:1648`, and `Nothing`'s), which calls `fail` on both codes ('FAIL: Maybe[1] nonzero index'), so no value moves.

## 2. Programs old against new

Each under walk with `old-fortress.sh /home/user/fortress-base21 <caches> P.fss` for the old code and the head's `bin/fortress P.fss` for the new; "cold" is a fresh, empty caches folder for each run. No line of the diff writes state (no `var`, field, `atomic` or library write), so the programs ran at `FORTRESS_THREADS=1` only; walk's cache runs below were also tried at 4 threads, the same.

| Program | What it does | Old | New |
|---|---|---|---|
| `SkStrings` | a 3,000-character rope built by `||` (depth 21), `||` of two ropes, a number before a rope, a substring, a concatenation node, `Boolean`, `Maybe`, a list, `RR64`, `ZZ`, empty strings, juxtaposition, `BIG ||`, `reverse`, postfix and prefix `//` and `///`, a generic `"v=" || x`, `DelegatedIndexed` dispatch on strings, subscripts, `=`, `<`, four- and five-tuples, nested `||` | 23 lines, 'DONE', rc 0 | the same 23 lines, warm and cold |
| `SkNumbers` | `=` on `ZZ32`, `ZZ64`, `ZZ`, `NN32`, mixed with `RR64`; a generic `=` over `Integral[\I\]`; `|_|` of `RR64`; `^` with `RR64` and integer exponents; `Maybe`'s `|_|` and subscript, in range and out; `Vector` and `Matrix` `+`, `-` and unary `-` | 'eq true false true false true false', 'pow 1.4142135623730951 4.0 0.5 8.0 2.0 NaN', 'maybe 1 0 3 a', 'maybe2 -11 -22', 'vec 3.0 -1.5 -1.5', 'mat 4.0 -2.0 -0.0', 'DONE' | the same, warm and cold |
| `SkCat` | a concatenation node of depth 1 (two 26-letter strings) on either side of `||`, `|||` and beside a number | 'cat 52 1', 'c1 53 1 true !', 'c2 53 2 !', 'c3 104 2', 'c4 53 1 7', 'c5 54 x', 'c6 52 1', 'DONE' | the same |
| `Words` (the team demo) | its own generic `opr ||[\E\](a: List[\E\], b: List[\E\])` beside the library's | 'Hello, world!' ... '<\|Here, is, another, sample\|>', rc 0 | the same, warm and cold |
| `SkCompiled`, compiled and run | `||`, `|||`, `//`, `|_|`, `^` on the compiled path | 'abcd', 'x3', 'a b', 'a' 'b', '2.5', '1.4142135623730951', 'PASS' | the same (the compiled path links the compiler's library, which the rung does not touch) |

## 3. Fork 5's rule and walk's cache

The worker's rule, "under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` now needs `excludes { String }` or a meet", holds where walk analyses the library afresh, as the harness and the suites do, and not on a cache that already holds the library's analysis: there walk skips the check and runs the program, row 342's mechanism. The worker's evidence came from the harness, which starts its cache empty when the library's sources changed, so it saw only the cold case. The skeptic's programs, each a trait or object in a program that also calls `"s" || 1` or the like:

    component SkUserOneTrait
    export Executable
    trait T
      opr ||(self, b: ZZ32): ZZ32 = 2
    end
    object Vo extends T end
    run(): () = println("one trait, one object: " (Vo || 3))
    end

On the head, cold (`FORTRESS_CACHES=<empty folder> bin/fortress SkUserOneTrait.fss`):

    com.sun.fortress.exceptions.ProgramError: .../Library/FortressLibrary.fss:4467:1-4471:78: and
    .../SkUserOneTrait.fss:4:3-33:
    first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present
    rc=1

On the head with the tree's warm caches (`bin/fortress SkUserOneTrait.fss`): 'one trait, one object: 2'. On the old code, cold and warm: 'one trait, one object: 2', rc 0. A variant that prints `REACHED` first prints nothing before the refusal, so the refusal is at load. The same test, `XXXFunctionalMethodMeetOperator.fss` as on the base, run directly on the head: 'Vo || 3 = 1', rc 0, with the tree's caches; refused with a fresh one; refused through the harness alone (16:0x, 'Refused at load, but did not satisfy load_exception_contains'). By shape, on the head, cold:

| Shape | Head, cold | Old, cold |
|---|---|---|
| one trait with `opr ||(self, b: ZZ32)`, an object extending it | refused ('a:[String,Any] and self:[T,ZZ32]') | runs |
| two traits each with `||`, `//`, `///` or `|||`, an object extending both (the test's shape) | refused, each at its family's `(String, Any)` | runs |
| the same, with the object declaring the meet | refused | runs |
| a trait with `opr ||(self, b: String)` | refused ('a:[String,String] and self:[Doc,String]') | runs |
| a generic trait `Box[\T\]` with `opr ||(self, b: ZZ32)` | refused ('has a parameter with generic type, at least one pair of parameters must have excluding types') | runs |
| an object, not a trait, with `opr ||(self, b: ZZ32)` and `opr //(self, b: ZZ32)` | runs: 'functional \|\| in an object: 9 10 a3' | runs |
| a program's own top-level `opr ||(a: Doc, b: Doc)` over a trait | runs: 'top-level \|\| over a trait: 7 a3' | runs |

So the rule's scope is a trait, generic or not, with a functional operator of one of the four families; an object excludes `String` already, and a program's own top-level operator is not checked against the library's here (row 341's kind). By the specification the refusal is right: a functional method beside a function is judged by the Meet Rule for functions (`Specification/advanced/overloading.tex:525-529`), and `T` and `String` can meet. The correction (`510f94d0b`) qualifies the rule in REPORT sections 3 and 11 and in record.md (finding 4, For FACTS, row 611's line, the Revival change section).

## 4. The corrections

**The guard's `Concatenable` arm** (`bdead0cee`, `ProjectFortress/tests/StringConcatenationFamiliesWalk.fss:13-14`, `:18-22`). Finding: the `(String, String)` `||`, the rung's new code (`Library/FortressLibrary.fss:4461-4466`), dispatches by `typecase`; the guard reached its `FlatString` arm only. Five assertions put a concatenation node of depth 1 (`alpha || alpha`, 52 characters, above `maxLeafSize`, 32, `Library/String.fss:567`) on either side of `||`, beside a string and a number: its value, its depth 1 where the `CatString`-`FlatString` join merges the last leaf, and depth 2 with the short string first. Settled by the rung's section: "A walk guard of the concatenation families ... the values asserted. It passes on the base and after". It guards a behaviour that works on both codes, so it has no failing run:

    FORTRESS_HOME=/home/user/fortress-base21 /home/user/fortress-base21/explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <tree>/ProjectFortress/tests/StringConcatenationFamiliesWalk.fss
    # harness-one 2026-10-23T16:07:30Z; tree aa5ff2423; ... cache empty
     OK (time = 10157ms)
    OK (1 test)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/StringConcatenationFamiliesWalk.fss
    # harness-one 2026-10-23T16:07:41Z; tree fc34c9375; ... cache filled
     OK (time = 4025ms)
    OK (1 test)

and red in a copy with the join's depth changed to 2: 'FAIL: a Int: 1 =/= a Int: 2; || of a concatenation node and a short string joins its last leaf', 'Tests run: 1,  Failures: 1'. A walk test only: no build, and no suite is owed (`tests-running.md`, "When to run a whole suite").

**The report and record** (`510f94d0b`). Findings:
- Fork 5's rule without walk's cache condition (section 3): REPORT.md:87 and :174; record.md's finding 4, its For FACTS entry, row 611's line and the Revival change section.
- REPORT section 6 cited the Meet Rule for a function beside a functional method at `overloading.tex:526-530`; it is `:525-529`.
- REPORT section 10 missed two record sentences that the change makes false: row 726's note "`String`'s `(a:Any, self)` beside `(self, b:Any)` differ in type: row 585" (`explorations/fortress-gap-ledger.md:454`) and row 316's "Walk's library has `opr ||(a:Any, self)`, its kin ..." (`:770`, cited at `63e420a33`). record.md now carries row 726's whole new line, which `ledger.py check --rows` passes (1,179 characters).
- record.md's notes that their rows cannot take: `ledger.py note` checks the row's length, and rows 584 (1,191 characters), 442 (1,199) and 611 (1,158, notes near 700) have no room for the 348-, 327- and 485-character notes. record.md now says so for each; row 611's rewrite line, with its notes cut to the template (`ledger.py check --rows`: '0 fail the template'), stays the route, and row 442's claim already holds `expTest`'s cause, so REPORT section 13 names row 442 as its home without a note. Row 342, at its limit, gains no note; section 3 keeps the instance.
- REPORT section 2 now names the guard's added assertions.

## 5. Where this review differs from the worker's account

- Decision 1 says the team's doc comments for the four families now stand over the top-level families. In the api they are the team's text; in the component the `||` and `|||` comments are the team's, and the `//` and `///` ones are new text, "opr %//% concatenates with a single line separator." (`Library/FortressLibrary.fss:4480`, `:4485`), since the team's long comments stay over the prefix forms (REPORT section 1 says the latter). A comment only; no site or value depends on it.
- Decision 8 (microGPT's quick pair not run): the rung's section does not ask for it, and the planner ran the run's text (CLIMB-BATCH-21.md, "The planner's probe"); agreed.
- The count stage's 95 s ran beside the full-check stage on the same 4 cores (the transcript's 14:51:30 call starts both): a time to report, not one to compare.

## 6. Points to report

The worker's nine stand, with these additions: fork 5's rule holds on a cold cache only (section 3); the guard gained five assertions (`ProjectFortress/tests/StringConcatenationFamiliesWalk.fss:13-14`, `:18-22`); and the sentences made false include rows 726 and 316. None holds the push.

## 7. Verdict

Approved. The change is the record's: the probe's seven generators on this tree, the code exactly theirs, the doc comments the team's where the team wrote one; the full check goes 191 to 137 with the 54 known-fix sites gone and none come, the stock stages stay at 5 and 3, and no walk value moves on the skeptic's programs, old against new, warm and cold. The two corrections make the guard reach the meet's other arm and the record say when walk refuses the programs that fork 5 names.
