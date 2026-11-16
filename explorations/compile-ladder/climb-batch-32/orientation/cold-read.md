# Cold read of the orientation (climb-batch-32)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-32/orientation/orientation.md`. Nothing else was opened, so
every statement below about Fortress is what the orientation says, not what the source shows. Line
numbers are the orientation's.

## 1. What I would do differently, by section

### Opening (lines 3-7)

- Rule: a bold sentence is the rule of this tree. A sentence with P-N is the curator's decision; one
  without is safe to build on but not to cite as a decision. A sentence with a ledger row is unsettled
  (a departure or an undecided case), so I assert it only in an `XXX` test. A sentence that opens
  "Until the switch-over" is a limit of the compiler's library that I do not fix in the prelude.
- Before I call a disagreement a conflict, I search FACTS and POSITIONS.
- Limits: I question a rule only on new evidence. An old note, a team test or my training may describe
  the team's walk, not this tree.
- Change in my work: without this I would have "fixed" prelude gaps, asserted walk's current behaviour
  in plain tests, and treated the Working Draft as the authority.

### Dispatch and overloading (lines 9-24)

- Overloads may differ only in static parameters; validity is judged on declared domains, and the
  return-type condition holds at every instance.
- Exclusion over generic declarations is read over the whole parameter tuple: a shared generic type at
  one position forces the static arguments equal. A pair that leaves a static parameter untied is
  refused.
- Walk chooses by declared types, never by declaration order.
- Walk's load check is not the verdict. I look the case up in `interpreter.md`, "What walk checks",
  before I change code to satisfy walk or take walk's acceptance as proof.
- Two functional methods with equivalent parameter types are duplicates wherever `self` stands, and
  abstract declarations count, also for the Meet Rule.
- A program trait with its own functional `+`, `-`, `MIN` or `MAX` needs `excludes { Number }` or
  `excludes { HasRank }`, or the operator goes in an object.
- Limits: the checker accepts the last case against the library (row 918); row 780 is walk's.
- Change in my work: I would have written a trait with `opr +(self, ...)` and read walk's "fails the
  Meet Rule" as a defect of walk.

### Traits and objects (lines 26-64)

- The checker applies the exclusion rule; walk does not (row 416). I do not copy Working Draft
  examples marked "Not allowed".
- `comprises` speaks of values, not of direct subtypes, so a cover by several declarations serves.
- `override` only widens. To replace at the same types I redeclare without `override`. In a program
  for both paths I write no `override` at all (row 650). A Java-style `override` in the library stops
  every walk run.
- An object must cover each inherited abstract method, by one body or several.
- In a self-typed trait `self` is `T[\X\]` met with `X`, so no cast is needed; a compiled body that
  returns `self` still fails verification (row 695).
- An index parameter is written `I extends Index`, but only in code that walk runs or that is checked
  against the interpreter's library. Only `ZZ32` and tuples of `Index` types are indices.
- Tuples are ordered only over `StandardPartialOrder` elements; lists only over `StandardTotalOrder`
  under the checker.
- `=` without a declaration is `SEQV`: strings inside a value object compare by identity, tuples
  longer than three fall back to `SEQV`. For logical equivalence I write `<->`, not `≡`.
- Change in my work: I would have used `override` the Java way, compared 4-tuples and value objects
  holding strings with `=`, and expected content equality.

### Static parameters, `where` clauses and sizes (lines 66-85)

- An unfixed type parameter takes its bound. Under walk a self-bounded one stays `OPEN`.
- Only the checker passes an expected type into an argument call. For walk, and so for a program for
  both paths, I write the static argument (`mk[\ZZ64\]()`).
- Three `where` forms exist. Any other `where` on an `extends` entry is silently unconditional. The
  compiled runtime checks no `where` clause, and a `where [\nat n\]` variable on a function dies when
  compiled (row 867).
- Sizes are equal only by written form after numeral arithmetic. Powers stop at exponent 4096.
- A run-time size comes from `reflect` in `NatReflect.fsi`, under walk only, also after the
  switch-over (row 307).
- Change in my work: I would not rely on a `where` condition to guard compiled code, and would not
  expect `s0 s1` to equal `s1 s0`.

### Numbers (lines 87-114)

- The number types are siblings. "Tower" in the record does not mean nesting.
- A numeral converts exactly at a typed place (binding, assignment, field, parameter, declared
  return); elsewhere it takes a default (`ZZ32`, `ZZ64`, `ZZ`, or `RR64`). The default then stays:
  `x = 0.1; q: QQ = x` is refused.
- A numeral type is written only as the parameter of a coercion or operator. My own number type takes
  numerals through a generic `coerce` over `NaturalNumeral` or `RadixPointNumeral`, and folded
  constants only through a coercion from the default type.
- Numeral-only expressions fold exactly before the checker. To test run-time arithmetic or
  concatenation I use a variable operand.
