<!-- The orientation's regression quiz: neutral task questions, numbered, for a fresh reader who has only CLAUDE.md, the fortress-repo skill's core, its area parts and the orientation; the answers are graded against key.md, which the reader does not open. -->

# Regression quiz: the questions

Answer each question whose number your cases file lists. For each, give:

- your decision: the commands, the code or the steps that you would take;
- its path and scope: whether it holds under walk, on the compiled path, or on both, and before or after the switch-over where that matters;
- the passage that you relied on, with its file and section.

If you would look something up before you act, say what you would look up, where, and what you would do with what you find.

1. Your brief asks you to run `explorations/probes/Probe.fss`, a component that exports `Executable` and imports nothing, to report what it prints under walk and on the compiled path, and to say whether the program is well typed. Give the commands, and say how you settle the last point.

2. You are writing a test of a function of the interpreter's library. The specification's library chapter says that the function returns one value for an empty argument. Walk returns another, and a test that the team wrote in `ProjectFortress/tests/` asserts walk's value. What do you do, and what does your test assert?

3. You add to the library, beside `describe[\T extends Shape\](b: Box[\T\]): String`, a declaration `describe(b: Box[\Circle\]): String`, where `Circle` is an object that extends `Shape`. Your memory of the specification says that overloaded declarations may not differ in their static parameters. Do you keep the pair? On which paths does it load or compile? For an argument whose type is `Box[\Circle\]`, which declaration runs, and does the order in which the two are written matter?

4. A program declares `f(x: ZZ64): String = "wide"` and `f(x: Number): String = "number"`, binds `n: ZZ32 = 5`, and calls `f(n)`. What does the call give, under walk and on the compiled path? The same program declares `pick[\T extends Number\](a: T, b: T): T = a` and calls it with a `ZZ32` and a `ZZ64`. Does the call run, and at what type `T`?

5. You port the Java line `double seconds = elapsed / 1e9;`, where `elapsed` is a `long`, into a program that runs under walk. Write the Fortress line, with `elapsed: ZZ64`. Would your line be the same if `elapsed` were a `ZZ32`?

6. You port a Java string hash whose loop computes `h = 31 * h + c` on `int` values and relies on Java's wraparound. Write the update in Fortress for `h: ZZ32` and `c: ZZ32`. Say what it does under walk, and on the compiled path before the switch-over.

7. A numerical routine needs the tolerance 10 to the power `-k`, for `k: ZZ32`. Write the expression. Say what `10^(-k)` gives under walk and on the compiled path.

8. You write a function that adds up the elements of an `RR64` array `a` with a `for` loop over its indices and a mutable accumulator, `var acc: RR64 = 0.0`. Write it. A direct run of your test under walk prints the right sum. Is the function correct, and will its test pass in the suites?

9. You add to the interpreter's library a function `total(n: ZZ32): RR64` that returns the sum of `g(j)` for `j` from 0 to `n - 1`, where `g(j: ZZ32): RR64` is already declared. The library must pass the compiled checker's count stage and run under walk. Write the body. What does `total(0)` give?

10. A program declares `object Tag[\T\]() end` and `mk[\T\](): Tag[\T\] = Tag[\T\]()`, with no bound written on either `T`.
    - (a) Does `Tag[\(ZZ32, ZZ32)\]()` run under walk, and does it compile?
    - (b) At the call in `t = mk()`, what is `T`?
    - (c) Does `u: Tag[\ZZ32\] = mk()` run under walk, and does it compile?

11. You need a temperature type that compares with temperatures and with plain `RR64` values. You declare `trait Comparable[\T\] lessThan(other: T): Boolean end` and `object Temp(k: RR64) extends { Comparable[\Temp\], Comparable[\RR64\] }`, which defines both `lessThan` methods. The program runs under walk. Do you keep this declaration? If not, what do you write?

12. You define `object Money(cents: ZZ64)` and want `SUM` over a generator of `Money` values, as over numbers. Which library trait or traits does `Money` extend, and what must it declare? How do you write the sum? What does a sum over an empty range give?

13. In a library component, `trait Shape` declares `area(): RR64` without a body. In `object Square(s: RR64) extends Shape`, you write `override area(): RR64 = s s`. What happens under walk, in the compiled checker and in the code generator, and what do you keep in the library?

14. Trait `A` declares `pick(self): ZZ32` without a body. Trait `B` declares `pick(self): ZZ32 = 1`. `object O extends { A, B } end` declares no `pick`. Is `O` valid under walk and on the compiled path? What does `pick(O)` give?

15. Write a walk test of the library's `even` and `odd` on the integers 0 to 9. Give the whole file and its path, how the harness decides that it passed, and whether you add a file with its expected output.

16. Your test needs an `NN32` value 3, and writes `n: NN32 = 3`. Does the binding work under walk, and on the compiled path? If not, what do you write?

17. Port this Java loop: `for (long i = lo; i < hi; i++) { total = step(total, i); }`. `lo` and `hi` are `ZZ64` values that fit in 32 bits, `step(t: RR64, i: ZZ64): RR64` is declared, and each step depends on the total before it.

18. In `Library/RangeInternals.fss` you add `checkFits(r: Range[\ZZ32\], n: ZZ32): ()` beside `checkFits(r: Range[\(ZZ32,ZZ32)\], n: (ZZ32,ZZ32)): ()`. The count stage reports no new error. Walk now refuses every program at load, with an overload message that names your two declarations. What do you do?

19. Your new walk test stops with an error inside a library function that your change did not touch, and you do not recognise the message. What do you do?

20. Your brief asks for a compiled test, in `compiler_tests/`, of a function that takes an array of three `RR64` values, built in the test with the literal `[1.0 2.0 3.0]`. How do you write the test today?
