# Cold read of the orientation (climb-batch-30)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-30/orientation/orientation.md`. Nothing else was opened, no
source and no other part of the skill. Every statement below about a rule is what the orientation's text
says, not a checked fact about the tree.

## 1. What I would do differently, section by section

### Opening (three paragraphs)

- I treat a bold sentence as this tree's rule, and a sentence with P-N as the curator's decision. I build
  on a sentence without P-N but do not cite it as a decision.
- I do not assert in a test, as correct, a behaviour that the text cites with a ledger row: a fix can
  change it.
- I do not fix an "Until the switch-over" limit in the compiler's prelude.
- Before I call a disagreement a conflict, I search FACTS and POSITIONS.
- I distrust old notes, the team's tests and my training on three points: the number types do not nest,
  fixed-width arithmetic does not wrap, walk converts arguments.
- Limit: the rules resolve the three forms the team left; a rule can be questioned only on new evidence.

### Dispatch and overloading

- I may write overloads that differ only in static parameters. Limit: the more specific one's return type
  must be a subtype at every instance.
- With static parameters, exclusion is judged over the whole tuple of parameters. A pair is valid if the
  equalities that a common value forces cannot hold, or force an instance at which some position
  excludes. A pair that leaves a static parameter free is refused on both paths.
- I never rely on declaration order under walk. I expect "Cannot unify" for an argument outside a bound.
- I do not change code only to pass walk's load check, and do not take its acceptance as proof. I look up
  the case in `interpreter.md`, "What walk checks", first.
- I do not write two functional methods with equivalent parameter types at different `self` positions,
  nor an abstract and a concrete one at the same types in one trait. An object that inherits an abstract
  functional method from one trait and its body from another declares the method itself.
- A trait of mine with a functional `+`, `-`, `MIN` or `MAX` gets `excludes { Number }` or
  `excludes { HasRank }`, or I declare the operator in an object. Limit: the checker misses this pair
  against the library (row 918); walk refuses it at load.

### Traits and objects

- No type extends two instantiations of one generic trait. Walk does not enforce it, so a walk pass
  proves nothing; I do not copy the Working Draft's "Not allowed" examples.
- I read `comprises` as a statement about values, not as Java's `permits`: a generic trait below a listed
  type need not be listed.
- I write `override` only where the inherited parameter types are strictly narrower than mine. To replace
  at the same types I redeclare without `override`. A wrong `override` in the library stops every walk
  run. Limit: the code generator refuses every `override` (row 650).
- An object covers an inherited abstract method with one body or several narrower ones. Limits: walk
  skips generic objects; the checker refuses a multi-body cover with static parameters (row 725).
- In a self-typed trait I return `self` at the parameter type without a cast. Limit: compiled, such a
  body fails verification (row 695).
- I bound an index parameter with `I extends Index`, but only in code that walk runs or that is checked
  against the interpreter's library; the compiler's prelude has no `Index`. A tuple of `Index` types is
  an `Index`; `()` is not; only `ZZ32` among the integers is. I do not overload a function over `Index`
  with one over a tuple of `Index` types.
- I compare pairs and triples by order only where every element type extends `StandardPartialOrder`, and
  do not order a `List[\RR64\]` in checked code.
