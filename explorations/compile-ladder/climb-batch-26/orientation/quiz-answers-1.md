# Quiz answers 1 (cases: 21)

## 21. Array-and-number `+` and `-` beside `AdditiveGroup`'s

**Decision.** The pairs are a valid overloading. The library needs no change. My own program of the same shape is valid too. The checker accepts it, so it compiles. By the orientation it also loads under walk, but the skill's `interpreter.md` says walk refuses it (row 804). The two parts disagree, and I would settle that by running the program, not by choosing one part.

**Path and scope.** I would be building, not exploring. The rule is settled by the curator's decisions P-146 and P-157, so there is no conflict to explore and nothing for the curator. The question is about the library area and about the checker in the compiled area. I would edit nothing: there is no fix to make in `Library/FortressLibrary.fsi` and none in the compiler's prelude. The work is one test program, run on both paths (SKILL.md, "How a program runs": run on both paths and say which paths show a defect). Before I write it, I would look up rows 804 and 695 in the gap ledger with the `records.md` queries. In the test I would write, for both paths:
- a self-typed trait `Grp[\X extends Grp[\X\]\]` that declares `opr +(self, other: X): X`, and the same for `-`;
- a number trait, and an array trait that excludes it;
- `opr +[\T extends Num\](a: Arr[\T\], n: T)`, `opr +[\T extends Num\](n: T, a: Arr[\T\])`, and the same two for `-`;
- an array type that extends `Grp` at itself.

The operators would have no static parameters of their own, and `Grp` would be self-typed directly, not only through a trait that it extends. No body would return `self`. The test would assert values with the harness's checks.

**Answer to "does it load and does it compile".**
- Compile: yes. The checker accepts the pair (P-157). My program declares its own traits and names nothing that only the interpreter's library has, such as `Index`, so the prelude's limits before the switch-over do not touch it.
- Walk: by the orientation, it loads. The orientation names only two cases that walk still refuses: a trait self-typed only through another, and an operator with static parameters of its own. I would avoid both. But `interpreter.md` says walk refuses this exact shape in a program's own component (row 804). If the run shows that refusal, row 804 is a departure of walk. I would then record which paths show it, and not change the program to get past walk's check.

**Passages relied on.**
- Orientation, "Traits and objects", self-typed traits: "When the checker applies the overloading rules to a method of `T`, `self` has the type `T[\X\]`, except in its test of whether two domains exclude each other. There `self` has the intersection type of `T[\X\]` and `X` (P-157). With this reading and the bounds that the test reads ("Dispatch and overloading"), the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. Walk still refuses the pair in two cases: `T` is self-typed only through another self-typed trait that it extends; the method has static parameters of its own."
- Orientation, the same section: the definition of a self-typed trait (P-146), and "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)."
- Orientation, "Dispatch and overloading" (P-157): the checker puts the meet of a static parameter's declared bounds in the parameter's place in its exclusion test. `compiler.md`, "The checker's gaps", first bullet, says the same.
- `interpreter.md`, "What walk checks", departures: "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number, on either side, beside the operator of a self-typed trait, as `AdditiveGroup`'s `+`: 'at least one pair of parameters must have excluding types'. The checker accepts such a pair, and the library's own pairs load (ledger row 804)." This is the passage that contradicts the orientation about a program's own component.
- `SKILL.md`, "Rules for every task": "Reproduce a behaviour before you explain it". This is why I would settle walk's answer by running the program.
