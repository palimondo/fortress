<!-- Skeptic's judgement on rung F of climb batch 1, written 2026-09-19 in the worktree /home/user/fortress-rr64 on wip/rung-rr64-functions.  First judgement of this rung.  One line per paragraph. -->

# Skeptic: rung F, the functional methods of `trait RR64`

**Verdict: approved, with four required corrections.** The claim is true and the record is honest. The edit is thirteen declarations, thirteen one-line bodies, eleven one-line natives and a test; it does that and nothing else; the recorded failure is genuinely pre-edit and git history attests it; the recorded pass reproduces from a forced recompile; the ladder table matches the committed raw outputs and I re-ran three of the seven files myself. The corrections are about the record rather than the code: one ledger row cites a specification clause whose scope it does not state, one is missing half its evidence, the failure-mode fact reaches `REPORT.md` but not `record.md`, and one supporting citation does not say what it is cited for.

Nothing in the diff touches `FACTS.md`, the gap ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, the handover, `CLAUDE.md`, `protocol.md` or `.claude/`; outside its own directory the branch changes exactly five files. I ran no `ant testFast` and no `ant testSystem`, and I sourced the environment by hand rather than through `experiment/env.sh`, so that the sibling rungs' `/tmp/fortress*rats` directories were not wiped under them.

## 0. The provenance block, opened line by line

Every `file:line` in the block was opened with `sed -n` and says what the block says.

`problem:` — `explorations/apl/mg/MicroGptApl.fss:42` is `sm(z: Array[\RR64,ZZ32\]): ... = do e = exp(z - (BIG MAX[t <- z] t)); e / (SUM e) end`. The pre-edit `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:439-440` is `(*    ceiling(self):RR64` / `    floor(self):RR64 *)`, read out of `git show cb242a2d8:`. Both hold.

`spec:` — `Specification/basic-lib/numbers.tex:457-462` declares `floor`, `⌊…⌋`, `ceiling`, `⌈…⌉`, `round` and `truncate` all at `\mathbb{Z}`; `:464` and `:467` both carry "likewise the enclosing operator"; `:470-472` is "whichever of the two integers is even"; `:474-477` is truncate toward zero. The block says "defined on ℚ", which is the right scope and is stated. I re-ran the silence grep: seven hits, all `\arctan` inside the juxtaposition worked example at `Specification/basic/operators/juxtameaning.tex:183-214`, none a definition. No line of the block cites `Specification/library/apis/`; that directory does not exist in the tree, which the report itself establishes correctly (`Specification/library/` holds four `.tex` files and no `apis/`).

`precedent:` — `Library/FortressLibrary.fss:589` is the hand-written round-half-to-even body, quoted verbatim in the block.

