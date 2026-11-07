# Cold read: fortress-repo, base 0549157f4

Skill: `fortress-repo`, read as a worker new to the repository. Base: `0549157f4`. Head: `6d6142f3c`. Parts judged: `references/compiler.md`, `references/interpreter.md`, `references/revival-changes.md`, `references/tests-writing.md`. Line numbers are the head's.

## 1. The lint

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/tests-writing.md

Output, whole: nothing. The lint printed no line and exited 0. Lint hits: 0.

## 2. What I would do differently, section by section

### compiler.md, "What the compiled path cannot compile yet" (lines 50-54, type assumptions)

In compiled code I would write `e asif T` only at a dotted call's receiver, at every dispatched argument of a call, or as a value. I would not put an assumption at some dispatched arguments and not at others. I would not assume the receiver of a generic method, or assume at a call of an overloaded generic function. If a test needs one of these, I would write an `XXX` compile test that names the message. Limits: I cannot tell which arguments are "dispatched", since `SKILL.md` says dispatch is on every argument. I cannot tell what `asif` does without the specification.

### compiler.md, "What the code generator does" (line 68, the `value` modifier)

I would not remove `ValueObjectMark` from a value object's class, because the compiled `SEQV` depends on it. Limits: I cannot tell where the compiled `SEQV` is, or whether a compiled test can reach it before the switch-over.

### compiler.md, "The checker's time" (line 180)

I would expect the count stage to take 80 to 180 seconds and take a time in that range as normal. I would run it in the background. The next sentence now says the run is longer than the Bash tool's limit, which is false at 80 s (flag C7).

### interpreter.md, "How walk evaluates a program" (line 18)

Under walk, for a value object with `RR64` fields and no `=`, built from a float numeral, I would expect `=` against one built from a computed `RR64` to answer `false`. I would give the type its own `=` or compare the fields. Limits: I cannot tell whether to assert that `false` as correct or as a defect. I cannot tell whether a plain `x = 0.5` is affected.

### interpreter.md, "Natives" (line 98)

I could bind a helper over the library's `JavaBufferedWriter` with a Java parameter of type `FortressBufferedWriter`. Limits: I do not know that class's package, or whether the compiled path and the count stage accept such a helper.

### revival-changes.md, "Dispatch and overloading" (line 24, the Meet Rule paragraph)

A trait of my program that declares its own functional `+`, `-`, `MIN` or `MAX` gets `excludes { Number }`, or an exclusion of arrays. Otherwise walk refuses it at load with "fails the Meet Rule". I would not take the checker's acceptance as proof. Limits: I do not know the meaning of "open", or which array trait to list.

### revival-changes.md, "Traits and objects" (line 48, the `Index` bound)

I would write `I extends Index` only in code that runs under walk or that the checker checks against the interpreter's library, not in a compiled program before the switch-over.

### revival-changes.md, "Traits and objects" (lines 55-61, `SEQV`)

Where a type declares no `=`, I would expect `=` to answer `SEQV`. I would assert `false` as correct for a value object without `=` that holds a string, against one built apart, and for a tuple of four or more such elements. To compare by content I would give the value object an `=` or compare the parts. Under walk I would write `assert(x = y, msg)` unless the type extends `Equality`. I would not assert the compiled `===`'s answers. Limits: the list does not say how `SEQV` compares integers, characters or booleans. I cannot tell whether two equal string literals are "built apart". I cannot tell what `===` is.

### revival-changes.md, "Numbers" (line 88, how walk prints a numeral's class)

I would not trust a static argument that walk prints: `Cell(3)` prints `Cell[\ZZ32\]` and is a `Cell[\Int\]`. Limit: the section gives no action for such a value.

### revival-changes.md, "Numbers" (line 92, `Number` declares nothing)

I would not call `asFloat`, or any number operator, on a value of a type parameter bounded by `Number`. I would expect `=` between numbers of two types to answer `false`, without an error, where no coercion applies. I would write `asFloat(x) = y` at known types, and one declaration for each number type in generic code. Limit: I cannot tell when a coercion applies to `=`, since the library's `=` over `Any` always fits.

### tests-writing.md, "A test program" (line 32)

Under walk, I would make a type with its own `=` extend `Equality[\P\]`, or write `assert(x = y, msg)`, because otherwise `assert(x, y, msg)` and `=/=` use `SEQV`. Limit: the ledger row now ends the sentence on `SEQV`, so I cannot tell whether the `SEQV` answer is the defect.

