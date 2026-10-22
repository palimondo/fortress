<!-- The ledger clarity run's chunk l5: no row needs a run to settle its claim; two side questions that a later run could settle, each with its command, neither of which blocks a rewrite. -->

# Chunk l5: questions for a run

No row of this chunk has the disposition investigate. Each claim holds by reading the tree at `cdb84fba5`. The two questions below concern a note, not a claim. The rewritten lines pin each of them to the commit where it was measured.

## Row 723: does the trait face still stop walk with an InterpreterBug?

**Question.** Under walk at `cdb84fba5`, take a trait `T` that declares `g[\X extends Ping\](self, x: X)` beside `g(self, x: Pong)`, and an object that extends `T`. Does the program still stop with 'InterpreterBug ... This should have been an environment with a Top Level', or with 'Missing type X', as the object case does?

**Why it is open.** `5262a2412` added `GenericMethod.getTypeEnv` (`GenericMethod.java:98-109`, the method at `:106`), which evaluates a trait's generic method's types in the trait's method environment. `finishInitializing` (`:138-152`) does not use it, but the trait path may reach the new code elsewhere. The note was measured at `317fc0ef5`, before that change.

**Command.** A probe in a scratch folder: `bin/fortress walk TraitPairProbe.fss`, with the program above and `run(): () = println(g(O, Ping))`.

**What each answer means.** InterpreterBug: the note stands. 'Missing type': the note's message changes to that one. Runs: the trait face is fixed, and the note says so.

## Row 697: does walk still need the object-type shortcut for the library?

**Question.** With the shortcut at `OverloadedFunction.java:509` taken out in a scratch build, does `SumReduction`'s `distribute` pair still fail walk's load check now that row 433's fix (`2b1cd8e63`) declares `distribute[\K\](r: ActualReduction[\R,K\])` (`Library/FortressLibrary.fss:3250`)?

**Why it is open.** `coordinator/CLIMB-BATCH-16.md` § 4 found by reading that the repair would refuse `SumReduction`. It compared `PossibleReductionPair[\Maybe[\T\]\]` with `PossibleReductionPair[\T\]` against the old `distribute(r: Any)`. That method is gone. This is a question for the repair, not for the claim, which stands.

**Command.** In a worktree, change `:509` to `distinct |= false;` (only for the probe), rebuild walk, and run `bin/fortress walk ProjectFortress/tests/XXXReturnRuleObjectParamWalk.fss` and a `SUM` over `MaxReduction`, such as the library's `GeneratorDeclarations` test.

**What each answer means.** `SUM` loads: the repair is unblocked, and the note's last sentence becomes "not blocked by the library". `SUM` is refused: the note names the pair that now refuses.
