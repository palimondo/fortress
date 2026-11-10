# Cold read: fortress-repo, climb batch 29b

The skill: `fortress-repo`, read as a worker new to the repository. Base 5f35b1d05, head 1bcb6fac1c. The parts judged: `SKILL.md`, `references/compiler.md`, `references/interpreter.md`, `references/library.md`, `references/revival-changes.md`. `references/sources.md` changed too. The task does not name it, so I did not judge it.

## 1. The lint

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/library.md .claude/skills/fortress-repo/references/revival-changes.md

Output: none. Exit 0. No hits.

## 2. What I would do differently, section by section

**SKILL.md, "Fortress as a language", the static-parameters item (line 133).** I would treat a `nat` or `int` size parameter, used as a value, as a `ZZ32`. The limit is unclear. The new words "that is a size" say that some `nat` or `int` parameters are not sizes, but the item does not say which. From revival-changes.md:91 I guess that a numeral coercion's parameters are the exception. I cannot state the rule.

**compiler.md, "The compiler's prelude, until the switch-over" (line 34).** I would add no declaration to the three prelude files, except for the numerals. I cannot state the limits of that exception: which numeral declarations I may add or change, and whether a numeral defect of the compiled path, as row 442, is fixed there.

**compiler.md, "What the code generator does" (line 65).** A program's own coercion from a numeral runs once for each place where the numeral is written, in the static initializer. So a test of a coercion that raises sets `run_exits_nonzero=true`. Where the place's type names a type parameter, the coercion runs at each evaluation instead. This section is clear.

**compiler.md, "Traps of the compiled path", the numerals item (lines 107-112).** At a place whose type names a type parameter, I would bind the coerced value once, at a top-level variable. I cannot see how the generic body then uses that value. In a numeral coercion's body, I would not combine two calls of my own functions in one expression; I would bind each call first. At `RR64` and `RR32` I would write `3.0`, not `3`. I would bind a `typecase` selector to a variable before I match it. The sign rule for negative constants (row 961) is gone; revival-changes.md:91 now holds the one rule.

**interpreter.md, the list of walk's departures in numbers (lines 18-26).** Under walk, a coercion gets 2 as the digit count of `00.5`; a test asserts 3, as an `XXX` test. To compare a value with a numeral under walk, I would bind the numeral at the value's type first. I would not write a numeral type as a static argument or as a supertype: walk runs it, and the checker refuses it. I cannot tell what a test of that last case asserts.

**library.md, "The curator's decisions on the library" (line 23).** Until the switch-over, the compiled path converts into `RR64` only a numeral with a radix point and, as I read it, an `RR32` value. So in a compiled test I would not pass `3` or a `ZZ32` value where `RR64` is expected. The part does not say what to write for a `ZZ32` value.

**revival-changes.md, "Static parameters, `where` clauses and sizes", `NatReflect` (line 83).** I would test a `reflect` call that binds `N[\n\]` only under walk. I would not expect it to compile after the switch-over either. This paragraph is clear.

**revival-changes.md, "Numbers" (lines 87-99).** A numeral's type is `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`. It has no getters, no `asFloat`, no `asString`, and no `=` with a number type. My own number type takes numerals through a coercion generic over these numbers, bounded by a `where` clause. The body reads the numbers as `ZZ` values. A folded constant other than a negated numeral reaches my type only through a coercion from its default type, as `coerce(q: QQ)` for `10/20`. To compare a value with a numeral, I bind the numeral at the value's type. Limits that I cannot state: which `nat` parameters are sizes; whether row 442 is a defect to fix or a limit to wait out; what the rules answer for `u = 0`; where the coercion is declared.

## 3. The flags

### SKILL.md

**F1. SKILL.md:133.** "a `nat` or `int` parameter that is a size, used as a value, is a `ZZ32`"
- Kind: a sentence that reads two ways; a term not defined.
- Problem: the item makes a size the kind of every `nat` or `int` parameter, so "that is a size" names no case, and a worker types a numeral coercion's `v` as a `ZZ32`, where revival-changes.md:91 reads it as a `ZZ`.
- Confidence: high.
- Fix: restate: "sizes (a `nat` or `int` parameter used as a value is a `ZZ32`, except a parameter of a coercion's numeral type, as `v` in `x: NaturalNumeral[\n, r, v\]`, which is a `ZZ`: `references/revival-changes.md`, "Numbers")".

### compiler.md

