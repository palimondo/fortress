# Cold read: fortress-repo, climb batch 29

Skill: `fortress-repo`, read as a worker new to the repository. Base: `5febd82a7`. Head: `dfcb7eb18f`. Parts read: `SKILL.md`, `references/compiler.md`, `references/interpreter.md`, `references/library.md`, `references/revival-changes.md`, `references/tests-writing.md`. The diff also touches `references/sources.md`, which the task does not name; I did not judge it.

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/library.md .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/tests-writing.md

Output: none. Exit code 0. No lint hits.

## 2. What I would do differently, section by section

- `SKILL.md`, "The phases" (lines 66-78): I expect each expression of numerals alone to be folded before the type check, on both paths, as phase 4 of 7. Limit: the list says the fold gives "one exact numeral". The fold also gives booleans and joins string literals (`revival-changes.md:93`). The list does not say so.
- `SKILL.md`, "Fortress as a language", the static-parameters bullet (line 133): I treat a `nat` or `int` parameter used as a value as a `ZZ32`, not an `NN32`. Limit: the limit at 2^31 is not here, and the bullet's pointer goes to "Static parameters", not to "Numbers".
- `SKILL.md`, the numbers bullet (line 134): I know that `2147483647 + 1`, written with numerals alone, does not raise `IntegerOverflow`.
- `compiler.md`, "What the code generator does" (line 65): I expect a program's coercion from a numeral to run once, when the component class loads, and a coercion that raises to stop the program before `run()`. Limit: line 108 makes an exception for a program's own generic type, but line 65 does not mention it.
- `compiler.md`, "Traps of the compiled path", the `||` bullet (line 105): I do not write `c || s` with a `Character` first in compiled code. The part does not say what to write instead.
- `compiler.md`, "Traps of the compiled path", the numeral bullets (lines 107-112): I bind a numeral at a program's own generic type once, at a top-level variable. I assert no value for a size of 2^31 or more. I bind a `typecase` selector before the `typecase`. I give each binder of a tuple pattern a type. I could not act on "Read the size by dispatch on `Box[\n\]`".
- `interpreter.md`, "How walk evaluates a program" (lines 18-26): I write an `XXX` test that asserts the rules' answer for six departures. For row 962 I assert nothing. I write `NOT (u = 0)`, and I write a return value at its declared type. For row 968 I cannot tell what the rules' answer is.
- `interpreter.md`, "Natives", the `CatString` paragraph (line 127): in a test that needs a `CatString`, I join a literal with a variable.
- `library.md`, "Designing a change" (line 56): no change of action. The example of a glue class is now `Reflect`, which the part does not locate.
- `revival-changes.md`, the `Index` rule (line 48): I take `f(3)` as valid for `f(x: Index)`.
- `revival-changes.md`, the `SEQV` paragraph (line 62): I expect `"ab" SEQV "ab"`, `("a" || "b") SEQV "ab"` and an `RR64` numeral `SEQV` an equal computed `RR64` all to be `true`, on both paths.
- `revival-changes.md`, "A numeral converts where it stands" (lines 89-91): I let a typed binding, an assignment, a field, a parameter or a declared return type convert a numeral from its exact value. Elsewhere I expect the default. I write `NaturalNumeral` or `RadixPointNumeral` only as the parameter type of a coercion or an operator. In a compiled program, I write `IntLiteral` and `FloatLiteral`. Limits that I could not find: how walk refuses an out-of-range numeral, and how a coercion's body reads the numeral's value.
- `revival-changes.md`, the fold (line 93): I use a variable operand in any test of run-time arithmetic or concatenation. I expect `1/1000` with no declared type to be a `QQ` under walk. Limit: the compiled answer for a quotient of numerals is not given.
- `revival-changes.md`, "Arguments convert by declared coercions" (line 95): I expect walk not to convert a non-numeral value at a declared return type, and both paths to read a numeral as its default where tied declarations differ only at its positions.
- `revival-changes.md`, "`Number` declares nothing" and "`/` on two integers" (lines 99, 103): I call `asFloat` on a numeral type. I convert a `ZZ64` operand with `asFloat`, because no coercion does it.
- `revival-changes.md`, "Reductions and comprehensions" (line 112): no change of action. Row 20 was dropped from a citation.
- `tests-writing.md`, "A test program" (line 34): I give each test of run-time arithmetic a non-literal operand.
- `tests-writing.md`, the `.test` keys (line 63): I use `run_exits_nonzero=true` for a program that must exit non-zero. I cannot tell whether its output must still contain `PASS`.

