# Cold read: fortress-repo, climb batch 31

Base 931712307, head 16472318bf. I read the changed parts as a worker new to the repository: `SKILL.md`, `references/compiler.md`, `references/gate.md`, `references/interpreter.md` and `references/revival-changes.md`. I changed no file except this report.

## 1. The lint

The command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/gate.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md

Output: none. Exit status 0. No hits.

## 2. What I would do differently, section by section

- `SKILL.md`, "The caches" (:101). I would know an `interpreter_cache/` entry by its start, `(Component @"`, then the source's absolute path. The path part repeats :105.
- `SKILL.md`, "Parallelism and mutable state" (:124). I would count an object's `var` field among the mutable variables that a compiled `atomic` block tracks. Limit: the compiled path. Array elements only from the switch-over.
- `compiler.md`, "What the compiled path cannot compile yet" (:40). I would expect `label`, `exit` and an atomic expression to compile. Only `spawn`, an object expression and an array literal hit a wall.
- `compiler.md`, "The runtime" (:75). I would look for a `var` field's cell in its object, and expect a transaction to track it as it tracks a variable.
- `compiler.md`, "Traps of the compiled path" (:106-:129). In a compiled program, I would not rely on `finally` after an `exit`. I would bind an atomic expression, a `try` or a `label` block in its own statement before I pass it after the first argument. I would bind a `label` block's numeral to a typed variable. I would write `atomic do ... end` where an atomic expression's value is a numeral at a declared type. I would set a flag in an `atomic` block and exit after it, on both paths. I would put `self` first in an object's own overloads of an inherited functional method. I would give a value object no `var` field. I would bind a value at a field's type before I assign it to another object's `var` field. Limits: each holds on the compiled path, except the exit out of `atomic`, which holds on both. I could not say what to assert for an `exit` after its `label` block completed.
- `compiler.md`, "The checker's gaps" (:134-:136). I would expect the checker to refuse a generic identity beside a plain one over a tuple of object types. I would expect a call's static type to change with the suite's order where two generic candidates tie. I would expect a diamond to a generic self-typed trait's method, declared again at the same types, to be refused. None of the three gives an action, so I could not say what to write.
- `gate.md`, "The atomic runs" (:47, :52). I would run twenty-four programs, `AtomicExprCompiled` and `AtomicFieldCompiled` among them. The list holds twenty-four.
- `interpreter.md`, "How walk evaluates a program" (:18). I would expect walk to keep a generic function value generic also in an object's field of arrow type and at a declared return type of arrow type. I could not tell whether a `var` field counts.
- `interpreter.md`, "What walk checks" (:80-:82). I would write every return type, so that walk applies the Return Type Rule. I would expect walk to refuse a valid pair over a trait that comprises one object, and to load an invalid generic and plain pair over an arrow type. I could not tell which type of each example is the object type or the trait.
- `revival-changes.md`, "Dispatch and overloading" (:13). I would expect both paths to refuse a pair only where its exclusion depends on a static parameter that the equalities leave free, not every pair with a free parameter.
- `revival-changes.md`, "Traits and objects" (:41-:47). I would expect a compiled body of a self-typed trait that returns `self` to run, except in three shapes: a function expression or local function, a conditional with `self` in one arm, and a default body that calls a method on an `X` where the object lists `T` first. For the first two, I would bind `self` to `s: X` and test it. For the third, I would give the body in the object. I could not tell when `StandardTotalOrder`'s `MIN` and `MAX` fail, or what my own type should do about them.

The second question finds history or detail that changes no action in these sections: `SKILL.md`, "The caches" (:101, a repeat of :105); `gate.md`, "The atomic runs" (:47, the count); `revival-changes.md`, "Traits and objects" (:41, "also where `X` is an object type" and "still"; :47, where the workaround has run). Flags 1, 21, 27 and 30 below hold them.

## 3. The flags

### `SKILL.md`

