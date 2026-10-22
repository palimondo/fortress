<!-- The orientation workflow's preservation check for the consolidation of 2026-10-22: each loss or overstatement of orientation.md against the old revival part, its disposition table and the record, with the consequence for a worker. A review artifact. -->

# Preservation check of the orientation

Mode: consolidate. Inputs: `orientation.md`, `outline.md` and `disposition.md` in this folder; the old part `.claude/skills/fortress-repo/references/revival-changes.md` at `cc1da1cda` ("old" below, by line); the destinations that the table names, read on this base (`SKILL.md`, `references/interpreter.md`, `compiler.md`, `library.md`, `specification.md`); and the FACTS and POSITIONS entries that the table and `sources-mapping.md` name. "New" quotes `orientation.md` by line. Nothing was run but reads and greps, and one read of the checker's source (P14).

## Failures

Ordered by consequence, most severe first.

**P1. Rows 28 (S3): the checker's silent reading of the other `where` forms is lost.**
- Old (248): "The checker still skips a clause that binds a variable or holds another kind of constraint, so the entry holds at every instance."
- New: nothing. S3 (line 41) says "Only the `where` forms that the team wrote are built (P-151). Conditional extension is an `extends` entry under a `where` clause that binds no variable and states only `T extends SomeTrait`." It does not say what happens to another form. Disposition row 28 moves only "the parts of a declaration that the condition does not cover ... and row 773" to `compiler.md`, and `compiler.md:39` does not hold it. F-255 does: "A clause that binds a variable, or that holds a constraint that is not a trait constraint, is read as before: as a parent at every instance."
- Consequence: a worker who writes such an entry expects a refusal or a conditional parent. Instead the checker silently makes the parent unconditional, and every instance passes.

**P2. Rows 28 and 33 (T6): the list's order is stated for both paths, and its `=` is dropped.**
- Old (248): "So the checker orders a list only where its elements are totally ordered, gives no order to a list of `RR64`, `QQ` or ranges, and tests two lists of pairs for equality element by element"; (250) "walk and the compiled run time read the extension at every instance (ledger row 774)".
- New (33): "A `List[\E\]` is ordered only where `E extends StandardTotalOrder[\E\]` (P-154), so a list of `RR64` has no order." No path is named, and nothing says that `=` stays. P-154 says "on the compiled checker a list of floats or of `QQ` has no order ... though its `=` stays" and "Row 774: walk's half, since walk still gives every list an order." S3's row 774 sentence (line 46) speaks of conditional extension in general and does not reach T6's reader.
- Consequence: a worker expects walk to refuse `<` on a list of `RR64`. Walk runs it, so a walk test passes that the compiled checker refuses. A worker can also take list `=` to be gone with the order.

**P3. Row 6 (D2): the scope "where a declaration has static parameters" is lost.**
- Old (71): "both paths read exclusion over the whole tuple of parameter types, and over every supertype of each, where one or both declarations have static parameters."
- New (13): "**Exclusion is read over the whole tuple of parameter types (P-152).**" It gives no scope. P-152 reads "the exclusion of two generic declarations", and F-258 reads "two declarations, one or both with static parameters".
- Consequence: the sentence says more than its sources. A worker who relies on it for two plain declarations, such as parameters of types that extend `Tg[\3\]` and `Tg[\4\]`, expects walk to load the pair. Walk refuses it (row 416; F-252: "two plain declarations so typed are refused").

**P4. Row 17 (T5): the compiled `VerifyError` and the second bound form's condition are lost.**
- Old (151): "A compiled body that returns `self` still fails the JVM's verification when its class loads with the parameter at an object type." Old (149): the second form is a parameter bounded "by a trait with a self-type parameter that `T` extends at `X`".
- New (31): the `VerifyError` is absent, and the rule ends "So `floor(self): I = self` needs no cast. Walk is unchanged." The second form becomes "or a trait that extends a self-typed trait at `X`", without the bound on `X`. `compiler.md` holds neither. F-225 holds both: "a parameter bounded by a self-typed trait that the trait extends at that parameter", and "dies at class load with a `VerifyError` ... an open defect (row 695)".
- Consequence: a worker who follows "needs no cast" in compiled code meets a `VerifyError` at class load, without the pointer to row 695, and may report it again. A trait whose `X` is not bounded by the trait it extends is taken as self-typed.