On the second question, one passage holds detail that changes no action: flag R6 below. Two passages state a decision's status: flags C6 and I3.

## 3. The flags

### SKILL.md

**S1.** `SKILL.md:71`
- Passage: "Fold each expression of numerals alone into one exact numeral (`references/revival-changes.md`, "Numbers")."
- Kind: gotcha left out.
- Problem: the fold also makes each comparison a boolean and joins string literals with `||` (`revival-changes.md:93`), so a worker who reads only the phase list expects `1 < 2` and `"a" || "b"` to reach the checker unfolded.
- Confidence: medium.
- Fix: restate: "Fold each expression of literals alone into one literal: a numeral, a boolean or a string (`references/revival-changes.md`, "Numbers")."

**S2.** `SKILL.md:133`
- Passage: "sizes (a `nat` or `int` parameter used as a value is a `ZZ32`)"
- Kind: gotcha left out.
- Problem: a size of 2^31 or more does not fit a `ZZ32`, and the bullet's only pointer is to "Static parameters", but the limit is in "Numbers" (`revival-changes.md:89`), so a worker who follows the pointer does not find it.
- Confidence: low.
- Fix: restate: "sizes (a `nat` or `int` parameter used as a value is a `ZZ32`; `references/revival-changes.md`, "Numbers", gives the limit at 2^31)".

### compiler.md

**C1.** `compiler.md:65`
- Passage: "It runs a program's coercion from a numeral once per site, in the component class's static initializer."
- Kind: sentence that reads two ways; term not defined ("site").
- Problem: "a program's coercion" can mean any coercion in a program or only the `coerce` that a program's own number type declares, and the sentence gives "once per site" with no limit, but line 108 says that at a program's own generic type the coercion runs at each evaluation.
- Confidence: medium.
- Fix: restate: "It runs the `coerce` from a numeral that a program's own number type declares once for each place where the numeral is written, in the component class's static initializer. At a program's own generic type it runs at each evaluation ("Traps of the compiled path")."

**C2.** `compiler.md:65`
- Passage: "So a coercion that raises stops the program before `run()`."
- Kind: gotcha left out.
- Problem: a worker can put a `catch` around the numeral in `run()` and expect it to see the exception, and the part does not say how a test checks this stop (`tests-writing.md:63`, `run_exits_nonzero=true`, or `run_out_does_not_contain=REACHED`).
- Confidence: low.
- Fix: add: "No `catch` of the program sees the exception. A test of it sets `run_exits_nonzero=true` (`tests-writing.md`)."

**C3.** `compiler.md:105`
- Passage: "The prelude's `||` takes the string first only, so `c || s` for a `Character` value `c` is refused (ledger row 965)."
- Kind: gotcha left out.
- Problem: the sentence says what is refused but not what to write instead, so a worker who must join a character before a string in compiled code must search.
- Confidence: medium.
- Fix: add one sentence that gives the form to write, for example: "Put a string first, as `"" || c || s`." (The writer confirms the example.)

**C4.** `compiler.md:107` and `:111`
- Passage: "A numeral departs from `revival-changes.md`, "Numbers", in these ways:" and, in the fourth bullet, "As a `typecase`'s selector, it keeps the type `IntLiteral`"
- Kind: sentence that reads two ways.
- Problem: the lead names a numeral, but the third bullet is about a `nat` or `int` parameter, so the fourth bullet's "it" can be read as that parameter.
- Confidence: medium.
- Fix: restate the lead: "Numerals and sizes depart from `revival-changes.md`, "Numbers", in these ways:". Restate line 111: "As a `typecase`'s selector, a numeral keeps the type `IntLiteral`, so ..."

