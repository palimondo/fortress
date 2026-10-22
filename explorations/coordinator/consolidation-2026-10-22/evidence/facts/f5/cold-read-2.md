# Cold read 2: `facts/f5/clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (`records.md`, `gate.md`, `compiler.md`, `tests-writing.md`, `specification.md`, `library.md`, `interpreter.md`). All twelve entries are facts.

Two points recur in several entries, so they are given once here:

- **"Detail:" paths.** They omit `explorations/` (`compile-ladder/...`, `reviews/...`, `coordinator/...`). The reader can guess the prefix, but the entries do not say it.
- **What "pins the refusal" means for an `XXX` test.** `tests-writing.md` defines an `XXX` test as "Gated expected failure. It asserts the answer that the specification gives, and fails today", which turns red when the defect is fixed. It also says that a refusal at compile time is written as an `XXX` compile test with `compile_err_contains`. So in the compiled folders, an `XXX` test can mean either of two things: (a) a deferred defect, where the refusal is wrong, or (b) a pinned correct refusal, where the refusal is right. F-64, F-67, F-69 and F-75 use "pin" without saying which. This matters most in F-64.

---

## F-64: "The compiled checker refuses every type that an api declares ..."

**Established:** When the compiled checker checks an api, it refuses every trait or object declared in that api that extends a trait whose `comprises` clause contains `...`. It refuses the type whether or not the clause names it. So an api cannot both declare `T` and contain a `comprises { T, ... }` that lists `T`. This is ledger row 354, which is open.

**Conditions:** The refusal happens only when the checker checks an api (`.fsi`). In a component (`.fss`), types may extend such a trait. The specification's text allows `...` in an api's clause, and allows the api to declare an extender that the clause lists (`Specification/basic/traits.tex`, "Trait Declarations"). Only a `\note{}` box forbids the api from declaring an extender itself. Such notes appear only in draft builds and are hidden in release builds (`specification.md`).

**Consequence:** Until row 354 is fixed, do not write `comprises { ..., ... }` in an api that also declares one of the extenders. Declare the extenders somewhere else, or leave out the ellipsis. If a fix lets a listed type through, the team's `compiler_tests/XXX3q` and `XXX10p` turn red, so the fix must account for them.

**Evidence:** The specification section and the note named above; the two team tests; `compile-ladder/rung-library-defects/REPORT.md`, "Defects and their homes".

**Could not resolve:**
- `...` inside a `comprises` clause: a language concept I lack, and the skill does not cover it. The skill describes `comprises {A, B}` only as "every value has a listed type". I am guessing that `...` means "and further extenders that the api does not show".
- Whether the refusal is a defect a worker should fix. The text is unclear. "Row 354, open" says defect. But the entry sets the specification's text (allows it) against the draft note and the team's own tests (refuse it), and cites no decision of the curator that settles which side is right. Under the skill's rules that is a conflict, and a worker would have to switch to exploring. The entry does not say whether that applies here.
- "`XXX3q` and `XXX10p` pin the refusal ... turns them red": the text can be read two ways (see the note above). If they are expected-failure markers for row 354, a fix turning them red is the normal promotion. If they are the team asserting that the refusal is correct, a fix contradicts the team. The warning tone suggests the second reading, but the entry does not say so.
- "Whether the clause lists it or not" together with "a fix that skips it for a listed type": this implies that refusing an *unlisted* extender in the api is correct. The entry does not state that directly.

## F-65: "The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table ..."

**Established:** The checker caches (memoizes) the results of `TypeAnalyzer.parents` and `excludesClause`, keyed per trait table. The cache never changes a result. Setting `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off.

**Conditions:** The claim rests on reading the code (both functions depend only on the table and the type) and on one differential run on climb batch 7C's tree. The timings are from that run, except the 63 s figure, which is current. The time with the memo off has not been measured since then.

**Consequence:** Keep the memo on. It is safe and about ten times faster: 112 s against 1,149 s then, and about 63 s now (F-240). Turning it off is a way to debug, not to get different answers. With the memo off, expect the count stage to hit its 900-second limit.

**Evidence:** The differential run: 626 errors at the distance stage and 75 at the count stage, the same errors at the same sites with the memo on and off. With the memo off, the count stage hit its 900 s limit; a copy with the limit raised took 1,149 s. Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`, "The answer".

