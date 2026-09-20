# Skeptic for rung B, `rung-tryatomic`

First judgement. **Approved, with five required corrections** listed at the end. None of
them touches the edit or the tests; all five are in the record.

**Line-number offsets against the landed tree, added by the merged-diff review of
2026-09-20**, because this judgement was written in rung B's worktree with neither other
rung applied: every `CompilerBuiltin.fsi` citation here at or below `:206` reads eight lines
lower than the landed file (rung W added eight declaration lines to that file), so `:745`,
`:745-746`, `:745-749` and `:748-756` below are `:753`, `:753-754`, `:753-757` and
`:756-764`; and every `CodeGen.java` citation reads one lower above `CodeGen.java:5951`
and sixteen lower below it (rung X's two insertions) — so `:1669` here is `:1670` in the
landed file and `:2030` is `:2031`.

What I inherited: three commits on `wip/rung-tryatomic` (`3c36200ca` the failing test and
its capture, `cde4d5982` the edit and the gated pair, `a963cac8a` the record), a clean
worktree, and a branch in sync with the remote. I re-ran the rung's suite myself rather
than trusting its logs, opened every `file:line` the report and the record cite, and wrote
eleven probe programs of my own. Everything under
`explorations/compile-ladder/rung-tryatomic/probes/skeptic/` is mine.

## 0. The provenance block

Five lines, all four citations opened with `sed -n`, all four say what the block says.

| line | citation | what it says | verdict |
|---|---|---|---|
| problem | `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:392` | `tests tryatomicTest.fss  disambiguate 2 TryAtomicFailure … TryAtomicFailure is undefined.` | holds; `:193` (`abortTest`) and `:307` (`nestedTransactions3`) carry the same row |
| spec | `Specification/advanced/parallelism-locality/transactions.tex:34-38` | "if it aborts due to a call to `abort` or due to conflict …, the checked exception `TryAtomicFailure` is thrown" | holds, and `:38` carries the no-conflict permission the report quotes |
| precedent | `Library/CompilerLibrary.fss:283-285` **pre-edit** | `git show 8590d7a9e:Library/CompilerLibrary.fss \| sed -n '283,285p'` is exactly the three lines | holds |
| deviation | `Library/CompilerLibrary.fss:251-255` | the `(* Checked Exceptions *)` header at `:251`, the live object at `:253-255`, the dormant block reopening at `:257` | holds |
| historical | `Library/CompilerLibrary.fss`, `.fsi` | `git diff 8590d7a9e...HEAD --stat` touches exactly those two files of the 2012 tree; everything else in the diff is new | complete |

The `spec:` line cites `Specification/advanced/`, not `Specification/library/apis/`. No
circular citation anywhere in the report: the two `.fsi` files it cites
(`CompilerBuiltin.fsi:745-749`, `:17-18`) are cited as *implementation*, for what the
supertype and the getter already are, with the prose authority carried by
`basic/exceptions.tex:67-74` and `basic/expressions/atomic.tex:45-48`. Both of those I read
with context: `atomic.tex:45-48` is the `tryatomic` paragraph verbatim; `exceptions.tex:67-74`
is the `comprises` clause plus "Every exception is a subtype of either type `CheckedException`
or `UncheckedException`"; `:77-87` is the `throws` clause and its static check (see my
differential 3).

## 1. The recorded failure

It exists, and it is genuinely pre-edit: commit `3c36200ca` contains
`TryAtomicRungB.fss`, `TryAtomicRungB.test` and `raw/junit-before.txt` and **no library
file**. The capture reads

    library_tests/TryAtomicRungB.fss:24:9-23:
        TryAtomicFailure is undefined.
    library_tests/TryAtomicRungB.fss:44:9-23:
        TryAtomicFailure is undefined.
    File TryAtomicRungB.fss has 2 errors.
    …
    Tests run: 2,  Failures: 2,  Errors: 0

`git diff 3c36200ca..HEAD -- …/TryAtomicRungB.fss` shows the test changed after that
capture (the two clause bodies stopped reading `e`, and a third assert was added), which
the report states and explains; the two `TryAtomicFailure is undefined.` errors are on the
`catch` clause types, which are unchanged, so the recorded failure is still the failure of
the file that now passes.

