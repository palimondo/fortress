<!-- Numbering note added at the merged-diff review of 2026-09-19: this file was written before the gather assigned final ledger numbers, and every "row 329" below (`:185`, `:243`) means rung M's provisional first row, which landed as **row 331**. Row 329 in the ledger is rung F's. The verdict text is left exactly as the skeptic wrote it. -->

# Skeptic: rung M, `rung-maybe`

Verdict: **approved, with six required corrections**, all of them to the record
the coordinator folds (`record.md`) and to the report's divergence list. None of
them is to the source edit, which I could not fault.

I did not do this work. Everything below that says "verified" I re-ran or
re-read myself in `/home/user/fortress-maybe`; everything the worker reported
that I could not reach, I say so.

## 0. Provenance block

Four lines under the title of `REPORT.md`. I opened every `file:line` each one
cites.

| line | claim | checked |
|---|---|---|
| `problem:` | `explorations/compile-ladder/after/raw/tests/oddJuxt.fss.compile:2` says "Function Nothing is not defined." | true; line 2 is exactly that. The "472 times across 51 files" is also true: `grep -rl` over `after/raw/` gives 51 files, `grep -rh` gives 472 lines. |
| `spec:` | `Specification/basic-lib/convenience.tex:46-52`, section `:31-53`, comment form `:37-43`; `basic/exceptions.tex:122,124` | true, line for line. `:46` is the `trait Maybe` rendering, `:47` `isNothing: Boolean`, `:49` `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`, `:51` `object Just[\T\](just: T)`. `exceptions.tex:112` "These fields are default to `Nothing`", `:114,116` comment form, `:122,124` the `= Nothing` renderings, `:129` "an optional value *v* is either `Nothing` or `Just(v)`". A prose chapter of Part Basic Library, not an api rendering, so rule 3 is satisfied. |
| `precedent:` | `CompilerBuiltin.fsi:649-661` with bodies `.fss:1308-1367`; draft at `CompilerLibrary.fsi:217-229` in the base commit | true. `:649` is `value trait Option[\E19 extends Any\]`, `:661` `value object None end`; `.fss:1308` the trait, `:1367` `value object None end`. `git show cb242a2d8:Library/CompilerLibrary.fsi` has the commented draft at `:217-229`. |
| `deviation:` | nine, listed in §7; `CodeGen.java:4088` refuses a where clause | true; `CodeGen.java:4088` is `header.getWhereClause().isNone() && // no where clause` inside `forObjectDeclPrePass`'s `canCompile`. |

No spec line cites `Specification/library/apis/`. The block passes.

## 1. The recorded failure

It exists and it is genuinely pre-edit. `probes/MaybeRungM-before.txt` was
committed in `96aef343d`; the library edit is in `f6b4a82e1`, two commits later
(`git show --stat` on each). The capture records
`MaybeRungM.fss:17:19-22: Maybe is undefined.`, `File MaybeRungM.fss has 2
errors.`, `compile-rc=255`, and the same `.test` file through the harness with
`Tests run: 2,  Failures: 2,  Errors: 0`.

One capture defect in that file, inherited from the earlier attempt and not
corrected: the `fortress run` section prints a `ClassNotFoundException` and then
records `run-rc=0`, because the `rc` was taken after a pipeline rather than from
the command. The same bug is the one the worker says it fixed in
`WhereClauseNothing`. It does not weaken the recorded failure — the compile
step's `rc=255` and the harness's two failures are the load-bearing lines — but
`run-rc=0` there is wrong and a reader will trip on it.

**Recorded pass, re-verified by me.** I re-ran the gate test through the harness
myself, from the cache as the worktree stands: `. link library_tests/MaybeRungM
OK (time = 3228ms)`, `. run library_tests/MaybeRungM (783ms) PASS`, `OK (2
tests)`, `junit-rc=0`. This reproduces `logs/verify-gate-and-ladder.txt`.

## 2. The diff

`git diff cb242a2d8...HEAD` touches two library files and nothing else outside
`explorations/` and the new test. No `.java`, no `.scala`, no `ant compileAll`
needed — I confirmed the claim that this is a pure library rung by reading the
diff, not by trusting it.

