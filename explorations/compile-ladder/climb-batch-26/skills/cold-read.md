# Cold read: fortress-repo, changes since d7a03f34f

Parts read: `references/compiler.md`, `references/interpreter.md`, `references/revival-changes.md`. `SKILL.md` read whole first.

## 1. The lint's output

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md

It printed nothing and exited 0. No lint hits.

## 2. What a worker would do differently, section by section

### compiler.md, "What the compiled path cannot compile yet" (lines 41-49)

A worker may now write a local function, also a recursive one, in a compiled program or test. It must not give that function static parameters of its own, overload it with a second local function of the same name in one block, or mark it `atomic`. A test that needs one of those forms is an `XXX` test. Limit: the part does not say what message the refusal gives, nor whether two mutually recursive local functions compile.

### compiler.md, "Natives", the wrapper-generator paragraph (line 96)

In the count stage and the distance stage, the worker learns that a binding to any helper of `nativeHelpers/systemOps` stops its component with 'FortressBuiltin.StringVector is undefined.'. So it would not bind a `systemOps` helper in the interpreter's library, or would expect that message if it does. Limit: the part does not say why `systemOps` in particular, what "stops its component" does to the stage's total, or what to do instead.

### interpreter.md, "What walk checks" (lines 43, 53, 54)

Line 43: walk now uses its own rule check, not the team's, for a generic function beside a functional method of a generic trait or object, where the method has no static parameters of its own. The worker would expect the rule names in walk's message ("fails the Meet Rule" and so on), not "at least one pair of parameters must have excluding types".

Line 53: walk loads a type that extends a self-typed trait `T[\A\]` and is not an `A`. The checker refuses it. The worker learns that walk's load is no proof here. Limit: the part says only that a call "runs one of them". It gives no action.

Line 54: walk loads a generic function inside the declared domain of a self-typed trait's functional method, and the checker refuses it. The worker learns that the two paths differ. Limit: it does not learn what to assert in a test, or how to recognise the checker's refusal.

The old row-804 item is gone. A worker no longer expects walk to refuse a program's own array-and-number generic operator beside `AdditiveGroup`'s.

### interpreter.md, "Natives" (lines 96-117)

A helper's binding may now declare `String` as its result and as `self`, but not as another parameter. A `String` parameter is refused at load with 'no Java type carries the declared'. `self` of the library's own `FlatString` is carried. For the `CatString` defect, the worker binds the native over `FlatString` and adds an overload over `String` that passes `s.asFlatString`, after `printlnWithThread`. Limit: the part no longer says what to do for a helper bound in a method of `String` with `self`. The sentence on a program's own type named `FlatString` reads two ways.

### revival-changes.md, "Traits and objects" (lines 28, 39, 43-46)

Line 28 is a rewording of the row-416 sentence. It changes no action.

Line 39: a trait is self-typed also when its parameter `X` is bounded by a self-typed `U[\X\]` that it extends, as in the written example. The worker can now apply the definition.

Lines 43-46: walk now loads the array-and-number generic `+` and `-` beside `AdditiveGroup`'s in a program's own component too. It still refuses the pair in two cases: `T` self-typed only through another self-typed trait, and a method with static parameters of its own. Limit: "the method" reads two ways, and the two cases cite no ledger row.

### revival-changes.md, "Static parameters, `where` clauses and sizes" (line 70)

A rewording: the code generator accepts a declaration's own `where` clause. It agrees with `compiler.md` line 51. It changes no action.

### revival-changes.md, "Numbers" (line 82)

A rewording: the checker reads the numeral as `ZZ32` where the tied declarations differ only at the positions of the call's numerals. Clearer than before. No new action.

### revival-changes.md, "Reductions and comprehensions" (line 98)

A rewording: the team's tests declare `simpleJoin` at `Any` or untyped. Clearer. No new action.

### revival-changes.md, "Implementation limits" (line 102)

A rewording of the bold rule: walk has no static types. No new action.

None of the changed sections holds repair history.

## 3. The flags

### compiler.md

