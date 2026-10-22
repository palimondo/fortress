<!-- Cold read of facts/f12/clean.txt (F-131 to F-142), read with CLAUDE.md, the fortress-repo SKILL.md and its allowed references only. -->

# Cold read: f12 (F-131, F-132, F-133, F-135, F-136, F-137, F-140, F-141, F-142)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the references `interpreter.md`, `library.md`, `compiler.md`, `records.md`, `specification.md` and the opening of `tests-writing.md`. Nothing else was read. All nine entries are facts.

Two points apply to all the entries:

- "It builds P-NN" reads as "this fact is how the tree carries out the curator's decision P-NN" (the skill's "Built." state word). That is clear as a pointer. Where an entry hands the content of a rule to a P- or F- entry I cannot read ("P-74's coercions", "F-45"), I list it under the entry.
- A test named with no folder and no extension (`RangeBoundsRungO`, `XXXNatRangeChecker`, `NatRtTask`) leaves me to guess its folder. I list this only where it matters.

---

## F-131 "The one library's number tower is flat."

**Established:** In the interpreter's library, which both paths use after the switch-over, no number type is a subtype of another. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and `IntLiteral` all sit directly under `Number`. `IntLiteral` is the library's type for an integer numeral. The compiled checker types a numeral as `IntLiteral`, but walk gives the numeral's value one of `ZZ32`, `ZZ64` or `ZZ`. Conversions between siblings are coercions:
- the integer types and `RR64` convert by the coercions of P-74;
- `QQ` has coercions from `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ` and `IntLiteral`;
- `RR64` also has a coercion from `RR32`.

The coercion from `NN32` into `RR64` is not there yet. `Number`'s `=` turns the exact number into a float with `asFloat` before it compares it with a float. So `=` is not transitive: two different exact numbers can each equal the same float without equalling each other.

**Conditions:** The tower is the one library's. The entry says nothing about the compiler's prelude. The `=` claim is about a mixed float/exact comparison. There are two known failures under walk:
- a big operator with no static argument over a list of numerals, such as `SUM <|1, 2, 3|>`, is refused (row 432);
- an empty `SUM` over an additive group that is not a number type dies (row 436; `library.md` says it ends in `CastError`).

**Consequence:** A worker must not rely on subtyping between number types. A mixed-type operation goes through a coercion, and only where one is declared. `NN32` into `RR64` cannot be relied on yet. A worker should not use `=` between a float and an exact number where transitivity matters. Under walk, a big operator over a list of numerals needs a static argument.

**Evidence:** `tests/FlatTowerRungF.fss` gates only the integer coercions and `=`, not the sibling structure itself or the `QQ` and `RR32` coercions. Detail is in `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17. `RR32`'s place is established by F-139, `IntLiteral`'s by F-79.

**Could not resolve:**
- "The integer types and `RR64` convert by P-74's coercions": unclear wording. It does not say which pairs or which directions: integer types into `RR64`, among themselves, or both. The rule lives in P-74, which I cannot read. `library.md` says `ZZ32` and numerals go into `RR64` implicitly and `ZZ64` only through `asFloat`, but the entry neither states nor points to that limit. "The integer types" could also include or exclude `IntLiteral`.
- "`NN32` into `RR64` waits (P-75)": unclear wording. "Waits" could mean the coercion is decided and still to build, or that it waits for the curator's decision.
- "is refused (row 432)": unclear wording. It does not say whether walk refuses at load or fails at run time, or with what.
- "a bare big operator": "bare" presumably means "with no static argument written", by analogy with `library.md`'s `SUM[\ZZ32\]`, but the entry does not say so.
- Walk gives a numeral "`ZZ32`, `ZZ64` or `ZZ`". The entry does not give the rule (by magnitude, I assume), and F-137 later says walk reads a numeral "as a `ZZ32`". The two read differently (see F-137).

---

## F-132 "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit, as the specification says."

**Established:** Under walk, every arithmetic operation on a fixed-width integer type that can produce a result outside the type raises `IntegerOverflow` when it does. This includes `^`, `CHOOSE` and `LCM`. A Fortress `catch` can catch the exception. Three kinds of operation instead keep the low bits and raise nothing:
- the wrapping operators (`DOTPLUS`, `DOTMINUS`, `DOTTIMES` per `library.md`; F-130);
- `narrow` (P-72);
- the shifts `LSHIFT` and `RSHIFT` (F-125).

**Conditions:** The fact holds under walk. On the compiled path, three things are open:
- the prelude's ranges at the integer bounds (row 453);
- `^` (rows 523 to 525);
- `CHOOSE` (row 521).

**Consequence:** Under walk, a worker can rely on overflow raising, and must use the wrapping operators, `narrow` or a shift where wrapping is meant. On the compiled path, the worker must not yet rely on it for `^`, `CHOOSE`, or ranges near the bounds.

**Evidence:**
- `tests/FixedWidthOverflowRungB.fss` gates `+`, `-`, `DOT`, negation and absolute value.
- `PowChooseLcmRungE.fss` gates `^`, `CHOOSE` and `LCM`; I assume it is also in `tests/`.
- Detail is in `compile-ladder/rung-overflow-natives/REPORT.md` section 13 and `compile-ladder/rung-size-range/REPORT.md` section 12.

**Could not resolve:**
- The compiled path's scope: unclear wording. The title limits the fact to walk, but "Open on the compiled path: ..." lists only three exceptions. That suggests that the compiled path otherwise raises too (for `+`, `-`, `LCM`), but it may only mean that those three are the known gaps where nothing was measured. I cannot tell which.
- `DOT`: a language concept I lack. I take it to be the `·` multiplication operator, not one of the `DOT...` wrapping operators. The skill does not name it.
- What the gates cover: unclear wording. "Every arithmetic operation" is wider than the gated list. Juxtaposition multiplication, `TIMES`, division and `MOD` are neither named nor gated, so I cannot tell whether they are covered.
- "the prelude's ranges at the integer bounds": unclear wording. It does not say what goes wrong: an overflow raised, a wrong answer, or no raise.
- `narrow`: a language concept I lack (not in the skill). I read it as a conversion to a narrower type that keeps the low bits.

---

## F-133 "The one library's scalar ranges are over `ZZ32` alone."

**Established:** In the interpreter's (one) library, scalar ranges have `ZZ32` bounds only. A range whose bound is `ZZ32`'s minimum or maximum gives correct answers without overflow. On the compiled path, the compiler's library has no strided range (row 514), and its range `IN` and `=` always answer `false` (rows 479, 481). On the one library, the compiled checker gets a `case` wrong when:
- the `case` has no comparison operator;
- the guard's type is a type variable bounded by a `Contains` type, or by a union of `Contains` types.

There the checker uses `=` where the specification says to use ∈ (row 480).

**Conditions:** Correctness at the `ZZ32` bounds holds in the interpreter's library. One case is open under walk: a strided range whose elements all fit in `ZZ32` raises at construction when the difference of its bounds does not fit in `ZZ32` (row 522).

**Consequence:**
- A worker writes ranges over `ZZ32` only, and a wider counter as a `ZZ32` loop that widens its index (`library.md`).
- On the compiled path, the worker must not rely on strided ranges, `IN` or range `=` until the switch-over.
- The worker must expect a `case` on such a guard to be checked with `=`, not membership.
- Under walk, the worker must avoid strided ranges whose bounds span more than `ZZ32` holds.

**Evidence:**
- `tests/RangeZZ32RungJ.fss` and `RangeBoundsRungO` gate the fact.
- Detail is in `compile-ladder/rung-ranges-zz32/REPORT.md` sections 4 and 10.

**Could not resolve:**
- "scalar ranges": a language concept I lack. I assume it means one-dimensional integer ranges as opposed to ranges over tuples, but the skill does not define it.
- `Contains`: a language concept I lack. I take it to be a library trait of types with a membership test, but the skill does not name it.
- "the compiled checker's `case` without a comparison operator takes `=` where the specification gives ∈": I could decode this only partly. I read it as the form `case x of r => ... end` with no operator after `case x`. I do not know the specification's rule for choosing ∈, or what the checker's error leads to at run time.
- "On the one library, the compiled checker's ...": unclear wording. The sentence sits between two compiled-path claims about the compiler's library, and it is not obvious whether this defect shows today (the checker run over the one library, as in the count stage) or only after the switch-over.
- `RangeBoundsRungO`: unclear wording. No folder or extension is given, so I cannot tell whether it is a walk test in `tests/` or a compiled test.
- "raises at construction": unclear wording. The exception is not named; presumably it is `IntegerOverflow`.

---

## F-135 "On the compiled path, a parallel task in a generic declaration is generic over its free static parameters."

**Established:** When the code generator makes a task class for a parallel part of a generic declaration, it names that class with the static parameters that the task uses and does not bind itself, as it already does for a closure. So the class is instantiated like other generic code (a template that the class loader fills in; `SKILL.md`, "The compiled run time"). As a result, in a generic method, the parallel operands of an operator such as `||` can run as such tasks.

**Conditions:** Only on the compiled path. Walk makes no task classes.

**Consequence:** A worker can expect parallel evaluation inside generic code to compile and run on the compiled path. A walk-side task defect is unrelated.

**Evidence:**
- `compiler_tests/NatRtTask` and `NatRtMethBoth` gate the fact.
- Detail is in `compile-ladder/rung-generic-runtime/REPORT.md` section 1.

**Could not resolve:**
- "names the task class with them": unclear wording. I read it as "makes the class a template parameterised by them". It could also mean only that the parameters appear in the class's name. The mechanism matters for whether the class loader instantiates it.
- "the operands of an operator, such as `||`, can run as such tasks": unclear wording, read two ways. "Can" may mean "now are able to, where before they failed" or "may, depending on the scheduler". Also, why `||` is the example is not said: whether it is a string concatenation, or an operator whose operands the generator always spawns.
- "free static parameters": partly clear. I read it as the enclosing declaration's static parameters that the task body mentions.

---

## F-136 "On the compiled path, a generic arm of a template dispatcher is called at the dispatcher's own static parameters, by position, where the arm has as many static parameters as the dispatcher and each of the dispatcher's is a type."

**Established:** On the compiled path, take the generated dispatch method of an overloaded name. Where that method is itself a template, it calls a generic declaration (arm) by passing its own static parameters to the arm, first to first, in order, when two conditions hold:
- the arm has the same number of static parameters as the dispatch method;
- every static parameter of the dispatch method is a type, not a size or an `opr`.

In other cases the call takes "the old path", and `opr` and `nat` arguments get no such passing (F-45). The arms' kinds are not checked. There is one defect (row 499, two `XXX` tests). Take an arm that is more specific than another but does not line up position by position with the dispatch method. Its test is made at the call's instantiation, so the less specific arm can run. The entry's example is `viaT[\T\](x: T) = f(x)`: called on a `Box`, it runs `f[\T\](x: T)`, not `f[\U\](x: Box[\U\])`. The checker accepts such arms when their return types agree. Two related defects remain, rows 495 and 496:
- generic dotted methods;
- dispatch methods that are not templates.

Both still die with `ClassCastException` when an arm names its static parameters differently from the dispatch method, or when it is dispatched at `ZZ32`, whose run-time name differs from its name in static code. For template dispatch methods, those two defects are fixed (rows 493, 494).

**Conditions:** The compiled path; template dispatch methods; arms with the same number of static parameters, all types. Not dotted methods, not dispatch methods that are not templates, and not size or `opr` static arguments.

**Consequence:** A worker can rely on position-by-position calls for template dispatch methods. A worker must expect the wrong (less specific) arm where the arms do not line up, `ClassCastException` in the two named cases, and no kind check.

**Evidence:**
- `compiler_tests/Dispatch*ArmRungG` gates the fact.
- Detail is in `compile-ladder/rung-generic-runtime/REPORT.md` sections 7 and 9.

**Could not resolve:**
- "arm" and "template dispatcher": language concepts I lack. I inferred them from `SKILL.md`'s dispatch methods and template classes, but the skill defines neither.
- "Otherwise the call takes the old path": unclear wording. "The old path" is not defined: what does that call do, and is it correct or a defect?
- "`opr` and `nat` arguments lack it (F-45)": unclear wording, read two ways. "It" may be the position passing or the old path. The rule is in F-45, which I cannot read. It also does not say whether `bool` and `int` static parameters behave like `nat`.
- "The arm's kinds are not checked": unclear wording. It does not say what can go wrong when the kinds differ.
- "An arm in the more-specific relation that does not match the dispatcher position by position is tested at the call's instantiation": I could decode this only through the example. "In the more-specific relation" (more specific than which arm?) and "tested at the call's instantiation" (tested against which type?) are not stated.
- "which the run time spells differently from static code": unclear wording. I read it as a different class name for `ZZ32`, but which names are meant is not given.

---

## F-137 "Under `walk`, a generic call's static arguments are inferred with coercion, by P-74's promotion, also for the declaration that an overloaded call chooses (P-46)."

**Established:** When walk calls a generic function, also one chosen by dispatch among overloads, it infers the static arguments while allowing coercions. A type parameter that is the entire declared type of at least one argument is a lone one. Walk gives it the narrowest type, among three kinds of candidate, that every argument either has or coerces into:
- the arguments' run-time types;
- their coercion targets;
- the parameter's bounds.

So `ZZ32` with `ZZ64` gives `ZZ64`, and `ZZ64` with `RR64` gives the declared bound. With no narrowest candidate, the parameter takes its bound. Walk starts from the arguments' run-time types. This is a default that waits for the curator's review (review-queue item 85). So when a static type is wider than the value, walk and the compiled path pick different instantiations (row 509).

**Conditions:** Under walk. Lone type parameters. Several cases are "not reached":
- a big operator with no static argument over a list of numerals (row 432);
- a `nat` parameter used as a value at an `NN32` binding (row 486);
- a static argument that appears only in the result type, at a typed binding (row 510);
- varargs or tuple parameters over mixed widths (row 511);
- by reasoning only, not measured: a numeral passed alone for a parameter whose bound `ZZ32` does not satisfy.

**Consequence:** A worker can expect mixed-width calls to instantiate at the widening coercion's target under walk. The worker must not expect walk and the compiled path to agree where static and run-time types differ. The run-time-type rule may change after review.

**Evidence:**
- `tests/InferCoercionRungK.fss` gates the fact.
- Detail is in `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

**Could not resolve:**
- "Not reached": unclear wording, read two ways. It may mean the rule does not apply there and those calls fail (they are defects), or that the work did not get to test them. The cited ledger rows suggest defects, but the word does not say so.
- "by P-74's promotion": unclear wording. "Promotion" is not defined, and the rule is in P-74, which I cannot read.
- "Walk promotes from the run-time types": unclear wording. I read it as "starts from the arguments' run-time types and not their static types", but "promotes" is new here.
- The numeral case: I could not follow the reasoning. Why it is not reached is unclear, since the candidates include coercion targets and `ZZ32` coerces into `RR64` (`library.md`). Also, "walk reads a numeral as a `ZZ32`" conflicts with F-131's "`ZZ32`, `ZZ64` or `ZZ`". Perhaps a small numeral is meant, but the entry does not say so.
- "ZZ64 with RR64 gives the declared bound": unclear wording, read two ways. It may follow from the bound being the narrowest candidate that admits both, or from there being no narrowest candidate (the next sentence's rule).
- "a `nat` parameter used as a value at an `NN32` binding": partly clear. Presumably `x: NN32 = n` for a static `nat n`, but what fails is not said.

---

## F-140 "A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one; walk reads a size exactly."

**Established:** The compiled checker refuses a static size outside the range of its kind:
- 0 to 4294967295 for `nat`;
- `ZZ32`'s range for `int`.

It does so when the size is a literal or a constant folded from literals. Walk refuses such a size when it binds a static parameter to it. The compiled class loader does not check sizes it computes while instantiating a class. So with a size `k + 1`, `next[\4294967295\]()` answers 4294967296 (row 675; F-222). When a size is used as a value, walk gives it type `ZZ32` up to 2^31-1 and `ZZ64` above, with no wrap; the checker types it `IntLiteral`.

**Conditions:**
- The checker refuses only literal or literal-folded sizes, not sizes computed at instantiation.
- Walk refuses at the binding.
- One case is open under walk: an array whose static size is from 2^31 to 2^32-1 dies with a Java `NegativeArraySizeException`, not a Fortress error (row 527).

**Consequence:**
- A worker must not rely on the compiled path to catch an out-of-range size computed from other sizes.
- Arrays above 2^31-1 elements fail under walk.
- Under walk, a large `nat` used as a value is a `ZZ64`.

**Evidence:**
- `tests/NatBigSizeWalk` gates walk's reading.
- `XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk` and `XXXIntBelowZZ32Walk` gate the refusals.
- Detail is in `compile-ladder/rung-size-range/REPORT.md` sections 6 and 12.

**Could not resolve:**
- "walk reads a size exactly" (title): unclear wording. I read it as "with no truncation or wrap", from the later sentence on `ZZ32`/`ZZ64`, but "exactly" alone could also mean "as written, not folded".
- "by walk when it binds one": unclear wording. "Binds" could mean walk binding a static parameter to the size at a call or instantiation, or a declaration binding a value. When and how walk refuses (at load, or at the call, and with what) is not said.
- The refusals gated by `XXX` tests: unclear wording against the skill. `tests-writing.md` defines an `XXX` test as an expected failure that "fails today" because of a defect. Here the `XXX` tests gate behaviour that the title says is built. I infer that the refusal is the "failure" the harness expects, so these pass while the refusal holds. The entry does not say so, and a reader can take them as deferred defects.
- `XXXNatRangeChecker` and `XXXNatArithRangeChecker`: unclear wording. No folder is given; presumably they are compiled tests.
- "with a size `k + 1`": partly clear. Presumably `next[\k\]` is declared to return something at size `k + 1`, but the declaration is not shown.

---

## F-141 "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound, and a lone one with no narrowest candidate takes its bound."

**Established:** Under walk, a type parameter that no argument of a call constrains gets its declared bound. A lone parameter (the whole declared type of some argument, F-137) with no narrowest candidate also gets its bound. Some type parameters are bounded by the arguments only from above. This happens because the parameter types mention them only in the domain of a function parameter, as `T` in `g: T -> ZZ32`. Such a parameter gets the meet (greatest lower bound) of its declared bound and the arguments' upper bounds on it. A parameter whose bound names itself (F-bounded) stays open (F-143). A big operator's parameter, where no static argument is written, is fixed first by its value's declared type, or else by the join of its elements (F-228). Two rules are defaults recorded in the walk-instance rung's decision record:
- **D3** (row 592; review-queue item 80): a parameter mentioned only in the bound of a fixed parameter takes the arguments' type, not its own bound;
- **D5**: a lone parameter whose bound mentions a static parameter keeps the arguments' narrowest common supertype. Whether the specification solves such parameters jointly is review-queue item 4.

Known defects, each with an `XXX` test:
- two bounds walk cannot meet (row 591);
- an upper-only bound that mentions another static parameter keeps `BottomType` (row 612);
- two upper bounds from two function arguments that walk cannot meet fail the call (row 616);
- an untyped function expression's result (row 587);
- a generic declaration skipped at dispatch when its arguments have several minimal common supertypes (row 589), whose repair changes which declaration runs.

**Conditions:** Under walk. D3 and D5 may change after the curator's review. The listed defects are exceptions.

**Consequence:**
- A worker can predict walk's instantiation in these cases.
- The worker must expect the defects listed.
- The worker should not build on D3 or D5 as settled.
- A fix for row 589 changes dispatch results, so it needs care.

**Evidence:**
- `tests/Infer*Walk.fss` gates the fact.
- Detail is in `compile-ladder/rung-walk-instance/REPORT.md` section 2 and its `decision-record.md` section 2, `compile-ladder/rung-walk-elements/REPORT.md` section 1, and `compile-ladder/rung-walk-meet/REPORT.md` section 1.

**Could not resolve:**
- "F-bounded": a language concept the skill describes but does not name. `SKILL.md` says a parameter "whose bound names the parameter itself stays open", and I matched the term from general type theory.
- "at a clause form that writes no static argument": unclear wording. "Clause form" is not defined. I read it as the generator-clause form of a big operator (`SUM[i <- ...] e`), as opposed to a call on a list.
- "a parameter that only a fixed parameter's bound mentions takes the arguments' type": unclear wording. Which arguments' type is not said: the arguments of the call, or the type argument found inside the fixed parameter's instantiation.
- "keeps the arguments' narrowest common supertype": unclear wording. "Keeps" as against "takes" suggests a contrast with some other rule that is not given.
- "an untyped function expression's result (row 587)": unclear wording. The defect itself is not stated, only its subject.
- "keeps `BottomType`": partly clear. I take it as the skill's `Bottom`, so the parameter ends up as the empty type, but the skill spells it `Bottom`.

---

## F-142 "Walk checks at load the Meet Rule for Functional Methods per providing type."

**Established:** When walk loads a program, it checks the specification's Meet Rule for Functional Methods once for each type, over the functional methods that the type provides. A type provides what it declares and what it inherits, minus what its own `override` declarations override. The check runs over every trait, object and object expression. A generic type is checked through a stand-in for its instances (F-145). In that check, walk skips two kinds of pair of functional methods:
- pairs whose parameter types mention a static parameter;
- pairs provided by a supertype that mentions one.

Symbolic operators are skipped, as the compiled checker skips them. Over them the library breaks the rule at five sites, such as `EmptyString`'s `||` (row 611).

**Conditions:**
- The check is made at load, under walk.
- Pairs involving static parameters are not checked.
- Symbolic operators are not checked.
- `interpreter.md` lists walk's other refusals at load.

**Consequence:** A library or program edit that adds a functional method breaking the Meet Rule within one type makes walk refuse the program at load. Symbolic operators and generic-parameter pairs escape the check. A worker who extends the check to symbolic operators must first deal with the five library violations.

**Evidence:**
- `tests/FunctionalMethodMeet*` gates the fact.
- Detail is in `compile-ladder/rung-walk-meet/REPORT.md` sections 1 and 7.

**Could not resolve:**
- "the Meet Rule for Functional Methods": a language concept I lack. The skill names the rule and points to `Specification/advanced/overloading.tex`, but does not state it, so I cannot say what a violation looks like.
- "checked through a stand-in for every instance": unclear wording, read two ways. It may be one stand-in that represents all instances, or one stand-in per instance.
- "or that a supertype mentioning one provides, is read": unclear wording. The sentence has two subjects joined by "or", and "is read" (for "is checked") makes it hard to parse. I am not sure whether "a supertype mentioning one" means a supertype whose own static arguments mention a static parameter.
- "Symbolic operators": a language concept I lack. It could mean operators written in symbols (`+`, `||`) as opposed to named ones (`MAX`, `DOT`), or every `opr` declaration.
