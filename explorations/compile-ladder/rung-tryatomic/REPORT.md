# Rung B: `TryAtomicFailure` in the compiler library

problem: `tests/tryatomicTest.fss`, `nestedTransactions3.fss` and `abortTest.fss` stop at disambiguate on the name alone — `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:392`
spec: the checked exception a `tryatomic` expression throws — `Specification/advanced/parallelism-locality/transactions.tex:34-38`
precedent: the team's own three lines for this world, commented out — `Library/CompilerLibrary.fss:283-285` (pre-edit)
deviation: the three lines are moved under the `(* Checked Exceptions *)` header rather than uncommented where they lay, so the dormant block stays one block — `Library/CompilerLibrary.fss:251-255`
historical: `Library/CompilerLibrary.fss`, `Library/CompilerLibrary.fsi`

## What landed

Two lines of declaration and three of body. `Library/CompilerLibrary.fsi:105` declares
`object TryAtomicFailure extends CheckedException end` after `CastException` at `:103`;
`Library/CompilerLibrary.fss:253-255` holds the object with
`getter asString(): String = "Try/atomic failure"`, moved out of the comment block that
still holds the other eight. No `.java`, no `.scala`, no `ant compileAll`; the library
rebuild was `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`.

The three ladder files all leave disambiguate: `tryatomicTest` and `nestedTransactions3`
reach codegen and stop at `Can't compile TryAtomicExpr`, `abortTest` reaches typecheck and
stops on `abort` and `printThreadInfo`. That is the floor the batch record set
(`explorations/coordinator/CLIMB-BATCH-2.md:71`).

The rung also measured a defect that nothing in either corpus had exercised before: a
`catch` clause whose binding is referenced in the clause body compiles and then dies at
class load. It is gated here as an expected failure and carries a provisional ledger row.

## Where this belongs

`explorations/coordinator/map/spec-to-implementation.md:268` puts the compiler world's
exception hierarchy in two places: the traits and the builtin objects in
`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:707-734`, and the library-level
exception objects in `Library/CompilerLibrary.fsi:46-83`. `TryAtomicFailure` is a
library-level object in the interpreter world (`Library/FortressLibrary.fsi:1050-1051`),
so `CompilerLibrary` is its home on this path — which is where the team had already
written it. `trait CheckedException extends Exception excludes UncheckedException` is live
at `CompilerBuiltin.fsi:745-746` and `trait IOException extends CheckedException` at
`:748-749`, so the supertype needed no work.

Nothing else was needed. `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:81`
already names the object (`tryatomicFailureException = "TryAtomicFailure"`) and its one
reader is the interpreter's `forTryAtomicExpr`
(`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:224`, which
fetches the singleton from the Fortress library by that name). `CodeGen.java` has no
`forTryAtomicExpr`, so on the compiled path nothing throws it yet; that is rung X's kind
of work and out of scope here.

## The specification

Read, not grepped:

- `Specification/basic/expressions/atomic.tex:45-48` — "A `tryatomic` expression consists
  of `tryatomic` followed by an expression. It acts exactly like `atomic` except that in
  certain circumstances (see transactions) it throws `TryAtomicFailure` and discards the
  effects of its body."
- `Specification/advanced/parallelism-locality/transactions.tex:34-38` — "if it aborts due
  to a call to `abort` or due to conflict …, the checked exception `TryAtomicFailure` is
  thrown", and `:38` adds that `tryatomic` may also throw it without conflict but not
  unless another thread touches shared state. `:39-40` says `atomic` is conceptually
  definable in terms of `tryatomic`.
- `Specification/basic/exceptions.tex:67-74` — `trait Exception comprises { CheckedException,
  UncheckedException }`, and "Every exception is a subtype of either type `CheckedException`
  or `UncheckedException`". `:77-87` is the `throws` clause and the static check on it.

So the object is a checked exception with no fields. `CompilerBuiltin.fsi:731-732` spells
the same `comprises` clause with the two operands in the other order, which does not matter.

The `throws` clause of `:77-87` turned out not to be asked for: the throwing function in
the gated test has no `throws` clause and the file links clean.
`explorations/coordinator/map/spec-to-implementation.md:269` says the clause is accepted
and ignored for functions, and this rung is one more observation of that.

## Precedent, and how many ways

Two, and they agree, both verbatim the three lines this rung makes live:

- the interpreter, `Library/FortressLibrary.fsi:1050-1051` and `.fss:1569-1571`, with
  `getter asString(): String = "Try/atomic failure"`;