- Where a type declares no `=`, `=` is `SEQV`: reference objects, strings among them, only equal
  themselves. I give a value object an `=` to compare by content, do not rely on `=` of tuples longer
  than triples, and write `a <-> b`, not `≡`. Limit: the compiler's library has no `=` over `Any` or
  tuples, and its `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes

- An unfixed type parameter takes its bound, not `Nothing`. Under walk I write the static argument where
  an inner call needs the outer call's context (`mk[\ZZ64\]()`), and I expect `OPEN` for a self-bounded
  parameter and `Bottom` in three listed cases.
- I use only the three built `where` forms. Another `where` on an `extends` entry is read as
  unconditional, silently. The compiled runtime checks no `where` clause; a compiled call whose clause
  introduces a variable dies (row 867).
- Sizes are equal only when written alike after numeral arithmetic; I do not rely on commutativity
  (`s0 s1` against `s1 s0`), and I expect a `typecase` arm at a numeral to be reachable for a parameter.
  No size power above exponent 4096; no negative exponent.
- A run-time size comes from `reflect`, under walk only. I pass no value of a trait that lists a type at
  a `where`-clause size where the listed type is expected in compiled code (row 307).

### Numbers

- "Tower" in the record does not mean nesting.
- A numeral converts at a typed binding, assignment, field, parameter or declared return type, from its
  exact value; elsewhere it takes `ZZ32`, `ZZ64`, `ZZ` or `RR64`. The default sticks to a variable:
  `x = 0.1; q: QQ = x` is refused. A numeral type is written only as the parameter type of a coercion or
  an operator. A number type of mine takes numerals through a `coerce` generic over the numeral's
  numbers, with a `where` clause for its range; it needs a prefix `-` to take `-3`.
- An all-numeral expression folds exactly before checking, so a test of run-time arithmetic,
  overflow or concatenation needs a variable operand. A folded constant reaches my own type only by a
  coercion from its default type (`coerce(q: QQ)` for `10/20`).
- Coercions apply at calls, typed bindings and assignments; walk skips the declared return type (row 387)
  and does not promote tuple or varargs elements. I expect "Ambiguous coercion" for ties.
- Integer conversion: a checked getter (`x.asZZ32`) to keep the value, a low-bits function (`narrow`, ...)
  to wrap. `ZZ` has only `big`. In compiled code I use only the prelude's listed getters.
- Generic code over `T extends Number` can call nothing on `T`; I declare one function per number type.
  Across types, `=` holds only where a coercion exists; otherwise it is silently `false`, so I write
  `asFloat(x) = y`.
- An integer power keeps its base's type; for a fraction I write `2.0^(-1)` or a `QQ` base. The
  compiler's library has integer powers only at `ZZ32`, `NN32`, `NN64`.
- `/` on integers gives a `QQ`; `DIV` truncates. For a float I make an operand a float, and convert each
  `ZZ64` with `asFloat`. Compiled, `7 / 2` is a static error until the switch-over.

### Reductions and comprehensions

- I write the static argument on `SUM`, `PROD`, `BIG MAX`, `BIG MIN` in clause form
  (`SUM[\ZZ32\][j <- 0#n] f(j)`), because the checker does not infer it (row 731).
- Under walk without one, the instance comes from a local variable's type or a function's return type,
  not from a method's return type, a field, a top-level variable, a parameter or an assignment.
- In a reduction of mine without an identity, `simpleJoin` takes and answers `R`, never `Any` or untyped;
  I do not copy the team's tests on this.

### Implementation limits

- A walk pass is no type check. I write no `Maybe` as an `if` condition.
- I write every parameter type. A component function without a return type takes the api's.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core lacks

Confidence is that the passage is a real problem for a cold reader.

1. **Numbers, "`Number` declares nothing"**: "To compare a typed value with a numeral, bind the numeral at
   the value's type first, as `z: NN32 = 0`, then `u = z`. ... the other operand fixes the numeral's
   type, so `u = 0` is `true` for a zero `u: NN32`. Walk departs (`interpreter.md`)." The first sentence
   says a binding is needed; the third says `u = 0` works. I guess the binding is the workaround for
   walk's departure, but the text does not say which path needs it or what walk does. High.
2. **Traits and objects, self-typed, second paragraph**: "Walk reads `self` in the same way, so it loads
   such a pair in the library and in a program's own component. Walk's load check ... still refuses the
   pair in two cases." "Walk loads" and "walk's load check refuses" stand side by side. The two cases
   cite no ledger row, so by the opening's convention they are not known departures, yet they contradict
   the rule. I cannot tell whether to avoid these two shapes, or to record them. High.
3. **Static parameters, P-48**: "a type that holds `OPEN` admits only what it admits at `Bottom`: beside
   `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`." The example shows no bound for `T`, and `(1, 2)`
   would seem to fix `T`. Why `T` is `OPEN` here is not derivable; I would misjudge which calls are
   affected. High.
4. **Static parameters, P-48, list "Walk still gives `Bottom`"**: no action follows. I assume "write the
   static argument", as in the next rule, but it is not said, nor what `Bottom` then does (a failed
   dispatch?). Medium.
5. **Traits and objects, `Index`**: "An indexed type is a type whose values `a[i]` subscripts, such as an
   array." The clause does not parse. Medium-high.
6. **Dispatch, row 780**: "walk compares two functional methods of a generic trait or object on their
   declared domains only at a call." "Only" attaches to "declared domains" or to "at a call" (not at
   load). Medium-high.
7. **Dispatch, Meet Rule**: "An abstract functional method also counts for it." Counts as an overload
   that needs a cover, or as a declaration that can be the cover? The example suits the first; "Abstract
   declarations count" just above suits either. Medium.
8. **Reductions**: "Write it in every clause form." Of the four named reductions, or of all reductions?
   The next sentence ("Other reductions take their bound") implies the four, but the instruction reads as
   universal. Also the bold sentence "A reduction's static argument depends on the path" states no rule,
   unlike the opening's promise for bold sentences. Medium.
9. **`where` forms**: "Walk and the compiled runtime apply a conditional extension at every instance
   (row 774)." "Apply" reads as "enforce the condition" or as "extend unconditionally". The list rule
   above (walk orders every list, row 774) suggests the second. Medium.
10. **`override`**: the code generator refuses every `override` modifier (row 650), and walk refuses a
    wrong one. The text does not say whether I may write `override` in the interpreter's library, which
    the compiled path will use after the switch-over, or in a program meant to compile. Medium.
11. **Pairs and triples**: "Walk refuses another element type at the call, also where earlier elements
    decide ... It also refuses numbers of two run-time types at one position ... (row 511)." It is not
    clear which sentence row 511 covers, so which is rule and which is departure. "Unordered deciding
    elements give `false`" uses "unordered" for values (NaN?) right after using "ordered" for types.
    Medium.
