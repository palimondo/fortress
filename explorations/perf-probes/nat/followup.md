<!-- The two things REPORT.md left open, answered.  Method as in REPORT.md 1: copies of seven tracked
Scala sources patched by shadow.patch, compiled with the build's own scalac and put first on the classpath;
nothing tracked modified; every run its own cache outside the repository; commands in
followup/run-all.sh, captures in followup/.  shadow.patch now carries both fixes below. -->

# The nat shadow, followup

## 1. The two `subarray` errors are the rule's; the fix is one case in `Formula`

**Reproduced minimally.** `followup/subOv1.fss` is the library's shape renamed: a method whose own two nats
appear in its return type, declared in a trait `Up[\T, nat b0, nat s0\]` and overridden in a subtrait
`Dn[\T, nat b0, nat s0\] extends { Up[\T,b0,s0\] }`. The pre-fix shadow reports the library's error on it;
`followup/subOv2.fss`, the same with a *type* parameter in place of the two nats, is clean.

**The chain, from the trace** (`followup/f4-subOv1-trace.out`). `OverloadingOracle.satisfiesReturnTypeRule`
(`scala_src/overloading/OverloadingOracle.scala:81-107`) alpha-renames both arrows, solves the domain
subtyping for `g`'s static parameters, substitutes that solution into `g`'s return type, compares. The three
steps one would suspect are all correct and the trace shows each — alpha-renaming does rename nat
parameters, `StaticTypeReplacer` does substitute a nat argument, the equality rule answers `$nat$4 =
b$13$22`. The break is below them: `subEDsolution` hands back **unsolved** nat inference variables — `Up`'s
`b, s, o` occur nowhere in the domain, so no constraint about them is generated, and under decision E2 there
is no `killNatIvars` where the type track has `killIvars` (`Formula.scala:454`, `STypesUtil.scala:1920`);
for a *type* parameter none ever gets this far. `normalizeUA` then drops `fa`'s own static parameters
(`reduceED` removes existentials the domain does not mention), so `subUA` takes its third branch, `ta.lteq`
(`TypeSchemaAnalyzer.scala:145`), the one for two types with nothing left to infer — and `lteq` is
`isTrue(subtype(x,y))` (`TypeAnalyzer.scala:77`), which is `implies(True, c)` (`Formula.scala:253`), whose
`case (True, _) => false` (`:168`) calls **any** residue a failure, here one instantiable size.

**So the rule is wrong, not the library** — `ImmutableArray1[\T,b,s\]` is a `ReadableArray1[\T,b,s\]` by the
api's own extends clause (`Library/FortressLibrary.fsi:1411-1413`) and the checker was denying it — and no
library edit is needed. **The fix** is a case ahead of `case (True, _)` in `Formula.imp`: an `And` whose
type and op maps are empty and whose nat map is not is *true*. `reduce` has already turned every
contradictory nat entry into `False` (`nContradiction`), so such a formula says no more than "these sizes
can be made equal by instantiating a free `$nat$` variable" — satisfied, under E2. Two lines of code;
`-Dprobe.nat.strictIsTrue=true` puts the tree's answer back. Measured:

| | tree | the shadow (REPORT.md) | + this fix |
|---|---|---|---|
| `WorldFlip Library/FortressLibrary.fss` (of it, `NativeArray`) | 93 (0, it crashed) | 117 (48) | **115 (44)** |
| `FlatArrays.fss` / `FlatArrays2.fss` | 66 / 66 | 68 / 68 | 68 / 68 |

The 115 is **error-for-error identical** to the `-Dprobe.nat.argsAlwaysEqual=true` run of REPORT.md § 5c
(`f5-lib-diff.txt`, second diff, empty), so the new equality rule now causes **no** library error at all:
the 22 that remain new are ones the crash used to hide. The eight probes are unchanged line for line
(`f1-probes-fixed.out`), the five nat compiler tests byte-identical stock against shadow
(`f2-compiler-tests.out`), `Compiled12.invariantInference` still printing its twelve lines
(`f8-inference-regression.out`). The shape the rule was denying — `X[\T,b,s\] <: Y[\T,b,s\]` for an
`X extends Y[\T,b0,s0\]` — is `Vector`'s, `Matrix`'s and C4's: the rule carries the library's own slicing.

