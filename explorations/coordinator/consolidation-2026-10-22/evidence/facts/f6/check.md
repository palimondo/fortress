<!-- The check of FACTS chunk f6's clarity rewrite (F-76, F-79 to F-87): each clean entry against the record's text and its sources, and the cold reader's answers against the source meaning, with each failure classed. -->

# FACTS chunk f6: the check

Read at `main` `64e30f6e3`. For each entry I read the record's text (`facts-extract.sh 'F-N'`), its history, the gap-ledger rows it names, the report sections it cites, and the code or test where a claim rests on them. The clean text is `clean.txt`; the reader's answers are `cold-read.md`. Concepts already listed in the writer's `concepts.md` are not repeated unless the reader's answers show a gap in them.

Summary: two entries say more than their sources (F-82, F-84), and three drop or widen a condition in a smaller way (F-76, F-83, F-85). Every failure can be fixed by wording, and each section below gives the wording. F-86 passes.

## F-76

**Fidelity.**
- The coverage limit "for a tie without coercion" is missing. The writer's note says it was left out on purpose. Clean title: "types a call whose argument's static type stands between closed traits and their listed types by the intersection of its candidates' return types". Source: `rung-return-type-rule/decision-record.md` section 4 types "a tie among candidates that fit without coercion, without promotion and without written static arguments ... the meet of the tied candidates' return types". P-60 says the same: "sound for ground declarations, at calls that need no coercion". The record's current text also lacks the limit, while its 2026-10-13 text had it ("types a tie without coercion"). As written, a reader concludes that a call needing coercion is typed by the intersection too. The case is narrow, but the condition costs four words.
- Rows 546 and 543 are joined by an "or", so the reader cannot tell which case leads to which outcome. Clean text: "a family whose declarations have static parameters is refused (row 546), or its call is typed by one candidate chosen by a sort". Sources:
  - Row 546 and decision record section 3: coverage refuses the pair when any of the three declarations it compares (the two overloads and the one that covers them) has static parameters.
  - Row 543: the family is *accepted*, and a call is typed by the head of a sort when *any other* declaration of the family has static parameters.
  The clean text drops the condition that says which outcome applies.
- "(row 543, deliberate)". Settled: it is a default. The rung's judge chose it (`JUDGE.md` D6; decision record section 4: "keep the scope, gate the shape and put the narrowing to Pavol"), and review-queue item 58 holds it for the curator: "Typing a call between two closed traits by the intersection of return types is limited to families with no static parameters (row 543), narrower than the text's boundary." The clean text does not present it as his ruling, but it does not say whose choice it is either.

**Comprehension.**
- Same as the source: the reader got the coverage rule, the two run-time failures (rows 540, 559) and the dependence on the order of compilation (row 547).
- Different from the source:
  - "Or" read two ways. This is the second fidelity point above.
  - "Chosen by a sort" orders by what? Source: the sort's head "follows declaration order and varies from run to run" (decision record section 4; row 543).
  - "Deliberate", whose choice? Settled above.
  - "Its candidates": the covering declarations, or every applicable one? Source: the tied most specific declarations (P-60: "may have several most specific declarations. The call's type is the intersection of their return types").
  - "Used only in overload checking", kept out of what? Source: P-60, "not in its general subtype test".
  - Where is "the specification's `comprises` example"? Source: row 492, `Specification/advanced/overloading.tex`, "The Meet Rule for Functions".

**Class.**
- Concept the reader lacked: "closed trait", a trait with a `comprises` clause. It belongs in the `fortress-repo` core, "Traits and objects, no classes", beside `comprises`. `concepts.md` already lists it.
- Wording. Title: "... and types a call whose argument's static type stands between closed traits and their listed types by the intersection of the return types of its most specific declarations, when they tie without coercion." Body, in place of the first open item: "Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546). In an accepted family that has any other generic declaration, such a call is typed by the head of a sort, which follows declaration order and can vary between runs, not by the intersection (row 543; a narrower scope than P-60's, a default that waits in review-queue item 58)." After "coverage check used only in overload checking", add ", not in the checker's subtype test". After "the specification's `comprises` example of the Meet Rule", add "(`Specification/advanced/overloading.tex`, 'The Meet Rule for Functions')".
- Minor, left as it is: "below a generic subtrait". Row 487 gives the generic case alone and says nothing about a subtrait that is not generic.