### The second question

Repair history or detail that changes no action: "still" in revival-changes.md:88 (flag R14), and the sentence of revival-changes.md:61 that states again a fact of tests-writing.md:32 (flag R10). The FACTS entry F-326 in interpreter.md:18 gives the source, not the status, of a behaviour (flag I1). The rest of the changed text changes an action.

## 3. The flags

### references/compiler.md

**C1.** Line 50. "at a call whose every dispatched argument is an assumption".
- Kind: a term not defined where it is used ("dispatched argument").
- Problem: `SKILL.md` says dispatch is on every argument, so a worker cannot tell which arguments count, and so which calls the code generator refuses.
- Confidence: medium.
- Fix: define the term in one clause where it is first used: which arguments of a call the dispatch method tests.

**C2.** Line 50. "It compiles a type assumption `e asif T`".
- Kind: a term not defined where it is used.
- Problem: a worker who knows Java and Scala does not know what `asif` does, and must search the specification before it writes or reads such a test.
- Confidence: medium.
- Fix: define the term. Proposed sentence, for the writer to confirm: "A type assumption `e asif T` has the value of `e`, and dispatch treats it as a `T`, a supertype of `e`'s type."

**C3.** Line 50. "and as a value".
- Kind: a sentence that reads two ways.
- Problem: a worker cannot tell whether an assumption passed to a call that does not dispatch, or bound to a variable, is "a value".
- Confidence: low.
- Fix: restate with the forms named, for example: "and anywhere else that its value is used, as in `y = e asif T`."

**C4.** Line 54. "an overloaded generic function under an assumption".
- Kind: a sentence that reads two ways.
- Problem: "under an assumption" can mean an assumption at an argument, or an assumption around the whole call.
- Confidence: low.
- Fix: restate: "a call of an overloaded generic function with an assumption at an argument: ..."

**C5.** Line 68. "The fields stay as they are."
- Kind: a sentence that reads two ways.
- Problem: it can mean that the layout of the fields does not change, or that the fields keep their mutability; the old text ("no effect on the representation") said the first.
- Confidence: low.
- Fix: restate: "The class is otherwise laid out as for any other object: the modifier does not inline or unbox its fields."

**C6.** Line 68. "The compiled `SEQV` reads the mark."
- Kind: a claim that a worker could not check.
- Problem: the part does not say where the compiled `SEQV` is, and `revival-changes.md`:61 says that the compiler's library declares no `=` over `Any`, so a worker cannot tell whether a compiled test can reach it before the switch-over.
- Confidence: low.
- Fix: name the class that holds the compiled `SEQV`, and say in one sentence whether a compiled program can call it before the switch-over.

**C7.** Line 180. "about 80 to 180 seconds, more under load. That is longer than the Bash tool's default time limit".
- Kind: a gotcha; the change makes the next sentence wrong.
- Problem: `session.md`:17 gives the limit as 120 s, so the sentence is false at 80 s, and a worker who reads the low end can run the stage in the foreground and lose a 180 s run.
- Confidence: high.
- Fix: restate: "It can run past the Bash tool's 120-second limit, so run it in the background (`session.md`)."

### references/interpreter.md

**I1.** Line 18. "so `SEQV` finds it unequal to a computed `RR64` of the same bits (F-326)".
- Kind: a claim that a worker could not check; a gotcha.
- Problem: `revival-changes.md`:58 says that `SEQV` compares a float by its bits on both paths, so this `false` departs from the rule, but the passage cites a FACTS entry, not a ledger row, and a worker who carries over `revival-changes.md`:61 ("assert them as correct") asserts the `false` in a test.
- Confidence: high.
- Fix: restate the status: "This departs from `SEQV`'s rule (`revival-changes.md`, "Traits and objects"): do not assert the `false` as correct in a test." Cite the ledger row in place of F-326 if a row holds the defect.

**I2.** Line 18. "Walk keeps a float numeral bound to `RR64` as a `FloatLiteral`".
- Kind: a sentence that reads two ways.
- Problem: "bound to `RR64`" can mean a numeral in a binding `x: RR64 = 0.5` only, or also one passed to an `RR64` parameter, as the example `V(0.5)` does; and the passage does not say whether `x = 0.5`, where `RR64`'s own `=` runs, is affected.
- Confidence: medium.
- Fix: restate: "Walk keeps a float numeral as a `FloatLiteral`, also where it binds to an `RR64` variable, parameter or field." Add one sentence that gives the answer of `x = 0.5` for a computed `x` of the same bits.

