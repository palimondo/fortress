# Rung X, rung-return-rule-object: the skeptic's check

Verdict: **approved**, with one fix of mine, a correction, settled. Head judged: 818dd945bb. Two launches of this role worked the rung: the first stopped with the machine about two minutes in, having read the report and started one count run, which it left without output; this one started every run again.

The count and distance tables in REPORT.md are those of the worker's head. No stage and no suite ran after my fix, which changes no Java and no Scala.

## What I checked

1. **The stages.** The worker's files under `tmp/rung-return-rule-object/` hold what the report declares: `diff explorations/compile-ladder/climb-batch-32/gate/checker-count.txt tmp/rung-return-rule-object/count/change.txt` prints nothing, and `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-32/gate/distance.txt tmp/rung-return-rule-object/distance-postedit.txt` prints `DISTANCE SAME   0`. In the transcript the last change of code is the edit of `OverloadSet.java` at 01:15:02Z and the build starts at 01:15:53Z; the count run on the change, the distance run (01:22:07Z) and `ant testFast` all start after it. I ran the count stage myself, base build then the worker's head, in one session (`time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, each from its own tree):

   | run | real | user |
   |---|---|---|
   | base, `/home/user/fortress-base35` | 92.8 s | 131.6 s |
   | head, 818dd945bb (the code of f145926e3b) | 88.5 s | 139.2 s |

   The worker's were 93.6 s and 93.2 s. My two tables are equal, my two `run.txt` files (33 lines each) are equal once the tree and scratch paths are one word, and my head table and `run.txt` equal the worker's.
2. **Test first.** Call `FkiArn`, 01:15:31Z: `junit.sh base2 ... OverloadReturnObjectDomain.test ...` on the seeded build, whose `implementation.stamp` the same call shows equal to the base build's; it prints 'the return type of Circle->Circle @ ... should be a subtype of the' and `File OverloadReturnObjectDomain.fss has 3 errors.` The first `ant compileAll` starts in call `pN7gHR`, 01:15:53Z, after that run ended. Call `K31B92`, 01:17:28Z, after the build and the library order: `. run ProjectFortress/compiler_tests/OverloadReturnObjectDomain (778ms) ident Circle ... PASS`. The edit was first compiled into a scratch folder (01:10Z), never into the build before the failing run.
3. **The diff against the section, the specification and P-45.** The substitution `T ↦ T ∪ C` parameterizes exactly the instances with `C <: T`; where a bound makes `T ∪ C` no instance the rule compares more, never less. So the edit accepts no pair that the Return Type Rule (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters") refuses. My programs below test this where the type parameter stands in an invariant, a contravariant, a second and a bounded place. The edit is narrower than fork X1's words: it sets aside the instances that an object type shows empty, and no others. The report says so; fix 1 gives the tuple case its home.
4. **Where the fix belongs.** The three callers of `satisfiesReturnTypeRule` take the repair unedited. `OverloadSet` has two `ARETURN` sites (`OverloadSet.java:1831`, `:1948`), and both have the cast. No library device was passed over.
5. **The tests.** One comment line each, named by topic, no citation of the specification by line.
6. **My programs** (below).
7. **The three homes.** The report's five defects have theirs. Two that my programs measure had none: fix 1.
8. **The ledger and sibling sites.** `ledger.py find` with "Return Type Rule", "FunctionalMethod", "Missing type T", "generic dotted method beside": rows 723, 724 and 760 hold what `SkK` and `SkL` meet; rows 998 and 550 are rung V's.
9. **The report.** Each cited line opened. One citation was wrong and is corrected (fix 1): the count stage's `java` line is `explorations/coordinator/tools/checker-count/run.sh:95-97`, not `:104-106`. The whole-suite run is `ant testFast` on the head's code, `BUILD SUCCESSFUL`, 1624, 263 and 86 tests.
10. **Competing declarations.** `grep -rn "meetingInstances\|castArmResultToRange\|armResultIsCastToRange" ProjectFortress/src/com/sun/fortress/` finds only the new members and their calls.
11. **The failure mode.** Where the checker's refusal goes, the value is the result of the most specific declaration that takes the arguments, as the specification gives it, and walk prints the same lines. Two loud failures change place: a generic functional method beside a plain one on an object type, in an object, was refused by the rule and now stops the code generator (`ClassCastException: ... FunctionalMethod cannot be cast to ... Method`, row 724, which the base's code shows on a pair it accepts); a pair that the base's code accepted and that died at class load now runs (`SkU`).

## My programs

In `tmp/rung-return-rule-object/skeptic/p/`. New code: `cd ProjectFortress && ../bin/fortress compile P.fss && ../bin/fortress run P`. Old code: `old-fortress.sh /home/user/fortress-base35 tmp/old-caches compile P.fss`, then `run P`. Walk: `bin/fortress P.fss` on the rung's tree, whose walk is the base's. No program holds mutable state, so none was run at four threads.

| program | base's code | the rung's code | walk |
|---|---|---|---|
| `SkA`: `g[\T extends Object\](x: T): Bx[\T\]` beside `g(x: Circle): Bx[\Circle\]` | refused | refused, 'the return type of Circle->Bx[\Circle\]' | |
| `SkB`: `h[\T\](x: T): (T -> ())` beside `h(x: Circle): (Circle -> ())` | refused | refused | |
| `SkC`: `pick[\T\](x: T, y: T): T` beside `pick(x: Circle, y: Square): Square` | refused | runs: `pick CS`, `pick generic`, `pick CS`, `pick generic`, `pick generic`, `PASS` | the same six lines |
| `SkD`: the generic `pick` beside `pick(x: Circle, y: Shape): Shape` | refused | refused | |
| `SkD2`: beside `pick(x: Circle, y: Circle): Shape` | refused | refused | |
| `SkE`: `g[\T extends Shape\](x: T): T` beside `g(x: Circle): Circle` | refused | runs: `g Circle`, `g generic`, `g Circle`, `g generic`, `PASS` | the same |
| `SkE2`: beside `g(x: Circle): Shape` | refused | refused | |
| `SkF`: `first[\T\](x: T, y: Any): T` beside `first[\U\](x: U, y: Circle): U` | runs | runs, the same four lines | |
| `SkG`: `keep(self): Box[\T\]` in `object Box[\T\]` beside `keep[\T\](x: T): T`, one name for both parameters | refused | runs: `keep Box`, `keep generic`, `keep Box`, `PASS` | the same |
| `SkH`: `neg[\T\](x: T): T` beside `neg(p: Pt): Pt`, `Pt` a value object | refused | runs: `neg Pt`, `-3`, `neg generic`, `neg Pt`, `PASS` | the same |
| `SkI`: `ident[\T\](x: T): T` beside `ident(x: ZZ32): ZZ32` | refused | refused, the same message | |
| `SkJ`: `two[\T\](x: T): (T, T)` beside `two(x: Circle): (Circle, Circle)` | refused | runs: `two Circle`, `two generic`, `two Circle`, `PASS` | the same |
| `SkK`: dotted `m[\T\](x: T): T` beside `m(x: Circle): Circle` in an object | refused | runs: `m Circle`, `m generic`, `m Circle`, `PASS` | 'Missing type T' (row 760) |
| `SkL`: functional `fm[\T\](self, x: T): T` beside `fm(self, x: Circle): Circle` in an object | refused | the code generator stops (row 724) | 'Missing type T' (row 723) |
| `SkL2`: the same with both returning `()` | the code generator stops (row 724) | the same | |
| `SkM`: `ident[\T\](x: T): T` beside `ident(x: Q): Q`, `trait Q comprises { R }` | refused | refused | |
| `SkN`: `g[\T, S\](x: T, y: S): T` beside `g(x: Circle, y: Square): Square` | refused | refused | |
| `SkN2`: `g[\T, S\](x: T, y: S): S` beside the same | refused | runs: `g CS`, `g generic`, `g CS`, `PASS` | the same |
| `SkP`: `g[\T\](x: T): T` beside `g[\U extends Object\](x: Bx[\U\]): U` | refused | refused | |
| `SkR`: the generic `ident` beside one on `Circle` and one on `Square`, called through `Any` | refused | runs: `ident Circle`, `ident Square`, `ident generic`, `ident generic`, `PASS` | the same |
| `SkU`: `g[\T extends Object\](x: T, y: Bx[\T\]): T` beside `g(x: Circle, y: Bx[\Circle\]): Circle` | compiles; the run prints `g Circle` and dies, 'VerifyError: Bad return type' | runs: `g Circle`, `g generic`, `PASS` | the same three lines |
| `SkV`: `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` | refused | refused, 'the return type of (Circle, Circle)->(Circle, Circle)' | `ident pair`, `ident generic`, `PASS` |
| `SkW`: beside `ident(x: Circle -> Circle): (Circle -> Circle)` | refused | refused | `ident arrow`, `ident generic`, `PASS` |

Every refusal that must stay stays (`SkA`, `SkB`, `SkD`, `SkD2`, `SkE2`, `SkN`, `SkP`). Every pair that the rung newly accepts runs, and where walk runs it the two paths print the same lines.

For the reserved points: the count stage on the base build and on the head gives equal tables and equal output, so no pair of the one library changed its verdict and the count did not rise; `SkF`, a pair of the kind the existing tests hold, has one verdict and one output on both; no model line is touched.

## Fix 1, a correction (commit 092490bfb8)

**Finding.** The report names, in its deviation line and in its second question for the curator, valid pairs that the rule still refuses, and gives them no test and no row; row 542 closes, so they would leave the record. And the sentence the rung wrote in `Specification/appendices/changes.tex:3097-3104` said that the rule "counts only the instances ... whose parameter type meets the more specific declaration's in a type other than BottomType", which holds at an object type only: `SkV` is refused on the rung's code. Of the three kinds the question names, one is not valid: over an arrow type the pair breaks the rule, since `Any -> Circle` is a subtype of `Circle -> Circle` and the generic declaration's instance there returns that type (`Specification/basic/types-vals-vars.tex`, "Arrow Types": arrow types do not exclude each other). The report's citation `types-vals-vars.tex:537` is of the section "Function Types", the types of function values, not of a parameter's arrow type. Walk loads that invalid pair (`SkW`).

**What the commit does.**
- `ProjectFortress/compiler_tests/XXXOverloadReturnTupleDomain` (`.fss`, `.test`): the tuple pair, asserting the specification's answer, an expected failure. Settled by `Specification/advanced/overloading.tex:555-559` ("for every argument type other than BottomType to which d1 is applicable, and for every instance of d2 that is applicable to it") with `Specification/basic/types-vals-vars.tex:342-355` ("A tuple type excludes any non-tuple type other than Any and Index").
- `Specification/appendices/changes.tex`: the sentence now speaks of an object type, and names the tuple pair as still refused. REPORT.md, "Sentences of the specification", carries the text as it stands.
- `record.md`, "The skeptic's additions": NEW-X-3 (the tuple pair), NEW-X-4 (walk loads the invalid pair over an arrow type; row only, since rung V edits that check in this batch), one more sentence for F-75, and `SkU`'s change.
- REPORT.md: the citation of `run.sh`.

**The test through the harness.** It comes with no fix, so it has no failing run; it is green on both codes, and red when the defect does not show.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk-head ProjectFortress/compiler_tests XXXOverloadReturnTupleDomain.test
    the return type of (Circle, Circle)->(Circle, Circle) @ ProjectFortress/compiler_tests/XXXOverloadReturnTupleDomain.fss:8:1-77 should be a subtype of the
     Saw expected failure
    OK (1 test)

    old-fortress.sh /home/user/fortress-base35 tmp/old-caches junit ProjectFortress/compiler_tests/XXXOverloadReturnTupleDomain.test
     Saw expected failure
    OK (1 test)

    the same junit.sh line, the plain declaration returning Any for one run, then restored
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 1,  Failures: 1,  Errors: 0

## Where I differ from the worker's account

- Its second question for the curator asks whether the rule should set aside the instances that "a tuple type, a function type or a one-object comprises clause shows empty". The tuple of object types is settled by the specification and is now an expected failure; the arrow type must stay refused; the `comprises` clause that lists one object (`SkM`) is the open part, the reading that fork V4 keeps out of walk for this run.
- The cast in `OverloadSet.java` is right as built: the Return Type Rule makes the arm's result a value of the range wherever the arm is reached, the two return sites are all there are, a dispatcher whose range is no static parameter is unchanged (`SkJ`, `SkF`), and it repairs a pair that the base's code accepted and could not load (`SkU`). It stays a point to report as a file beyond those named.

## For the gather

- NEW-X-1 to NEW-X-4 take their numbers; `changes.tex`'s new sentence names no row.
- Row 542's close and F-75's rewriting are in `record.md`.
