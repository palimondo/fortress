# Cold read: fortress-repo, climb batch 33b

Skill: `fortress-repo`, read as a worker new to the repository. Base: cb05cc7c6. Head read: f4d63205c7. Parts judged: `.claude/skills/fortress-repo/SKILL.md`, `references/compiler.md`, `references/revival-changes.md`. The diff also touches `references/sources.md`. The task does not name it, so it is not judged.

## 1. Lint output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/revival-changes.md

Output: nothing. Exit status 0. No hits.

## 2. What a worker would do differently, section by section

**SKILL.md, "The compiled runtime" (line 94).** A worker learns that a compiled `RR64` value is an instance of a class that extends the Java class `FRR64`, and that `FRR64` holds the `double`. It would read `FRR64` in a stack trace as the number's superclass. Limit left open: which library this holds for (flag 1). No repair history.

**compiler.md, "What the two paths share" (line 21).** The same fact from the other side: the classes of the prelude's number objects extend `FZZ32`, `FRR64` and the like. Here it is limited to the prelude. No repair history.

**compiler.md, "The compiler's prelude, until the switch-over" (line 34).** The second exception now says that the prelude declares each number type as one `value object`. A worker cannot tell what edit this exception still allows (flag 2). "The form that both libraries are to take" states a plan's status, and revival-changes.md line 89 says the plan is done.

**compiler.md, "What the compiled path cannot compile yet" (lines 43, 45, 58, 60).** A worker would not name a number type as a value in a compiled program. It would not write a varargs parameter against the prelude. With the one library, it would give a varargs method or generic varargs function its own name. It would not call, at an assumption of a generic trait, a method whose parameter has the trait's type parameter. It would expect a call at an assumption of a trait to run the trait's body, not the object's override. Limits left unclear: what the varargs stop prints and how parameters are counted, which call form row 1088 refuses, and what walk does at an assumption (flags 3 to 7).

**compiler.md, "Traps of the compiled path" (lines 126, 139 to 143).** A worker would avoid a `typecase` arm at a type that the selector's type excludes. It would compare strings without `asif String`. It would bind a tuple to an `Any` variable before passing it to an `Any` parameter. It would declare a function argument at the parameter's own arrow type. It would pass varargs elements one by one, not as `ys...`. It would write no matrix return type in a compiled program. Limits left unclear: the remedy for the unreachable arm, why strings compare correctly without an assumption, which call dies in the arrow case, and how the compiled half of row 1085 can be seen (flags 8 to 11). Line 143 repeats line 64's limit (no array types), but its crash message helps a worker recognise the crash, so it is not flagged.

**revival-changes.md, introduction (line 7).** A worker now knows which test to write for a sentence that cites a ledger row: an `XXX` test of the rules' answer where the rules decide, and a plain test of today's behaviour, citing the row, where they do not. The old explicit ban on a plain test of a departure is gone (flag 12). No repair history.

**revival-changes.md, "Numbers" (lines 89, 103, 112).** A worker learns that both libraries declare the seven number types as value objects. Both paths refuse `object Mine extends ZZ32`, and each path's message is given. Walk does not convert a function argument by an arrow coercion. `h = 0.5` for a `QQ` holds under walk only. The term "arrow coercion" is not defined (flag 13). No repair history: the removed rows 1003 and 866 leave no trace.

## 3. Flags

### SKILL.md

**Flag 1. SKILL.md:94.**
- Passage: "A number is a boxed object, also inside a specialised class: an `RR64`'s class extends `FRR64`, which holds the `double`."
- Kind: a claim that a worker could not check; a sentence that reads two ways.
- Problem: compiler.md line 21 limits the same fact to the prelude's number objects, so a worker on the one library (`FORTRESS_LIBRARY=one`) cannot tell whether its `RR64` class extends `FRR64` too.
- Confidence: low.
- Fix: restate both places at one scope. If it holds for the prelude only: "Against the compiler's prelude, the class of an `RR64` value extends `FRR64`, which holds the `double`." If it holds for both libraries, drop "the prelude's" from compiler.md line 21.

### compiler.md

**Flag 2. compiler.md:34.**
- Passage: "Two exceptions (P-37): its numeral types and coercions follow `revival-changes.md`, "Numbers", and it declares each built-in number type as one `value object`, the form that both libraries are to take."
- Kind: a sentence that reads two ways; a term not defined where it is used; a decision's status.
- Problem: as an exception to "Do not add a declaration", the second clause now states a fact, so a worker cannot tell whether it may still edit the prelude's number declarations. "Are to take" says the interpreter's library has not taken the form yet, against revival-changes.md line 89. "Each built-in number type" includes `QQ`, which the prelude does not declare and the interpreter's library keeps as a trait.
- Confidence: medium.
- Fix: restate, and delete the status clause: "Two exceptions (P-37): you may edit its numeral types and coercions, to follow `revival-changes.md`, "Numbers", and its declarations of the seven number types, each one `value object`, as in the interpreter's library."