**C5.** `compiler.md:109`
- Passage: "A negative numeral at a program's own number type reaches its coercion signed, not as `-` on the coercion's result (ledger row 961)."
- Kind: gotcha left out; claim that a worker could not check.
- Problem: `revival-changes.md`, "Numbers", states no rule for a negative numeral at a program's own number type, and its fold (line 93) folds `-3` into one numeral, which is what this departure does. So a worker cannot tell what an `XXX` test of row 961 asserts, or whether its own `coerce(x: IntLiteral)` must take a negative value. "Signed" can also be read as a Java signed type.
- Confidence: high.
- Fix: state the rule once, in `revival-changes.md`, "Numbers", for example: "A negative numeral at a program's own number type is that type's unary `-` on the coercion of the numeral's magnitude." Restate here: "A negative numeral at a program's own number type reaches its coercion with its sign, as -3, not as `-` on the coercion of 3 (ledger row 961)."

**C6.** `compiler.md:110`
- Passage: "Which answer is right is open, so assert none."
- Kind: a decision's status.
- Problem: "is open" is a status that goes stale when the question is settled. A worker can act only on "assert none".
- Confidence: medium.
- Fix: delete "Which answer is right is open, so". Restate: "Assert no value for it in a test."

**C7.** `compiler.md:110`
- Passage: "Read the size by dispatch on `Box[\n\]`."
- Kind: term not defined; sentence that reads two ways.
- Problem: the part does not say what `Box` is or what the dispatch looks like, so a worker who needs such a size cannot write the code without a search.
- Confidence: medium.
- Fix: restate with a short example of the declarations and the call, or delete the sentence.

**C8.** `compiler.md:111`
- Passage: "Bind the selector first."
- Kind: sentence that reads two ways.
- Problem: a worker can bind the selector at a type, as `x: ZZ32 = 7`, or untyped, and the part does not say which one avoids the refusal.
- Confidence: low.
- Fix: restate: "Bind the selector to a variable first, as `x = 7`, then write `typecase x of ...`."

### interpreter.md

**I1.** `interpreter.md:20`
- Passage: "A float numeral to the left of an `RR32` operand runs `RR64`'s operator: for `a: RR32`, `2.5 + a` is an `RR64`, and `a + 2.5` an `RR32` (ledger row 958)."
- Kind: gotcha left out.
- Problem: the bullets beside it give the form to write ("Write `NOT (u = 0)`"), but this one does not, so a worker who needs an `RR32` result under walk must find the form itself.
- Confidence: low.
- Fix: add: "Bind the numeral at `RR32` first, as `c: RR32 = 2.5`, then write `c + a`."

**I2.** `interpreter.md:21`
- Passage: "so a coercion that reads its digits counts 2 for `00.5`"
- Kind: sentence that reads two ways; claim that a worker could not check.
- Problem: "counts 2" can mean two digits or two leading zeros, and no part says how a coercion reads a numeral's digits, so a worker cannot write the test.
- Confidence: medium.
- Fix: restate: "so a coercion that counts its digits finds two, `0` and `5`, for `00.5`, not three." Then name the method that the coercion reads the digits with.

**I3.** `interpreter.md:22`, with its lead at `:18`
- Passage: "Which answer is right is open, so assert none." The lead says: "A test of one of these cases asserts the rules' answer, as an `XXX` test".
- Kind: a decision's status; sentence that reads two ways.
- Problem: "is open" is a status that goes stale, and the bullet contradicts the lead. A worker who reads the lead first writes an `XXX` test for this case.
- Confidence: medium.
- Fix: delete "Which answer is right is open, so". Restate the bullet's end: "Assert no value for it in a test." Restate the lead: "A test of one of these cases asserts the rules' answer, as an `XXX` test (`tests-writing.md`), unless the case says otherwise."