`Library/CompilerLibrary.fsi:217-234` replaces the commented draft (a banner
comment at `:217-219`, then the live declarations at `:221-234`).
`Library/CompilerLibrary.fss:522-580` adds the bodies before "Making vectors".
Both spans are exactly as reported.

Read against `CompilerBuiltin`'s `Option` block line by line, the copy is
faithful: api members `coerce`, commented `SQCAP`, `seq()`, `abstract filter`
(plus the added `getter isNothing()`); body members `coerce`, `isEmpty`,
`nonEmpty`, `reverse`, `seq`, `filter` on the trait and the fifteen members of
each object, with `E19`/`E20`/`E21` collapsed to `T` and `Some`→`Just`,
`NoneObject`→`NothingObject`, `None`→`Nothing`. `getter isNothing(): Boolean =
NOT self.holds` is the one added member and `convenience.tex:47` declares it.
Nothing else is in the diff. It is as small as the test needs.

The `.fsi`/`.fss` asymmetry (`isEmpty`, `nonEmpty`, `reverse` in the body and not
in the api) is `Option`'s own asymmetry; those three are reachable because
`Condition` declares them (`CompilerBuiltin.fsi:623-624,628`).

## 3. The precedent search

I re-checked all five of the worker's answers and found each where it says:

1. `Library/FortressLibrary.fss:1306` `value trait Maybe[\T\]`, `:1312` `Just`,
   `:1340-1341` the comment "Obviously ought to be a non-parametric singleton
   when we get where clauses working", `:1342` `value object Nothing[\T\]`.
2. The draft, `git show cb242a2d8:Library/CompilerLibrary.fsi` `:217-229`.
3. Seven ungated `not_working_library_tests/` components of the draft's shape.
4. `Option`/`Some`/`NoneObject`/`None`, verified above.
5. `syntax_abstractions/phases/TemplateVarRewriter.java:114-117` — `forOptionDepth`
   builds `NodeFactory.makeId(span, "Maybe")`, unqualified — and
   `syntax_abstractions/util/FortressTypeToJavaType.java:50-58`, which maps the
   name texts `Maybe`, `Just` and `Nothing` to `Option<arg>`.
   `Evaluator.java:595` compares a typecase clause's name against `"Just"`.

The corpus count is right too: `grep -rl 'Nothing\[\\' tests/ *_tests/` gives 22
files, the number `record.md` uses.

The rung followed precedent 4 for the bodies and precedent 2 for the names and
the empty case. Given that the two disagree, that is the right division: 4 is the
only one of the five known to run, and 2 is both the team's decision for this
world and the one the specification sanctions. I reached the same conclusion
independently before reading §5.

**Competing declarations, my own grep.** `grep -rn -E '\b(Maybe|Just|Nothing|
NothingObject|AnyMaybe)\b'` over `compiler_tests/`, `other_compiler_tests/` and
`library_tests/`: `compiler_tests/` has none; `other_compiler_tests/MaybeTest15a.fss`
and `library_tests/MaybeTest9.fss` use only the prefixed `TestMaybe`/`TestJust`/
`TestNothingObject` and the string literal `"Nothing"`. No gated compile-path
file declares any of the four new names. Confirmed.

## 4. The test

`ProjectFortress/library_tests/MaybeRungM.fss` exercises both cases through
`pick(b: Boolean)`, so a constant body would not pass; it writes the binding
`coerced: Maybe[\ZZ32\] = Nothing` at `:26`, which is the spelling my brief
requires; it checks `holds`, `isNothing`, `size`, `get`, `getDefault` both ways,
`NotFound` from `get` on the empty case, `cond`, `typecase`, `for` over all three
values, `reduce` and `asString`.

It does **not** write `Nothing[\ZZ32\]`, and it cannot: under the rung's decision
that spelling is a static error, so it can only live in a probe. It does live in
one (`probes/NothingParameterised.fss`) and in mine (`probes/skeptic/SkNothingParam.fss`).
The consequence is worth stating plainly and is not stated anywhere in the rung's
record: **the decision's cost is ungated**. Nothing in `testFast` would notice if
a later rung flipped the fork back to the parametric spelling.

## 5. My own differentials

Thirteen programs the worker did not write, under `probes/skeptic/`, each run
under `bin/fortress walk` and under `bin/fortress compile` + `run`.