**Flag 3. compiler.md:45.**
- Passage: "With `FORTRESS_LIBRARY=one`, it compiles one."
- Kind: a sentence that reads two ways; a gotcha.
- Problem: "one" also names the one library in this skill, so the sentence can read "it compiles with the one library". A worker may also write a varargs test under `FORTRESS_LIBRARY=one` and expect it to run, but SKILL.md line 80 says a program compiled so does not run yet.
- Confidence: medium.
- Fix: "With `FORTRESS_LIBRARY=one`, it compiles a varargs parameter, but the program does not run yet (`SKILL.md`, "How a program runs")."

**Flag 4. compiler.md:45.**
- Passage: "It still stops on a varargs method, or a generic varargs function, beside another declaration of its name with as many parameters (ledger row 1086)."
- Kind: a sentence that reads two ways; a gotcha.
- Problem: no message is given, so a worker cannot recognise the stop. "As many parameters" does not say as many as what, or how the varargs parameter counts. "Still" leaves unclear whether this holds only with the one library.
- Confidence: medium.
- Fix: "With `FORTRESS_LIBRARY=one`, the code generator stops with '<message>' on a varargs method, or a generic varargs function, where another declaration of the same name has the same number of parameters, the varargs parameter counted as one (ledger row 1086)." The writer fills in the message and checks the count rule.

**Flag 5. compiler.md:58.**
- Passage: "a call, at an assumption of a generic trait, of a method whose parameter has the trait's type parameter, as `stamp(self, x: T)` in `Tagged[\T\]`"
- Kind: a sentence that reads two ways.
- Problem: the example shows the declaration, not the call. Line 53 says a functional call compiles only where every argument is an assumption, so a worker cannot tell which call form gives 'Can't find the body': dotted, functional with every argument assumed, or another.
- Confidence: low.
- Fix: add the refused call that row 1088 records, as "..., as `stamp(t asif Tagged[\String\], <arg>)` for `stamp(self, x: T)` in `Tagged[\T\]`", with the form that the row holds.

**Flag 6. compiler.md:60.**
- Passage: "(F-391)"
- Kind: a record file named as the source of a rule.
- Problem: this part gives an F-N citation no meaning (revival-changes.md lines 5 and 7 give meaning only to P-N and ledger rows), so the citation changes no action and sends a worker to FACTS.
- Confidence: low.
- Fix: delete "(F-391)".

**Flag 7. compiler.md:60.**
- Passage: "At an assumption of a trait, the call runs the trait's body, also where the object overrides it"
- Kind: a gotcha.
- Problem: the sentence does not say whether walk does the same, so a worker writing a test for both paths cannot tell whether walk's answer may differ.
- Confidence: low.
- Fix: end the sentence with "on both paths", or add "Walk runs ..." with walk's answer and its row, whichever holds.

**Flag 8. compiler.md:126.**
- Passage: "The checker also refuses as unreachable a clause at a type that the selector's static type excludes, as a program's trait `Shape` for `x: ZZ32` (ledger row 1081)."
- Kind: a gotcha; a term not defined where it is used.
- Problem: no remedy is given, so a worker whose `typecase` over a number value has an arm at its own trait is stuck. "Excludes" here is the implicit exclusion of an object type (revival-changes.md line 24: an object excludes every trait that it does not extend), and this line does not say so, so a worker does not see that every number type, now a value object, excludes every program trait.
- Confidence: medium.
- Fix: restate: "The checker also refuses as unreachable a clause at a type that the selector's static type excludes. A number type is an object, so it excludes every trait that it does not extend, as a program's trait `Shape` for `x: ZZ32` (ledger row 1081)." Then give the remedy, such as binding the selector at `Any` first, if that compiles.

**Flag 9. compiler.md:139.**
- Passage: "Until the switch-over, the prelude's `String` gives `<`, `=`, `>`, `<=`, `>=` and `=/=` the placeholder body `false`. So at an assumption, `("ab" asif String) < ("cd" asif String)` is `false` (ledger row 1089). Compare strings without an assumption."
- Kind: a sentence that reads two ways.
- Problem: read alone, the first sentence says that every compiled string comparison is `false`. Why a call without an assumption is right is left for the worker to infer from line 60, which this trap does not name.
- Confidence: medium.
- Fix: "Until the switch-over, the prelude's trait `String` gives `<`, `=`, `>`, `<=`, `>=` and `=/=` the placeholder body `false`, and the type of a string value overrides them. A call at an assumption of a trait runs the trait's body ("What the compiled path cannot compile yet"), so `("ab" asif String) < ("cd" asif String)` is `false` (ledger row 1089). Compare strings without an assumption." The writer checks the override clause.

