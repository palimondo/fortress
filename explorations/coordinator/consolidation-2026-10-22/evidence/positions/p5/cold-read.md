# Cold read: positions p5 (P-148, P-149, P-151, P-152, P-154, P-155, P-66, P-68)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` (looked up: `compiler.md` "The checker's time" and the count stage, `interpreter.md` "What walk checks", `exploring.md` "Weighing the sources", `gate.md`, `library.md`, `records.md`, `specification.md`). Not read: the record, git, any report, `revival-changes.md`, `sources.md`.

Terms that recur and that the skill does not define, listed once here and referred to below:

- **rung**: the skill uses it only in folder and test names (`rung-inference-walk`, `...RungC.fss`) and says the compile ladder records how far test programs get through the phases. From the entries' use I read a rung as one unit of work that is landed through the gate. Unclear wording (project term, not defined in the skill); the reading is likely, not certain.
- **PLAN** (with "phase 3", "phase 4", "item 19", "Pavol's answers"): not among the record files that the skill lists (POSITIONS, FACTS, INDEX, gap ledger). I take it to be a plan file in the record, but cannot locate it from the skill. Unclear wording (missing pointer).
- **review queue / review-queue item N**: not in the skill. Unclear wording (missing pointer); I read it as a list of items awaiting the curator.
- **distance to the switch-over**: the skill defines the switch-over (the checker accepts the interpreter's library) and the count stage (the checker's errors over that library). I read the distance as that error count. Inferable, not defined.
- **P-26, P-45, P-67**: cross-references to other positions. Each entry glosses P-26 well enough ("the later word outweighs the early text"); P-45 is glossed only as "the 2011 paper's model"; P-67 is glossed well enough. Not a blocker.

---

## P-148: the checker's speed comes right after its correctness

**Decided:** A piece of work that changes the compiled checker has to make its change fast as well as correct, and has to do both before it lands. Correctness comes first. Then the same piece of work speeds up its new code without changing what the checker accepts or refuses. No speed-up is left for later.

**Applies:** To every rung that changes the compiled checker. `compiler.md` "The checker's time" narrows that to the checker's Scala under `scala_src/`, `Fortress.ast` and the astgen generators. The timing is a smoke test: one run of the base tree and one of the changed tree. It is meant to catch a slowdown of several times or more. A small difference counts as noise.

**Requires:** Time the checker before and after the change, then make the change correct, then make a second pass for speed in the same rung, keeping the accepted and refused programs the same. Follow the steps and commands in `compiler.md`, "The checker's time": the count stage for `base`, `change` and `pass`, a profile, an audit of any memo, and the report's contents.

**Unfinished:** Nothing. The procedure is built in the skill.

**Could not resolve:**
- "rung": see the list at the top (unclear wording).
- "the gate's time limit kept rungs from landing": `gate.md` gives a running time of about 25 minutes and per-program `timeout`s in the atomic runs, but no time limit for the gate as a whole. I cannot tell which limit is meant (unclear wording, or a missing pointer).
- "a manual step after the landing": I take this as "a separate later step". I cannot tell whether "manual" means done by the curator, done by hand, or just done later (unclear wording, minor).
- "Some slowdown is fine" against "catch a slowdown of several times": the entry does not say what slowdown, if any, blocks a landing once the second pass has been made, or whether a slowdown found has to be removed or only reported. `compiler.md` says to report what you saw without analysing it. So the threshold for action is unstated (unclear wording).
- "without changing which programs the checker accepts or refuses" is narrower than `compiler.md`'s "results", which also include each error's text and place, and the order of the output. I follow the skill's stricter reading, but the entry alone could be read as allowing error texts to change (two readings).

## P-149: an inherited abstract method beside a sibling's body needs the object's own declaration

**Decided:** Suppose an object extends two traits, one declaring a functional method abstract and the other giving that method a body. Then the object must declare the method itself, or it is refused. The sibling's body does not implement the abstract declaration, unlike in Scala. A trait that declares one method both abstract and with a body, at the same parameter types, is also refused.

