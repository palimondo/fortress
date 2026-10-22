# Cold read 2 of `facts/f4/clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (not `revival-changes.md` or `sources.md`). Nine entries, all facts: F-52 to F-61, and F-63 (there is no F-62 in the file).

A pattern across the entries: paths are written in two ways. Most are relative to `explorations/` (`reviews/...`, `compile-ladder/...`, `perf-probes/...`), and some carry the prefix (`explorations/coordinator/tools/distance/classify.py`). Test paths are relative to `ProjectFortress/` (`tests/...`, `compiler_tests/...`). I could resolve each one, but the reader has to guess the root every time.

---

## F-52 "Neither path can use `RationalQuantity` as the specification declares it"

**Established:** The specification's advanced numbers chapter declares a rational type, `RationalQuantity`, with `bool` static parameters for its sign, its infinities and NaN. Its declaration is a trait that, under a `where` clause, extends instantiations of itself whose flags are weaker. Neither path can use that declaration. The compiled checker refuses it with "Cyclic type hierarchy: Type RationalQuantity transitively extends itself". Walk loads it, but fails once a program instantiates the trait.

**Conditions:** This is the declaration exactly as the chapter writes it, which the team's `ProjectFortress/tests/conditionalExtension.fss` copies. That test passes under walk only because it never instantiates the trait, so its passing proves nothing about the trait.

**Consequence:** A worker cannot write the specification's `RationalQuantity` on either path. Getting it to work needs the checker to accept a trait that extends its own instantiations under `where`, and walk to instantiate one. A worker should not take the green `conditionalExtension` test as evidence that the form works.

**Evidence:** Probes `reviews/flattening-questions-ways/Q3*.txt`, removed by commit `84aef6a4f` and still readable in its parent commit. Detail: `reviews/flattening-questions-ways.md`, "Question 3", section 2. No gated test or ledger row is named.

**Could not resolve:**
- "the note's probes": which note is meant? Probably the detail note, `reviews/flattening-questions-ways.md`, but it is named only after this phrase. Unclear wording.
- "with weaker flags": I could not tell which way "weaker" runs, for example whether the flag "may be NaN" set to true is the weaker one. So I do not know which instantiation extends which. The skill does not cover it, so this is a language concept I lack. It does not block the consequence.
- "fails under walk": the entry does not say how, whether a refusal at load, a failed dispatch or a crash, or with what message. Unclear, because the detail is missing.
- No test pins either failure, and no ledger row is cited, although `records.md` says a defect gets a row and a fact names its test, or else its command and output. I could not tell whether the defect is recorded anywhere beyond this entry. Missing information, not a wording problem.

---

## F-53 "At the last landed gate, the distance to the switch-over is 5 errors and the checker count is 3."

**Established:** At the most recent landed gate, the distance is 5 and the checker count is 3.
- *Distance:* the compiled checker's distinct errors over the interpreter's library, meaning its twelve apis and their twelve components. Every stage of each unit runs whatever the earlier stages reported, and each error gets a root-cause class (F-54). The five errors are:
  1. one export error, where the `FortressLibrary` component does not match its api (class X1);
  2. and 3. two `BIG MIN` sites under ledger row 731 (class BR);
  4. a row-731 site at `List.fss:146` (class OT);
  5. the "fused arm" of `__bigOperator2` (class OT). `__bigOperator2` is the library's function for two nested big operators, and no desugaring calls it. Its `typecase` arm returns an `I0` where an `O0` is declared (row 632; PLAN, "Pavol's answers, in the order they are needed", item 46; review-queue item 40).
- *Checker count:* covers only the `FortressLibrary` component and the apis it imports, and each unit stops at its first failing stage. Nothing crashes (F-233), so the 3 are that component's type errors: the fused arm and the two `BIG MIN` sites. Every api counts 0.

**Conditions:** These values hold at the last landed gate. A rise in either number is reported but does not turn a gate red by itself. The count stage can still turn the gate red on the faults F-66 lists, such as a crash that no rung declared (P-39).

