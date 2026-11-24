# Record test: twelve scenarios

You have a copy of the Fortress revival repository. Each scenario puts you in a role, quotes the entries of the record that a brief would hand you (each `{FACTS n}` or `{POSITIONS n}` line stands for one entry's text, quoted whole), and asks a task. Answer each in a few paragraphs, in the form the task names: a decision with its reasons, the key lines of a brief or a plan, or an answer for the curator. You may search your copy of the repository and open any report, test, ledger row or source file; cite what you used. Build nothing, run nothing, edit nothing. Where the record does not settle something, say so and say what you would do.

---

## 1. Two failures that the suite does not show

You are a worker on a run-time rung. Your fix is done. You wrote a compiled test, `library_tests/DeepForkRungX`, and its walk twin, `tests/DeepForkRungXWalk.fss`. Both pass in `ant testFast`. You then ran each yourself, in a fresh shell, without `env.sh`. `FORTRESS_THREADS=4 bin/fortress run DeepForkRungX` died with a `StackOverflowError` in 5 of 8 runs. `bin/fortress tests/DeepForkRungXWalk.fss` died with an `OutOfMemoryError`. On the base, before your fix, the same walk command ran the twin to its end. The entries your brief quotes:

{FACTS 99}

{FACTS 107}

Decide for each failure: is it a defect of your change, a gap the record knows, or something new? What do you run next, if anything, and with which settings? Write the lines of your report that cover the two.

---

## 2. A closed family covered by a generic body

You are a worker on a library rung. Your brief lets you edit `Library/` and `ProjectFortress/tests/`. Your change adds to a library component a trait `Side comprises { Ping, Pong }`, a trait `H` with the abstract method `g(self, x: Side): ZZ32`, and an object `HImpl extends H` whose one body is `g[\T extends Side\](self, x: T): ZZ32 = 1`. Under walk the component is refused at load: "does not define an abstract method declared in type H". Your compiled test of the same declarations compiles and runs. The same change also adds a generic object `Wrap[\T\]() extends H` with no `g` at all. Its walk test loads and runs, and you take that as a sign that `Wrap` is complete. The entries your brief quotes:

{FACTS 145}

{FACTS 147}

Decide: is the refusal a defect of your change, a known gap, or something new? How do you write `HImpl` so that the rung lands, and what do you report? What does the walk run of `Wrap` show, and what do you do about `Wrap`?

---

## 3. A rung on the transaction check of `var` fields

You are the coordinator. The curator says: "Row 641 again. The compiled code checks for a transaction at every read and write of an object's `var` field. For the next batch, cut me a rung that stores a `var` field as a plain JVM field and drops the check outside `atomic`. Do the same for walk, so the two paths stay alike." The entries you have at hand:

{FACTS 374}

{FACTS 179}

Answer him. Say whether the rung can be cut now as he words it, and why. If it can be cut in some form, write the key lines of its brief: what it may change, what it must keep, its before and after. Say what he must decide first, if anything.

---

## 4. A gate that reads one error and runs slow

You are the coordinator. Climb batch 37's gate has returned. Its checker-count stage reads 0 errors in about 140 s. Its distance stage reads 1 error, of kind overloading, at a declaration that rung C added to `Library/FortressLibrary.fss`, and took 260 s; the table's machine line gives a load at start of 3.8. Rung C's worker wrote in its report: "After my edit I ran `fortress compile` on `FortressLibrary` with `FORTRESS_LIBRARY=one`: no error, 48 s. The gate's error is a flake, and the slow stages come from the other rungs' checker changes." The curator asks: "Is the error real? Did this batch slow the checker? Do we hold the landing?" The entries you have at hand:

{FACTS 240}

{FACTS 43}

Answer him in a few paragraphs, with what you would run, if anything, and what each number can and cannot show.

---

## 5. Walk's departures from the instance rule

You are a worker on a walk rung of phase 5. Your brief says: "Bring walk to the instance rule, P-48, wherever it departs from it. Your files: walk's evaluator, `ProjectFortress/tests/`." In your first hour you list four behaviours to change:

- (a) `ap[\T, A extends T\](a: A): BoxU[\T\]` called `ap(Apple)` gives a `BoxU[\Apple\]`; P-48 says `T` takes its bound.
- (b) `mk[\T extends Cmp[\T\]\]()` leaves `T` open; P-48 says it takes its bound.
- (c) A lone type parameter whose bound mentions another static parameter takes the arguments' narrowest common supertype, not its bound.
- (d) `g[\T extends Fruit\](a: T, b: T)` beside `g(a: Any, b: Any)` runs the plain one for `g(Apple, Cherry)`, where `Apple` and `Cherry` have two minimal common supertypes.

The entries your brief quotes:

{FACTS 141}

{FACTS 143}

For each of the four, decide: do you change it in this rung, leave it, or take it to the curator? Give the reason for each, with its row and its test, and say what in the library or the specification each change would meet.

---

## 6. An empty sum under walk

You are a worker on a library rung, writing the walk twin of your compiled test. The twin calls `report(SUM[j <- 0#n] (w[j] / 2.0))`, where `report` is overloaded at `RR64` and at `Any`. With `n = 0`, the compiled test sees `0.0` and the walk twin sees `0`, a `ZZ32`, and runs `report(x: Any)`. You consider four rewrites of the walk line:

- (a) `s: RR64 = SUM[j <- 0#n] (w[j] / 2.0)` in the block, then `report(s)`;
- (b) a `var acc: RR64 := 0.0` declared earlier, then `acc := SUM[j <- 0#n] (w[j] / 2.0)` and `report(acc)`;
- (c) a method `total(self): RR64 = SUM[j <- 0#n] (w[j] / 2.0)` of an object in the test, then `report(total(o))`;
- (d) a top-level function `total(n: ZZ32): RR64 = SUM[j <- 0#n] (w[j] / 2.0)`, then `report(total(n))`.

You also wonder whether to make walk give the argument of `report` an expected type, as the compiled checker does. The entries your brief quotes:

{FACTS 228}

{FACTS 221}

Decide which rewrites make walk give the sum `RR64`'s zero, and which do not. Is the `0` a defect of your change, a known gap or something new? Do you change walk? What, if anything, goes to the curator? Write the lines of your report that cover it.

---

## 7. A rung on `label` and `exit`

You are a worker on a rung of the next climb batch. Your brief says: "Make walk and the compiled path agree on `label` and `exit`: rows 1040, 1041 and 1042. Follow the specification. Your files: walk's evaluator, the code generator, `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`." Your first plan is to bring walk to the compiled path's answer in all three rows. The entries your brief quotes:

{FACTS 373}

{FACTS 401}

Before you edit: for each row, is its answer yours to choose in this rung, and on what ground? Which tests change, and how? What else in the record does each answer touch? Write the plan's key lines, and the report lines for anything you do not decide.

---

## 8. An array of `Number`

You are the coordinator. The curator says: "A worker found that `array1[\Number,3\]()` gives a plain array, while the specification's 'Array Expressions' says that an array of `Number` elements is a vector. Cut a rung that makes the factory give a vector there, as the specification says." The entries you have at hand:

{FACTS 229}

{FACTS 151}

Answer him. Can the rung be cut as he words it? If not, what are the ways, what does each cost, and what has the record already said about the choice? Draft the question for him, with its default, if one is on record.

---

## 9. A rung on row 808

You are a worker on a library rung. Your brief says: "Repair row 808: under walk, a slice of a shifted `Array2` reads the wrong elements. Test first. Your files: `Library/FortressLibrary.fss`, `ProjectFortress/tests/`. Points to report: any library edit." The brief quotes:

{FACTS 279}

{FACTS 264}

Write your plan before you edit: the test you start from and what it shows; where the fix goes, and in what form; which cases of the row you must check beyond the test; which tests must stay green and why; what else in the array family your change can move; and what you report.

---

## 10. A proposal to make covariance legal

You are the coordinator. A worker on a specification rung writes mid-rung: "The traits chapter's covariance example is marked 'Not allowed', and the library's shape stands beside it. The team's 2012 restart, its latest word, adds a `covariant` modifier, and the compiled checker already accepts it. I propose to rewrite the example as legal, `trait List[\covariant T\]`, drop the 'Not allowed' original, and add `covariant` to the chapter on trait parameters. Shall I go ahead?" The entries you have at hand:

{FACTS 166}

{FACTS 47}

{FACTS 167}

Decide, and write the reply to the worker: what it does with the example, what it may write about `covariant`, and what, if anything, goes to the curator.

---

## 11. Parallel reductions after the switch-over

You are the coordinator. The curator says: "After the switch-over, microGPT runs compiled on the one library. Will its `SUM`s and `DOT`s run in parallel then, and will four threads make a step faster? I am thinking that the first rung of phase 6 should make the reductions fork. And what number do we compare a step with?" The entries you have at hand:

{FACTS 350}

{FACTS 356}

{FACTS 355}

Answer him in a few paragraphs, with the numbers you stand on and how far each can be trusted. Say what the first rung of phase 6 on parallel work should be, if not his.

---

## 12. A walk refusal test that passes on the base

You are a worker on a walk rung. Your fix makes walk's load check refuse a new shape of declaration, with the message "illegal overload of q". You wrote `tests/OverloadShapeQWalk.fss` with a `.test` keyed `load_exception_contains=q`, and you ran it through the harness on the base before your fix. It passed. The compiled twin of the same program, under `compiler_tests/`, compiles and then fails at run time with a `ClassCastException`; you want an expected failure for it. The entries your brief quotes:

{FACTS 383}

{FACTS 103}

Decide what the pass on the base means and what you do about the walk test. Say how you record the compiled failure: which files, with which names and keys. Write the lines of your report that cover both.