## F-79

**Fidelity.**
- The correction is right. The clean text says that `IntLiteral` is "declared on the model of the compiler's prelude", where the record said "the compiler library's `IntLiteral`". The interpreter's library declares its own `object IntLiteral extends { Number }` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179`; P-76: "The design is the compiler's prelude's working one").
- The path is now stated, and walk's numeral types are P-76's.
- One reason is broader than its source. The record already had it. Clean text: "`IntLiteral` declares `Integral[\I\]`'s members, `zero` and `one` itself, since no declaration of `Integral` applies to it, even with coercion." Source: `rung-numeral-library/REPORT.md` section 6, with the judge's reading, gives three different reasons:
  - "no instance of them is applicable" holds for `odd`, `even` and `DIVIDES`;
  - for `floor`, `ceiling`, `truncate` and a power of numerals, "the declarations applicable with coercion tie";
  - "a getter is a member of the type", so `(3).zero` needs `IntLiteral`'s own.

  The entry gives the first reason for all of them.

**Comprehension.**
- Same as the source: the reader got the split between the paths, the coercions, and why the integer types keep their own operators.
- Different from the source:
  - "`Integral[\I\]`'s members, `zero` and `one`" can be read as a list of what the members are. `zero` and `one` are `Integral`'s getters (`Library/FortressLibrary.fsi:447-449`), so that reading undercounts: `IntLiteral` also declares `odd`, `even`, `floor`, `ceiling`, `truncate`, `DIVIDES` and `^` (`FortressBuiltin.fsi:180-221`).
  - "The other number types' own": the reader inferred it right. Source, section 6: "ties with `ZZ64`'s, `QQ`'s and `RR64`'s own".
  - Which path refuses `(3).minimum`? The reader guessed right, but the entry does not say. Row 581: "under the compiled checker over the one library".
  - What does the walk test gate? The header of `tests/IntegerOrderNumerals.fss`: "Each integer type compares and takes MAXNUM and MINNUM at its own type, and the library's numeral sites keep their values". It gates the integer types' own operators under walk, not `IntLiteral`.

**Class.**
- Concept the reader lacked: `AnyIntegral`, the closed trait `comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` that declares `coerce(x: IntLiteral)` (`FortressLibrary.fsi:442-444`). It belongs in the `fortress-repo` core, "Numbers are siblings, not a tower", beside `IntLiteral`. `concepts.md` lacks it.
- Wording: "`IntLiteral` declares itself the members of `Integral[\I\]` that a numeral could not reach, among them the getters `zero` and `one`, `odd`, `even`, `floor` and `DIVIDES`. The specification gives three reasons: for some, no declaration of `Integral` applies to a sibling type even with coercion; for others, the declarations that apply by coercion tie; and a getter must be the type's own member." Then: "... ties between a declaration inherited from a generic trait and the same operator's own declarations in `ZZ64`, `QQ` and `RR64`." Then: "The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581)." Then: "Gated under walk by `tests/IntegerOrderNumerals.fss`, which checks each integer type's own comparisons, `MAXNUM` and `MINNUM`."

## F-80

**Fidelity.**
- The title's "unless their name is a symbol" is right.
- The body is wider than the code. Clean text: "every operator whose name is not a word of capitals, such as `+` or `||`, since the checker skips them". `NodeUtil.validOp` (`nodes_util/NodeUtil.java:1466-1482`) admits names of capitals and underscores *and eight words*: `juxtaposition`, `in`, `per`, `square`, `cubic`, `inverse`, `squared`, `cubed`. Row 584's notes say "capitals, underscores and eight words". `juxtaposition` matters here. F-81 says that `String`'s juxtaposition was refused and repaired, which needs the checker to read it, and row 585 confirms that the checker refuses the shape "when named `juxtaposition`". Read with this body, F-81 looks wrong.
- The memo sentence matches `rung-overloading-checker/REPORT.md` section 7: "(c) Key it on everything the answer reads. Taken". It also keeps away from row 547, as it should.
- The No Duplicates sentence matches `rung-checker-abstract-callsite/REPORT.md` section 1 (row 727, P-149).

