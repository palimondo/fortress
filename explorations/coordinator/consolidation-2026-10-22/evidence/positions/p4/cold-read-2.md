# Cold read 2: positions, part 4

File read: `explorations/coordinator/consolidation-2026-10-22/evidence/positions/p4/clean.txt` (nine positions: P-54 to P-60, P-62, P-147).

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these references, searched for the entries' terms: `specification.md`, `library.md`, `records.md`, `interpreter.md`, `compiler.md`, `tests-writing.md`, `gate.md`. Nothing else.

Three terms recur across the entries and are not in the skill. I list them once here, and again at each entry that leans on them:

- **rung** (P-54, P-58, P-62, also "batch rung" in P-62). The skill uses the word only inside folder and test names (`explorations/compile-ladder/rung-...`, `XXXCoercionStaticRungC`, `climb-batch-N`). From those I guess that a rung is one step of a staged plan of work, landed as one change, and that a batch is a run of several workers. The skill never defines either word. Unclear wording: a project term with no definition in the worker's context.
- **PLAN, phase 4, "After the names" / "The natives"** (P-54, P-58, P-59, P-62). The skill's list of record files names POSITIONS, FACTS, INDEX and the gap ledger, but not PLAN. I cannot tell which file PLAN is or where it lives. Unclear wording: a pointer to a file the worker cannot find from the skill.
- **switch-over**: defined in the skill core ("The switch-over comes when the checker accepts the interpreter's library", and the compiled path then moves onto that library). Resolved.

---

## P-54 `QQ`'s `ceiling` and `truncate` keep `ZZ` and raise at +∞, −∞ and 0/0

**Decided:** On the rationals `QQ`, the methods `ceiling` and `truncate` keep their declared result type `ZZ`. At the three non-finite `QQ` values (+∞, −∞ and 0/0) they raise an error and do not hand back the argument. The specification's paragraph that said they return the argument is revised to match. `floor`, `round` and the bracket operators ⌊x⌋ and ⌈x⌉ are built on those two, so they raise too. The reason: an integer result type cannot hold an infinity, and other languages raise (Python's `math.floor(inf)`). Later, after the switch-over, `QQ` is to follow the ruling on rounding the float types (P-68). Then `floor` and `ceiling` return `QQ` and pass the infinities through, while ⌊x⌋, ⌈x⌉, `round` and `truncate` return `ZZ`.

**Applies:** to `QQ`'s rounding methods and brackets, now. The present behaviour (`ZZ` result, raise) holds until the later step after the switch-over. At that step `floor` and `ceiling` change result type.

**Requires:** a worker must keep the library raising `DivisionByZero` at those three values, and must not make `ceiling` or `truncate` return the argument. Cite the revised paragraph in `Specification/basic-lib/numbers.tex`, "Rational Numbers". A worker must not build the `QQ`-result form before the switch-over.

**Unfinished:** the later step that makes `QQ` follow P-68, built beside P-68's step for the float types (PLAN, phase 4, "After the names").

**Could not resolve:**
- The title says `ceiling` "keeps `ZZ`", and the later step makes `ceiling` return `QQ`. I read the title as the present state only, but a reader could take the title as the lasting decision. Unclear wording.
- After the later step, ⌊x⌋, ⌈x⌉, `round` and `truncate` "give `ZZ`". The entry does not say what they do at the infinities and 0/0 then: raise as now, or something else. Unclear wording, a gap in the entry.
- "raise an error" (title) and "raises `DivisionByZero`" (Built). I take them to be the same error, also at +∞, where the name is odd. Reading the two together resolves it.
- "the float ruling (P-68, on rounding the float types)". I know its effect on `QQ` only from what this entry says. Not a blocker.
- That `QQ` has values +∞, −∞ and 0/0 is a language fact that the skill does not hold. The entry implies it. A language concept I lack, partly given by the entry.
- "rung", "PLAN": see the top.

## P-55 A size may hold arithmetic, compared by its written form once its numerals are computed

**Decided:** A size argument, such as the length `16` in `Vector[\RR64, 16\]`, may be a sum, a difference, a product or a power. The compiled checker computes each operation whose two operands are numerals, from the innermost out, so `2 3` (juxtaposition, a product) is the size `6`. It compares any other two sizes by their written form, so `s0 s1` and `s1 s0` are different sizes even though their values are equal. The checker also treats a size name such as `b0` as possibly equal to any numeral, so in a `typecase` on a value of type `N[\b0\]` the arm for `N[\0\]` counts as reachable. That follows the team's Q&A in `Specification/appendices/internal-document.tex`. The class loader computes a size's value when it makes an instantiation's class, and walk computes it when it makes an instance.

