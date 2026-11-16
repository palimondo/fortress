# Cold read of `fortress-repo`, climb batch 32

Read as a worker new to the repository. Base: `266990be4`. Parts judged: `SKILL.md`, `references/compiler.md`, `gate.md`, `interpreter.md`, `library.md`, `revival-changes.md`, `tests-writing.md`. No file was edited. No claim was checked against the code.

## 1. The lint's output

    .claude/skills/fortress-repo/references/revival-changes.md:103: status: ...P-46).** On both paths, a numeral leaves the declaration that fits it at its default only for one that its coercion reaches and whose declared parameter t...

One hit, exit 1. The other six parts print nothing.

## 2. What I would do differently, section by section

- `SKILL.md`, "Fortress as a language", the numbers (line 134). I would expect a numeral argument to be able to pick another overload than the one that fits its default type. I would expect no other conversion to do that. The limits are not here. They are in `revival-changes.md`, "Numbers".
- `revival-changes.md`, "Static parameters", `OPEN` (line 68). No new action. The example now names the call and the two overloads. I would not assert its answer in a plain test, because it cites a row.
- `revival-changes.md`, conditional extension (line 81). I would not rely on a conditional extension's condition at run time on either path.
- `revival-changes.md`, "Arguments convert" (line 101). Where a call is tied between declarations that apply only by coercion, I would expect the one that takes the numerals at their default types to run, with no "Ambiguous coercion".
- `revival-changes.md`, "Only a numeral's own coercion" (lines 103-106). I would expect `k(5)` to run the `NN32` overload beside an `Any` one. I would expect a numeral to stay at its default overload beside a sibling type's. I could not state the limit from the rule sentence alone. I got it from the two examples.
- `revival-changes.md`, "`Number` declares nothing" (line 110). I would write `u = 0` directly, on both paths. I would no longer bind the numeral first.
- `revival-changes.md`, "Reductions and comprehensions" (lines 120-122). I may leave out the static argument of `SUM` where the reduction is bound to a typed local variable or is a function's return value. I would write it at a method's return type, a field, a top-level variable and an assignment, in a program for both paths. I would write both arguments of `BIG MIN_MAX`.
- `library.md`, `SUM` and `PROD` (line 25). I could not tell whether I must write the element type in library code. I would copy the library's sites and write it.
- `interpreter.md`, a generic function as a value (lines 16-20). I would pass a generic function only where an arrow type with no open parameter receives it. I would write the static argument at `f: T -> T`. I would declare a generic function at the top level, not in a block.
- `interpreter.md`, the numeral beside `Any` (line 28). I would bind the numeral before I compare it with a value declared `Any`.
- `interpreter.md`, the bindings (lines 33-37). I would bind a call to one name before a top-level tuple binding. I would bind an array literal to an immutable name before a `var` takes it or an assignment uses it.
- `interpreter.md`, "Where a fix of walk belongs" (line 49). No action follows from the dispatch cache sentences as written.
- `compiler.md`, "Traps" (lines 112, 116, 117). I would not end a block in a bare numeral after a local declaration. I would write the static argument of a generic function passed at a parameter that is not an arrow type. I could not act on line 117 without guessing its meaning.
- `compiler.md`, "The checker's gaps" (line 132). At 'is not applicable to an argument of type ()' on an unwritten `SUM`, I would write the static argument and read the error again.
- `gate.md`, step 4 (line 40). I would know that one test can fail by a race. I would not know what to do about it.
- `tests-writing.md` (line 34). I would parenthesise a call or a subscript before `^`.

## 3. The flags

### `SKILL.md`

**F1.** `SKILL.md:134`. "Only a numeral's conversion changes which declaration runs when one already fits."
Kind: reads two ways. A worker can read it as "a numeral's conversion always changes the declaration", and then expects `f(1.5)` to leave `f(x: RR64)`. Confidence: medium.
Fix: restate. "When a declaration already fits, a conversion does not change which one runs. A numeral is the one exception: it can run a more specific declaration that its coercion reaches (`references/revival-changes.md`, "Numbers")."

### `references/compiler.md`

**F2.** `compiler.md:112`. "A block at a declared return type that ends in a numeral after a local declaration, or in a tuple with a numeral element, dies at run time ... Bind the numeral to a typed variable first, and end the block with the variable."
Kind: reads two ways. "after a local declaration" may or may not hold for the tuple case. The fix "end the block with the variable" does not fit a tuple: a worker does not know whether to bind the element or the whole tuple. Confidence: medium.
Fix: restate. "The body block of a function with a declared return type dies at run time, with `NoClassDefFoundError: fortress/CompilerBuiltin$v`, in two cases: it ends in a numeral after a local declaration, or it ends in a tuple with a numeral element (ledger rows 1014, 1030). Bind each such numeral to a typed variable first, and write the variable in its place."

