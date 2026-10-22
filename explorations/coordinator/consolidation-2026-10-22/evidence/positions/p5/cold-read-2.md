# Cold read 2 of `p5/clean.txt`

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of `references/`, searched for terms: `compiler.md` (count stage, "The checker's time"), `gate.md`, `interpreter.md` (walk's checks at load), `library.md`, `records.md`, `exploring.md`, `specification.md` (the revision form), `session.md` (batch), `tests-writing.md`. Nothing else.

Terms that several entries use and that the skill does not define:

- **rung** (P-148, P-155, P-68). The skill never defines it. Folder names such as `explorations/compile-ladder/rung-inference-walk/` suggest one unit of work that lands on its own, but I cannot tell whether it is one commit, one agent's task, or one step of a batch. A project term I lack.
- **climb batch N** (P-151). `gate.md` names `climb-batch-` folders, and `session.md` defines a batch as "a run of other agents that build and test at the same time". I read a climb batch as one such run that lands through a gate. Inferred, not defined.
- **review queue, review-queue item N** (P-151, P-154). Not in the skill. I read it as a list of items waiting for the curator's ruling. I do not know where it is or what "holds X for his word" lets a worker do meanwhile.
- **PLAN, its phases, items and sections** (P-151, P-154, P-155, P-68). Not in the skill. I take it to be a plan file in the record, but the skill's list of the record's main files does not name it.
- **the distance to the switch-over** (P-154, P-155). Not defined. `SKILL.md` says the switch-over comes when the checker accepts the interpreter's library, and the count stage counts the checker's errors on that library, so I read the distance as that error count. Inferred.

---

## P-148: "The checker's speed comes right after its correctness in priority"

- **Decided:** Making the compiled checker correct comes first, and keeping it fast comes second. A unit of work that changes the checker also makes the change fast, in the same unit. Nobody has to come back later to speed it up by hand.
- **Applies:** Every change to the compiled checker (by `compiler.md`: its Scala under `scala_src/`, or `Fortress.ast` and its generators). Limits: the speed pass must not change which programs the checker accepts or refuses. The timing is a smoke test, one run of each tree (base and change), and it is meant to catch slowdowns of several times or of orders of magnitude. A small difference is noise, not a finding.
- **Requires:** Time the checker before and after the change. Make the change correct first, then make it fast in the same rung, keeping its results the same. Follow the steps in `compiler.md`, "The checker's time".
- **Unfinished:** Nothing. The procedure is written down ("Built in the `fortress-repo` skill").
- **Could not resolve:**
  - "rung": see above. A project term I lack.
  - "the time limit of the batch gate's count stage": `gate.md` lists the gate's steps, and none of them is a count stage, and it gives no time limit for one. So I cannot tell where that limit is or how large it is. Unclear wording, or a fact the skill does not have.
  - "without changing which programs the checker accepts or refuses": `compiler.md` counts as results more than accept or refuse. Each error's text and place count too, and so does the order of the output. Read alone, the entry is weaker than the skill. One reading is that a speed pass may change error texts; the other is that it may not, as the skill says. Unclear wording, a narrower summary than the procedure it points to.
  - "Built in the `fortress-repo` skill": "built" for a procedure in a skill, not for code, reads oddly. But the meaning is clear: the procedure is written.

## P-149: "An object that inherits an abstract functional method from one trait, and a body for it from a sibling trait, is refused unless it declares the method itself"

- **Decided:** Take `object O extends { A, B }`, where `A` declares `pick(self)` abstract and its sibling `B` gives `pick(self)` a body. `O` must declare its own `pick`. The body inherited from `B` does not count as implementing `A`'s abstract method, which is where Fortress differs from Scala. The same decision refuses a trait that declares one method both abstract and with a body, at the same parameter types.
- **Applies:** Functional methods (with `self` among the parameters) that an object inherits from sibling traits, one abstract and one with a body. On the compiled checker; walk already refuses the object at load, by the Meet Rule for Functional Methods.
- **Requires:** The compiled checker must refuse such an object. A worker must not add Scala's rule, even for convenience. A program meeting the case must give the object its own declaration of the method.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - "A trait that declares one method both abstract and with a body, at the same parameter types": I cannot picture it. Is it two declarations of the same name in one trait, one with no body and one with a body? Or a trait that inherits one and declares the other? And is it refused by the checker, by walk, or by both? The sentence has no subject. Unclear wording.
  - "the Meet Rule for Functional Methods": `interpreter.md` names it and points to `Specification/advanced/overloading.tex`, but gives no content. I cannot see why an abstract declaration and a body break a meet rule. A language concept I lack.
  - Possible tension: `interpreter.md` says walk refuses an object that inherits an abstract method "and does not define it", where "bodies define it if they are at or below its parameter types and together cover them". Read alone, that sentence suggests a sibling's body could define the method under walk. The entry says walk refuses. I read the Meet Rule refusal (`interpreter.md` line 39) as the one that applies, but I cannot confirm that from the skill. Unclear across the two texts.
  - "Welterweight calculus": only a name with a path. Enough as a citation.

## P-151: "Only the `where`-clause forms that the team wrote down are built"

- **Decided:** A `where` clause states conditions on static parameters and may introduce its own static variables (`where [\E\]`). Three forms are supported, because the team wrote them down:
  1. Conditional extension. A trait or object that extends a type under a `where` condition has that type only where the condition holds, and its members are checked assuming the condition.
  2. A condition on a function's or method's own static parameters, which bounds them.
  3. `AnyList`'s clause `comprises List[\E\] where [\E\]`, which becomes live. `AnyList`'s `addLeft` and `addRight` move into `List`.

  `SUM`'s fusion with `MAX`/`MIN` (the library's fast path for the maximum or minimum of sums) is kept. Its six type errors are cleared: four by a method's `where` condition, and two by the team's commented-out generic `distribute`, brought back after a measurement. The general rule: build a little-supported feature only where the team left enough design intent, or where it is on the critical path to running fast compiled.