**F2. compiler.md:34.** "Their tests stay. The one exception is the numerals: until the switch-over, the prelude carries their design (P-37)."
- Kind: a sentence that reads two ways; a term not defined ("their design").
- Problem: a worker cannot tell what it may add to the prelude for the numerals, nor whether a numeral defect of the compiled path, as row 442, is fixed there, while revival-changes.md:7 says that a limit stated "Until the switch-over" is never fixed in the prelude. After "Their tests stay", "The one exception" can also read as an exception to that sentence.
- Confidence: high.
- Fix: restate, and put it right after the first sentence: "The one exception is the numerals: until the switch-over, you may change the prelude's numeral types and its coercions from them, so that they follow `revival-changes.md`, "Numbers"." If row 442 is not to be fixed there, say so in the same sentence, and bring revival-changes.md:7 into line.

**F3. compiler.md:108.** "Bind the value once, at a top-level variable of an instance type."
- Kind: a term not defined; a gotcha.
- Problem: "instance type" is defined nowhere, and a top-level variable cannot have the declaration's type parameter in its type, so a worker cannot see how the generic body uses the value at a place typed by `T`.
- Confidence: medium.
- Fix: define the term, and say what the body writes. If the workaround holds only at one instance, restate: "Bind the value once, at a top-level variable whose type names no type parameter, as `one: Mod[\ZZ32\] = 1`. This helps only where the generic body needs that one instance."

**F4. compiler.md:109.** "An operator or an argument list over two calls of the program's own functions spawns, as `small(n) - small(m)` does. Bind the two calls to locals first."
- Kind: a gotcha; a sentence that reads two ways.
- Problem: a worker cannot tell whether a call of a library function, or one call beside a variable, also spawns; and a worker who binds both calls in one tuple, `(a, b) = (small(n), small(m))`, keeps the spawn, because the elements of a tuple run at once (SKILL.md, "Parallelism and mutable state").
- Confidence: medium.
- Fix: restate: "An operator or an argument list over two or more calls of the program's own functions spawns, as `small(n) - small(m)` does. Bind each call in a statement of its own, as `a = small(n)`, then `b = small(m)`, then write `a - b`."

**F5. compiler.md:110.** "`RR64` and `RR32` take only a numeral with a radix point, so `r: RR64 = 3` is refused (ledger row 442). Write `3.0`."
- Kind: detail that the second question finds: one fact stated three times.
- Problem: revival-changes.md:89 and library.md:23 state the same row in other words, and library.md:23 is wider (it adds `RR32` values and leaves out `ZZ32` values), so a worker reads three forms of one limit and cannot tell which holds.
- Confidence: medium.
- Fix: keep this item, where revival-changes.md:91 sends a worker for the compiled path's departures. Delete the copies: in revival-changes.md:89, "but it has no `QQ`, and its `RR64` and `RR32` take only a radix-point numeral: write `3.0`, not `3` (row 442)"; and library.md:23's last sentence. If the value case holds, add it here (F9).

### interpreter.md

**F6. interpreter.md:21.** "so a coercion reads the digit count of `00.5` as 2, not 3"
- Kind: a sentence that reads two ways.
- Problem: numeral types have no getters now, and "reads" does not say where the count reaches the coercion, so a worker writing the test may look for a getter.
- Confidence: low.
- Fix: restate: "so a coercion over `RadixPointNumeral[\n, m, r, v\]` gets `n` = 2 for `00.5`, not 3 (ledger row 960)."

**F7. interpreter.md:23.** "`u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, ... (ledger row 966). Bind the numeral at the type first, as `z: NN32 = 0`, then write `u =/= z`."
- Kind: a gotcha.
- Problem: the twin of this case, walk's `u = 0` that is `false` (row 973), is in revival-changes.md:99, not in this list of walk's departures; a worker who reads the list to find walk's numeral departures misses it, and line 18's test rule does not reach it.
- Confidence: medium.
- Fix: add an item here and delete the walk sentences from revival-changes.md:99 (F18): "`u = 0` is `false` for a zero `u: NN32`, and so is `h = 0.5` for `h: QQ = 1/2`, but `r = 3` is `true` for `r: RR64 = 3`: walk gives a numeral at `=` its default (ledger row 973). Bind the numeral at the type first, as for row 966."

**F8. interpreter.md:25.** "A numeral type written as a static argument, or as a type that an object or a trait extends, loads and runs, as `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` does (ledger row 974). The compiled checker refuses both forms."
- Kind: a gotcha.
- Problem: unlike its neighbours, the item gives no instruction, and revival-changes.md:91 names only a variable, a field and a return as refused; so a worker writing this item's `XXX` test (line 18) cannot tell what the rules answer, or what the test asserts.
- Confidence: medium.
- Fix: restate the last sentence: "The rules refuse both forms, as the compiled checker does: write a numeral type only where `revival-changes.md`, "Numbers", allows it." If a test is to match the refusal, give its message.