| probe | walk | compiled | reading |
|---|---|---|---|
| `SkMaybeShared` — every member of `Just` that BOTH preludes declare: `size`, `get`, `holds`, `getDefault`, `asString`, `for`, `reduce`, `cond`, and `Just[\String\]("a")` | `1 / 7 / true / 7 / Just(7) / 7 / 7 / 14 / Just(a)` | **identical, byte for byte** | the copied bodies agree with the interpreter everywhere both have an answer. This is the rung's strongest evidence and it had not been run. |
| `SkIsNothing` — `Just[\ZZ32\](7).isNothing` | `Cannot find definition for method isNothing given receiver Just[\ZZ32\]`, rc=1 | `false`, rc=0 | divergence; specification settles it **against the interpreter** (`convenience.tex:47` declares `isNothing: Boolean` on `Maybe`). Rule 4, outcome 2 — a row is owed against the interpreter. Not in the report. |
| `SkEqAbs` — `Just(7) = Just(7)` | `true` | static error, `Could not check call to operator =`, rc=255 | divergence; specification **silent** (`convenience.tex` declares no `opr =`). Precedent governs and `Option`'s `opr =` is commented out (`CompilerBuiltin.fss:1327`), so the rung's choice stands — but it is a member the interpreter's `Maybe` has and this one does not, and the deviation list does not say so. |
| `SkAbs` — `|Just(7)|` | `1` | static error, rc=255 | same reading; `Option`'s `opr |self|` is commented at `CompilerBuiltin.fss:1314`. |
| `SkNothingParam` — `Nothing[\ZZ32\]`, the corpus spelling, on both paths | `holds=false`, `asString=Nothing`, rc=0 | `Unexpected type for a singleton object reference`, rc=255 | the rung's own ledger row 329, now measured on both sides rather than one. Specification settles it against the interpreter and the corpus. |
| `SkBareNothing` / `SkNothingAsString` — `println(Nothing)`, `Nothing.asString` | `Non-object receiver ObjectDecl Nothing ... GenericSingleton`, rc=1 | **compiles rc=0**, then `java.lang.StackOverflowError` | the failure-mode finding; §6. |
| `SkBareNone` — the same against the shipped `None` | — | identical `StackOverflowError` | control: the defect is inherited from the precedent, not introduced by this rung. |
| `SkMaybeMembers` — `isEmpty`, `nonEmpty`, `map`, `filter`, `seq`, `reverse`, `mapReduce` on both cases, which the rung's test does not reach | — | `false/true/true/false`, `Just(8)`, `Nothing`, then `filter` throws `java.lang.AbstractMethodError` | the copied `map`, `seq`, `reverse`, `mapReduce`, `isEmpty`, `nonEmpty` are right; `filter` dies. |
| `SkOptionFilter` — the same `filter` call against the shipped `Some` | — | identical `AbstractMethodError` | control: inherited, not introduced. |
| `SkArrowSubtype` — `fn (x:ZZ32):Condition[\()\] => Just[\()\](())` called directly | `true` | compiles rc=0, `AbstractMethodError` | narrows it: the defect is any closure whose declared return type is a supertype of its body's type. Nothing to do with `Maybe` or with `filter`. Specification silent; a codegen defect, and a new one as far as I can see. |
| `SkMaybeBigOp` — `SUM[x <- Just(7)] x` | `7` | `Could not check call to function __bigOperator` / `__generate` has overloads only for `Boolean` and `GeneratorZZ32`, rc=255 | pre-existing compiler-world limit, unrelated to this rung; recorded so the next collection rung does not rediscover it. |
| `SkImportList` — `import List.{...}` | — | rc=255 on `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction` — **not** on `Maybe` or `HasRank` | this is gap-ledger row 71; §7. |

**The ladder cascade, re-run by me rather than read.** I recompiled all six
subset files in this worktree (`tmp/skeptic/ladder.log`) and got the worker's
"after" table exactly: `ExceptionScoping` 1, `oddJuxt` 1, `maybeTest` 3,
`naturalsTest` 3, `HeapTest` 5, `IntMapTest` 9 — 22, with the same first error in
every file. The "before" half I did not re-run either, but the independent
baseline at `explorations/compile-ladder/after/raw/tests/` gives 1, 2, 9, 9, 11,
26 = 58 with the same first errors, so the "58 → 22" claim stands on two
recordings, neither of them this rung's own.