## 2. The diff

Six lines of source, and nothing else:

- `Library/CompilerLibrary.fsi:105` — `object TryAtomicFailure extends CheckedException end`,
  added after `CastException` at `:103`, exactly where the batch record asked
  (`CLIMB-BATCH-2.md:69`).
- `Library/CompilerLibrary.fss:253-255` — the object with its `asString` getter, **moved**
  out of the comment block, not copied: the diff removes the same three lines from `:283-285`.

The `.fsi` line is load-bearing and not redundant: the three ladder files fail on the name
at their own use sites, which resolve through the imported api, and every one of the
seventeen live exception objects in that api is declared in both files. It is as small as
the test needs.

Against the specification: a checked exception with no fields and no operations
(`exceptions.tex:67-74`), whose name the spec fixes (`atomic.tex:48`,
`transactions.tex:38`), whose string the team's own two libraries already fix. The supertype
was already live (`CompilerBuiltin.fsi:745-746`). Nothing in the diff goes beyond that.

## 3. The precedent search

Sound, and it followed the right one. I re-anchored both precedents by symbol:
`Library/FortressLibrary.fsi:1050-1051` is `object TryAtomicFailure extends CheckedException`
/ `end`, and `.fss:1569-1571` is the body with `getter asString(): String = "Try/atomic
failure"` — so the report's re-anchoring of the batch record's three-low line numbers is
correct. The compiler-world copy at the pre-edit `.fss:283-285` is character-identical to
what landed. The third copy at `CompilerLibrary/FortressLibrary.fsi:1060` is in the
top-level directory `FACTS.md:78` records as dead; not a competing declaration.

The api-shape decision (no `getter asString(): String` in the `.fsi`) is right, but its
count is wrong: the report says "the twelve exception objects of `CompilerLibrary.fsi:66-103`".
`sed -n '66,103p' … | grep -c '^object'` is **18** — seventeen live plus the commented
`IndexOutOfBounds`. The claim the number supports does hold: `sed -n '66,105p' … | grep -c
asString` is **0**. Required correction 1.

The dormancy count is right where it matters. I counted the block myself: `.fss:257-291`,
`grep -c '^object'` = **8** — `CastError`, `MatchFailure`, `DisjointUnionError`, `APIMissing`,
`APINameCollision`, `ExportedAPIMissing`, `HiddenAPIMissing`, `AtomicSpawnSynchronization`;
nine before this rung, which reconciles `map/dormant-code.md:32`'s "ten … " followed by nine
names. The `MatchFailure` collision is real: the live unchecked one is at `.fss:243-245` and
`.fsi:101`. Leaving all eight commented is the right call — nothing on the ladder names them.

## 4. The test

`library_tests/` is gated: `build.xml:960` declares `testFast` and `:971-973` runs `LibraryJUTest` in its own
track, and `LibraryJUTest.java:36-41` is `FileTests.compilerSuite(BASEDIR + "library_tests", …)`.
So "gated test" is true, not aspirational.

I ran the rung's three `.test` files myself, from `ProjectFortress`, with the environment
the shared prefix prescribes:

    . link library_tests/TryAtomicRungB  OK (time = 2654ms)
    . link library_tests/XXXClauseBindingRungB  OK (time = 629ms)
    . run library_tests/TryAtomicRungB (265ms) PASS
    Passed
    . run library_tests/XXXClauseBindingRungB (249ms) REACHED
    … Saw expected failure (Exit code != 0)
    OK (4 tests)

(`probes/skeptic/junit-skeptic.txt`.) The four asserts of `TryAtomicRungB.fss:48-56` are the
ones the rung's tail names: thrown and caught under its own name, taken by a
`CheckedException` clause, `asString` through the api, and **not** taken by an
`UncheckedException` clause but propagating to an enclosing handler — the exclusion at
`CompilerBuiltin.fsi:745`. Each assert message carries its citation and nothing else.
Both `.fss` files carry the 2011 licence header and exactly **one** comment line, the
`(*)` pointing at `REPORT.md`. No provenance essay.

