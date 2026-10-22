<!-- Cold read 2 of the f12 slice of FACTS (F-131 to F-142), read with only CLAUDE.md and the fortress-repo skill (SKILL.md, references/library.md, interpreter.md, compiler.md, records.md, tests-writing.md). -->

# Cold read 2: F-131 to F-142

Context read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; and, to look terms up, `references/library.md`, `references/interpreter.md`, `references/compiler.md`, `references/records.md`, `references/tests-writing.md`. Nothing else.

## F-131 "The one library's number tower is flat."

**Established:** In the interpreter's library (the one both paths will use after the switch-over), nine number types are siblings directly under `Number`, none a subtype of another: `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and `IntLiteral`. `IntLiteral` is the library's type for an integer numeral. The compiled checker types a numeral as `IntLiteral`; walk types it `ZZ32`, falling back to `ZZ64`, then `ZZ`, when the value is too big. Implicit conversions (coercions) exist: from each narrower integer type to each wider one; into `RR64` from `ZZ32`, `IntLiteral` and `RR32`; into `QQ` from all five integer types and `IntLiteral`. `ZZ64` into `RR64` is explicit only (by `asFloat`, per `library.md`). `NN32` into `RR64` does not exist yet. `Number`'s `=` turns the exact operand into a float with `asFloat` before comparing it with a float, so `=` is not transitive (row 434). Two walk defects: `SUM <|1, 2, 3|>`-style big operators over a list of numerals, with no static argument written on either, fail dispatch at run time (row 432); an empty `SUM` over an additive group that is not a number type dies (row 436).

**Conditions:** Holds for the interpreter's library, so for walk today and for the compiled path after the switch-over. The test is a walk test (`tests/`), so what is gated is walk's behaviour. It does not cover the compiler's prelude.