- this world, `Library/CompilerLibrary.fss:283-285` before the edit, inside the block
  comment `:253-291`.

The batch record's line numbers for the interpreter are three low — `.fsi:1047` is
`HiddenAPIMissing` and `.fss:1566-1568` is its body; `TryAtomicFailure` is at
`.fsi:1050-1051` and `.fss:1569-1571`. Re-anchored by symbol, as the record asked.

A third copy exists at `CompilerLibrary/FortressLibrary.fsi:1060` — a tracked directory of
2010 `.fsi` files at the repository root declaring `api FortressLibrary`, which nothing in
`build.xml` or `ProjectFortress/src` refers to. It is not a competing declaration for
either path.

**The api line carries no getter, on precedent.** None of the twelve exception objects of
`CompilerLibrary.fsi:66-103` declares `asString`, and their `.fss` bodies all define it —
`MatchFailure` at `.fsi:101` against `.fss:243-245` is the pair next door. The getter is
visible to an importer through `trait Object extends Any` / `getter asString(): String`
at `CompilerBuiltin.fsi:17-18`. The other shape in the tree is `IOFailure` at
`CompilerBuiltin.fsi:754-756`, which does declare the getter in the api. The gated test
reads `TryAtomicFailure.asString` through the api and gets `"Try/atomic failure"`, so the
shorter shape is measured rather than assumed.

**The same defect elsewhere in that file: eight sites, all left alone.** The comment block
now at `.fss:257-291` holds eight further exception objects — `CastError`, `MatchFailure`,
`DisjointUnionError`, `APIMissing`, `APINameCollision`, `ExportedAPIMissing`,
`HiddenAPIMissing`, `AtomicSpawnSynchronization`. None of them blocks any file on the
ladder: an `awk` over the `missing_name` column of
`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` returns zero rows for each of
the eight. `MatchFailure` at `.fss:262-264` would collide with the live unchecked
`MatchFailure` at `.fss:243-245` and `.fsi:101`. So eight sites counted, and the reason for
each to stay is that nothing on the path asks for it.

`explorations/coordinator/map/dormant-code.md:32` describes the block as "ten
checked/unchecked exception objects" and then names nine; the block held nine before this
edit and holds eight after. Its line numbers (`220-258`) were stale before this rung
touched anything. A corrected map line is in `record.md` for the coordinator; this rung
did not edit the map.

One more use of the name, and it is the specification's own construction: the syntax
abstraction at `ProjectFortress/syntax_abstraction_tests/For.fsi:31-45` expands
`atomic do … end` into a `label`/`while`/`tryatomic` retry loop that catches
`TryAtomicFailure`, which is `transactions.tex:39-40` written as a grammar. It is a use
inside quoted syntax, not a declaration, and it runs in the interpreter world.

## The recorded failure and the recorded pass

The gated test is `ProjectFortress/library_tests/TryAtomicRungB.fss` with
`TryAtomicRungB.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`, the form of
`library_tests/IntegralOpsRungN.test`). The harness command, every round, from
`ProjectFortress/`: `../bin/fortress junit library_tests/TryAtomicRungB.test`.

Before the edit — `explorations/compile-ladder/rung-tryatomic/raw/junit-before.txt`:

    library_tests/TryAtomicRungB.fss:24:9-23:
        TryAtomicFailure is undefined.
    …
    Tests run: 2,  Failures: 2,  Errors: 0

After — `explorations/compile-ladder/rung-tryatomic/raw/junit-after.txt`, the final run of
all three `.test` files of this rung together:

    . run library_tests/TryAtomicRungB (314ms) PASS
    …
    OK (4 tests)

What the gated test pins: that the object can be thrown and caught under its own name;
that a `CheckedException` catch clause takes it, which is the claim of
`transactions.tex:38`; that an `UncheckedException` catch clause does **not** take it and
it propagates to an enclosing handler, which is the exclusion at `CompilerBuiltin.fsi:745`;
and that `asString` is `"Try/atomic failure"` through the api. Each of the four asserts
carries its citation in the message string, and nothing else in the file does: the file has
one comment line and it points here. No `tryatomic` expression appears in it — that stops
at codegen.

## The ladder subset

`explorations/compile-ladder/rung-tryatomic/run-subset.sh` with
`explorations/compile-ladder/rung-tryatomic/subset.txt`, a copy of
`repair-r1-atomic-static/run-subset.sh` with `LADDER_ROOT` and `OUT` pointed inside this
worktree (`:26`, `:33`). Log:
`explorations/compile-ladder/rung-tryatomic/raw/subset-after.txt`; per-file captures under
`explorations/compile-ladder/rung-tryatomic/raw/tests/`.