- Integer conversion: a checked getter (`x.asZZ32`) or a low-bits function (`narrow` and the rest).
  `ZZ` has only `big`.
- `Number` declares nothing: generic code over `T extends Number` can call no number operation. Across
  types, `=` is `false` unless a coercion joins the pair; I write `asFloat(x) = y`.
- `^` on integers answers the base's type; `/` on integers answers a `QQ`; `DIV` truncates.
- Limits: the compiler's prelude lacks `QQ`, `TIMES`, `isInfinite`, `big`, most getters and most
  integer powers until the switch-over. Rows 387, 395, 511, 962, 1016, 1017 are departures.
- Change in my work: nearly every numeric test I would write from habit (`2147483647 + 1` to show
  overflow, `7 / 2` for 3, `x = 0.1` then use as `QQ`, a `ZZ64 = RR64` comparison) would be wrong.

### Reductions and comprehensions (lines 116-128)

- The checker fixes an unwritten static argument of `SUM`, `PROD`, `BIG MAX`, `BIG MIN` from the
  expected type; walk from a local variable's type or a top-level or local function's return type,
  else from the join of the elements.
- Where a method's return type, a field, a top-level variable, a parameter or an assignment gives the
  type, the paths differ (row 1008): I write the static argument. I write both arguments of
  `BIG MIN_MAX`.
- A reduction of my own without an identity declares `simpleJoin` at `R`, not at `Any` or untyped. I
  do not copy the team's tests here.
- Change in my work: I would write `SUM[\RR64\]` in methods as a habit, and not trust a team test's
  `simpleJoin`.

### Implementation limits (lines 130-134)

- Walk has no static types, so a walk pass proves no typing. I write no `Maybe` as an `if` condition.
- I write every parameter type. A return type left out is taken from the api, else from the body.
- Change in my work: small; the core already says most of this.

## 2. Passages that mislead, read two ways, or use an ungiven term

Confidence is that a new worker would stumble, not that the passage is wrong.

1. **Line 81, "Walk and the compiled runtime apply a conditional extension at every instance (row
   774)."** Reads two ways: they evaluate the condition at each instance (correct behaviour), or they
   treat the extension as holding at every instance (the condition is ignored). Line 55, "Walk orders
   every list (row 774)", suggests the second. Say "without its condition". Confidence: high.
2. **Line 68, the `OPEN` example.** "beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`". The
   example shows no bound for `T`, and the call `(1, 2)` would seem to fix `T` at `ZZ32`, so I cannot
   see why `T` is `OPEN` here, or whether this is a load-time comparison or a call. I would not know
   what to avoid. Confidence: high.
3. **Lines 43-46, walk's two cases without a row.** "In two cases walk does not read `self` so, and
   its load check refuses the valid pair". By the opening's convention a sentence without a row is
   settled, yet this is a departure of walk. I cannot tell whether to record it, write an `XXX` test,
   or work around it. Confidence: medium-high.
4. **Line 103 against the core.** The core says "A conversion never changes which declaration runs
   when one already fits". The orientation says a numeral's own coercion does (`k(5)` runs
   `k(x: NN32)` beside `k(x: Any)`). The orientation is the more exact, but the two sentences conflict
   as written; the core needs "except a numeral's own". Confidence: medium-high.
5. **Line 24, `h(x: String)` example.** The same paragraph says an object excludes every trait that it
   does not extend. If `String` is an object, `S` and `String` exclude and the example is valid, not
   refused. The example holds only if `String` is a trait, which the text does not say. Confidence:
   medium.
6. **Line 38, "one that lists only `...`".** Literal Fortress syntax `comprises { ... }`, or an
   elision by the writer? Confidence: medium.
7. **Line 5, "Build on a sentence without one, but do not cite it as a decision."** The core requires
   a source for each claim. The orientation does not say what to cite for such a sentence (this file?
   FACTS?), and `sources.md` is barred for tasks. Confidence: medium.
8. **Line 5, scope of a P-N.** A P-N in a bold rule: does it cover the whole paragraph or the bold
   sentence only? Later sentences in one paragraph often carry their own P-N (line 13: P-152 then
   P-157), which suggests sentence scope, but then most sentences in a paragraph are not decisions.
   Confidence: medium.
9. **Line 17, "and the checker differs from it on others".** Reads as "the checker is right where walk
   is wrong", or as "the checker also departs". Row 918 (line 24) shows that the checker departs too.
   Say which path is the verdict where they differ: neither, the rules are. Confidence: medium.
10. **Lines 93 and 101, numeral at a declared return type under walk.** Line 93 lists a declared
    return type as a place that converts a numeral. Line 101 says walk does not convert at a declared
    return type (row 387), for "a value other than a numeral". Whether `f(): QQ = 0.1` converts under
    walk is left to inference. Confidence: medium.