**Consequence:** A worker must not rely on subtyping between number types; mixing widths works only through a declared coercion, and a `ZZ64` must be converted to `RR64` explicitly. Do not write code that needs `NN32` into `RR64` until P-75 is built, and do not choose how to build it (the curator's choice). Do not assume `=` across float and exact numbers is transitive. Expect rows 432 and 436 to bite under walk; write a static argument on such a `SUM`.

**Evidence:** `tests/FlatTowerRungF.fss` gates the sibling relation, the coercions and `=` for every listed type except `RR32` (gated with F-139) and `IntLiteral` (gated with F-79). Detail in `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17.

**Could not resolve:**
- "Each wider integer type converts from each narrower one": the entry does not say which pairs count as wider/narrower across signed and unsigned (does `NN32` convert into `ZZ64`? `NN64` into `ZZ`? Neither `NN32` nor `ZZ32` holds the other). Unclear wording (underspecified ordering).
- "The compiled checker gives a numeral that type": now, over the compiler's prelude, or only when it reads the one library? Can be read both ways. Unclear wording.
- "Under walk, ... and an empty `SUM` over an additive group that is not a number dies": does "Under walk" scope the second clause too? And `library.md` says row 436 is about a `SUM` with a written static argument, empty or filtered; the entry says only "empty". Unclear wording.
- "their coercions and `=`": does the test gate `=`'s non-transitivity (the row 434 defect) or only `=`'s results? Unclear wording.
- `<|1, 2, 3|>`: I read it as a list literal; the skill does not give the syntax. Language concept, minor.

## F-132 "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` ..."

**Established:** Under walk, every arithmetic operation on `ZZ32`, `ZZ64`, `NN32` or `NN64` whose result can fall outside the type raises `IntegerOverflow`, a Fortress exception that a program can catch. This includes `^`, `CHOOSE` and `LCM`. Three kinds raise nothing: the wrapping operators (`DOTPLUS`, `DOTMINUS`, `DOTTIMES`, F-130); `narrow`, the explicit `ZZ64`-to-`ZZ32` or `NN64`-to-`NN32` conversion (P-72), which keeps the low bits as the wrapping operators do; and `LSHIFT`/`RSHIFT`, which drop the bits shifted out (F-125).

**Conditions:** Walk only. The compiled path is explicitly excluded, and it has known gaps: the compiler prelude's ranges raise `IntegerOverflow` when the sum of their bounds exceeds `ZZ32` (row 453); `^` saturates, throws an uncatchable Java exception, or adds (rows 523-525); `CHOOSE` beyond its helper's table dies with a Java exception (row 521).

**Consequence:** Under walk, a worker can rely on overflow being raised and catchable, and must use the wrapping operators, `narrow` or the shifts where low-bit behaviour is wanted. Do not assume the compiled path matches; check rows 453, 521, 523-525 first.

**Evidence:** `tests/FixedWidthOverflowRungB.fss` (`+`, `-`, `DOT` (`·`), `DIV`, negation, absolute value, on the four fixed widths) and `tests/PowChooseLcmRungE.fss` (`^`, `CHOOSE`, `LCM`). Detail: `compile-ladder/rung-overflow-natives/REPORT.md` section 13; `compile-ladder/rung-size-range/REPORT.md` section 12. The no-raise cases rest on F-130, P-72 and F-125, not on these two tests.

**Could not resolve:**
- "`^` saturates, throws an uncatchable Java exception or adds": "adds" — `^` computes a sum instead of a power? On which inputs does each of the three happen? Unclear wording.
- "`CHOOSE` past its helper's table": which helper, and what "past" its table means (arguments larger than a precomputed table?). Unclear wording, minor.
- "where their bounds sum beyond `ZZ32`": I read it as lower bound plus upper bound overflowing; could also mean bound plus size. Unclear wording, minor.
- `DOT` (`·`): I take it to be multiplication; the skill does not name this operator. Language concept, minor.
- The sentence "Three kinds ...: the wrapping operators (F-130) and `narrow`, ..., which keep the low bits; and the shifts" groups as two by its punctuation and three by its count. Resolved as three; wording awkward.

## F-133 "The one library's scalar ranges are over `ZZ32` alone."

**Established:** In the interpreter's library, a range is over `ZZ32` only. A range that touches `ZZ32`'s minimum or maximum has the correct size and elements with no overflow, except a strided range where a difference of its bounds leaves `ZZ32`: walk raises `IntegerOverflow` building it (row 522, open). On the compiled path today, the compiler's library has no strided range (row 514), and its range `IN` and `=` always answer `false` (rows 479, 481). When the compiled checker reads the one library (every compiled program, after the switch-over), a `case` without a comparison operator compares by `=` where the specification says ∈, so the clause never matches — in the case where the guard's static type is a type variable bounded by a `Contains` type (the library trait for membership `IN`, which ranges extend) or a union of those (row 480). Over the compiler's library the checker correctly picks ∈.

**Conditions:** Walk behaviour holds for the interpreter's library. The `case` defect is on the compiled checker reading the one library, and only for type-variable (or union) guards. The strided-range overflow is the stated exception.

**Consequence:** Write ranges over `ZZ32` and widen inside (per `library.md`). Under walk, ranges at the `ZZ32` edges are safe unless strided with bounds whose difference overflows. On the compiled path, do not use strided ranges or range `IN`/`=` until rows 514/479/481 are fixed. After the switch-over, expect `case` clauses with generic `Contains` guards to never match (row 480).

**Evidence:** `tests/RangeZZ32RungJ.fss`, `tests/RangeBoundsRungO.fss`, `tests/SeqRangeTopRungO.fss`, `tests/RangeEmptyHashRungO.fss`; detail `compile-ladder/rung-ranges-zz32/REPORT.md` sections 4 and 10. All four are walk tests; the compiled-path claims rest on ledger rows only, as far as the entry says.

**Could not resolve:**
- "the guard": the expression after `case` (the scrutinee) or a clause's expression? Read two ways. Unclear wording; the skill does not describe `case` without an operator either (language concept I lack: how the specification picks `=` or ∈).
- "or by a union of them": a union of `Contains` types, or of such type variables? Unclear wording.
- The title's claim (ranges over `ZZ32` alone: a range over another type is refused) is not restated in the body; I took it from `library.md`. Which of the four tests gates the refusal is not said. Unclear wording.
- "a difference of its bounds": which bounds (start and end? end and stride?). Unclear wording, minor.
- "strided", "scalar range": not defined in the skill; I read them as a range with a step and a one-dimensional range. Language concept, minor.

## F-135 "On the compiled path, a parallel task in a generic declaration is generic over its free static parameters."

**Established:** On the compiled path, when code inside a generic declaration runs as a parallel task, the code generator emits the task class as a template generic over the enclosing declaration's static parameters that the task uses (its free static parameters), like a closure's class. The class loader instantiates it at the static arguments of the enclosing call. So, for example, the operands of `||` in a generic method run in such generic task classes. Walk makes no task classes.

**Conditions:** Compiled path only; tasks inside generic declarations; only the enclosing declaration's static parameters that the task uses.

**Consequence:** A worker can rely on parallel tasks in generic code being compiled and instantiated correctly; a failure there while a class loads points at the class loader or the code generator, not walk. A fix here does not touch walk.

**Evidence:** `compiler_tests/NatRtTask` and `NatRtMethBoth`; detail `compile-ladder/rung-generic-runtime/REPORT.md` section 1.

**Could not resolve:**
- Which operators or constructs the compiled path runs as parallel tasks: only `||` is named. Unclear wording, minor; not needed to use the fact.

## F-136 "On the compiled path, a generic top-level function, as an arm of a template dispatcher, is called at the dispatcher's own static parameters, by position ..."

**Established:** On the compiled path, when an overloaded name's dispatch method is itself a template (generic), and one of its overloads (an "arm") is a generic top-level function with exactly as many static parameters as the dispatcher and all the dispatcher's parameters are types, the arm is called with the dispatcher's static parameters, i-th to i-th. In any other case (count differs, or the dispatcher has a `nat`, `int`, `bool` or `opr` parameter), the dispatcher, by reading `OverloadSet` and not by measurement, still takes the arm's static arguments from the argument's run-time value. The arm's own kinds are not checked, so an arm with a `nat` parameter where the dispatcher has a type parameter is still called by position (read, not measured). Defects: when one arm is more specific than another but its parameters do not correspond position by position, both arms are tested at the call's static arguments, so the less specific arm can win: `viaT[\T\](x: T) = f(x)` called with a `Box` runs `f[\T\](x: T)` and not `f[\U\](x: Box[\U\])`; the checker accepts such arm pairs when the return types agree (row 499, two `XXX` tests). Generic dotted methods (row 495), and a generic arm beside a non-generic one reached through an argument of static type `Any` (row 496), still die with `ClassCastException`, because an arm's static parameter is left unsubstituted, or because `ZZ32` is spelled `…runtimeValues|FZZ32` at run time and `fortress|CompilerBuiltin%ZZ32` in static code. Those two causes are fixed for template dispatchers (rows 493, 494).

**Conditions:** Compiled path; template dispatchers; top-level generic functions; matching count and type-only dispatcher parameters. The other cases are read from the code, not measured (F-45 is cited for non-type parameters).

**Consequence:** A worker can rely on positional instantiation for the measured case. Must not assume the most specific arm wins when arms do not correspond position by position (row 499), nor that generic dotted methods or `Any`-typed calls to mixed generic/plain overloads work (rows 495, 496). A `ClassCastException` there is a known defect.

**Evidence:** `compiler_tests/Dispatch*ArmRungG`; detail `compile-ladder/rung-generic-runtime/REPORT.md` sections 7 and 9; reading of `OverloadSet` for the unmeasured cases.

**Could not resolve:**
- "template dispatcher" and "arm": neither is defined in the skill. I inferred a dispatch method compiled as a template, and one overloaded declaration it tests. Language/implementation concept I lack.
- "as before the change": which change? The entry names none, and the record is meant to describe the present. Unclear wording.
- "from the argument's run-time value": which argument, when there are several? Unclear wording.
- "does not line up with the dispatcher position by position": since the example's arms both match the dispatcher's count and kinds, "line up" must mean something beyond count and kind (that the i-th parameter means the same thing), but the entry does not say. Read two ways. Unclear wording.
- "For template dispatchers both are fixed": "both" = the two causes (unrewritten parameter, `ZZ32` spelling) or the two defects (rows 495, 496)? Read two ways; I took the causes. Unclear wording.
- "(F-45)": what F-45 adds here is not said. Minor.

## F-137 "Under `walk`, a generic call's static arguments are inferred with coercion, by P-74's promotion ..."

**Established:** Under walk, inferring a generic call's static arguments takes coercions into account, also when the generic declaration is chosen among overloads (P-46). For a "lone" type parameter (one that is the whole declared type of some parameter, and that no other argument fixes through a type such as `List[\T\]`), the candidates are the arguments' run-time types, the types they coerce into, and the parameter's bounds; it takes the narrowest candidate that admits every argument. `ZZ32` with `ZZ64` gives `ZZ64`; `ZZ64` with `RR64` gives the declared bound, since `ZZ64` does not coerce into `RR64`. With no narrowest candidate it takes the bound if every argument is below the bound (F-141), else the arguments' join. Walk uses run-time types, not static types (a default, under review: item 85), so where a static type is wider than the value, walk and the compiled path instantiate differently (row 509).

**Conditions:** Walk only. Does not cover: big operators over a list of numerals without static argument (row 432); a `nat` parameter used as a value bound to an `NN32` (row 486); a static argument mentioned only by the result type, at a typed binding (row 510); varargs or tuple parameters over mixed widths (row 511); and, deduced but not measured, a `ZZ32`-sized numeral passed alone for a parameter whose bound `ZZ32` neither extends nor coerces into, since walk reads it as `ZZ32` (P-76).

**Consequence:** A worker can expect mixed-width calls to instantiate at the narrowest common coercion target under walk, and must expect different instantiations from the compiled path where static types are wider than values. Must not change the run-time-type default (curator's review). For the excluded cases, write the static argument.

**Evidence:** `tests/InferCoercionRungK.fss`; detail `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

**Could not resolve:**
- "by inference and not measured": in an entry about type inference, "by inference" here seems to mean "by reasoning". Read two ways. Unclear wording.
- "P-74's promotion": "promotion" is not defined in the skill or the entry; the body's rule is enough to work by. Minor.
- "below the bound": subtype of the bound only, or also coercing into it? The entry's whole subject is coercion, so it matters. Unclear wording.
- "the whole declared type of some argument": I read "argument" as "parameter" (the declared type belongs to the parameter). Minor.

## F-140 "A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one; walk reads a size exactly."

**Established:** The compiled checker refuses a size (static `nat` or `int` argument) out of its kind's range, `nat` 0 to 4294967295 and `int` `ZZ32`'s range, when it is a literal or folded from literals. Walk refuses such a size at run time when binding it to a static parameter. Walk computes sizes exactly, without wrapping; a size used as a value reads as `ZZ32` up to 2^31-1 and `ZZ64` above. The checker types such a value `IntLiteral`. The compiled class loader does not check sizes it computes at instantiation: `next[\nat k\]()`, building `Box[\k + 1\]`, gives 4294967296 at `k = 4294967295` (row 675; F-222). Open: under walk, an array of static size 2^31 to 2^32-1 dies with a raw `NegativeArraySizeException` (row 527). Notes on row 325: on the compiled path a `nat` size above `ZZ32`'s range fails at run time where the specification refuses statically; under walk a function declared to return `ZZ32` passes such a size on as `ZZ64`.

**Conditions:** Checker: literal or literal-folded sizes only, not sizes computed at instantiation. Walk: at binding to a static parameter.

**Consequence:** A worker must not rely on the compiled run time to catch an out-of-range computed size, nor on walk for arrays of size 2^31 and up. A size used as a value under walk may be a `ZZ64`.

**Evidence:** `tests/NatBigSizeWalk` (walk's exact reading); refusals by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `NatRtBigSize`, and `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk`, `XXXNatArithSumWalk`; each `XXX` test is green because its program is refused. Detail `compile-ladder/rung-size-range/REPORT.md` sections 6 and 12.

**Could not resolve:**
- "The checker types such a value `IntLiteral`": "such a value" = any size used as a value, or only one above 2^31-1? Read two ways. Unclear wording.
- `NatRtBigSize` is listed among the refusal tests but has no `XXX` prefix, and the class loader is said to check nothing it computes; what this test gates is not said. Unclear wording.
- "on the compiled path a `nat` size above `ZZ32`'s range fails at run time, where the specification refuses it statically": this seems to clash with the `nat` range 0 to 4294967295 given earlier, which the checker accepts. Perhaps it means such a size used as a `ZZ32` value, but the entry does not say. Unclear wording.
- "answers 4294967296": which value answers it (the `Box`'s size?). Minor.

## F-141 "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound, and a lone one with no narrowest candidate takes its bound where every argument is below it."

**Established:** Under walk: a type parameter that nothing at a call fixes takes its declared bound. A lone type parameter (F-137) with no narrowest candidate takes its bound if every argument is below the bound, else the arguments' join. A parameter that appears only in function domains, an odd number of arrows deep and never inside a static argument (contravariant only, like `T` in `g: T -> ZZ32`), gets only upper bounds from the arguments; with no lower bound, it takes the meet of its declared bound and the arguments' upper bounds. An F-bounded parameter stays open (F-143). A reduction or comprehension with no written static argument fixes its big operator's parameter from its value's declared type, else from its elements' join (F-228); this is the coordinator's rule, under the curator's review (item 210). Two defaults from the walk-instance rung's decision record: D3, a parameter that only another fixed parameter's bound mentions takes that parameter's instance (`ap[\T, A extends T\](a: A)` gives `T` the type of `a`; row 592; item 80); D5, a lone parameter whose bound mentions a static parameter has the arguments' supertypes as candidates and takes their narrowest common supertype, never its bound (item 4). Defects with `XXX` tests: rows 591 (two bounds walk cannot meet), 612 (upper bound mentioning another static parameter keeps `Bottom`), 616 (two upper bounds from two function arguments that cannot be met fail the call), 587 (parameter fixed only by the result of a function expression without declared return type takes `Bottom`), 589 (a generic skipped at dispatch when its arguments have several minimal common supertypes; repair changes which declaration runs, curator's decision, item 18).

**Conditions:** Walk only. D3, D5 and the reduction rule are defaults or the coordinator's call, not curator decisions, and may change.

**Consequence:** A worker can predict walk's instantiations from these rules, must not change D3, D5, the reduction rule or row 589's dispatch without the curator, and should expect `Bottom` or failed calls in the listed defect cases.

**Evidence:** `tests/Infer*Walk.fss`; detail `compile-ladder/rung-walk-instance/REPORT.md` section 2 and its `decision-record.md` section 2; `rung-walk-elements/REPORT.md` section 1; `rung-walk-meet/REPORT.md` section 1.

**Could not resolve:**
- "is bounded by the arguments only from above. Where nothing bounds it from below, ...": if such a parameter only ever gets upper bounds, when does something bound it from below? The condition reads as always true, or as hinting at another source of lower bounds that the entry does not name. Unclear wording.
- "That rule is the coordinator's call": "coordinator" is not defined in the skill (CLAUDE.md speaks of the coordinating session); and "that rule" could be the reduction rule alone or everything before it. I took the reduction rule. Unclear wording.
- "below it": subtype only, or also coercing into it (as in F-137)? Unclear wording.
- "meet": not defined in the skill (only "join" is); I read it as greatest common subtype. Language concept, minor.

## F-142 "Walk checks at load the Meet Rule for Functional Methods per providing type."

**Established:** At load, walk checks the specification's Meet Rule for Functional Methods separately for each type that provides the pair of methods. A type provides what it declares and inherits, minus what its `override` declarations override. Every trait, object and object expression is checked. A generic type is checked once through a single type standing for all its instances (F-145); that check skips pairs of functional methods whose parameter types mention a static parameter, and pairs provided by a supertype whose type mentions a static parameter. Symbolic operators (`+`, `||`) are skipped, as the compiled checker skips them; if they were checked, only `EmptyString`'s `||` would be refused, and one added declaration would clear it (row 611; F-245, measured at `d212b2c1f`).

**Conditions:** Walk, at load. Not for symbolic operators, not for pairs involving static parameters in generic types.

**Consequence:** A library edit that adds functional methods breaking the rule in some type makes walk refuse every program at load (per `interpreter.md`). Operator pairs and generic pairs are not caught at load.

**Evidence:** `tests/FunctionalMethodMeet*`; detail `compile-ladder/rung-walk-meet/REPORT.md` sections 1 and 7.

**Could not resolve:**
- "Meet Rule for Functional Methods": the skill names it and its source (`overloading.tex`) but does not state it. I can guess (two overlapping functional methods need one at their meet) from SKILL.md's dispatch bullet. Language concept I lack.
- "each pair that a supertype whose type mentions one provides": parses only with "one" = a static parameter and the pair as the object of "provides". Awkward; resolved.