**Comprehension.**
- Same as the source: the reader got the rule, the per-provider check, the memo, and the operators that are left unchecked.
- Different from the source:
  - The reader took `XXXNoDuplicatesRuleAbstract` and `XXXFunctionalMethodMeetAbstractSibling` as expected failures that mark a departure from the specification. They are refusals that the specification asks for. Each `.test` has `compile` and `compile_err_contains`, and each program's comment says that the shape is "a static error the type checker gives". The skill's definition ("asserts the answer that the specification gives, and fails today", `references/tests-writing.md`) does not say that in a compiled test folder the "failure" can be the right refusal.
  - "With the same parameter type": the test puts both declarations in one trait, with the same parameter types.

**Class.**
- Concept the reader lacked: an `XXX` compile test with `compile_err_contains` pins a refusal that the specification requires. It is green while the checker refuses, and it is not a defect. Define it in `references/tests-writing.md`'s definition of an `XXX` test, and in the core glossary if FACTS readers are to read test names without that part. F-76's history and F-86 use the same form.
- Wording: "Unchecked: a pair that only an object expression provides (row 570), and every operator whose name is a symbol, such as `+`, `<`, `||` or a subscript, since the checker skips them (row 584; F-245 measures what the skip hides)." Then: "An abstract functional method beside a concrete one in the same trait, with the same parameter types, is refused by the No Duplicates Rule." Then: "... and by the refusals that the specification asks for, `XXXFunctionalMethodMeetAbstractSibling` and `XXXNoDuplicatesRuleAbstract`."

## F-81

**Fidelity.**
- The narrowing that the assessment asked for is right. The meets hold for the pairs that the checker reads. The declared-type clause now covers only the rung's own list, which `rung-library-meets/REPORT.md` section 1 calls "each declared type set to what its body answers". Row 632 is an example of a type still unmatched.
- Minor, under rule 9 of the writer brief: "F-245 gives ... `Indexed`'s three subscripts in 17 types". F-245's text does not have "17 types". That count comes from `perf-probes/symbolic-operators/REPORT.md` section 1.2, measured at `d19ade2fb`. Write "F-245's measurement found ... in 17 types", or drop the count.

**Comprehension.**
- Same as the source: the reader got the meets, the top-level juxtaposition, and what the skip hides.
- Different from the source:
  - "That the compiled checker reads" can attach to "type" or to "pair".
  - "Keep that refused shape", refused by what? Row 585 says "the shape the specification refuses, which the checker does not see while it skips symbolic operators".
  - "The same work" is a handle of the rung.
  - "Others still differ", others among which declarations?

**Class.** Wording only.
- Title: "In the interpreter's library, every Meet Rule pair inside one type that the compiled checker checks has a declaration on its meet. The checker skips operators whose names are symbols (row 584), and some of their pairs have no meet."
- "`String`'s `||`, `|||`, `//` and `///` keep the shape that the specification refuses, `(a:Any, self)` beside `(self, b:Any)`, unseen while the checker skips them (row 585)."
- "The rung that added these meets also set the declared types listed in report section 1 to what their bodies answer. Elsewhere in the library some still differ, such as `__bigOperator2`'s fused branch (F-85)."

## F-82

**Fidelity.**
- One sentence lets the reader conclude more than the evidence shows. Clean text: "Open library bug: ... so its `reverse` is `Indexed`'s, and `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, not `mapped(7,5,3,1)` (row 603)."
- Row 603 says: "Elements and order are unchanged; the test pins today's string (`:58`)". `tests/RangeDeclarations.fss:58-59` asserts the string, and then asserts that the reversed generator gives "6,4,2,0," in order. The record's 2026-10-13 text said "rendered `SimpleReversedIndexed(mapped(seq(…)))` with the elements in the same order".
- The clean text drops that limit. It also adds the contrast "not `mapped(7,5,3,1)`", which suggests wrong values. The cold reader concluded: "Do not rely on `reverse` of a mapped sequential range".
- Kept rightly: the limit to the pairs that the checker reads, with the subscripts from F-245.

