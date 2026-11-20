# Cold read: fortress-repo, compiler.md and revival-changes.md

Base b802d2e6f. Head 8439760919. The parts judged: `.claude/skills/fortress-repo/references/compiler.md` and `.claude/skills/fortress-repo/references/revival-changes.md`. The diff also changes `references/sources.md`. The task does not name it, and the skill says to use it only to maintain the skill, so I did not judge it.

## 1. The lint

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/revival-changes.md

Output: nothing. Exit status 0. No hits.

## 2. What I would do differently, section by section

### compiler.md, "What the compiled path cannot compile yet", the paragraph on type assumptions (lines 53-61)

I would write `f(a asif T, b)` for an overloaded function `f` of my own component. I would expect the compiled call to dispatch on `b`'s run-time type, as walk does. I would not write a partial assumption at a functional method, at a dotted call of an overloaded method on an assumed receiver, at a dotted call with an assumed argument, at a call whose dispatch holds a functional method, where a generic declaration lies at or below the chosen one, or at an overloaded function of another component. In an `XXX` test of one of these, I would pin the quoted message.

Limits that I could not state: whether a dotted call's receiver counts as one of its arguments; what a dotted call with every argument assumed compiles to; which calls "dispatch would hold a functional method" covers; and whether line 60 or line 63 gives the message for a partial call of an overloaded function with a generic declaration.

### compiler.md, "The checker's gaps", the bullet on the Return Type Rule (line 160)

I would expect the checker to check a getter's return type as it checks a method's. I would not trust the checker to refuse a pair that breaks the rule in an object expression. For an object below a self-typed trait, I would go to `revival-changes.md`.

Limit: I could not tell what "a pair of getters" is. I could not tell whether the self-typed departure of row 1094 reaches getters. `revival-changes.md` line 43 says that it does not.

### compiler.md, "The checker's gaps", the new bullet on a bound that is a type variable (line 161)

Where the checker refuses `x.n()` with 'No such method F.n.', and `F`'s bound is another type parameter, I would bound `F` by the trait that declares `n`.

Limit: I could not tell whether to replace `F extends H` or to add a second bound.

### revival-changes.md, "Traits and objects", the paragraph on the overloading rules in a self-typed trait (line 43)

Where an object redeclares an abstract dotted method of a self-typed trait at the same parameter types, I would declare it at the trait's return type, not at a narrower one. For a method without parameters, I would instead make both declarations getters and keep the narrower type.

Limits: I could not tell whether row 1094 is part of the rule or a departure from it, so I could not tell whether its test is an `XXX` test or a plain one. The paragraph does not say that the getter route changes every call of the method.

### The second question

No changed section holds repair history. Each ledger row and P-N follows the convention of the parts. The clause of line 160 on object expressions gives a fact without its action (flag C8).

## 3. The flags

### compiler.md

**C1. compiler.md:53**
- Passage: "at a call of an overloaded function of its component, and elsewhere as the value of `e`. Where only some of that call's arguments are assumptions, it dispatches on the others' run-time types, as walk does."
- Kind: a sentence that reads two ways.
- Problem: a worker cannot tell whether "of its component" covers a name that the component overloads beside an imported declaration, as a program's own `+` beside the library's, so it cannot tell whether line 53 or line 61 applies.
- Confidence: medium.
- Fix: restate, with the case that the writer means, for example: "The code generator compiles one at a dotted call's receiver, at a call of a functional method whose every argument is an assumption, at a call of an overloaded function whose every declaration is in the call's own component, and elsewhere as the value of `e`. At such a call of an overloaded function, it dispatches on the run-time types of the arguments that are not assumptions, as walk does."

**C2. compiler.md:55-58**
- Passage: "a call with an assumption at some of its arguments but not all, in these forms: ... a dotted call of an overloaded method on an assumed receiver; a dotted call with an assumption at an argument;"
- Kind: a sentence that reads two ways; a gotcha that the passage leaves out.
- Problem: a worker cannot tell whether the receiver counts among "its arguments". So for `(r asif T).m(a asif U)`, with every argument assumed, it cannot tell whether the call compiles with the assumptions, or compiles the argument as a plain value by "elsewhere as the value of `e`" (line 53) and runs another declaration than walk.
- Confidence: medium.
- Fix: restate the bullet: "a call with an assumption at some of its arguments but not all, the receiver of a dotted call counted as an argument: '...'". Add to line 53 what a dotted call with every argument assumed compiles to.

