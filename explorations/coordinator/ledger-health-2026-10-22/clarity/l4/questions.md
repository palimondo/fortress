<!-- The ledger clarity run's chunk l4: the rows that only a run can settle, each with its narrow question, the command that settles it, and what each answer means for the row. -->

# Chunk l4: questions for a run

## Row 555: does walk fail an F-bounded call over two minimal supertypes in a program that keeps the exclusion rule?

**Question.** Under walk at `d4d454f9d`, take `Apple` and `Cherry` below two unrelated traits `Red` and `Round`, where only `Red` meets the bound (`trait Red extends Cmp[\Red\]`, `trait Round` with no `Cmp`). Does `fF[\T extends Cmp[\T\]\](a: T, b: T)` called as `fF(Apple, Cherry)` run, at `T = Red`, or does it still stop with 'Cannot unify Any(...FTypeTop) with Cmp[\T\]'?

**Why it is open.**

- The row's only example is `RpFJoin` (`explorations/compile-ladder/plan-9/probes/P1.md:47`). There `Apple` is below `Red extends Cmp[\Red\]` and `Round extends Cmp[\Round\]`, so it extends two instances of `Cmp`.
- The exclusion rule forbids such a type ("No type may extend two instantiations of one generic trait"; P-43, P-97). Walk loads it only because it applies no instantiation exclusion (row 416).
- Under the rule, an F-bound `T extends Cmp[\T\]` admits at most one of the arguments' common supertypes. Two candidates `X1` and `X2` would put both `Cmp[\X1\]` and `Cmp[\X2\]` above `Apple`.
- So the claim generalizes from an ill-formed program. Whether the defect also shows in a well-formed one depends on walk's join. The probe's error, 'Cannot unify Any(...FTypeTop) with Cmp[\T\] ... abm=T=(Any,Any)' (`P1.md:76`), shows walk taking `Any` for `T` before it checks the bound. A join that does not filter its candidates by the bound would fail the well-formed program too. That points to a failure, but no run since batch 10 has shown it. Batches 13 to 20 rewrote walk's inference (`EvaluatorBase.java`, last changed in `5262a2412`).

**Command.** Write the two programs to a scratch folder and run each:

    mkdir -p /home/user/fortress/tmp/q555 && cd /home/user/fortress/tmp/q555
    cat > L4FJoinOneBound.fss <<'EOF'
    component L4FJoinOneBound
    export Executable
    trait Cmp[\T\] end
    trait Red extends Cmp[\Red\] end
    trait Round end
    object Apple extends { Red, Round } end
    object Cherry extends { Red, Round } end
    fF[\T extends Cmp[\T\]\](a: T, b: T): String = "fF"
    run(): () = println(fF(Apple, Cherry))
    end
    EOF
    cat > L4FJoinTwoCmp.fss <<'EOF'
    component L4FJoinTwoCmp
    export Executable
    trait Cmp[\T\] end
    trait Red extends Cmp[\Red\] end
    trait Round extends Cmp[\Round\] end
    object Apple extends { Red, Round } end
    object Cherry extends { Red, Round } end
    fF[\T extends Cmp[\T\]\](a: T, b: T): String = "fF"
    run(): () = println(fF(Apple, Cherry))
    end
    EOF
    /home/user/fortress/bin/fortress walk L4FJoinOneBound.fss
    /home/user/fortress/bin/fortress walk L4FJoinTwoCmp.fss
    /home/user/fortress/bin/fortress typecheck L4FJoinTwoCmp.fss

**If `L4FJoinOneBound` prints `fF`:** the defect exists only in programs that break the exclusion rule. Make row 555 a pointer to row 416, with `ledger.py duplicate 555 --of 416 --add` and a note that a type below two instances of one F-bounding trait also fails an F-bounded call over it: `RpFJoin`, 'Cannot unify Any ... with Cmp[\T\]'. The `typecheck` line should show the compiled checker refusing `Apple`. If it accepts `Apple`, that is a new finding for row 416's compiled half.

**If `L4FJoinOneBound` fails as `RpFJoin` did:** the defect stands in a well-formed program. Rewrite row 555 on this example: "under walk, a call whose lone F-bounded type parameter is fixed by arguments with several minimal common supertypes fails, though one of them meets the bound". Its reproducer should be an `XXX` walk test of `L4FJoinOneBound`, since P-46 settles the case: a generic declaration applies where some type within its bounds takes the arguments, and `Red` is the only such type. Drop the row's "Fixed half" story, and replace "P1 unanswered" with the fact that P1 (F-143) covers only a parameter that nothing fixes.

**If `L4FJoinTwoCmp` runs under walk at HEAD:** the old example no longer fails either, and only `L4FJoinOneBound`'s answer decides the row.