**Applies:** to sizes in static arguments, on the compiled checker, and at run time on both paths. The limit is the comparison by written form: sizes that are equal but not computable from numerals alone, and written differently, are not the same size.

**Requires:** a worker must not rewrite the library's sizes into a computed or normalised form. Keep the team's products and sums, such as a matrix's storage of `s0 s1` cells. A worker can rely on numeral arithmetic in sizes being folded.

**Unfinished:** nothing. Built. F-146 states what the checker accepts.

**Could not resolve:**
- "Walk already computes such a size exactly when it makes an instance." "Exactly" can mean "at the moment it makes an instance" or "computes the value exactly, with no rounding or overflow". Unclear wording, read two ways.
- Comparing by written form (so `b0` is not the same size as `0`) sits beside counting `b0` as possibly equal to `0`. I read these as two different relations: being the same size (written form) and possibly overlapping (for reachability). The entry does not name the difference. Unclear wording, resolvable with care.
- "such as the length in `Vector[\RR64, 16\]`": the example shows where a size goes, not arithmetic in a size, so at first it reads as an example of arithmetic. Unclear wording, minor.
- "a `typecase N[\b0\]`": I read it as a typecase whose subject has static type `N[\b0\]`. The phrase is not Fortress syntax. Unclear wording, minor.

## P-56 The open range `(:)` keeps its wildcard type, and its five cutting methods fail

**Decided:** The range of every index, `(:)` (as in `a[:]`), is the object `TrivialOpenRange`, and it stays of type `OpenRange[\Any\]`. The team used `Any` there as a wildcard for any index type. Its five methods that cut a range (`truncL`, `truncR`, `every`, `imposeStride` and `atMost`) would have to return a range over `Any`. The library builds ranges only over `ZZ32` and its pairs and triples, and generics are invariant, so no body that returns a range passes the compiled checker. Each of the five is therefore `fail` with a message, the team's own device for a body that cannot produce its declared type. The other way, typing `(:)` as a range over `ZZ32`, is rejected. A walk probe of that way, on small programs, turned more results into errors than errors into results (`reviews/ranges-and-index-types.md`, section 5).

**Applies:** to `TrivialOpenRange` and those five methods, on both paths, since this is library code. Calling one of them on `(:)` stops the program. Nothing in the tree does so except the five tests `ProjectFortress/tests/TrivialOpenRange*Stop.fss`.

**Requires:** a worker must keep `(:)` at `OpenRange[\Any\]`, keep the five bodies as `fail`, and keep the five `...Stop` tests that pin the failure. A worker must not retype `(:)` over `ZZ32`.

**Unfinished:** nothing. Built.

**Could not resolve:**
- "More of them stopped with an error where they had printed a result than printed a result where they had stopped." I worked it out as: under the `ZZ32` way, the programs that went from printing a result to stopping outnumbered those that went from stopping to printing. The before/after is carried only by "had", and the sentence takes two readings to parse. Unclear wording.
- "pin the `fail`": I read it as "assert that the call fails". Resolved from context.

## P-57 `LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached

**Decided:** `LexicographicReduction`, the reduction behind `BIG LEXICO`, combines comparisons in dictionary order. `isLeftZero(c)` says whether `c LEXICO x` is `c` for every `x`. The team declared it `false` at `EqualTo` and `true` at `Comparison`. But the object also inherits `ReductionWithZeroes.isLeftZero` at `TotalComparison` (answer `false`). `TotalComparison` (`LessThan`, `EqualTo`, `GreaterThan`) is below `Comparison`, so that inherited declaration was the more specific one and the team's `true` never ran. The `true` overload is now declared at `TotalComparison`, where it replaces the inherited one. So `LessThan` and `GreaterThan` answer `true`, and `EqualTo` (still the more specific overload) answers `false`. The motive given is the curator's goal of a zero error count when the compiled checker runs on the interpreter's library. This change removed the last error "in an api file", though other errors remain (F-53 holds the count).

**Applies:** to this one reduction's `isLeftZero`, in the library, on both paths.

**Requires:** keep the `true` overload at `TotalComparison` and the `false` one at `EqualTo`. Do not move the `true` overload back to `Comparison`.

**Unfinished:** nothing for this entry. Built. The overall count is not yet zero (F-53).