**compiler.md:44.** "It compiles a local function as a closure, also a recursive one, but refuses these forms (ledger row 304):"
- Kind: a gotcha that the passage leaves out.
- Problem: the worker cannot tell the refusal from another failure, or name the wall in an `XXX` test, because the message is not given. It also cannot tell whether two mutually recursive local functions compile.
- Confidence: low.
- Fix: restate, adding the message the code generator gives for each form, and one sentence on mutual recursion. For example: "It compiles a local function as a closure, also a recursive one or two that call each other, but refuses these forms with `<message>` (ledger row 304):". Use the real message and the real answer on mutual recursion.

**compiler.md:96.** "So there, a binding that names any helper of `nativeHelpers/systemOps` stops its component: 'FortressBuiltin.StringVector is undefined.' (ledger row 895)."
- Kind: a sentence that reads two ways; a gotcha that the passage leaves out.
- Problem: "stops its component" can mean the stage skips the component's later errors, or the stage reports an error for it. A worker that reads the count stage's total cannot tell whether the total still counts the component. The link between `systemOps` and `StringVector` is left to the reader, so a worker that adds a helper class with a method over a Java array would not expect the same failure. The sentence gives no action.
- Confidence: medium.
- Fix: restate as "So there, a binding that names any helper of a class with a method whose type the interpreter's library does not declare stops the check of its component at that binding. `nativeHelpers/systemOps` is such a class: one of its methods maps to `StringVector`, which only the compiler's prelude declares, so the stage reports 'FortressBuiltin.StringVector is undefined.' and <what the total then holds> (ledger row 895). Do not bind a helper of such a class in the interpreter's library." Fill in what the total holds.

### interpreter.md

**interpreter.md:43.** "a pair that is neither two generic declarations, nor a generic one beside a plain one, nor a generic function beside a functional method of a generic trait or object that has no static parameters of its own;"
- Kind: a sentence that reads two ways.
- Problem: "that has no static parameters of its own" can attach to the functional method or to the trait or object. Read the second way, it contradicts "generic", and a worker cannot tell which pairs get the team's message.
- Confidence: medium.
- Fix: restate as "a pair that is none of these: two generic declarations; a generic declaration beside a plain one; a generic function beside a functional method, without static parameters of its own, of a generic trait or object;".

**interpreter.md:53.** "A call that both `T`'s operator and another declaration fit then runs one of them (ledger row 893)."
- Kind: a gotcha that the passage leaves out.
- Problem: the worker does not learn which declaration runs, whether the choice varies, or what to do. It may assert walk's answer in a test or write such a type in a walk program.
- Confidence: medium.
- Fix: restate as "A call that both `T`'s operator and another declaration fit then runs one of them, and <which one, or: which one is not fixed> (ledger row 893). Do not write such a type: the checker refuses it. Assert no answer of walk's on such a call in a test."

**interpreter.md:54.** "and no decision says which path is right (ledger row 894)."
- Kind: a decision's status named.
- Problem: the status goes stale when the curator decides, and the worker cannot act on it. The sentence gives no action in its place.
- Confidence: high.
- Fix: delete the clause, and add the action: "Assert neither path's answer in a test (ledger row 894)."

**interpreter.md:54.** "It loads a generic function inside the declared domain of a self-typed trait's functional method, where the Return Type Rule holds. The checker refuses it by a rule that the specification does not state"
- Kind: a claim that a worker could not check; a sentence that reads two ways.
- Problem: "a generic function inside the declared domain" can mean a function whose declared domain lies inside the method's, or a function declared within the method. "A rule that the specification does not state" gives the worker no way to recognise the checker's refusal: no rule name, no message.
- Confidence: medium.
- Fix: restate as "It loads a generic function whose declared domain lies inside that of a self-typed trait's functional method, where the Return Type Rule holds. The checker refuses the pair with '<message>', a check that the specification does not state."

**interpreter.md:103.** "A parameter declared at such a type is still carried by its name, and the native receives the type's name (ledger row 877)."
- Kind: a sentence that reads two ways; a gotcha that the passage leaves out.
- Problem: "carried by its name" can mean walk matches the parameter's type by the name `FlatString` and carries it in `String`, or that the parameter's name is passed. "The native receives the type's name" reads like the `CatString` defect, but the sentence does not say it is wrong text, that walk does not refuse it, or what to do.
- Confidence: medium.
- Fix: restate as "Walk still carries a parameter declared at a program's own type named `FlatString` or `JavaString` in `String`, by the type's name alone, and does not refuse the binding. The native then receives the name of the type, not the value's text (ledger row 877). Do not name a program's own type `FlatString` or `JavaString`."