## 6. The failure-mode question

**No loud failure became a quiet value.** I looked for one at every site the rung
touches and did not find it: every member both preludes declare returns the
interpreter's answer (`SkMaybeShared`), `NothingObject.get` still throws
`NotFound` rather than returning a default, and the corpus spelling
`Nothing[\ZZ32\]` remains a *static* error rather than silently meaning something
else.

**One loud failure became a much worse-diagnosed failure, and it is not
recorded.** The rung adds `value object Nothing end` — an object with no members
— to the implicit prelude of every compiled program. Before the rung,
`println(Nothing)` was `Function Nothing is not defined` at compile time. After
it, that program compiles `rc=0` and dies at run time with
`java.lang.StackOverflowError`, recursing
`CompilerBuiltin$Object$DefaultTraitMethods.asString` (`CompilerBuiltin.fss:338`,
`jAsString`) → `stringOps.asString` (`stringOps.java:40`, `return a.toString()`)
→ `FValue.toString` (`FValue.java:25-27`, `this.asString().toString()`) → back.

That is gap-ledger row 321 exactly, which already names all three of those
citations, and my control `SkBareNone` shows the shipped `None` does the same, so
the rung **inherited** the defect faithfully rather than introducing it. What is
new is its reach: row 321 now has a second prelude object, under a name the
specification and 22 corpus files both write, and the diagnosis for that name
moved from compile time to run time. Row 321 is explicitly Pavol's decision
("The choice decides what every `println` of an unadorned object prints"), so the
rung was right not to give `Nothing` its own `asString` on its own authority —
but it was required to establish and report this, and it did not. `REPORT.md` has
no failure-mode section at all.

## 7. `record.md`

The FACTS lines and the ledger row are, with the exceptions below, true as
written and checkable: I verified every `file:line` in all four FACTS paragraphs
and in row 329, and a reader six months out can follow them. The row is opened,
not renumbered, and cites no row it moves. The three map corrections offered for
`spec-to-implementation.md:332` are all real — the row does give
`CompilerLibrary.fsi:194-204` (actual `:217-229`), `CompilerBuiltin.fsi:648-660`
(actual `:649-661`), and `library/default-libraries.tex` in the spec column; and
`FACTS.md:79` does give a third span, `CompilerLibrary.fsi:168-204`.

What must change is listed in §8.

## 8. Required corrections

1. **Row 71 must get an append; `record.md` currently says it needs none.**
   `record.md` asserts "nothing either row claims has become false" of rows 71
   and 138. Row 71's note reads: "`LexicographicOrder` and `Maybe` are still
   missing, so `import List` still fails and this row stays open". Rung M makes
   half of that false. My probe `probes/skeptic/SkImportList.fss` (`import
   List.{...}` and nothing else) now fails on `LexicographicOrder`,
   `Comprehension`, `BigReduction` and `MonoidReduction` only — `Maybe` and
   `HasRank` are gone from the list. Append to row 71 naming rung M, the date,
   and the four names that remain.

2. **The failure-mode fact must be recorded, as an append to row 321.** §6. The
   append needs: that `Library/CompilerLibrary.fsi:234` / `.fss:580` adds a
   second member-less prelude object; that `println(Nothing)` and
   `Nothing.asString` compile `rc=0` and then `StackOverflowError`
   (`probes/skeptic/SkBareNothing.txt`, `SkNothingAsString.txt`); that the
   shipped `None` does the same, so the defect is row 321's and not the rung's
   (`SkBareNone.txt`); and that for this name the diagnosis moved from compile
   time to run time. `REPORT.md` needs the same as a failure-mode section.

3. **The `isNothing` divergence must be recorded.** `Just[\ZZ32\](7).isNothing`
   answers `false` compiled and is "Cannot find definition for method isNothing"
   under walk (`probes/skeptic/SkIsNothing.txt`). `convenience.tex:47` declares
   `isNothing: Boolean` on `Maybe`; the interpreter's `Maybe`
   (`FortressLibrary.fss:1306-1310`) has no such member. Rule 4, outcome 2: the
   compiled side is right and a row is owed against the interpreter. The rung
   added the member and its own test asserts on it, so this divergence is the
   rung's to record; whether it becomes a row of its own or an append is the
   coordinator's call.