**Applies:** To an object that extends sibling traits `A` and `B` (I read "sibling" as: neither extends the other), where `A` has `pick(self)` abstract and `B` has `pick(self)` with a body. It holds on the compiled checker and on walk, which already refuses at load. The spec's text and Welterweight support it.

**Requires:** In such an object, a worker declares the method in the object itself. A worker must not rely on the sibling's body, and must not write a trait with both an abstract declaration and a body of one method at the same parameter types.

**Unfinished:** Nothing ("Built").

**Could not resolve:**
- Limits not stated:
  - whether the rule also covers dotted methods (the headline says "functional method");
  - whether it covers generic objects and object expressions;
  - what happens when `B`'s body is at narrower or wider parameter types than `A`'s abstract declaration;
  - whether "sibling" excludes the case where `B` extends `A`. There `B`'s body would presumably override.

  The example has only the same signature (unclear wording, scope).
- "as walk already does at load": `interpreter.md` says walk refuses an object *without static parameters* that inherits an abstract method and does not define it, where "bodies define it if they are at or below its parameter types and together cover them". On a cold reading, that sentence could count `B`'s inherited body as defining `pick`, which would contradict the entry. I cannot tell whether walk's "define" means "the object itself declares" (two readings across the entry and the skill). Walk's check is also limited to objects without static parameters, and the entry does not say whether the compiled checker's refusal has the same limit.
- "the earlier and the later designers' choices": I read these as the specification's authors and the type group of `exploring.md`. Inferable, not stated.

## P-151: only the `where`-clause forms that the team wrote down are built

**Decided:** Three `where` forms are supported:
- conditional extension: a trait or object is a subtype of a type only where the condition holds, and its members are checked under that condition;
- a method's `where` condition, which bounds its static parameters;
- `AnyList`'s `comprises List[\E\] where [\E\]` clause, made live from the team's commented-out code. The rest of `AnyList`'s operations then move into `List`.

No other `where` forms are built. The `SUM`/`MAX`/`MIN` fusion stays. The team's commented-out generic `distribute` is the candidate fix for the fusion's last two type errors.

**Applies:** In the compiled checker and the library. The rationale is that a feature with little support in the team's work is built only where the team left enough design intent, or where it is on the critical path to fast compiled code.

**Requires:** A worker builds no `where` form beyond the three. Members of a conditional extension are checked with the condition holding. (`compiler.md` adds that the code generator still refuses a method with its own `where` clause, which matches row 701 below.)

**Unfinished:**
- moving the rest of `AnyList`'s operations into `List`. Climb batch 17 instead "respelled" them within `AnyList`, a default that waits for the curator (review-queue item 188);
- scoping the members to the condition: today a member checked under the condition stays callable where it fails (row 773);
- walk's half of conditional extension (row 774);
- the code generator's half (row 701), after the switch-over (PLAN, phase 3).

**Could not resolve:**
- `where [\E\]` in `AnyList comprises List[\E\] where [\E\]`: a `where` clause that only names a static parameter. The skill does not explain this form; I read it as binding `E` for the comprises clause (language concept I lack).
- "a method's condition": I cannot tell whether a top-level function's `where` clause is included or excluded (scope unclear).
- "the rest of `AnyList`'s operations": the rest beyond what? Those not already in `List`, or those other than the comprises clause (unclear wording).
- Why the `SUM` fusion with `MAX` and `MIN` is in this entry: the entry says it "stays", as if it were an exception to "only the forms the team wrote down", but it does not say which `where` form the fusion uses or why it qualifies (unclear wording).
- "`distribute` is measured as the fix": has it been measured, or is it to be measured? With what result? Is it to be built? It does not appear in "still to build" (two readings).
- "respelled within `AnyList` instead": I cannot tell what was respelled, the operations or their signatures (unclear wording).
- "review-queue", "climb batch 17", "PLAN, phase 3, the `where` clauses' line": see the list at the top. Climb batches appear in the skill only as gate folders.

## P-152: exclusion of two generic declarations over their whole parameter types, by existential reduction