**F3.** `compiler.md:116`. "A reference to a generic function with one declaration, as `count` in `useOne(count)` ... Write the static argument there, as `p(count[\ZZ32\])`."
Kind: undefined term, and a gotcha left out. The example changes from `useOne` to `p` without a declaration of either. The passage says nothing of a generic function with several declarations, so a worker who passes an overloaded one does not know what happens. Confidence: medium.
Fix: restate with one example, as "`p(count)` for `p(x: Any)`" and "`p(count[\ZZ32\])`", and add one sentence on a function with several declarations.

**F4.** `compiler.md:117`. "An assignment to a top-level `var`, made while a later top-level variable is initialised, is not seen by a read before that variable's first use (ledger row 1011). Read the initialised variable before the state that its initialiser writes."
Kind: reads two ways. "that variable" can be the `var` or the later variable. The passage rests on a fact that it does not state: when a top-level variable's initialiser runs on the compiled path. A worker cannot tell which read is wrong or in what order to write the program. Confidence: high.
Fix: restate, if this reading is the right one. "On the compiled path, the initialiser of a top-level variable runs at the variable's first use, not in the order of the declarations. So where the initialiser of `b` assigns to a top-level `var a`, a read of `a` before the first use of `b` gives the old value (ledger row 1011). Use `b` before you read `a`."

### `references/gate.md`

**F5.** `gate.md:40`. "In `ant testSystem`, `tests/XXXAtomicNestedReadsKeptWalk` can print `PASS` and fail with 'Missing expected failure': its expected failure depends on a race (ledger row 1004)."
Kind: a gotcha left out. The sentence before it says that all three suites must have zero failures, and step 5 makes a suite with failures red. The passage does not say what the worker does: call the gate red, run the test again, or run the suite again. One worker reports a red gate for a known race. Another ignores a real failure. Confidence: high.
Fix: restate. Add the action in one sentence, for example whether the worker runs the test again alone through `harness-one.sh` and how the summary then counts it.

### `references/interpreter.md`

**F6.** `interpreter.md:16`. "Each application then infers its static arguments, where the rules give a static error (ledger row 1021)."
Kind: reads two ways, and a claim that the worker cannot check. "where" can mean "although" or "in the places where". No rule of `revival-changes.md` speaks of a generic function as a value, so the worker would search for "the rules". Confidence: high.
Fix: restate. "Walk then infers the static arguments at each application. The checker refuses such a program, so do not rely on this in a program for both paths (ledger row 1021)."

**F7.** `interpreter.md:16`. "Departures:"
Kind: reads two ways. The list departs from something unnamed: the rules, or the behaviour that the paragraph just gave. Confidence: low.
Fix: restate. "Walk departs from this in three cases:".

**F8.** `interpreter.md:18`. "An immutable top-level variable of arrow type keeps the generic value (ledger row 1019)."
Kind: a gotcha left out. It gives no consequence and no way round, unlike the two bullets below it. Confidence: medium.
Fix: restate. Add what then goes wrong and what to write, for example "Write the static argument, as `g: ... = half[\3\]`."

**F9.** `interpreter.md:19`. "A generic function at `f: T -> T`, where another argument fixes the callee's `T`, is refused ... as `appT(half[\3\], v)`"
Kind: undefined term. `appT` has no declaration, and "the callee" can be `appT` or `half`. Confidence: low.
Fix: restate. Give the declaration, as "for `appT[\T\](f: T -> T, v: T)`, `appT(half, v)` is refused".

**F10.** `interpreter.md:20`. "A function declared in a block with static parameters of its own stops where it is declared: 'Missing type T'."
Kind: reads two ways. "with static parameters of its own" can attach to the block or to the function. It also stands under the departures of a function passed as a value, so the worker cannot tell whether every generic local function stops, or only one that is passed. Confidence: medium.
Fix: restate. "A generic function declared inside a block stops at its declaration, whether it is passed or not: 'Missing type T' (ledger row 1020). Declare it at the top level."