The five `deviation:` lines — `CompilerBuiltin.fsi:437-438` are the two brackets at `RR64`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:188-191` are `truncate(self):ZZ64` and `round(self):ZZ64`; `Float.java:384` is `return Math.round(x);`; `Library/FortressLibrary.fsi:325` is `atan2(self,x:Number):RR64`; `simpleDoubleArith.java:92-134` runs from `doubleSin` to the close of `doubleRound`. All five hold, and there is one line per deviation as the brief asks.

## 1. The recorded failure

It exists, it is pre-edit, and the git history proves it rather than merely asserting it. `probes/failure-before-edit.txt` was committed in `2dbd37935`, whose only three files are the test, the `.test` and the failure; that commit's tree still has `(*    ceiling(self):RR64 / floor(self):RR64 *)` at `CompilerBuiltin.fsi:439-440` and none of the thirteen declared, and the edit arrives only in `632d7cf22`. The capture is `File RR64FunctionsRungF.fss has 45 errors.` with `exit 255`. I counted the diagnostics: 45 lines of `Variable <name> is not defined`, over exactly thirteen distinct names, every one of the thirteen present (`round` 6, `exp` 5, `atan2`/`ceiling`/`floor`/`log`/`truncate` 4, `atan`/`tan` 3, `acos`/`asin`/`cos`/`sin` 2).

## 2. The recorded pass, re-run under my own hand

I deleted `default_repository/caches/bytecode_cache/RR64FunctionsRungF.jar` and re-ran: `fortress compile` exited 0 and wrote nothing, and `fortress run` died with `ClassNotFoundException ... Resource not found : RR64FunctionsRungF.class`. That is the trap the brief and the report both name, reproduced by accident, and it is the reason the report's own `probes/reverify-forced.log` deletes the analysed-cache entry too. After also deleting `default_repository/caches/analyzed_cache/RR64FunctionsRungF-*.tfs`, a real recompile gave `=== compile exit 0 ===`, `PASS`, `=== run exit 0 ===`. The recorded pass is real.

The native side is not stale: `javap` on `default_repository/caches/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/simpleDoubleArith.class` lists all eleven new methods, with `doubleTruncate` and `doubleRound` returning `FZZ64` and the other nine `FRR64`. That is also the direct evidence for the report's `NamingCzar` claim, which I checked at the source: `s(Type.LONG_TYPE, fortLib, "ZZ64")` and `s(Type.DOUBLE_TYPE, fortLib, "RR64")` at `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:441-446`, and rung 7's Fortress-type clause at `:343-344`.

## 3. The diff

Four files, and it is what the report says. `CompilerBuiltin.fsi:439-451` carries the thirteen declarations where the two commented-out lines were; `CompilerBuiltin.fss:215-225` carries eleven bindings appended to the `simpleDoubleArith` `import java` block and `:911-923` the thirteen one-line bodies; `simpleDoubleArith.java:92-134` carries eleven static methods, nine of them a single `Math.*` call, `doubleTruncate` a `(long)` cast and `doubleRound` `(long) Math.rint(a)`. I grepped every one of the thirteen names across the five compiler-world library files (`AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, both `.fsi` and `.fss`): they occur at exactly the twenty-six lines above and nowhere else, so the `.fsi` and `.fss` agree declaration for declaration and nothing else in the prelude is touched. `floor` and `ceiling` reuse `jDoubleFloor` and `jDoubleCeiling`, which were already bound and already used by the brackets, so no binding was added for them. It is as small as the test needs.

## 4. The precedent search

Four precedents, and I confirmed all four at the source. The interpreter's api declares the nine at `RR64`, the brackets at `ZZ64` and `truncate` at `ZZ64`, and does not declare `round` (`Library/FortressLibrary.fsi:319-332`). `object Float`'s bodies run `FortressBuiltin.fss:162-191`, with `floor`/`ceiling` at `:180`/`:184`, the brackets at `:182`/`:186`, `truncate` at `:188` and `round` at `:190`. `trait QQ` follows the specification at `Library/FortressLibrary.fsi:396-401` and `.fss:589`. The team's draft is the two commented-out lines. The report followed (c) for `round`'s rule and (d) for `floor`/`ceiling`'s type, and said so.

The report's second-pass finding that the interpreter world disagrees with itself is correct and I verified each of the three spellings: `Library/FortressLibrary.fss:418` is `truncate(self):RR64` inside `trait Number`, `Library/FortressLibrary.fsi:332` is `truncate(self):ZZ64` for the same trait, and `FortressBuiltin.fss:188` is `ZZ64`; `trait Number`'s `round` is `ZZ` at `:419` against `Float`'s `ZZ64` at `:190`.

## 5. The test

It exercises the defect. Every operand reaches a method through `rt`, whose branch is taken at run time, so nothing arrives as a literal; the nine transcendentals are pinned by identities that a constant-returning or identity-returning body cannot satisfy; `atan2` is called once per quadrant. The brief's two named requirements are both met: all four half-way cases of `round` (`2.5→2`, `3.5→4`, `-2.5→-2`, `-3.5→-4`, lines 98-101) and the sign of `truncate` (`2.7`, `-2.7`, `2.5`, `-2.5`, lines 104-107). Four assertions compare each rounding method against its enclosing bracket. `exp` and `log` are used as function values in both the bound and the passed shape, which is the shape the target program needs. The count is 42 assertions, as the corrected report says.