**Could not resolve:**
- "Trait table": an implementation term the skill does not define. I take it to be the checker's table of the trait and object declarations in scope.
- Whether the memo was audited answer by answer, as `compiler.md` step 5 asks for any reuse ("compute each reused answer again and compare"). The entry offers a code reading and an output comparison instead. That is a gap in the evidence's stated form, not in its meaning.
- Minor: the entry implies, but does not say, that the memo-off count of 75 came from the copy with the raised limit.

## F-66: "The checker-count stage's table, `gate/checker-count.txt`, lands with every batch ..."

**Established:** Every batch lands the count stage's table as `gate/checker-count.txt`, beside the gate's `summary.txt`. The total in the most recent landed table is the checker count that F-53 records. The batch's gate compares the new table with the newest landed one, but a change in the total never makes the gate red (P-39), because a fix can raise the total and the effects of separate rungs do not add up. The gate is red in three cases:
1. a crash line that no rung declared as expected (`expectedCheckerCrash`);
2. a table with no total;
3. a stale shadow. The shadow is an instrumented copy of `StaticChecker` in `checker-count/shadow-src/`. It is stale when the tracked `StaticChecker` no longer matches the checksum that `run.sh` records.

**Conditions:** This applies to a batch's gate.

**Consequence:** Do not treat a rise in the checker count as a failure. Before the gate, declare any checker crash you expect in the rung's manifest. If you edit `StaticChecker`, the shadow goes stale and the gate turns red.

**Evidence:** `coordinator/climb-batch-workflow.md`, "The checker count, and a rung whose test is that stage".