**I3.** Line 18. "and so is a tuple of four or more elements that holds such a numeral".
- Kind: a sentence that reads two ways.
- Problem: the comparison is elliptical, and the reason for "four" (the library declares `=` on pairs and triples only) is in another part.
- Confidence: low.
- Fix: restate: "and so is `(0.5, 1, 2, 3) = (x, 1, 2, 3)`, since the library declares `=` on pairs and triples only."

**I4.** Line 18. "Give the value object its own `=`, or compare the parts."
- Kind: a gotcha that the passage leaves out.
- Problem: under walk, `assert(a, b, msg)` and `=/=` skip a type's own `=` unless the type extends `Equality` (`tests-writing.md`:32), so a test that follows this sentence and uses the two-value `assert` still gets `false`.
- Confidence: medium.
- Fix: restate: "Give the value object its own `=` and make it extend `Equality[\V\]`, or compare the parts."

**I5.** Line 98. "`JavaBufferedWriter`, the library's writer trait, in `FortressBufferedWriter`".
- Kind: a term not defined where it is used.
- Problem: a worker who writes a helper over the writer must search for the Java class's package to import it.
- Confidence: low.
- Fix: give the class's full Java name.

**I6.** Line 98, read with line 102. "a type of the list above, except `JavaString` and `()`, in the same Java type".
- Kind: a claim that a worker could not check; the change makes text outside it say more.
- Problem: the change adds `JavaBufferedWriter` to the first list, so line 102 now says that walk carries a `JavaBufferedWriter` `self` in `FortressBufferedWriter`, and a worker cannot tell whether that holds.
- Confidence: low.
- Fix: if walk does not carry such a `self`, add `JavaBufferedWriter` to line 102's exceptions.

**I7.** Line 98. The new type, read with `compiler.md`:82 and :102.
- Kind: a gotcha that the passage leaves out.
- Problem: `compiler.md`:82 lists the Java types that the compiled path reads, without `FortressBufferedWriter`, and `compiler.md`:102 says that a type with no Fortress counterpart fails the whole import, so a worker who binds a helper over `JavaBufferedWriter` cannot tell whether the compiled path and the count stage accept it; `SKILL.md`:79 asks for a binding that the compiled path runs.
- Confidence: medium.
- Fix: say, in this line or at `compiler.md`:82, whether the compiled path reads `FortressBufferedWriter`, and what a worker does if it does not.

### references/revival-changes.md

**R1.** Line 24. "because `Number` is open (P-160)".
- Kind: a term not defined where it is used ("open").
- Problem: the meaning (no `comprises` clause, so a type can extend both) comes only at line 92, so a worker cannot see why the trait overlaps the library's `+`.
- Confidence: medium.
- Fix: restate: "because `Number` has no `comprises` clause, so a program's type can extend both the trait and `Number` (P-160)."

**R2.** Line 24. "or make it exclude arrays".
- Kind: a gotcha; the worker must search.
- Problem: a worker must look up which array trait of the library to list in `excludes`.
- Confidence: medium.
- Fix: restate with the trait named: "or list the library's array trait, `<name>`, in its `excludes` clause."

**R3.** Line 24. "The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918)."
- Kind: a sentence that reads two ways.
- Problem: "such a pair in one component" can mean the trait's `+` beside an array-number `+` of the program, or the trait and its use in one component.
- Confidence: low.
- Fix: restate: "The checker refuses the trait's `+` beside an array-number `+` of the same component, but accepts it beside the library's (row 918)."

**R4.** Line 48. "So write the bound now only in code that runs under walk or is checked against the interpreter's library."
- Kind: a sentence that breaks the part's register.
- Problem: "now" is a time word where the part's convention is "Until the switch-over" (line 7), and the sentence repeats what the sentence before it implies.
- Confidence: low.
- Fix: merge the two sentences: "Until the switch-over, the compiler's prelude declares no `Index`, so write the bound only in code that runs under walk or that the checker checks against the interpreter's library."