**F11.** `interpreter.md:28`. "A numeral beside a value whose static type is `Any` ... So `a = 0` is `true` for `a: Any` that holds a zero `NN32` (ledger row 1016). To compare as the rules do, bind the numeral first, as `z = 0`, then write `a = z`."
Kind: undefined term, and a claim that the worker cannot check. The same part says that walk has no static types, so "static type" needs "declared type". The passage does not give the rules' answer for `a = 0`. The lead of the list asks for an `XXX` test that asserts it, and the worker cannot derive it: dispatch is on run-time types, and the part does not say whether a `ZZ32` and an `NN32` compare by a declared `=`. Confidence: medium.
Fix: restate. "A numeral in a call beside a variable declared `Any` converts by the value's run-time type, not to its default. So `a = 0` is `true` for `a: Any` that holds a zero `NN32`; the rules' answer is ... (ledger row 1016)."

**F12.** `interpreter.md:49`. "It keeps each choice of a declaration in a dispatch cache, except a choice that asked a program's own type for its numeral coercion: that coercion's `where` clause can take one numeral and refuse another. The cache's key (`Numerals.Keys`) tells a numeral from a value of its default type and from a negative constant. So if walk is wrong on one of these nodes, fix the evaluator, not the desugarer."
Kind: detail that changes no action, and a broken sequence. The two new sentences state no action. They stand between the premise and its "So", and the "So" no longer follows from the sentence before it. Confidence: medium.
Fix: delete the two sentences. Or move them after the "So" sentence with their action: "If you change how a numeral chooses a declaration, check that the dispatch cache's key (`Numerals.Keys`) tells apart the calls that now choose differently."

### `references/library.md`

**F13.** `library.md:25`. "Where generators stand in brackets, the element type is written as in `SUM[\ZZ32\][j <- 0#n] f(j)`, and the library writes it at its own sites."
Kind: reads two ways. "is written as in" can give the syntax or state a duty. The section holds decisions on the library, so a worker who edits the library cannot tell whether a new `SUM` there must carry the element type. Confidence: medium.
Fix: restate. "The element type is written before the generators, as in `SUM[\ZZ32\][j <- 0#n] f(j)`. In the library's own code, write it, as the library does. In a program it can be left out:" and then the two sentences on the checker and walk.

### `references/revival-changes.md`

**F14.** `revival-changes.md:68`. "in an object whose `T` stayed open, `pick((1, 2))` runs `pick(x: Any)` beside `pick(x: (T,T))` (row 663)."
Kind: undefined term. The sentence does not say that `pick` is a method of that object, or that `T` is the object's static parameter. Confidence: low.
Fix: restate. "in a generic object `BoxU[\T\]` whose `T` stayed open, a call `pick((1, 2))` of its methods `pick(x: Any)` and `pick(x: (T,T))` runs the first (row 663)."

**F15.** `revival-changes.md:101`. "If one of them takes the call's numerals at their default, it runs instead"
Kind: a gotcha left out. It does not say what happens where two of the tied declarations take the numerals at their default. Confidence: low.
Fix: restate. "If exactly one of them takes the call's numerals at their default types, it runs instead".

**F16.** `revival-changes.md:103`. "**Only a numeral's own coercion changes which declaration runs (P-46).** On both paths, a numeral leaves the declaration that fits it at its default only for one that its coercion reaches and whose declared parameter types are strict subtypes of the first's."
Kind: lint hit (status, "at its default"), and reads two ways. The words are the numeral's default type, not a decision's status, so deletion would remove the rule. The sentence itself is the problem: "at its default" can attach to "fits" or to "leaves", "one" and "the first's" have far antecedents, and "own" in the heading contrasts with nothing. I could state the limit only from the examples. Confidence: high.
Fix: restate, which also clears the hit. "**A numeral can run a more specific declaration than the one that fits its default type (P-46).** On both paths, a call with a numeral runs the declaration that takes the numeral as its default type, unless the numeral's coercion reaches another declaration and each declared parameter type of that one is a strict subtype of the first one's. Then the other runs."

**F17.** `revival-changes.md:105`. "under walk, a numeral beside a value typed `Any` converts by the value's run-time type, not to its default (row 1016)"
Kind: undefined term. Everywhere else in the part, "beside" joins two declarations. Here it joins two arguments of one call, and the part gives no example. Walk has no static types (line 132), so "typed `Any`" needs "declared `Any`". Confidence: medium.
Fix: restate. "under walk, a numeral in a call whose other argument is a variable declared `Any` converts by that value's run-time type, as `a = 0` for `a: Any` (row 1016);".

