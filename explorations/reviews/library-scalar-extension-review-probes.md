<!-- Two pieces of evidence for the open decision "the tower closure" (`AnyIntegral comprises { ZZ }`,
commit 02d09a39f, Library/FortressLibrary.fss:612 / .fsi:409). Probe 1 runs the compile path's
hierarchy checker over the interpreter's library three ways on copies and then runs the interpreter
against the repaired copy; piece 2 compares the blinded review with the arguments of the workers who
designed the change. Written 2026-09-20 by a delegated worker. Nothing tracked was modified: the three
libraries are copies in a private scratch directory, every run used a private FORTRESS_CACHES and
FORTRESS_THREADS=1, and `ant` was not invoked. Commands: `library-scalar-extension-review-probes/run-all.sh`. -->

# The tower closure: two pieces of evidence

Background: `explorations/reviews/library-scalar-extension-review.md` finding 3 (the blinded review),
`explorations/coordinator/postmortem-2026-09-19/library-findings-explained.md` §1 (the explainer,
default B), `explorations/coordinator/two-libraries.md` §3 and appendix (today's 93 errors at 48 sites).

---

## Probe 1 — the decisive one

### Method

Three copies of `Library/FortressLibrary.{fss,fsi}` in a private scratch directory:

| variant | the two adjacent declarations |
|---|---|
| **(a) as committed** | `trait AnyIntegral extends { QQ } comprises { ZZ } end` (`:612` / `.fsi:409`)<br>`trait Integral[\I …\] extends { StandardTotalOrder[\I\], AnyIntegral }` (`:614` / `.fsi:411`) |
| **(b) clause removed** | `trait AnyIntegral extends { QQ } end` — the tree before `02d09a39f` |
| **(c) as committed + the team's repair** | (a) plus ` comprises { ZZ }` on `Integral[\I\]` at `:614` / `.fsi:411` |

The exact edits are `library-scalar-extension-review-probes/variants.diff`.

The driver is the prelude probe's (`explorations/perf-probes/prelude/WorldFlip.java` — `Shell.useInterpreterLibraries()`
plus `PhaseOrder.compilerPhaseOrder` — with that directory's instrumented `StaticChecker` copy, which
names each compilation unit and survives the `OverloadingChecker` crash on `NativeArray`). The variant is
selected without touching the tree: `Shell.sourcePath(file, name)` (`Shell.java:1175-1188`) prepends the
*given file's own directory* to `ProjectProperties.SOURCE_PATH`, so passing `<probe>/c/FortressLibrary.fss`
makes that copy and its api shadow `Library/`; every other api (`RangeInternals`, `List`,
`FortressBuiltin`, …) still comes from the tree. Each variant got its own empty `FORTRESS_CACHES` and its
own `-Dfortress.caches`; the repository's `default_repository/caches` was never written. JDK 25, tree at
`9299b7d71`.

### The three counts

| variant | errors (`File FortressLibrary.fss has N errors.`) | of which in api `FortressLibrary` | declaration sites |
|---|---|---|---|
| (a) as committed | **93** | 110 raw | unchanged |
| (b) clause removed | **92** | 108 raw | unchanged |
| (c) committed + the team's repair | **93** | 110 raw | unchanged |