**Comprehension.**
- Same as the source: the reader got the meets, the subscripts left unmet, and the numeral `IN`.
- Different from the source:
  - Row 603, as above.
  - "Rank" and "kinds". The reader guessed "kinds" to be the kinds of a static parameter. In the library and F-89, a range's rank is its number of dimensions, 1 to 3. Its kinds are the left, right, full, compact and bounded forms (F-89: "ranges of rank 2 and 3 have bounded kinds").
  - `FullRange` and "the full sequential ranges": the reader had no definition.
  - Is "(row 580)" open or fixed? Row 580 is FIXED, by `631fb867e`.
  - Does the test pin row 603? Yes, row 603's reproducer is `tests/RangeDeclarations.fss`.

**Class.**
- Wording, for the fidelity failure: "Open library bug (row 603): the full sequential ranges' `map` answers a `SimpleMappedSeqIndexed`, which is no `MappedGenerator`, so its `reverse` is `Indexed`'s. The elements and their order are right, but the string differs: `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, not `mapped(7,5,3,1)`. `tests/RangeDeclarations.fss` pins that string." Also: "(row 580, fixed)".
- Concept the reader lacked: a range's rank and kinds, and `FullRange`. F-82 and F-89 use them. Define them in `references/library.md`, at the ranges. `concepts.md` lacks them.

## F-83

**Fidelity.**
- The renaming of "the api's second export error" is right. `compile-ladder/gate/distance-sites.tsv` has one export site, at `FortressLibrary.fss:12`, unit "component FortressLibrary". `String`'s entry in it is `TraitDecl String at FortressLibrary.fsi:2438.1`.
- No distance site is in `String.fss` or `FlatString.fss`. The tsv confirms it.
- The title is wider than the record. Clean text: "their declarations that the checker refused are repaired in forms that the library already uses". The record said "the string components' slips are repaired in the library's own spelling". "Slips" were the rung's own small typing errors. The substitute covers every refused declaration, and some string sites cleared by a checker repair, not a library one. A former title, in the history at `FACTS-history.md:305`, named "the compiled checker's varargs" among the string sites left; `aa07efb31` cleared them (F-86, row 604's fixed half). The same substitution recurs in F-85.
- Minor. "That component's export error for traits whose declaration differs from the api's: its `extends` clause differs, and the component lacks members that the api lists." The error also lists objects (`Nothing`, `EqualTo`, `Just`). `String`'s entry also cites an abstract `size` that the api does not declare, and different `excludes` clauses (`distance-sites.tsv`). The two reasons given are true but not the whole entry.

**Comprehension.**
- Same as the source: the reader got the title, why `String`'s entry is `FortressLibrary`'s, and that the test pins row 607 as it stands.
- Different from the source:
  - How `String.fss` relates to the trait `String`. `String.fss` is the component `String`. It holds string objects and traits such as `CatString`, `SubString`, `Concatenable` and `Balanceable` (`Library/String.fss:33-343`), not the trait `String`.
  - "`FlatString`'s api states its component's header": the reader could not choose between the two readings. Source: `Library/FlatString.fsi:16` now declares `object FlatString extends { String, DelegatedIndexed[\Char, ZZ32\] }`, the component's header, and no `opr ||(a:FlatString, self)` (F-259).
  - The subscript `:b:c` syntax.
  - Which "two answers"? Row 607: "`StringPieces.fss` pins both `false` answers".

**Class.**
- Concept the reader lacked: an export error. Define it in `references/compiler.md`, beside the distance. `concepts.md` already lists it; add that the error lists objects as well as traits.
- Wording. Title: "... and the rung's repairs of their refused declarations are in forms that the library already uses."
- Body: "The trait `String` is declared in `FortressLibrary`, not in `String.fss`, which holds string objects such as `CatString` and `SubString`. `String` has an entry, among other differences, in the `FortressLibrary` component's export error for declarations that differ from the api's ..."
- "`FlatString`'s api declares its component's header, `extends { String, DelegatedIndexed[\Char, ZZ32\] }`, and no `opr ||(a:FlatString, self)` (F-259)."
- "An implicit strided subscript `[:b:c]` is completed from the axis's right end, not from its left as `l:b:c`: `"abcdef"[:3:2]` is `bd`, not `ac` (row 609; the specification's answer is held by the expected failure `tests/XXXSubscriptImplicitStridedRange.fss`)."
- "Gated by `tests/StringPieces.fss`, which pins row 607's two wrong `false` answers."

## F-84