The `.test` file writes `run_out_contains=PASS`. The key is implemented (`FileTests.java:147` builds `<pfx><which>_contains`), and even were it not, the default check at `:266-270` demands `PASS` on `run_out` anyway. The eleven other `.test` files in `library_tests/` write the unimplemented `run_out_WIcontains`; I counted them, and eleven is right. `LibraryJUTest` adds every `.test` file in `library_tests` (`LibraryJUTest.java:36-41`), so the new test is in the gate without any fileset edit.

## 6. The competing-declaration grep

I ran my own, over thirteen corpus directories rather than eleven — `tests`, `library_tests`, `not_working_library_tests`, `compiler_tests`, `not_working_compiler_tests`, `other_compiler_tests`, `linker_tests`, `test_library`, `parser_tests`, `syntax_abstraction_tests`, `obsolete_interpreter_tests`, `not_working_static_tests`, `demos` — in two shapes, a declaration at the head of a line and a `getter`/`opr` form. It returns exactly one hit, `tests/zeno.fss:53`, `getter round(): ZZ32 = n`, which agrees with the report.

I also independently checked the second pass's completeness claim: a grep for `(Variable|Function|Operator) <name> is not defined` over all 410 recorded `*.compile` files in `explorations/compile-ladder/after/raw/` (381 in `tests/`, 29 in `not_working_library_tests/`) returns exactly the seven files of the subset and no others. The subset is provably complete, as the report says.

## 7. `record.md`

The ledger note cites existing rows and renumbers nothing: the highest number in `explorations/fortress-gap-ledger.md` today is 328, so 329 and 330 are free. Section 2 "Numerals and literals" is at `:111` and section 8 is the Fortify typesetter at `:268`, so the second pass's re-filing is right; rows 188, 189 and 283 are at `:122`, `:123` and `:125` as claimed. `tests/RationalTest.fss:428` is `assert(round(15/6), 2, "round(15/6)")` and `:410` is `assert(round(-15/6), -2, ...)`. The four evidence files the rows cite are now tracked — `git ls-files` lists both `.out` probes and both `.log` builds — and `.gitignore:42` and `:46` are `*.log` and `*.out`, so the second pass's account of why they were missing is right.

The ladder table is accurate against the committed raw outputs: before 2/1/6/5/37/42/97 errors, after 1/1/1/crash/20/36/49, exit 1 for `oprTests` where the others are 255, the three files of the second subset byte-identical both ways, and no diagnostic naming any of the thirteen anywhere in the "after" set. The `head of empty list` crash is at `Misc.scala:876`, `val first = dims.head`, and it is catalogued — inside row 316's fix column, where rung 5 recorded the same crash for `compoundArray.fss`.

Because the report says one claim rests on a single run, I re-ran three of the seven files myself in the post-edit tree. `tests/roundBug.fss` gives `Could not check call to operator SQRT`, `RR64->RR64 is not applicable to an argument of type ZZ32` at `:19`; `tests/buffons.fss` gives `Could not check call to operator -` against `(RR64, IntLiteral)` at `:24`; `tests/juxtTwice.fss` gives `Could not check call to operator /` against `(FloatLiteral, IntLiteral)` at `:26`. All three are exactly the table's "where it stops now". Output in `probes/skeptic/SkLadderSpotCheck.out`.

## 8. My own differentials

Four programs the worker did not write, each run under `bin/fortress` and under `fortress compile` + `fortress run`. All are in `probes/skeptic/`.

**D1, the nine non-rounding methods and `atan2`'s argument order** (`SkTransWalk.fss`/`.out`, `SkTransComp.fss`/`.out`). `sin`, `cos`, `tan` at 0.7, `asin`, `acos` at 0.5, `atan` at 1, `exp` at 1, `log` at 2, and `atan2` at four argument pairs. The two paths agree to the last digit on all twelve lines, the only difference being row 76's extra space. `atan2(1, -1) = 2.356194490192345 = 3π/4` on **both** paths, which independently confirms the report's claim that `self` is the *y* coordinate and the argument the *x* coordinate, without relying on reading `RR2R.applyMethod`. No divergence; nothing for the specification to settle.