**Could not resolve:**
- "removed the last of the count's errors in an api file". This reads two ways: that no `.fsi` file has a checker error any more, or that it removed the last error of one particular api file. Unclear wording.
- `Comparison` evidently has a value outside `TotalComparison` (I guess `Unordered`, for partial orders), since `TotalComparison` "lies below" it. Now that no overload is declared at `Comparison`, the entry does not say what `isLeftZero` answers for such a value, or whether one can reach this reduction. Unclear wording, or a language or library fact I lack (the skill does not describe `Comparison`).
- The entry does not say what checker error the old declaration caused, so how the motive (the checker count) links to the change (dispatch reaching `true`) is left implicit. Not a blocker.

## P-58 Every native binding is a `builtinPrimitive` call naming a static helper

**Decided:** A native binding is a library body that is exactly `builtinPrimitive("…")`, and it keeps that form. Its string is to name a static Java method in `nativeHelpers/`, such as `com.sun.fortress.nativeHelpers.simpleIntArith.intLT`, not a walk glue class, which the compiled path cannot use (F-32). Walk will load the named helper through a new loader next to its glue classes. The compiled path, at the parse and before the checker, will rewrite each such body into a synthetic `import java` of the helper and a call, and will refuse a string that names no helper. The bindings move over step by step, and the compiled checker sees each step's bindings when that step lands, not all at once at the switch-over. Writing `import java` declarations directly in the library is rejected.

**Applies:** to every native binding of the interpreter's library, on both paths. It is the target state, not the present one: today every binding still names a glue class.

**Requires:** a worker who adds or moves a native keeps the `builtinPrimitive("…")` form and must not write `import java` in the library. Once the loader and the rewrite exist, the string must name a `nativeHelpers/` static method. The first step builds the loader and the rewrite test first.

**Unfinished:** all of it: walk's loader, the compiled path's rewrite and refusal, and moving every binding, over several steps (PLAN, phase 4, "The natives").

**Could not resolve:**
- The title says every binding "is" a call naming a static helper, but the body says none does yet. I read the title as the target. Read on its own, the title states something false. Unclear wording.
- "the compiled checker sees each rung's bindings as that rung lands". Until the switch-over the compiled path uses its own prelude (`compiler.md`), so I am unsure whether this means the count stage's run over the interpreter's library or ordinary compiles. Unclear wording.
- Walk's natives take boxed evaluator values and the helpers take plain Java values (`interpreter.md`, `compiler.md`). The entry does not say whether walk's new loader converts between them. A detail the entry leaves out, maybe not needed here.
- "rung", "PLAN": see the top.

## P-59 Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over

**Decided:** Walk has no static types, so where a coercion is needed it chooses one by the value's run-time type. The specification and the compiled path choose by static type. The curator accepts this as a limit of the interpreter, and walk is not changed for it before the switch-over. A callout in `Specification/basic/conversions-coercions.tex` states the limit, and two `XXX` tests record it: `XXXCoercionStaticRungC` (the chapter's printed example) and `XXXCoercionStaticNarrowRungC`. After the switch-over, once walk runs the checker on its programs (P-12), walk will use the coercions that the checker inserts. On microGPT, whose static types are all concrete, the two choices already agree.

**Applies:** to walk's choice of coercion, until walk runs the checker. MicroGPT is not affected.

**Requires:** before the switch-over, do not change walk to choose coercions statically. Keep the callout and the two `XXX` tests.

**Unfinished:** walk's use of the checker's inserted coercions, after walk runs the checker (P-12; PLAN, phase 4).

**Could not resolve:**
- "P-12 orders the two steps": I cannot tell which two steps. They could be the switch-over and walk running the checker, or walk running the checker and walk using its coercions. Unclear wording.
- "PLAN": see the top.

## P-60 The specification reads a `comprises` clause at the level of values

**Decided:** `trait S comprises { U, V }` means that every value of `S` is a value of `U` or of `V`. It does not mean that `U` and `V` are `S`'s only direct subtypes, so another trait may sit between `S` and them. The specification defines "covers" once: type A covers type B when every value of B is a value of A. The Meet Rule gets a case for closed traits (traits with a `comprises` clause). Where the rule needs a declaration at the meet of two overloads' parameter types, several declarations below both will do, if together they cover the meet. So a call whose argument's static type sits between a closed trait and its listed types can have several most specific declarations. The call's type is then the intersection of their return types, and which one runs is decided only at run time. A proof addendum (`reviews/comprises-type-level-proof-addendum.md`) shows this sound for ground declarations (no type variables, for example `G[\ZZ32\]`) at calls that need no coercion. The checker must use coverage only in its overloading rules (to accept an overload set, and to justify a tie at a call), and never in its general subtype test. Declarations with static parameters are outside the proof, so intersection typing does not extend to them, and the specification says so.

**Applies:** to overloading and calls involving closed traits, in the specification, the compiled checker and walk's load check. Limits: ground declarations only, and calls that need no coercion.