12. **Opening**: "A sentence that cites a ledger row states a known departure of one path from a bold
    rule." Several cited rows are not that: row 774 names walk and the compiled runtime, row 923 "holds
    the question of longer tuples", rows 441 and 523 sit in an "Until the switch-over" sentence. "Do not
    assert it as correct in a test" also leaves open whether an `XXX` expected failure may assert it.
    Medium.
13. **Dispatch, P-45**: "must be a subtype of the other's at every instance, not at one only." Instance
    of which declaration, and how the two instances pair up, is not said. Medium.
14. **Dispatch, P-152**: "a value of both domains has one instance of each generic type at each position,
    so those instances' static arguments are equal." I followed it only through the two examples. The
    sentence alone would not let me judge a new pair. Medium.
15. **`comprises`**: "Read so, several declarations can together cover the meet of two overloads." The
    step from the value reading to a joint cover is not shown; the same idea is clear in P-147 two
    paragraphs later. Low-medium.
16. **Terms the core does not give, used without a gloss**: `N[\n\]` (in the `typecase` example and
    "the object type `N[\n\]`"), `HasRank` (half glossed as "arrays"), `Vector`, `Matrix`, `array1`,
    `array2`, `AnyIntegral`, `StandardPartialOrder`, `StandardTotalOrder`, `LexicographicOrder`,
    `MINMAX`, `CHOOSE`, "the count stage" (the core names it, but only by pointer), "kind" of a size
    (core gives kinds of static parameters; `nat` against `int` for a size is implied). `N[\n\]` is the
    one that blocks understanding. Medium for `N`, low for the rest.
17. **Numbers, numeral's numbers**: "the digit count, the count of digits after the point, the radix, and
    the digits read as one integer" lists four for a type that has three in `NaturalNumeral`. A reader
    can sort it out from `[\n, m, r, v\]`. Low.
18. **Numbers, fold**: "under walk `lr = 1/1000` is a `QQ`" and "defaults to a `QQ`" come four
    paragraphs before the sentence that the compiler's library has no `QQ`. Until then "on both paths" in
    the bold rule reads as if the compiled result were a `QQ` too. Low-medium.
19. **`asFloat`**: called a getter by association ("no getters, no `asFloat`"), declared "into `RR64`",
    and written `asFloat(x)`. Whether `x.asFloat` is also valid is open. Low.
20. **Placement**: the rule for `=` and `SEQV` sits under "Traits and objects", and string-literal
    folding under "Numbers". Cross-references exist, but a worker who searches by heading for equality or
    strings misses them. The `Index`, `=` and numeral paragraphs are each one block of fifteen or more
    sentences with several rules and departures; a departure is easy to miss inside. Low-medium.
21. **`Index`**: "In the library, and in your own generic over such a type, write `I extends Index`"
    comes eight sentences before "write the bound only in code that runs under walk". A worker who stops
    early writes the bound in a program meant to compile. Low-medium.

## 3. Passages that hold repair history, or detail that changes no action and prevents no misunderstanding

I found no narrative of past repairs (no batch, date or "was fixed"). The candidates are detail:

1. "The checker checks sizes against their kind, and the runtime carries each as a descriptor." The
   descriptor is in the core ("The compiled runtime"); neither half changes what I write.
2. "Walk has no static types. ... So walk runs programs that the checker refuses." The core says this in
   "How a program runs". Only the `Maybe` condition is new.
3. Reductions: "Walk instantiates a reduction at its value's declared type: a local variable's, or a
   top-level or local function's return type" and "Else walk takes the join" repeat the core's "Static
   parameters" bullet. The new parts are "also where the clause form ends a block" and the list of what
   does not direct it.
4. "The number types are flat siblings (P-43)" repeats the core; its paragraph earns its place only by
   the gloss of "route A" and "the tower".
5. Self-typed, second paragraph: "With this reading and the bounds that the test reads ..., the library's
   generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." This
   justifies a state of the library. It changes an action only if a worker would otherwise report that
   pair as invalid; if that is the purpose, say so.
6. "Walk stops its search for a cover at limits that `interpreter.md` gives, and the checker at the same
   limits." A pointer with no content here; one clause would do.
7. "The class loader computes a size without checking its kind" — the action is in the second half
   (a negative exponent stops with a Java exception, row 675).
8. "`NatParam` is declared `comprises { N[\n\] } where [\nat n\]`, which lists a type at a `where`-clause
   size." It explains the cause; the next sentence carries the rule for my own traits.
9. "The coercion gives one value for each place where the numeral is written, and each run of that place
   reuses it (P-176)." I can name no action it changes, unless the type is a reference object and
   identity matters; the text does not say.
10. "A chain of `||` folds character literals too, if its first or second operand is a string literal."
    The action ("a test of run-time concatenation needs a variable operand") holds without it.
11. "An element that does not convert to the instance stops in `__bigOperator`, 'body param 1'" and
    "fails with 'Cannot unify'": diagnostic strings. They help me recognise a failure; they change no
    choice. Keep if recognition is the aim.
12. "Each `bitsAs…` getter equals `unsigned` or `signed`, as `bitsAsNN32` of a `ZZ32`": tells me nothing
    to do differently, unless old code uses those getters.