**Could not resolve:**
- "Step 8 of a batch's gate": this conflicts with the skill. `gate.md` says the gate has seven steps and names no step 8. The count stage appears in `SKILL.md` only as "Gate's stage". A worker cannot locate step 8 from the skill, so either the wording or the skill needs fixing.
- "Manifest": not defined in the skill (the rung's own file? a section of the batch brief?). Unclear wording.
- What a worker must do about a stale shadow: refresh `shadow-src/`, update the checksum in `run.sh`, or ask someone. The entry says when the gate goes red, not how to fix it.
- "A crash line": I take it to be the table's "first crash" line (`compiler.md`), but the entry does not say so.

## F-67: "The compiled type checker checks `nat` and `int` static parameters."

**Established:** The compiled checker checks size static parameters (`nat`, `int`). A size is one of three things: a size parameter's name, a literal, or an operation on sizes. Two sizes are equal only when their written forms match after the operations on numerals are computed. So `2 3` equals `6`, but `m n` does not equal `n m` (F-146). The checker refuses to infer a `bool`, `dim` or `unit` static argument. It does not compare `bool` arguments, so an object that extends both `Flag[\true\]` and `Flag[\false\]` passes the checker and then stops code generation (row 406, open). A call that leaves a size undetermined is refused with "Could not infer static argument ... without context".

**Conditions:** This applies to the compiled path only. When an overload set is refused is covered in F-69. Comparing `bool` arguments is part of P-40 still to build. Size equality is syntactic, not algebraic.

**Consequence:** Write `bool` (and `dim`/`unit`) static arguments explicitly, because the checker will not infer them. Do not expect the checker to treat commuted size expressions as equal: write sizes in matching forms. Do not rely on the checker to catch two `bool` instantiations of one trait. A size that a call cannot fix must be fixed by the call or written.

**Evidence:** `compiler_tests/NatInferredChecker`, `NatWrittenChecker`, `NatMethodChecker`, `NatExportChecker`, `XXXNatMismatchChecker`; `XXXNatBoolChecker` for the `bool` inference refusal; `compile-ladder/rung-nat-checker/REPORT.md` section 1. It builds P-40.

**Could not resolve:**
- "Refuses to infer a `bool`, `dim` or `unit` static argument (`XXXNatBoolChecker`)": the text can be read two ways. Is this refusal intended (a pinned refusal) or a deferred defect (an expected failure that asserts the specification's answer)? The `XXX` prefix fits either reading (see the note at the top), and the entry gives it no row.
- "Does not compare `bool` arguments": I read it as "cannot tell `Flag[\true\]` from `Flag[\false\]`, so it misses the two-instantiations rule". That makes sense only together with "passes it". Clear enough.

## F-69: "The compiled checker refuses a call whose most specific arm failed only on a size ..."

**Established:** Take an overloaded call whose most specific declaration ("arm") failed only because a size parameter cannot be determined from the call, where that size does not appear in the arm's parameter types (for example, it appears only in the result). The checker refuses the call with "Could not infer static argument nat n without context". If the undetermined size *does* appear in the arm's own parameter types, the checker silently drops that arm instead (row 400, open). If the argument's static type is a supertype of ("lies above") the arm's domain, the checker accepts the call, and the compiled run then dies when it reads the size (row 446, open).

**Conditions:** This applies to the compiled checker and compiled runs. Rows 400 and 446 are open and have no tests.

**Consequence:** Make each call fix every size its arm needs; otherwise expect the refusal. Be aware that an arm can be skipped without a message (row 400), and that a call can pass the checker and crash at run time (row 446). A worker who fixes row 400 or 446 has to write the first test for it.

**Evidence:** `compiler_tests/NatKnownSizeArm`, which compiles and runs a call that fixes the size; `XXXNatUnknownSize*`, which pin the refusal's message; `compile-ladder/rung-unknown-size-arm/REPORT.md` section 10. It builds P-40.

**Could not resolve:**
- "Arm": the skill does not define it, so it is unclear wording rather than a missing language concept. I take it to mean one declaration in an overload set.
- "It drops instead an arm ... (row 400, open)": is the drop itself the defect, or is row 400 about something next to it? I read the drop as the defect. The entry does not say what the correct behaviour would be (refuse the call? report it?).
- "A call whose argument's static type lies above the arm's domain": I read "lies above" as "is a strict supertype of". The entry does not say why the checker then lets the arm through.

## F-70: "The compiled checker checks a static argument written at a dotted method call against its parameter's bound, but not one written at a top-level function call."

**Established:** At a dotted method call (`x.m[\A\](...)`), the checker substitutes the written static arguments into each bound and refuses the call ("No such method") if an argument fails its bound (row 651, fixed). At a top-level function call, it checks only that the kinds match. So `n[\String\]("d")` is accepted for `n[\T extends Number\](s: String): T`, even though `String` is not a `Number` (row 470, open).

**Conditions:** This applies to the compiled checker. It holds for written static arguments, not inferred ones.

**Consequence:** Do not rely on the checker to catch a bad written static argument at a top-level call; check it by hand. No gated test can record row 470, because no harness form has a test that is green while the checker accepts a program the specification refuses. Record it by ledger row only (`tests-writing.md`, the third way).

**Evidence:** `compiler_tests/MethodStaticArgsBoundNamesOther*` (they accept dotted calls whose arguments meet their bounds). No test pins the dotted-call refusal; a probe showed it (`rung-checker-contexts/REPORT.md` section 6). Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.

**Could not resolve:**
- "Puts the written arguments into each bound": I read it as substituting them into bounds that mention other parameters (such as `T extends Comparable[\T\]`). Clear enough.
- Minor: row 651 is "fixed", yet "No test pins the refusal". `records.md` closes a row with `--test NAME`, so the reader wonders which test closed 651. Presumably the accepting tests did. This does not block understanding the fact.

## F-?1: "No static parameter of the interpreter's library is bounded by `Object` ..."

**Established:** Under walk, passing a tuple, `()` or a function (arrow) value to a parameter whose type is a type variable bounded by `Object` stops the program with an `InterpreterBug` rather than a type error (row 471, open). This happens only when the bound `Object` is written, because walk installs a written bound before it unifies the arguments. No static parameter in the interpreter's library is written `extends Object`, so no library declaration hits this stop. The library's result-only parameters are unbounded (P-48, F-84). Six functions in `FortressLibrary` write `extends Any`, which admits tuples, `()` and arrows: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy`. The api declares the first five that way, and `copy` appears there only in a comment. By contrast, the specification's examples and the compiler tests do write `extends Object`.

**Conditions:** This applies to walk only. The stop needs a bound written `Object`; an unbounded parameter is bounded by `Any` under walk and does not trigger it. Row 471 has no test, and the probe that showed the stop is no longer in the tree.

**Consequence:** Do not write `extends Object` on a static parameter in the library. If you do, a tuple, `()` or arrow argument will crash walk. A user program that follows the specification's own examples (`extends Object`) can hit the stop under walk. Fixing row 471 needs a new reproducer, since the probe is gone.

**Evidence:** `git grep -nE '\[\\[^\\]*extends +Object' -- Library ProjectFortress/LibraryBuiltin` prints nothing; `Library/FortressLibrary.fss:33-72`; `SpecData/examples/basic/Fun.Decl.fss:19`; `ProjectFortress/other_compiler_tests/Go1a.fss:15`; the probe recorded in row 471. Detail: `compile-ladder/rung-result-bounds/REPORT.md` section 10.

**Could not resolve:**
- The entry number "F-?1" is a placeholder, so the entry cannot be cited by its number.
- "Result-only parameters": the skill does not define it, so it is unclear wording. I take it to mean static parameters that appear only in the result type. The entry also does not say why they matter here: presumably they could have been given an `Object` bound, and P-48 left them unbounded.
- "Walk installs a written bound before it unifies the arguments": "installs" is vague. With `interpreter.md` ("Each static parameter gets an interval"), I read it as "sets the interval's upper bound to the written bound". That gives a mechanism, but the entry does not say why `Any` (written or implicit) does not trigger the same stop.
- The title is two claims joined by a colon, and the order makes it hard to read. The defect (the walk stop) is the substance, and the library's freedom from it is the consequence, but the title leads with the consequence.

## F-71: "The compiled checker does not narrow the variable of the shorthand form `typecase x of T => ...` ..."

**Established:** There are three forms of `typecase`:
1. Shorthand, `typecase x of T => ...`. The compiled checker does not give `x` the type `T` inside the clause. So a clause that uses `x` as a `T` is refused when compiled and runs only under walk. A clause that does not use `x` as a `T` (as in the library's `instanceOf`) passes.
2. Binding, `typecase x = e of ...`. Neither path accepts it: it parses as the equality `x = e`. Only the specification's grammar has it, in a section that the team's note says awaits the pattern-matching proposal (`typecase.tex:15`).
3. Clause-binding, `typecase e of y: T => ... end`. It works on both paths.

**Conditions:** The first two refusals are row 460, and no test gates them.

**Consequence:** Write the clause-binding form, as the library's `cast` does (`typecase x of x':T => x' ... end`; F-134).

**Evidence:** The library's `cast` and `instanceOf`; `typecase.tex:15`; row 460. Detail: `compile-ladder/rung-exclusion-remainder/REPORT.md` section 15.

**Could not resolve:**
- "Row 460 records both refusals": which two? I take them to be the checker's lack of narrowing in the shorthand form and both paths refusing the binding form, but "refusals" could also be read as the shorthand-clause refusal and the binding-form parse. Unclear wording.
- The entry does not say whether the specification requires narrowing in the shorthand form. So it is unclear whether row 460 is a departure from the specification that a worker should fix, or only a missing convenience. Row 460's status (open or not) is also not stated.

## F-72: "The compiled checker reads a `comprises` clause for a generic subtrait as the team's 2012 texts do ..."

**Established:** Take a trait with a `comprises` clause (the "closed trait") and a generic subtrait that the clause does not list. The compiled checker accepts the subtrait extending the closed trait if two things hold: the trait table knows at least one type that immediately extends the subtrait, and every such type is below a type the clause lists. This follows Luchangco's Types chapter and Welterweight (P-44), and builds P-44. It does not change the ellipsis refusal of F-64 (row 354).

**Conditions:** The check sees only extenders in the same compilation unit; an extender in another unit escapes it (row 487, open). Row 487 belongs to phase 3's work, but no batch is assigned to it. Two known defects are parked for the curator: the verdict changes if the extender renames its type variable (row 489), and extenders are found by matching the trait's unqualified name as text (row 490).

**Consequence:** A generic subtrait that the clause does not list is accepted only when it has at least one immediate extender that the checker can see, and all of those extenders sit under listed types. Do not rely on the check across compilation units. Rows 489 and 490 are not to be fixed without the curator's word.

**Evidence:** `compiler_tests/ComprisesGenericSubtrait`; `compile-ladder/rung-comprises-checker/REPORT.md` section 6.

**Could not resolve:**
- "Generic subtrait": the text can be read two ways. Is it a subtrait with static parameters, or any subtrait? I lean towards "has static parameters" because of Welterweight, but the rule as stated would make sense for either.
- "Closed trait" and "trait table": not defined in the skill. I read "closed trait" as a trait with a `comprises` clause; "trait table" as in F-65.
- "On phase 3's road with no batch named": unclear wording. I read it as "planned within phase 3 (the checker at zero) but not scheduled".
- "Luchangco's Types chapter": probably `Documentation/Specification/Prose/Language/types.tick` (`specification.md`), but the entry does not say. Welterweight is not located either.

## F-73: "The compiled checker infers a generic's static arguments with coercion ..."

**Established:** The compiled checker uses coercion when it infers static arguments. Take a type parameter that is the entire type of every parameter it appears in (such as `T` in `pick[\T\](x: T, y: T)`). It is inferred as the narrowest type that all its arguments convert into and that its bound permits. Candidates are the arguments' own types, their coercion targets, and the bound, but the bound only if it is a trait type other than `Object` or `Any`. A declaration that needs coercion ranks below one that does not. A tie among declarations that need coercion is refused with "Ambiguous coercion", except in three narrow cases. When tied declarations differ only where the call passes a numeral, the numeral is read as `ZZ32`, or `ZZ64` or `ZZ` if it does not fit. This reading is a default awaiting the curator's review (item 209). The checker refuses a call with more than 64 combinations of candidate types (row 506), and a call with an untyped function argument (row 507).

**Conditions:** This applies to the compiled checker, and only to a parameter that is the whole type of its parameters (not nested, as in `List[\T\]`).

**Consequence:** Expect mixed-number calls such as `pick(1, 2.0)` to infer the common conversion target. Expect "Ambiguous coercion" for tied coerced overloads. Give function arguments explicit parameter types. Keep the candidate count small. Treat the numeral-tie reading as provisional.

**Evidence:** `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC`, `InferCoercionShapes` (also cited by F-51); `XXXInferAmbiguousCoercion`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2. It builds P-74 and P-49.

**Could not resolve:**
- "Outside three narrow cases": the entry does not say what they are. A worker must read the report's section 3.2 to know when a tie is *not* refused. The fact is not self-contained on this point.
- "Untyped function argument": I read it as a function literal whose parameters have no declared types (`fn x => ...`). Fairly clear.
- Whether rows 506 and 507 are open defects or accepted limits: their status is not given.

## F-74: "Under walk, an integer numeral takes its type from its value ..."

**Established:** Under walk, an integer numeral has a type chosen by its value: `ZZ32` if it fits in 32 bits, `ZZ64` if it fits in 64, and `ZZ` above that. Its run-time representation is `Int`, `Long` or `BigNum` (library value objects below `ZZ32`, `ZZ64` and `ZZ`). Walk instantiates generics at that run-time type, so a `Box[\Int\]` is a different type from `Box[\ZZ32\]`, and dispatch passes over a declaration that expects the latter (row 364). This is why P-76's walk half waits; its library half, F-79, is built. Probe Q tried making every integer numeral an `IntLiteral` under walk. That change alone altered 59 test verdicts. With four extra mechanisms, the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design (3 of them team tests that assert a `ZZ32`), 9 for lack of static types (rows 364 and 510), and 9 walk gaps. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above that (row 486; F-140).

**Conditions:** This holds for walk until walk gets the checker's static types. Probe Q's numbers predate climb batch N's second run and the landing of the library half, so they may be stale.

**Consequence:** Under walk, expect generic values built from numerals to carry `Int`/`Long`/`BigNum` as their static argument, and expect them to miss declarations typed with `ZZ32` and the like. P-76's walk half cannot proceed until walk has static types. Switching numerals to `IntLiteral` today would break 24 passing tests.

**Evidence:** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`; `compile-ladder/plan-n/probe-q/PROBE-Q.md`; `reviews/numeral-switch-judgement.md` sections 2 and 3.

**Could not resolve:**
- "It stays so until walk has the checker's static types": the text can be read two ways. It could be a statement about the project ("this will not change until walk gets static types") or about a value ("the numeral keeps this type until ..."). I took the first reading.
- "Dispatches past it": unclear wording. I read it as "a call skips the declaration whose parameter is `Box[\ZZ32\]`", since generics are invariant.
- "Four devices": unclear wording ("workarounds"), though the parenthesis lists them.
- P-76 is cited only through its "walk half" and "library half". The entry does not say what P-76 decides, so a reader learns what waits but not what the goal is.

## F-75: "The compiled checker checks the Return Type Rule over every instance, and a positional rule ..."

**Established:** The compiled checker applies two checks to pairs of generic overloads where one is more specific than the other:
1. **The Return Type Rule on every instance.** It checks the rule on every instantiation, as P-45 asks.
2. **A positional rule.** When the two declarations have the same number of their own static parameters, the parameters must agree in kind position by position. The more specific declaration's return type must also be a subtype of the other's, after the other's parameters are renamed to its own by position.

Because it checks every instance, the checker also refuses a generic declaration next to a plain one whose domain is an object type. The type group's 2011 paper accepts such a pair, because it ignores instances whose domains cannot meet (row 542, open).

**Conditions:** The positional rule applies only when the static-parameter counts are equal. Limiting it to equal counts and comparing kinds were choices the rung made (defaults). Item 60 lists the scope for the curator, and item 57 lists the difference from the paper; no work needs either settled. The rules refuse nothing in the interpreter's library: the distance has no return-type or overloading error (F-53).

**Consequence:** Overloads that pair a generic declaration with a plain declaration on an object type will be refused even though the paper allows them. Avoid that shape. The library is unaffected.

**Evidence:** `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced` (accept); `XXXOverloadReturnEveryInstance`, `XXXOverloadPermutedStaticParams` (pin the two rules' refusals); `XXXOverloadReturnObjectDomain` (pins row 542's refusal). Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2. It builds P-45.

**Could not resolve:**
- "A generic declaration beside a plain one whose domain is an object type": the text can be read two ways, because "whose" can attach to either declaration. I read it as the plain declaration's domain.
- `XXXOverloadReturnObjectDomain` "pins row 542's refusal": because row 542 is an open defect, this `XXX` test reads as an expected failure that turns red on a fix. But "pins" here sits beside the other two `XXX` tests, which pin *correct* refusals. The same word covers both meanings (see the note at the top).