**R5.** Line 56. "`SEQV` follows the specification on both paths:"
- Kind: a gotcha; a claim that another part contradicts.
- Problem: `interpreter.md`:18 says that walk's `SEQV` finds a float numeral unequal to a computed `RR64` of the same bits, so a worker who reads only this part expects `V(0.5) = V(x)` to be `true` under walk.
- Confidence: high.
- Fix: add the departure after the list: "Under walk, a float numeral bound to `RR64` is a `FloatLiteral`, which `SEQV` finds unequal to a computed `RR64` of the same bits (`interpreter.md`)", with its ledger row if a row holds it.

**R6.** Lines 57-59. The list of how `SEQV` compares.
- Kind: a gotcha that the passage leaves out.
- Problem: the list says nothing of integers, characters or booleans, so a worker cannot tell whether `V(3) = V(3)`, for a value object without `=` over a `ZZ32` field, is `true`.
- Confidence: medium.
- Fix: add one item that says how `SEQV` compares two integers, characters or booleans of one type.

**R7.** Line 59. "a reference object, a string among them".
- Kind: a term not defined where it is used.
- Problem: the skill defines a `value` object but not a reference object; a worker infers the complement.
- Confidence: low.
- Fix: define it in the item: "an object not declared `value`, a string among them, is equivalent only to itself."

**R8.** Line 61. "is not `=` to an equal one built apart".
- Kind: a sentence that reads two ways.
- Problem: a worker cannot tell whether two occurrences of one string literal, as `V("ab")` and `V("ab")`, are "built apart", so it cannot tell which answer to assert.
- Confidence: medium.
- Fix: restate with an example: "So `V(s) = V(t)` is `false` for two strings `s` and `t` of equal text that two computations made", and add what two equal literals give.

**R9.** Line 61. "a tuple of four or more elements that holds such a string".
- Kind: a sentence that reads two ways.
- Problem: "such a string" can mean a string held by a value object, or any string built apart.
- Confidence: low.
- Fix: restate: "so `(s, 1, 2, 3) = (t, 1, 2, 3)` is `false` for such strings `s` and `t`."

**R10.** Line 61. "Under walk, `=/=` and `assert(x, y, msg)` reach a type's own `=` only if the type extends a library trait that declares `=`, such as `Equality` (row 807). Otherwise write `assert(x = y, msg)`."
- Kind: detail that the second question finds (a fact stated twice).
- Problem: `tests-writing.md`:32, changed in the same batch, states the same fact, so the two can drift apart.
- Confidence: low.
- Fix: delete the two sentences here; `tests-writing.md`:32 keeps the fact where tests are written.

**R11.** Line 61. "Its own operator `===` compares strings and ..."
- Kind: a term not defined where it is used.
- Problem: a worker cannot tell what `===` is for, or that it stands in for `SEQV` in the compiler's library, so it cannot tell which test the row's departure touches.
- Confidence: medium.
- Fix: define it: "Its own operator `===`, which stands for `<what>` until the switch-over, compares ..."

**R12.** Line 88. "Walk prints these classes by the traits' names".
- Kind: a sentence that reads two ways.
- Problem: the part has not called `ZZ32`, `ZZ64` and `ZZ` traits, so "the traits" has no clear antecedent.
- Confidence: low.
- Fix: restate: "Walk prints these classes as `ZZ32`, `ZZ64` and `ZZ`, also inside static arguments, so ..."

**R13.** Line 88. "`Cell(3)` prints `Cell[\ZZ32\]`".
- Kind: a sentence that reads two ways.
- Problem: "prints" can mean `println(Cell(3))` or a type in a message, and `Cell` is not declared.
- Confidence: low.
- Fix: restate: "For `object Cell[\T\](x: T)`, `println(Cell(3))` shows `Cell[\ZZ32\]`, but the value is a `Cell[\Int\]`, and no `Cell[\ZZ32\]`."

**R14.** Line 88. "Walk's own error messages still say `Int`."
- Kind: repair history ("still").
- Problem: "still" tells of a change, not of what the worker sees.
- Confidence: low.
- Fix: restate: "Walk's own error messages say `Int`."

**R15.** Line 88. The new `Cell` sentence.
- Kind: a gotcha that the passage leaves out.
- Problem: the passage says that `Cell(3)` is no `Cell[\ZZ32\]` but gives no action, and the paragraph's last sentence, "Write the static argument", reads as about `array1` and `array2` only.
- Confidence: low.
- Fix: add: "Where a `Cell[\ZZ32\]` is wanted, write `Cell[\ZZ32\](3)`."