**P5. Row 30 (S4): row 675, the kind check and walk's refusal of a negative exponent are lost.**
- Old (262): "The checker checks a computed size against its parameter's kind, as it checks a numeral. ... The compiled path computes a size when it names a class, so `Box[\2 + 1\]` and `Box[\3\]` are one class; the class loader does not check a size that it computes against its parameter's kind (ledger row 675). Walk computes a power exactly, as the compiled path does. Both compute no power at a negative exponent, which only a static parameter can give, and walk refuses it."
- New (48): only "No path computes a negative exponent." Disposition row 30 names no move, and `compiler.md:58` says only that the class loader was "changed ... for sizes". F-222 holds the rest: "The compiled class loader checks no size it computes against its kind, and stops on a negative exponent with a Java exception (row 675)."
- Consequence: a worker sees `next[\4294967295\]()` answer 4294967296 compiled, or a Java exception at a negative exponent, and either trusts the value or reports a known defect. Without "walk refuses it", the worker cannot tell walk's refusal from a failure.

**P6. Row 38 (N4): the compiler's powers are cut, and what remains says more than its source.**
- Old (319): "It declares the `ZZ32`, `NN32` and `NN64` powers at their own type, each with an exponent of the same type, and no `ZZ64` or `ZZ` power. Its `ZZ32` power answers 0 at a negative exponent, and at a base of 0 it throws a Java exception that no Fortress `catch` sees (ledger rows 441 and 523)."
- New (58): "Until the switch-over, the compiler's `ZZ32` power gives 0 at a negative exponent (rows 441, 523)." F-263 says it "gives 0 at every base but 0, 1 and -1, and a raw Java `RuntimeException` at a base of 0". `compiler.md` names no power.
- Consequence: in a compiled test, `0^(-1)` inside `try ... catch` escapes the catch. A `ZZ64` or `ZZ` power, or a mixed exponent type, fails to compile, with no hint. The new sentence also gives 0 for the bases 1 and -1, which are wrong.

**P7. Row 25 (R1): walk's contexts, the "body param 1" stop and the checker's condition are lost.**
- Old (205): the instance applies "also where it is the last expression of a block that gives that value. A method's return type, a field's or a top-level variable's type, a parameter's type and an assignment do not direct it". Old (209): "An element that converts to the instantiated type is converted, as at a call. Any other element stops inside `__bigOperator`, with "body param 1"." Old (213): the checker takes "the expected type where the reduction's type at that bound does not fit it".
- New (62): "a local variable's, or a top-level or local function's return type. A method's return type, a field and a parameter do not direct it." It also says "Other reductions take their bound, or the expected type." The block case, the top-level variable, the assignment, the conversion of elements and the "body param 1" stop are absent. Disposition row 25 marks only the code names and the result-trait reading as history. F-228 holds the full list ("a top-level variable, a field, an assignment, a function expression, a branch, a call's argument ...", "also where the clause form ends a block"). F-59 holds the "where the bound does not fit" condition.
- Consequence: a worker expects `x := SUM[...]`, or a typed top-level variable, to direct walk's instance. It does not, and an empty `SUM` gives the integer 0. Meeting "body param 1", the worker does not know that it means an element that does not convert.

**P8. Row 48 (R2): walk's refusal at load is extended to generic reductions.**
- Old (388): "walk refuses such a reduction at load, and one with static parameters stops at its first join."
- New (64): "Walk refuses at load a reduction that declares `simpleJoin` at `Any` or untyped." F-144 says "One with static parameters escapes that check and stops at its first join (row 665)", and `sources.md:436` says "a reduction without static parameters".
- Consequence: the sentence says more than its sources. A worker trusts the load check to catch a generic reduction at `Any`. It loads, and stops at run time at the first join.