**Consequence:** A rung measured by either number uses the last landed gate's tables as its baseline:
- that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`;
- the per-site list `compile-ladder/gate/distance-sites.tsv`.

`references/batch.md` in the `coordinator` skill has the procedure.

**Evidence:** The landed gate tables named above. The entry names no test, and none is expected for a gate measurement.

**Could not resolve:**
- "two `BIG MIN` sites of row 731": I could not tell whether these are places inside `BIG MIN`'s own body or call sites of `BIG MIN`. F-54 defines BR as "a big operator's body", which suggests the body, but the entry never says so. Unclear wording.
- Why the row-731 site at `List.fss:146` is OT and not BR, when the other row-731 sites are BR. My guess is that BR covers only errors inside a big operator's own body, and `List.fss:146` is an ordinary body. The entry does not say. Unclear wording.
- The OT clause is a comma list inside a comma list: "and in class OT, the other body errors, row 731's site at `List.fss:146` and the fused arm of `__bigOperator2`, the library's function for ..., which no desugaring calls: its `typecase` arm ...". I had to count to five to be sure that "the other body errors" labels OT and is not a sixth item. Unclear wording.
- "fused arm": not defined. I take it to be the `typecase` arm that handles the two nested operators fused into one, but that is a guess. The term is local, not in the skill. Unclear wording.
- `I0` and `O0`: presumably `__bigOperator2`'s static parameters (input and output?). They are not explained, but the point, that the arm returns the wrong type, still comes through.
- "Nothing crashes now (F-233), so its 3 are ...": the "so" implies that a crash would change which errors are counted, but the entry does not say how. Unclear wording, minor.
- Why the export error (X1) is not in the checker count. I infer that the export check is a stage after type checking, so the component stops at its type errors before reaching it. The entry does not say. Unclear wording.
- Two small tensions with the skill:
  - SKILL.md says the checker count "counts the errors up to each component's first error". This entry says "each unit stops at its first failing stage", and its count of 3 errors in one component only makes sense under the entry's reading.
  - SKILL.md says the count stage "runs the compiled checker over the interpreter's library". This entry says it checks only `FortressLibrary`.

  I followed the entry. A worker who reads only the skill would be misled.
- "PLAN, 'Pavol's answers, ...'": I took Pavol to be the curator, but the skill never names the curator.

---

## F-54 "The gate classes the distance to the switch-over by root cause."

**Established:** Each gate's `distance.txt` has `#class` rows that count the distance's errors by root-cause class. The classes include X1 (an export error), BR (a big operator's body) and OT (other body errors). `explorations/coordinator/tools/distance/classify.py` assigns the classes. The last gate's `distance.txt` reads `#crash none`: the checker gets through the whole `FortressLibrary` component, `Array3`'s body included, without crashing (F-233).

**Conditions:** The class names are those that `classify.py` assigns. "Such as" implies there are other classes as well. The no-crash state is that of the last gate.

**Consequence:** To find which root cause a change of the distance belongs to, read the `#class` rows. F-53 gives the current counts by class. A worker can rely on the checker reaching the end of `FortressLibrary`, including `Array3`.

**Evidence:** The gate's `distance.txt` and `classify.py`. Detail: `perf-probes/prelude/distance-triage.md` section 2. No test is named.

**Could not resolve:**
- "OT for the other body errors, one-off library slips and checker limits": this reads two ways.
  1. OT is the other body errors, and those are the one-off library slips and checker limits.
  2. OT holds three kinds: other body errors, one-off library slips and checker limits.

  Either way, all three go in OT. What I cannot tell is whether "slips" and "checker limits" are inside the body errors or beside them. Unclear wording.
- Which classes exist beyond these three is not said, because of "such as". A worker who meets an unlisted class has to read `classify.py`.

---

## F-55 "Static arguments are inferred with coercion on both paths"

**Established:** Both paths let coercion take part when they infer a call's static arguments. The compiled checker works from the arguments' static types and the expected type. Walk works from the arguments' run-time types. So a call whose arguments have different widths infers the narrowest type that all of its arguments convert into, as P-74 decides.
- Under walk, a typed binding converts the call's result after the call, and has no effect on the call's static arguments. In `a: BoxK[\ZZ64\] = wrapK(3)`, walk infers `T` from `3` as `Int` and then refuses the binding, because no coercion converts a `BoxK[\Int\]` (row 510).
- On the compiled path, a static parameter with no written bound is bounded by `Object`, not `Any` (row 412). So a parameter that nothing fixes becomes `Object` there (F-78).

**Conditions:** F-73 gives the checker's exact rule, F-137 walk's, and F-87 the places where the checker has an expected type. Walk's typed-binding limit is about calls. The skill says separately that walk does use the declared type for reductions and comprehensions.