11. **Line 91, "Until the switch-over, the compiler's prelude follows the same design (P-37)."** The
    opening says this opener marks a limit. Here it marks agreement. Confidence: medium.
12. **Line 128, the empty case.** "`BIG MAX` over a generator still answers `R`." What an empty
    generator gives (an error, a `Maybe`) is not said, and it is the first thing that a reduction
    without an identity raises. Confidence: medium.
13. **Line 30, the "So".** "A Java `permits` list names each direct subtype; this clause need not. So
    where the Meet Rule asks for a declaration at the meet ... several declarations that together
    cover the meet serve." The step from one to the other is not shown; I accept the rule but could
    not state its limit (must the covering types be the listed ones?). Confidence: medium-low.
14. **Line 93, `TIMES`.** `t TIMES 10.0` is used without saying why not juxtaposition, and the next
    sentence says the prelude lacks `TIMES`. What a compiled program writes is not said. Confidence:
    medium-low.
15. **Line 110, "(the rule above)".** The rule meant is P-46 at line 103; P-161 stands between. Name
    it. Confidence: medium-low.
16. **Line 48, the two instructions on `Index`.** "In the library, and in your own generic over such a
    type, write `I extends Index`", then "write the bound only in code that runs under walk or is
    checked against the interpreter's library". Consistent, but the first reads as unconditional until
    the paragraph's end. Put the limit with the instruction. Confidence: medium-low.
17. **Line 11, `Shape` and `Round`.** The example needs `Round` below `Shape`; it is not said.
    Confidence: low.
18. **Line 22, "The Scala language accepts it."** "It" is the inheritance pattern, not the object;
    clear on a second read. Confidence: low.
19. **Line 50, a large numeral at `Index`.** "A numeral at a parameter of type `Index` takes its
    default, a `ZZ32`": a numeral that defaults to `ZZ64` is presumably refused; not said.
    Confidence: low.
20. **Lines 55-64, placement.** The ordering of tuples and lists and the `=`/`SEQV` rule stand under
    "Traits and objects". The cross-reference at line 110 works, but a worker with an equality
    question would look under "Numbers" or a section of its own. Confidence: low.

Terms that the core does not give:

- "meet" (lines 13, 24, 30): the core glosses "join" but not "meet". Confidence: medium-low.
- `HasRank` (line 24): used as "exclude arrays" without saying that arrays extend it. Low.
- `N[\n\]` (line 85): "the object type `N[\n\]`" of `NatReflect` is not introduced. Medium-low.
- `BIG MIN_MAX` (line 122), `BIG //` (line 128), `typecase` (line 83), "varargs" (line 101): not in
  the core; each is guessable. Low.
- "stops" for "fails with an error" (lines 57, 101, 120, 128): consistent, never defined. Low.

Terms that I checked and found given: Working Draft (line 5), declared domain (11), Meet Rule (24),
self-typed (36), indexed type and index parameter (48), clause form (118), route A (89), plain test
(7); and from the core: count stage, switch-over, prelude, exclusion rule, ledger row, Appendix I,
class loader, compiled runtime, dotted and functional methods, getter.

## 3. Repair history, or detail that changes no action

I found no narrative of how a rule came about ("was", "used to", batch names). The candidates are
details:

1. **Line 91, "Until the switch-over, the compiler's prelude follows the same design (P-37)."** No
   action follows. Cut, or keep only if a worker would otherwise expect the prelude to differ.
2. **Line 64, "A float numeral converts where `RR64` is declared ("Numbers"), so `y: RR64 = 0.5` is
   `SEQV` a computed `RR64` 0.5."** I would not have assumed otherwise. Weak.
3. **Line 43, "With this reading and the bounds that the test reads ..., the library's generic `+` and
   `-` between an array and a number are valid beside `AdditiveGroup`'s own."** It is the reason for
   P-157 more than a rule. Borderline: it does stop a worker from "repairing" that pair.
4. **Line 13, the positions where the meet of the bounds is put (P-157).** The checker's mechanics. A
   worker writing overloads would act on an example pair, not on the list of positions. Borderline.
5. **Line 93, walk's two messages ('Type mismatch binding', 'got arg').** Serves only a test that
   asserts the message. Borderline; `tests-writing.md` or `interpreter.md` may be its place.
6. **Line 83, "The class loader computes a size without checking its kind, and stops on a negative
   exponent with a Java exception (row 675)."** A row for someone already in that code. Borderline.
7. **Line 50, "`Index` extends only `Any`, so such a tuple is still no `Object`."** Prevents one
   narrow misunderstanding; keep if space allows.

Kept on purpose, though they look like asides: "The Scala language accepts it" (22), the Java
`permits` contrast (30), "route A" and "the tower" (89), "The team's tests declare `simpleJoin` so"
(128). Each prevents a wrong assumption or a misreading of the record.
