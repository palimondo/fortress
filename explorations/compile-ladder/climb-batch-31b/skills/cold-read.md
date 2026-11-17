# Cold read: fortress-repo, climb batch 31b

Skill: `fortress-repo`, read as a worker new to the repository. Base: 5a84f56ce. Head: 182b3885ee. Changed parts: `references/revival-changes.md`, `references/compiler.md`, `references/interpreter.md`, `references/library.md`. The same range also changed `references/sources.md`, which the task does not name; it is not judged here.

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/library.md

Output: none. Exit status 0. No lint hits.

## 2. What I would do differently, section by section

### revival-changes.md

- Opening (line 7). When a ledger row marks a case and the rules decide it, I write an `XXX` test that asserts the rules' answer. The text does not say what to do where the rules do not decide the case.
- "Dispatch and overloading" (line 24). If my trait declares its own functional `+` and is itself a number type below `Number`, I cannot exclude `Number`. I declare it `excludes { HasRank }`, the trait that arrays extend.
- "Traits and objects" (lines 32, 34, 44, 70).
  - `override` widens. To replace an inherited method at its own parameter types, I declare it again without `override`. The checker refuses this redeclaration when an object reaches a generic self-typed trait's method along two paths. The text gives no way around it.
  - The checker stops looking for a cover at the same limits as walk. The text does not say what the checker does at those limits.
  - Row 1051. If a type extends `StandardTotalOrder` and must run compiled, I give it its own `MIN` and `MAX`. The text does not say whether the type meets the interpreter's library's shape before the switch-over.
  - Comparing tuples longer than three falls back to `SEQV` (row 923). This is unsettled, so I do not assert it in a plain test.