The "before" is the batch baseline, taken on the commit this branch is cut from:
`explorations/compile-ladder/baseline-2026-09-19/raw/tests/abortTest.fss.compile` and its
two neighbours each read `TryAtomicFailure is undefined.` and nothing else, and
`ladder.tsv:193`, `:307`, `:392` record the phase as `disambiguate`. The pre-edit
`junit-before.txt` of this worktree is the same state on the same name.

| file | before | after |
|---|---|---|
| `tests/tryatomicTest.fss` | disambiguate, `TryAtomicFailure is undefined.` | codegen, `Can't compile TryAtomicExpr at …:21.13` |
| `tests/nestedTransactions3.fss` | disambiguate, same | codegen, `Can't compile TryAtomicExpr at …:25.10` |
| `tests/abortTest.fss` | disambiguate, same | typecheck, `Variable abort is not defined.` and `Variable printThreadInfo is not defined.` |

None reaches `pass`, as the record predicted, and nothing moved down. The codegen wall is
`CodeGen.defaultCase` (`CodeGen.java:1669`) reached through `forTryAtomicExpr`, which
`CodeGen.java` does not implement.

## The name checks

Both corpora, and `src` whole, for every name this rung adds — `TryAtomicFailure`,
`TryAtomicRungB`, `XXXClauseBindingRungB`, `thrower`, `throwTryAtomicFailure`,
`caughtByOwnName`, `caughtAsChecked`, `escapesUncheckedCatch`:

- no competing declaration anywhere. The only other corpus mentions of `TryAtomicFailure`
  are the three ladder files (uses) and `syntax_abstraction_tests/For.fsi:40` (a use inside
  quoted syntax).
- `grep -rn TryAtomicFailure src/ ProjectFortress/src/` gives exactly two hits, both named
  above: `WellKnownNames.java:81` and `Evaluator.java:224`. Nothing under
  `syntax_abstractions/`, which is where rung M found names the climb had not been
  grepping.

## The measured defect, and its home

**What it is.** A `catch` clause whose binding is referenced in the clause body compiles
clean and then fails at class load with `NoClassDefFoundError: <Component>$<name>`. This is
the first thing the rung's own test hit: as first written it read `e.asString` in the clause,
linked clean and died on `TryAtomicRungB$e`.

**The cause, read in the tree.** `CodeGen.forTry` (`CodeGen.java:2015-2068`) takes the
catch name at `:2041` — `Id name = _catch.getName();` — and never uses it again; the clause
body is compiled at `:2056` with nothing added to the local environment. The team's comment
three lines above, `:2034`, names the shortfall: "We really should have desugared this into
typecase, but for now…". A reference to the name then reaches `CodeGen.forVarRef`
(`:5953-5974`), where `getLocalVarOrNull` returns null at `:5956` and `:5967` builds the
class name with `NamingCzar.jvmClassForToplevelDecl`, i.e. the singleton class of a
top-level variable — a class nobody emits for a catch binding. The AST carries the name:
`Catch(Id name, List<CatchClause> clauses)`, `ProjectFortress/astgen/Fortress.ast:1640`,
whose own documented example at `:1638` is `catch e IOException => throw ForbiddenException(e)`.

**A second site, measured.** `CodeGen.forTypecase` (`:2111-2145`) never reads
`c.getName()` at all, although `TypecaseClause(Option<Id> name, TypeOrPattern matchType,
Block body)` (`Fortress.ast:1659`) carries it and the comment at `:1656-1657` gives the
example `x:String => x.append("foo")`. A clause written `x:ZZ32 => x.asString` fails the
same way, on `$x`. Two sites, one cause; that is the whole site count for "a clause
binding read and dropped" in that file.

**The probes and the differential.**

| probe | compiled path | walk |
|---|---|---|
| `explorations/compile-ladder/rung-tryatomic/probes/CatchBindingRef.fss` → `explorations/compile-ladder/rung-tryatomic/probes/catch-binding.txt` | compile exit 0, run exit 1, `NoClassDefFoundError: CatchBindingRef$e` | exit 0, `caught: Try/atomic failure` |
| `explorations/compile-ladder/rung-tryatomic/probes/TypecaseBindingRef.fss` → `explorations/compile-ladder/rung-tryatomic/probes/typecase-binding.txt` | compile exit 0, run exit 1, `NoClassDefFoundError: TypecaseBindingRef$x` | exit 0, `typecase: 7` |