**Requires:** a worker on the checker must not put coverage into the general subtype test. A worker must not extend intersection typing to declarations with static parameters.

**Unfinished:** nothing named. Built: F-175 (specification), F-76 (compiled checker), F-27 (walk's load check).

**Could not resolve:**
- "A declaration with static parameters, whose instance dispatch must choose at run time, is outside the proof: one instance would have to meet every one of the return types at once." I cannot parse "instance dispatch" or "one instance would have to meet every one of the return types" with confidence. My best reading: the run-time choice of an instantiation would give one return type that would have to be a subtype of every return type in the tie, which cannot be guaranteed. Unclear wording.
- The limits "ground declarations" and "calls that need no coercion" are stated as the proof's scope. The entry does not say what the checker does outside them: refuse the call, refuse the overload set, or fall back to the old rule. Unclear wording, a gap in the entry.
- "closed traits": not in the skill, but read as traits with a `comprises` clause. Resolved from context.

## P-62 The `covariant` keyword is future work, off the path to microGPT

**Decided:** The keywords `covariant` and `contravariant` are the team's 2012 declaration-site variance. Under `trait C[\covariant S\]`, a `C[\Dog\]` is a `C[\Animal\]`, as with Scala's `+S`. Nothing in the library and nothing in microGPT uses them. They stay future work, not built on the way to microGPT. Today the compiled checker accepts variance, but the compiled run dies with `IncompatibleClassChangeError` and walk refuses the program (gap-ledger row 404). The future work is to carry declaration-site variance to run time on both paths. When it lands, a later step tries to bring back the specification's sign-refined number types as covariant static parameters. Their design stays word for word in the specification, marked superseded (P-80).

**Applies:** to the variance keywords. Off the microGPT path, so they are not built now. The skill's "Generics are invariant" stays the working rule.

**Requires:** do not use `covariant` or `contravariant` in the library or microGPT. Do not build variance now. Leave the sign-refined number types' text in the specification, marked superseded.

**Unfinished:** row 404's two `XXX` tests, one on the compiled path and one under walk, owed in a batch step that no PLAN line names yet. Then, as future work, variance at run time on both paths, and the attempt to bring back the sign-refined number types.

**Could not resolve:**
- "the specification's sign-refined number types": a language concept I lack, not in the skill. Perhaps number types split by sign, such as positive or non-negative integers. I cannot tell.
- "owed in a batch rung": I cannot tell what a batch rung is, or whether it differs from a rung. Unclear wording, a project term with no definition (see the top).
- The skill says "there is no `+T` or `-T`", and this entry says the team had the keyword. I reconcile them as: the parser and checker know the keyword, but it is not supported, so invariance is the rule in practice. Resolved by reading the two together.

## P-147 An object defines an inherited abstract method when its narrower bodies together cover the abstract method's parameter types

**Decided:** An object defines an inherited abstract method if its bodies of that name, at the abstract method's parameter types or narrower, together cover those parameter types: every value of the abstract method's parameter types is a value of some body's parameter types. A `comprises` clause counts in the P-60 reading, where a closed trait is covered by its listed types. This is the team's 2012 rule, as in Steele's abstract-method check in the compiled checker and the Covered rule of the Welterweight calculus (`Papers/Welterweight/`). So `Library/Pairs.fss` and `ProjectFortress/tests/FileConversion.fss` stay valid, each with an object that defines an inherited abstract operator once per listed type. Walk now applies the same rule at load, and drops its old acceptance of any single narrower body. The traits chapter's sentence that allowed no narrower body is revised in the revision form (P-96).

**Applies:** to objects that inherit abstract methods, on the compiled checker and walk's load check. Limits: some valid objects whose methods have static parameters of their own are still refused (checker row 725, walk row 728), and walk skips this check for generic objects (row 665).

**Requires:** a worker must accept covering sets of narrower bodies, must not reinstate walk's "any one narrower body" allowance, and must keep `Pairs.fss` and `FileConversion.fss` valid. A library edit must not leave an inherited abstract method uncovered (this matches `interpreter.md`, "What walk checks").

**Unfinished:** accepting the valid objects with method-level static parameters (rows 725 and 728), and walk's check of generic objects (row 665).

**Could not resolve:**
- The title says "at narrower parameter types", and the body counts a body at the method's own parameter types as the plain case. So "narrower" must include "equal". Unclear wording, resolved by the next sentences and by `interpreter.md` ("at or below").
- "the acceptance of some valid objects whose methods have static parameters of their own": "some" does not say which, so the entry leaves the boundary to rows 725 and 728. Unclear wording, minor.