- **Applies:** These three forms. Other `where` forms are not built.
- **Requires:** Support the three forms. Keep the fusion. Move `addLeft` and `addRight` into `List`. Do not build other `where` forms.
- **Unfinished:** (1) Moving `addLeft`/`addRight` into `List`. Climb batch 17 kept them in `AnyList` instead, against the curator's choice, and review-queue item 188 is waiting on him. (2) Scoping members to the condition: today a member checked under the condition can still be called where the condition fails (row 773). (3) Walk's half of conditional extension (row 774). (4) The code generator's half (row 701), after the switch-over (PLAN, phase 3).
- **Could not resolve:**
  - "AnyList's join `||`": the skill uses "join" only for the least common supertype. Here it seems to mean the operator `||` (concatenation?). It could also be read as "the type join that `||` computes". Unclear wording.
  - "respelled under the live clause": I cannot tell what was respelled or how. Unclear wording.
  - "review-queue item 188 holds that for his word": "that" could be batch 17's departure (so the move is decided, and only whether to accept the departure waits) or the move itself (so a worker should not move them yet). A worker cannot tell whether to make the move now. Unclear wording, and it decides what a worker does.
  - "after the switch-over": it could attach only to the code generator's half (row 701), or to walk's half as well. Unclear wording.
  - Which `where` forms are *not* built, and what a worker does on meeting one (refuse it, record a gap, ask the curator)? The title says "only", but the entry does not list what is left out. Unclear limit.
  - "`distribute`, after a measurement": what was measured (speed? an error count?) and what the measurement had to show is not said. `distribute` itself is not explained. Unclear wording.
  - "fusion": readable as an optimisation that combines `SUM` and `MAX` into one pass, but the skill does not define it. Inferred.
  - "climb batch", "review-queue item", "PLAN": see above.

## P-152: "Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction"

- **Decided:** For two generic declarations, exclusion is judged over the whole tuple of parameter types, not parameter by parameter. Example: `o[\T\](x: P[\T\], b: Box[\T\])` and `o[\T\](x: Q[\T\], b: Box[\T\])`, where `P[\T\]` excludes `Q[\T\]` only at the same `T`. No single parameter excludes its counterpart. But `b` forces the same `T` in both, because no value is a `Box` of two types, so no argument fits both declarations. The pair therefore excludes. The same holds with a generic trait in `Box`'s place. The pair is then judged by the overloading rules of P-45.
- **Applies:** Pairs of declarations with static parameters, on both walk and the compiled checker. It rests on the rule that no type extends two instantiations of one generic trait (`SKILL.md`).
- **Requires:** Both paths read such pairs as excluding. A worker must not fall back to a check that only compares parameters one by one.
- **Unfinished:** (1) Walk refuses such a pair at load when one declaration has a `where` clause, though the checker accepts it (row 787). (2) Walk treats an object type over a static parameter (`Box[\T\]`) as excluding a type it equals at some instance (`Box[\ZZ32\]`), so it loads a pair that the checker refuses (row 788).
- **Could not resolve:**
  - "existential reduction": the skill does not define it. The example lets me follow the idea: some `T` must make both match. I could not apply it to a new case on my own. A language concept I lack, though the entry partly makes up for it.
  - "excludes ... only at the same `T`": I read it as "`P[\T\]` and `Q[\U\]` exclude when `T = U`, and may overlap otherwise". Clear enough.

## P-154: "A list is ordered only where its element type is totally ordered"

