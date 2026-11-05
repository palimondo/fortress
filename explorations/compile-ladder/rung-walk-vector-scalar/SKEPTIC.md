# Rung W, climb batch 26: the skeptic's review

Head judged: `aee91971e` (the worker's last commit). Head after: the commit of this file, on `171655095` (the skeptic's one fix commit). The worker's `REPORT.md` and `record.md` were already on the branch, so the journal step wrote nothing and no journal commit was made. Verdict: **approved**.

## 1. What was checked

- **Count and distance stages.** The report says neither ran. `git diff --name-only 4d27fbcc5571f0157b3dfda3977b63430c66d701...aee91971e` lists `OverloadedFunction.java` under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, four files under `ProjectFortress/tests/` and two under `explorations/`: no path outside the allowed folders, and no checker Scala. The report's before is climb batch 25's landed 0 and 0; the gate runs both on the merged tree. The skeptic's commit adds only test files and record text.
- **Test first, from the worker's transcript.** Call `hTGvsA` (20:51:55 to 20:52:16 UTC): `harness-one.sh` on the base's code ('tree 4d27fbcc5', the tests uncommitted), 'with generic type, at least one pair of parameters must have excluding types', 'Tests run: 3,  Failures: 2,  Errors: 0', the guard 'OK Saw expected refusal at load'. The first edit of the code is call `ucdQNM` at 20:54:45, the build `kuZs7E` ended 20:55:37 ('BUILD SUCCESSFUL', 'Total time: 50 seconds'). Call `yd7eHG` (20:55:42): 'tree 48e01cf7f ... cache empty', 'OK (3 tests)'. No edit of code came after it; the code commit `2fd5d653e` (`7fXYbp`, 20:57:20) holds that code. `ant testSystem` on it: `tmp/rung-walk-vector-scalar/testSystem.txt` reads 'Tests run: 189, Failures: 0', '192', '184', '178', 'BUILD SUCCESSFUL', 'Total time: 3 minutes 43 seconds'. recordedFailure and recordedPass quote these lines truly.
- **The diff, line by line.** `validOnDeclaredDomains` gains two branches to `traitMethodPairValid`, which calls `genericPairValid` with the own generic first and turns `FIRST_RETURN_TYPE` and `SECOND_RETURN_TYPE` back to the order the check met the pair; `traitMethod` takes a `GenericFunctionalMethod` without static parameters of its own; `selfTypeParameter` finds the direct self-type parameter of a trait without a `comprises` clause or with only `...`; `domainsExcludeTogether` checks, at the self position, the meet against `X` at the meet as a second member; `Apart.of` makes fresh arguments from `getStaticParams()`, equal to `NodeUtil.getStaticParams(d)` for every earlier caller (`FGenericFunction.java:171-173`; `ownGeneric` kept `GenericFunctionalMethod` out of `genericPairValid` and `genericMeetCovered` at the base, `OverloadedFunction.java:2449-2451` at the base). The section asked for an intersection case in `excludesAtMeet`; the worker reads the two members at the call site, since walk reads `A & B` as `A` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:407-411`): the same rule, "an intersection excludes a type where one of its members does", in the one place it is needed. The rule is stated as P-157 states it, and no broader: only the exclusion test reads `C[\X\] & X`; specificity and the Return Type Rule read the plain trait type. One limit not in the report: `domainsExcludeTogether` reads the method's own `where` clause, not its trait's.
- **Provenance lines.** Each opened with `sed -n`: `OverloadedFunction.java:767` and `:780` at the base (`validOnDeclaredDomains`, its `NOT_READ`), `:894` and `:936` at the base (`genericPairValid`, `domainsExcludeTogether`), `EvalType.java:407-411` (`forIntersectionType` answers the first element), `Specification/advanced/overloading.tex:531`, the section "Declarations with Static Parameters". Each says what the report claims.
- **Test files.** One comment line each; each cites `overloading.tex` and `traits.tex` by section (`advanced/overloading.tex:210`, "Incompatibility Rule"; `:531`; `basic/traits.tex:31`, "Trait Declarations"), never by line. The guard's key, the generic declaration's span, is held by both messages (`overlap-base.txt` and `overlap-new.txt` in the worker's scratch: the team's message, then 'fails the Meet Rule').
- **The scratch measure.** `tmp/rung-walk-vector-scalar/scratch-run.txt`: 'BooleanOps rc=0 cachefiles=45', 'ArrayScalarExtension rc=0 cachefiles=45', 'ArrayOperatorsBesideLibrary rc=0 cachefiles=48', 'extendNumber rc=0 cachefiles=45', each from its own empty caches folder (`scratch.sh`); `Library/FortressLibrary.fss:381` and `Library/FortressLibrary.fsi:289` hold the clause again, and `git diff 4d27fbcc5 -- Library` is empty.
- **Competing names.** `traitMethod`, `traitMethodPairValid` and `selfTypeParameter` are declared nowhere else under `ProjectFortress/src/com/sun/fortress/`; the components of the new tests are declared once in the test corpora.
- **Precedent.** The section names `genericPairValid` and `domainsExcludeTogether`; the worker follows them, and counts `sameDeclaredDomains` as the one site left. A probe of a generic function whose domain equals the method's (below, `SkDup`) shows that pair reaches the new reading's No Duplicates branch, not `sameDeclaredDomains`.
- **Threads.** The diff touches no mutable variable, field, atomic block or library state; the load check runs before the program. No run at 1 and 4 threads was needed; the harness runs ran at 4.
- **The base build.** `/home/user/fortress-base26` is at `a3252d568`, an ancestor of the base `4d27fbcc5` with no difference under `ProjectFortress/src` or `Library` (`git diff --stat a3252d568 4d27fbcc5 -- ProjectFortress/src Library` prints nothing), so the old code is the base's.

## 2. The differential

Programs under `tmp/rung-walk-vector-scalar/skeptic/p/`, each run with the rung's `bin/fortress` (new walk), with `old-fortress.sh ... P.fss` (old walk), and with `old-fortress.sh ... compile P.fss` then `run P` (the compiled path, the old code: this rung changes nothing it runs).

| program | old walk | new walk | compiled |
|---|---|---|---|
| `SkNonSelfTyped`: a non-self-typed `Bx[\T\]`'s `PLUS(self, other: T)` beside `PLUS[\T\](x: Ar[\T\], y: T)`, overlapping | refused, team's message | refused, 'fails the Meet Rule' | refused, 'Invalid overloading of PLUS' |
| `SkNoNumbBound`: the vector shape with `T extends AddG[\T\]` only, no number bound | refused, team's | refused, 'fails the Meet Rule' | refused, 'Invalid overloading' |
| `SkReturnBad`, `SkReturnBad2`: `PLUS[\T extends AddG[\T\]\](x: Sub[\T\], y: T): String` inside `AddG`'s `PLUS(self, other: T): T`, the function first and last in the file | refused, team's | refused, 'fails the Return Type Rule: the second is more specific', and in the other order 'the first is more specific': the swap names the function each time | refused, 'Overload violation: ... top-level function PLUS ... is more specific than ... the functional method PLUS' |
| `SkReturnGood`: the same with the function returning `T` | refused, team's | loads; '3', '103' (each object's own `PLUS`) | refused, the same 'Overload violation' (row 894) |
| `SkMethodInside`: `AddG`'s `PLUS` inside `PLUS[\T extends AddG[\T\]\](x: Any, y: T)` | refused, team's | 'v own', 'any and group', 'PASS' | 'v own', 'any and group', 'PASS' |
| `SkObjectMethod`: a generic object's functional method beside a generic function over another object | 'object', 'function' | the same | the same |
| `SkOwnStatic`: the trait method with a static parameter of its own | refused, team's | refused, team's (decision 3) | '** bug! Number of args does not equal number of parameters in StaticTypeReplacer' |
| `SkDup`: `PLUS[\U extends AddG[\U\]\](x: AddG[\U\], y: U)` beside `AddG`'s | refused, team's | 'fails because their parameter lists have the same types' | refused, 'Overload violation' |
| `SkNotSelf`: `object Bad extends { Arry[\Rr\], AddG[\Rr\] }` with its own `PLUS` | refused, team's | loads; 'bad own' | refused: 'Bad extends AddG[\Rr\], whose self parameter is Rr, but Bad is not a subtype of Rr.' |
| `SkNotSelfBody`: the same `Bad` with no own operator, beside the array `MINUS`, `AddG`'s `MINUS` with a body | refused, team's | loads; 'group difference', 'array minus number' | refused, the same extender message (row 893) |

Commands, for example: `bin/fortress SkNotSelfBody.fss` (new walk, rc=0); `/home/user/fortress-base26/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base26 /home/user/fortress-walk-vector-scalar/tmp/old-caches SkNotSelfBody.fss` (rc=1, 'with generic type, at least one pair of parameters must have excluding types'); the same with `compile` (rc=255).

The reading refuses every overlapping pair probed, names the right rule and the right declaration, and loads the valid pairs. Two findings follow.

## 3. Findings and the fix

1. **The Return Type Rule branches of the new reading had no gated test** (a correction: the rung's own reading reaches them, the worker's tests reach only the Meet branch). Settled by the section, "Read it as genericPairValid reads two own generics", whose Return Type Rule is `overloading.tex`, "Declarations with Static Parameters". Tests added: `ProjectFortress/tests/GenericBesideTraitMethodInsideWalk.fss` (the method inside the function; loads, two asserts of dispatch; the compiled path runs it too, above) and `ProjectFortress/tests/GenericInsideTraitMethodReturnRuleWalk.fss` with its `.test`, key 'fails the Return Type Rule' (a key that holds in either order, since the order of the two declarations is not pinned).
2. **Row 893: walk loads an object that extends a self-typed trait at a type it is not a subtype of, and since this rung its load check trusts the guarantee that such an extender breaks.** `basic/traits.tex`, "Trait Declarations" (`:306-312`), makes `Bad` a static error; Appendix I says walk loads such a declaration (`Specification/appendices/changes.tex:4105-4106`), and P-146 left walk unchanged. On the base, walk refused `SkNotSelfBody` at load by luck of the team's message; now it loads, and `Bad MINUS Rr`, which two declarations fit with neither more specific, runs one of them quietly: 'array minus number'. This is the failure-mode answer: a loud refusal turned into a quiet value, against the specification. Not fixed here: the fix is walk's extender check, outside the section's file and behind P-146. Home 2: `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss` with `.test` key 'whose self parameter is', the checker's words; row 893 in the ledger.
3. **Row 894: the compiled checker refuses a generic function more specific than a self-typed trait's functional method whose Return Type Rule holds, which walk now loads** (`SkReturnGood`). The refusal is `checkFancyRule` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:413-424`), a rule that `advanced/overloading.tex` does not state (its `:525-529` read a functional method beside a function by the Meet Rule for functions); `reviews/popl2019-rules-map.md`, section 18, lists it among the checker's departures, with no row and no decision. Walk's answer is the section's reading. Home 3: `ProjectFortress/tests/GenericInsideTraitMethodWalk.fss`, which asserts walk's loading and dispatch, and row 894, `CONTESTED`, in the ledger.