**Flag 10. compiler.md:141.**
- Passage: "A function argument whose arrow type of no parameters coerces to its parameter's, as `() -> ZZ32` at `() -> ZZ64`, dies when called with `NoClassDefFoundError` (ledger row 1084)."
- Kind: a sentence that reads two ways; a gotcha.
- Problem: "dies when called" can mean the call that passes the function, or the callee's call of it. "Of no parameters" leaves a worker unsure whether an arrow with parameters, as `ZZ32 -> ZZ32` at `ZZ32 -> ZZ64`, is safe.
- Confidence: medium.
- Fix: "Where a function of no parameters is passed at a parameter of an arrow type that its own type coerces to, as a `() -> ZZ32` at `() -> ZZ64`, the program dies with `NoClassDefFoundError` when <the callee calls the parameter, or the call is made> (ledger row 1084)." Then say what an arrow with parameters does, or that no test covers it.

**Flag 11. compiler.md:142.**
- Passage: "A spread argument to a varargs parameter, as `f(1, ys...)`, is dropped on both paths (ledger row 1085)."
- Kind: a claim that a worker could not check.
- Problem: on the compiled path a varargs parameter is refused against the prelude (line 45), and a program compiled with the one library does not run yet (SKILL.md line 80), so a worker cannot see the compiled half or tell where it shows. "Is dropped" also does not say whether the elements are lost or the call fails.
- Confidence: medium.
- Fix: "Under walk, a spread argument to a varargs parameter, as `f(1, ys...)`, passes none of the elements of `ys` (ledger row 1085)." Then say where the compiled path shows it: in a phase that both paths run, or with `FORTRESS_LIBRARY=one`.

### revival-changes.md

**Flag 12. revival-changes.md:7.**
- Passage: "Either can change. Where the rules decide the case, assert their answer in an `XXX` test. Where they do not, assert today's behaviour in a plain test, one without the `XXX` prefix, and cite the row"
- Kind: a gotcha.
- Problem: the old ban on asserting a departure in a plain test is gone, so a worker may also pin today's wrong behaviour in a plain test beside the `XXX` test, and that test breaks when the departure is fixed.
- Confidence: low.
- Fix: "Where the rules decide the case, assert their answer in an `XXX` test, and assert today's behaviour in no plain test."

**Flag 13. revival-changes.md:103.**
- Passage: "Nor does walk convert a function argument by an arrow coercion: 'Unification error' (row 1083)."
- Kind: a term not defined where it is used; a gotcha.
- Problem: a worker who knows Java and Scala does not know that a coercion can carry a function from one arrow type to another, so it cannot tell which calls this covers. The remedy that compiler.md line 141 gives for the same call is missing here.
- Confidence: high.
- Fix: "Nor does walk convert a function argument from its arrow type to the parameter's, as a `() -> ZZ32` passed at `() -> ZZ64`: 'Unification error' (row 1083). The compiled path fails on it too (`compiler.md`, "Traps of the compiled path"). Declare the function at the parameter's arrow type." The writer checks the example against row 1083.

## 4. Undefined terms

- "built-in number type": compiler.md line 34 (again at line 43). Seven or eight types: `QQ` in or out.
- "F-N" citation, as "F-391": compiler.md line 60. The part gives F-N no meaning.
- "excludes", for the implicit exclusion of an object type: compiler.md line 126.
- "arrow coercion": revival-changes.md line 103.

## 5. Gotchas

- SKILL.md line 94: a worker on the one library assumes that its `RR64` class extends `FRR64`.
- compiler.md line 45: a worker writes a varargs test under `FORTRESS_LIBRARY=one` and expects it to run.
- compiler.md line 45: a worker meets row 1086's stop and cannot recognise it, as no message is given.
- compiler.md line 60: a worker asserts the trait-body rule in a walk test without knowing walk's answer.
- compiler.md line 126: a worker's `typecase` over a number value, with an arm at its own trait, is refused, and no remedy is given.
- compiler.md line 139: a worker avoids every compiled string comparison, or does not see why `asif String` changes the answer.
- compiler.md line 141: a worker passes a function with parameters at a coerced arrow type, believing only functions of no parameters fail.
- revival-changes.md line 7: a worker adds a plain test of a departure beside its `XXX` test.
- revival-changes.md line 103: a worker under walk meets 'Unification error' and finds no remedy in this part.

## 6. Count

Flags: 13. High 1, medium 7, low 5. Lint hits: 0.