**Decided:** When two generic overloads have static parameters, their parameter types are judged for exclusion together, not one parameter at a time. In the example, `P[\T\]` and `Q[\T\]` exclude only at the same `T`, so neither parameter excludes alone. But `b: Box[\T\]`, with `Box` an object, fixes one `T` for both declarations, so no argument tuple fits both, and the pair excludes. Walk and the compiled checker both read the pair that way, then apply the overloading rules (P-45) to it.

**Applies:** On both paths, to pairs of generic declarations. It follows the type group's 2011 paper (`Papers/Types/exc-reduction.tick`) and the revised spec's "Declarations with Static Parameters".

**Requires:** A worker treats such a pair as excluding and does not demand that some single parameter exclude alone.

**Unfinished:**
- Walk refuses such a pair at load when one declaration has a `where` clause, though the checker accepts it (row 787).
- Walk wrongly takes `Box[\T\]` to exclude `Box[\ZZ32\]`, which it equals at `T = ZZ32`. So walk loads a pair that the checker refuses (row 788).

**Could not resolve:**
- "existential reduction": the entry shows it only through the example and does not state the general rule. The skill does not define it (language concept I lack). I can follow the example, but not decide a case unlike it.
- "But `Box` is an object": is being an object (a leaf) necessary for fixing `T`, or just true of the example? `SKILL.md` says no type may extend two instantiations of one generic trait. By that rule a generic *trait* `Box` would also fix `T`, so I cannot tell whether the entry means to exclude traits (two readings).
- "P-45, the 2011 paper's model": what the overloading rules are, beyond the skill's summary (No Duplicates, Meet, return type), is not given here (cross-reference).

## P-154: a list is ordered only where its element type is totally ordered

**Decided:** The library's `List` has a lexicographic order only under a conditional extension whose element type extends `StandardTotalOrder`. Floats and `QQ` are partially ordered (NaN and 0/0 compare with nothing), so on the compiled checker a list of floats or of `QQ` has no `<`. A pair of floats stays ordered, a mismatch the curator accepted. No lexicographic trait over partially ordered elements is added now.

**Applies:** To `List` in the library, as the compiled checker sees it. Walk still orders every list. The basis is the team's later code (`Fortress.PartialTotalOrders.fss:117-140`), which bounds both lexicographic traits by a total order, and conditional extension (P-151).

**Requires:** A worker must not add a lexicographic order over partial orders, and must not rely on `<` over a list of floats or `QQ` on the compiled path. The pair-of-floats order is not to be generalised.

**Unfinished:**
- walk's half: walk still orders every list (row 774; PLAN, phase 3, item 19);
- a revision note at the two spec sentences that order every list (`advanced-lib/algebraic-constraints.tex:519-522`, `basic/operators/opr-overview.tex:293-295`).

**Could not resolve:**
- "it is not a rule for tuples": it could mean "the pair-of-floats order is no precedent: do not order tuples over partial orders", or "this entry's list rule does not extend to tuples, so tuples keep their order" (two readings).
- "has no `<`": I cannot tell whether only `<` goes or the whole order (`<=`, `>`, `CMP`, `MAX` over lists). I assume the whole lexicographic order, but only `<` is named (unclear wording, minor).
- "a revision note": I read it as the callout of `specification.md`'s procedure. Inferable.
- "the next batch's candidates": see PLAN at the top.

## P-155: the compiled checker checks the overloads of symbolic operators before the switch-over

**Decided:** The checker's overloading check must cover symbolic operator names (`+`, `^`, `||`, the subscripts and others), by the same rules as for any function. Today it covers only all-capitals names such as `MAX`. The switch-over's count must reach zero with these operators checked, because a zero without them would hide errors the team knew of.

**Applies:** To the compiled checker, before the switch-over. The skip is a known gap, not a rule (`future.tex:186-207` calls the subscript pair "not really a valid overloading").

**Requires:**
- Extend the check to symbolic operators.
- Before each rung, bring each design that the check needs to the curator, with the probe's measurement. The probe is `perf-probes/symbolic-operators-2/REPORT.md`, with two designs: bounding the subscripts' index type so that it excludes ranges, and `+` of a vector and a number beside `+` of two vectors.
- Do not declare the switch-over with them unchecked.