**I4.** `interpreter.md:25`
- Passage: "A negative integer constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as a natural numeral of negative value (ledger row 968)."
- Kind: term not defined ("integer constant"); gotcha left out.
- Problem: "integer constant" is not defined, and it differs from "negative numeral" in `compiler.md:109`, which reads as the same behaviour. So a worker cannot tell if `0 - 3` or a named constant is meant. The rules' answer, which the lead says the `XXX` test asserts, is not stated in `revival-changes.md` (see C5).
- Confidence: medium.
- Fix: restate: "A negative numeral at a program's own number type reaches its `coerce(x: NaturalNumeral)` with its sign, as -3, not as the type's `-` on the coercion of 3 (ledger row 968)." Then state the rule in `revival-changes.md`, as C5 proposes.

**I5.** `interpreter.md:127`
- Passage: "A `||` of literals folds into one flat literal, so a test that needs a `CatString` joins a literal with a variable."
- Kind: term not defined ("flat literal").
- Problem: "flat literal" is not defined. "A `||` of literals" is also wider than the rule in `revival-changes.md:93`, under which character literals fold only where one of the first two operands is a string.
- Confidence: low.
- Fix: restate: "A `||` of string literals folds into one `FlatString` literal, so a test that needs a `CatString` joins a literal with a variable."

### library.md

**L1.** `library.md:56`
- Passage: "as for `Reflect`'s bindings"
- Kind: term not defined.
- Problem: the part does not say what `Reflect` is, where it is declared, or which declared type no Java type carries there, so a worker who wants to follow the example must search.
- Confidence: low.
- Fix: restate: "as for the bindings of `Reflect` in `<file>`, whose `<type>` no Java type carries."

### revival-changes.md

**R1.** `revival-changes.md:48`
- Passage: "A numeral there takes its default, a `ZZ32`, so `f(3)` is valid for `f(x: Index)`."
- Kind: sentence that reads two ways.
- Problem: "there" has no clear antecedent, because the sentence before names `ZZ32`, `Index` and `Range`.
- Confidence: low.
- Fix: restate: "A numeral at a parameter of type `Index` takes its default, a `ZZ32`, so `f(3)` is valid for `f(x: Index)`."

**R2.** `revival-changes.md:89`
- Passage: "A place fixes a type when its declared type is a numeral type"
- Kind: term not defined ("numeral type").
- Problem: line 99 says "the two numeral types", which leaves out `Numeral`. So a worker cannot tell if a place of type `Numeral` fixes a type, or if line 91's "Write a numeral type only as the parameter type of a coercion or an operator" covers `Numeral`.
- Confidence: low.
- Fix: define it where it is first used, for example: "A numeral type is `Numeral`, `NaturalNumeral` or `RadixPointNumeral`." (The writer confirms the list.)

**R3.** `revival-changes.md:89`
- Passage: "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when it runs."
- Kind: gotcha left out.
- Problem: the part does not say what walk's refusal is: a refusal at load, which a `load_exception_contains` key matches, or an exception at run time, with a name, which a `catch` may or may not see. So a worker cannot write the test's key or assertion.
- Confidence: medium.
- Fix: restate: "..., by walk when the binding runs, with `<exception>`, which a `catch` sees." (The writer fills in the name.)

**R4.** `revival-changes.md:89`
- Passage: "A size of 2^31 or more, used as a value, is a `ZZ64` under walk and raises compiled (row 962)."
- Kind: sentence that breaks the register.
- Problem: "raises compiled" is a clipped phrase. "A size" and "a `nat` or `int` parameter", in the sentence before, name one thing in two words.
- Confidence: low.
- Fix: restate: "A `nat` or `int` parameter of 2^31 or more, used as a value, is a `ZZ64` under walk, and raises an error on the compiled path (row 962)."