**C3. compiler.md:59**
- Passage: "a call whose dispatch would hold a functional method;"
- Kind: a term not defined where it is used.
- Problem: "dispatch would hold" is not defined. A worker cannot tell which calls it covers (a function whose name a functional method also declares? a call that `OverloadSet`'s dispatch method would route to one?) without reading the code generator.
- Confidence: high.
- Fix: define it by the form that a program writes, for example, if that is the meaning: "a call of a function whose name a functional method in scope also declares;".

**C4. compiler.md:60**
- Passage: "such a call where a declaration at or below the resolved one is generic"
- Kind: a term not defined where it is used; a sentence that reads two ways.
- Problem: "such a call" can be read as each form of line 55, which line 55 already refuses, or as the partial call of line 53, which compiles. "The resolved one" and "at or below" are not defined, so a worker cannot tell which declarations count.
- Confidence: medium.
- Fix: restate: "a call of an overloaded function of its component with an assumption at some of its arguments but not all, where the declaration that the checker chooses at the assumed types, or one more specific than it, is generic: '...';".

**C5. compiler.md:60, with line 63**
- Passages: line 60, "'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet'"; line 63, "a call of an overloaded generic function with an assumption at an argument: 'Can't compile a type assumption at a call of an overloaded generic function yet';".
- Kind: a sentence that reads two ways. The change makes line 63 overlap line 60.
- Problem: for a partial call of an overloaded function that has a generic declaration, both bullets fit. A worker who writes an `XXX` test that names the wall cannot tell which message the test pins. Where the generic declaration lies above the chosen one, it cannot tell whether the call compiles.
- Confidence: medium.
- Fix: restate line 63 to name only the case that line 60 leaves, for example, if that is the case: "a call of an overloaded generic function with an assumption at every argument: '...';".

**C6. compiler.md:55**
- Passage: "a call with an assumption at some of its arguments but not all, in these forms: 'Can't compile a dispatched call whose arguments are not all type assumptions':"
- Kind: a sentence that breaks the part's register.
- Problem: one bullet carries a condition, a quoted message and a nested list behind two colons. A worker who reads the sub-list can lose which message applies to it.
- Confidence: low.
- Fix: restate as a sentence before the refusals: "A call with an assumption at some of its arguments but not all stops with 'Can't compile a dispatched call whose arguments are not all type assumptions' in these forms:", then the four forms as a list of their own, then "It also refuses these forms (ledger row 818):" and the other bullets.

**C7. compiler.md:160**
- Passage: "The checker applies the rule to a pair of getters as to a pair of methods"
- Kind: a term not defined where it is used; a sentence that reads two ways.
- Problem: `SKILL.md` states the Return Type Rule for overloads, and a getter has no parameters, so a worker cannot tell which pair is meant: a getter and its redeclaration in a type below? "As to a pair of methods" can also be read to bring in the self-typed departure of row 1094, which `revival-changes.md` line 43 says getters escape.
- Confidence: medium.
- Fix: restate, with the pair that the writer means, for example: "The checker applies the rule to a getter and a getter of the same name in a type below, as to two methods, but without the departure of row 1094 (`revival-changes.md`, "Traits and objects")."

**C8. compiler.md:160**
- Passage: "but not to the getters and dotted methods of an object expression (ledger row 1097)"
- Kind: a gotcha that the passage leaves out.
- Problem: the clause states the gap but no action. A worker who sees `typecheck` or the count stage accept such a pair takes the pair as valid.
- Confidence: low.
- Fix: restate as its own sentences: "In an object expression, the checker does not apply the rule to the getters and dotted methods, so it accepts a pair there that breaks the rule (ledger row 1097). Do not take that acceptance as proof that the pair is valid."

**C9. compiler.md:160**
- Passage: "For an object's dotted method below a self-typed trait, see `revival-changes.md`, "Traits and objects" (ledger row 1094)."
- Kind: a sentence that breaks the part's register.
- Problem: the part elsewhere gives the effect and then the pointer. This sentence gives only the pointer, so a worker who meets a refusal of the checker cannot tell from it whether the refusal is this case.
- Confidence: low.
- Fix: restate: "It also refuses a narrower return type where an object redeclares an abstract dotted method of a self-typed trait at the same parameter types (`revival-changes.md`, "Traits and objects"; ledger row 1094)."

**C10. compiler.md:161**
- Passage: "the checker refuses `x.n()` with `x: F` in `chained[\H extends Gen, F extends H\]`, 'No such method F.n.'. Walk runs the call (ledger row 1093). Bound `F` by the trait."
- Kind: a term not defined where it is used.
- Problem: `Gen` and `n` are not introduced, and "the trait" has no antecedent. The worker must guess that `Gen` is a trait that declares `n`.
- Confidence: high.
- Fix: restate: "the checker refuses `x.n()` with `x: F` in `chained[\H extends Gen, F extends H\]`, where the trait `Gen` declares `n()`: 'No such method F.n.'"

**C11. compiler.md:161**
- Passage: "Bound `F` by the trait."
- Kind: a sentence that reads two ways; a gotcha that the passage leaves out.
- Problem: a worker cannot tell whether to replace `F extends H` by `F extends Gen` or to add `Gen` as a second bound, `F extends {H, Gen}`. The first drops `F`'s tie to `H`, so a call that passes an `F` where an `H` is expected is then refused.
- Confidence: medium.
- Fix: restate with the form that passes, for example: "Write `F extends Gen` in place of `F extends H`, where nothing needs `F` below `H`." Or give the form with two bounds, if that is the one that passes.

### revival-changes.md

**R1. revival-changes.md:43**
- Passage: "`self` has the type `T[\X\]`, except in two checks. ... In a departure, the checker also reads that type where an object redeclares an abstract dotted method of `T` at the same parameter types (row 1094)."
- Kind: a sentence that reads two ways.
- Problem: the first sentence counts row 1094 among the rule's exceptions, and the third calls it a departure. By line 7, a departure gets an `XXX` test of the rule's answer and an undecided case a plain test, so the worker cannot tell which test to write, or what the rule answers.
- Confidence: medium.
- Fix: restate the first sentences: "When the checker applies the overloading rules to a method of `T`, `self` has the type `T[\X\]`, except in its test of whether two domains exclude each other. There `self` has the intersection type of `T[\X\]` and `X` (P-157). In a departure, the checker also reads the intersection where an object redeclares an abstract dotted method of `T` at the same parameter types (row 1094)." If the rule's answer is that the narrower return type is valid, say so.

**R2. revival-changes.md:43**
- Passage: "That type is the object's own, so each return type must be a subtype of the other."
- Kind: a sentence that reads two ways.
- Problem: "that type" can be read as `T[\X\]` or as the intersection. The step from "the object's own type" to "each return type a subtype of the other" is left for the worker to rebuild, and a worker can miss that the effect is that the two return types must be the same.
- Confidence: medium.
- Fix: restate: "There the intersection is the object's own type, so the two declarations have one domain, and the checker accepts them only with the same return type."

**R3. revival-changes.md:43**
- Passage: "Declare the object's method at `T`'s return type."
- Kind: a sentence that reads two ways.
- Problem: where `T`'s return type names `X`, which is not in scope in the object, a worker cannot tell what to write.
- Confidence: low.
- Fix: restate: "Declare the object's method at the return type that `T` declares, with the object's type in place of `X`."

**R4. revival-changes.md:43**
- Passage: "For a method without parameters, you can declare both methods as getters instead: the pair then compiles with the narrower type."
- Kind: a gotcha that the passage leaves out.
- Problem: a getter is read as `x.m`, not `x.m()`, so a worker who follows this breaks every call of the method. Where `T` is a trait of the library, the change is a change of the library.
- Confidence: medium.
- Fix: restate: "For a method without parameters, you can declare both methods as getters instead, and read it as `x.m` at every call: the pair then compiles with the narrower type."

## 4. The undefined terms

- "dispatch would hold a functional method": compiler.md:59.
- "the resolved one": compiler.md:60.
- "at or below" a declaration, for "more specific than": compiler.md:60.
- "a pair of getters", under the Return Type Rule: compiler.md:160.
- `Gen`, `n` and "the trait": compiler.md:161.

## 5. The gotchas

- compiler.md:53 and 57-58: a dotted call with every argument assumed may compile its arguments as plain values, so a test can run another declaration than walk.
- compiler.md:60 and 63: for a partial call of an overloaded function with a generic declaration, an `XXX` test can pin the wrong message.
- compiler.md:160: a worker takes the checker's acceptance of a pair that breaks the rule in an object expression as proof that the pair is valid.
- compiler.md:161: replacing `F extends H` by `F extends Gen` drops `F`'s tie to `H`, and a call that needs the tie is then refused.
- revival-changes.md:43: making the trait's method a getter breaks every `x.m()` call, and where `T` is the library's, it changes the library.
- revival-changes.md:43: the worker cannot tell whether the test of row 1094 is an `XXX` test or a plain one.

## 6. The count

Flags: 15. High: 2 (C3, C10). Medium: 9 (C1, C2, C4, C5, C7, C11, R1, R2, R4). Low: 4 (C6, C8, C9, R3). Lint hits: 0.