**Unfinished:** The check and its rungs (row 584; PLAN items 38 and 59).

**Could not resolve:**
- "the distance to the switch-over reaches zero": see the list at the top (inferable).
- "the arrays' `+` of a vector and a number beside `+` of two vectors": I cannot tell what the design is, whether to keep both overloads and make them exclude, drop one, or something else. The entry names the case, not the design (unclear wording; the pointer is to the probe's report, which I may not read).
- "a bound on the subscripts' index type that keeps ranges out": I take it that today the index overload and the range overload overlap. Inferable, not stated.
- "PLAN, 'Pavol's answers'": "Pavol" is not defined in the skill. I assume it is the curator's name (missing definition), and PLAN is unlocated (see the top).
- "Each design that the check needs is brought to the curator before its rung": I cannot tell whether a worker may build a design whose default is already written in PLAN item 59 ("the designs with their defaults") or must wait for a fresh answer (two readings).

## P-66: the integer principle

**Decided:** For integer semantics, Java's and the JVM's defaults are kept where they make sense and corrected where they fail high performance or mathematical precision. It is a way of weighing choices, not a rule that decides cases. Examples:
- rounding: the spec rounds a rational's exact half to even, unlike Java's `Math.round`, and P-67 extends that to floats;
- a hardware behaviour that bytecode can express gets its own explicit operator, like the spec's wrapping and saturating operators;
- where the JVM prevents a correct implementation, the project accepts the JVM's behaviour for now.

The peers to compare with are Julia, X10, Swift and Rust.

**Applies:** To each choice of integer semantics, as the curator weighs it. By the rounding example, that includes conversion to integers.

**Requires:** I infer that a worker who meets an undecided integer-semantics choice brings it to the curator, weighed by this principle and compared with the four peers. The entry does not say what a worker does.

**Unfinished:** None stated.

**Could not resolve:**
- What a worker must do: the entry speaks only of how the curator weighs, so I cannot tell whether a worker may apply the principle to settle a choice, or must always bring it to the curator. `exploring.md`'s four conditions would leave some choices to the worker (unclear wording).
- "make sense" and "fail high performance or mathematical precision": no test for when a default fails is given. This is intended ("decides no case by itself"), but it leaves the principle open to judgement.
- "gives way for now": I read it as "accepts the JVM's limit until it can be lifted". The cases are not named (unclear wording, minor).
- Scope: "integer semantics", while the example is rounding of rationals and floats. I cannot tell whether non-integer number semantics are in scope (unclear wording, minor).

## P-68: `floor` and `ceiling` keep the float type; the brackets, `round` and `truncate` return `ZZ`

**Decided:** On the float types, `floor(x)` and `ceiling(x)` return the same float type (`floor(2.5)` is the `RR64` value 2.0). The brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer (⌊2.5⌋ is the `ZZ` value 2).

**Applies:** On the float types (`RR32`, `RR64`). `floor` and `ceiling` are built that way. The rest waits for after the switch-over.

**Requires:** After the switch-over, one library rung does three things. It first counts the interpreter tests whose output changes. It then makes the brackets, `round` and `truncate` return `ZZ`, and tidies the library's own `truncate` and `round` to match. Until then, I infer, a worker leaves the brackets as they are: `ZZ64` under walk and `RR64` compiled (row 330).

**Unfinished:** That library rung (row 330; PLAN, phase 4).

**Could not resolve:**
- "tidies the library's own `truncate` and `round` to match": I cannot tell how these differ from the `round` and `truncate` that the same sentence already makes return `ZZ`. They might be the library's declarations on other types (`QQ`, integers), its internal helper functions, or its call sites (unclear wording).
- What `round` and `truncate` return today, on each path: only the brackets' current types are given (unclear wording, minor).
- Whether `QQ` follows the same split: the entry is limited to "the float types" (scope unclear, minor).
- Whether "one library rung" must be a single rung, or is just the expected size (unclear wording, minor).