**R5.** `revival-changes.md:91`
- Passage: "A program's own number type receives a numeral through its own `coerce(x: NaturalNumeral)` or `coerce(x: RadixPointNumeral)`."
- Kind: gotcha left out.
- Problem: the part does not say how the coercion's body reads the numeral's exact value. Line 99 names only `asFloat`, which rounds. So a worker who writes an exact number type must search.
- Confidence: medium.
- Fix: add a sentence that names the methods: "Its body reads the numeral's value with `<method>`." (The writer fills in the methods.)

**R6.** `revival-changes.md:91`
- Passage: "Other departures from these rules are rows 958, 960, 966 and 968 under walk, and rows 957, 961 and 963 compiled."
- Kind: detail that changes no action (second question).
- Problem: a worker cannot act on a list of row numbers, and the list goes stale as each row is fixed. The next sentence holds the pointer that the worker needs.
- Confidence: low.
- Fix: delete. Restate the next sentence: "`interpreter.md` and `compiler.md` give the other departures from these rules."

**R7.** `revival-changes.md:93`
- Passage: "the integer operators such as `DIV`, `REM` and `CHOOSE`"
- Kind: sentence that reads two ways.
- Problem: "such as" leaves the list open, so a worker cannot tell if `MOD`, `GCD`, `LCM` or juxtaposition, as `2 3`, fold.
- Confidence: low.
- Fix: list every integer operator that the fold covers, or restate: "every integer operator except those below".

**R8.** `revival-changes.md:93`
- Passage: "It leaves alone the wrapping, saturating and bitwise operators"
- Kind: term not defined ("saturating operators").
- Problem: no part names a saturating operator. `library.md` names only the wrapping ones.
- Confidence: low.
- Fix: name the saturating operators here, as `library.md:24` names the wrapping ones.

**R9.** `revival-changes.md:93`, with `:103`
- Passage: "Any other result is one numeral, which converts as above or takes its default, and a quotient of integer numerals defaults to a `QQ`." and "and under walk `lr = 1/1000` is a `QQ`"
- Kind: gotcha left out.
- Problem: the numeral type of a quotient that is not an integer is not given. Line 89 names only `NaturalNumeral` and `RadixPointNumeral`. So a worker cannot tell which `coerce` of its own number type receives `1/3`. "Under walk" leaves the compiled answer open, and line 103 still says "a compiled `7 / 2` is a static error". A worker cannot tell if a compiled `lr: RR64 = 1/1000`, or a compiled `lr = 1/1000`, compiles.
- Confidence: high.
- Fix: state the quotient's numeral type. Add the compiled answer, for example: "Until the switch-over, the compiler's library has no `QQ`, so a compiled quotient of integer numerals compiles only at a place of type `RR64`." (The writer confirms.)

**R10.** `revival-changes.md:93`
- Passage: "with character literals among them where one of the first two operands is a string"
- Kind: sentence that reads two ways.
- Problem: a worker must work out that "them" means the folded operands, and that "the first two operands" means those of a chain of `||`.
- Confidence: low.
- Fix: restate: "A chain of `||` folds character literals too, if its first or its second operand is a string literal."

**R11.** `revival-changes.md:93`
- Passage: "A test of run-time arithmetic or concatenation needs a typed operand"
- Kind: sentence that reads two ways.
- Problem: "typed operand" can mean an operand declared with a type or any operand that is not a literal. Line 89 ("The default stays the value's type") implies that an untyped variable such as `m = 2147483647` also works, and `interpreter.md:127` says "a variable".
- Confidence: medium.
- Fix: restate: "A test of run-time arithmetic or concatenation needs an operand that is a variable, not a literal: write `m: ZZ32 = 2147483647`, then `m + 1`, or `t: String = "ab"`, then `t || "c"`."