**R16.** Line 92. "Two numbers of different types compare by `=` only where a coercion carries one into the other."
- Kind: a sentence that reads two ways.
- Problem: `SKILL.md`:133 says that a conversion never changes which declaration runs when one already fits, and the library's `=` over `Any` always fits, so a worker cannot tell whether a `ZZ32` and a `ZZ64` of equal value are `=`.
- Confidence: medium.
- Fix: add one example where a coercion applies, with its answer, as "So a `ZZ32` 3 and a `ZZ64` 3 are `=`" if that holds.

**R17.** Line 92. "In generic code, declare the function at each number type instead."
- Kind: a sentence that reads two ways.
- Problem: "the function" can mean `asFloat` or the worker's own generic function.
- Confidence: low.
- Fix: restate: "In generic code over `T extends Number`, replace the generic function by one declaration at each number type."

**R18.** Line 92. "A program may declare its own number type below `Number`, which has no `comprises` clause (P-160)."
- Kind: a sentence that reads two ways.
- Problem: the relative clause can attach to `Number` or to the program's type.
- Confidence: low.
- Fix: restate: "`Number` has no `comprises` clause, so a program may declare its own number type below it (P-160)."

### references/tests-writing.md

**T1.** Line 32. "Otherwise they compare by `SEQV`: a value object field by field, any other object by identity (ledger row 807)."
- Kind: a sentence that reads two ways.
- Problem: by `revival-changes.md`:7 a sentence that cites a ledger row states a departure not to assert, and the row now ends the sentence on `SEQV`, so a worker can read the `SEQV` answer as the defect and write an `XXX` test that asserts `true`, against `revival-changes.md`:61 ("assert them as correct").
- Confidence: medium.
- Fix: restate: "It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (ledger row 807). Otherwise they compare by `SEQV` (`revival-changes.md`, "Traits and objects")."

**T2.** Line 32. "a value object field by field, any other object by identity".
- Kind: a claim that differs from another part.
- Problem: it is a shorter second statement of `revival-changes.md`:56-59 that leaves out tuples, floats by bits and values of different types, so a worker with a tuple or a float can read "any other object by identity".
- Confidence: low.
- Fix: the restatement of T1, which points to the one statement.

## 4. Undefined terms

- dispatched argument: `compiler.md`:50.
- type assumption, `asif`: `compiler.md`:50.
- `FortressBufferedWriter`: `interpreter.md`:98.
- open, of `Number`: `revival-changes.md`:24.
- reference object: `revival-changes.md`:59.
- built apart: `revival-changes.md`:61.
- `===`: `revival-changes.md`:61.

## 5. Gotchas

- `compiler.md`:180: a worker who reads "80 seconds" runs the count stage in the foreground, and the Bash tool stops a 180 s run at 120 s.
- `interpreter.md`:18: a worker asserts `V(0.5) = V(x)` `false` as correct, as `revival-changes.md`:61 says for strings, though it departs from `SEQV`'s rule.
- `interpreter.md`:18: a worker gives `V` its own `=` and asserts with `assert(a, b, msg)`; walk skips that `=` without `Equality`, and the test still fails.
- `interpreter.md`:98: a worker binds a helper over `JavaBufferedWriter`, and the compiled path or the count stage can fail the whole import (`compiler.md`:82, :102).
- `revival-changes.md`:24: a worker must search for the array trait to list in `excludes`.
- `revival-changes.md`:56: a worker takes "a float by its bits", "on both paths", and expects `V(0.5) = V(x)` to be `true` under walk.
- `revival-changes.md`:57-59: a worker cannot predict `V(3) = V(3)` for a value object over a `ZZ32` field.
- `revival-changes.md`:61: a worker writes `V("ab") = V("ab")` and cannot tell whether to assert `false`.
- `revival-changes.md`:88: a worker sees `Cell[\ZZ32\]` printed, a dispatch on `Cell[\ZZ32\]` fails, and the part gives no fix.
- `revival-changes.md`:92: a worker compares a `ZZ32` with a `ZZ64` by `=` in a test and cannot predict the answer.
- `tests-writing.md`:32: a worker reads the `SEQV` fallback as the departure of row 807 and writes an `XXX` test that asserts `true`.

## 6. Count

Flags: 3 high, 12 medium, 19 low; 34 in all. Lint hits: 0.