**Consequence:** Under walk, a typed binding cannot fix a generic call's static argument. Write the static argument, or pass an argument of the wanted type. On the compiled path, expect `Object`, not `Any`, for an unfixed unbounded parameter.

**Evidence:** Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

**Could not resolve:**
- `Int` in "infers `T` from `3` as `Int`" and `BoxK[\Int\]`: `Int` is not a Fortress type in the skill. Only F-57, later in the file, says that walk prints `ZZ32` as `Int`. Read alone, this entry uses walk's printed name where it means the type `ZZ32`. Unclear wording.
- "is refused": I take it as refused at run time, at the binding, but the entry does not say when or with what message. Unclear wording, minor.
- The entry does not say what the compiled checker does with the same `BoxK` line. Since the checker uses the expected type, I guess it infers `ZZ64` and accepts it, but that holds only if a typed binding is one of F-87's contexts, which I cannot see. Missing information.
- "the compile path" means the compiled path. A small inconsistency of wording.

---

## F-56 "The compiled checker keeps the expected type, for inferring the call's static arguments, at a call written `f(x)`"

**Established:** At a call written `f(x)`, the compiled checker passes the expected type on to the inference of the call's static arguments. It does the same at a method call and at an operator. The parser builds `f(x)` as a tight juxtaposition, `f` next to `(x)` with no space. The branch for `fnApp = true` at `scala_src/typechecker/impls/Operators.scala:88-90` is reached only by juxtapositions that desugarings create, never by a call the programmer writes.

**Conditions:** This holds for the compiled checker. F-87 lists the other contexts that keep the expected type.

**Consequence:** Changing how a written call `f(x)` is inferred is not done by editing the `fnApp = true` branch alone, because that edit has no effect on such a call. Look for the path a written tight juxtaposition takes.

**Evidence:** Gated by `compiler_tests/InferCoercionShapes`. Detail: `reviews/numerics-plan-coordinator/measure-D.md` section 1.

**Could not resolve:** Nothing that blocks. The entry does not say which code path a written `f(x)` does take, but it does not claim to.

---

## F-57 "A numeral's type depends on the path and on the library in scope"

**Established:**
- *Generic code:* only three ways give a value of type `T` on both paths:
  - the getters `x.zero` and `x.one`;
  - the "witness `typecase`": a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78).
- *How each path types a numeral:*
  - The compiled checker gives a numeral the type `IntLiteral` or `FloatLiteral`, by whether it has a radix point. What those types are depends on how the builtin library in scope declares them (F-79).
  - Walk gives an integer numeral `ZZ32`, `ZZ64` or `ZZ` by its size, and prints these as `Int`, `Long` and `BigNum`.