**interpreter.md:117.** "Bind such a native over `FlatString`, and beside it an overload over `String` that passes `s.asFlatString`, as `printlnWithThread` does"
- Kind: a gotcha that the passage leaves out.
- Problem: the first sentence names two cases, a glue class over `String` and a helper bound in a method of `String` as `self`. The fix covers only a parameter. The old text's advice for the `self` case (call a function that binds the helper, with `self.asFlatString`) is gone, so a worker fixing a method of `String` has no way given.
- Confidence: medium.
- Fix: add after it: "In a method of `String`, call a function that binds the native over `FlatString`, with `self.asFlatString`."

### revival-changes.md

**revival-changes.md:28.** "and refuses overloads on two instantiations, as `Tg[\3\]` and `Tg[\4\]`, as not excluding (row 416)."
- Kind: a sentence that reads two ways.
- Problem: the two "as" clauses run together. The first gives types, not overloads, so "as not excluding" can read as a second example.
- Confidence: low.
- Fix: restate as "and refuses two overloads on two instantiations of one generic type, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, because it does not read the two as excluding each other (row 416)."

**revival-changes.md:43-46.** "Walk's load check, which is not the verdict ("Dispatch and overloading"), still refuses the pair in two cases: ... the method has static parameters of its own."
- Kind: a sentence that reads two ways; a claim that a worker could not check.
- Problem: "the method" can be `T`'s own operator or the library's generic operator beside it. The two cases are departures of walk, but cite no ledger row, so by this part's own reading rule a worker takes them as rules of this tree and may assert them in a test. "Dispatch and overloading" sends the worker to `interpreter.md`, "What walk checks", to find each such case, and neither case is listed there.
- Confidence: medium.
- Fix: restate as "Walk's load check, which is not the verdict ("Dispatch and overloading"), still refuses the pair in two cases (row <N>): `T` is self-typed only through another self-typed trait that it extends; `T`'s functional method has static parameters of its own." Add the same two cases, with the row, to the departures in `interpreter.md`, "What walk checks".

**revival-changes.md:102.** "It is to run the checker only after the switch-over (P-12)."
- Kind: a sentence that reads two ways.
- Problem: "is to run" can read as an instruction to the worker to run the checker after the switch-over, not as the plan for walk.
- Confidence: low.
- Fix: restate as "After the switch-over, walk runs the checker too (P-12)."

## 4. Undefined terms

- "closure", for a compiled local function: compiler.md:44. A Java reader knows the word, but not what form the code generator gives it; low cost.
- "systemOps", a class under `nativeHelpers/`: compiler.md:96. Named, not described.
- "StringVector", as the type in the message: compiler.md:96. Defined at compiler.md:57 as a type of the compiler's prelude, but the link is not made.
- "Return Type Rule" as a check of walk on a self-typed trait's method: interpreter.md:54. Defined earlier in the part, so no flag.

## 5. The gotchas

- A worker binding a helper of `systemOps`, or of any class with a method over a type that only the compiler's prelude declares, in the interpreter's library, gets its component stopped in the count and distance stages, and cannot tell what the total then means: compiler.md:96.
- A worker writes a type that extends `T[\A\]` without being an `A`, sees walk run it, and asserts the declaration walk chose: interpreter.md:53.
- A worker asserts walk's load or the checker's refusal of a generic function inside a self-typed trait method's domain: interpreter.md:54.
- A worker names a program's own type `FlatString`, binds a helper over it, and gets the type's name instead of the text, with no refusal at load: interpreter.md:103.
- A worker fixing the `CatString` defect for a helper bound in a method of `String` as `self` finds no way given: interpreter.md:117.
- A worker asserts walk's refusal of the self-typed pair in its two remaining cases as the rule, because no row marks them as departures: revival-changes.md:43-46.
- A worker cannot recognise the code generator's refusal of the three local-function forms, for want of a message: compiler.md:44.

## 6. Count

Flags: 11. High: 1. Medium: 7. Low: 3. Lint hits: 0.
