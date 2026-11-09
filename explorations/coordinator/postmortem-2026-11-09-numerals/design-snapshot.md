<!-- A snapshot of the coordinating session's understanding of the curator's design intention for numerals, written by a Fable coordinator on 2026-11-09 at about 16:0x UTC, recovered from the transcript of 2026-11-08 and the recovery scout's files. A working document for the design discussion, not record text: an Opus writer turns it into record text later. The curator confirmed the design of section 4 on 2026-11-09 between 14:20 and 16:00 UTC: "Yes, I see no wrong sentence." -->

# The curator's design for numerals, recovered

**Sources.** The main session's transcript, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`; "L4833" is its line 4833, counted from 1. The recovery scout's files under `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/`: `story.md`, `inventory.md`, `slices/` (the dialogue verbatim, the briefs verbatim, the compaction summaries). His page comments and the morning: `scratchpad/literals-recovery/evidence.md`. The fidelity review, `explorations/reviews/numeral-fidelity-2026-11-09.md`. The recheck, `scratchpad/numeral-fidelity/recheck.md`. Times are UTC on 2026-11-08 unless marked 11-09; the curator's time is one hour later.

**Terms.** A *numeral* is the digits written in the source: `3`, `0.5`, `C.8_16`. Its *four numbers*: `n` the digit count, `m` the digits after the radix point, `r` the radix, `v` the digits read as one integer in that radix. A *static parameter* is what sits in a type's brackets, like the `16` in `Array[\RR64, 16\]`: the compiler knows it, and it never changes while the program runs. *Walk* is the interpreter; the *compiled path* is the checker, the code generator and the runtime. The *switch-over* is the move of the compiled path onto the interpreter's library. A *coercion* is a conversion that a type declares from another type, applied where a value of the other type is used at the declaring type.

## 1. The problem he saw, and his goal

- 07:20, on the skill page's change 40: "This was supposed to bring the user visible output between walk and run fully in-line. I didn't want the interpreter's internals leaking out to user land."
- 07:51, same thread: "Those all sound like walk implementation errors. ... fixing the behavior of the interpreter now so that its internals do not leak out to and confuse the workers that are concerned with Fortress source code changes".
- 08:03 (L2604): "I'm seeing a pattern that the literals are interfering with equivalence in a way that's surprising to me. ... why would the compiler's representation of literals in the source code not directly convert into the value type so that they are all equivalent?"
- 14:21 (L3518): "I wanted a holistic re-evaluation of the literals, and I'm getting piecewise proposal for fixes, and I'm not seeing the unified holistic vision that I was asking for."
- 15:01 (L3689): "I refuse the answer. ... we are mixing interpreter, compiled way, changes between original repo and the revivals, and mixing them and stirring them in one pot. ... the highest goal is to reconcile the language into a coherent whole."
- 15:17 (L3771): "What I saw was implementation details from the interpreter and their inconsistencies conflicting with the implementation from the compiled path and all their accidental complexities and diversions from the specifications are being treated as behavior to keep. And these peculiarities were being encoded into the skill as if these were language features ... We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing. Specification says, and I am willing to bend the specification and make a judgment if there is no one coherent reading and there is inherent conflict within the specification. ... Fix the shit before it's frozen in the switchover."

## 2. The Working Draft's words

`Specification-1.0-frozen/basic/expressions/literals.tex:83-175`, read at the source on 11-09:

- "A numeral containing only digits (let $n$ be the number of digits) has type `NaturalNumeral[\n,10,v\]` where $v$ is the value of the numeral interpreted in radix ten. If the numeral has no leading zeros, or is the literal `0`, then it also has type `Literal[\v\]`."
- The team's note beside it: "We need to describe the `Numeral` type hierarchy. All the numeric/numeral types should be defined and their relations to each other given."
- "A numeral containing only digits (let $n$ be the number of digits) then an underscore, then a radix indicator (let $r$ be the radix) has type `NaturalNumeralWithExplicitRadix[\n,r,v\]`".
- "A numeral containing only digits (let $n$ be the total number of digits) and a radix point (let $m$ be the number of digits after the radix point) has type `RadixPointNumeral[\n,m,10,v\]` where $v$ is the value of the numeral, with the radix point deleted, interpreted in radix ten."
- With a radix indicator: `RadixPointNumeralWithExplicitRadix[\n,m,r,v\]`.
- "Every numeral also has type `Numeral[\n,m,r,v\]` for appropriate values of $n$, $m$, $r$, and $v$."
- "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic. For example, consider the numeral `3.1415926535897932384`; converting it immediately to a floating-point number may lose precision. If that numeral is used in an expression involving floating-point intervals, it would be better to convert it directly to an interval. Therefore, numerals have their own types as described above. This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations (see the section on coercion). Libraries define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)."
- "Numerals containing a radix point are actually rational literals; thus `3.125` has the rational value `3125/1000`. The quotient of two integer literals is a static expression whose value is rational. Similarly, a sequence of digits with a radix point followed by the symbol × and an integer literal raised to an integer literal, such as `6.0221415 × 10^23` is a static expression whose value is rational. If such static expressions are mentioned as part of a floating-point computation, the compiler performs the rational arithmetic exactly and then converts the result to a floating-point value, thus incurring at most one floating-point rounding error. But in general rational computations may also be performed at run time, not just at compile time."