4. **The deviation list must name the members the new `Maybe` does not carry
   that the interpreter's does.** Deviation 7 covers `SQCAP` and deviation 9
   covers `AnyMaybe`/`UniqueItem`/`NotUnique`, but `opr =`
   (`FortressLibrary.fss:1332`), `opr |self|` (`:1317`), `opr IN` (`:1331`) and
   `opr[i]` (`:1321`) are silently absent, all four because `Option` has them
   commented out. `Just(7) = Just(7)` and `|Just(7)|` answer under walk and are
   static errors compiled (`SkEqAbs.txt`, `SkAbs.txt`). The choice is right —
   the specification declares none of them and `Option` is the precedent — but a
   list of nine deviations that omits four is not a list a later rung can rely
   on.

5. **`record.md`'s `Option` body span must be `CompilerBuiltin.fss:1308-1367`,
   not `:1308-1365`.** The FACTS line names "`Option`/`Some`/`NoneObject`/`None`"
   and then gives a span that stops at `NoneObject`'s `end`; `value object None
   end` is at `:1367`. The provenance block already has `:1308-1367` and is
   right; `record.md` and `REPORT.md` §6 disagree with it.

6. **Two sentences overclaim and should be trimmed to what was measured.**
   (a) Row 329 says `ExceptionScoping.fss` and `oddJuxt.fss` "would otherwise
   have passed". What is measured is that each now carries exactly one error and
   that it is this spelling; a zero-error compile is not a passing run, and the
   rung's own table says no file in the subset reaches `pass`. (b) The FACTS line
   about `syntax_abstractions/` argues it "cannot reach the gate" from a `grep
   -rln 'grammar '` over `compiler_tests/`, `other_compiler_tests/` and
   `library_tests/`. That grep does not cover `syntax_abstraction_tests/`, and
   `SyntaxAbstractionJUTest` **is** in `testFast` (`build.xml:974` includes
   `**/*JUTest.class` in the misc track and `:987` excludes only
   `SyntaxAbstractionJUTestAll`). The conclusion is nevertheless correct, for a
   different reason I checked: that suite runs one file, `ForUse.fss`, through
   `StaticTestSuite.StaticTestCase`, whose `compile` sets
   `Shell.setPhaseOrder(PhaseOrder.interpreterPhaseOrder)`
   (`ProjectFortress/src/com/sun/fortress/compiler/StaticTestSuite.java:334`), so
   it never loads `CompilerLibrary`. Replace the reason with that one.

## 9. What I checked and did not fault

- The decision itself. I weighed the fork independently before reading §5 and
  reach the same answer: `convenience.tex:49` plus `exceptions.tex:122,124` are
  two independent prose passages, the team's own draft for this world agrees
  with them, `FortressLibrary.fss:1340-1341` concedes the point against its own
  code, and the compile path has the coercion that makes the specification's
  spelling work. Corpus usage is evidence of what was written, not of what the
  language is. The alternative is costed honestly and the cost of the choice is
  carried as a ledger row rather than hidden.
- That the two spellings cannot coexist. `probes/DualNothing.fss` measures it
  and the capture says what the report says.
- That the specification's own declaration is refused by both paths for the same
  reason, name resolution and not codegen. `probes/WhereClauseNothing.txt` shows
  `T is undefined` and `rc=255` from `compile` and from `walk`.
  `Specification/fortress/preamble.tex:82` lists "where clauses and conditional
  extension" among the unsupported features, one line below the `:81` the report
  cites for type aliases; that is a cleaner citation for the same point and
  worth adding, though not required.
- The ungated fallout. `probes/UngatedAmbiguity.txt` matches the captures in
  `logs/ungated/` (I spot-checked `GenTest3`: baseline 6, now 13) and none of the
  seven is gated (`map/test-coverage.md:32`).
- The relaunch. The branch carried three commits from an earlier attempt; the
  report says what was inherited and what was re-verified, and the four
  corrections it lists against that attempt are real ones. `git status` is clean
  but for `tmp/`.

