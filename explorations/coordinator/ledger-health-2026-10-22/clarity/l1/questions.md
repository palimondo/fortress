<!-- The ledger clarity run's chunk l1: the rows that only a run can settle, each with its narrow question, the command that settles it, and what each answer means for the row. -->

# Chunk l1: questions for a run

## Row 219: does walk now load a `Char` array beside an `RR64` vector in one overload family?

**Question.** Under walk at `63e420a33`, does `explorations/apl/rung-1/r07_edge.fss` load past its pair `tally[\nat s\](v: Vector[\RR64,s\])` beside `tally[\nat s\](v: Array1[\Char,0,s\])`, and print `tally(c) = 5.0`?

**Why it is open.** The row's last measurement, "fails the Meet Rule", is from `5262a2412` (climb batch 18 rung W). Climb batch 19 rung P (`a93fb3bfd`, with `84957e6ef`) then made walk read exclusion over the whole parameter type, through supertypes (F-258). `Vector[\RR64,s0\]` extends `Array1[\RR64,0,s0\]` (`Library/FortressLibrary.fsi:1616-1617`), so a value of both domains would be one `Array1` instance with `RR64 = Char`: by F-258 the two exclude, and the pair should load. The same work's probe shows microGPT's similar pair, `mul[\I\](Array[\RR64,I\], …)` beside the `Vector`/`Matrix` forms, going from "refused, Meet Rule" to "loads" (`explorations/perf-probes/existential-reduction/REPORT.md:178`). No test holds the `Char` case.

**Command.**

    cd /home/user/fortress && bin/fortress walk explorations/apl/rung-1/r07_edge.fss

**If it loads and prints `tally(c) = 5.0`:** the row is fixed by `a93fb3bfd`. Write a walk test of the pair (both calls asserted, citing `overloading.tex`, section "Declarations with Static Parameters"), see it pass, and close the row with `ledger.py close 219 --commit a93fb3bfd --test NAME`. The `aplShowC`/`aplTallyC` workaround of `explorations/apl/rung-1/REPORT.md` is then no longer needed for this shape; an array of arrays (`r14_nested.fss`) is a separate case to run the same way.

**If it is refused:** rewrite the row with the message the run prints (since `5262a2412` walk words it "fails the Meet Rule"), name the pair's reading under F-258 that refuses it, and drop "siblings: 159" (row 159 is FIXED, `6d187d069`).

**The same question for F-155.** F-155 says two declarations of one name that differ only in the element type are refused at load, "as for `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`". Its wording predates F-258. A probe with that pair under walk settles whether F-155 still holds; if the pair loads, F-155 needs rewriting through `record.py` (not this workflow's step).
