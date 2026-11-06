# Questions for the prober, chunk c20

## Row 547: does the compiled checker's verdict on SkFnBetween still depend on what the same JVM compiled before it?

The row's program has no file in the tree, and its reproducer is the harness script, not a test. Since the row was written the checker's memos changed (`ee6bfcb8d`, `3c67d5204`), so only a run tells whether the order dependence stands.

Program, compiled path, written as `ProjectFortress/compiler_tests/SkFnBetween.fss` in the prober's tree (scratch, not committed):

```
component SkFnBetween
export Executable

trait LeftResult end
trait RightResult end
trait BothResult extends { LeftResult, RightResult } end
object LeftO extends LeftResult end
object RightO extends RightResult end
object BothO extends BothResult end

trait T comprises { V, W }
  choose(self): RightResult = RightO
end
trait S comprises { U, V }
  choose(self): LeftResult = LeftO
end
trait U extends S excludes W end
trait M extends { S, T } comprises { V } end
trait V extends M
  choose(self): BothResult = BothO
end
trait W extends T end
object Vo extends V end

run(): () = println("REACHED")
end
```

With `SkFnBetween.test` holding `tests=SkFnBetween`, `compile`, `compile_err_contains=Invalid overloading of choose in trait M`, run from the main tree:

```
ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh alone ProjectFortress/compiler_tests SkFnBetween.test > tmp/junit-alone.txt 2>&1
ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests CoverageReturnGood.test SkFnBetween.test > tmp/junit-after.txt 2>&1
```

Outcomes:
- Refused alone and accepted after `CoverageReturnGood.test` (the second run fails the test): the row stands; rewrite its reproducer cell to a probe path holding these files, and its notes with the two runs' output.
- Refused in both runs: the order dependence is gone; close the row with `none` as test, the reason "two runs at c124c6b65 refuse SkFnBetween alone and after CoverageReturnGood", unless a commit since `ae4f8e38a` can be named for it (the memo commits above are the candidates).
- Accepted in both runs: the order dependence is gone and the checker accepts a family that the Meet Rule refuses; rewrite the row as that defect, beside `XXXFunctionalMethodMeetBetweenTraits` (which asserts the refusal of the same shape over `ZZ32`).

## Row 555: what does walk do now with the F-bounded form?

The row has no reproducer; its one run is `RpFJoin` in `explorations/compile-ladder/rung-walk-instance/REPORT.md` section 12, before the walk inference commits `9879d4386`, `743eb5286` and `5262a2412`. Note too that `Apple` here extends both `Cmp[\Red\]` and `Cmp[\Round\]`, two instantiations of one generic trait, which Fortress forbids; the run should show whether walk refuses that at load.

Program, under walk, written as `tmp/probe555/RpFJoin.fss`:

```
component RpFJoin
export Executable

trait Cmp[\T\] end
trait Fruit end
trait Red extends { Fruit, Cmp[\Red\] } end
trait Round extends { Fruit, Cmp[\Round\] } end
object Apple extends { Red, Round } end
object Cherry extends { Red, Round } end

fF[\T extends Cmp[\T\]\](a: T, b: T): String = "fF ran"

run(): () = println(fF(Apple, Cherry))
end
```

Command, from the main tree: `cd ProjectFortress && ../bin/fortress ../tmp/probe555/RpFJoin.fss`.

Outcomes:
- Refused at load for extending two instantiations of `Cmp`: the row's program is ill-formed, so the row's claim is false as written; the prober writes a legal form, if one exists (a single `Cmp` instantiation shared through a common supertrait), or the row is retired with this output in its notes.
- 'Cannot unify Any ... with Cmp[\T\]': the gap stands; rewrite the row with `reproducer` set to a probe path holding this program, the output in its notes, and the fixed half (now `tests/InferTwoCommonParentsWalk.fss`) dropped from the notes.
- `fF ran`: fixed in the tree; close with `none` and the run as reason, or with the commit since `669b77d03` that changed it.

## XXX tests believed to pass now

None.