**D2, the boundary** (`SkEdgeWalk`, `SkEdgeComp`). NaN, `±∞`, `exp(100) = 2.688…e43`, and the domain errors `log(0)`, `log(-1)`, `asin(2)`, `acos(2)`. Twenty-one lines, and the two paths are identical on every one. This is the failure-mode evidence and it is in section 9.

**D3, the ties the rung's own probe does not reach** (`SkZeroWalk`, `SkZeroComp`). The worker's probe uses 2.5 and 3.5 and their negatives; I used 0.5 and 1.5 and theirs, where the even neighbour of the tie is zero or has the other sign.

| | walk | compiled | half-to-even |
|---|---|---|---|
| `round(0.5)` | **1** | **0** | 0 |
| `round(-0.5)` | 0 | 0 | 0 |
| `round(1.5)` | 2 | 2 | 2 |
| `round(-1.5)` | **-1** | **-2** | -2 |
| `round(2.5)` | 3 | 2 | 2 |
| `truncate(0.5)`, `truncate(-0.5)` | 0, 0 | 0, 0 | — |
| `floor(-0.5)`, `ceiling(-0.5)` | -1.0, -0.0 | -1.0, -0.0 | — |

Two more divergent values than the rung recorded, in the same direction and from the same cause. The same file also runs `applyTo(exp, one)` and `applyTo(log, one)` under `walk`, which the rung's test exercises only compiled: both work, so the function-value shape is not a divergence either.

**D4, the overload surface** (`SkOverA`–`SkOverD`, output in `SkOver.out`). This is the question the rung's own test cannot ask: the thirteen names are functional methods and so are visible at top level, and thirteen names in the compiler world that were free are now taken. A top-level `exp(x: ZZ32): ZZ32` beside the prelude's `exp(self: RR64)` compiles and runs, and both resolve correctly (A). A generic `exp[\T extends Number\](a: T): ZZ32`, one of whose instantiations has the prelude's own signature, also compiles clean (D) — useful for the array rung, whose `exp[\T extends Number, I\](a: Array[\T,I\])` is the same family. A top-level `exp(x: RR64): RR64`, the identical signature, is rejected at `exit 255` with `Likely bug in static analysis, apparently malformed overload set not rejected ... Probable cause is a functional method and top level function with same signature` (B). That message is not this rung's doing: the same clash against `even(self): Boolean` on `trait ZZ32`, a functional method the prelude carried before the edit, produces the identical message (C). So the behaviour is pre-existing; what the rung adds is thirteen more names that can trigger it, and the corpus grep of section 6 shows none of them does.

## 9. The failure-mode question

Yes, a loud failure became a quiet value, in the broadest way this ladder does it: before the rung, every one of the thirteen names was a compile-time `Variable ... is not defined` at disambiguation with exit 255. After it they are total functions of a `double`, and at the boundary they return sentinels. Measured, not derived, and identical on both paths (`probes/skeptic/SkEdgeWalk.out`, `SkEdgeComp.out`):

- `truncate(NaN)` and `round(NaN)` are **0**.
- `truncate(+∞)`, `round(+∞)`, and both at `2.688e43` — any magnitude past `2^63` — are **9223372036854775807**; the negatives are **-9223372036854775808**. The saturation is the JVM's `d2l`, and the same value stands for "too big" and for "exactly `Long.MAX_VALUE`".
- `floor(NaN)` and `ceiling(NaN)` are `NaN`; `floor(+∞)` is `Infinity` and `ceiling(-∞)` is `-Infinity`; those four are faithful.
- `log(0)` is `-Infinity`; `log(-1)`, `asin(2)` and `acos(2)` are `NaN`.