**P9. Row 21 (S1): two of walk's `Bottom` cases are rewritten, one into another case.**
- Old (179-180): "a parameter that an argument bounds only from above, whose bound names another static parameter (ledger row 612); a parameter that only the result of a function expression without a return type fixes (ledger row 587)."
- New (37): "to one bounded only through another static parameter (row 612), and to one fixed only by a function expression's result (row 587)."
- F-141 records row 612 as "a bound only from above that mentions another static parameter". It also records a separate rule: "a parameter that only another fixed parameter's bound mentions takes that parameter's instance, not its own bound: `ap[\T, A extends T\](a: A)` gives `T` the type of `a` (D3, row 592)". Row 587 is "with no declared return type".
- Consequence: the new row 612 phrase fits the `ap` case, where walk does not give `Bottom`. A worker expects `Bottom` there, or files that case under row 612. For row 587, the worker expects `Bottom` even when the function expression declares its return type.

**P10. Row 24 (S1): what a generic type that holds the open parameter admits is lost.**
- Old (198): "A generic type that holds the open parameter admits no more than it admits at `Bottom`."
- New: nothing. Line 37 says only "an F-bounded parameter stays open, printed `OPEN`", and `SKILL.md:132` says "stays open, and every value passes it". F-143 holds it: "beside `pick(x: Any)`, `pick(x: (T,T))` does not take `(1, 2)`" (row 663, contested).
- Consequence: from "every value passes it", a worker expects `Box[\OPEN\]`, or a tuple over `OPEN`, to take any argument at dispatch. It takes none, and the call goes to the other declaration.

**P11. Row 5 (D4): "not at load" says more than its source, and "or object" is dropped.**
- Old (46): "At load, walk does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call ... (ledger row 780)."
- New (17): "Walk compares two functional methods of a generic trait at each call, not at load (row 780)."
- F-257 says that a pair "of neither kind above, as a functional method of a generic trait beside another", keeps the parameter check's refusal at load ("with generic type, at least one pair of parameters must have excluding types"). F-142 says that walk checks the Meet Rule for Functional Methods at load through a stand-in. F-252 reads "a generic trait or object".
- Consequence: a worker who meets a load refusal of two functional methods of a generic trait takes it for a new defect against the skill. A worker who writes such methods in a generic object takes it as outside the rule.

**P12. Row 22 (D3): walk's comparison on the instance and the scope of "Cannot unify" are lost.**
- Old (186): "walk compares their declared domains where one lies strictly inside the other. Otherwise it compares them on the instance that the call makes." The "Cannot unify" sentence is about "a generic method that a trait declares".
- New (15): "Walk chooses by declared parameter types, never by the order of the declarations." Then: "A call with an argument outside a bound fails, "Cannot unify"."
- F-26: "Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes." F-253: "the same method declared in an object fails with 'Meet(Int, Shape) not a singleton'". The writer's log also lists the instance comparison as not placed.
- Consequence: a worker predicts a choice on declared domains where walk compares instances, as for crossing or equal domains, and misreads which declaration runs. A worker who searches for "Cannot unify" does not find an object's method, which fails with "Meet(...) not a singleton".

**P13. Row 13 (D5): the top-level overload check's reading of abstract functional methods is lost.**
- Old (123): "The checker's check of top-level overloads also reads every functional method, abstract ones too, so it refuses `h(self): ZZ32` abstract in a trait beside a top-level `h(x: String): ZZ32`."
- New (19): "Abstract declarations count: an abstract and a concrete method with the same parameter types in one trait are refused." This is scoped to duplicates within one trait. Disposition row 13 sends only "the three messages, the top-level check's skip of an implemented abstract method, and "object" in the message" to history, so this sentence has no destination. It is not in F-80, F-223 or any other FACTS entry (grep for "top-level overload" and `h(self)`), nor in `compiler.md`.
- Consequence: a worker adds an abstract functional method to a library trait beside a top-level function of the same name, expects it to pass, and the checker refuses it.