(The "raw" column is the instrumented checker's per-api count before deduplication, `@@PROBE checkApi
FortressLibrary -> errors=N`; the headline 93/92/93 is the deduplicated figure the shell reports. The set
of declaration sites is identical in all three variants — only what is reported at two of them changes.)

(a) reproduces `two-libraries.md`'s 93 exactly, and (b) reproduces the 92 of the 2026-09-16 capture
`perf-probes/prelude/06b-typecheck-errors-only.txt`. So the commit added exactly one checker error, as
the record says — **and the team's repair does not remove it. It moves it.**

### The diagnostics that name `AnyIntegral`, `Integral` or `ZZ`

Everything the tower contributes under families A and B — the twelve `excludes … but it extends …` and
`… exclude each other` messages at `.fsi:409, 411, 437, 464, 498, 536` and the six in `FortressBuiltin.fsi`,
plus the 26 family-C `does not satisfy the corresponding bound Integral[\I\]` messages in
`RangeInternals.fsi` — is **byte-identical in all three variants** (`diagnostics-*.txt`). The whole delta
is three items, all of family E (`Invalid comprises clause`):

**(b) → (a): the one error the commit adds** (`checker-diagnostics-diff.txt`)

```
FortressLibrary.fsi:411:1-435:2:
    Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause
    but its immediate subtype Integral is not eligible to extend it.
```

This is the message the review predicted, word for word, at the site it predicted
(`TypeHierarchyChecker.scala:203-208`, eligibility at `:254-266`). A pre-existing error at `.fsi:409`
("a trait with a comprises ..., such as `FortressLibrary.QQ`, should not be extended" — `QQ`'s
`comprises { ... }` in the api) is present in all three; the clause only widens its reported span from
`409:1-35` to `409:1-52`.

**(a) → (c): the repair removes that error and introduces another**

```
-  FortressLibrary.fsi:411:1-435:2:
-      Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause
-      but its immediate subtype Integral is not eligible to extend it.
+  FortressLibrary.fsi:536:1-543:2:
+      Invalid comprises clause: ZZ is included in the comprises clause of Integral
+      but FortressLibrary.ZZ does not extend Integral[\I\].
```

### Why the repair cannot work, in the checker's own code

`checkDeclComprises` checks the relation twice, in opposite directions.

* Downwards (`TypeHierarchyChecker.scala:203-208`): for each supertype `S` of `T`, `T` must be *eligible*
  to extend `S` — `isEligibleToExtend` (`:254-266`), whose third route is "`T` has a comprises clause and
  every type in it is eligible". Adding `comprises { ZZ }` to `Integral[\I\]` opens exactly that route,
  and the `:411` error goes away. That much of the review's reasoning is correct.
* Upwards (`:221-236`): for each type `ty` listed in `T`'s own comprises clause, `ty`'s extends clause
  must contain `T`'s self type — `extendsContains(tt, subst_extends, …)`, where `subst_extends` is `ty`'s
  extends clause with `ty`'s *own* static arguments substituted. Here `T` is `Integral[\I\]`, whose self
  type carries the symbolic `I`; `ty` is `ZZ`, which has no static arguments, so nothing is substituted
  and its extends clause stays `{ Integral[\ZZ\] }` (`FortressLibrary.fsi:536`). `Integral[\ZZ\]` is not
  `Integral[\I\]`, so the test fails and the `:536` error is emitted.

The second test is not satisfiable by any edit to the list: a non-parametric trait's extends clause can
only ever name an *instantiation* of a parametric parent, never the parent's own symbolic self type. So
a parametric trait cannot legally comprise a non-parametric one under this checker. The library already
records the mirror-image limitation in the team's voice at `:1296`, `:1373` and `:1588-1589`
("NOT YET: comprises … where …"); the designers' own survey states it too
(`run-c4/cold-cache/operators/D/SURVEY.md`: "the generic `Integral[\I\]`, which a comprises clause cannot
name without a where clause"). This probe adds the other half: the clause cannot be written on the
generic trait either. **Under the front end as it stands, the integral rung has no legal spelling** —
open (b) it is fine by the comprises rule, closed on `AnyIntegral` (a) or closed on `Integral[\I\]` (c)
it is one error either way. Only (b) is free of this particular error, and (b) is the tree in which the
eight generic operators do not load.

### The interpreter side for (c)

Same shadowing, `FORTRESS_SOURCE_PATH` with the variant directory first, a fresh empty
`FORTRESS_CACHES` per run, `FORTRESS_THREADS=1`, programs run directly with `bin/fortress`, not through
the suite. Variant (a) was run the same way as a control.

| run | (a) as committed | (c) with the repair |
|---|---|---|
| `ProjectFortress/tests/ArrayScalarExtension.fss`, cold | 24 checks printed, no `fail`, exit 0, 12.3 s | 24 checks printed, **identical values**, no `fail`, exit 0, 15.8 s |
| `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` | 9 checks printed, no `fail`, exit 0 | 9 checks printed, **identical values**, no `fail`, exit 0 |
| `run-c4/src/MicroGptFlatCheck.fss`, cold, first 60 s then `kill` | starts; header + 10 PASS incl. five losses | starts; header + 10 PASS, **every non-timing line identical** |

The cold C4 check reached the same ten PASS lines in both — loader, corpus, three step-0 checks and the
five batch-1 losses, `3.3659669475848513 / 3.424272783871772 / 3.177802125458053 / 3.066355684224198 /
3.2208830897506235` — before being killed at 60 s, so the generic block still loads and dispatches with
the extra clause in scope. That the interpreter is indifferent is expected and is itself the point of the
review's finding: `BuildEnvironments.java:890` stores a comprises clause and validates nothing, and
the leaf sets `FTypeTrait.computeTransitiveComprises` builds are unchanged by a clause on a trait that is
not itself a leaf of anything.

### Verdict on probe 1

The repair does **not** remove the checker's error. It exchanges one `Invalid comprises clause` error for
another, at `ZZ` instead of at `Integral`, and leaves the count at 93. It breaks nothing: the interpreter
loads the library and both gated tests and C4's cold check are unchanged. So option B of the explainer —
"the claim becomes true under `traits.tex:231-235` and passes `TypeHierarchyChecker`" — is half right and
half wrong: true under the prose rule, still refused by the checker. The decision is therefore not
"A leaves an error, B removes it" but "which of two errors do we prefer to carry, or do we carry the
clause with a comment and settle the rung when the library is actually put through the front end"
(the 93-error conversation of `two-libraries.md` §4, route (b), second piece).

---

## Piece 2 — the blinded review against the designers' arguments

Sources for the designers: `run-c4/cold-cache/operators/{RESULT.txt per route, D/SURVEY.md,
B/adjudication.md}`, the FACTS entry beginning "`MicroGptFlatCheck` does not start from a cold
interpreter cache", ledger row 341's appends. The reviewer was blinded from all of them, so every
overlap below is independent corroboration.

| # | change | where they agree | where they disagree | who holds evidence in the tree |
|---|---|---|---|---|
| 1 | the eight generic scalar operators | that the shape is the library's own (`Vector`/`Matrix` `[\T extends Number, nat n\]` operators, both operand orders) and that the ground `ZZ32` block had to *become* generic rather than gain a sibling | the reviewer rests conformance on the Incompatibility Rule plus the open question at `future.tex:264-265`; the designers' own `B/adjudication.md` holds that `Specification/basic/overloading.tex:100-105` ("it is an error … for one declaration to have static parameters and another to not have them") refuses a generic-against-method pair outright, "either way" | **designers** — the sentence is in the tree and applies verbatim to the library's new `opr +[\T extends Number, I\]` against `AdditiveGroup[\T'\].opr +(self,other:T')`; the review never cites it. Note it cuts against the change they designed. The designers also measured the necessity (`D/RESULT.txt`: `Ac`, `PplusN2c` refused against the ground block); the reviewer only argued it |
| 1 | — | — | the reviewer's two costs — the reversed non-commutative order `y - e` is a new semantic decision, and the unsized `Array[\T,I\]` return loses rank and size under static typing | **neither**; the designers measured only the interpreter, and no run has ever reached DESUGAR with this library (`two-libraries.md` §4). Reviewer's argument stands unopposed |
| 2 | the `AnyAdditiveGroup` marker | complete agreement: the literal precedent is `AnyMultiplicativeRing` eleven lines away, comment included; the device is the library's own named one | none | — |
| 3 | `AnyIntegral comprises { ZZ }` | that it is load-bearing; the mechanism, cited to the same lines (`FType.java:281-297`, `FTypeTrait.java:68-78`); that the `ZZ32` block loads only because `ZZ32`'s leaves are closed objects while `RR64`'s pass through the open `AnyIntegral`; and that the truthful clause `comprises { Integral[\I\] where [\I\] }` is inexpressible (`D/SURVEY.md` states this, citing the same `traits.tex:232-235`) | the reviewer says the clause is false as written and that the team's repair on `Integral[\I\]` "clears it"; the designers never engage with the spec rule they themselves quoted | **split, and now settled by probe 1 above.** The reviewer's premise is right (the error is real, and the designers measured everything except this). The reviewer's remedy is wrong: measured, it relocates the error to `.fsi:536` and the count stays 93. Before today the reviewer had a prediction and the designers had silence; the evidence is now in this file |
| 4 | `Array3 excludes { …, AnyAdditiveGroup, AnyMultiplicativeRing }` | that the `AnyMultiplicativeRing` half fills a hole ranks 1 and 2 had already filled (`Vector:2193`, `Matrix:2501`), and that it is what makes a *vocabulary* loadable rather than a single operator | the reviewer's cost: the clause forecloses a rank-3 additive group, the library's own next step after `Vector` and `Matrix`, and the choice was made silently | **neither** — the type does not exist in the tree, so nothing measures it. The designers measured the capability (`Pjuxt2c` green); the reviewer argues the foreclosure. Unopposed argument, and the reviewer's suggestion to put the clause on `Rank3` rather than `Array3` is untested |
| — | the two gated tests only print on mismatch | — | the reviewer calls them silently green; the record says they gate | **the record** — settled by `9299b7d71` (`explorations/compile-ladder/gate-baseline/fail-word-probe/`): `FileTests.SourceFileTest.testFile():377-380,408,415` makes the word `fail` in the output the failure signal, and a deliberately wrong copy of `ArrayScalarExtension.fss` fails the harness through the same entry point `ant testSystem` uses. The reviewer's note is wrong, and is retracted in the review itself by `37ff6feb8` |

Summary of the disagreements. Four, of which two are now closed. The reviewer's repair for change 3 is
closed against him by probe 1; his test-quality note is closed against him by `9299b7d71` and retracted in the review by `37ff6feb8`. His premise
for change 3 — that the committed clause is false under `traits.tex:231-235` and that the checker says so
— is confirmed, and the designers, whose own survey contains the spec citation, never drew the
consequence. The one disagreement where the designers hold tree evidence they did not apply to their own
work is the static-parameter sentence of `basic/overloading.tex:100-105`: by their `B/adjudication.md`
it refuses C4's user declarations *and* the library's new block alike, while the reviewer treats the
question as open. The two remaining reviewer costs — the unsized return type and the foreclosed rank-3
additive group — are arguments that nothing in the tree measures, and the designers never answered them.