The Draft says nothing of fields or getters on a numeral, and nothing of when a program's coercion runs. Its one use of the numeral types outside this passage is the binary chapter's coercion with `where` clauses over static parameters (`advanced-lib/binary.tex:1620-1661`), which he declined to fulfil at 23:02.

## 3. The design, as reflected back to him and confirmed

Confirmed on 11-09: "Yes, I see no wrong sentence."

1. **A numeral has a type at compile time only:** `NaturalNumeral` or `RadixPointNumeral`, below `Numeral`, with the four numbers as static parameters. `3.125` has the type `RadixPointNumeral[\4, 3, 10, 3125\]`. The parser gives the compiler the four numbers; the checker carries them in the type. These types live in the checker. When the program runs there is no numeral object, no method on one, nothing of the numeral left. `IntLiteral` and `FloatLiteral` are gone.

2. **Where a type is fixed, the compiler converts the numeral at compile time, from the exact value.** Constant folding. Into an integer type exactly, or a refusal at compile time when it does not fit. Into `QQ` exactly. Into `RR64` or `RR32` with one rounding. The class file holds the finished constant. Walk gives the same value at the same place.

3. **A program's own number type gets numerals by declaring a coercion whose parameter is the numeral type, generic over the four numbers.** The Draft's interval, as the coordinator showed him at 21:35 (L4685):

   ```
   object Interval(lo: RR64, hi: RR64)
     coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) =
       Interval(roundDown(v, r, m), roundUp(v, r, m))
   end
   iv: Interval = 3.1415926535897932384
   ```

   The coercion is not a method that runs on a value. It is the interface the type implements so that the compiler can hand it the four numbers from the source. Its body is a call of the type's constructor with values computed from `n, m, r, v`. The compiler knows the four numbers, so it instantiates the coercion for that numeral and emits the constructor call with the constants. The result is a constant of the program: one object per site, computed once. No double in between. The one JVM detail he accepted at 22:21: a class file cannot hold an object as a constant, so that object is built once when the class loads, into a `static final` field, and every use reads it.

4. **`nat` is a natural number with no bound in the type system.** The 32-bit `nat` is this implementation's choice for the JVM's array sizes, not the language's. So `v` of a 20-digit numeral in a static parameter is fine in the design; the checker must hold it.

5. **Where nothing fixes a type**, `x = 3`, `f(3)` at `Any`, `Cell(3)`: the machine default, `ZZ32`, or `ZZ64` or `ZZ` by size, and `RR64`. Then point 2 applies: converted at compile time into the default. His decision of 22:40.