## 2. The slowdown is not the nat track: `parents` and `excludesClause`

**Profiled.** JFR on the per-declaration run, 39 287 execution samples (`followup/f3-jfr-top.txt`): **87%
are `TypeAnalyzerUtil.substitute` called from `TypeAnalyzer.parents` (`TypeAnalyzer.scala:722`, 17 591
samples) and `excludesClause` (`:747`, 16 213)**. The nat track's own additions appear in **no** sample; all
of `Formula` in 600.

**Algorithmic, and the tree's, not the shadow's.** Both re-instantiate a trait's extends/excludes clause
with a whole-type walk on every call, neither is memoized, and `excludesClause` recurses over every super,
so a shared ancestor of the numeric tower is re-instantiated once per path; the tree memoizes `pSub`,
`subtypeUA` and `validOverloading`, not these two. They depend only on the trait table and the type, not on
`env`, so a memo in `object TypeAnalyzer` is sound and survives `extend` (`:768`), which makes a fresh
`TypeAnalyzer` and drops every per-instance cache. **The fix** is that memo, fourteen lines in
`TypeAnalyzer.scala` (`-Dprobe.nat.noParentsMemo=true` switches it off); it changes no answer.

| | tree | shadow, no memo | shadow + memo |
|---|---|---|---|
| `WorldFlip` on the library, whole units | 21 s | 32 s | **13 s** |
| `WorldFlip` on `FlatArrays.fss` | 16 s | 23 s | **10 s** |
| per-declaration, declarations reached in 180 s | 47 | 43 | **164** |
| per-declaration, whole component | 554 s, 112 crashed | stopped at 46 of 446 after 767 s | **307 s, 446 of 446** |

So REPORT.md's "least comfortable number" was a tree performance bug the nat track made reachable, not a
cost of the nat design, and with the memo the shadow is *faster* than the stock tree on every run measured.
The run that would not finish now does: 446 declarations, **263 clean / 142 with errors of their own / 41
still crash** against the tree's 236 / 98 / 112, all **81 `NI.nyi` gone**, 36 of the 41 left the Java bug of
§ 8 (`f6-perdecl-after.out`, `f7-perdecl-fates.txt`).

## 3. What this does not settle

**Five declarations that were clean gain one error each**, where § 5d found one, and four of the texts are
now captured (`f7-perdecl-fates.txt`, `f9-five-new-errors.txt`). Three are one shape — a
`__bigOperatorSugar` body with no declared return type, for which the checker takes the return type of the
api's *other*, nullary overload (`FortressLibrary.fsi:96` instead of `:98`) — and have no nat in them, so it
is not the equality table on their own types; which switch causes them is untested. The fourth,
`__builtinFactory2` (`:2594`), looks like a **true positive**: its two branches no longer join, and the
declaration is sound only by its own `if b0=0 AND b1=0` guard, which the checker cannot use (§ 11's ignored
`where` clauses).

**The `isTrue` relaxation trades precision for the right answer**: `lteq(X[\3\], Y[\$nat$1\])` is now true,
and so is `lteq(X[\$nat$1\], Y[\$nat$2\])` — any comparison whose only residue is a free size is accepted.
That is the satisfiability reading the return-type rule needs, but weaker than the type track, which kills
its unsolved variables first and never faces the question. The principled alternative — keep the escaped
sizes existential as static parameters of the arrow `satisfiesReturnTypeRule` builds — was not tried; it is
an eighth file.

**The memo is a prototype's memo:** a global `HashMap` in a companion object, keyed by the trait table,
never evicted, not thread-safe; in the real edit it belongs on `TraitTable`, with the
`ProjectProperties.getBoolean` switch the tree's other caches use (`TypeAnalyzer.scala:63-69`). **Everything
else in REPORT.md § 11 stands**, the ungated suite first of all.