One caveat on the split `.test` pair, which I checked rather than assumed: the `run`-only
`XXX` test depends on the `link` performed by `ClauseBindingRungBLink.test`, and
`FileTests.java:877` shuffles the directory listing. The dependency is safe because
`:999-1005` adds every `CommandTest` before every `TestTest`, so the link always precedes
the run inside one suite, and because `testCount()` (`:1100-1103`) is `Integer.MAX_VALUE`
unless `fortress.unittests.count` is set, which neither `testFast` (`build.xml:960`) nor
`testUntil` (`:1000`) sets. If someone ever runs the library suite under that property, the
two files can be separated, and then the `XXX` run fails on `run_out_contains=REACHED`
(`:534-539`) rather than reporting an expected failure. Worth knowing; not worth changing.

## 5. The competing-declaration grep

I redid it across the whole tree, all of `.fss .fsi .java .scala .rats .ast .test`, excluding
only `build/`, `tmp/`, `default_repository/` and `explorations/`. Declarations of
`TryAtomicFailure`: the two the rung edits, the two interpreter-world ones, and the dead
`CompilerLibrary/FortressLibrary.fsi:1060`. No collision. Uses: the three ladder files,
`syntax_abstraction_tests/For.fsi:40` — and **`SpecData/examples/advanced/Parallel.Abort.b.fss:28`**,
which the report's enumeration misses (required correction 3). That file is the
specification's own `atomic`-from-`tryatomic` construction, the one `transactions.tex:40`
`\input`s; it runs on the walk path only (`SpecDataJUTest.java:36-38` builds
`FileTests.interpreterSuite`), and `SpecDataJUTest` is excluded from `testFast`
(`build.xml:988`), so the edit cannot move it either way.

In `src` the report claims "exactly two hits". Case-sensitively there is one
(`WellKnownNames.java:81`); `Evaluator.java:224` spells it
`WellKnownNames.tryatomicFailureException`. The substance — those two sites and what they
do — is right; the sentence is not. Folded into required correction 3.

## 6. `record.md`