**P14. Row 53 (L2): "only where" says more than its source.**
- Old (420): "Where the function leaves out a parameter type and several of the api's declarations fit it, the checker takes none, and the function keeps its return type left out."
- New (70): "A component's function may leave out its return type only where one api declaration at its parameter types gives it."
- F-254: "With none or several, it takes none, and the declaration is left as written." Neither source makes the omission an error. The checker then types the body and takes its type: `scala_src/typechecker/impls/Decls.scala:219-222` (`case None => ... getType(newBody)`).
- Consequence: a worker reports, or rewrites, valid declarations that leave out a return type.

**P15. Row 32: the disposition sends walk's row 755 to `compiler.md`.**
- Old (278): "walk refuses at load a member whose declared type names the variable, and the checker crashes at a call ... (ledger rows 755 and 756)."
- Disposition row 32: "rows 751, 752, 755, 756 to `compiler.md`; walk's rows 754 and 778 to `interpreter.md`". Ledger row 755 is "implementation gap (walk)": "refused at load when a member's type names the variable ... 'Missing type E'".
- Consequence: after the install, `interpreter.md`, "What walk checks", the list of walk's refusals at load that a library edit can trigger, does not hold this refusal. A worker who gives `AnyList`, or another such trait, a member typed by `E` stops walk at load with no entry to explain it.

**P16. Row 30 (S4): the refusal of the `T[\n+1\]` and `T[\0\]` pair is stated as the tree's behaviour.**
- Old (262-263): the consequence of the rule is "in `typecase N[\b0\] of N[\0\] => ...` ... the arm `N[\0\]` is reachable". The overload pair appears only in the reason: "The team's questions and answers ... refuse two overloads at `T[\n+1\]` and `T[\0\]`."
- New (48): "A static parameter is not known to differ from a numeral, so overloads at `T[\n+1\]` and `T[\0\]` are refused." This holds for no named path. P-55 and F-176 give only the `typecase` consequence, and no FACTS entry, ledger row or test records a refusal of the pair (grep). In the team's question (`Specification/appendices/internal-document.tex:168-180`), the pair is two methods of `trait Foo[\nat n\]`, the kind of pair that walk compares only at a call (row 780).
- Consequence: a worker relies on a refusal that neither path is known to make, or takes walk's loading of the pair for a new defect.

**P17. Row 36 (N3): the numeral tie says more than F-73.**
- Old: entries 35 and 36 have no such sentence. The outline brought it from F-73.
- New (56): "Where several declarations apply only by coercion and none is more specific, both paths stop: "Ambiguous coercion". The checker reads a tie that only a numeral makes as `ZZ32`."
- F-73: "A tie among coerced declarations is refused, "Ambiguous coercion", outside three narrow cases ... the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit; that reading is a default."
- Consequence: for a numeral beyond 32 bits, a worker predicts the `ZZ32` declaration where the checker takes `ZZ64` or `ZZ`. The worker also expects a refusal in F-73's three cases, where the checker accepts.

**P18. Rows 8, 17, 31, 36 and 50: parts that the record calls defaults or facts stand in rules that name a P-entry.**
- Reading contract (5): "A rule that names a POSITIONS entry (P-N) states a decision of the curator." A rule is one paragraph. The outline's budget asks for a P-entry only beside the part that it decides, and names F-239 and F-225 as such parts.
- L1 (68) names P-12 and holds walk's `Maybe` `if`, which F-239 calls "a default, the coordinator's call at climb batch 16".
- T5 (31) names P-146 and holds the second bound form, which F-225 calls "a default of the coordinator's".
- S4 (48) names P-55 and holds `NatParam`'s binding, which F-270 calls "a default, way 4a of fork 3".
- N3 (56) names P-59 and P-74 and holds the numeral tie, which F-73 calls "a default".
- T1 (23) names P-43 and P-97 for "and walk does not". F-44 states that as a fact, and row 416 records it as a walk gap.
- Consequence: a worker cites these parts as decisions of the curator. A worker can also take walk's lack of instantiation exclusion as decided rather than as row 416's open gap.