- *Behaviours:*
  - With `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk. No coercion from a numeral into an arbitrary such `T` can be declared, because a generic coercion is refused as a cyclic hierarchy.
  - A numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454).
  - Neither path refuses an out-of-range numeral statically. A compiled run raises `Not in range for ZZ32` at run time. Walk refuses the numeral when it runs, at the typed binding that it does not fit (row 325).
  - Walk, against the specification, refuses a numeral beyond `ZZ32`'s range bound to `RR64`, which should hold the float (row 443).

**Conditions:** The checker's typing depends on which builtin library is in scope. Part of the evidence was measured before "the numeral switch" (F-79). The claim about `x.zero` comes from reading the code, not from a measurement.

**Consequence:**
- In code generic over a number type, do not write a numeral where a `T` is wanted. Use `x.zero` or `x.one` on a value at hand, or a witness `typecase`.
- Under walk, convert explicitly for `NN32`, `NN64` and `RR32` (for example `unsigned(5)`, as `tests-writing.md` says).
- Do not expect a compile-time error for an out-of-range numeral.

**Evidence:** Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2; ledger rows 454, 325 and 443. No gated test is named for any part of the entry, and none of it gives a command and its output in place of a test.

**Could not resolve:**
- "measured before the numeral switch (F-79)": the entry does not say what the switch changed, or which of its claims the earlier measurement supports. If the switch is what made numerals `IntLiteral`/`FloatLiteral` in the checker, then the checker-side claims may not have been re-measured since: `x + 1` failing, `1.5` to `RR32` failing on both paths, and the compiled `Not in range` raise. I cannot tell which claims are current measurements and which are carried over. Unclear wording, and it matters for trusting the entry.
- "a `typecase` over a function of type `() -> T`": I do not know how a `typecase` dispatches on a function value's arrow type, or how the clause for each number type is written. The skill mentions `typecase` only as a construct that walk evaluates itself. This is a language concept I lack. The entry points to P-78, which I am not allowed to read.
- "the getters `x.zero` and `x.one`": this suggests a value `x` of type `T` must already be at hand. The entry does not say what to do in generic code that has none, apart from the witness `typecase`. Unclear wording, minor.
- "a generic coercion is refused as a cyclic hierarchy": I accept the claim, but I cannot see why a `coerce` into a type parameter makes a cycle. This is a language concept I lack. It does not block the consequence.
- "as the builtin library in scope declares those types": I take "builtin library" to mean the compiler's prelude (`CompilerBuiltin`) or the interpreter's `FortressBuiltin`, depending on the command. The entry does not say which is in scope when. Unclear wording.

---

## F-58 "When measured, on an earlier library, microGPT's flat program, C4, had 26 errors of its own under the compiled checker"

**Established:** On an earlier library, the compiled checker reported 26 errors in C4's own code, and none of them came from a numeral's type:
- 15 arrays without sizes (`Array[\RR64,ZZ32\]` where the library wants `Vector`, `Matrix` or `Array3`);
- 5 numeral powers such as `10.0^(-5)`, refused as ambiguous because each of two `^` declarations needed the integer converted (row 533);
- 6 small slips.

On a copy patched with "decision D's" diff, which gives the model's arrays sizes, 14 errors remained:
- the 5 powers;
- 3 `DOT` calls that failed on the api's unused sizes;
- 1 "bridge", `adam`'s, which passes arrays whose sizes are known only at run time;
- 5 small slips.

Since that measurement:
- The 17 vector and matrix operators no longer have unused sizes (F-35). So, by reading, the 3 `DOT` refusals should be gone.
- `MultiplicativeRing`'s `^` takes an `AnyIntegral` exponent, and `RR64` declares `^(self, b:AnyIntegral)` next to `^(self, b:RR64)` (`Library/FortressLibrary.fsi:283`, `:365-366`). Nobody has measured whether the powers still tie, or between which two declarations.

**Conditions:** The counts are from an earlier library, and each is a lower bound, because the checker stops a block at its first failing statement (row 474). Decision D's diff is not applied until PLAN's phase 5 (P-87).

**Consequence:** The current C4 error count is not known. A worker must re-measure it, and should expect more errors than counted, and possibly a different picture for the powers. A worker must not apply the array-sizing diff before phase 5.

**Evidence:** Detail: `reviews/array-design-ways.md` section 2; `compile-ladder/rung-integer-power/REPORT.md` section 7. The two later changes cite F-35 and the `.fsi` lines. No test is named, as expected for an old measurement.

**Could not resolve:**
- "decision D": a label from some other document, not defined here or in the skill. I cannot tell whether it is a curator decision (P-87 is cited only for its timing) or an option "D" in a review. The entry does say what the diff does. Unclear wording.
- "1 bridge, `adam`'s": "bridge" is not defined. I guess it is a function in C4 that passes the flat program's arrays to a sized interface, in this case the Adam optimizer's, but that is a guess. Unclear wording.
- "the api's unused sizes": I take it as size static parameters declared on the `DOT` operators but not used by their parameters, so inference cannot fix them. That fits "since then ... unused sizes are gone", but it is my reading. Unclear wording, minor.
- "on an earlier library": the library version is not given. A worker cannot tell how stale the 26 are, apart from the two changes listed.

---

## F-59 "`SUM` and `PROD` take their identity from the static argument, and the compiled checker needs that argument written in every clause form."

**Established:**
- *Identity:* `SUM` and `PROD` compute their identity (zero or one) from their static argument, by a witness `typecase`. This is the built form of P-78.
- *Compiled checker:* it takes the element type neither from the generator clauses nor from a declared type that receives the value (row 731). So when a generic big operator's bound names its own parameter (`SUM`, `PROD`, `BIG MAX`, `BIG MIN`), a call without a written static argument has no instance at its bound, and the checker refuses it. A big operator whose bound is plain takes that bound, or the reduction's expected type where the bound does not fit (F-221).
- *Walk:* runs such a call. It instantiates the operator at the type declared for the value, or else at the join of the elements' types. It leaves the parameter open only when it has neither (F-228, F-143).
- *What needs no argument:* C4 writes the static argument, as the team's tests do (`SUM[\ZZ32\][j <- 0#i] matCount(j)`). `SUM e` over a collection, and `x DOT y`, need no static argument (P-78).

**Conditions:** The refusal applies on the compiled path to self-bounded big operators written with generator clauses. Walk does not refuse.

**Consequence:** In any program meant for the compiled path, write the static argument on every `SUM`, `PROD`, `BIG MAX` or `BIG MIN` that has generator clauses, even when a declared type receives the value.

**Evidence:** Gated by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`, for the witness and for a plain bound. The refusal itself is row 731's, and no test pins it. Detail: `reviews/sum-replacement-judgement.md` section 5, Table 2, measured before P-48. Row 731 gives the current mechanism.

**Could not resolve:**
- "in every clause form": two readings.
  1. Every form that has generator clauses (`[j <- ...]`). The later exceptions, `SUM e` and `x DOT y`, fit this reading.
  2. Every kind of clause (ranges, collections, filters) inside such a form.

  I took the first. Unclear wording.
- The checker's general rule ("takes the element type from neither the clauses nor a declared type that receives the value") is stated before the narrowing to self-bounded operators. The next sentences then say a plain-bounded operator does take "the reduction's expected type". I could not tell whether "a declared type that receives the value" and "the reduction's expected type" are the same thing. If they are, the general sentence holds only for self-bounded operators and should say so. Unclear wording.
- The body is not covered. `references/library.md` says to write the static argument "if the generators and the body do not fix the element type". That implies a body that fixes the type is enough. This entry says the checker needs the argument "in every clause form" and mentions only the clauses and a declared type. I cannot tell whether a body of known type is enough for the compiled checker. This is a tension between the entry and the skill, from unclear wording.
- "It builds P-78": "It" has no clear antecedent. Probably "this identity mechanism". Unclear wording, minor.
- "a generic big operator whose bound names its parameter": I read this as an F-bounded parameter, such as `T extends AdditiveGroup[\T\]`, which the skill's "a bound that names the parameter itself" supports. Clear enough.
- "measured before P-48": I do not know what P-48 changed, so I cannot tell which parts of Table 2 are stale. The entry says that row 731 has today's mechanism, which helps. Missing information.
- `InferBigOperatorUnwritten`: no folder is given. I assume `compiler_tests/`, like the other test named with it.

---

## F-60 "The coercions between number types carry a sum's zero and a product's one into every wider type by themselves, but not a maximum's identity."

**Established:**
- *Sums and products:* on both paths, a coercion preserves arithmetic. So a narrow type's zero and one convert into a wider type's zero and one.
- *Maximum and minimum:* a maximum's identity is its type's least element, and a coercion does not map one type's least element to another's. `ZZ` and `QQ` have no least element at all.
- *Empty reductions:* the library's generic `BIG MAX` and `BIG MIN` have no identity, so an empty one raises `EmptyReduction`.
- *Rule:* a reduction makes its identity at its own type (P-78).

**Conditions:** The `EmptyReduction` claim is established by a test for `BIG MIN`, and measured once under walk for `BIG MAX`. The compiled path's behaviour for an empty `BIG MAX` or `BIG MIN` is not stated.

**Consequence:**
- Do not compute a maximum's or minimum's identity in a narrow type and widen it.
- Expect an empty generic `BIG MAX` or `BIG MIN` to raise `EmptyReduction`, so guard against empty generators where that matters.

**Evidence:** `tests/simpleSum` asserts the `BIG MIN` case. The `BIG MAX` case was measured under walk (`reviews/flattening-questions-ways.md`, "Question 1", section 2) and is not gated. Detail: `reviews/max-min-identities-judgement.md` sections 1 and 2.

**Could not resolve:** Nothing that blocks. The entry does not say whether the empty case behaves the same on the compiled path. Since `tests/simpleSum` is a walk test, I take the fact as walk-only for the empty case.

---

## F-61 "`perf-probes/prelude/REPORT.md` named three steps to making the interpreter's library the compiler's"

**Established:** The prelude report named three steps toward having the compiler use the interpreter's library:
1. The checker checks `nat` and `int` static parameters (done, F-67).
2. The library api's errors from the number and comparison "tower" are cleared (done, F-131).
3. The native bindings move to the compiled path's helpers (open: PLAN phase 4, "The natives"; F-32).

The report's own run stopped in the library's apis, so it never reached the component, desugaring or code generation. The component's errors found since then make up the distance, which must also reach zero before the switch-over (F-53; PLAN phase 3). No minimal `Array` or `Vector` added to the compiler's prelude can serve C4's `FlatArrays` (`run-c4/src/FlatArrays.fss`), because `FlatArrays` extends the library's array hierarchy and uses its whole protocol. Such a shim would reproduce `NativeArray.fss` and about 1,000 lines of the library above it.

**Conditions:** The report's run covered only the apis. What lies past them is tracked as the distance, not by the report.

**Consequence:**
- What remains before the switch-over is the distance (phase 3) and the natives (phase 4).
- Do not try a prelude array shim for C4. It is ruled out, and SKILL/compiler.md also forbid adding declarations to the prelude.

**Evidence:** `perf-probes/prelude/REPORT.md`, sections 5 (the steps) and 4 (the shim). It also cites F-67, F-131, F-32 and F-53. No test is named, as expected for a summary of a plan.

**Could not resolve:**
- "the tower" and "the number and comparison tower": SKILL.md says plainly, "Numbers are siblings, not a tower." I take "tower" here to mean the hierarchy of algebraic and comparison traits (`AdditiveGroup`, `Integral` and so on), not a subtype chain of the number types. A cold reader is likely to stumble on it. Unclear wording, which conflicts with the skill's word.
- "The component's errors since are the distance": "since" can be read as "since then" or "because". I read "found since then". Also, the distance counts api and export errors as well (F-53), not only "the component's errors". Unclear wording, minor.

---

## F-63 "The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; ..."

**Established:** The interpreter library's api, `Library/FortressLibrary.fsi`, has four repairs:
- It declares `String`'s `split` and `splitWithOffsets` once each, as abstract.
- It declares no `zip` in `List`, which inherits `ZeroIndexed.zip`.
- It gives `Condition.map` the return type `Condition[\G\]`, the type the component declares. `Condition` is the sequential generator trait at `FortressLibrary.fsi:913`.
- It closes `QQ` with `comprises { ... }`.

Their history:
- *Earlier forms:* the checker refused the api (measured) when the pair was declared twice and `List` had `zip[\F\](other: List[\F\])`.
- *Other repairs tried:* the pair kept once in its plain form, and a `zip` narrowed to `ZeroIndexed`, gave the same count. The forms kept were chosen because they follow the specification's export rules.
- *`Condition.map`:* its error was seen only under a checker change that did not land. Otherwise it is inferred from how the export check compares return types, and no test gates that edit.
- *`QQ`:* its `comprises` clause lists no type, because its one value type, `Ratio`, is private to the component, and an api may leave out a private type only by `...` (`FortressLibrary.fsi:398`). No api-declared type extends `QQ`, so F-64's refusal, which applies to such a type, does not arise.

**Conditions:** These are the forms in the landed api. The `Condition.map` repair comes from reading the code, not from a measurement.

**Consequence:** Keep these forms. Do not redeclare the pair, add a `List.zip`, change `Condition.map`'s return type back, or list `Ratio` in `QQ`'s clause. Anyone who adds a type extending `QQ` in the api will meet F-64's refusal.

**Evidence:** Earlier forms refused, measured. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes". No test gates the `Condition.map` edit. No gated test is named for the other three repairs either, although F-53's api count of 0 and the export error presumably act as their check.

**Could not resolve:**
- "the plain pair kept once": I read "plain" as "non-abstract", the alternative to "once, abstract". The entry does not define it. Unclear wording.
- "read the same count": I take it as "gave the same checker count as the forms kept", but which count (checker count or distance) is not said. Unclear wording, minor.
- "otherwise it is read from the export check's comparison of return types": I cannot tell whether the landed checker would report the `Condition.map` error if the old return type came back. That is, whether this repair is needed today or only defensive. Unclear wording.
- "F-64's refusal": not stated here. I can tell only that it falls on an api type that extends `QQ`. It is enough for the consequence.
- "the one library": defined in SKILL.md as the interpreter's library. Clear.