### library.md

**F9. library.md:23.** "Until the switch-over, the compiled path converts into `RR64` only a numeral with a radix point and an `RR32` (ledger row 442)."
- Kind: a sentence that reads two ways; a gotcha.
- Problem: "a numeral with a radix point and an `RR32`" reads as one thing or as two (a radix-point numeral, and an `RR32` value); the sentence is a limit of the compiled path in a list of the curator's decisions on the library; and it holds the only statement that a `ZZ32` value does not convert, which compiler.md:110, the part that a writer of compiled tests loads, leaves out.
- Confidence: medium.
- Fix: delete it here (F5), and restate compiler.md:110 as: "Until the switch-over, the compiled path converts into `RR64` only an `RR32` value and a numeral with a radix point. So `r: RR64 = 3` is refused, and so is a `ZZ32` value where `RR64` is expected (ledger row 442). Write `3.0`." Add what to write for a `ZZ32` value.

### revival-changes.md

**F10. revival-changes.md:87.** The deleted sentence: "Route C is the way not chosen: a checker rule under which the number types could nest again."
- Kind: a gotcha.
- Problem: a worker that meets "route C" in a slice of the record no longer has its meaning, and "this choice route A" now names a choice without the way not taken.
- Confidence: low.
- Fix: none if the record's slices no longer use "route C"; otherwise restore the sentence.

**F11. revival-changes.md:89.** "Its static arguments are the numeral's numbers: the digit count, the digits after the point, the radix, and the digits read as one integer in that radix"
- Kind: a sentence that reads two ways.
- Problem: "the digits after the point" reads as those digits (125) or as their count (3); the list of four does not say which three `NaturalNumeral` takes; and it does not say that leading zeros count, which interpreter.md:21 depends on.
- Confidence: medium.
- Fix: restate: "Its static arguments are the numeral's numbers: the count of its digits, leading zeros included; for `RadixPointNumeral` only, the count of its digits after the point; its radix; and its digits read as one integer in that radix. So `7` is a `NaturalNumeral[\1, 10, 7\]`, and `3.125` a `RadixPointNumeral[\4, 3, 10, 3125\]`."

**F12. revival-changes.md:89.** "No numeral value exists when a program runs, so a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type."
- Kind: a sentence that reads two ways, beside line 91's first sentence.
- Problem: line 91 still allows a numeral type as "the parameter type of a coercion or an operator", and the change removed "is a numeral type" from the places that fix a type; so a worker cannot tell what an operator over a numeral type does when no numeral value exists, or how a numeral reaches its parameter.
- Confidence: low.
- Fix: restate line 91's first sentence: drop "or an operator", or say what such an operator is for, with an example.

**F13. revival-changes.md:89.** "Until the switch-over, the compiler's prelude follows the same design (P-37), but it has no `QQ`, and its `RR64` and `RR32` take only a radix-point numeral: write `3.0`, not `3` (row 442)."
- Kind: a sentence that reads two ways; detail that the second question finds.
- Problem: by line 7, a sentence that opens "Until the switch-over" is a limit never fixed in the prelude, and a sentence that cites a row is a departure that a fix can change; this sentence is both, so with compiler.md:34 a worker cannot tell whether to fix row 442. "it has no `QQ`" repeats line 103, and the row repeats compiler.md:110.
- Confidence: high.
- Fix: delete from "but it has no `QQ`" to "(row 442)". The sentence becomes: "Until the switch-over, the compiler's prelude follows the same design (P-37)." Settle row 442 in compiler.md (F2, F5).

**F14. revival-changes.md:89 and :91.** "A `nat` or `int` parameter that is a size, used as a value, is a `ZZ32`" (:89); "The body reads the numbers as `ZZ` values of any size, not as `ZZ32` values as it reads a size" (:91).
- Kind: a sentence that reads two ways; a term not defined.
- Problem: the coercion declares its numbers as `nat n, nat r, nat v`, the kind that SKILL.md:133 calls a size, so "that is a size" and "as it reads a size" leave a worker unable to tell whether `v` is a `ZZ` or a `ZZ32`; "of any size" also uses the term's word in its plain sense in the same sentence.
- Confidence: high.
- Fix: restate :91: "In the body, the numeral type's parameters, as `n`, `r` and `v`, are `ZZ` values without a bound, since a numeral's digits fit no fixed width. Any other `nat` or `int` parameter used as a value is a `ZZ32` (P-173, P-40)." Restate :89: "A `nat` or `int` parameter used as a value, other than a numeral type's, is a `ZZ32`, so `u: NN32 = n` is refused (P-173, P-40)."