The specification settles the first against the compiled run:
`Specification/basic/expressions/try.tex:56-60` — "the exception value is bound to the
identifier specified in the `catch` clause, and the type of the exception is matched against
the subclauses of the `catch` clause in turn, exactly as in a `typecase` expression" — with
the grammar `Catch ::= catch BindId CatchClauses` at `:22`. A binding that cannot be read is
not a binding.

The second site is the same cause but the prose does not cover its spelling: the 1.0 grammar
puts the identifier after `typecase` (`Specification/basic/expressions/typecase.tex:55-62`,
prose `:88-98`), the per-clause `Id :` form is only in the implementation
(`Fortress.ast:1656`), and the chapter's own note at `:15` says the section is to be revised
per the pattern-matching proposal. So for that site the prose is silent on the spelling while
the AST's documentation and the interpreter both take the binding to be readable.

**Why it is not repaired here.** The fix is in `CodeGen.java`, which rung X of this batch
edits; batch rule 1 gives one `.java` rung per batch and no two rungs the same file
(`explorations/coordinator/CLIMB-BATCH-2.md:77`). The fix itself is small and named in the
ledger note: give the clause a local, as `CodeGen` does elsewhere with
`new VarCodeGen.LocalVar(name, type, this)` plus `addLocalVar` (`:2848-2850`, `:3940-3943`),
for the duration of the clause body, at both sites.

**Home 1, a repair with a gated assert of its own.** Nothing was repaired here, so nothing
takes home 1.

**Home 2, the catch site: a gated expected-failure test.**
`ProjectFortress/library_tests/XXXClauseBindingRungB.fss` asserts what `try.tex:56-60` says
and fails today. It needed one thing no existing `XXX` test needed, and finding that out took
a measurement:

- `FileTests.java:932` sets `shouldFail` from the **`.test` file name**, and `:1052-1059`
  and `:1063-1069` hand that same flag to every stage the file drives — each `CommandTest`
  and the `TestTest`.
- For a `CommandTest` with `shouldFail`, `:384-404` demands a failure; a clean compile gives
  "Expected failure or exception, saw none" at `:402`.
- For the `TestTest`, `:534-539` folds the `run_out_*` verdict into `failed` and `:583-585`
  fails the test whenever that verdict is non-null, whatever `shouldFail` says; and
  `:276-282` demands `pass` or `PASS` in the run output even when the `.test` file sets no
  check at all.
- So one `.test` file carrying both `link` and `run` under an `XXX` name cannot pass:
  measured in `explorations/compile-ladder/rung-tryatomic/probes/xxx-runtime-failure.txt`,
  where the run says `Saw expected failure (Exit code != 0)` and the link says
  `Expected failure or exception, saw none. link` — `Tests run: 2, Failures: 1`.
- The corpus says the same thing by itself: of the 224 `XXX*.test` files in
  `ProjectFortress/compiler_tests/`, 223 drive `compile`, one drives `link`, **none** drives
  `run` and none sets any `run_out_*` key. Every one of them expects a compile-stage failure.
  That is the concrete content of the author's warning at `FileTests.java:853`.

So the check is split across two `.test` files over the one component:
`ProjectFortress/library_tests/ClauseBindingRungBLink.test` (plain name, `link` only — the
compile must succeed) and `ProjectFortress/library_tests/XXXClauseBindingRungB.test` (`XXX`
name, `run` plus `run_out_contains=REACHED`, the marker the program prints before the failing
expression). `FileTests.java:999-1005` adds every `CommandTest` before every `TestTest`, so
the link always precedes the run inside one suite. Today,
`explorations/compile-ladder/rung-tryatomic/raw/junit-xxx-expected.txt`:

    . link library_tests/XXXClauseBindingRungB  OK
    . run library_tests/XXXClauseBindingRungB (253ms) REACHED
    Saw expected failure (Exit code != 0)
    OK (2 tests)

This is the rung's first `XXX` file, so it was shown to go red on a deliberate local fix.
Replacing `e.asString` in the clause body with `TryAtomicFailure.asString` — the same string
by a route that needs no binding — makes the program print `PASS` and exit 0, and the suite
says so; `explorations/compile-ladder/rung-tryatomic/raw/junit-xxx-goes-red.txt`:

    . run library_tests/XXXClauseBindingRungB (274ms) REACHED
    PASS
    Did not see expected failure
    FAILURES!!!  Tests run: 2,  Failures: 1