- "Static parameters, `where` clauses and sizes" (line 91). A call of `reflect` runs only under walk, also after the switch-over. I write no compiled call of it.
- "Numbers" (lines 95, 97, 99, 118).
  - I never extend a number type in a program. I declare my own number type below `Number`.
  - Walk refuses `object Mine extends ZZ32` at load. On the compiled path, the checker accepts it and the class dies at load (rows 1003, 866).
  - `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist. An arm at one of them catches every value. I replace each one with a revived type. "In that order" can mean the matching of names or the order of the arms (flag R9).
  - The prelude's numeral design is no longer a limit that ends at the switch-over.
  - Line 118 lost only a sentence that moved to line 95. Nothing changes for me there.

### compiler.md

- "What the two paths share" (line 22). Walk's number glue classes are `ZZ32.java` and `ZZ64.java`, not `Int.java` and `Long.java`.
- "Natives" (line 99). Transfer helpers apply only to `NN32`, `NN64` and `Char`. `UnsignedLong` is gone. `self` gets a transfer helper only in a method of those three types.
- "Traps of the compiled path" (lines 106-110, 117).
  - Until the switch-over, I write `NOT (r = 0)` in place of `r =/= 0` at `RR64`. At `RR32`, I first bind the value to an `RR64` variable.
  - A tuple parameter becomes one JVM parameter for each element. Three tuple forms fail:
    - For an object's method overloaded at a pair and at another type, I use two method names.
    - For an object whose only value parameter is a pair, I add a second value parameter. Which kind of parameter is unclear (flag C2).
    - For a generic operator applied to a pair, the text gives no way around it.
  - A block that ends in a numeral and is bound to an untyped variable keeps the numeral's own type. I declare the variable's type. The old item on function bodies (rows 1014, 1030) is gone, so I no longer guard those cases.

### interpreter.md

- "What walk checks" (lines 80-84).
  - Row 1044 now applies to every number type except `QQ`.
  - Walk refuses a valid Return Type Rule pair over a program's own trait that comprises one object. This item cites no row.
  - Walk refuses a generic result tuple that holds the type parameter (row 1058).
  - Walk loads `f(x: Number): ZZ32` beside `f(x: ZZ64): String`, which the checker refuses (row 697).
  - For generic dotted methods of one name with different numbers of parameters, I use two names (row 1057).
- "Natives" (lines 124-147).
  - `self` is carried only for the types in the one list that remains. The number types' own methods carry `self` directly, with no objects such as `Int` between.
  - A program's object that extends `JavaBufferedWriter` fails at the call (row 928). I extend `WriteStream` instead, but the skill never says what that is.
  - The overflow example is now `ZZ32.overflow()` in `ZZ32.java`.

### library.md

- "Designing a change" (line 39). The example of a body that already answers the api's type now cites `Library/FortressLibrary.fss:540-547` and "their natives". `FortressBuiltin`'s `Float` is gone. I would act the same way.

### The second question: repair history, or detail that changes no action

- compiler.md:107: "Read a `VerifyError` at a tuple parameter with this in mind" names no step. The "still" in "Three tuple forms still fail" is history (flag C1).
- revival-changes.md:95: "The record calls this design route A, and still calls the number types 'the tower'" is kept. It stops a worker from misreading the record's words. It is not repair history.
- No other changed passage holds repair history. The removals, such as "row 923 holds the question", the file-and-line citation at line 44 and the `Float` object, take out detail that is no longer true.

## 3. The flags

### revival-changes.md

**R1. Line 7.** "Where the rules decide the case, an `XXX` test asserts their answer (`tests-writing.md`)."
- Kind: a gotcha the passage leaves out.
- Problem: The sentence before it names two kinds of ledger case: a departure from a rule, and a case the rules do not decide. This sentence covers only the first. For an undecided case, a worker finds three instructions: line 7 says "do not assert it as correct in a plain test", `compiler.md` says "Assert neither path's answer", and `tests-writing.md` item 3 says assert today's behaviour. So the worker must search.
- Confidence: medium.
- Fix: restate. "Where the rules decide the case, an `XXX` test asserts their answer. Where they do not, write the test that `tests-writing.md`, "How a defect is recorded", item 3, gives."

**R2. Line 24.** "or, for a number type below `Number`, `excludes { HasRank }`, the trait that arrays extend."
- Kind: a sentence that reads two ways.
- Problem: "a number type" can mean one of the library's number types. The meant reading is that the program's trait itself extends `Number`, so it cannot exclude `Number`.
- Confidence: low.
- Fix: restate. "Declare the trait `excludes { Number }`, or, where the trait itself extends `Number`, `excludes { HasRank }`, the trait that arrays extend."

**R3. Line 32.** "The checker refuses such a redeclaration where an object reaches the method of a generic self-typed trait along two paths (row 1037)."
- Kind: a gotcha the passage leaves out.
- Problem: A worker who follows the sentence before it ("declare it again without `override`") can hit this refusal. Nothing here gives a way around it or says what "along two paths" means. "Self-typed" is defined only four lines below. `compiler.md`, "The checker's gaps", gives the form and the test rule, but this sentence does not point there.
- Confidence: low.
- Fix: restate. "The checker refuses such a redeclaration where an object inherits the method of a generic self-typed trait both from that trait and from a trait below it that declares the method again (row 1037; `compiler.md`, "The checker's gaps", says how to test it)."

**R4. Line 34.** "Walk and the checker stop the search for a cover at the same limits, which `interpreter.md`, "What walk checks", gives."
- Kind: a sentence that reads two ways.
- Problem: `interpreter.md` gives these limits as places where walk refuses the object. One of them is "a symbolic type", which is walk's own stand-in. The sentence does not say whether the checker also refuses at a limit or accepts there. So a worker cannot predict a compile of an object whose cover search hits a limit.
- Confidence: low.
- Fix: restate, naming the checker's outcome. For example, if both refuse: "Walk and the checker stop the search for a cover at the same limits, which `interpreter.md`, "What walk checks", gives, and each refuses the object there."

**R5. Line 44.** "`StandardTotalOrder`'s `MIN` and `MAX` in the interpreter's library have this shape. So declare your own `MIN` and `MAX` in a type that extends `StandardTotalOrder` and must run compiled, as the integer types do;"
- Kind: a sentence that reads two ways.
- Problem: Until the switch-over, compiled programs use the compiler's prelude, not the interpreter's library (`compiler.md`). Now that "From the switch-over" is gone, a worker cannot tell two things. Does a compiled type meet this shape today? Does a type of the interpreter's library "run compiled", and so need its own `MIN` and `MAX` now?
- Confidence: low.
- Fix: restate. "So a type that extends `StandardTotalOrder` and runs compiled declares its own `MIN` and `MAX`, as the integer types do. From the switch-over, this includes every such type of the interpreter's library." Also say whether the compiler's prelude has the same shape today.

**R6. Line 91.** "Such a call runs only under walk, also after the switch-over."
- Kind: a gotcha the passage leaves out.
- Problem: The edit removed the sentence that said what a compiled call does before the switch-over. A worker writing a compiled `XXX` test of `reflect` today cannot tell which failure to expect: a link failure, or the JVM verification failure that the next sentences describe (row 307).
- Confidence: low.
- Fix: restate. "Such a call runs only under walk, also after the switch-over. Until the switch-over, a compiled call of `reflect` fails with <the failure>; after it, the call fails the JVM's verification." The writer fills in the failure.

**R7. Line 95.** "Seven are value objects (P-178): ... No type of a program extends a number type. Declare a program's own number type below `Number` (P-160)."
- Kind: a sentence that reads two ways.
- Problem: "Seven are value objects" holds only for the interpreter's library: three sentences later, the compiler's prelude declares them as traits. "No type of a program extends a number type" reads as either a rule or a fact. It also covers `QQ`, a trait, but the paragraph says what refuses an object below only the seven. A worker cannot tell what happens to a program's type that extends `QQ`, on either path.
- Confidence: medium.
- Fix: restate. "In the interpreter's library, seven are value objects (P-178): ... Do not extend a number type in a program: declare your own number type below `Number` (P-160)." Then add one sentence saying what each path does with a type that extends `QQ`.

**R8. Line 97.** "As a type, each is undefined: 'Float is undefined.' As a `typecase` arm, each takes every value, without a message (row 959)."
- Kind: a claim that a worker could not check.
- Problem: Neither sentence names a path. A worker writing a walk test or a compiled test cannot tell which path prints 'Float is undefined.', or on which path an arm at `Int` takes every value.
- Confidence: medium.
- Fix: restate, naming the path or paths in each sentence. For example: "Walk and the checker refuse each as a type: 'Float is undefined.' Under walk, as a `typecase` arm, each takes every value ..."

**R9. Line 97.** "In their place, write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, in that order."
- Kind: a sentence that reads two ways.
- Problem: The sentence before it is about `typecase` arms, and arm order matters in a `typecase`. So "in that order" can read as the order in which to write the arms, not as a match of each team name to a type. A worker can then write the arms in that order and keep a wrong mapping.
- Confidence: high.
- Fix: restate. "In their place, write `ZZ32` for `Int`, `ZZ64` for `Long`, `RR64` for `Float`, `ZZ` for `BigNum` and `NN64` for `UnsignedLong`."

### compiler.md

**C1. Line 107.** "A parameter of a declared tuple type is one JVM parameter for each element (F-378). Read a `VerifyError` at a tuple parameter with this in mind. Three tuple forms still fail:"
- Kind: detail that changes no action (the second question).
- Problem: "With this in mind" names no step. A worker cannot tell what to look for in the error or what to do differently. "Still" carries repair history.
- Confidence: medium.
- Fix: restate. "A parameter of a declared tuple type is one JVM parameter for each element (F-378). So a method descriptor in a `VerifyError` lists one parameter for each element of a tuple parameter. Count the elements when you match the descriptor to the Fortress declaration. These three tuple forms fail:" If no such step is meant, delete the second sentence and "still".

**C2. Line 109.** "an object whose one value parameter is a pair dies in its constructor with `ClassCastException` (ledger row 1055). Give the object a second value parameter;"
- Kind: a sentence that reads two ways.
- Problem: A worker cannot tell which fix is meant. One reading is to split the pair into its two elements as two value parameters. The other is to add an unused parameter beside the pair.
- Confidence: medium.
- Fix: restate with the meant form. For example: "Give the pair's elements as two value parameters, as `object P(a: ZZ32, b: ZZ32)` in place of `object P(p: (ZZ32, ZZ32))`." Or: "Add a second value parameter beside the pair, of any type."

**C3. Line 110.** "a generic operator over a type parameter, applied to a pair, dies at the call with `NoSuchMethodError` (ledger row 1056)."
- Kind: a gotcha the passage leaves out.
- Problem: Its two siblings each give a way around. This item gives none, so a worker whose code needs the form has no instruction. "Applied to a pair" also does not say whether one operand is a pair, or whether the type parameter is fixed at a pair type.
- Confidence: medium.
- Fix: restate with an example and a way around. For example: "a generic operator, as `opr ⊕[\T\](a: T, b: T)`, applied to pairs, as `(1, 2) ⊕ (3, 4)`, dies at the call with `NoSuchMethodError` (ledger row 1056). <The way around>."

**C4. Line 117.** "A block that ends in a numeral after a local declaration, bound to a variable without a declared type, keeps the numeral's own type. A later conversion of the variable dies at run time, with `NoClassDefFoundError: fortress/CompilerBuiltin$v` (ledger row 1060)."
- Kind: a sentence that reads two ways.
- Problem: "Bound to a variable without a declared type" can attach to the local declaration or to the block. "A later conversion" does not say which uses convert: a typed binding, a call's argument, or an operator. So a worker cannot tell which programs are at risk, or where to put the type.
- Confidence: medium.
- Fix: restate. "Where a block ends in a numeral after a local declaration, and the block's value is bound to a variable without a declared type, the variable keeps the numeral's own type. A later use that converts the variable, as <the uses>, dies at run time, with `NoClassDefFoundError: fortress/CompilerBuiltin$v` (ledger row 1060). Declare the variable's type."

### interpreter.md

**I1. Line 81.** "So it refuses a valid pair over a program's own trait that comprises one object, as `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: Mine, b: Mine): Mine`, where `Mine` extends `Number` and comprises one object."
- Kind: a claim that a worker could not check.
- Problem: Every other departure in this list cites a ledger row, and the edit removed this item's row 550. `revival-changes.md` line 7 uses a row to mark an unsettled behaviour. Without one, a worker cannot tell whether the record holds this defect. It may assert walk's refusal in a plain test, or search the ledger and write a duplicate row.
- Confidence: medium.
- Fix: restate with the row that holds the case: "... and comprises one object (ledger row N)." If no row holds it, the writer opens one or says so.

**I2. Line 82.** "It refuses a valid pair where the generic declaration's result is a tuple that holds its type parameter, ... 'fails the Return Type Rule' (ledger row 1058)."
- Kind: a gotcha the passage leaves out.
- Problem: The item gives no form that walk loads. The same section says that a library edit which adds an overload can stop every program at load. A worker adding such a pair to the library meets that stop with no instruction.
- Confidence: low.
- Fix: restate by adding: "Do not add such a pair to the library: walk then refuses every program at load." Or give a form that walk loads, if one exists.

**I3. Line 83.** "It reads two parameter lists as excluding where every parameter at which they differ is an object type, also an object below the other's type."
- Kind: a sentence that reads two ways.
- Problem: "Is an object type" does not say whether that is in one list or in both. In the example, `Number` (a trait) stands against `ZZ64` (an object). "Also an object below the other's type" is a fragment that reads like a second condition. A worker cannot predict which other pairs walk loads.
- Confidence: medium.
- Fix: restate, if this is the meaning: "It reads an object type as excluding every other type at the same position, a supertype of the object included. So it loads two declarations whose parameter lists differ only at positions where one of them is an object type: `f(x: Number): ZZ32` beside `f(x: ZZ64): String` loads, which the checker refuses (ledger row 697)."

**I4. Line 135.** "The binding is in a method of a type that carries no `self`, as a program's own object:"
- Kind: a sentence that reads two ways.
- Problem: Elsewhere in the section, walk carries `self` in a Java type. Here the type is the subject, and a worker must work out that this means a type that the list above does not name.
- Confidence: low.
- Fix: restate. "The binding is in a method of a type that the list above does not name, as a program's own object:"

**I5. Line 136 (not changed, but made stale by the change).** "has exactly the Java types of the lists"
- Kind: a sentence that reads two ways.
- Problem: The edit removed the second list, and line 134 now says "the list above". So "the lists" points to a list that no longer exists.
- Confidence: low.
- Fix: restate. "has exactly the Java types of the list above".

**I6. Line 141.** "Extend `WriteStream` instead."
- Kind: a term not defined where it is used.
- Problem: `WriteStream` appears nowhere else in the skill. A worker must search for what it is, where it is declared, and whether it gives the methods its object needs.
- Confidence: medium.
- Fix: define the term. "Extend `WriteStream`, the library's <what it is> (`<file>`), instead."

### library.md

No flags. The changed line 39 reads clearly and cites a primary source.

## 4. Undefined terms

- `WriteStream`: interpreter.md:141.
- "along two paths" (how an object reaches a trait's method): revival-changes.md:32. `compiler.md`:141 explains it, but nothing here points there.
- "self-typed trait": revival-changes.md:32, which uses it four lines before its definition at :36.
- "a later conversion" (which uses of a variable convert it): compiler.md:117.

## 5. Gotchas

- A worker meets a ledger case that the rules do not decide. It finds no instruction at the sentence it reads, and three different ones elsewhere: revival-changes.md:7 (R1).
- A worker replaces an inherited method without `override`, as advised. It meets the checker's refusal with no way around it: revival-changes.md:32 (R3).
- A worker writes a compiled `XXX` test of `reflect` and expects the JVM verification failure. The text no longer says what fails before the switch-over: revival-changes.md:91 (R6).
- A worker extends `QQ` in a program. The text does not say what either path does with it: revival-changes.md:95 (R7).
- A worker replaces the team's types as "in that order". It writes the `typecase` arms in that order instead of mapping each name: revival-changes.md:97 (R9).
- A worker applies a generic operator to pairs in a compiled program. It finds no way around the `NoSuchMethodError`: compiler.md:110 (C3).
- A worker meets walk's refusal of a `comprises` pair. The item cites no row, so it asserts the refusal in a plain test or writes a duplicate ledger row: interpreter.md:81 (I1).
- A worker adds a valid pair with a tuple result to the library. Walk then refuses every program at load, and the item gives no form to use: interpreter.md:82 (I2).

## 6. Count

- Flags: 19 (high 1, medium 10, low 8).
  - High: R9.
  - Medium: R1, R7, R8, C1, C2, C3, C4, I1, I3, I6.
  - Low: R2, R3, R4, R5, R6, I2, I4, I5.
- Lint hits: 0.