Against the specification: `numbers.tex:479-481` says that on ℚ* and ℚ# all four rounding methods "simply return the argument" at `+∞`, `-∞` and `0/0`, which a `ZZ64`-returning method cannot do. But that clause governs ℚ* and ℚ#, and the tower puts ℚ **below** ℝ (`numbers.tex:37`, "it is a subtype of ℝ"; in the implementation `trait QQ extends { RR64, ... }`, `Library/FortressLibrary.fsi:370`), so it does not reach `RR64` by inheritance and the prose has no chapter for the real types. The specification is therefore silent here, both paths behave identically, and the rung introduces no divergence — the cost is diagnosability alone, and it is the cost of the whole rung: the next person who meets `round(x) = 9223372036854775807` gets a number where they used to get a named error. The report establishes this in `REPORT.md` §9 and defers it to row 330, which is the right home; correction 3 below is only that it must reach `record.md`, because that is what survives.

## 10. Where the specification is and is not the standard

Applying rule 4 to the one real divergence, `round` at a tie: this is **not** the case where the specification settles it against the interpreter. `numbers.tex` §"Rational Numbers" is the chapter's only section (`:16`; the file is 566 lines), it fixes half-to-even for ℚ at `:470-472`, and ℚ is a subtype of ℝ in both the prose (`:37`) and the library (`FortressLibrary.fsi:370`). A rule on a subtype does not bind its supertype. So the specification is **silent** about `round` on `RR64`, and this is rule 4's third outcome — think harder, decide, write it down.

The rung's decision survives that reclassification intact, and on better grounds than it gave. Inside one tower the interpreter answers `round(2.5) = 2` when the value is held as a ℚ (`FortressLibrary.fss:589`, asserted by the gated `tests/RationalTest.fss:428`) and `round(2.5) = 3` when the same value is held as a `Float` (`Float.java:384`) — a subtype and its supertype disagreeing about the same number. Half-to-even is also the IEEE 754 default and what `Math.rint` implements. Choosing it for the compiled `RR64` makes the tower consistent with its own specified part. That is the argument the record should carry, and correction 1 is that it must.

The second divergence the report names, `floor`/`ceiling` returning a float where `numbers.tex:457-462` returns ℤ, is in the same position: the clause is about ℚ. Row 330 already says so in its fix column ("the specification's ℚ chapter, which is the only chapter that covers these four methods and has no counterpart for the real types"), which is why correction 1 names only row 329.

## 11. Verdict

**Approved.** Four corrections the commit stage must close.

**C1. Row 329 must state the scope of the clause it cites.** As written it says `Float$Round` "rounds a half toward positive infinity, where `numbers.tex:470-472` requires 'whichever of the two integers is even'", with no bridge from ℚ to `RR64`. A reader who opens `:470-472` finds a rule about rational numbers and a row about a float method. Add: that `numbers.tex` has one section, "Rational Numbers" (`:16`); that ℚ is a subtype of ℝ in the prose (`:37`) and of `RR64` in the library (`Library/FortressLibrary.fsi:370`), so the rule does not reach the float types by inheritance and the prose has no chapter for them; and that the ground for carrying it to `RR64` is therefore the implementation's own ℚ body (`Library/FortressLibrary.fss:589`) with the gated assertion at `tests/RationalTest.fss:428`, plus IEEE 754's default rounding — an inconsistency between a subtype and its supertype inside one tower, not a plain violation. The same qualification belongs in `REPORT.md` §4 (iii), whose "which contradicts `numbers.tex:470-472`" asserts the reach without stating it, and in the structured output's first divergence line, which says "The specification settles it against the interpreter". This is required because row 329 is a ledger row and ledger rows are cited from many reports; a reader six months from now must be able to check the bridge, and today the bridge is not written down.