**F15. revival-changes.md:91.** "as `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)` for `value object Byte(b: ZZ32)`"
- Kind: a gotcha.
- Problem: no part says where a coercion is declared, so a worker new to Fortress may write this one at the top level beside `Byte`, not in `Byte`'s body.
- Confidence: medium.
- Fix: say where it is declared, as: "as `value object Byte(b: ZZ32)`, whose body declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)`."

**F16. revival-changes.md:91.** "Walk refuses it when the binding runs."
- Kind: a gotcha.
- Problem: the part gives the checker's message but not walk's, so a worker writing a walk test of the refusal has no text to match, and cannot tell whether a `catch` sees it.
- Confidence: low.
- Fix: restate with walk's message, as line 89 gives 'Type mismatch binding' for a numeral out of range.

**F17. revival-changes.md:93.** "which converts as a numeral does at a library number type"
- Kind: a term not defined.
- Problem: "library number type" is used only here; the part elsewhere says "the eight number types", so a worker must guess whether these are the same.
- Confidence: low.
- Fix: restate: "which converts as a numeral does at one of the eight number types, or takes its default."

**F18. revival-changes.md:99.** "No `=` ties a numeral type to a number type (P-174). Under walk, the numeral at `=` takes its default. So `u = 0` is `false` for a zero `u: NN32`, ... (row 973). Until the switch-over, the compiled `u = 0` is `true`."
- Kind: a sentence that reads two ways; a claim that a worker could not check.
- Problem: the paragraph gives walk's answer and the compiled answer until the switch-over, but not the rules' answer. "No `=` ties ..." reads as the reason that the numeral takes its default, so that walk follows the rules, while the row marks walk's answer as a departure (line 7). A worker writing a test of `u = 0`, or of interpreter.md:23's `u =/= 0`, which asserts the rules' answer (interpreter.md:18), cannot tell whether to assert `true` or `false`.
- Confidence: high.
- Fix: state the rules' answer first, and move walk's answer to interpreter.md (F7). If the rules answer `true`, restate: "By the rules, a numeral at `=` converts at the parameter type of the number type's `=`, so `u = 0` is `true` for a zero `u: NN32`. Walk departs (`interpreter.md`)." If they answer `false`, say so, and drop rows 966 and 973 as departures.

**F19. revival-changes.md:99.** "but `r = 3` is `true` for `r: RR64`"
- Kind: a sentence that reads two ways.
- Problem: unlike the other two cases, it gives no value of `r`, so read literally it says that `r = 3` holds for every `r: RR64`.
- Confidence: low.
- Fix: restate: "but `r = 3` is `true` for `r: RR64 = 3`".

## 4. The undefined terms

- "a size", as a property that some `nat` or `int` parameters lack: SKILL.md:133 (also revival-changes.md:89, :91).
- "their design", the numerals' design that the prelude carries: compiler.md:34.
- "instance type": compiler.md:108.
- "numeral coercion": compiler.md:109 (revival-changes.md:91 says "a coercion generic over its numbers").
- "library number type": revival-changes.md:93.

## 5. The gotchas

- A worker fixes row 442 in the prelude by compiler.md:34, or leaves it by revival-changes.md:7, and cannot tell which is meant (compiler.md:34, revival-changes.md:89).
- A worker types a numeral coercion's `nat` parameters as `ZZ32` (SKILL.md:133, revival-changes.md:89, :91).
- A worker asserts `true` or `false` for `u = 0` or `u =/= 0` in a test without the rules' answer (revival-changes.md:99, interpreter.md:23).
- A worker who reads interpreter.md's list of walk's numeral departures misses row 973 (interpreter.md:18-26).
- A worker binds the two spawning calls in one tuple and keeps the spawn (compiler.md:109).
- A worker in a generic body cannot use a top-level value of one instance at a place typed by `T` (compiler.md:108).
- A worker writing a compiled test passes a `ZZ32` value where `RR64` is expected: only library.md:23, a part it does not load, warns of it, and no part says what to write instead (compiler.md:110).
- A worker declares a numeral coercion at the top level, not in its type's body (revival-changes.md:91).
- A worker writing an operator over a numeral type cannot tell how a numeral reaches it (revival-changes.md:89, :91).
- A worker meeting "route C" in the record has no gloss (revival-changes.md:87).

## 6. The count

Flags: 19. High: 5 (F1, F2, F13, F14, F18). Medium: 8 (F3, F4, F5, F7, F8, F9, F11, F15). Low: 6 (F6, F10, F12, F16, F17, F19). Lint hits: 0.
