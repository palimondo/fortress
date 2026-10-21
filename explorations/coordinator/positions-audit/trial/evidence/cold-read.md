# Cold read of seven POSITIONS entries

Source: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/positions-audit/fix/rewritten7.txt`. I read only that file; nothing else in the repository. I did not load the `fortress-repo` skill either, since it would bring in project context the test leaves out, and this file is not code.

Project terms I could not resolve from the entries alone: "rung", "skeptic", "landing", "batch", "climb batch 17", "switch-over", "walk", "row N", "review-queue item N", "array fork N", "PLAN item / phase", "the model", "store", "factory", "scalar block", "he / his". Where I guess at one, I say so.

---

## P-55: arithmetic in sizes

**What to do or not do**
- In a size, the checker accepts `+`, `-`, a product (juxtaposition) and a power. It folds numeral-only parts (`2 3` becomes `6`) and otherwise compares sizes as written, so `s0 s1` ≠ `s1 s0`.
- Don't report the `N[\0\]` arm of `typecase N[\b0\]` as unreachable, because a size name can have the value 0. The class loader works out the size's value when it makes the class.
- Don't rewrite the library's sizes that are written as products and sums.

**What it decides, and why**
Sizes are arithmetic expressions that are equal when their written forms match after numerals are folded. The entry gives no reason. My guess: it keeps the team's library sizes as they wrote them and keeps size equality simple. The team's Q&A is the authority for the numeral point only.

**What is unclear**
- "(array fork 1, 15a with (b))" means nothing to me: I can't tell what fork 1 is, what 15a is, or which part "(b)" picks out.
- "Size" is never defined. Is it only a static `nat` parameter, or also an array dimension written in a type?
- How far does folding go? Only a subterm made entirely of numerals (`2 3`), or does `s0 2 3` become `s0 6`, and `2 s0 3` too? Is `s0 + 0` equal to `s0`? Is `s0 1`? Does regrouping count, e.g. `(s0 s1) s2` against `s0 (s1 s2)`? "Compared by its written form" leaves all of this open.
- Difference: if `-` gives a negative size, does the checker refuse it, does the class loader, or is the result undefined?
- Power: how is a power written in a size (`^`, a superscript)? Is a numeral power such as `2^3` folded as well?
- Compile time against run time: the checker treats `s0 s1` and `s1 s0` as different, but the class loader computes values, so at run time both may produce the same class. Does a `typecase` then match one against the other? The entry compares by form statically and by value at run time without saying so outright.
- "A size name may equal a numeral" can be read two ways: the name may be bound to a numeral's value (my reading), or a size may be spelled as a numeral. "The team's Q&A" is a document the entry doesn't identify.
- In `typecase N[\b0\]`, I guess `N` is a generic type and `b0` a size variable bound further out.
- "The library keeps the team's sizes written as products and sums" could describe how things are now or forbid changing them. I read it as forbidding.

---

## P-148: the checker's speed comes right after its correctness

**What to do or not do**
- When my work changes the checker, I first make the change correct, then measure how it changed the checker's time, then make a second pass that only speeds the checker up.
- The speed pass must not change results: the same programs accepted and refused, with the same errors at the same places.
- Both passes happen inside the rung, and its skeptic checks the time and the results. They are not left as a manual step after landing.

**What it decides, and why**
After correctness, the checker's speed comes next, and each rung that changes the checker includes a speed pass that keeps its results the same. The entry gives no reason; P-150 hints that the checker is where the time worth saving lies.

**What is unclear**
- "Rung", "skeptic", "landing" and "batch" are project terms. My guess: a rung is one step of a batched agent run, a skeptic is the agent that reviews it, and landing means merging the work.
- "The same programs as before": before the speed pass (my reading), or before the whole rung? It can't mean before the rung, because the correctness change may itself change results.
- Measured against what? Which programs (the test suites, microGPT, the library), which baseline, how many runs, and what slowdown counts as needing a fix?
- Is the second pass always required, or only when the change made the checker slower? Must it get back to the old time, beat it, or only beat the time after the first pass?
- "Ideally the rung does this work itself" weakens the rule. May a rung skip the speed pass and leave it to a later step?
- "Comes right after its correctness": ahead of what? Ahead of new checker features? Ahead of compiled code's speed, which is the project's stated measure? The entry doesn't say.
- "Same errors at the same places": does that also mean the same message text, order and count?
- I read "Built in the `fortress-repo` skill (`compiler.md`), the batch script's … prompts, and the batch manual" as "this rule is written into those files". A worker outside a batch isn't told whether the rule applies to them.

---

## P-151: only the `where` forms the team wrote down are built

**What to do or not do**
- Build only these `where` forms. First, a trait extending another under a condition: the trait counts as that type only where the condition holds, and its members are checked under the condition. Second, a method's `where` bounding its static parameters. Third, the team's commented-out `AnyList comprises List[\E\] where [\E\]`, made live.
- Keep `SUM`'s fusion with `MAX` and `MIN`. Measure the team's commented-out generic `distribute` for its two type errors. Move the rest of `AnyList` into `List`.
- Don't build other `where` forms, or any other feature the team left little support for, unless they left enough design intent or the feature is on the critical path to running fast compiled.

**What it decides, and why**
`where` is limited to the forms found in the team's work. The reason given: a feature with little support from the team bends the language beyond what "he" (I assume the curator) can review.

**What is unclear**
- "The `where` forms the team wrote down": wrote down where? In the specification, the library code, comments, the papers? The `AnyList` example is a comment, so comments count.
- Is the list of three complete? The heading says "only", but the body never says "these three and no others".
- "A method's `where` condition bounds its static parameters": only the method's own static parameters, or the enclosing trait's as well? Does "bounds" mean upper bounds only, or any constraint?
- The `where [\E\]` in the `comprises` clause introduces a type variable rather than stating a condition. Is it a separate form, or part of the conditional-extends form?
- "`SUM`'s fusion with `MAX` and `MIN` stays": I can't tell what `SUM` is (an operator, a trait, a reduction), what "fusion" means here, or what it has to do with `where`.
- "The team's commented generic `distribute` measured for its two type errors" has no verb of its own. Is `distribute` uncommented and its two errors recorded, or left commented out and its errors only counted? What does "measured" mean here?
- "The rest of `AnyList` moves into `List`" is stated as decided, then appears again under "Still to build … which climb batch 17 built otherwise (review-queue item 188)". Does "otherwise" mean the batch did it differently, so it needs redoing, or that it was built somewhere else? Should a worker do it now or wait for the review of item 188?
- The first sentence says members "are checked under the condition", while "the members scoped to the condition" is still to build, "since a member checked under it stays callable where it fails". So "checked under" (built) and "scoped to" (not built) are different things, yet the first sentence reads as if both are done. Until row 773 is built, the feature lets a member be called where its condition fails.
- "Walk's half" and "the code generator's half": half of what? My guess: "walk" is the interpreter, and each half is its run-time support for these forms. "After the switch-over": a switch from what to what?
- The "Why" is broader than the entry. "One is built where the team left enough design intent for it, or where it is on the critical path": does "one" mean any feature? If so, a general rule sits inside an entry about `where`. Its "or … critical path" clause also allows building something the team never wrote down, which the heading's "Only … the team wrote down" seems to rule out.
- "He" is never named.

---

## P-66: the integer principle

**What to do or not do**
- Keep the numeric defaults of Java and the JVM where they make sense. Override them where they hurt high performance or mathematical precision, as the team did with rounding.
- Give a hardware behaviour that bytecode can express its own explicit operator (as the specification does with its wrapping and saturating operators) rather than folding it into the default operator.
- Where the JVM prevents a correct implementation, accept that for now. When a question comes up, compare with Julia, X10, Swift and Rust.

**What it decides, and why**
The JVM's defaults are the starting point, overridden where they hurt performance or precision. The reason is only implied: the project wants both speed and correct mathematics, and working around the JVM isn't worth it yet. My inference; the only support given is the team's rounding precedent.

**What is unclear**
- It is called the "integer" principle, but its one example, rounding, sounds like floating point (or maybe integer division). Does it cover floats too, and every numeric type?
- "The team did so with rounding": which rounding? Did they keep the JVM's default or correct it? "Did so" could point to either half of the heading.
- Overflow, the key integer case: does the default `+` on 32- or 64-bit integers wrap (Java's default), trap, or widen? "Java's … defaults stay where they make sense" suggests it wraps. "Gets its own explicit spelling, as the specification's wrapping … operators do" suggests the default does not wrap. The two sentences point in opposite directions.
- "Where they make sense": judged by whom, and by what test?
- "Fail high performance or mathematical precision": what if the two conflict, say a choice that is precise but slow? No order is given.
- "Gives way for now": accept the JVM's behaviour silently, or record it as a gap? Until when?
- "The peers to compare are …": compare for what, semantics or benchmarks? And what if they disagree with each other?

---

## P-85: the array design's three questions are open

**What to do or not do**
- Don't decide, or pick a default for, the three array questions: (1) a store per element type, chosen by the factory; (2) the size kept also as a field of the store; (3) a factory for a size known only at run time, returning the unsized `Array`.
- They come back after the switch-over, together with array decisions A, B and D. All preparation for the array work happens before the switch-over.
- Leave array fork 3 at the default it was built with until "his" review (review-queue item 30).

**What it decides, and why**
These three array design questions stay open, with no choice made, until after the switch-over. The entry gives no reason. My guess: they need the curator's call and nothing before the switch-over depends on them.

**What is unclear**
- The heading says "open, with no default", but the last sentence says "Array fork 3, on the third question's ground, is built at a default". So does the third question have a default or not? Is fork 3 the same thing as question 3, or does it only overlap with it? If code already runs at a default, "no default" isn't true for that ground.
- "The whole preparation for the array work is done before the switch-over" could state a fact (it is already done) or a rule (it must be done first). And where does preparation end and deciding begin?
- Three numbering schemes are in play, and the entry doesn't say how they map onto each other: questions 1–3, decisions A, B and D (where is C?), and forks (fork 3 here, fork 1 in P-55).
- "A is how `double[]` goes under a float vector": I read this as a Java primitive array backing a Fortress vector of floats. "D, sizes in the model's own types (P-87)": I guess "the model" is microGPT. P-87 was not given to me.
- "Store" and "factory" are terms from the array design that the entry doesn't define.
- "PLAN item 13", "switch-over" and "his" are unresolved.
- Does "open" mean I must not build anything that touches these questions, or only that I must not settle a choice? A worker who runs into array code needs to know which.

---

## P-88: the model's array-scalar operators and its diagonal

**What to do or not do**
- In the model (microGPT, I assume), don't define `+`, `-` or `MAX` between an array and a scalar; leave them to the library's scalar block.
- Keep `Diag` as a subtype of `Matrix` with its own `mul` override; don't replace it with the general matrix product.

**What it decides, and why**
The model relies on the library for array-scalar operators and keeps a specialised product for diagonal matrices. The entry gives no reason. My guess: avoiding duplicate library code, keeping the cheaper diagonal product, and showing that overriding works.

**What is unclear**
- "The model's vocabulary": the set of operators the model's own code defines? "The model" isn't defined.
- "The library's scalar block": is it a block of code, a section of a library file, a trait? I can't tell without the repository.
- "Leaves … to": does the library already provide these operators, or is it meant to?
- "Its diagonal keeps its own product": "its" presumably means the model's. "Keeps" suggests the product already exists and must not be removed.
- "As the type system promises (row 299)": "promises" can mean the type system guarantees this today, or that it has committed to it without delivering yet, with row 299 tracking the gap. Which is meant?
- Is `mul` the method behind the product operator (juxtaposition), or a named method called directly?

---

## P-150: no resident compiler is built

**What to do or not do**
- Don't build a resident compiler, meaning a warm JVM that serves many Fortress commands the way Scala 2's `fsc` did.
- Put speed work into the checker itself (P-148).
- Don't take the idea up again unless something significant changes.

**What it decides, and why**
No resident compiler. The reason given: it would save little, because the suites already run in one JVM each, and the commands workers type took 6.4 % of their time, of which start-up was at most 1.8 %.

**What is unclear**
- "Unless something significant changes" sets no threshold. Would start-up passing some share of worker time count?
- What does the 6.4 % measure: wall-clock time of worker sessions? Over what period? Is the 1.8 % JVM start-up alone, or does it include loading the library?
- "Not attempted again" implies an earlier attempt. Was one built and dropped, or only studied?
- Scope: does this also rule out lighter measures, such as class-data sharing, a cached compiled library, or one JVM for a whole batch of commands? The entry names only a resident compiler.
- "So the speed work goes to the checker itself": I take the remaining 4.6 % to be mostly the checker's time, but the entry doesn't say so.

---

## Across the entries

- "He" and "his" (P-151, P-85) are never named; I assume the curator.
- P-85 says "no default" and then says fork 3 is built at a default.
- P-151's heading ("only" the team's forms) and its "Why" ("or where it is on the critical path") pull in different directions.
- P-148 puts the checker's speed right after correctness, but the project's measure is how fast compiled microGPT runs (compare P-66's "high performance"). The entries never say which comes first, the checker's speed or the compiled code's.
- P-55 (decided: the class loader computes a size's value at run time) and P-85's third question (open: a factory for a size known only at run time) cover overlapping ground. Neither says where the line between them falls.
- Many references point outside these seven entries: rows 299, 701, 773 and 774; review-queue items 30 and 188; PLAN item 13 and phase 3; P-87; array forks 1 and 3; climb batch 17; the batch manual; `compiler.md`; the team's Q&A. I can act on P-148 and P-150 without them; I can act on P-55, P-151 and P-85 only partly, and on P-88 mostly, apart from what "scalar block" and row 299 mean.