**1. `SKILL.md`:101**
- Passage: "It starts `(Component @"`, then the source's absolute path."
- Kind: detail that changes no action.
- Problem: The path part repeats :105 ("the entry holds that path"), so the part states one fact twice.
- Confidence: low.
- Fix: delete ", then the source's absolute path". The sentence becomes: "It starts `(Component @"`."

### `references/compiler.md`

**2. `compiler.md`:75**
- Passage: "(`compiler/runtimeValues/MutableFValue.java`), also an object's `var` field, whose cell the object holds."
- Kind: a sentence that reads two ways.
- Problem: "also" can attach to "a cell" or to "each mutable variable", so a worker can read the field as a second cell beside the variable's.
- Confidence: low.
- Fix: restate: "The compiled code keeps each mutable variable in a cell (`compiler/runtimeValues/MutableFValue.java`), and an object's `var` field in a cell that the object holds."

**3. `compiler.md`:106**
- Passage: "an exception that no `catch` clause takes, or that `ForbiddenException` (ledger row 890)"
- Kind: a sentence that reads two ways.
- Problem: After "an exception that no `catch` clause takes", "or that `ForbiddenException`" reads as a second relative clause with no verb, so a worker cannot tell that it means the `ForbiddenException` that the `try` throws.
- Confidence: medium.
- Fix: restate: "A `try`'s `finally` clause does not run when one of these leaves the `try` block: an `exit`, an exception that no `catch` clause takes, or the `ForbiddenException` that the `try` throws (ledger row 890)."

**4. `compiler.md`:108**
- Passage: "An `atomic` block or expression"
- Kind: a term not defined where it is used.
- Problem: "atomic expression" is first used here and shown only at :117, so a worker can read it as an atomic block used for its value, not as the form `atomic e` without `do`.
- Confidence: medium.
- Fix: define it at first use: "An `atomic` block (`atomic do ... end`) or expression (`atomic e`, as `atomic 1`), a `try` or a `label` block as a call's argument after the first, ..."

**5. `compiler.md`:116**
- Passage: "A `label` block whose value joins a numeral with an exit's `ZZ32` value stops the code generator ... Bind the numeral to a typed variable first, as `none: ZZ32 = -1`."
- Kind: a sentence that reads two ways; a gotcha.
- Problem: The skill shows nowhere an `exit` that carries a value (`exit L with v`), "joins" reads as a verb on values, and the fix does not say to end the block with the variable, as :112 does.
- Confidence: medium.
- Fix: restate: "A `label` block that ends in a numeral, where an `exit ... with` gives the block a `ZZ32` value, stops the code generator: 'Error trying to close method scope' (ledger row 340). Bind the numeral to a typed variable first, as `none: ZZ32 = -1`, and end the block with the variable."

**6. `compiler.md`:117**
- Passage: "At a place of declared type, an atomic expression whose value is a numeral is refused"
- Kind: a term not defined where it is used.
- Problem: "place of declared type" is not the term of `revival-changes.md`, "Numbers" ("a place fixes a type"), so a worker cannot tell whether `x: Any = atomic 1` counts; and "is refused" names neither the refuser nor the message.
- Confidence: low.
- Fix: restate: "At a place that fixes a type (`revival-changes.md`, "Numbers"), the compile refuses an atomic expression whose value is a numeral, as `atomic if c then 1 else 0 end`, and `atomic 1` fails the JVM's verification (ledger row 1043). Write `atomic do ... end`."

**7. `compiler.md`:118**
- Passage: "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block."
- Kind: a gotcha.
- Problem: The trap holds under walk too, but a fix of walk does not load `compiler.md` (`SKILL.md`:204), so a worker on walk exits from an `atomic` block and loses its writes.
- Confidence: medium.
- Fix: move these two sentences to `SKILL.md`, "Parallelism and mutable state", after the paragraph at :124. Keep in `compiler.md` only the sentences on an `exit` after its `label` block.

**8. `compiler.md`:118**
- Passage: "ends a compiled program with an uncaught `LabelExit`. Under walk, a `catch` of `LabelException` takes it."
- Kind: a term not defined where it is used.
- Problem: Neither name is explained, so a worker cannot tell whether `LabelExit` is a Java class or a Fortress exception, nor whether a compiled `catch` of `LabelException` would take it.
- Confidence: medium.
- Fix: define both. If this reading is right: "ends a compiled program with the Java exception `LabelExit`, which no `catch` takes. Under walk, it raises the library's `LabelException`, which a `catch` takes."

**9. `compiler.md`:118**
- Passage: "The rules do not settle which is right (ledger row 1041)."
- Kind: a gotcha.
- Problem: Unlike `interpreter.md`:29, which states the same state, the sentence gives no action, so a worker may pin walk's `catch` in a plain test.
- Confidence: low.
- Fix: restate: "The rules do not settle which is right, so assert neither path's answer in a test (ledger row 1041)."

**10. `compiler.md`:119**
- Passage: "A functional method with `self` not first, which an object overloads by its own declarations beside an inherited one, tests the receiver in place of the argument. A call then dies ... or, where the receiver has the own declaration's parameter type, runs that declaration for every argument (ledger row 1038)."
- Kind: a sentence that reads two ways.
- Problem: A method tests nothing, "the argument" names no argument, and "the own declaration's parameter type" names no declaration, so a worker cannot tell which code goes wrong or which calls meet it.
- Confidence: high.
- Fix: restate: "Where an object overloads an inherited functional method by declarations of its own, and `self` is not the first parameter, the compiled dispatch method tests the receiver's type where it should test the other argument's. A call then dies with `ClassCastException` (ledger row 573). Where the receiver has the parameter type of one of the object's own declarations, the call runs that declaration whatever the argument (ledger row 1038). Put `self` first in such overloads."

**11. `compiler.md`:120**
- Passage: "Compiled, two such objects built alike are not strictly equivalent"
- Kind: a sentence that breaks the part's register.
- Problem: The opener "Compiled," is a participle that the part uses nowhere else, and it reads as if the objects were compiled.
- Confidence: low.
- Fix: restate: "On the compiled path, two such objects built alike are not strictly equivalent: `V(1) === V(1)` is `false` (ledger row 112)."

**12. `compiler.md`:120**
- Passage: "Give a `value` object no `var` field: the specification forbids it, and nothing refuses it."
- Kind: a gotcha.
- Problem: The rule holds on both paths, but a worker on walk does not load `compiler.md`, and `SKILL.md`:113 ("It has only immutable fields") reads as a check that some path makes.
- Confidence: low.
- Fix: move the rule to `SKILL.md`:113, after "It has only immutable fields and value semantics": "Nothing refuses a `var` field in a value object, so give it none."

**13. `compiler.md`:129**
- Passage: "as `c.t := High` for `object Cell(var t: T)` and `object High extends T`"
- Kind: a sentence that reads two ways.
- Problem: `T` reads as a type parameter of `Cell`, because the example declares no trait `T`.
- Confidence: low.
- Fix: restate: "as `c.t := High` for `trait T`, `object Cell(var t: T)` and `object High extends T`."

**14. `compiler.md`:134**
- Passage: "a plain one whose domain is a tuple of object types, a pair that the rule accepts"
- Kind: a sentence that reads two ways.
- Problem: "a pair" follows "a tuple", and the example's tuple is a pair, so a worker can read that the rule accepts the tuple, not the two declarations.
- Confidence: medium.
- Fix: restate: "The Return Type Rule: the checker refuses a pair of declarations that the rule accepts: a generic declaration beside one without static parameters whose domain is a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`, `Circle` an object (ledger row 1048). Walk loads and runs the pair."

**15. `compiler.md`:134**
- Passage: "The Return Type Rule:"
- Kind: a term not defined where it is used.
- Problem: `SKILL.md`:130 and `revival-changes.md`:11 state the rule without its name, and only `interpreter.md`:63 names it, which a worker on the compiled path does not load, so it must guess which rule is meant.
- Confidence: medium.
- Fix: define the term at `SKILL.md`:130: "The more specific one's return type must fit the other's: the Return Type Rule."

**16. `compiler.md`:134**
- Passage: "Walk loads and runs the pair."
- Kind: a gotcha.
- Problem: The item gives no action, so a worker that needs such a pair in a compiled program or test does not know what to write.
- Confidence: low.
- Fix: add: "A compiled test of the rule's answer is an `XXX` test (`tests-writing.md`)." Add the workaround, if one is known.

**17. `compiler.md`:135**
- Passage: "the checker keeps the head of its sort, whose order varies with what the same JVM compiled before"
- Kind: a term not defined where it is used.
- Problem: "the head of its sort" names no sort, so a worker cannot tell that the checker sorts the candidates and keeps the first.
- Confidence: medium.
- Fix: restate: "the checker sorts the candidates and keeps the first. The sort's order varies with what the same JVM compiled before."

**18. `compiler.md`:135**
- Passage: "So the call's static type, or a crash, 'V is not in the kind env', can change with the order of the suite (ledger rows 499, 1046, 1047)."
- Kind: a gotcha.
- Problem: The item gives no action, so a worker whose test passes alone and fails in the suite does not know how to write the call.
- Confidence: medium.
- Fix: add an action, as: "Make one candidate more specific than the other, so that no tie remains."

**19. `compiler.md`:136**
- Passage: "The traits chapter does not settle which is right"
- Kind: a term not defined where it is used.
- Problem: The passage names no document and no file, so a worker must search the specification for the chapter.
- Confidence: low.
- Fix: restate with the file: "The specification's chapter on traits (`Specification/<file>.tex`) does not settle which is right."

**20. `compiler.md`:136**
- Passage: "the checker refuses an object that reaches a generic self-typed trait's method along two paths, one through a trait that declares the method again at the same parameter types"
- Kind: a gotcha.
- Problem: `revival-changes.md`:32 tells a worker to replace an inherited declaration at its own parameter types by declaring it again without `override`; in a generic self-typed trait, that makes this refused form, and the item gives no workaround and no test action.
- Confidence: medium.
- Fix: add: "Assert neither path's answer in a test." Add the workaround, if one is known. At `revival-changes.md`:32, add: "In a generic self-typed trait, the checker refuses this where an object reaches the method along two paths (`compiler.md`, "The checker's gaps")."

### `references/gate.md`

**21. `gate.md`:47**
- Passage: "The atomic runs compile twenty-four programs"
- Kind: detail that changes no action.
- Problem: The count repeats the loop's list, changes no step, and must be edited each time the list changes.
- Confidence: low.
- Fix: delete the count: "The atomic runs compile the programs below, and run each one three times at four threads."

### `references/interpreter.md`

**22. `interpreter.md`:18**
- Passage: "An immutable top-level variable of arrow type, an object's field of arrow type and a declared arrow return type keep the generic value."
- Kind: a sentence that reads two ways.
- Problem: A worker cannot tell whether "immutable" covers the field, so whether a `var` field keeps the generic value; only the top-level case has an example.
- Confidence: low.
- Fix: restate, with the field's case stated: "Three places of arrow type keep the generic value: an immutable top-level variable, an object's field, `var` or not, and a function's declared return type." Write "immutable field" in place of "field, `var` or not" if a `var` field does not keep it.

**23. `interpreter.md`:80**
- Passage: "a plain declaration on an object type that writes no return type beside a generic one: ... `pick(a: NN32) = "two"`"
- Kind: a claim that a worker could not check.
- Problem: The skill does not say that `NN32` is an object type (`interpreter.md`:127 names the library's objects for `ZZ32`, `ZZ64`, `NN64` and `ZZ` only), and "plain" is not defined, so a worker cannot tell which declarations walk skips.
- Confidence: medium.
- Fix: restate: "Beside a generic declaration, it does not judge by the Return Type Rule a declaration without static parameters that writes no return type and whose parameter types are object types, as `NN32` is: `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` loads (ledger row 1044). Write the return type."

**24. `interpreter.md`:81**
- Passage: "So it refuses a valid pair over a trait that comprises one object, as `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`"
- Kind: a claim that a worker could not check.
- Problem: The example does not show which type is the trait or its one object, so a worker must read the library to learn that `ZZ64` is meant (`interpreter.md`:127 pairs `ZZ64` with the object `Long`).
- Confidence: medium.
- Fix: restate: "So it refuses a valid pair over a trait that comprises one object, as `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`, where `ZZ64` comprises the one object `Long` (ledger row 550)."

**25. `interpreter.md`:82**
- Passage: "beside a plain one over an arrow type whose return type breaks the Return Type Rule, as `ident[\T\](x: T): T` beside `ident(x: Circle -> Circle): (Circle -> Circle)`"
- Kind: a sentence that reads two ways.
- Problem: "whose return type" can attach to the arrow type or to the plain declaration, and the example has the shape of `compiler.md`:134's pair, which the rule accepts, so a worker cannot tell why this one breaks the rule, or judge a third case.
- Confidence: medium.
- Fix: restate, with the reason (the writer confirms it): "It loads a generic declaration beside a plain one over an arrow type, a pair that breaks the Return Type Rule, as `ident[\T\](x: T): T` beside `ident(x: Circle -> Circle): (Circle -> Circle)`: a function of type `Any -> Circle` is also a `Circle -> Circle`, and at that instance the generic one returns `Any -> Circle`. The checker refuses the pair (ledger row 1049)."

### `references/revival-changes.md`

**26. `revival-changes.md`:13**
- Passage: "Both paths refuse a pair whose exclusion needs a static parameter that the equalities leave free"
- Kind: a sentence that reads two ways.
- Problem: "whose exclusion needs a static parameter" is loose, so a worker can still read it as any pair that mentions a free parameter, the reading that the change narrowed.
- Confidence: low.
- Fix: restate: "Both paths refuse a pair whose domains exclude only at instances that the equalities do not force, as `o[\T, U\](x: Q[\U\], b: Box[\T\])` beside the first `o`: nothing ties `U` to `T`."

**27. `revival-changes.md`:41**
- Passage: "A compiled body of `T` that returns `self` at `X` runs, also where `X` is an object type. Three shapes still fail when the class loads:"
- Kind: repair history.
- Problem: "also where `X` is an object type" and "still" tell what a fix changed, not what to do.
- Confidence: low.
- Fix: delete both: "A compiled body of `T` that returns `self` at `X` runs. Three shapes fail when the class loads:"

**28. `revival-changes.md`:44**
- Passage: "`StandardTotalOrder`'s `MIN` and `MAX` have this shape (`Library/FortressLibrary.fss:291-292`). The integer types, `QQ` and `RR64` declare their own;"
- Kind: a gotcha.
- Problem: The passage gives no action and no time, so a worker cannot tell whether the library's `MIN` and `MAX` fail now or from the switch-over, nor what its own type, or `RR32`, that extends `StandardTotalOrder` should do.
- Confidence: medium.
- Fix: restate with the time and the action, as: "From the switch-over, `StandardTotalOrder`'s `MIN` and `MAX` have this shape (`Library/FortressLibrary.fss:291-292`). So a type that extends `StandardTotalOrder` and runs compiled declares its own `MIN` and `MAX`, as the integer types, `QQ` and `RR64` do."

**29. `revival-changes.md`:45**
- Passage: "a default body that calls a method on a value of type `X`"
- Kind: a term not defined where it is used.
- Problem: "default body" is not defined; a worker can guess Java's default method, but cannot tell whether a body that `T` inherits from `U` counts.
- Confidence: low.
- Fix: define it: "a body that `T` gives a method, which calls a method on a value of type `X`, gives a `ClassCircularityError` where the object lists `T` first in its `extends` clause (row 1052)."

**30. `revival-changes.md`:47**
- Passage: "This workaround has run only in a trait with a `comprises` clause, as `r: R = self` in `trait Q comprises { R }`, so run it before you keep it."
- Kind: detail that changes no action (where a workaround has run).
- Problem: The sentence reports where the workaround has run; its example is not a self-typed trait (by :38) and binds `self` to the listed object, not to `X`; and its action, a test run, is a step that the worker takes anyway (`SKILL.md`:167).
- Confidence: medium.
- Fix: delete the sentence.

## 4. Undefined terms

- atomic expression: `compiler.md`:108.
- an `exit`'s value (`exit ... with`): `compiler.md`:116.
- place of declared type: `compiler.md`:117.
- `LabelExit` and `LabelException`: `compiler.md`:118.
- Return Type Rule, for a reader of the compiled path (named only in `interpreter.md`:63): `compiler.md`:134.
- plain declaration (one without static parameters): `compiler.md`:134; `interpreter.md`:80.
- head of its sort: `compiler.md`:135.
- the traits chapter: `compiler.md`:136.
- object type, as applied to `NN32`: `interpreter.md`:80.
- the trait that comprises one object, in the example: `interpreter.md`:81.
- default body: `revival-changes.md`:45.

## 5. Gotchas

- A worker binds the `label` block's numeral but does not end the block with the variable: `compiler.md`:116.
- A worker on walk exits from an `atomic` block and loses its writes, because a fix of walk does not load `compiler.md`: `compiler.md`:118.
- A worker pins walk's `catch` of a late `exit` in a plain test: `compiler.md`:118.
- A worker on walk trusts that something refuses a `var` field in a value object (`SKILL.md`:113): `compiler.md`:120.
- A worker that needs the generic and tuple pair in a compiled program has no action: `compiler.md`:134.
- A worker chases a test whose result changes with the suite's order, with no action: `compiler.md`:135.
- A worker follows `revival-changes.md`:32 in a generic self-typed trait and is refused, with no workaround: `compiler.md`:136.
- A worker cannot tell when the library's `MIN` and `MAX` fail compiled, or what its own type does: `revival-changes.md`:44.

## 6. Count

Flags: 30. High 1, medium 15, low 14. Lint hits: 0.