**Fidelity.**
- One clause says more than the source. Clean title: "25 declarations of numbers, orderings, `List` and natives that the compiled checker refused are corrected to the types that their bodies answer." `rung-number-order-slips/REPORT.md` section 1 says: "Of the record's 60 one-off sites, 25 are repaired in the library's own spelling and 35 are left". Section 4 lists the repairs, and many of them change a body or an api header, not a declared type:
  - `assert` and `deny` read their value through a `typecase`;
  - `shouldRaise` throws after its `try`;
  - `simplestRationalBetween` exits with `a`;
  - `Integral`'s `even` gets a new body;
  - `ArrayList`'s `ignore(...)` and `typecase`;
  - `List`'s api gets `abstract` and its exclusions;
  - `BigNum` becomes a `value object`, and `Thread`'s members become methods.

  The 25 are sites, not declarations: `NN64`'s `signed` is one declaration that clears three sites. The record's title ("answer their declared types") was closer: the bodies and the declarations now agree, by whichever change.
- One condition is dropped. Clean text: "Limit: under walk, `IntLiteral`'s own arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578)." Row 578 is about "the object `IntLiteral`'s own arithmetic": under walk the name `IntLiteral` is a value, `FIntLiteral.ZERO`, which no numeral reaches. F-263 says the same: "Under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches". Without "the object", the sentence seems to contradict F-79's "no numeral reaches these declarations", and the cold reader flagged that conflict.
- The moves to F-263 and F-255 are right. Both entries hold the claims: F-263 holds the powers and `QQ`'s exponent; F-255 holds `LexicographicOrder` and `List`'s conditional extension.

**Comprehension.**
- Same as the source: the reader got the unbounded parameters and their instance at `()`.
- Different from the source:
  - "`List`'s empty comprehension". The reader could not find the declaration. It is `opr BIG <|[\T\]|>: Comprehension[\T,List[\T\],List[\T\],List[\T\]\]` (`Library/List.fsi:110`). The report calls it "nullary". "Empty" is P-48's own word, so the term is not the writer's invention, but it names no declaration a reader can find.
  - Why `MatchFailure` is here. It is row 590's repair by the same rung (section 4, item 2), not one of the 25.
  - The apparent conflict with F-79, as above.

**Class.**
- Wording, for the 25. Title: "... are unbounded, as the team declared them, and the same rung repaired 25 of the compiled checker's 60 one-off error sites in numbers, orderings, `List` and natives, each by a declared type, a body or an api header in forms that the library already uses."
- Wording, for row 578: "Limit: under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches, and its arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578)."
- Wording: "... of `fail`, `builtinPrimitive` and `List`'s comprehension operator `BIG <|[\T\]|>` (`List.fsi:110`) ...". Since P-48 says "empty comprehension", the coordinator may want P-48 to name the declaration too, in a positions pass.
- Wording: "The rung also made `MatchFailure` an unchecked exception: it extends `UncheckedException` (row 590)."

## F-85

**Fidelity.**
- Leaving the `cast` and `embiggen` sentence to F-250 is right. F-250 holds "the identities' cast and a typed `embiggen`", row 436's two sites and row 631's one, and "The identities' fallback ends in `CastError`, for an empty `SUM` over a user group".
- The fused branch is right (row 632; `FortressLibrary.fss:1465` in `distance-sites.tsv`: "Function body has type OR(I0,O0), but declared return type is O0"). So are the `cond` static arguments (`Library/FortressLibrary.fss:1521-1557`).
- The title is wider than the record, as in F-83. Clean text: "the generator, condition, reduction and nested-generator declarations that the compiled checker refused are repaired in forms that the library already uses". The record said "slips ... are repaired in its own spelling". The sites that the rung left (rows 627 to 633) were cleared by other work, not in the library's existing forms:
  - row 627's capture, by a checker repair (F-87's history, 2026-10-13);
  - row 629, by F-93, which "builds PLAN item 45 at its default";
  - row 628, by F-144's typing of the reductions;
  - rows 436 and 631, by F-250's checker reading of `where` clauses.

  The entry's pointers name those entries, but the title still says that all were repaired in forms the library already uses.

**Comprehension.**
- Same as the source on what the entry owns: the reader got the fused branch, the `cond` static arguments and the pointers.
- Minor: "each default of `Condition`" means each method body of the trait, as the reader guessed.