**P19. Row 11 (T4): "Walk checks no generic object" says more than its source, and the checker's limits are dropped.**
- Old (108): "Walk makes no abstract-method check on a generic object (ledger row 665)." Also: "The compiled checker splits the tuple of parameter types in the same way, and stops at the same limits."
- New (29): "Walk checks no generic object (row 665)." The new rule also says nothing of the checker's limits.
- F-142 and F-147 say that walk checks a generic type's Meet Rule for Functional Methods and its `override` declarations, through a stand-in. F-145 says the checker covers "within the same bounds". `compiler.md` does not hold those bounds.
- Consequence: a worker expects walk to load any generic object, and is surprised by a refusal at load. A worker cannot tell why the checker refuses a cover that it cannot settle.

**P20. Row 3 (D5): the path of the `self`-position refusal is dropped.**
- Old (34): "the checker refuses two functional methods with equivalent parameter types wherever their `self` parameters stand."
- New (19): "So `f(self, y: S)` beside `f(x: S, self)` is refused."
- F-223 records this refusal for the checker only (`compiler_tests/XXXNoDuplicatesRuleSelfPositions`). The walk refusal that it records is for generic pairs.
- Consequence: a worker writes a walk test that expects this pair to be refused at load, with nothing in the record to say that walk refuses it.

**P21. Row 45 (N2): walk's failed dispatch is lost, and one sentence says more than its sources.**
- Old (361): "Walk stops at a plain array's `+` and unary `-` with a failed dispatch."
- New (54): absent. The same rule says that `IntLiteral` "converts to each number type". F-79 and P-76 list conversions into the five integer types, `QQ` and `RR64` (and `AnyIntegral`), not `RR32`.
- Consequence: a worker who meets the failed dispatch does not tie it to the plain array, and expects a numeral to convert into `RR32`.

**P22. The opening rows (old 11 and 15): one example and the definition of the Working Draft are lost.**
- Old (15): "Three examples: the number types form a tower, fixed-width arithmetic wraps, and walk converts no argument." Old (11): "The Working Draft is the unrevised specification, in `Specification-1.0-frozen/`."
- New (7): two examples, "the number types do not nest, and walk converts arguments". Line 5 does not define the Working Draft, though D1 and T1 cite it (lines 11 and 23). The outline's items 4 and 6 keep both. `specification.md:6` defines the term, but the orientation is read after `SKILL.md`, not after `specification.md`. Overflow itself stays in `SKILL.md`.
- Consequence: a worker who meets a team note that says walk wraps is not warned here. A worker reading D1 or T1 cannot locate the Working Draft.

## Rows checked

59 rows: the 54 entries of `disposition.md` and the 5 rows of its "The opening and the headings" table.

- Failures touch 18 entry rows: 3, 5, 6, 11, 13, 17, 21, 22, 24, 25, 28, 30, 32, 33, 36, 38, 45, 48 and 53. They also touch 2 opening rows, and the P-entry placement (P18) adds rows 8, 31 and 50.
- The other rows pass. Each has its rule in the new text or in the destination that the table names, as read on this base. Their History and FACTS-pass rows have their current fact in the FACTS or POSITIONS entry named: 14 (P-53), 15 and 16 (F-259), 18 (row 671), 19 (F-230), 26 (F-227), 41 (F-89), 42 (F-91, P-52), 43 (P-56), 46 (F-264, F-35), 47 (P-54, F-90), 49 (F-93), 51 and 52.
- Two passes depend on the install, as the disposition and the writer's log say. D4's pointer to `interpreter.md`, "What walk checks", reaches the rows only after rows 5 and 6 move there; `interpreter.md:38` still points back to the old part. Discrepancy U1 (`library.md:25` against F-59) stays until it is settled.
- T3's list of exceptions omits walk's own exception at an instance of a generic trait. It passes because `interpreter.md:43` holds that exception.