**F18.** `revival-changes.md:106`. "on both paths, `g(5)` runs `g[\T\](x: T)` beside `g(x: NN32)` (row 1017)."
Kind: a claim that the worker cannot check. The passage does not say which declaration the rule gives. A worker cannot tell whether `NN32` is a strict subtype of an unbounded `T`, so it cannot write the `XXX` test's assertion. Confidence: medium.
Fix: restate. "on both paths, `g(5)` runs `g[\T\](x: T)` beside `g(x: NN32)`, where the rule gives `g(x: NN32)` (row 1017)."

**F19.** `revival-changes.md:120`. "the body's type only where no expected type serves"
Kind: reads two ways. "serves" can mean that no expected type exists, or that one exists and does not fit the bound. Confidence: medium.
Fix: restate. Say which: "and the body's type where the place gives no expected type" or "... where the expected type is outside the reduction's bound".

**F20.** `revival-changes.md:120`. "A reduction with a plain bound takes its bound"
Kind: undefined term. "plain bound" is not defined. Confidence: low.
Fix: restate. "A reduction whose bound does not name its parameter takes its bound".

**F21.** `revival-changes.md:122`. "As a call's argument, a reduction sums in its body's type on both paths."
Kind: a gotcha left out. Two sentences earlier, the checker takes the expected type, and "Static parameters" (line 74) says that the checker gives an argument the enclosing call's context. A worker would expect `f(SUM[j <- 0#n] g(j))` for `f(x: RR64)` to sum in `RR64` on the compiled path. The sentence contradicts that without saying so. Confidence: medium.
Fix: restate. "A parameter's type is no expected type for a reduction: as a call's argument, a reduction sums in its body's type on both paths."

**F22.** `revival-changes.md:122`. "Write both arguments of `BIG MIN_MAX`: the checker infers only a single static parameter (row 1007)."
Kind: undefined term. `BIG MIN_MAX` is first used here, with no word on what it is or what its two static arguments are, and no example of the written form. Confidence: low.
Fix: restate. Add the form, as "`BIG MIN_MAX[\ZZ32, ...\][j <- 0#n] f(j)`", with the second argument named.

### `references/tests-writing.md`

**F23.** `tests-writing.md:34`. "A superscript can follow a dotted access: `p.wq^T` is `(p.wq)^T`. ... `f(x)^T` is a static error, and `x[5]^2` fails on both paths (ledger rows 1 and 1005)."
Kind: undefined term. "superscript" is not defined for a reader who knows no Fortress. "fails" does not say how: a refusal or a wrong value. Confidence: low.
Fix: restate. "A superscript is `^` and what follows it, as the exponent in `x^2` or the transpose `^T`. ..." and name the failure of `x[5]^2`.

## 4. The undefined terms

- "superscript": `tests-writing.md:34`.
- "plain bound": `revival-changes.md:120`.
- "`BIG MIN_MAX`": `revival-changes.md:122`.
- "beside", of two arguments of one call: `revival-changes.md:105`, `interpreter.md:28`.
- "static type", under walk: `interpreter.md:28`; "typed `Any`": `revival-changes.md:105`.
- "the rules", for a generic function as a value: `interpreter.md:16`.
- "`appT`", "the callee": `interpreter.md:19`.
- "`useOne`", "`p`": `compiler.md:116`.
- "no expected type serves": `revival-changes.md:120`.
- "a block at a declared return type": `compiler.md:112`.

## 5. The gotchas

- A worker whose gate shows `XXXAtomicNestedReadsKeptWalk` failed either reports a red gate for a known race or passes over the failure: `gate.md:40`.
- A worker orders its top-level variables wrongly, because the passage does not say when an initialiser runs: `compiler.md:117`.
- A worker passes an overloaded generic function as a value and does not know the result: `compiler.md:116`.
- A worker binds the whole tuple, or nothing, where a block ends in a tuple with a numeral: `compiler.md:112`.
- A worker expects a parameter's type to direct a compiled `SUM` in a call's argument: `revival-changes.md:122`.
- A worker cannot write the `XXX` assertion for `g(5)` or for `a = 0` with `a: Any`, because the rules' answer is not given: `revival-changes.md:106`, `interpreter.md:28`.
- A worker keeps a generic function in an immutable top-level variable of arrow type and gets no way round: `interpreter.md:18`.
- A worker leaves the element type out of a new `SUM` in the library, or adds it to every program, because the sentence gives no duty: `library.md:25`.
- A worker reads `SKILL.md:134` as "a numeral always changes the declaration".

## 6. The count

Flags: 23. High: 4 (F4, F5, F6, F16). Medium: 12 (F1, F2, F3, F8, F10, F11, F12, F13, F17, F18, F19, F21). Low: 7 (F7, F9, F14, F15, F20, F22, F23). Lint hits: 1 (in F16).