**R12.** `revival-changes.md:95`
- Passage: "Walk converts a value other than a numeral at a call, a typed binding and an assignment, but not at a declared return type (row 387), and chooses the coercion by the run-time value; the checker chooses it statically (P-59)."
- Kind: sentence that reads two ways.
- Problem: line 7 says that a sentence that cites a ledger row states a departure. So a worker can take the whole sentence, the choice by the run-time value included, as a departure that a test must not assert. The sentence also does not say that the rule converts at a declared return type.
- Confidence: medium.
- Fix: restate as two sentences: "Walk converts a value other than a numeral at a call, a typed binding and an assignment, and chooses the coercion by the run-time value; the checker chooses it statically (P-59). The rule converts at a declared return type too, but walk does not (row 387)."

### tests-writing.md

**T1.** `tests-writing.md:34`
- Passage: "A test of run-time arithmetic or concatenation needs a typed operand, because an expression of literals alone folds before the run (`revival-changes.md`, "Numbers")."
- Kind: sentence that reads two ways; one thing named in two words.
- Problem: "typed operand" reads two ways, as in R11. The sentence says "literals alone", but `revival-changes.md:93` and `SKILL.md:71` say "numerals alone" for the same fold.
- Confidence: medium.
- Fix: restate: "A test of run-time arithmetic or concatenation needs an operand that is a variable, not a literal, because an expression of literals alone folds before the run (`revival-changes.md`, "Numbers")." Use one word, "literals" or "numerals", for the fold in all three parts.

**T2.** `tests-writing.md:63`
- Passage: "With `run_exits_nonzero=true`, the run must exit non-zero instead, as a program whose class fails to load does."
- Kind: sentence that reads two ways; gotcha left out.
- Problem: "instead" can mean instead of a zero exit only, or also instead of the `pass` or `PASS` output check. The key does not fit the `<command>_<stream>_<check>` form above it, and the part does not say how it combines with the `XXX` prefix, under which each command must fail.
- Confidence: medium.
- Fix: restate: "With `run_exits_nonzero=true`, the run passes only if the program exits non-zero, and its output need not contain `pass`. The `run_*` checks still apply. A program whose class fails to load exits so." Add one sentence on its use in an `XXX` file. (The writer confirms each fact.)

## 4. Undefined terms

- "site": `compiler.md:65`.
- `Box[\n\]`, in "dispatch on `Box[\n\]`": `compiler.md:110`.
- "integer constant": `interpreter.md:25`.
- "flat literal": `interpreter.md:127`.
- `Reflect`: `library.md:56`.
- "numeral type": `revival-changes.md:89`.
- "saturating operators": `revival-changes.md:93`.
- "typed operand": `revival-changes.md:93`, and again at `tests-writing.md:34`.

## 5. Gotchas

- A worker expects comparisons and a `||` of string literals to reach the checker unfolded: `SKILL.md:71`.
- A worker uses a size of 2^31 or more as a value and follows the pointer to the wrong section: `SKILL.md:133`.
- A worker expects the coercion at a program's own generic type to run once, or puts a `catch` in `run()` for a coercion that raises: `compiler.md:65`.
- A worker writes `c || s` in compiled code and finds no form to write instead: `compiler.md:105`.
- A worker writes a `coerce` that mishandles a negative value, or an `XXX` test that asserts a guessed answer: `compiler.md:109`, `interpreter.md:25`.
- A worker finds no form to write for an `RR32` result with a float numeral on the left: `interpreter.md:20`.
- A worker writes a walk test of an out-of-range numeral with the wrong key, for a load refusal or for a run-time exception: `revival-changes.md:89`.
- A worker writes a program's own exact number type and has no way to read the numeral's value: `revival-changes.md:91`.
- A worker writes a compiled `1/1000`, or a `coerce` for `1/3`, and cannot tell if it compiles or which coercion receives it: `revival-changes.md:93`, `:103`.
- A worker sets `run_exits_nonzero=true` and keeps or drops the `PASS` line wrongly, or uses the key in an `XXX` file: `tests-writing.md:63`.

## 6. Count

30 flags: 2 high, 15 medium, 13 low. Lint hits: 0.