**Class.**
- Wording. Title: "In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses. One site of those declarations is still on the distance: `__bigOperator2`'s fused branch." Body: "Each method body of `Condition` that calls `cond` ...".
- Common to F-83 and F-85: the writer's substitute for "slip" ("declarations that the checker refused", `concepts.md`) widens the claim. Either keep "the rung's repairs" in the entry, or define "slip" in `references/library.md` and use the word.

## F-86

**Fidelity: pass.**
- The expansion rule matches `Specification/basic/overloading.tex:246-287`: "a declaration for each number of arguments that can be passed to it".
- "Over the interpreter's library, a body uses the parameter as that array" matches `rung-checker-defects/REPORT.md` section 4: "Under the one library, the distance shows the body typed as the sequence".
- Rows 604 and 624 are as stated.
- The two claims that left the entry (row 605, and row 597's checker half, both fixed by `aa07efb31`) were dropped as the assessment allows. No other entry holds them. That is the writer's open point for the coordinator, not a fault of the clean text. The nearest home for row 597's checker half is beside F-76's row 487: both concern the checker's reading of `comprises` closure (`TypeHierarchyChecker`).

**Comprehension: pass.** The reader's answers match the sources. The reader's consequence, that no compiled program can run a varargs declaration until the switch-over and a case in the code generator, follows from rows 604 and 624.

## F-87

**Fidelity.**
- The restored exits are right. `scala_src/typechecker/impls/Misc.scala:725-745` checks an exit's `with` value against `labelExitTypes`' expected type, and `compiler_tests/InferResultOnlyLabelBody.fss` has `exit out with stop(s)`.
- Inherited and minor: "a juxtaposition". The 2026-10-13 text had "a loose juxtaposition" and "a tight juxtaposition of items none of which is a function" (`Operators.scala:170-197`, `:362-386`). The clean text, like the record, drops that condition.

**Comprehension.**
- Same as the source: the reader got the contexts, the retry at another call's argument, and the pointers.
- Different from the source:
  - The reader took the list as complete: "Elsewhere, write it." It is not complete. The checker also gives a typed declaration's right-hand side its declared type (`impls/Decls.scala:264-284`, "Type check the RHS, expecting the declared type", through `checkExpr(rhs, typ, ...)`, which passes `Some(expected)`, `STypeChecker.scala:475-478`), and the block case already passed the type to its last expression before the rungs (`rung-checker-expected-type/REPORT.md` section 1). The inference chapter lists every context (`Specification/basic/inference.tex:128-153`): a typed variable, field or assignment, a functional's declared return type, an `if` with `else`, and the rest. F-87 lists those that the rungs added. P-50 points to F-87 as the list of "the checker's contexts that carry an expected type", so the misreading would spread.
  - Which expected type a juxtaposition gives: its own, to the application it makes (the multifix one where it fits, else the outermost binary application; `rung-checker-contexts/REPORT.md` section 1).
  - That the `label` contexts are only type-checked: `InferResultOnlyLabelBody.test` is a `typecheck` test, since the code generator has no `label` (history, 2026-10-13).

**Class.**
- Wording. Title: "Besides the contexts that it already had, such as a typed declaration's right-hand side, the compiled checker gives a call its expected type in a clause of an `if` without `else` (the type `()`), a block's last expression after local declarations, ..., and, by a retry of the enclosing call, another call's argument." Add to the body: "The inference chapter lists every context (`Specification/basic/inference.tex`, 'The expected type'). In a juxtaposition or a repeated operator, the expression's own expected type goes to the application that it makes." In the gate line: "`InferResultOnlyLabelBody`, a type-check test, since the code generator has no `label`".

## Concepts to add to `concepts.md`

- `AnyIntegral`: F-79. The `fortress-repo` core, "Numbers are siblings, not a tower".
- A range's rank and kinds, and `FullRange`: F-82, F-89. `references/library.md`, the ranges.
- An `XXX` compile test with `compile_err_contains` pins a refusal that the specification requires: F-80, F-86, and F-76's history. `references/tests-writing.md`, the definition of an `XXX` test, and the core glossary.
- "Slip": F-83, F-84, F-85. Already listed. Its plain substitute widens the claim, so define the word, or have the entries say "the rung's repairs".
