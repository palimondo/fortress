# Cold read: positions batch p4

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and its `references/` (`library.md`, `compiler.md`, `interpreter.md`, `specification.md`, `records.md`, `tests-writing.md`), excluding `revival-changes.md` and `sources.md`. Nine entries: P-54, P-55, P-56, P-57, P-58, P-59, P-60, P-62, P-147.

Two project words appear in several entries, and the skill defines neither of them:

- **rung** (P-54, P-58, P-62; "batch rung" in P-62). From context it is one step of a staged plan. File and test names hint at the same thing: `compile-ladder/rung-...`, `...RungC`. The skill never defines it. Unclear wording: a project term missing from the skill.
- **PLAN**, with "phase 4", "After the names" and "The natives" (P-54, P-58, P-59, P-62). It reads as a plan file in the record with phases and named sections. The skill does not name it or give its path ("phase 4" is not one of the six compilation phases in SKILL.md). Unclear wording: a project term missing from the skill.

---

## P-54 — `QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0

- **Decided:** The rational type `QQ` holds +∞, −∞ and 0/0. At those three values, its `ceiling` and `truncate` raise an error, and they keep returning `ZZ`, the integer type they are declared to return. The specification paragraph that had them return the argument unchanged at those values is overridden and revised. A method returning an integer, and the practice of other languages (Python's `math.floor(inf)` raises), outweigh that paragraph.
- **Applies:** To `QQ`'s `ceiling` and `truncate`, and to everything built on them: `floor`, `round`, `⌊x⌋` and `⌈x⌉`. Limit: this is the state until a later rung, after the switch-over. That rung makes `QQ` follow the float ruling (P-68). Then `floor` and `ceiling` return `QQ`, and the brackets, `round` and `truncate` return `ZZ`.
- **Requires:** Library code for these operations raises `DivisionByZero` at the three values. Do not return the argument at those values, and do not change the result type to `QQ` before that rung.
- **Unfinished:** The rung that aligns `QQ` with P-68's ruling for floats, built beside P-68's rung for the float types (PLAN, phase 4, "After the names").
- **Could not resolve:**
  - "keep": the title's "keep `ZZ`, their declared result type" means "go on returning the declared type". The later "`floor` and `ceiling` keep `QQ`" seems to mean "return the argument's type". The same word is used for two different things. Unclear wording.
  - After the later rung, `floor` and `ceiling` return `QQ`. The entry does not say what they then do at +∞, −∞ and 0/0: still raise, or return the argument, as the overridden paragraph said. Also, the brackets stay `ZZ` while `floor` and `ceiling` move to `QQ`, so it is unclear whether the brackets are then still "built on" those methods. Unclear wording: the limit is not stated.
  - "the float ruling (P-68)": the entry gives what it does to `QQ` but not what the ruling itself is. I can only infer it from the "Then" sentence. Unclear wording: it points elsewhere.
  - That `QQ` has ±∞ and 0/0 at all is a language fact that the skill does not state. The entry implies it, and I took it from there. A language concept the skill lacks, but readable here.
  - "rung", "PLAN, phase 4": see the top of this report.

## P-55 — A size may hold arithmetic, compared by its written form once its numerals are computed

- **Decided:** A size (a static argument of kind `nat`/`int`, such as the 16 in `Vector[\RR64, 16\]`) may be a sum, difference, product or power. The compiled checker works out every part that is written only in numerals, so `2 3` is the size 6. It compares the remaining sizes by how they are written, not by their value: `s0 s1` and `s1 s0` are different sizes. At run time on the compiled path, the class loader computes the value when it makes the class of an instantiation. The checker treats a size name such as `b0` as possibly equal to any numeral, as the team's Q&A says. So an arm `N[\0\]` in a `typecase` on `N[\b0\]` counts as reachable. The library keeps the team's sizes written as products and sums, for example `s0 s1` cells for a matrix.
- **Applies:** In the compiled checker, and in the compiled path's class loader at instantiation. Limit: two sizes with equal values but different written forms are not equal to the checker.
- **Requires:** Do not rewrite the library's arithmetic sizes into single names or numerals. Expect the checker to accept sizes only when they match in written form, apart from parts made only of numerals. F-146 holds what is accepted exactly.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - "each part written only in numerals": it is not clear what counts as a "part". `2 3 s0` and `s0 2 3` may group differently (juxtaposition groups by type, as SKILL.md says). The entry does not say whether `s0 + 2 + 3` becomes `s0 + 5`, or whether `s0 + 0` equals `s0`. Unclear wording.
  - Walk is not mentioned. I cannot tell whether walk accepts arithmetic sizes or computes their values. Unclear wording: the limit is not stated.
  - The checker separates `s0 s1` from `s1 s0`, but the class loader computes values. The entry does not say whether at run time those two give one class or two. Unclear wording, minor.
  - "difference": sizes of kind `nat` cannot be negative. The entry does not say what happens when a difference would be. Minor.

## P-56 — The open range `(:)` keeps its wildcard type, and its five cutting methods fail

- **Decided:** `(:)`, the range of every index (as in `a[:]`), is the object `TrivialOpenRange`, and it stays an `OpenRange[\Any\]`. The team used `Any` here as a wildcard index type. Its five methods that cut a range (`truncL`, `truncR`, `every`, `imposeStride`, `atMost`) would have to return a range over `Any`. The library only builds ranges over `ZZ32` and its pairs and triples, and generics are invariant, so no real body passes the compiled checker. Each of the five is therefore a `fail` with a message. Making `(:)` a range over `ZZ32` was rejected: a probe under walk found it broke more small programs than it fixed.
- **Applies:** To those five methods called on `(:)`. Nothing in the tree calls them except the five tests `ProjectFortress/tests/TrivialOpenRange*Stop.fss`, which pin the `fail`. Using `(:)` in other ways, for example indexing with `a[:]`, is not affected.
- **Requires:** Do not change `TrivialOpenRange` to `OpenRange[\ZZ32\]`, and do not give the five methods real bodies. Keep the five tests. A call of one of these methods on `(:)` is expected to fail.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - "made more small programs lose their value than gain one": "value" can mean the result a program computes (programs that produced a result stopped producing one) or the program's usefulness. I read it as the first, but it reads two ways. Unclear wording.
  - `fail` is not in the skill. The entry describes it well enough ("the team's own device for a body that cannot answer its declared type"). A language concept the skill lacks, resolved by the entry.

## P-57 — `LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached

- **Decided:** `isLeftZero(c)` in `LexicographicReduction`, the reduction behind `BIG LEXICO`, says whether `c LEXICO x` is always `c`. The team's `true` overload, at `Comparison`, was never reached: an inherited `ReductionWithZeroes.isLeftZero` at the more specific `TotalComparison` answered `false` first. The `true` overload is now declared at `TotalComparison`, which overrides the inherited one. The results are now `LessThan` → `true`, `GreaterThan` → `true`, `EqualTo` → `false`. The change was made because the curator wants the compiled checker's error count on the interpreter's library to be zero. It removed the last error of that count that was in an api file (F-53 holds the count).
- **Applies:** To `LexicographicReduction`'s `isLeftZero`.
- **Requires:** Keep the `true` overload at `TotalComparison`, not at `Comparison`.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - The entry does not state how `Comparison` and `TotalComparison` relate. I infer `TotalComparison` is a subtype of `Comparison` (it is "more specific"). The entry also does not say what `isLeftZero` now answers for a `Comparison` that is not total (an "unordered" result, if Fortress has one): no overload remains at `Comparison`. A language concept I lack (the comparison types are not in the skill), and the limit is not stated.
  - "removed the count's last error in an api file": it could mean the whole count is now zero, or only that no error is left in api (`.fsi`) files while errors remain elsewhere. The change itself sounds like a component edit, which makes the phrase harder to read. Unclear wording.
  - The entry does not say what error the checker reported (a shadowed overload? an overload rule?). Minor.

## P-58 — Every native binding is a `builtinPrimitive` call naming a static helper

- **Decided:** A native binding is a library body that is exactly `builtinPrimitive("…")`, and that form stays. The string names a static Java method in `nativeHelpers/` (the compiled path's helpers), not one of walk's glue classes. Walk loads the named helper through a loader that sits beside its glue classes. The compiled path, at the parse and before the checker, rewrites each such body into a synthetic `import java` of the helper plus a call. It refuses a string that names no helper. Writing `import java` declarations directly in the library was rejected. The bindings move onto helpers rung by rung, so the compiled checker sees each rung's bindings when that rung lands, not all at once at the switch-over.
- **Applies:** To every native binding in the library, on both paths.
- **Requires:** Bind a native with `builtinPrimitive("<helper>")` that names a static method under `nativeHelpers/`. Do not write `import java` in the library. Do not name a glue class.
- **Unfinished:** The natives rungs that move the bindings onto helpers (PLAN, phase 4, "The natives").
- **Could not resolve:**
  - What is built and what is not. Present tense ("It no longer names...", "Walk loads...", "the compiled path rewrites... It refuses...") reads as built. But "Still to build: the natives rungs", which move the bindings, implies that today's bindings still name glue classes. The skill agrees with that: `interpreter.md` says bindings name `interpreter.glue.prim.X`, and `library.md` says "A new native is a Java class under `interpreter/glue/prim/`". I cannot tell whether walk's helper loader and the compiled path's parse-time rewrite and refusal exist yet. So a worker adding a native today cannot tell which form to write. Unclear wording: built and target state are mixed.
  - The form of the string ("a static Java method") is not given: a class plus a method name, and in what syntax. Unclear wording.
  - "It refuses a string that names no helper" is said of the compiled path. The entry does not say whether walk refuses one too, or when. Unclear wording.
  - "rung", "PLAN": see the top of this report.

## P-59 — Walk chooses a coercion by the run-time value until the switch-over

- **Decided:** Walk has no static types, so it picks a coercion by the value's run-time type. The specification and the compiled path pick it by static type. The curator accepts this as a limit of the interpreter, and walk is not changed for it before the switch-over. A callout in `Specification/basic/conversions-coercions.tex` states the limit. Two expected-failure tests record it: `XXXCoercionStaticRungC` (the chapter's own printed example) and `XXXCoercionStaticNarrowRungC`. On microGPT the two choices agree, because its static types are concrete.
- **Applies:** Under walk, wherever a coercion is needed, until walk runs the checker. Limit: microGPT is unaffected.
- **Requires:** Do not change walk's coercion choice to fix this before the switch-over. Keep the two `XXX` tests.
- **Unfinished:** Walk's use of the static coercions that the checker inserts, which comes once walk runs the checker on its programs (P-12; PLAN, phase 4).
- **Could not resolve:**
  - When the limit ends. The title and "After the switch-over, walk uses the static coercions" tie it to the switch-over. "Still to build ... after walk runs the checker on its programs (P-12)" ties it to a later step. I cannot tell whether the switch-over alone ends it. Unclear wording.
  - "MicroGPT's static types are concrete": this could mean each value's static type is its run-time object type, or that the types contain no type variables (as "ground" means in P-60). The conclusion depends on the first reading. Unclear wording: it reads two ways.

## P-60 — The specification reads a `comprises` clause at the level of values

- **Decided:** `trait S comprises { U, V }` means every value of `S` is a value of `U` or of `V`. The listed types need not extend `S` directly: another trait may sit between them. The specification defines "covers" once: a type covers another when every value of the second is a value of the first. The Meet Rule gains a case for closed traits. Where the rule asks for a declaration at the meet of two overloads' parameter types, several declarations below both serve if together they cover the meet. So a call whose argument's static type lies between a closed trait and its listed types may have several most specific declarations. The call's type is the intersection of their return types, and the declaration that runs is decided only at run time. The proof addendum shows this sound for ground declarations (no type variables, for example `G[\ZZ32\]`) at calls that need no coercion. The checker searches for coverage only inside its overloading check.
- **Applies:** To ground declarations, at calls that need no coercion. Limit: a generic declaration that needs a run-time instance is outside the proof, and the intersection typing is not extended to it. The specification states that boundary.
- **Requires:** Read `comprises` by values. Accept a meet covered by several declarations. Give such a call the intersection of the return types. Do not use the coverage search outside the overloading check. Do not apply intersection typing to generic declarations that need run-time instances.
- **Unfinished:** Nothing ("Built": F-175 for the specification, F-76 for the compiled checker, F-27 for walk's load check).
- **Could not resolve:**
  - "closed trait": I take it to mean a trait with a `comprises` clause (SKILL.md: "near Scala's `sealed`"), but the term is not defined anywhere. Unclear wording, minor.
  - "search for coverage only inside its overloading check": "overloading check" could mean the check of an overload set at its declarations (the Meet Rule) or the resolution of a call. If coverage is searched only at declarations, I cannot see how a call at a static type between `S` and `{U, V}` gets its several most specific declarations and their intersection type. Unclear wording: it reads two ways.
  - "A generic declaration that needs a run-time instance": I cannot tell what "needs a run-time instance" means. It may be a generic whose static arguments are fixed only from run-time types, or a generic instantiated by the class loader. A language concept I lack, and not in the skill.
  - "at calls that need no coercion": the entry does not say what happens at a call that needs one: refused, typed some other way, or left undefined. Unclear wording: the limit is not stated.

## P-62 — The `covariant` keyword is future work, off the path to microGPT

- **Decided:** `covariant` and `contravariant` are the team's 2012 declaration-site variance (`trait C[\covariant S\]` makes `C[\Dog\]` a `C[\Animal\]`, like Scala's `+S`). They are future work and off the path to microGPT. No library declaration and no line of microGPT uses them. Gap-ledger row 404 records the hole. The compiled checker accepts variance, but the compiled run dies with `IncompatibleClassChangeError`, and walk refuses the program. The future work is to carry declaration-site variance to run time on both paths. When it lands, a rung tries to bring back the specification's sign-refined number types (P-80) as covariant static parameters.
- **Applies:** To any program that uses `covariant` or `contravariant`. This matches SKILL.md, "Generics are invariant": the keyword exists but works on neither path.
- **Requires:** Do not use the keywords in the library or in microGPT. Do not build variance now.
- **Unfinished:** Row 404's expected-failure tests, one on the compiled path and one under walk, owed in a batch rung. No PLAN line names them yet. After that: declaration-site variance at run time on both paths, then the rung for sign-refined number types.
- **Could not resolve:**
  - "the specification's sign-refined number types (P-80, a superseded design)": the entry does not say what these types are. It is also confusing that a superseded design is to be brought back: does P-80 record the rejection, or the design itself? Unclear wording.
  - "owed in a batch rung", with "No PLAN line names them yet": I cannot tell who writes these two tests, or when, if no plan line holds them. "batch rung" is undefined (see the top of this report). Unclear wording.

## P-147 — An object defines an inherited abstract method when its narrower bodies together cover the abstract method's parameter types

- **Decided:** An object defines an inherited abstract method when its bodies of that name, at narrower parameter types, together cover the abstract method's parameter types. Every value of those parameter types must be a value of some body's parameter types. A body at exactly the abstract method's types is the plain case. A `comprises` clause counts as the compiled checker reads it: a closed trait is covered by its listed types. This is the team's 2012 rule (Steele's abstract-method check in the compiled checker, and the Covered rule of Welterweight). So `Library/Pairs.fss` and `ProjectFortress/tests/FileConversion.fss` stay valid. Walk applies the same rule at load, and its older acceptance of any single narrower body is dropped. The traits chapter's sentence, which allowed no narrower body, is revised in the revision form (P-96).
- **Applies:** To objects that inherit abstract methods, on both the compiled checker and walk's load check. Limit: some valid objects whose methods have their own static parameters are still refused, by the checker (gap-ledger row 725) and by walk (row 728).
- **Requires:** An object must cover the whole abstract domain. A single narrower body that does not cover it is now refused under walk too. Bodies, one for each type a `comprises` clause lists, count as a definition.
- **Unfinished:** Accepting valid objects whose methods have their own static parameters (rows 725, 728).
- **Could not resolve:**
  - "as the compiled checker reads it": the entry gives the reading in one clause ("a closed trait is covered by its listed types"). It does not say whether this is P-60's value-level reading, which would let an intermediate trait stand between. Unclear wording, minor.
  - For a method with several parameters, "each value of the abstract method's parameter types" presumably means each tuple of argument values. Not stated. Minor.
  - Otherwise clear. `interpreter.md`, "What walk checks", agrees with it.