**C2. Row 329 must carry the two further divergent values.** `round(0.5)` is `1` under `walk` and `0` compiled, and `round(-1.5)` is `-1` under `walk` and `-2` compiled (`probes/skeptic/SkZeroWalk.out`, `SkZeroComp.out`, measured this pass). The row currently names only `2.5` and `-3.5`. The ties nearest zero are the first a reader will try, and one of them — `0.5` — is the case where the even neighbour is zero, which is where a reader is most likely to doubt the rule. Add the two values and the two probe files to the reproducer column.

**C3. The failure-mode fact must reach `record.md`.** `REPORT.md` §9 derives it from Java semantics and defers it; `record.md` — the part that is folded and survives — says nothing about it, and row 330 cites `numbers.tex:479-481` about `+∞`, `-∞` and `0/0` without saying what the implementation actually answers there. Add to row 330, as measured on both paths and identical: `round` and `truncate` of NaN are `0`; of `±∞` and of any magnitude past `2^63` they saturate to `±(2^63-1)`/`-2^63`, so one value stands both for "too big" and for `Long.MAX_VALUE`; `floor` and `ceiling` are faithful at NaN and the infinities. Cite `probes/skeptic/SkEdgeWalk.out` and `SkEdgeComp.out`. State that both paths agree, so the rung adds no divergence, and that what it adds is the loss of a named compile-time error.

**C4. One citation does not say what it is cited for.** `REPORT.md` §9 says "`DirectedRoundingTest` is one of the two test classes `test-coverage.md:187` records as matching no green fileset". Line 187 is the "native helpers" row and says "two test classes" without naming either. The line that names `numerics/DirectedRoundingTest` is `test-coverage.md:72`. Change the citation to `:72`; the claim itself is true and the class exists at `ProjectFortress/src/com/sun/fortress/numerics/DirectedRoundingTest.java`.

## 12. Minor, not required

`REPORT.md` §9 says `LibraryJUTest` "calls `Shell.resetRepository()` before it starts (`LibraryJUTest.java:32-34`)". It is guarded by `ProjectProperties.getBoolean("fortress.junit.reset", true)`, and the comment two lines above the cited range says so, so the suite could have been run with `-Dfortress.junit.reset=false` without paying the rebuild. True as written of the default, and the brief forbade the gate anyway.

`REPORT.md` §4 (i) leans partly on "changing a declared type the prelude already has is one of the two stops `CLIMB-BATCH-1.md` reserves". The rejected alternative — declaring the methods at `ZZ64` — would not have changed any existing declaration, so the stop is not what rules it out; `numbers.tex:464`/`:467` is, and the report says that too. The argument stands without the stop.

`REPORT.md` §3 cites the chapter's single section as `numbers.tex:12-17`; the `\section{Rational Numbers}` is at `:16` and `:12` is the `\chapter`. Harmless.

The report's correction to the brief is right and worth keeping: there is no real-numbers section at `numbers.tex:920`, the file being 566 lines with one section. So is the finding that `Specification/library/apis/` is not in the tree — `Specification/library/` holds `default-libraries.tex`, `library.tex`, `optional-libraries.tex` and `structure.tex` and nothing else, and `default-libraries.tex:27` `\input`s a path generated at spec-build time.

## 13. What I ran

```
probes/skeptic/SkTransWalk.fss  SkTransWalk.out    the nine non-rounding methods and atan2, walk
probes/skeptic/SkTransComp.fss  SkTransComp.out    the same, compiled
probes/skeptic/SkEdgeWalk.fss   SkEdgeWalk.out     NaN, the infinities, past 2^63, the domain errors, walk
probes/skeptic/SkEdgeComp.fss   SkEdgeComp.out     the same, compiled
probes/skeptic/SkZeroWalk.fss   SkZeroWalk.out     the ties at 0.5 and 1.5, and exp/log as function values, walk
probes/skeptic/SkZeroComp.fss   SkZeroComp.out     the same, compiled
probes/skeptic/SkOverA.fss  SkOverB.fss  SkOverC.fss  SkOverD.fss   SkOver.out   the overload surface
probes/skeptic/SkLadderSpotCheck.out                 three of the seven ladder files re-run post-edit
```