The fix commit, `171655095`, "Skeptic's fix: tests of rung W's Return Type Rule branches, the self-type extender gap and the checker's rule on a function more specific than a functional method, with rows 893 and 894": the four tests, the two rows in `record.md`, and two more sentences made false in `REPORT.md` section 8 and `record.md`. No Java changed, so nothing was built and no suite run.

Failing through the harness on the base's code (`FORTRESS_HOME=/home/user/fortress-base26 /home/user/fortress-base26/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tmp>/h-old <the three plain tests>`):

    # harness-one 2026-11-05T21:24:11Z; tree a3252d568; ... cache empty
    with generic type, at least one pair of parameters must have excluding types
    FAILURES!!!
    Tests run: 3,  Failures: 3,  Errors: 0

Passing on the head (`explorations/compile-ladder/rung-inference-walk/harness-one.sh <tmp>/h-new <the same>`):

    # harness-one 2026-11-05T21:24:33Z; tree aee91971e; ... cache empty
     OK Saw expected refusal at load
    OK (3 tests)

The `XXX` test: on the base's code, ' Refused at load, but did not satisfy load_exception_contains', 'Tests run: 1,  Failures: 1'; on the head, ' Saw expected failure: loaded and ran, not refused at load', 'OK (1 test)'; and once, changed so that walk refuses it by the key (`HasRk` without `excludes { Numb }`, key 'fails the Meet Rule'), then restored: ' Refused at load as its keys name', 'Tests run: 1,  Failures: 1'.