- **Decided:** The library's `List` has its lexicographic order only where its element type extends `StandardTotalOrder` (conditional extension, P-151). Floats and `QQ` are only partially ordered: NaN, and `QQ`'s 0/0, compare with nothing. So on the compiled checker a list of floats or of `QQ` has no `<`, `CMP` or other comparison, though `=` still works. A pair (tuple) of floats stays ordered; the curator accepts that mismatch. The rule for tuples is not decided here. No lexicographic trait over partially ordered elements is added now.
- **Applies:** `List` on the compiled checker. It does not apply to tuples (review-queue item 213) or to walk yet.
- **Requires:** Do not give lists of partially ordered elements an order. Do not add a partial-order lexicographic trait. Do not change the tuples' rule here.
- **Unfinished:** (1) Walk's half: walk still orders every list (row 774; PLAN, phase 3, item 19). (2) A revision note at the two sentences of the specification that order every list (`advanced-lib/algebraic-constraints.tex:519-522`, `basic/operators/opr-overview.tex:293-295`).
- **Could not resolve:**
  - "`StandardTotalOrder`": not in the skill. I read it as a library trait for total orders. Inferred from the name.
  - "a revision note": `specification.md` speaks of the revision form (an Appendix I entry and a `\revision` callout) and of `\note{}` boxes. I cannot tell whether "revision note" means the full revision form, only the callout, or a `\note`. Unclear wording.
  - "the distance to the switch-over", "review-queue item 213", "PLAN, phase 3, item 19, the next batch's candidates": see above.

## P-155: "The compiled checker checks the overloads of symbolic operators before the switch-over"

- **Decided:** Today the checker's overloading check reads an operator only if its name is a word of capitals (such as `MAX`). So `+`, `^`, `||`, the subscripts and the other symbolic operators go unchecked. That is a known gap, not a rule. The check must read them by the same rules as any function, so that the switch-over is reached with them checked.
- **Applies:** The compiled checker's overloading check, before the switch-over.
- **Requires:** Extend the check to symbolic operators. Before each rung, bring each design the check needs to the curator, with the probe's measurement (`perf-probes/symbolic-operators-2/REPORT.md`). Two cases need a design: (1) the subscripts, possibly with a bound on the index type that keeps ranges out; (2) the arrays' `+` of a vector and a number beside `+` of two vectors, by vectors that stop being additive groups or by dropping the scalar `+` and `-`. Build none of the designs before the curator answers.
- **Unfinished:** The check and its rungs (row 584; PLAN, "Pavol's answers", item 38 for the order of the work, item 59 for the candidate designs and the coordinator's proposed defaults).
- **Could not resolve:**
  - "Pavol": a person named nowhere in the skill. The skill speaks only of "the curator". I guess Pavol is the curator, but nothing says so, and `records.md` says the record names nobody. Unclear wording.
  - "the coordinator's proposed defaults": "coordinator" is not defined in the skill, which names only the curator and workers. Inferred from `explorations/coordinator/`, but who or what proposes defaults is unclear.
  - "a bound on the subscripts' index type that keeps ranges out": I take it to mean making the two subscript operators exclude each other by keeping range types out of the index parameter. The entry does not say what the two subscript operators are. Readable only by inference.
  - "rung", "PLAN", "the distance to the switch-over": see above.

## P-66: "The integer principle"

- **Decided:** Java's and the JVM's defaults stay where they make sense. They are corrected where they fail high performance or mathematical precision. A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do. Where the JVM prevents a correct implementation, the project accepts the JVM's behaviour for now. Julia, X10, Swift and Rust are the languages to compare with.
- **Applies:** Integer behaviour, judging by the title. The body also cites rounding, so the principle may cover number behaviour in general. Limits: what the JVM cannot do correctly is postponed.
- **Requires:** Before keeping or changing a Java default, judge it on performance and precision. Give a hardware behaviour its own operator rather than making it the default. Compare with the four named languages.
- **Unfinished:** Not stated.
- **Could not resolve:**
  - "The team did so with rounding": which rounding (integer division, float-to-integer conversion, float rounding modes), and what the team did (kept the default, or corrected it)? Unclear wording.
  - Scope: the title says "integer", but the rounding example may be about floats. Does the principle also govern the float types? Unclear limit.
  - "saturating operators": `library.md` names the wrapping operators but not saturating ones. A language concept I could not find in the skill.
  - No status and no reason are given, unlike the other entries. I cannot tell whether anything is still to build.

## P-68: "On the float types, `floor` and `ceiling` return the same float type, while the brackets ... return `ZZ`"

- **Decided:** On the float types, `floor` and `ceiling` return a value of the same float type (`floor(2.5)` is `RR64` 2.0). The brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer (⌊2.5⌋ is to be `ZZ` 2).
- **Applies:** The float types, in every declaration of these operations in the library.
- **Requires:** Keep `floor` and `ceiling` returning the float type. When the later rung comes, make the brackets, `round` and `truncate` return `ZZ` in every declaration, after first counting the interpreter tests whose output changes.
- **Unfinished:** The brackets, `round` and `truncate`. Today the brackets return `ZZ64` under walk and `RR64` compiled, and `round` and `truncate` return `ZZ64`, `ZZ` or `RR64` depending on the declaration (row 330). One library rung after the switch-over (PLAN, phase 4).
- **Could not resolve:**
  - "first counts the interpreter tests whose output changes": why count, and what happens with the count? Is it a gate (stop and ask the curator if it is large), a point to report, or only a measurement? Unclear wording.
  - "rung", "PLAN, phase 4": see above.
