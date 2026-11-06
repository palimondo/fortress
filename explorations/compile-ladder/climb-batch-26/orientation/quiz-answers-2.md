# Quiz answers (reader 2)

Cases: 21.

## 21. Generic `+` and `-` between an array and a number, beside `AdditiveGroup`'s

**Decision.** The pairs are a valid overloading. The library needs no change. My own test program of the same shape loads under walk and compiles.

**Why it is valid.** These pairs are compared on the whole tuple of parameter types, and they exclude each other:
- In the trait's method, `self` has the intersection type `AdditiveGroup[\X\]` ∩ `X`.
- In the generic operator, its static parameter stands as a whole parameter type, so the checker puts the meet of its bounds in its place.
- With the array on the left, position 1 excludes: an array type against the group.
- With the number on the left, position 2 excludes: the trait's `X`, read at its bound, against the array type.

So no value lies in both domains, and nothing is needed to cover a meet.

**My test program.**
- A self-typed trait `trait MyNum[\X extends MyNum[\X\]\]` with `opr +(self, other: X): X`, with no `comprises` clause, or one that lists only `...`. The operator has no static parameters of its own.
- `trait MyArr[\E\] excludes { MyNum[\E\] }`. Hedge: I may need to write the exclusion so that it covers every instance; the passages do not say.
- `opr +[\E extends MyNum[\E\]\](a: MyArr[\E\], b: E): MyArr[\E\]` and `opr +[\E extends MyNum[\E\]\](b: E, a: MyArr[\E\]): MyArr[\E\]`, and the same pair for `-`.
- Every parameter type is written. No body of `MyNum` returns `self`, and no `override` modifier is used. No type is named after a `FortressLibrary` type, such as `Index`.

**Walk.** It loads. Walk reads `self` the same way, so it loads such a pair in the library and in a program's own component. My program avoids both cases that walk still refuses:
- `MyNum` is self-typed directly through its own parameter, not through another self-typed trait that it extends;
- the trait's operator has no static parameters of its own.

**Compiled path.** It compiles. The checker accepts the pair, and the program uses only its own traits, so the compiler's prelude is not in its way before the switch-over. To get past the code generator and the class loader, I keep to the limits above:
- no body of `MyNum` returns `self` (it would fail the JVM's verification, row 695);
- every parameter is typed ("Missing parameter type");
- no `override` modifier (row 650).

**Path and scope.**
- Library: `Library/FortressLibrary.fsi`, unchanged.
- Test: a new program in a test folder of my own. It belongs in both walk's and the compiled path's tests, because both paths run the overload check.
- Only the checker's verdict decides validity. Walk's check at load is not the verdict.

**Passages relied on.**
- Orientation, "Traits and objects", self-typed trait paragraph: "When the checker applies the overloading rules to a method of `T`, `self` has the type `T[\X\]`, except in its test of whether two domains exclude each other. There `self` has the intersection type of `T[\X\]` and `X` (P-157). With this reading and the bounds that the test reads ("Dispatch and overloading"), the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. Walk's load check ... still refuses the pair in two cases: `T` is self-typed only through another self-typed trait that it extends; the method has static parameters of its own."
- Orientation, "Dispatch and overloading": "In its test of whether two domains exclude each other, the checker puts the meet of a static parameter's declared bounds in the parameter's place where the parameter is a whole parameter type ... (P-157)". Also P-152 on reading exclusion over the whole tuple.
- Orientation, self-typed paragraph (row 695), "Write every parameter type" (row 405), and "`override` widens" (row 650): the compile hazards I avoid.
- `compiler.md`, "The checker's gaps", first bullet: P-157 as the checker applies it.

**Conflict noted.** `references/interpreter.md`, "What walk checks", still says the opposite about walk: "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number ... 'at least one pair of parameters must have excluding types'. The checker accepts such a pair, and the library's own pairs load (ledger row 804)." The orientation says walk now loads such a pair in a program's own component, except in its two named cases. I followed the orientation, which is the newer part. A reader who reads only `interpreter.md` would answer that walk refuses my program at load. That part should be brought into line, or row 804 checked to see whether it is closed.