## 4. Where I differ from the worker's account

- Decision 2's "Not taken: a new intersection case inside excludesAtMeet": the brief asked for one; reading the two members at the call site is the same rule where walk has no intersection type, and I accept it.
- Section 11, "No new defect measured": two were measured by the skeptic's programs (rows 893 and 894), added to `REPORT.md` section 11 and `record.md`.
- Section 8 missed two sentences: `.claude/skills/fortress-repo/references/interpreter.md:43` ("a pair that is neither two generic declarations nor a generic one beside a plain one" keeps the team's check) and F-252's title ("two declarations with static parameters of their own"); both added.

## 5. Points to report

The worker's five stand as it lists them. Added: the four test files and their `.test` files, all under `ProjectFortress/tests/`, a folder the section names; no file outside the section's list; no edit of `Library/` or of the checker.

## 6. For the curator

- Is `checkFancyRule`, the checker's refusal of a top-level function more specific than a functional method of its name, a rule of the language? `OverloadingChecker.scala:413-424`; `Specification/advanced/overloading.tex:525-529` states only the Meet Rule for functions; `reviews/popl2019-rules-map.md`, section 18. Row 894.
- Should walk's load check apply P-146's extender rule, now that its overloading check reads `self` as `C[\X\] & X` and so trusts it? `Specification/basic/traits.tex:306-312`; `Specification/appendices/changes.tex:4105-4106`; P-146, "walk is unchanged". Row 893.