at `FileTests.java:589`. The fix was undone; the committed file reads `e.asString`.

One check on the cost of adding a `run` test: `FileTests.java:1007-1017` would add a
`BytecodeOptimizeEverything` shell test and a `runOpt` re-run of every run test, and
`explorations/compile-ladder/rung-tryatomic/raw/bytecode-optimize.txt` shows that optimizer
failing on 8 of the 10 jars in this worktree's cache — `fortress.CompilerBuiltin.jar`,
`fortress.CompilerLibrary.jar` and `CompilerSystem.jar` among them, with `OutOfMemoryError`
at `-Xmx4g` — so it is broken here independently of this rung. It does not reach the gate:
`fortress.unittests.noopt=true` at `default_repository/configuration:51` is read at
`FileTests.java:1007` and hides those 226 tests, which
`explorations/coordinator/FACTS.md:78` already records. This rung adds two gated tests, not
four.

**Home 3, the typecase site: a probe and a ledger row.**
`explorations/compile-ladder/rung-tryatomic/probes/TypecaseBindingRef.fss` with
`explorations/compile-ladder/rung-tryatomic/probes/typecase-binding.txt`, cited from the same
ledger row as the catch site. It is here and not in the `XXX` file because the prose is
silent on the per-clause spelling, as above — not because it was easier; the same file could
have carried a second assert.

## A negative result, corrected

A third probe tried the specification's own binding spelling,
`typecase v = widened(true) of ZZ32 => v.asString …`, expecting a third measurement. It is
not one. Both paths reject it at disambiguate with `Variable v is not defined.`
(`explorations/compile-ladder/rung-tryatomic/probes/typecase-bindexpr.txt`, compiled and
walk), because the implemented grammar takes only `typecase Expr of`
(`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122`) and
`v = widened(true)` therefore parses as the equality expression it looks like. The
specification's `TypecaseBindings ::= TypecaseVars (= Expr)?`
(`Specification/basic/expressions/typecase.tex:55-62`) is not implemented, and the chapter's
note at `:15` defers the section to the pattern-matching proposal; the implementation's
per-clause `Id :` form is not in the specification's grammar either. Both paths agree, so
there is no divergence to adjudicate and no ledger row is opened. Worth one line for whoever
next reads that chapter: the error production at `DelimitedExpr.rats:132-138` tells the user
to "Use a binding such as `x = self` instead", a spelling the grammar ten lines above does
not accept.

## The decisions, and what was rejected

1. **The three lines go under the `(* Checked Exceptions *)` header** at
   `Library/CompilerLibrary.fss:251`, leaving the dormant block contiguous at `:257-291`.
   Rejected: closing the comment before them and reopening after, which the batch record
   allowed — it splits the dormant block in two and leaves the one live declaration between
   eight dead ones; and moving them below `:291`, which separates the declaration from its
   own section header.
2. **The api declaration carries no `getter asString(): String`.** Rejected: declaring it as
   `IOFailure` does at `CompilerBuiltin.fsi:754-756`. The twelve neighbours at
   `CompilerLibrary.fsi:66-103` declare none, `trait Object` supplies it
   (`CompilerBuiltin.fsi:17-18`), and the gated test reads it through the api, so the extra
   line would be surface with nothing behind it.
3. **The gated test does not read the catch binding; the `XXX` test does.** Rejected: keeping
   `e.asString` in the gated test, which is how it was first written and how the defect was
   found — it cannot be green until the codegen fix lands.
4. **The expected-failure check is split across two `.test` files.** Rejected: home 3 alone
   for the catch site, which the specification's clarity does not justify when a gated check
   is available; and repairing `forTry` here, which batch rule 1 forbids
   (`CLIMB-BATCH-2.md:77`).
5. **The eight remaining dormant exception objects stay commented**, `MatchFailure` in
   particular. Nothing on the ladder asks for any of them and that one collides.

## Not done, and named

- `tryatomic`, `atomic <expr>`, `abort` and `printThreadInfo` on the compiled path: all
  `.java`, all out of scope. `tryatomicTest` and `nestedTransactions3` now wait on
  `forTryAtomicExpr` alone; `abortTest` waits on `abort` and `printThreadInfo` as well.
- The clause-binding repair in `CodeGen.forTry` and `forTypecase`: the provisional ledger row
  in `explorations/compile-ladder/rung-tryatomic/record.md`.
- `ant testFast` and `ant testSystem` were not run: the batch is gated once, after the merge.
