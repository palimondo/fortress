# Climb batch 27: the judge's ruling on the merged-diff review

Decision: **repair**, the review's way (b). A repair round fixes row 921 in walk, so that an overloaded method called on a receiver under a type assumption dispatches. With that fix, `turnersParaffins0` reaches its end again and the team demo stays as the team wrote it.

## The finding

The review's one blockingCode finding: `ProjectFortress/demos/turnersParaffins0.fss:403-408` writes its expected map's keys `0 asif ZZ32`. Rung N gave `ZZ32` a pair of `=` per coercion (`Library/FortressLibrary.fss:776-780`), so `=` is now overloaded at `ZZ32`. The demo stops at `Library/Map.fss:165` (`if pk = ck`) with 'Unexpected method value ... given receiver (0: ZZ32 asif ZZ32)' (the gather's demo driver, 'demos: 52 run, 51 reached their end'; F-283; PLAN item 73).

## What each side got right

The review was right on these points:

- **The cause.** The message is raised at `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:106`. In the `FAsIf` branch (`:67-100`), walk looks up the method in the assumed trait's members. For an overloaded name that lookup yields an `OverloadedFunction` rather than a `Method`, and the check at `:103-112` refuses it. This is row 921. Its own test, `ProjectFortress/tests/XXXAsIfOverloadedMethodWalk.fss`, already exists.
- **N alone.** Rung N is the only rung involved. No other rung's hunks reach `ZZ32`'s `=` or walk's dotted dispatch.
- **This acts against P-79.** P-79 is **Every team demo is kept running as the tree changes**: "If a change breaks a demo and the way to repair the demo is known, the batch that makes the change also rewrites the demo". The way the review offered as (c), landing with the demo stopped, acts against that decision. So the review was right to list it with holdsPush true. A judge does not take that way without the curator.

The review and the gather were incomplete on one point:

- **Respelling the demo.** The gather found no respelling it could show: keys without the assumption would make walk build the map at its run-time class (PLAN item 73; the revival rules on numerals under walk, row 364). Way (a) would also change a demo that is correct Fortress just to hide a walk defect.
- **The specification decides.** `Specification/basic/expressions/type-annotation.tex:42-53` says the value of `e asif T` is the value of `e`, and that for the purposes of the immediately enclosing invocation the value is taken to be of type `T`, both statically and dynamically. By that rule, `(0 asif ZZ32) = (0 asif ZZ32)` must dispatch among `ZZ32`'s `=` declarations at `ZZ32`, which gives `=(self, b: ZZ32)`.
- **So (b) is the known way.** The specification gives the behaviour, and row 921 has a test ready to promote. P-79's "made to run again once the feature is built" therefore points to (b).

Under the specification the key would not even reach `Map.fss:165` wrapped. The wrapper comes from row 919: walk keeps an assumption past its enclosing call. Here it survives inside the tuple of the varargs of `opr {|->[\Key,Val\] xs:(Key,Val)... }` (`Library/Map.fsi:100`), because `NonPrimitive.stripAsIf` (`interpreter/evaluator/values/NonPrimitive.java:117-126`) strips only top-level arguments. This ruling does not fix row 919 (forCurator).

## Repair instructions

1. Promote row 921's test. `git mv ProjectFortress/tests/XXXAsIfOverloadedMethodWalk.fss ProjectFortress/tests/AsIfOverloadedMethodWalk.fss`, and rename the component inside it. Follow `references/tests-writing.md` on promotion, with no `.test` file unless the old one had one.
   - Keep the `pick` assertion: it must give "Named picks Named".
   - Add the demo's case for the overloaded functional `=` on `ZZ32`: `assert((0 asif ZZ32) = (0 asif ZZ32), true, ...)` and `assert((0 asif ZZ32) = (1 asif ZZ32), false, ...)`.
   - Add the demo's form: a pair `(k asif ZZ32, 1)` passed through a varargs parameter of tuples, whose element is then compared with `=` inside the callee, as `Map.fss:165` does.
   - Run the test through `harness-one.sh` on the merged tree and see it fail with 'Unexpected method value' (row 921; `DottedMethodApplication.java:106`).
2. Fix `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:67-100`. In the `FAsIf` branch, a `cl` found in a trait's members that is an `OverloadedFunction` but not a `Method` stands for that trait's overloads of the name. Make it callable as a method of `self`: build an `OverloadedMethod` over its overloads (constructor at `OverloadedMethod.java:37`, environment `selfEnv`), or take its applicable overload by the arguments. Then the test at `:103-112` passes and `:114` builds the application.
   - The overloads must be the assumed trait's, chosen at the assumed argument types. The `pick` case must answer "Named picks Named", not "Named picks Leaf".
   - Do not change the `FObject` branch (`:62-65`) or the error for a name that is not found (`:104`).
   - Do not strip the wrapper anywhere: that would be row 919, which this repair leaves open.
3. Build walk as `references/build-and-caches.md` says for a Java edit. Run the promoted test and see it pass. Then run `AsIfCallsWalk.fss`, `XXXAsIfBoundWalk.fss`, `XXXAsIfTupleWalk.fss` and `XXXAsIfGenericMethodWalk.fss` through `harness-one.sh`. The first must pass. The three `XXX` files must still be expected failures, with their own messages (rows 919, 920, 922).
4. Run `turnersParaffins0.fss` under walk from `ProjectFortress/demos` and show that it reaches its end: it exits 0 and prints no "fail". Since walk changed, run the whole demo driver of `explorations/compile-ladder/rung-team-demos/REPORT.md` section 13 once on the repaired tree (F-283: a batch that changes walk runs the demos again). It must print 'demos: 52 run, 52 reached their end'.
5. Update the record.
   - Close row 921 with `ledger.py`, citing the promoted test and the fix's lines.
   - In row 919's note, drop the claim that the demo stops, and keep the row open: the demo's keys still reach `Map.fss:165` wrapped (`Map.fsi:100`, `NonPrimitive.java:117-126`).
   - Set F-283 in `explorations/coordinator/FACTS.md` back to all 52 demos reaching their end, with the new driver output, and set its `record.py` fields.
   - Correct PLAN.md's 'Where we stand' line on the demos.
   - Mark PLAN item 73 (gather.5) answered by this ruling, citing this file.
   - Note the repair in `explorations/compile-ladder/climb-batch-27/RECORD.md`. The review's holdsPush point for N is settled by it.
6. Commit locally on main with the skill's footer (`references/committing.md`), only the paths above. Do not push.

## Not ruled here

- The routed findings: there were none.
- The review's re-anchoring commit `ecccddeab`: it changes only `explorations/` and is upheld as it stands.
- The relayed user request: the review's reading, "a cloud container" for "this cloud container", matches the sentence as quoted. The copy at `.claude/skills/fortress-repo/references/sources.md:1072` is outside a repair worker's files (forCurator).