6. **An expression of numerals alone folds first, exactly:** `3 + 4`, `1/2`, `-3`, `6.0221415 × 10^23`. Then the folded constant converts or defaults like a numeral. A numeral has no sign; `-3` is the minus applied to `3` (his 23:10; the judgement's repair 3).

7. **Both paths do the same thing, before the switch-over.** A user sees no difference between walk and the compiled path.

8. **The proof is his own types, run on both paths:** complex from `3 + 4 i`; the Draft's interval; `Dec(unscaled, scale)` receiving `3.14159` as 314159 and 5; bfloat16 rounding once from the exact value; the round trip, the type's own method printing `C.8_16` back from the four constants; a compile-time range check, a byte type that refuses `300` before the program runs, the one thing static parameters give that run-time fields cannot; `0.1_2 SEQV 0.5` true, `0.1 = 0.1_16` false.

**His addition on 11-09, after the confirmation.** The library's own number types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`) take numerals by the same mechanism as a program's types: a coercion from the numeral type, generic over the four numbers, folded by the compiler. No separate way in the compiler for the shipped numerics, and no excuses for them. An efficient implementation through the same mechanism is a stress test of the design: if the library's types come out fast through the common mechanism, the mechanism is right. This matches the Draft's "Libraries define coercions from numerals to integers ... and rational numbers."

## 4. What it is not

- Not a `Numeral` value object with getters for the four numbers, `asFloat`, `asString` and `=` pairs with the number types.
- Not a coercion called at run time on such an object.
- Not the compiler prelude's `IntLiteral` or `FloatLiteral`.
- Not walk building a numeral object at a site's first evaluation and calling the coercion on it.

## 5. His words that carry each point

- 12:36 (L3260), on float numerals: "whatever ends up in QQ doesn't lose this precision. Whenever we know that we are saving the literal into float with fixed size, we should do the relevant conversion with maximum precision."
- 20:11 (L4329): "float literal is basically a QQ with implicit coercions to all other numerics. ... How could we get the promise of the conversion? Like, maybe we should try it on our own numeric types. What if we tried it with complex numbers? ... how would we try to stress test this concept of literal during a conversion like this so that we arrive at the right shape?"
- 20:18 (L4350): "didn't you just quote the solution from the specification with Radix point numeral? Like, I am seeing this for the first time here. Isn't the solution to implement this? I haven't seen it in walk, and we haven't seen it in compile path."
- 20:23 (L4361): "the specification was saying that you go for the conversion, that this conversion happens at compile time. We would never instantiate so many types at runtime, right? It is a compile time type. It doesn't exist at runtime."
- 20:29 (L4423): "the specification promises that the radix point numeral is a compile time conversion. It can only live on the right side of an assignment or declaration, and the left side must be a different type. You will never get radix point numeral or natural numeral at runtime."
- 21:22 (L4640): "We have the literals defined using this radix type. Like, we finished the design as the specification says. Does that solve all of our problems here? Do we need to prototype something to make this running?"
- 21:34 (L4676): "You never write int literal and float literal with the generic parameters N, M, R, and V. ... Value is the last of these generic parameters. It's the V at the end. ... how would you access those numbers inside the float literal? ... show me the code. ... use the same example that they use, those intervals. Show me the old way and the new way."
- 21:38 (L4689): "why can't we change the nat to be ZZ? Like a arbitrary precision integer, basically a big int. We are putting it into the type, so it must have a fixed size so that we can stamp the class. Is that the reason?"
- 21:40 (L4700): "this thing is supposed to be a compile time thing only. ... these are not runtime things. Why can't we accept for these types in a checker arbitrary precision size for the value?"
- 21:55 (L4749): "NAT, N-A-T, is just a natural number in generic type system with no limits. We have, for practical purposes, implemented it for the compile path as something that is ZZ32 ... But NAT is just a number that can be used in compilers' computations. ... Why can't we build it the specifications way? Just finish the original design. Why not? This way there is no runtime type that you are calling methods on that is not the compile time way, right? Using just the type system declaration for the coercion seems more elegant to me. The original drafts way."
- 22:02 (L4813): "how do I convert a numeral, a constant written in the program's name, into an instance of a custom numeric type? And you do it by letting the parser give you the four numbers, and you put them into the object's during compile time to compute its fields, so that you can stamp that object as a compile time constant."
- 22:14 (L4823): "you are saying the compiler runs coerce only at runtime. It is not what the specification says. We have just prototype constant folding. Isn't this a specific instance of constant folding? Because I see it as one. What am I missing?"
- 22:19 (L4833): "I disagree that coerce is running of arbitrary code. Coerce is just invocation of the numeric type constructor that gets the constants from the parser. That's all. It is just instantiation of the numeric types constructor using the values from the generic parameters of that coerce method. Invokes only constructor of the numeric type using the constants it has on hand. Like the type must provide a constructor that gets those parameters. That's it. That's the coercion."
- 22:21 (L4846): "That's what I had in my head. Does this match, can this be reconciled with what's written in the specification?"
- 22:33 (L4878): "Why do you keep talking about in literal and float literal when I said I will take the drafts originals? These two names, int literal and float literal, are from compiled library and from the glue classes in the walk interpreter. None of these were mentioned in the original specification, which defined the type for the natural numeral, radix numeral. We are going with those."
- 22:40 (L4903): "We'll go with machine defaults. When the type is not declared."
- 23:02 (L4982): "our coerce is a novel design, not this one. I basically said it will be a call. To initializer that must consume the fields from the numerals." He said this about the binary chapter's `where` arithmetic, which he declined to fulfil. His clarification on 11-09: he was explaining his understanding that the specification gives a custom type a way to read the original literal from the source by implementing the coercion; the coercion is not a run-time method call; it is the interface a custom numeric type implements, where the compiler has a chance to hand it the parameters from the source code.
- 23:10 (L5019): "Doesn't the natural numeral imply there is no sign, that it's only positive numbers, or am I mixing things up?"
- 11-09 13:20 (L6379): "I never gave up working draft static parameter form. Where do you get this?" 13:22 (L6388): "No fucking getters. Where wasn't I clear enough? I was talking about constant folding."

## 6. What he accepted from the coordinator

- The `static final` at class load as the JVM's nearest form of a stamped object constant: point 3 of the coordinator's list at 22:20 (L4838), "the compiler emits a call of it with the four numbers as constants, once per class, into a `static final` field. The type's code builds the object from the four exact numbers. No double in between, no literal object alive in the program, no class per numeral." His "That's what I had in my head" (22:21) answered that list. The paragraph after the list, "a `coerce` takes one parameter, so the four numbers travel as one value with four fields", was labelled "The only Fortress detail left is spelling"; his word of 11-09 is that he never gave up the static parameters.
- The machine defaults where nothing fixes a type: his own choice (22:40), after weighing the restart's `QQ` and `ZZ` (22:31, L4856) against microGPT's untyped hyperparameters and `asZZ32` on every index (22:32, L4874).
- The six repairs and the defaults of the Fable judgement, at 23:23 (L5096), "Yeah. Option one." The form, static parameters or fields, was not among them; it was already written as settled.

## 7. Where the design turned

- 21:56 (L4752): the coordinator asked the prototype worker to cost the Draft's way "by reading only, no build". 22:00 (L4809): the report back, "The Draft's static-parameter way needs a size kind beyond 32 bits, typed constants in the class loader, a new `where` form for `v < 256`, and walk's half after walk runs the checker; none of that is sized, and all of it is large." Four minutes. Nothing built. Recommendation: "B with the hybrid".
- 22:20 (L4838): "You're right, and that settles it." Four points, then the fields paragraph as "spelling", and "The Draft's static-parameter form is the same call with the numbers as static arguments, at the cost of a class per numeral and a wider `nat`, which buys nothing here."
- 22:22 (L4849): "your design puts them into the numeral's value as fields". 22:33 (L4881): "the four numbers are fields of the numeral's value, not static parameters of its type." 22:46 (L4971): "With the four numbers as fields, as you decided".
- 22:41 (L4911; commit `e9e03d6fe4`): the held list, under "His decision on literals": "carrying the Draft's four numbers ... as fields of the numeral's value, not as static parameters".
- 23:04 (L4987): the Fable judge's brief, headed "The decision, in the curator's words and the coordinator's condensation": "as fields of the numeral's value, not as static parameters of its type"; "the compiler emits that call once per class, at load, with the numbers as constants."
- 23:35 (L5159): the compaction summary that handed the Fable session to the Opus one: "carrying the four numbers n, m, r, v as fields, replacing IntLiteral and FloatLiteral"; "A program's coercion is emitted as a call with constants, once per class at load, into a static final field."
- 23:52 (commit `69427e9422`): P-174, by the Opus record writer: "they are fields of the value, not static parameters of the type"; "which the compiler calls once per class, when the class loads". His one quoted sentence stops before "using the values from the generic parameters of that coerce method".
- 11-09 00:5x: the Fable review of the batch record weighed "the Working Draft's static parameters" as "against P-174's 'fields of the value'; not a way for this batch" (`explorations/coordinator/climb-batch-29-review.md:69`).
- 11-09 13:18 (L6345): the Fable fidelity reviewer, "he said this while arguing for the Draft's static-parameter form, which he then gave up"; 13:19 (L6349) the coordinator's relay, "read through the four getters".

## 8. What was built against it

From the fidelity review (`explorations/reviews/numeral-fidelity-2026-11-09.md`, sections 1 and 2) and the recheck (`scratchpad/numeral-fidelity/recheck.md`, sections 1.4 and 2.8):

- The one library: `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with four abstract getters, `digits`, `fractionDigits`, `radix`, `digitValue`; `value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)` and `value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`, each with `getter asString()`, `asFloat(self): RR64` and eleven `=` pairs each way with the number types (`Library/FortressLibrary.fsi:454-494`). No static parameters.
- Walk: a numeral runs as its default value with the four numbers attached; at a program's own type walk builds the library's numeral object at run time, one per site, and calls the program's `coerce` with it at the site's first evaluation, not at load; the body reads `x.digitValue` or calls `asFloat(x)` (`interpreter/evaluator/values/Numerals.java:292-337`; test `ProjectFortress/tests/NumeralOwnTypeWalk.fss`).
- The compiled path: numerals at built-in types fold at compile time with one rounding. At a program's own type the program still writes `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)` against the prelude, whose values give `asZZ32` to `asRR64`, not the four numbers; the class's static initializer calls it once per site; at a generic program type it runs at each evaluation (ledger row 957).
- A negative constant reaches a program's coercion signed on both paths: under walk `t: Tally = -3` passes `NaturalNumeral(1, 10, -3)`, whose `asString` prints `7` (rows 961, 968; review-queue item 448), against repair 3, "a program's coercion sees the four numbers of a written numeral only".
- The fidelity review's verdict, "carried out faithfully in their substance", checked the build against P-174 and the held list, and P-174 carries the coordinator's framing.

So of section 3: points 1, 2 at a program's type, 3 and 4 are not built; point 2 at built-in types, point 5 and point 6's fold are built; point 7 is met in part (the compiled path at a program's type waits for the switch-over); point 8's tests exist only as the review's probes and the prototype's three cases.

## 9. Open questions for the design discussion

Questions, not answers:

1. The fold that batch 29 landed makes `-3` one signed constant before the checker. Under the design a numeral has no sign. How does `-3` reach a program's coercion: as the type's own unary minus applied to the coercion of `3` (repair 3), and what does a type without a unary minus do? Where in the library's algebraic traits is unary minus declared, and how does that bear on it?
2. Walk has no checker. How does walk hand the four numbers to a generic coercion and run it once per site, with no numeral object? Today walk refuses a `nat` parameter used as a value (row 486), and walk does not convert through a generic coercion (row 513).
3. The checker's static arithmetic is 32-bit today (`nat` as `NN32`, F-67). What does `v` of a 20-digit numeral need in the checker, and in the class loader's stamped constants (F-129)? Is a class name's text enough, as the coordinator said at 21:38?
4. Can the checker evaluate a `where { v < 256 }` on such a coercion, so that a byte type refuses `300` at compile time? What part of the static-expression system, marked "not yet supported" (`constant.tex:14`), does that need?
5. The library's own number types through the same coercions: does the fold of a library coercion give the same constant and the same speed as today's direct fold? Which of the library's eight types declare a coercion from each numeral type, and in which form?
6. The `=` pairs between a numeral and a number type, kept at 23:23 as a default: are they needed at all when every numeral converts at compile time? What does `5 = n` for `n: NN32` become?
7. A bare numeral's printing: the team's `NumberPrintTest.fss:16` prints a 32-digit numeral as written. Under the design a bare numeral defaults to `RR64` and prints 16 digits. Is that the bend he takes?
8. microGPT's lines: `(epsilon, lr0, beta1, beta2, epsilon_A, nSteps) = (10.0^(-5), 0.01, 0.85, 0.99, 10.0^(-8), 1000)` and the others with untyped numerals. What does each become under the design, and does any bit change?
9. The compiled path before the switch-over: nothing may be added to the compiler's prelude (P-37), so a program's own type cannot write `coerce(x: RadixPointNumeral)` compiled until the switch-over. Does the design wait for the switch-over there, or is an exception to P-37 taken?
10. A numeral type written anywhere but a coercion's or an operator's parameter: refused by the checker (P-174's clause), and what walk does.

## 10. The probe he wants next

One Opus worker, at extra high effort, builds the static-parameter form for real, in a worktree seeded from the batch 29 landing, on both paths: the numeral types with the four numbers as static parameters in the checker, the fold of a program's generic coercion into one constant per site (a `static final` at class load on the compiled path; walk's equivalent), and the library's own number types through the same mechanism. Its tests are his own types, written first and seen failing: complex from `3 + 4 i`, the Draft's interval, `Dec(unscaled, scale)` from `3.14159`, bfloat16 rounding once from the exact value, the round trip printing `C.8_16` back from the four constants, a byte type refusing `300` at compile time, and `0.1_2 SEQV 0.5` true with `0.1 = 0.1_16` false. It measures what each part costs in lines, in the checker's time and in the count and distance stages, what it does to the library's types' speed, and which tests flip. It reports what it could not build and why, as decisions not taken. Reading-only costing is not accepted: the Draft's way was costed by reading in four minutes on 11-08, and that is where the design turned.