The two FACTS lines are true as written and sourced. I checked each clause: the `.fsi:105`
and `.fss:253-255` locations, the eight remaining objects, the three ladder files' new
stopping phases (my own differentials 6 and 7 reproduce the `TryAtomicExpr` wall
independently), and every one of the eleven `FileTests.java` line numbers in the second
line. All correct — and more accurate than the shared prefix's own numbers, which are stale
(`shouldFail` is at `:932`, not `:922`; `shouldFail != failed` at `:587` and `:654`, not
`:577`/`:644`; the author's warning at `:853`, not `:843`). The corpus statistic is exact:
224 `XXX*.test` in `compiler_tests/`, 223 driving `compile`, one driving `link`, none
driving `run`.

The ledger note opens one row, provisional 343 — **landed as row 351**, the manifest order
having given 343-344 to rung X and 345-350 to rung W, so every "343" in this section means
rung B's provisional number and not the landed row 343, which is rung X's (final number
supplied here by the merged-diff review of 2026-09-20). The highest number in
`explorations/fortress-gap-ledger.md` today is 342, so 343 renumbers and moves nothing, and
the note says the gather assigns the final number in manifest order. It cites rows 319, 320,
322 and 324 only to say they were not touched, which is true of the diff. A reader six
months out can check every claim in it from the committed captures: I did.

## 7. The three homes

- **Home 1 — nothing.** The rung repaired no defect it found, and claims none. Its own
  positive claim is gated as four passing asserts, which I ran (section 4).
- **Home 2 — the `catch`-binding defect.** `library_tests/XXXClauseBindingRungB.fss` +
  `.test` + `ClauseBindingRungBLink.test`. The name is `XXX`-prefixed, so
  `FileTests.java:932` sets `shouldFail` from it, and `:587` fails the test when
  `shouldFail != failed`. The file asserts what `try.tex:56-60` says, which I read in full
  with context: "the exception value is bound to the identifier specified in the `catch`
  clause, and the type of the exception is matched against the subclauses … exactly as in a
  `typecase` expression", with the grammar `Catch ::= catch BindId CatchClauses` at `:22`.
  I did not take the worker's word that the mechanism bites. I wrote my own throwaway
  `library_tests/XXXSkepMechCheck.fss` — a program that prints `REACHED` then `PASS` and
  exits 0 — with an `XXX`-named `.test` driving `run` and `run_out_contains=REACHED`, and the
  harness said:

      . run library_tests/XXXSkepMechCheck (246ms) REACHED
      PASS
      Did not see expected failure
      FAILURES!!!  Tests run: 1,  Failures: 1

  (`probes/skeptic/xxx-mechanism-check.txt`; both files deleted again, `git status` clean.)
  So the day anyone fixes `CodeGen.forTry` without closing the row, the suite goes red. The
  check is real.
- **Home 3 — the `typecase` per-clause binding.** `probes/TypecaseBindingRef.fss` with
  `probes/typecase-binding.txt`, committed, cited by the same row, and the report says
  plainly that the reason is a silent specification and not convenience. I verified the
  silence rather than accepting it: the 1.0 grammar at `typecase.tex:55-62` is
  `TypecaseBindings ::= TypecaseVars (= Expr)?` with `TypecaseClause ::= TypecaseTypes =>
  BlockElems` — there is no per-clause `Id :` form in it, the prose at `:88-98` describes
  only the binding-expression form, and the section's own note at `:15` defers it to the
  pattern-matching proposal. The implementation's form is `Fortress.ast:1656-1659`. The
  placement is right.
- **The `XXX`-mechanism finding** has no ledger row, correctly: it is a property of the gate,
  not of the language, and it is recorded as a FACTS line with its eleven citations, all of
  which I checked.

## My own differentials

Eleven programs I wrote, none of them the worker's, each run under `bin/fortress FILE.fss`
(walk) and `bin/fortress compile` + `bin/fortress run` (compiled). **Every one was run at
`FORTRESS_THREADS=1` and at `=4`**, because two of them enter a transaction and write a
mutable variable; all outputs were identical at both counts. Sources and captures in
`probes/skeptic/`; the driver is `probes/skeptic/run-skeptic-probes.sh`.

| probe | walk | compiled | verdict |
|---|---|---|---|
| `SkepExcDispatch` — clause order `UncheckedException` then `Exception`; a `CheckedException`-typed local holding the object; `asString` direct | `MATCHED Exception` / `Try/atomic failure` / `Try/atomic failure` | same three answers | agree; the exclusion holds statically and dynamically |
| `SkepIOExcClause` — `IOException` clause before `CheckedException` | `IOException is undefined.` | `MATCHED CheckedException` | no false match; the two worlds' checked sets differ (below) |
| `SkepThrowsClause` — a `throws { TryAtomicFailure }` function beside an undeclared thrower | both caught | both caught, compile exit 0 | agree, and **neither path performs the check `exceptions.tex:77-87` demands** |
| `SkepUncheckedStatic` — `x: UncheckedException = TryAtomicFailure` | rejected at run time, `RHS expression type TryAtomicFailure is not assignable to LHS type UncheckedException` | rejected at typecheck, `Right-hand side has type TryAtomicFailure, but declared type is UncheckedException` | agree in outcome; the compiled side is earlier and cheaper |
| `SkepShadow` — the component declares its own `TryAtomicFailure` | `Type name may refer to: TryAtomicFailure, FortressLibrary.TryAtomicFailure` | `… , CompilerLibrary.TryAtomicFailure` | agree; the spec sanctions it (`declarations.tex:528-533`, "No other shadowing is permitted") — this is the edit's one blast-radius fact, correction 5 |
| `SkepTryAtomicVal` — `x: ZZ32 = tryatomic do 1 + 1 end` | `2` | `Can't compile TryAtomicExpr`, `CodeGen.defaultCase(CodeGen.java:1669)` | the codegen wall, confirmed independently |
| `SkepTryAtomicState` — `tryatomic do n += 1 end` in a `try`, mutable `n`, at 1 and 4 threads | `res=COMMITTED`, `n=1` | same wall, reached through `CodeGen.forTry(CodeGen.java:2030)` | as above; the transaction commits under walk at both thread counts |
| `SkepUncaught` — uncaught `throw TryAtomicFailure` out of `run()` | `BEFORE`, then file:line and `TryAtomicFailure`, exit 1 | `BEFORE`, then `FortressException: class fortress.CompilerLibrary$TryAtomicFailure with string Try/atomic failure` and a Fortress-level stack, exit 1 | both loud, both name the exception |
| `SkepJuxtSpace` — `println("[" "a" "b" "]")` | `[ab]` | `[ a b ]` | **ledger row 76** re-measured at this commit |
| `SkepTypecaseBind` — a clause binding read, and the same clause with no binding, over an `Object` parameter | `ZZ32, binding absent` / `7` | `other` / `other` — quietly, exit 0 | **ledger row 79**, narrowed below |
| `XXXSkepMechCheck` — my own expected-failure mechanism check | — | `Did not see expected failure`, suite red | home 2's gate is a real check |

Two of these need the four-outcome question answered explicitly.

**`SkepThrowsClause`.** Both paths accept a function that throws a checked exception
without declaring it, and both catch it. `Specification/basic/exceptions.tex:77-87` says
"The body of a functional is statically checked to ensure that no checked exceptions are
thrown by any subexpression … other than those listed in the `throws` clause". Neither path
does it, so this is not a walk-versus-compiled divergence at all — it is a conformance gap
both paths share, which `map/spec-to-implementation.md:269` records as behaviour ("ignored"
on the interpreter, "accepted since 2011 … for functions" on the compiler) with an empty
ledger column. Outside this rung's scope; recommended row 1. It also retires a worry about
the rung's own test: its `throwTryAtomicFailure(): ZZ32` has no `throws` clause and links
clean, which the report notes and which my probe explains.

**`SkepTypecaseBind` / `SkepTypecaseKinds`.** The first looked like a new and serious
defect: a `typecase` over an `Object`-typed parameter fell to `else` for `7` on the compiled
path, silently, whether or not a binding was read, while walk matched `ZZ32`. It is not new,
and the second probe pins it to exactly what ledger row 79 already records. With four
scrutinees through one `typecase x: Object`:

| value | walk | compiled |
|---|---|---|
| the literal `7` | `ZZ32` | `other` |
| a `ZZ32` variable holding 7 | `ZZ32` | `ZZ32` |
| `"s"` | `String` | `String` |
| a singleton object | `Wrap` | `Wrap` |

So the type test itself is sound on the compiled path for every kind but an integer
literal, which is carried as `IntLiteral` and not as `ZZ32` — row 79's own sentence
("an integer literal is carried as `IntLiteral`, not `ZZ32`. The most dangerous item here").
Outcome: the specification settles it against the compiled run, the repair is far outside
this rung, and the row exists; I recommend an append with this narrowing, not a new row
(recommended row 3). It also explains why the worker's `TypecaseBindingRef` reached the
clause body at all — its scrutinee was a `ZZ32` local widened to `Object`, which matches.

One by-product worth a sentence, since it came out of differential 2: the two worlds'
checked-exception sets are not the same shape. The compiler world has
`trait IOException extends CheckedException` with `object IOFailure(s: String)`
(`CompilerBuiltin.fsi:748-756`); the interpreter world has no `IOException` at all and
`object IOFailure extends CheckedException` with no field (`FortressLibrary.fsi:1028`). The
specification names neither (`grep -rn IOException Specification/ --include='*.tex'` is
empty), so this is silent-specification territory, it is nothing this rung caused or needs,
and I am not recommending a row for it.

## The failure-mode question

**Nothing loud became quiet in this rung**, and I looked for it three ways.

1. The three ladder files. A loud failure became a different loud failure: `disambiguate`
   with `TryAtomicFailure is undefined.` at a source span becomes a `CompilerError` with
   `Can't compile TryAtomicExpr at file:line` and a non-zero exit. My own
   `SkepTryAtomicVal` and `SkepTryAtomicState` reproduce it from scratch. No program
   silently starts computing.
2. An uncaught `TryAtomicFailure`. Loud on both paths and self-naming; the compiled message
   even carries `asString` (`probes/skeptic/skepuncaught.txt`). This is worth stating
   because it is the new object's own diagnostic surface, and it is good.
3. The one diagnosability *loss* the rung creates, which the report describes as a defect
   but does not frame as a cost: a program of the shape `catch e TryAtomicFailure => … e …`
   used to fail at `disambiguate` with a file and a column on an undefined name, and now
   compiles clean and fails at class load with `NoClassDefFoundError: <Component>$e`. Still
   loud, still non-zero exit, but the message no longer names anything a Fortress programmer
   can act on, and the source line it does print is the clause, not the cause. That is a
   fact about this rung's day-one behaviour, it is the reason the `XXX` gate is the right
   home for it, and it does not prevent the rung from landing.

No value was substituted for a throwing stub anywhere in the diff: the diff adds a
declaration and moves three lines.

## Required corrections

1. `REPORT.md` ("**The api line carries no getter, on precedent**") and the summary's
   `precedentSearch` say "the twelve exception objects of `CompilerLibrary.fsi:66-103`".
   There are eighteen `object` lines in that range, seventeen live. Fix the number. The
   claim it supports is true and needs no other change: `grep -c asString` over
   `:66-105` is 0.
2. `REPORT.md` quotes `raw/junit-after.txt` as `. run library_tests/TryAtomicRungB (314ms)
   PASS`. The capture says `(284ms)`; my own run says `(265ms)`. A block quoted from a named
   capture has to match the capture — quote it as it reads, or drop the timing.
3. The name-check paragraph of `REPORT.md` is incomplete in two ways. It says the only other
   corpus mentions are the three ladder files and `syntax_abstraction_tests/For.fsi:40`: add
   `SpecData/examples/advanced/Parallel.Abort.b.fss:28`, which is the specification's own
   `atomic`-from-`tryatomic` example (`transactions.tex:40` `\input`s it), a better witness
   than the syntax-abstraction test for the same point, and say that it is reached only by
   `SpecDataJUTest`'s interpreter suite (`SpecDataJUTest.java:36-38`), which `testFast`
   excludes (`build.xml:988`), so this rung cannot move it. And correct "exactly two hits"
   for `grep -rn TryAtomicFailure src/ ProjectFortress/src/`: case-sensitively there is one;
   `Evaluator.java:224` spells the name through `WellKnownNames.tryatomicFailureException`.
4. `REPORT.md` cites `probes/xxx-runtime-failure.txt` for the single-`.test` measurement
   without saying that the two files which produced it are not retained anywhere (they were
   `library_tests/XXXCatchBindingProbe.fss` and a single `.test` carrying `link` and `run`,
   deleted before the commit; the names are visible inside the capture). One sentence saying
   what the probe was and that it was removed makes the measurement reproducible.
5. The record claims the edit needed nothing else and changes nothing else. One thing else
   did change, and I measured it: `TryAtomicFailure` is now an unusable spelling for a
   user declaration in any compiled component — `SkepShadow.fss` gets `Type name may refer
   to: TryAtomicFailure, CompilerLibrary.TryAtomicFailure` and `rc=255`
   (`probes/skeptic/skepshadow.txt`), where before this rung the same component compiled.
   The specification sanctions it (`Specification/basic/declarations.tex:528-533`, "No other
   shadowing is permitted in a Fortress program"), the walk world has always behaved this
   way against `FortressLibrary`, ledger row 262 is the existing authority, and the corpus
   has zero such declarations. Add the clause to the rung's FACTS line in `record.md`, with
   the citation, so the next rung that revives a name from that dormant block knows the
   rule and the cost.

## What I did not do

`ant testFast` and `ant testSystem`, per the shared prefix; the batch is gated once after
the merge. I did not touch the worker's source changes, the map, or any coordinator file. My
throwaway `XXX` mechanism files were deleted; `git status` is clean apart from this file and
`probes/skeptic/`.
